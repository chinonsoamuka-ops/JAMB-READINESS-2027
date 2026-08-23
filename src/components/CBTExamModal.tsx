import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Clock,
  Calculator,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Trophy,
  Award,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PastQuestion, SubjectId, QuestionOptionKey, ExamAttempt } from '../types';
import { getSubjectInfo, recordExamAttempt } from '../data/questionsService';
import { JambCalculator } from './JambCalculator';
import { playClickSound, playCorrectSound, playWrongSound, playWarningSound } from '../utils/sound';

interface CBTExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: PastQuestion[];
  subjectIds: SubjectId[];
  mode: 'full-mock' | 'single-subject' | 'speed-drill' | 'topic-drill';
  timeLimitMinutes?: number;
  onOpenAITutor: (context: string, subject: string) => void;
}

export const CBTExamModal: React.FC<CBTExamModalProps> = ({
  isOpen,
  onClose,
  questions,
  subjectIds,
  mode,
  timeLimitMinutes = 60,
  onOpenAITutor
}) => {
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndexInSubject, setCurrentQuestionIndexInSubject] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, QuestionOptionKey | null>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(timeLimitMinutes * 60);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [showKeyboardShortcutsGuide, setShowKeyboardShortcutsGuide] = useState(false);
  const [selectedExplanations, setSelectedExplanations] = useState<Record<string, boolean>>({});
  const [reviewSubjectIndex, setReviewSubjectIndex] = useState(0);

  // Group questions by subject
  const currentSubjectId = subjectIds[currentSubjectIndex] || subjectIds[0];
  const subjectQuestions = questions.filter((q) => q.subjectId === currentSubjectId);
  const currentQuestion = subjectQuestions[currentQuestionIndexInSubject] || subjectQuestions[0];

  // Initialize timer
  useEffect(() => {
    if (!isOpen || isExamSubmitted) return;
    setTimeRemainingSeconds(timeLimitMinutes * 60);
    setUserAnswers({});
    setFlaggedIds(new Set());
    setIsExamSubmitted(false);
    setShowSubmitConfirm(false);
    setCurrentSubjectIndex(0);
    setCurrentQuestionIndexInSubject(0);
  }, [isOpen, timeLimitMinutes]);

  // Countdown timer logic
  useEffect(() => {
    if (!isOpen || isExamSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        if (prev === 300) {
          // 5 minute warning
          playWarningSound();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isExamSubmitted]);

  // Keyboard 8-key shortcut listener (A, B, C, D, P, N, S, R)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || isExamSubmitted || showSubmitConfirm) return;
      // Don't trigger if user is in an input or calculator
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      const key = e.key.toUpperCase();

      if (key === 'A' || key === 'B' || key === 'C' || key === 'D') {
        e.preventDefault();
        handleSelectOption(key as QuestionOptionKey);
      } else if (key === 'N') {
        e.preventDefault();
        handleNextQuestion();
      } else if (key === 'P') {
        e.preventDefault();
        handlePrevQuestion();
      } else if (key === 'R') {
        e.preventDefault();
        handleToggleFlag();
      } else if (key === 'S') {
        e.preventDefault();
        setShowSubmitConfirm(true);
      }
    },
    [isOpen, isExamSubmitted, showSubmitConfirm, currentQuestion, currentQuestionIndexInSubject, currentSubjectIndex, subjectQuestions]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const handleSelectOption = (optionKey: QuestionOptionKey) => {
    if (isExamSubmitted || !currentQuestion) return;
    playClickSound();
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionKey
    }));
  };

  const handleToggleFlag = () => {
    if (!currentQuestion) return;
    playClickSound();
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  const handleNextQuestion = () => {
    playClickSound();
    if (currentQuestionIndexInSubject < subjectQuestions.length - 1) {
      setCurrentQuestionIndexInSubject((prev) => prev + 1);
    } else if (currentSubjectIndex < subjectIds.length - 1) {
      // Advance to next subject
      setCurrentSubjectIndex((prev) => prev + 1);
      setCurrentQuestionIndexInSubject(0);
    }
  };

  const handlePrevQuestion = () => {
    playClickSound();
    if (currentQuestionIndexInSubject > 0) {
      setCurrentQuestionIndexInSubject((prev) => prev - 1);
    } else if (currentSubjectIndex > 0) {
      // Go back to previous subject's last question
      const prevSubjectId = subjectIds[currentSubjectIndex - 1];
      const prevSubjectQuestions = questions.filter((q) => q.subjectId === prevSubjectId);
      setCurrentSubjectIndex((prev) => prev - 1);
      setCurrentQuestionIndexInSubject(Math.max(0, prevSubjectQuestions.length - 1));
    }
  };

  const handleSubmitExam = () => {
    setShowSubmitConfirm(false);
    setIsExamSubmitted(true);

    // Calculate score
    let totalCorrect = 0;
    let totalAnswered = 0;

    const subjectBreakdown = subjectIds.map((sId) => {
      const sQuestions = questions.filter((q) => q.subjectId === sId);
      let sCorrect = 0;
      let sAns = 0;

      sQuestions.forEach((q) => {
        const userAns = userAnswers[q.id];
        if (userAns) {
          sAns++;
          if (userAns === q.correctAnswer) {
            sCorrect++;
            totalCorrect++;
          }
        }
      });
      totalAnswered += sAns;

      const sScore = sQuestions.length > 0 ? Math.round((sCorrect / sQuestions.length) * 100) : 0;
      return {
        subjectId: sId,
        total: sQuestions.length,
        correct: sCorrect,
        score: sScore,
        timeSpent: Math.round((timeLimitMinutes * 60 - timeRemainingSeconds) / subjectIds.length)
      };
    });

    const overallPct = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;
    const estJambScore = Math.round((overallPct / 100) * 400);

    // Record attempt
    const attempt: ExamAttempt = {
      id: 'attempt-' + Date.now(),
      timestamp: Date.now(),
      mode,
      subjectIds,
      totalQuestions: questions.length,
      answeredCount: totalAnswered,
      correctCount: totalCorrect,
      totalTimeSpentSeconds: timeLimitMinutes * 60 - timeRemainingSeconds,
      scorePercentage: overallPct,
      estimatedJambScore: estJambScore,
      subjectBreakdown,
      topicPerformance: [],
      userAnswers,
      flaggedQuestions: Array.from(flaggedIds)
    };

    recordExamAttempt(attempt);

    // Sound and celebration
    if (estJambScore >= 200) {
      playCorrectSound();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      playWarningSound();
    }
  };

  // Time format helper (HH:MM:SS)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.values(userAnswers).filter(Boolean).length;
  const isTimeCritical = timeRemainingSeconds < 300; // less than 5 mins

  return (
    <div id="cbt-exam-fullscreen" className="fixed inset-0 z-50 bg-[#FFF9F2] text-[#1A1A1A] flex flex-col overflow-hidden select-none">
      {/* Top JAMB CBT Header */}
      <header className="bg-[#6D28D9] border-b-2 border-black px-4 sm:px-6 py-2.5 flex items-center justify-between text-white shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFD100] border-2 border-black flex items-center justify-center font-black text-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            J
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black text-white tracking-wide">JAMB UTME CBT EXAMINATION</h1>
              <span className="text-[10px] bg-[#FFD100] text-black px-2 py-0.5 rounded border border-black font-mono font-black">
                CBT v24.0
              </span>
            </div>
            <p className="text-[11px] text-purple-200 font-bold hidden sm:block">
              Candidate: <span className="font-black text-white">SAMPLE CANDIDATE (2026/UTME/9942)</span> • Center: 088-IKOYI
            </p>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-3">
          {!isExamSubmitted && (
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-black font-mono font-black text-sm sm:text-base shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                isTimeCritical
                  ? 'bg-[#FFE4E6] text-rose-950 animate-pulse'
                  : 'bg-white text-[#1A1A1A]'
              }`}
            >
              <Clock className="w-4 h-4 text-[#6D28D9]" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>
          )}

          <button
            id="btn-toggle-calculator"
            onClick={() => {
              playClickSound();
              setIsCalculatorOpen(!isCalculatorOpen);
            }}
            className={`p-2 rounded-xl border-2 border-black text-xs font-black flex items-center gap-1.5 transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
              isCalculatorOpen
                ? 'bg-[#FFD100] text-black'
                : 'bg-white text-[#1A1A1A] hover:bg-[#FFD100]'
            }`}
            title="Toggle JAMB On-screen Calculator"
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden md:inline">Calculator</span>
          </button>

          {!isExamSubmitted && (
            <button
              id="btn-show-submit-confirm"
              onClick={() => {
                playClickSound();
                setShowSubmitConfirm(true);
              }}
              className="px-4 py-1.5 bg-[#FFD100] hover:bg-[#FDE047] text-black font-black text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Submit (S)</span>
            </button>
          )}

          {isExamSubmitted && (
            <button
              id="btn-exit-exam-results"
              onClick={onClose}
              className="px-4 py-1.5 bg-white hover:bg-slate-100 text-[#1A1A1A] font-black text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition"
            >
              Close / Exit
            </button>
          )}
        </div>
      </header>

      {/* Calculator Component */}
      <JambCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />

      {/* Main View Area */}
      {!isExamSubmitted ? (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left / Middle: Questions & Options Panel */}
          <main className="flex-1 flex flex-col bg-[#FFF9F2] overflow-y-auto">
            {/* Subject Tabs */}
            <div className="bg-white border-b-2 border-black px-4 py-2 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-thin">
              {subjectIds.map((sId, idx) => {
                const sInfo = getSubjectInfo(sId);
                const sQuestions = questions.filter((q) => q.subjectId === sId);
                const sAnswered = sQuestions.filter((q) => userAnswers[q.id]).length;
                const isActive = idx === currentSubjectIndex;

                return (
                  <button
                    key={sId}
                    id={`tab-exam-subject-${sId}`}
                    onClick={() => {
                      playClickSound();
                      setCurrentSubjectIndex(idx);
                      setCurrentQuestionIndexInSubject(0);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 transition whitespace-nowrap border-2 border-black ${
                      isActive
                        ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                        : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]'
                    }`}
                  >
                    <span>{sInfo.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono font-bold border border-black ${
                        isActive ? 'bg-[#FFD100] text-black' : 'bg-white text-[#1A1A1A]'
                      }`}
                    >
                      {sAnswered}/{sQuestions.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Question Workspace */}
            {currentQuestion ? (
              <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full flex flex-col justify-between">
                <div>
                  {/* Question Meta Bar */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-black mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase text-[#6D28D9] tracking-wider">
                        Question {currentQuestionIndexInSubject + 1} of {subjectQuestions.length}
                      </span>
                      <span className="text-black font-black">•</span>
                      <span className="text-xs font-bold text-slate-700">{currentQuestion.topic}</span>
                      <span className="text-black font-black hidden sm:inline">•</span>
                      <span className="text-xs font-mono font-bold text-slate-600 hidden sm:inline">JAMB {currentQuestion.year}</span>
                    </div>

                    <button
                      id="btn-flag-question"
                      onClick={handleToggleFlag}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 transition border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                        flaggedIds.has(currentQuestion.id)
                          ? 'bg-[#FFE4E6] text-rose-950'
                          : 'bg-white text-slate-700 hover:bg-[#FFF9F2]'
                      }`}
                      title="Flag/Unflag for review (Press 'R')"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{flaggedIds.has(currentQuestion.id) ? 'Flagged (R)' : 'Flag (R)'}</span>
                    </button>
                  </div>

                  {/* Passage if any (English Comprehension) */}
                  {currentQuestion.passage && (
                    <div className="bg-white p-4 rounded-2xl border-2 border-black text-[#1A1A1A] text-xs sm:text-sm leading-relaxed mb-4 italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <div className="font-black text-[#6D28D9] not-italic text-xs mb-1">Passage / Reference Text:</div>
                      {currentQuestion.passage}
                    </div>
                  )}

                  {/* Question Stem */}
                  <div className="text-base sm:text-lg font-black text-[#1A1A1A] leading-relaxed mb-6 whitespace-pre-line">
                    {currentQuestion.question}
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {(['A', 'B', 'C', 'D'] as QuestionOptionKey[]).map((optKey) => {
                      const optText = currentQuestion.options[optKey];
                      const isSelected = userAnswers[currentQuestion.id] === optKey;

                      return (
                        <button
                          key={optKey}
                          id={`opt-btn-${optKey}`}
                          onClick={() => handleSelectOption(optKey)}
                          className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 border-black transition flex items-start gap-3.5 text-xs sm:text-sm font-bold ${
                            isSelected
                              ? 'bg-[#FFD100] text-[#1A1A1A] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                              : 'bg-white hover:bg-[#FFF9F2] text-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-black shrink-0 text-xs border-2 border-black ${
                              isSelected
                                ? 'bg-[#6D28D9] text-white'
                                : 'bg-[#FFF9F2] text-[#1A1A1A]'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span className="leading-snug pt-0.5">{optText}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Navigation Toolbar (Authentic 8-key instructions) */}
                <div className="mt-8 pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-2">
                    <span className="font-mono bg-white border border-black px-1.5 py-0.5 rounded text-black font-black">P</span> Prev
                    <span className="font-mono bg-white border border-black px-1.5 py-0.5 rounded text-black font-black">N</span> Next
                    <span className="font-mono bg-white border border-black px-1.5 py-0.5 rounded text-black font-black">A-D</span> Option
                    <span className="font-mono bg-white border border-black px-1.5 py-0.5 rounded text-black font-black">R</span> Flag
                    <span className="font-mono bg-white border border-black px-1.5 py-0.5 rounded text-black font-black">S</span> Submit
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      id="btn-prev-question"
                      onClick={handlePrevQuestion}
                      disabled={currentSubjectIndex === 0 && currentQuestionIndexInSubject === 0}
                      className="px-4 py-2 bg-white hover:bg-[#FFF9F2] disabled:opacity-40 text-[#1A1A1A] rounded-xl text-xs font-black transition flex items-center gap-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous (P)</span>
                    </button>
                    <button
                      id="btn-next-question"
                      onClick={handleNextQuestion}
                      className="px-5 py-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span>Next (N)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center font-bold text-slate-500">No questions available in this section.</div>
            )}
          </main>

          {/* Right: Question Palette / Navigator */}
          <aside className="w-full md:w-64 bg-white border-t-2 md:border-t-0 md:border-l-2 border-black p-4 flex flex-col shrink-0">
            <div className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Question Palette</span>
              <span className="text-[11px] font-mono font-black text-[#6D28D9]">
                {answeredCount}/{questions.length} Answered
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-700 mb-3 pb-3 border-b-2 border-black">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-[#DCFCE7] border border-black"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-white border border-black"></div>
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded bg-[#FFE4E6] border border-black"></div>
                <span>Flagged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded border-2 border-black bg-[#FFD100]"></div>
                <span>Current</span>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="flex-1 overflow-y-auto max-h-48 md:max-h-none grid grid-cols-5 gap-1.5 content-start pr-1 scrollbar-thin">
              {subjectQuestions.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isFlagged = flaggedIds.has(q.id);
                const isCurrent = idx === currentQuestionIndexInSubject;

                return (
                  <button
                    key={q.id}
                    id={`palette-btn-${idx + 1}`}
                    onClick={() => {
                      playClickSound();
                      setCurrentQuestionIndexInSubject(idx);
                    }}
                    className={`h-8 rounded-lg text-xs font-black flex items-center justify-center transition border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                      isCurrent
                        ? 'bg-[#FFD100] text-black ring-2 ring-black font-black'
                        : isFlagged
                        ? 'bg-[#FFE4E6] text-rose-950'
                        : isAnswered
                        ? 'bg-[#DCFCE7] text-emerald-950'
                        : 'bg-white text-slate-600 hover:bg-[#FFF9F2]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t-2 border-black">
              <button
                id="btn-submit-sidebar"
                onClick={() => {
                  playClickSound();
                  setShowSubmitConfirm(true);
                }}
                className="w-full py-2.5 bg-[#FFD100] hover:bg-[#FDE047] text-black font-black text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                Submit Exam
              </button>
            </div>
          </aside>
        </div>
      ) : (
        /* Exam Results Screen */
        <div id="cbt-exam-results-screen" className="flex-1 bg-[#FFF9F2] overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header / Score Banner */}
            <div className="bg-[#6D28D9] border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Trophy className="w-48 h-48 text-white" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD100] text-black border-2 border-black text-xs font-black uppercase tracking-wider mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Award className="w-4 h-4" /> Examination Completed
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white mb-2">JAMB UTME CBT Performance Report</h2>
              <p className="text-xs sm:text-sm text-purple-200 font-medium max-w-lg mx-auto mb-6">
                Here is your official performance evaluation breakdown, topic mastery score, and step-by-step solutions for every question.
              </p>

              {/* Big Score Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
                <div className="p-4 rounded-2xl bg-[#FFD100] text-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-[11px] font-black uppercase text-black">Estimated JAMB Score</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-mono mt-1">
                    {Math.round((questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length / questions.length) * 400)}
                    <span className="text-xs font-bold text-slate-800"> / 400</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white text-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-[11px] font-black uppercase text-slate-600">Accuracy</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#6D28D9] font-mono mt-1">
                    {Math.round((questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length / questions.length) * 100)}%
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white text-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-[11px] font-black uppercase text-slate-600">Correct / Total</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono mt-1">
                    {questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length}
                    <span className="text-xs font-bold text-slate-600"> / {questions.length}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white text-[#1A1A1A] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-[11px] font-black uppercase text-slate-600">Time Used</div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono mt-1">
                    {formatTime(timeLimitMinutes * 60 - timeRemainingSeconds)}
                  </div>
                </div>
              </div>

              {/* Subject Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
                {subjectIds.map((sId) => {
                  const sInfo = getSubjectInfo(sId);
                  const sQuestions = questions.filter((q) => q.subjectId === sId);
                  const sCorrect = sQuestions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
                  const sPct = sQuestions.length > 0 ? Math.round((sCorrect / sQuestions.length) * 100) : 0;
                  const sScaledScore = Math.round((sCorrect / (sQuestions.length || 1)) * 100);

                  return (
                    <div key={sId} className="p-3.5 rounded-xl bg-white text-[#1A1A1A] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <div className="text-xs font-black truncate">{sInfo.name}</div>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-lg font-black text-[#6D28D9] font-mono">{sScaledScore} / 100</span>
                        <span className="text-xs font-bold text-slate-600">{sCorrect}/{sQuestions.length} correct</span>
                      </div>
                      <div className="w-full bg-[#FFF9F2] border border-black h-2 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full ${sPct >= 70 ? 'bg-emerald-500' : sPct >= 50 ? 'bg-[#FFD100]' : 'bg-[#F43F5E]'}`}
                          style={{ width: `${sPct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Answer Review Section */}
            <div className="bg-white border-[3px] border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-black mb-6">
                <div>
                  <h3 className="text-lg font-black text-[#1A1A1A]">Comprehensive Question Review & Solutions</h3>
                  <p className="text-xs font-bold text-slate-600">Review every option, formula derivation, and grammar rule.</p>
                </div>

                {/* Filter Review by Subject */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
                  {subjectIds.map((sId, idx) => {
                    const sInfo = getSubjectInfo(sId);
                    return (
                      <button
                        key={sId}
                        onClick={() => {
                          playClickSound();
                          setReviewSubjectIndex(idx);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition whitespace-nowrap border-2 border-black ${
                          reviewSubjectIndex === idx
                            ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                            : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]'
                        }`}
                      >
                        {sInfo.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Questions List */}
              <div className="space-y-6">
                {questions
                  .filter((q) => q.subjectId === subjectIds[reviewSubjectIndex])
                  .map((q, idx) => {
                    const userAns = userAnswers[q.id];
                    const isCorrect = userAns === q.correctAnswer;
                    const isUnanswered = !userAns;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 sm:p-5 rounded-2xl border-2 border-black bg-[#FFF9F2] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
                      >
                        {/* Meta header */}
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[#1A1A1A]">Question {idx + 1}</span>
                            <span className="text-black font-black">•</span>
                            <span className="font-bold text-slate-700">{q.topic}</span>
                          </div>
                          <div>
                            {isCorrect ? (
                              <span className="px-2 py-0.5 bg-[#DCFCE7] text-emerald-950 font-black rounded border border-black text-[11px] flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                              </span>
                            ) : isUnanswered ? (
                              <span className="px-2 py-0.5 bg-white text-slate-700 font-black rounded border border-black text-[11px]">
                                Skipped (0)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-[#FFE4E6] text-rose-950 font-black rounded border border-black text-[11px] flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> Incorrect (0)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question text */}
                        <div className="text-sm font-bold text-[#1A1A1A] mb-4 whitespace-pre-line">
                          {q.question}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-xs">
                          {(['A', 'B', 'C', 'D'] as QuestionOptionKey[]).map((key) => {
                            const isThisCorrect = q.correctAnswer === key;
                            const isThisUser = userAns === key;

                            return (
                              <div
                                key={key}
                                className={`p-2.5 rounded-xl border-2 border-black flex items-start gap-2 ${
                                  isThisCorrect
                                    ? 'bg-[#DCFCE7] text-emerald-950 font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                                    : isThisUser
                                    ? 'bg-[#FFE4E6] text-rose-950 font-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                                    : 'bg-white text-slate-700'
                                }`}
                              >
                                <span className="font-black">{key}.</span>
                                <span className="font-bold">{q.options[key]}</span>
                                {isThisCorrect && <span className="ml-auto text-[10px] text-emerald-950 font-black">✓ Correct</span>}
                                {isThisUser && !isThisCorrect && <span className="ml-auto text-[10px] text-rose-950 font-black">✗ Your Choice</span>}
                              </div>
                            );
                          })}
                        </div>

                        {/* Detailed Solution / Rule */}
                        <div className="bg-white p-3.5 rounded-xl border-2 border-black text-xs text-[#1A1A1A] space-y-2">
                          <div className="font-black text-[#6D28D9] flex items-center justify-between">
                            <span>Step-by-Step Explanation:</span>
                            {q.formulaOrRule && (
                              <span className="text-[10px] font-mono font-black text-black bg-[#FFD100] px-2 py-0.5 rounded border border-black">
                                {q.formulaOrRule}
                              </span>
                            )}
                          </div>
                          <p className="leading-relaxed whitespace-pre-line font-medium text-slate-800">{q.explanation}</p>
                        </div>

                        {/* Ask AI Tutor for further breakdown */}
                        <div className="mt-3 flex justify-end">
                          <button
                            id={`btn-ask-ai-review-${q.id}`}
                            onClick={() => {
                              playClickSound();
                              onOpenAITutor(
                                `Question: ${q.question} | Options: A: ${q.options.A}, B: ${q.options.B}, C: ${q.options.C}, D: ${q.options.D} | Correct Answer: ${q.correctAnswer} | Explanation: ${q.explanation}`,
                                getSubjectInfo(q.subjectId).name
                              );
                            }}
                            className="text-xs font-black text-[#6D28D9] hover:underline flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                            <span>Ask JAMB AI Tutor to explain more</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Retake or Exit Buttons */}
            <div className="flex items-center justify-center gap-4 py-6">
              <button
                id="btn-retake-exam"
                onClick={() => {
                  playClickSound();
                  setIsExamSubmitted(false);
                  setTimeRemainingSeconds(timeLimitMinutes * 60);
                  setUserAnswers({});
                  setFlaggedIds(new Set());
                  setCurrentSubjectIndex(0);
                  setCurrentQuestionIndexInSubject(0);
                }}
                className="px-6 py-2.5 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Test</span>
              </button>
              <button
                id="btn-close-exam-bottom"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#FFD100] hover:bg-[#FDE047] text-black font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Dialog */}
      {showSubmitConfirm && (
        <div id="submit-confirm-modal" className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-[3px] border-black rounded-3xl w-full max-w-md p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-black text-[#1A1A1A] mb-2">Submit Examination?</h3>
            <p className="text-xs font-bold text-slate-600 mb-4">
              Are you sure you want to end this test session and calculate your official score?
            </p>

            {/* Stats Summary */}
            <div className="bg-[#FFF9F2] p-4 rounded-2xl border-2 border-black space-y-2 mb-6 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between text-[#1A1A1A] font-bold">
                <span>Total Questions:</span>
                <span className="font-black font-mono">{questions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Answered Questions:</span>
                <span className="font-black font-mono">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-rose-800 font-bold">
                <span>Unanswered Questions:</span>
                <span className="font-black font-mono">{questions.length - answeredCount}</span>
              </div>
              <div className="flex justify-between text-amber-800 font-bold">
                <span>Flagged for Review:</span>
                <span className="font-black font-mono">{flaggedIds.size}</span>
              </div>
              <div className="flex justify-between text-slate-700 pt-2 border-t-2 border-black font-bold">
                <span>Time Remaining:</span>
                <span className="font-mono font-black text-[#6D28D9]">{formatTime(timeRemainingSeconds)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                id="btn-cancel-submit"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-[#1A1A1A] font-black text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition"
              >
                Return to Exam
              </button>
              <button
                id="btn-confirm-submit"
                onClick={handleSubmitExam}
                className="px-5 py-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-black text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
