import { PastQuestion, SubjectId, ExamAttempt, UserStats } from '../types';
import { PAST_QUESTIONS_BANK, SUBJECTS_LIST } from './pastQuestions';
import { ADDITIONAL_PAST_QUESTIONS } from './expandedQuestions';

export const ALL_COMBINED_QUESTIONS: PastQuestion[] = [
  ...PAST_QUESTIONS_BANK,
  ...ADDITIONAL_PAST_QUESTIONS,
];

// Helper to get questions for a given subject
export function getQuestionsBySubject(subjectId: SubjectId): PastQuestion[] {
  return ALL_COMBINED_QUESTIONS.filter((q) => q.subjectId === subjectId);
}

// Helper to get questions for subject and specific year
export function getQuestionsBySubjectAndYear(subjectId: SubjectId, year: number): PastQuestion[] {
  return ALL_COMBINED_QUESTIONS.filter((q) => q.subjectId === subjectId && q.year === year);
}

// Helper to get questions by topic
export function getQuestionsByTopic(subjectId: SubjectId, topic: string): PastQuestion[] {
  return ALL_COMBINED_QUESTIONS.filter((q) => q.subjectId === subjectId && q.topic.toLowerCase().includes(topic.toLowerCase()));
}

// Get subject details
export function getSubjectInfo(subjectId: SubjectId) {
  return SUBJECTS_LIST.find((s) => s.id === subjectId) || SUBJECTS_LIST[0];
}

// Generate random question drill
export function generateQuestionDrill(
  subjectIds: SubjectId[],
  countPerSubject: number = 10,
  filterYear?: number,
  filterTopic?: string
): PastQuestion[] {
  const result: PastQuestion[] = [];

  subjectIds.forEach((subjId) => {
    let pool = ALL_COMBINED_QUESTIONS.filter((q) => q.subjectId === subjId);
    if (filterYear) {
      const yearMatches = pool.filter((q) => q.year === filterYear);
      if (yearMatches.length > 0) pool = yearMatches;
    }
    if (filterTopic) {
      const topicMatches = pool.filter((q) => q.topic.toLowerCase().includes(filterTopic.toLowerCase()));
      if (topicMatches.length > 0) pool = topicMatches;
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, countPerSubject);
    result.push(...selected);
  });

  return result;
}

// Local Storage Keys
const STATS_STORAGE_KEY = 'jamb_cbt_user_stats_v1';

export const DEFAULT_USER_STATS: UserStats = {
  totalTestsTaken: 0,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  averageAccuracy: 0,
  predictedJambScore: 210,
  currentStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  bookmarkedQuestionIds: [],
  recentAttempts: [],
  subjectMastery: {
    english: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    mathematics: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    physics: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    chemistry: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    biology: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    economics: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    literature: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    government: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    commerce: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    accounting: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    crk: { attempts: 0, accuracy: 0, totalAnswered: 0 },
    agric: { attempts: 0, accuracy: 0, totalAnswered: 0 },
  }
};

export function loadUserStats(): UserStats {
  try {
    const saved = localStorage.getItem(STATS_STORAGE_KEY);
    if (!saved) return DEFAULT_USER_STATS;
    const parsed = JSON.parse(saved);
    return { ...DEFAULT_USER_STATS, ...parsed };
  } catch (e) {
    console.error('Failed to load user stats from localStorage:', e);
    return DEFAULT_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats to localStorage:', e);
  }
}

export function recordExamAttempt(attempt: ExamAttempt): UserStats {
  const current = loadUserStats();

  const newTotalTests = current.totalTestsTaken + 1;
  const newTotalAnswered = current.totalQuestionsAnswered + attempt.answeredCount;
  const newTotalCorrect = current.totalCorrect + attempt.correctCount;
  const newAccuracy = newTotalAnswered > 0 ? Math.round((newTotalCorrect / newTotalAnswered) * 100) : 0;

  // Calculate projected JAMB score (out of 400)
  // Base formula uses accuracy percentage scaled to 400 with a slight curve
  const predictedScore = Math.min(400, Math.max(120, Math.round((newAccuracy / 100) * 400)));

  // Update subject mastery
  const updatedMastery = { ...current.subjectMastery };
  attempt.subjectBreakdown.forEach((sb) => {
    const prev = updatedMastery[sb.subjectId] || { attempts: 0, accuracy: 0, totalAnswered: 0 };
    const totalAns = prev.totalAnswered + sb.total;
    const totalCorr = Math.round((prev.accuracy / 100) * prev.totalAnswered) + sb.correct;
    const newSubjAcc = totalAns > 0 ? Math.round((totalCorr / totalAns) * 100) : 0;

    updatedMastery[sb.subjectId] = {
      attempts: prev.attempts + 1,
      accuracy: newSubjAcc,
      totalAnswered: totalAns
    };
  });

  // Streak calculation
  const today = new Date().toISOString().split('T')[0];
  let newStreak = current.currentStreakDays;
  if (current.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (current.lastActiveDate === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  const updated: UserStats = {
    ...current,
    totalTestsTaken: newTotalTests,
    totalQuestionsAnswered: newTotalAnswered,
    totalCorrect: newTotalCorrect,
    averageAccuracy: newAccuracy,
    predictedJambScore: predictedScore,
    currentStreakDays: newStreak,
    lastActiveDate: today,
    recentAttempts: [attempt, ...current.recentAttempts.slice(0, 19)], // keep last 20
    subjectMastery: updatedMastery
  };

  saveUserStats(updated);
  return updated;
}
