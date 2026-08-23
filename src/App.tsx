/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { MockCBTDashboard } from './components/MockCBTDashboard';
import { SingleSubjectQuiz } from './components/SingleSubjectQuiz';
import { ArchiveBrowser } from './components/ArchiveBrowser';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { FlashcardsView } from './components/FlashcardsView';
import { CBTExamModal } from './components/CBTExamModal';
import { MockExamSetupModal } from './components/MockExamSetupModal';
import { JambCalculator } from './components/JambCalculator';
import { FormulaSheetModal } from './components/FormulaSheetModal';
import { AITutorModal } from './components/AITutorModal';
import { SubjectId, PastQuestion } from './types';
import { generateQuestionDrill, loadUserStats, ALL_COMBINED_QUESTIONS } from './data/questionsService';
import { playClickSound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('mock-cbt');
  const [stats, setStats] = useState(loadUserStats());

  // Modal States
  const [isCBTExamOpen, setIsCBTExamOpen] = useState(false);
  const [examQuestions, setExamQuestions] = useState<PastQuestion[]>([]);
  const [examSubjectIds, setExamSubjectIds] = useState<SubjectId[]>(['english', 'mathematics', 'physics', 'chemistry']);
  const [examMode, setExamMode] = useState<'full-mock' | 'single-subject' | 'speed-drill' | 'topic-drill'>('full-mock');
  const [examTimeLimitMinutes, setExamTimeLimitMinutes] = useState(60);

  const [isMockSetupOpen, setIsMockSetupOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [aiTutorContext, setAiTutorContext] = useState<string | undefined>(undefined);
  const [aiTutorSubject, setAiTutorSubject] = useState<string>('General JAMB UTME');

  useEffect(() => {
    setStats(loadUserStats());
  }, [isCBTExamOpen]);

  // Handler to launch exam session
  const handleStartExam = (subjectIds: SubjectId[], timeMins: number, countPerSubject: number) => {
    const drillQuestions = generateQuestionDrill(subjectIds, countPerSubject);
    setExamQuestions(drillQuestions);
    setExamSubjectIds(subjectIds);
    setExamTimeLimitMinutes(timeMins);
    setExamMode('full-mock');
    setIsMockSetupOpen(false);
    setIsCBTExamOpen(true);
  };

  // Handler for faculty presets
  const handleLaunchPreset = (subjectIds: SubjectId[], title: string, timeMins: number, countPerSubject: number) => {
    const drillQuestions = generateQuestionDrill(subjectIds, countPerSubject);
    setExamQuestions(drillQuestions);
    setExamSubjectIds(subjectIds);
    setExamTimeLimitMinutes(timeMins);
    setExamMode('full-mock');
    setIsCBTExamOpen(true);
  };

  // Handler for single subject launch from quiz view
  const handleLaunchSingleSubject = (subjectIds: SubjectId[], mode: any, timeMins: number) => {
    const drillQuestions = generateQuestionDrill(subjectIds, 15);
    setExamQuestions(drillQuestions);
    setExamSubjectIds(subjectIds);
    setExamTimeLimitMinutes(timeMins);
    setExamMode('single-subject');
    setIsCBTExamOpen(true);
  };

  // Open AI Tutor with specific question context
  const handleOpenAITutorWithContext = (context: string, subject: string) => {
    setAiTutorContext(context);
    setAiTutorSubject(subject);
    setIsAITutorOpen(true);
  };

  // Open AI Tutor generically
  const handleOpenAITutorGeneric = () => {
    setAiTutorContext(undefined);
    setAiTutorSubject('General JAMB UTME');
    setIsAITutorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#FFD100] selection:text-black">
      {/* Primary Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAITutor={handleOpenAITutorGeneric}
        onOpenCalculator={() => setIsCalculatorOpen(!isCalculatorOpen)}
        onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
        onOpenMockSetup={() => setIsMockSetupOpen(true)}
        streakDays={stats.currentStreakDays}
      />

      {/* Main Tab Views */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {activeTab === 'mock-cbt' && (
          <MockCBTDashboard
            onOpenMockSetup={() => setIsMockSetupOpen(true)}
            onLaunchPreset={handleLaunchPreset}
            onOpenAITutor={handleOpenAITutorGeneric}
            onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
          />
        )}

        {activeTab === 'subject-practice' && (
          <SingleSubjectQuiz
            onOpenAITutor={handleOpenAITutorWithContext}
            onLaunchFullExam={handleLaunchSingleSubject}
          />
        )}

        {activeTab === 'archive' && (
          <ArchiveBrowser onOpenAITutor={handleOpenAITutorWithContext} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            onLaunchTopicDrill={(sId) => {
              setActiveTab('subject-practice');
            }}
            onOpenAITutor={handleOpenAITutorWithContext}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView onOpenAITutor={handleOpenAITutorWithContext} />
        )}
      </main>

      {/* Persistent Docked Tools & Modals */}
      <JambCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <FormulaSheetModal
        isOpen={isFormulaSheetOpen}
        onClose={() => setIsFormulaSheetOpen(false)}
      />

      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        initialQuestionContext={aiTutorContext}
        initialSubject={aiTutorSubject}
      />

      <MockExamSetupModal
        isOpen={isMockSetupOpen}
        onClose={() => setIsMockSetupOpen(false)}
        onStartExam={handleStartExam}
      />

      {isCBTExamOpen && (
        <CBTExamModal
          isOpen={isCBTExamOpen}
          onClose={() => setIsCBTExamOpen(false)}
          questions={examQuestions}
          subjectIds={examSubjectIds}
          mode={examMode}
          timeLimitMinutes={examTimeLimitMinutes}
          onOpenAITutor={handleOpenAITutorWithContext}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t-[3px] border-black bg-white py-6 text-center text-xs font-bold text-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FFD100] border-2 border-black"></span>
            <span>JAMB PrepMaster 2026 • 10-Year Past Question Archives & CBT Exam Simulator</span>
          </div>
          <div className="bg-[#FEF3C7] border-2 border-black px-3 py-1 text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Aligned with Official JAMB / UTME Syllabus
          </div>
        </div>
      </footer>
    </div>
  );
}
