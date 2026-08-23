import React, { useState } from 'react';
import { SubjectId, Flashcard } from '../types';
import { FLASHCARDS_DATA } from '../data/flashcards';
import { SUBJECTS_LIST } from '../data/pastQuestions';
import {
  Layers,
  Sparkles,
  RotateCw,
  CheckCircle,
  XCircle,
  HelpCircle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RefreshCcw
} from 'lucide-react';
import { playClickSound, playCorrectSound, playWrongSound } from '../utils/sound';

interface FlashcardsViewProps {
  onOpenAITutor: (context: string, subject: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ onOpenAITutor }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [needsReviewIds, setNeedsReviewIds] = useState<Set<string>>(new Set());

  const filteredCards = FLASHCARDS_DATA.filter(
    (c) => selectedSubject === 'all' || c.subjectId === selectedSubject
  );

  const currentCard: Flashcard | undefined = filteredCards[currentIndex] || filteredCards[0];

  const handleFlip = () => {
    playClickSound();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    playClickSound();
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    playClickSound();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkMastered = () => {
    if (!currentCard) return;
    playCorrectSound();
    setMasteredIds((prev) => new Set(prev).add(currentCard.id));
    setNeedsReviewIds((prev) => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    handleNext();
  };

  const handleMarkReview = () => {
    if (!currentCard) return;
    playWrongSound();
    setNeedsReviewIds((prev) => new Set(prev).add(currentCard.id));
    setMasteredIds((prev) => {
      const next = new Set(prev);
      next.delete(currentCard.id);
      return next;
    });
    handleNext();
  };

  return (
    <div id="flashcards-study-view" className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD100] text-black border-2 border-black text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Layers className="w-4 h-4" /> Spaced Repetition Memory Deck
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">High-Yield UTME Flashcards</h2>
        <p className="text-xs sm:text-sm font-bold text-slate-600 max-w-md mx-auto">
          Rapid-fire memory retention for formulas, definitions, literature terms, and core rules.
        </p>
      </div>

      {/* Subject Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center scrollbar-thin">
        <button
          onClick={() => {
            playClickSound();
            setSelectedSubject('all');
            setCurrentIndex(0);
            setIsFlipped(false);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition border-2 border-black ${
            selectedSubject === 'all'
              ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
              : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]'
          }`}
        >
          All Subjects ({FLASHCARDS_DATA.length})
        </button>

        {SUBJECTS_LIST.slice(0, 6).map((subj) => (
          <button
            key={subj.id}
            onClick={() => {
              playClickSound();
              setSelectedSubject(subj.id);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition border-2 border-black ${
              selectedSubject === subj.id
                ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]'
            }`}
          >
            {subj.name}
          </button>
        ))}
      </div>

      {/* 3D Flippable Flashcard */}
      {currentCard ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#1A1A1A] font-black px-2">
            <span>
              Card <strong className="text-[#6D28D9] font-black text-sm">{currentIndex + 1}</strong> of {filteredCards.length}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-800 bg-[#DCFCE7] border border-black px-2 py-0.5 rounded font-black">
                ✓ {masteredIds.size} Mastered
              </span>
              <span className="text-rose-800 bg-[#FFE4E6] border border-black px-2 py-0.5 rounded font-black">
                ⚡ {needsReviewIds.size} Needs Review
              </span>
            </div>
          </div>

          {/* Flashcard Area */}
          <div
            id="flashcard-interactive-card"
            onClick={handleFlip}
            className="cursor-pointer min-h-[320px] sm:min-h-[360px] bg-white border-[3px] border-black rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative select-none group"
          >
            {/* Top Card Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-[#FFD100] text-black border-2 border-black rounded-lg font-black text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                {currentCard.category}
              </span>
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1 group-hover:text-[#6D28D9] transition">
                <RotateCw className="w-3.5 h-3.5" /> Click anywhere to flip
              </span>
            </div>

            {/* Main Content (Front vs Back) */}
            <div className="my-auto text-center py-6">
              {!isFlipped ? (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="text-xs uppercase font-black text-slate-500 tracking-wider">Concept / Question</div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] leading-relaxed max-w-md mx-auto">
                    {currentCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="text-xs uppercase font-black text-[#6D28D9] tracking-wider">
                    Core Rule & Formula
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-[#1A1A1A] leading-relaxed max-w-lg mx-auto whitespace-pre-line">
                    {currentCard.back}
                  </div>
                  {currentCard.mnemonic && (
                    <div className="inline-block bg-[#FFF9F2] border-2 border-black text-[#1A1A1A] px-4 py-2 rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      💡 Mnemonic: {currentCard.mnemonic}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 border-t-2 border-black pt-4">
              <span>{isFlipped ? 'Answer Revealed' : 'Prompt / Question'}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAITutor(`Explain flashcard concept: "${currentCard.front}" - "${currentCard.back}"`, currentCard.category);
                }}
                className="text-[#6D28D9] font-black hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> Ask AI Tutor
              </button>
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              id="btn-flashcard-prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-full sm:w-auto px-4 py-2.5 bg-white hover:bg-[#FFF9F2] disabled:opacity-40 text-[#1A1A1A] border-2 border-black rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <button
                id="btn-flashcard-review"
                onClick={handleMarkReview}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-[#FFE4E6] hover:bg-[#FECDD3] text-rose-950 border-2 border-black rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <XCircle className="w-4 h-4" />
                <span>Needs Practice</span>
              </button>

              <button
                id="btn-flashcard-mastered"
                onClick={handleMarkMastered}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-[#DCFCE7] hover:bg-[#BBF7D0] text-emerald-950 border-2 border-black rounded-xl text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mastered</span>
              </button>
            </div>

            <button
              id="btn-flashcard-next"
              onClick={handleNext}
              disabled={currentIndex === filteredCards.length - 1}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#FFD100] hover:bg-[#FDE047] disabled:opacity-40 text-black border-2 border-black rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center font-bold text-slate-500">No flashcards found.</div>
      )}
    </div>
  );
};
