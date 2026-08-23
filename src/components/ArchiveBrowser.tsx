import React, { useState } from 'react';
import { SubjectId, PastQuestion } from '../types';
import { SUBJECTS_LIST } from '../data/pastQuestions';
import { ALL_COMBINED_QUESTIONS, getSubjectInfo } from '../data/questionsService';
import {
  Archive,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  Bookmark,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calendar,
  Layers,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface ArchiveBrowserProps {
  onOpenAITutor: (context: string, subject: string) => void;
}

export const ArchiveBrowser: React.FC<ArchiveBrowserProps> = ({ onOpenAITutor }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('english');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const currentSubject = getSubjectInfo(selectedSubjectId);
  const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  const filteredQuestions = ALL_COMBINED_QUESTIONS.filter((q) => {
    const matchesSubject = q.subjectId === selectedSubjectId;
    const matchesYear = selectedYear === 'all' || q.year === selectedYear;
    const matchesSearch =
      searchTerm === '' ||
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(q.options).some((opt) => opt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSubject && matchesYear && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    playClickSound();
    setExpandedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    playClickSound();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div id="decade-archive-browser-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#6D28D9] text-white rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-[3px] border-black relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD100] text-black border-2 border-black text-xs font-black uppercase tracking-wider mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Archive className="w-4 h-4" /> 10-Year Examination Archives (2015 – 2024)
          </div>
          <h2 className="text-xl sm:text-3xl font-black mb-2">Authentic JAMB Past Question Papers</h2>
          <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
            Explore authentic past questions with comprehensive step-by-step explanations, official syllabus topics, and exam memory tips.
          </p>
        </div>
      </div>

      {/* Control Filters */}
      <div className="bg-white rounded-2xl p-5 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
        {/* Subject Pills */}
        <div>
          <label className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider block mb-2">
            Select Subject:
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {SUBJECTS_LIST.map((subj) => {
              const isSelected = subj.id === selectedSubjectId;
              return (
                <button
                  key={subj.id}
                  id={`archive-subj-btn-${subj.id}`}
                  onClick={() => {
                    playClickSound();
                    setSelectedSubjectId(subj.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition flex items-center gap-2 border-2 border-black ${
                    isSelected
                      ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]'
                  }`}
                >
                  <span>{subj.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Year Filter & Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t-2 border-black">
          {/* Year Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => {
                playClickSound();
                setSelectedYear('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition border-2 border-black ${
                selectedYear === 'all'
                  ? 'bg-[#FFD100] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]/50'
              }`}
            >
              All Years
            </button>
            {years.map((y) => (
              <button
                key={y}
                id={`archive-year-btn-${y}`}
                onClick={() => {
                  playClickSound();
                  setSelectedYear(y);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-black whitespace-nowrap transition border-2 border-black ${
                  selectedYear === y
                    ? 'bg-[#FFD100] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]/50'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              id="input-archive-search"
              type="text"
              placeholder="Search keyword, formula, concept..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFF9F2] border-2 border-black rounded-xl text-[#1A1A1A] font-bold focus:outline-none focus:ring-2 focus:ring-[#6D28D9] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>
      </div>

      {/* Questions Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#1A1A1A] font-bold px-1">
          <span>
            Found <strong className="font-black text-[#6D28D9]">{filteredQuestions.length}</strong> archived past questions for{' '}
            <strong className="underline">{currentSubject.name}</strong>
          </span>
          <span className="bg-[#FEF3C7] border border-black px-2 py-0.5 font-mono">{selectedYear === 'all' ? '2015 - 2024' : `JAMB ${selectedYear}`}</span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-black text-[#1A1A1A] mb-1">No Past Questions Match Your Filter</h3>
            <p className="text-xs font-bold text-slate-600">Try searching for a different keyword or selecting "All Years".</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedQuestionIds.has(q.id);
            const isBookmarked = bookmarkedIds.has(q.id);

            return (
              <div
                key={q.id}
                id={`archive-question-card-${q.id}`}
                className="bg-white rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="p-5 sm:p-6">
                  {/* Top tags */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-black bg-[#FFD100] px-2 py-0.5 rounded text-[11px] border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        JAMB {q.year} • Q{idx + 1}
                      </span>
                      <span className="text-[#6D28D9] font-black bg-[#EDE9FE] px-2 py-0.5 rounded border border-black">{q.topic}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleBookmark(q.id)}
                        className={`p-1.5 rounded-lg border-2 border-black transition shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                          isBookmarked
                            ? 'text-black bg-[#FFD100]'
                            : 'text-slate-600 bg-white hover:bg-[#FFD100]'
                        }`}
                        title="Bookmark question"
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Passage if any */}
                  {q.passage && (
                    <div className="bg-[#FFF9F2] p-3.5 rounded-xl border-2 border-black text-[#1A1A1A] text-xs leading-relaxed mb-4 italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <div className="font-black text-[#6D28D9] not-italic text-[11px] mb-1">Passage Excerpt:</div>
                      {q.passage}
                    </div>
                  )}

                  {/* Question body */}
                  <div className="text-sm font-bold text-[#1A1A1A] leading-relaxed mb-4 whitespace-pre-line">
                    {q.question}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                    {Object.entries(q.options).map(([key, value]) => {
                      const isCorrect = q.correctAnswer === key;
                      return (
                        <div
                          key={key}
                          className={`p-2.5 rounded-xl border-2 border-black flex items-start gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                            isExpanded && isCorrect
                              ? 'bg-[#DCFCE7] text-emerald-950 font-black'
                              : 'bg-[#FFF9F2] text-[#1A1A1A]'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md border border-black flex items-center justify-center font-black text-[11px] shrink-0 ${
                              isExpanded && isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white text-black'
                            }`}
                          >
                            {key}
                          </span>
                          <span className="leading-snug font-medium">{value}</span>
                          {isExpanded && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 ml-auto" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Toggle solution button & AI tutor button */}
                  <div className="flex items-center justify-between pt-3 border-t-2 border-black">
                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="text-xs font-black text-[#6D28D9] hover:text-[#5B21B6] bg-[#EDE9FE] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition active:translate-x-[1px] active:translate-y-[1px]"
                    >
                      <span>{isExpanded ? 'Hide Solution' : 'View Correct Answer & Solution'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        playClickSound();
                        onOpenAITutor(
                          `Past Question (JAMB ${q.year} - ${currentSubject.name}):\n${q.question}\nOptions:\nA: ${q.options.A}\nB: ${q.options.B}\nC: ${q.options.C}\nD: ${q.options.D}\nCorrect Answer: ${q.correctAnswer}\nSolution: ${q.explanation}`,
                          currentSubject.name
                        );
                      }}
                      className="text-xs font-black text-[#1A1A1A] hover:bg-[#FFD100] bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition active:translate-x-[1px] active:translate-y-[1px]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                      <span>Ask AI Explanation</span>
                    </button>
                  </div>

                  {/* Expanded Solution */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t-2 border-black bg-[#FFF9F2] -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-5 sm:p-6 text-xs text-[#1A1A1A] space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between font-black text-[#1A1A1A]">
                        <span className="flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-[#6D28D9]" />
                          <span>Correct Answer: Option {q.correctAnswer}</span>
                        </span>
                        {q.formulaOrRule && (
                          <span className="text-[11px] font-mono bg-[#FFD100] text-black px-2 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-black">
                            {q.formulaOrRule}
                          </span>
                        )}
                      </div>
                      <p className="leading-relaxed whitespace-pre-line text-slate-800 font-medium">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
