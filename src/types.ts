export type SubjectId =
  | 'english'
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'economics'
  | 'literature'
  | 'government'
  | 'crk'
  | 'commerce'
  | 'accounting'
  | 'agric';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  code: string;
  color: string;
  bgGradient: string;
  iconName: string;
  description: string;
  totalQuestions: number;
  topics: string[];
}

export type QuestionOptionKey = 'A' | 'B' | 'C' | 'D';

export interface PastQuestion {
  id: string;
  subjectId: SubjectId;
  year: number; // 2015 - 2024
  questionNumber: number;
  question: string;
  passage?: string; // For English comprehension/cloze or literature excerpts
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: QuestionOptionKey;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  formulaOrRule?: string;
  diagramSvg?: string;
}

export interface ExamAttempt {
  id: string;
  timestamp: number;
  mode: 'full-mock' | 'single-subject' | 'speed-drill' | 'topic-drill';
  subjectIds: SubjectId[];
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  totalTimeSpentSeconds: number; // seconds
  scorePercentage: number;
  estimatedJambScore?: number; // 0 - 400
  subjectBreakdown: {
    subjectId: SubjectId;
    total: number;
    correct: number;
    score: number;
    timeSpent: number;
  }[];
  topicPerformance: {
    topic: string;
    subjectId: SubjectId;
    total: number;
    correct: number;
  }[];
  userAnswers: Record<string, QuestionOptionKey | null>;
  flaggedQuestions?: string[];
}

export interface UserStats {
  totalTestsTaken: number;
  totalQuestionsAnswered: number;
  totalCorrect: number;
  averageAccuracy: number;
  predictedJambScore: number;
  currentStreakDays: number;
  lastActiveDate: string;
  bookmarkedQuestionIds: string[];
  recentAttempts: ExamAttempt[];
  subjectMastery: Record<SubjectId, { attempts: number; accuracy: number; totalAnswered: number }>;
}

export interface Flashcard {
  id: string;
  subjectId: SubjectId;
  topic: string;
  front: string;
  back: string;
  category: 'Formula' | 'Concept' | 'Grammar Rule' | 'Mnemonic' | 'Reagent';
  mnemonic?: string;
  tip?: string;
}

export interface FacultyCombination {
  faculty: string;
  courses: string[];
  subjects: SubjectId[];
  targetScore: number;
}
