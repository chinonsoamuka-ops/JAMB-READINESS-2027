import React, { useState, useEffect } from 'react';
import { UserStats, SubjectId } from '../types';
import { loadUserStats, getSubjectInfo } from '../data/questionsService';
import { SUBJECTS_LIST } from '../data/pastQuestions';
import { FACULTY_COMBINATIONS } from '../data/subjectCombos';
import {
  TrendingUp,
  Award,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  BarChart3,
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { playClickSound } from '../utils/sound';

interface AnalyticsDashboardProps {
  onLaunchTopicDrill: (subjectId: SubjectId) => void;
  onOpenAITutor: (context: string, subject: string) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  onLaunchTopicDrill,
  onOpenAITutor
}) => {
  const [stats, setStats] = useState<UserStats>(loadUserStats());
  const [selectedFaculty, setSelectedFaculty] = useState(FACULTY_COMBINATIONS[0]);

  useEffect(() => {
    setStats(loadUserStats());
  }, []);

  const totalAnswered = stats.totalQuestionsAnswered;
  const accuracy = stats.averageAccuracy || 0;
  const predictedScore = stats.predictedJambScore || 210;

  // Identify strongest and weakest subjects
  const subjectListWithStats = SUBJECTS_LIST.map((subj) => {
    const sMastery = stats.subjectMastery[subj.id] || { attempts: 0, accuracy: 0, totalAnswered: 0 };
    return {
      ...subj,
      accuracy: sMastery.accuracy,
      totalAnswered: sMastery.totalAnswered,
      attempts: sMastery.attempts
    };
  });

  const attemptedSubjects = subjectListWithStats.filter((s) => s.totalAnswered > 0);

  return (
    <div id="analytics-dashboard-view" className="space-y-6">
      {/* Top Banner: Predicted Score & Target */}
      <div className="bg-[#6D28D9] border-[3px] border-black rounded-3xl p-6 sm:p-8 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD100] text-black border-2 border-black text-xs font-black uppercase tracking-wider mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Award className="w-4 h-4" /> AI Performance Analytics & Predictor
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">UTME Readiness Score</h2>
            <p className="text-xs sm:text-sm text-purple-100 font-medium mt-1 max-w-lg">
              Calculated dynamically from your recent CBT mock scores, accuracy, and subject mastery.
            </p>
          </div>

          {/* Big Score Display */}
          <div className="flex items-center gap-4 bg-[#FFD100] text-[#1A1A1A] border-[3px] border-black p-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center">
              <div className="text-[11px] font-black uppercase tracking-wider text-black">Projected Score</div>
              <div className="text-4xl sm:text-5xl font-black font-mono text-[#1A1A1A] mt-1">
                {predictedScore}
                <span className="text-sm font-bold text-slate-800"> / 400</span>
              </div>
            </div>
            <div className="h-12 w-[2px] bg-black"></div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-800">Readiness Level</div>
              <div className="text-sm font-black text-[#1A1A1A] mt-1">
                {predictedScore >= 280
                  ? '🌟 Distinction / Competitive'
                  : predictedScore >= 240
                  ? '✅ Above Merit Cutoff'
                  : predictedScore >= 200
                  ? '⚡ Passing / Needs Polish'
                  : '⚠️ Intensive Practice Advised'}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t-2 border-black/30">
          <div className="bg-white text-black p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-[11px] text-slate-600 uppercase font-black">Total Practice Tests</div>
            <div className="text-xl font-black font-mono text-[#1A1A1A] mt-1">{stats.totalTestsTaken}</div>
          </div>

          <div className="bg-white text-black p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-[11px] text-slate-600 uppercase font-black">Questions Solved</div>
            <div className="text-xl font-black font-mono text-[#6D28D9] mt-1">{stats.totalQuestionsAnswered}</div>
          </div>

          <div className="bg-white text-black p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-[11px] text-slate-600 uppercase font-black">Overall Accuracy</div>
            <div className="text-xl font-black font-mono text-emerald-700 mt-1">{accuracy}%</div>
          </div>

          <div className="bg-white text-black p-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-[11px] text-slate-600 uppercase font-black">Study Streak</div>
            <div className="text-xl font-black font-mono text-amber-600 mt-1">{stats.currentStreakDays} Days 🔥</div>
          </div>
        </div>
      </div>

      {/* Target Faculty Benchmark Selector */}
      <div className="bg-white rounded-2xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-[#1A1A1A]">Target Faculty Benchmark</h3>
            <p className="text-xs font-bold text-slate-600">Compare your projected score with standard university admission targets.</p>
          </div>
          <Target className="w-5 h-5 text-[#6D28D9]" />
        </div>

        {/* Faculty Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin mb-4">
          {FACULTY_COMBINATIONS.map((fac, idx) => (
            <button
              key={idx}
              onClick={() => {
                playClickSound();
                setSelectedFaculty(fac);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition border-2 border-black ${
                selectedFaculty.faculty === fac.faculty
                  ? 'bg-[#6D28D9] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-[#FFF9F2] text-[#1A1A1A] hover:bg-[#FFD100]'
              }`}
            >
              {fac.faculty}
            </button>
          ))}
        </div>

        {/* Selected Faculty Details */}
        <div className="bg-[#FFF9F2] p-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-black text-[#1A1A1A] mb-1">{selectedFaculty.faculty}</div>
            <div className="text-xs font-medium text-slate-700">
              Popular Courses: {selectedFaculty.courses.join(', ')}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-black text-slate-600">Required UTME Combo:</span>
              {selectedFaculty.subjects.map((sId) => (
                <span key={sId} className="px-2 py-0.5 rounded bg-[#FFD100] text-black border border-black font-black text-[10px] uppercase">
                  {getSubjectInfo(sId).code}
                </span>
              ))}
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[11px] font-black text-slate-600 uppercase">Recommended Target</div>
            <div className="text-2xl font-black font-mono text-[#6D28D9]">
              {selectedFaculty.targetScore}+
            </div>
            <div className="text-[11px] font-bold text-slate-700">
              {predictedScore >= selectedFaculty.targetScore ? '✅ Current score matches target' : '⚡ ' + (selectedFaculty.targetScore - predictedScore) + ' points to reach target'}
            </div>
          </div>
        </div>
      </div>

      {/* Subject Mastery Grid */}
      <div className="bg-white rounded-2xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-[#1A1A1A]">Subject Mastery Breakdown</h3>
            <p className="text-xs font-bold text-slate-600">Track accuracy rates and launch targeted practice sessions.</p>
          </div>
          <BarChart3 className="w-5 h-5 text-[#6D28D9]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectListWithStats.map((s) => {
            const acc = s.accuracy || 0;
            return (
              <div
                key={s.id}
                className="p-4 rounded-xl border-2 border-black bg-[#FFF9F2] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#1A1A1A]">{s.name}</span>
                    <span className="text-xs font-mono font-black text-[#6D28D9]">
                      {acc > 0 ? `${acc}%` : 'Unrated'}
                    </span>
                  </div>

                  <div className="w-full bg-white border border-black h-2.5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full ${
                        acc >= 75 ? 'bg-emerald-500' : acc >= 50 ? 'bg-[#FFD100]' : 'bg-[#F43F5E]'
                      }`}
                      style={{ width: `${acc > 0 ? acc : 10}%` }}
                    ></div>
                  </div>

                  <div className="text-[11px] text-slate-700 font-bold flex justify-between">
                    <span>{s.totalAnswered} Questions Answered</span>
                    <span>{s.attempts} Tests Taken</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between">
                  <button
                    onClick={() => {
                      playClickSound();
                      onLaunchTopicDrill(s.id);
                    }}
                    className="text-xs font-black text-[#6D28D9] hover:underline flex items-center gap-1"
                  >
                    <span>Practice Drill</span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={() => {
                      playClickSound();
                      onOpenAITutor(
                        `I want to improve my score in ${s.name}. Please provide a 3-step study strategy and high-yield topics to focus on.`,
                        s.name
                      );
                    }}
                    className="text-[11px] font-bold text-slate-800 hover:text-black flex items-center gap-1 bg-white border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Sparkles className="w-3 h-3 text-orange-500 fill-orange-500" />
                    <span>AI Tips</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Exam History */}
      {stats.recentAttempts.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-base font-black text-[#1A1A1A] mb-1">Recent Test Sessions</h3>
          <p className="text-xs font-bold text-slate-600 mb-4">Historical record of completed mock exams and practice drills.</p>

          <div className="divide-y-2 divide-black/10">
            {stats.recentAttempts.map((attempt) => (
              <div key={attempt.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-black text-[#1A1A1A] flex items-center gap-2">
                    <span>{attempt.mode === 'full-mock' ? '4-Subject Full Mock' : 'Subject Drill'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFD100] text-black border border-black font-mono font-bold">
                      {new Date(attempt.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-slate-700 font-medium mt-0.5">
                    {attempt.correctCount} / {attempt.totalQuestions} Correct ({attempt.scorePercentage}%)
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-base font-black text-[#6D28D9]">
                    {attempt.estimatedJambScore || Math.round((attempt.scorePercentage / 100) * 400)}
                  </span>
                  <span className="text-[10px] text-slate-600 font-bold"> / 400</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
