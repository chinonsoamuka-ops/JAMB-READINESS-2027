import React from 'react';
import {
  Play,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  BookOpen,
  Keyboard,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { FACULTY_COMBINATIONS } from '../data/subjectCombos';
import { SubjectId } from '../types';
import { getSubjectInfo } from '../data/questionsService';
import { playClickSound } from '../utils/sound';

interface MockCBTDashboardProps {
  onOpenMockSetup: () => void;
  onLaunchPreset: (subjectIds: SubjectId[], title: string, timeMins: number, countPerSubject: number) => void;
  onOpenAITutor: () => void;
  onOpenFormulaSheet: () => void;
}

export const MockCBTDashboard: React.FC<MockCBTDashboardProps> = ({
  onOpenMockSetup,
  onLaunchPreset,
  onOpenAITutor,
  onOpenFormulaSheet
}) => {
  const getSubjectColorTag = (subjId: SubjectId) => {
    switch (subjId) {
      case 'mathematics': return 'bg-[#DBEAFE] text-blue-900 border-black';
      case 'english': return 'bg-[#FEF3C7] text-amber-900 border-black';
      case 'physics': return 'bg-[#FCE7F3] text-pink-900 border-black';
      case 'chemistry': return 'bg-[#EDE9FE] text-purple-900 border-black';
      case 'biology': return 'bg-[#DCFCE7] text-emerald-900 border-black';
      case 'economics': return 'bg-[#FFEDD5] text-orange-900 border-black';
      case 'literature': return 'bg-[#E0E7FF] text-indigo-900 border-black';
      case 'government': return 'bg-[#CCFBF1] text-teal-900 border-black';
      default: return 'bg-slate-100 text-slate-900 border-black';
    }
  };

  return (
    <div id="mock-cbt-dashboard" className="space-y-8">
      {/* Hero Banner in Vibrant Violet (#6D28D9) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#6D28D9] border-[3px] border-black text-white p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD100] text-[#1A1A1A] text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="w-4 h-4" /> Official 2026 JAMB Standard CBT Simulator
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Master the 2026 JAMB Examination with Authentic 10-Year Past Papers
          </h1>

          <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
            Practice real questions from 2015 to 2024 with authentic 8-key keyboard navigation, instant on-screen calculator, detailed step-by-step solutions, and AI tutoring.
          </p>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="btn-hero-launch-full-cbt"
              onClick={() => {
                playClickSound();
                onOpenMockSetup();
              }}
              className="px-6 py-3.5 bg-[#FFD100] hover:bg-[#FDE047] text-[#1A1A1A] font-black text-sm rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-black text-black" />
              <span>Launch 4-Subject Mock CBT</span>
            </button>

            <button
              id="btn-hero-quick-drill"
              onClick={() => {
                playClickSound();
                onLaunchPreset(['english', 'mathematics'], 'Speed Sprint Drill', 20, 10);
              }}
              className="px-5 py-3.5 bg-white hover:bg-[#FFF9F2] text-[#1A1A1A] font-black text-sm rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Quick 15-Min Sprint</span>
            </button>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t-2 border-white/20 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#FFD100] shrink-0" />
            <span className="text-white font-bold">Decade Archives (2015–2024)</span>
          </div>
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-[#FFD100] shrink-0" />
            <span className="text-white font-bold">8-Key Shortcut Controls</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFD100] shrink-0" />
            <span className="text-white font-bold">AI Step-by-Step Tutor</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#FFD100] shrink-0" />
            <span className="text-white font-bold">400-Point Scaling System</span>
          </div>
        </div>
      </div>

      {/* Preset Faculty Exam Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#1A1A1A]">
              Faculty CBT Mock Simulations
            </h2>
            <p className="text-xs font-bold text-slate-600">
              Select your academic discipline for an authentic 4-subject exam experience.
            </p>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onOpenMockSetup();
            }}
            className="text-xs font-black text-[#6D28D9] hover:underline bg-[#FFD100] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Custom Subject Combo →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACULTY_COMBINATIONS.map((fac, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-black uppercase tracking-wider px-2 py-0.5 border-2 border-black bg-[#FFD100] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    UTME Target: {fac.targetScore}+
                  </span>
                  <span className="text-xs font-black text-[#1A1A1A] flex items-center gap-1 font-mono bg-[#FFF9F2] px-2 py-0.5 border-2 border-black">
                    <Clock className="w-3.5 h-3.5 text-[#6D28D9]" /> 60 mins
                  </span>
                </div>

                <h3 className="text-base font-black text-[#1A1A1A] mb-1 group-hover:text-[#6D28D9] transition">
                  {fac.faculty}
                </h3>

                <p className="text-xs font-medium text-slate-600 mb-4">
                  {fac.courses.slice(0, 3).join(', ')} & more
                </p>

                {/* Subject Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {fac.subjects.map((sId) => (
                    <span
                      key={sId}
                      className={`px-2.5 py-1 rounded-lg text-xs font-black border-2 ${getSubjectColorTag(sId)} shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}
                    >
                      {getSubjectInfo(sId).name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                id={`btn-launch-fac-${idx}`}
                onClick={() => {
                  playClickSound();
                  onLaunchPreset(fac.subjects, fac.faculty, 60, 10);
                }}
                className="w-full py-2.5 bg-[#FFD100] hover:bg-[#FDE047] text-[#1A1A1A] border-2 border-black rounded-xl font-black text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-black text-black" />
                <span>Start {fac.faculty.split('&')[0].trim()} Mock</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 8-Key Keyboard Navigation Guide */}
      <div className="bg-white rounded-2xl p-6 border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#6D28D9] text-white border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Keyboard className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#1A1A1A]">
              Official JAMB 8-Key CBT Keyboard Guide
            </h3>
            <p className="text-xs font-bold text-slate-600">
              JAMB CBT halls use 8 key combinations without needing a mouse to ensure maximum answering speed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5 text-center text-xs">
          <div className="bg-[#FFF9F2] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono font-black text-base text-[#6D28D9]">A</div>
            <div className="text-[11px] font-bold text-slate-700 mt-1">Option A</div>
          </div>
          <div className="bg-[#FFF9F2] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono font-black text-base text-[#6D28D9]">B</div>
            <div className="text-[11px] font-bold text-slate-700 mt-1">Option B</div>
          </div>
          <div className="bg-[#FFF9F2] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono font-black text-base text-[#6D28D9]">C</div>
            <div className="text-[11px] font-bold text-slate-700 mt-1">Option C</div>
          </div>
          <div className="bg-[#FFF9F2] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono font-black text-base text-[#6D28D9]">D</div>
            <div className="text-[11px] font-bold text-slate-700 mt-1">Option D</div>
          </div>
          <div className="bg-[#DBEAFE] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono font-black text-base text-blue-900">N</div>
            <div className="text-[11px] font-bold text-slate-700 mt-1">Next Q</div>
          </div>
          <div className="bg-[#DBEAFE] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono font-black text-base text-blue-900">P</div>
            <div className="text-[11px] font-bold text-slate-700 mt-1">Previous Q</div>
          </div>
          <div className="bg-[#FEF3C7] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono font-black text-base text-amber-900">R</div>
            <div className="text-[11px] font-bold text-slate-700 mt-1">Reverse / Flag</div>
          </div>
          <div className="bg-[#FCE7F3] p-3 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono font-black text-base text-rose-700">S</div>
            <div className="text-[11px] font-bold text-slate-700 mt-1">Submit Exam</div>
          </div>
        </div>
      </div>
    </div>
  );
};
