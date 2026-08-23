import React, { useState } from 'react';
import { X, Play, Clock, CheckSquare, Layers, BookOpen, Sparkles, Award } from 'lucide-react';
import { SubjectId } from '../types';
import { SUBJECTS_LIST } from '../data/pastQuestions';
import { FACULTY_COMBINATIONS } from '../data/subjectCombos';
import { getSubjectInfo } from '../data/questionsService';
import { playClickSound } from '../utils/sound';

interface MockExamSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: (subjectIds: SubjectId[], timeMins: number, questionCountPerSubject: number) => void;
}

export const MockExamSetupModal: React.FC<MockExamSetupModalProps> = ({
  isOpen,
  onClose,
  onStartExam
}) => {
  const [selectedFacultyIndex, setSelectedFacultyIndex] = useState<number | 'custom'>(0);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([
    'english',
    'mathematics',
    'physics',
    'chemistry'
  ]);
  const [timeMinutes, setTimeMinutes] = useState(60);
  const [questionCountPerSubject, setQuestionCountPerSubject] = useState(10);

  if (!isOpen) return null;

  const handleFacultySelect = (index: number) => {
    playClickSound();
    setSelectedFacultyIndex(index);
    setSelectedSubjects(FACULTY_COMBINATIONS[index].subjects);
  };

  const handleToggleSubject = (sId: SubjectId) => {
    playClickSound();
    setSelectedFacultyIndex('custom');
    if (sId === 'english') return; // English is mandatory in JAMB

    setSelectedSubjects((prev) => {
      if (prev.includes(sId)) {
        if (prev.length <= 2) return prev; // keep at least 2
        return prev.filter((id) => id !== sId);
      } else {
        if (prev.length >= 4) {
          // replace last
          return [...prev.slice(0, 3), sId];
        }
        return [...prev, sId];
      }
    });
  };

  const handleLaunch = () => {
    playClickSound();
    onStartExam(selectedSubjects, timeMinutes, questionCountPerSubject);
  };

  return (
    <div id="mock-exam-setup-modal-backdrop" className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div id="mock-exam-setup-container" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-700 to-teal-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-black text-white">
              CBT
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Configure JAMB UTME Mock CBT</h2>
              <p className="text-xs text-emerald-100/90">Select faculty combination, question count, and timer</p>
            </div>
          </div>
          <button
            id="btn-close-mock-setup"
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* Step 1: Faculty Combination Presets */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              1. Choose Faculty Combination Preset:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FACULTY_COMBINATIONS.map((fac, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFacultySelect(idx)}
                  className={`p-3 rounded-xl border text-left transition ${
                    selectedFacultyIndex === idx
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{fac.faculty}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    {fac.subjects.map((s) => getSubjectInfo(s).code).join(' + ')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Subject Picker (4 Subjects) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                2. Subject Selection ({selectedSubjects.length}/4 Selected):
              </label>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                *English is mandatory
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SUBJECTS_LIST.map((subj) => {
                const isSelected = selectedSubjects.includes(subj.id);
                const isMandatory = subj.id === 'english';

                return (
                  <button
                    key={subj.id}
                    onClick={() => handleToggleSubject(subj.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    <span>{subj.name}</span>
                    {isMandatory && <span className="text-[9px] bg-white/20 px-1 rounded">Req</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Question Volume & Timer Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {/* Question Count */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Questions per Subject:
              </label>
              <div className="flex items-center gap-2">
                {[10, 15, 20, 40].map((count) => (
                  <button
                    key={count}
                    onClick={() => {
                      playClickSound();
                      setQuestionCountPerSubject(count);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      questionCountPerSubject === count
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {count} Qs
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Total Exam: {selectedSubjects.length * questionCountPerSubject} questions
              </div>
            </div>

            {/* Timer Duration */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Exam Duration:
              </label>
              <div className="flex items-center gap-2">
                {[30, 45, 60, 120].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => {
                      playClickSound();
                      setTimeMinutes(mins);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      timeMinutes === mins
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Standard UTME: 120 mins for 180 questions
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {selectedSubjects.length} subjects • {selectedSubjects.length * questionCountPerSubject} questions • {timeMinutes} mins
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition"
            >
              Cancel
            </button>
            <button
              id="btn-start-configured-cbt"
              onClick={handleLaunch}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start CBT Exam</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
