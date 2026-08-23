import React, { useState } from 'react';
import {
  SubjectId,
  PastQuestion,
  QuestionOptionKey
} from '../types';
import { SUBJECTS_LIST } from '../data/pastQuestions';
import { getSubjectInfo, ALL_COMBINED_QUESTIONS } from '../data/questionsService';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Zap,
  HelpCircle,
  Lightbulb,
  Clock,
  Filter
} from 'lucide-react';
import { playClickSound, playCorrectSound, playWrongSound } from '../utils/sound';

interface SingleSubjectQuizProps {
  onOpenAITutor: (context: string, subject: string) => void;
  onLaunchFullExam: (subjectIds: SubjectId[], mode: any, timeMins: number) => void;
}

export const SingleSubjectQuiz: React.FC<SingleSubjectQuizProps> = ({
  onOpenAITutor,
  onLaunchFullExam
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('english');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [practiceMode, setPracticeMode] = useState<'study' | 'quiz'>('study');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelectedOption, setUserSelectedOption] = useState<QuestionOptionKey | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });

  const currentSubjectInfo = getSubjectInfo(selectedSubjectId);

  // Filter available questions
  const availableQuestions = ALL_COMBINED_QUESTIONS.filter((q) => {
    const matchesSubject = q.subjectId === selectedSubjectId;
    const matchesYear = selectedYear === 'all' || q.year === selectedYear;
    const matchesTopic = selectedTopic === 'all' || q.topic === selectedTopic;
    return matchesSubject && matchesYear && matchesTopic;
  });

  const activeQuestion: PastQuestion | undefined = availableQuestions[currentIndex] || availableQuestions[0];

  const handleSelectOption = (optKey: QuestionOptionKey) => {
    if (showAnswer) return;
    setUserSelectedOption(optKey);
    setShowAnswer(true);

    if (activeQuestion) {
      const isCorrect = optKey === activeQuestion.correctAnswer;
      if (isCorrect) {
        playCorrectSound();
        setSessionScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      } else {
        playWrongSound();
        setSessionScore((prev) => ({ ...prev, total: prev.total + 1 }));
      }
    }
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex < availableQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    playClickSound();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setUserSelectedOption(null);
      setShowAnswer(false);
    }
  };

  const handleToggleBookmark = (id: string) => {
    playClickSound();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const yearsList = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  return (
    <div id="single-subject-quiz-view" className="space-y-6">
      {/* Subject Selector Bar */}
      <div className="bg-white rounded-2xl p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-black text-[#1A1A1A]">Subject Interactive Drill</h2>
            <p className="text-xs font-bold text-slate-600">
              Practice topic-by-topic with instant answer reveal and formula breakdowns.
            </p>
          </div>

          {/* Practice Mode Toggle */}
          <div className="flex items-center bg-[#FFF9F2] p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-black">
            <button
              id="btn-mode-study"
              onClick={() => {
                playClickSound();
                setPracticeMode('study');
                setShowAnswer(false);
                setUserSelectedOption(null);
              }}
              className={`px-3 py-1.5 rounded-lg transition border-2 ${
                practiceMode === 'study'
                  ? 'bg-[#6D28D9] text-white border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'border-transparent text-[#1A1A1A] hover:bg-[#FFD100]/40'
              }`}
            >
              Study & Reveal Mode
            </button>
            <button
              id="btn-mode-timed"
              onClick={() => {
                playClickSound();
                onLaunchFullExam([selectedSubjectId], 'single-subject', 25);
              }}
              className="px-3 py-1.5 rounded-lg text-[#1A1A1A] hover:bg-[#FFD100] border-2 border-transparent transition flex items-center gap-1"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Launch Timed CBT</span>
            </button>
          </div>
        </div>

        {/* Subjects Horizontal Scroll Grid */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {SUBJECTS_LIST.map((subj) => {
            const isSelected = subj.id === selectedSubjectId;
            return (
              <button
                key={subj.id}
                id={`btn-select-subject-${subj.id}`}
                onClick={() => {
                  playClickSound();
                  setSelectedSubjectId(subj.id);
                  setSelectedTopic('all');
                  setCurrentIndex(0);
                  setUserSelectedOption(null);
                  setShowAnswer(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition flex items-center gap-2 border-2 border-black ${
                  isSelected
                    ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                    : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]'
                }`}
              >
                <span>{subj.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono border border-black ${
                    isSelected ? 'bg-[#FFD100] text-black font-black' : 'bg-white text-black'
                  }`}
                >
                  {subj.code}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters (Year & Topic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t-2 border-black text-xs">
          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#1A1A1A] font-black shrink-0">Past Year:</span>
            <select
              id="select-quiz-year"
              value={selectedYear}
              onChange={(e) => {
                playClickSound();
                setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value));
                setCurrentIndex(0);
                setUserSelectedOption(null);
                setShowAnswer(false);
              }}
              className="bg-[#FFF9F2] border-2 border-black rounded-lg px-2.5 py-1.5 text-[#1A1A1A] font-black focus:outline-none focus:ring-2 focus:ring-[#6D28D9] w-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <option value="all">All Decade Years (2015–2024)</option>
              {yearsList.map((y) => (
                <option key={y} value={y}>
                  JAMB {y} Past Examination
                </option>
              ))}
            </select>
          </div>

          {/* Topic Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[#1A1A1A] font-black shrink-0">Topic Drill:</span>
            <select
              id="select-quiz-topic"
              value={selectedTopic}
              onChange={(e) => {
                playClickSound();
                setSelectedTopic(e.target.value);
                setCurrentIndex(0);
                setUserSelectedOption(null);
                setShowAnswer(false);
              }}
              className="bg-[#FFF9F2] border-2 border-black rounded-lg px-2.5 py-1.5 text-[#1A1A1A] font-black focus:outline-none focus:ring-2 focus:ring-[#6D28D9] w-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <option value="all">All Syllabus Topics</option>
              {currentSubjectInfo.topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Question Card */}
      {activeQuestion ? (
        <div className="bg-white rounded-2xl border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
          {/* Header row */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#FFD100] text-black border-2 border-black rounded-lg font-black text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                {currentSubjectInfo.name}
              </span>
              <span className="text-xs font-black text-[#1A1A1A]">
                Question {currentIndex + 1} of {availableQuestions.length}
              </span>
              <span className="text-black font-bold hidden sm:inline">•</span>
              <span className="text-xs font-mono font-black text-[#6D28D9] hidden sm:inline">JAMB {activeQuestion.year}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-bookmark-question"
                onClick={() => handleToggleBookmark(activeQuestion.id)}
                className={`p-2 rounded-xl border-2 border-black transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                  bookmarkedIds.has(activeQuestion.id)
                    ? 'bg-[#FFD100] text-black'
                    : 'bg-[#FFF9F2] text-slate-700 hover:bg-[#FFD100]'
                }`}
                title="Bookmark for later review"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <button
                id="btn-ask-ai-active-question"
                onClick={() => {
                  playClickSound();
                  onOpenAITutor(
                    `Question: ${activeQuestion.question} | Options: A: ${activeQuestion.options.A}, B: ${activeQuestion.options.B}, C: ${activeQuestion.options.C}, D: ${activeQuestion.options.D} | Correct Answer: ${activeQuestion.correctAnswer} | Solution: ${activeQuestion.explanation}`,
                    currentSubjectInfo.name
                  );
                }}
                className="px-3 py-1.5 bg-[#6D28D9] text-white hover:bg-[#5B21B6] rounded-xl text-xs font-black transition flex items-center gap-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD100]" />
                <span>Ask AI Tutor</span>
              </button>
            </div>
          </div>

          {/* Topic Badge */}
          <div className="mb-4">
            <span className="text-xs font-black text-[#6D28D9] bg-[#EDE9FE] px-2.5 py-1 rounded-md border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              Topic: {activeQuestion.topic}
            </span>
          </div>

          {/* Question Passage if English / Literature */}
          {activeQuestion.passage && (
            <div className="bg-[#FFF9F2] p-4 rounded-xl border-2 border-black text-[#1A1A1A] text-xs sm:text-sm leading-relaxed mb-6 italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="font-black text-[#6D28D9] not-italic text-xs mb-1">
                Passage / Reference Text:
              </div>
              {activeQuestion.passage}
            </div>
          )}

          {/* Question Text */}
          <div className="text-base sm:text-lg font-bold text-[#1A1A1A] leading-relaxed mb-6 whitespace-pre-line">
            {activeQuestion.question}
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-6">
            {(['A', 'B', 'C', 'D'] as QuestionOptionKey[]).map((optKey) => {
              const optText = activeQuestion.options[optKey];
              const isSelected = userSelectedOption === optKey;
              const isCorrectAnswer = activeQuestion.correctAnswer === optKey;

              let style = 'bg-[#FFF9F2] hover:bg-[#FEF3C7] border-2 border-black text-[#1A1A1A] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';

              if (showAnswer) {
                if (isCorrectAnswer) {
                  style = 'bg-[#DCFCE7] border-2 border-black text-emerald-950 font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
                } else if (isSelected && !isCorrectAnswer) {
                  style = 'bg-[#FFE4E6] border-2 border-black text-rose-950 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]';
                }
              }

              return (
                <button
                  key={optKey}
                  id={`btn-single-opt-${optKey}`}
                  onClick={() => handleSelectOption(optKey)}
                  className={`w-full text-left p-4 rounded-xl transition flex items-start gap-3.5 text-sm ${style}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg border-2 border-black flex items-center justify-center font-black text-xs shrink-0 ${
                      showAnswer && isCorrectAnswer
                        ? 'bg-emerald-600 text-white'
                        : showAnswer && isSelected && !isCorrectAnswer
                        ? 'bg-rose-600 text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    {optKey}
                  </span>
                  <span className="flex-1 pt-0.5 leading-snug font-medium">{optText}</span>
                  {showAnswer && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  )}
                  {showAnswer && isSelected && !isCorrectAnswer && (
                    <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout (Shown after selection or clicking Reveal) */}
          {showAnswer && (
            <div className="bg-[#FFF9F2] p-5 rounded-2xl border-2 border-black text-xs sm:text-sm text-[#1A1A1A] space-y-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] animate-in fade-in duration-200">
              <div className="flex items-center justify-between font-black text-[#1A1A1A]">
                <span className="flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-[#6D28D9]" />
                  <span>Correct Answer: Option {activeQuestion.correctAnswer}</span>
                </span>
                {activeQuestion.formulaOrRule && (
                  <span className="text-[11px] font-mono bg-[#FFD100] text-black px-2.5 py-1 rounded-md border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-black">
                    {activeQuestion.formulaOrRule}
                  </span>
                )}
              </div>
              <p className="leading-relaxed whitespace-pre-line text-slate-800 font-medium">
                {activeQuestion.explanation}
              </p>
            </div>
          )}

          {/* Bottom Toolbar: Prev / Next / Score */}
          <div className="mt-8 pt-4 border-t-2 border-black flex items-center justify-between">
            <div className="text-xs font-black text-[#1A1A1A]">
              Session Score: <span className="text-[#6D28D9] font-black">{sessionScore.correct}</span> / {sessionScore.total}
            </div>

            <div className="flex items-center gap-3">
              <button
                id="btn-quiz-prev"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-white hover:bg-[#FFF9F2] disabled:opacity-40 text-[#1A1A1A] border-2 border-black rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                id="btn-quiz-next"
                onClick={handleNext}
                disabled={currentIndex === availableQuestions.length - 1}
                className="px-5 py-2 bg-[#FFD100] hover:bg-[#FDE047] disabled:opacity-40 text-[#1A1A1A] border-2 border-black rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-black text-[#1A1A1A] mb-1">No Past Questions Found</h3>
          <p className="text-xs font-bold text-slate-600">Try changing the Year or Topic filter above.</p>
        </div>
      )}
    </div>
  );
};
