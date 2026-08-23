import React from 'react';
import {
  BookOpen,
  Layers,
  BarChart3,
  Archive,
  Bot,
  Calculator,
  FileText,
  Volume2,
  VolumeX,
  Play,
  Flame,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { playClickSound, setSoundEnabled, isSoundEnabled } from '../utils/sound';

export type ActiveTab = 'mock-cbt' | 'subject-practice' | 'archive' | 'analytics' | 'flashcards';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenAITutor: () => void;
  onOpenCalculator: () => void;
  onOpenFormulaSheet: () => void;
  onOpenMockSetup: () => void;
  streakDays: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenAITutor,
  onOpenCalculator,
  onOpenFormulaSheet,
  onOpenMockSetup,
  streakDays
}) => {
  const [soundOn, setSoundOn] = React.useState(true);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) playClickSound();
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'mock-cbt', label: 'CBT Mock Exam', icon: <Play className="w-4 h-4" /> },
    { id: 'subject-practice', label: 'Subject Practice', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'archive', label: 'Decade Archive', icon: <Archive className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics & Score', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b-[3px] border-black shadow-[0_4px_0_0_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6D28D9] border-2 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#1A1A1A] tracking-tight text-base sm:text-lg">
                  JAMB PrepMaster
                </span>
                <span className="bg-[#FFD100] border-2 border-black text-[#1A1A1A] text-[10px] uppercase font-black px-1.5 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  UTME 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-600 font-bold hidden sm:block">
                Decade Past Questions & CBT Simulation (2015–2024)
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#FFF9F2] p-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => {
                    playClickSound();
                    onTabChange(item.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#6D28D9] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                      : 'text-[#1A1A1A] hover:bg-[#FFD100]/40 border-2 border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Study Streak */}
            <div
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFD100] border-2 border-black text-[#1A1A1A] text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              title="Daily Study Streak"
            >
              <Flame className="w-4 h-4 fill-orange-500 text-black" />
              <span>{streakDays}d</span>
            </div>

            {/* JAMB Calculator launcher */}
            <button
              id="nav-btn-calculator"
              onClick={() => {
                playClickSound();
                onOpenCalculator();
              }}
              className="p-2 rounded-lg bg-white text-[#1A1A1A] hover:bg-[#FFF9F2] transition border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              title="Open JAMB Standard 9-digit Calculator"
            >
              <Calculator className="w-4 h-4" />
            </button>

            {/* Formula Reference launcher */}
            <button
              id="nav-btn-formula-sheet"
              onClick={() => {
                playClickSound();
                onOpenFormulaSheet();
              }}
              className="p-2 rounded-lg bg-white text-[#1A1A1A] hover:bg-[#FFF9F2] transition border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              title="Open High-Yield Formula Reference Sheet"
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* AI Tutor Button */}
            <button
              id="nav-btn-ai-tutor"
              onClick={() => {
                playClickSound();
                onOpenAITutor();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-black flex items-center gap-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              title="Ask JAMB Master AI Tutor"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Tutor</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="nav-btn-sound-toggle"
              onClick={toggleSound}
              className="p-2 rounded-lg bg-white text-slate-700 hover:text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition"
              title={soundOn ? 'Sound is Enabled' : 'Sound is Muted'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs (Scrollable Bar) */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto py-2.5 border-t-2 border-black scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  onTabChange(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black whitespace-nowrap transition flex items-center gap-1.5 border-2 border-black ${
                  isActive
                    ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-[#1A1A1A] bg-white hover:bg-[#FFD100]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
