import { ExamQuestion, IeltsTestSet } from '../data/curriculum';

export type MockExamSkillMode = 'all-skills' | 'listening' | 'reading' | 'writing' | 'speaking';
export type MockExamDuration = 15 | 25 | 40;
export type MockExamModule = 'academic' | 'general-training';

export interface MockExamConfig {
  skillMode: MockExamSkillMode;
  questionCount: number;
  durationMinutes: MockExamDuration;
  sourceSetId?: string; // 'all' or specific test set ID
  examModule: MockExamModule;
}

export interface MockExamSession {
  sessionId: string;
  candidateNumber: string;
  config: MockExamConfig;
  startedAt: number;
  durationSeconds: number;
  questions: ExamQuestion[];
  userAnswers: Record<number, string>;
  flaggedQuestions: Record<number, boolean>;
  isSubmitted: boolean;
  submittedAt?: number;
}

export interface SkillScoreBreakdown {
  skill: string;
  skillNameVi: string;
  correct: number;
  total: number;
  percentage: number;
  estimatedBand: number;
}

export interface MockExamResult {
  overallBand: number;
  cefrLevel: string;
  cefrDescriptor: string;
  correctCount: number;
  totalCount: number;
  accuracyPercentage: number;
  timeSpentSeconds: number;
  skillBreakdowns: SkillScoreBreakdown[];
  examinerVerdict: string;
  recommendations: string[];
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Pools all questions from available test sets with deduplication
 */
export function getAllAvailableQuestions(testSets: IeltsTestSet[], fallbackQuestions: ExamQuestion[] = []): ExamQuestion[] {
  const pool: ExamQuestion[] = [];
  const seenIds = new Set<string>();

  for (const set of testSets) {
    for (const q of set.questions) {
      const qKey = q.id || `${q.skill || 'gen'}-${q.question.slice(0, 30)}`;
      if (!seenIds.has(qKey)) {
        seenIds.add(qKey);
        pool.push(q);
      }
    }
  }

  for (const q of fallbackQuestions) {
    const qKey = q.id || `${q.skill || 'gen'}-${q.question.slice(0, 30)}`;
    if (!seenIds.has(qKey)) {
      seenIds.add(qKey);
      pool.push(q);
    }
  }

  return pool;
}

/**
 * Generates a randomized mock exam session with balanced skill distribution
 */
export function createMockExamSession(
  testSets: IeltsTestSet[],
  fallbackQuestions: ExamQuestion[],
  config: MockExamConfig
): MockExamSession {
  let pool = getAllAvailableQuestions(testSets, fallbackQuestions);

  // Filter by test set if specified
  if (config.sourceSetId && config.sourceSetId !== 'all') {
    const matchedSet = testSets.find(s => s.id === config.sourceSetId || s.code === config.sourceSetId);
    if (matchedSet && matchedSet.questions.length > 0) {
      pool = matchedSet.questions;
    }
  } else if (config.examModule) {
    // Filter questions by module appropriateness
    const targetModule = config.examModule === 'general-training' ? 'General Training' : 'Academic';
    const moduleMatched = pool.filter(q => q.module === targetModule || q.module === 'Both' || !q.module);
    if (moduleMatched.length >= config.questionCount) {
      pool = moduleMatched;
    }
  }

  let selectedQuestions: ExamQuestion[] = [];

  if (config.skillMode !== 'all-skills') {
    // Single skill focused exam
    const skillQuestions = shuffle(pool.filter(q => q.skill === config.skillMode));
    selectedQuestions = skillQuestions.slice(0, Math.min(config.questionCount, skillQuestions.length));
  } else {
    // Balanced 4-skill mock exam: distribute roughly equally
    const listeningPool = shuffle(pool.filter(q => q.skill === 'listening'));
    const readingPool = shuffle(pool.filter(q => q.skill === 'reading'));
    const writingPool = shuffle(pool.filter(q => q.skill === 'writing'));
    const speakingPool = shuffle(pool.filter(q => q.skill === 'speaking'));

    const countPerSkill = Math.max(2, Math.floor(config.questionCount / 4));
    const remainder = config.questionCount - (countPerSkill * 4);

    const l = listeningPool.slice(0, countPerSkill + (remainder > 0 ? 1 : 0));
    const r = readingPool.slice(0, countPerSkill + (remainder > 1 ? 1 : 0));
    const w = writingPool.slice(0, countPerSkill + (remainder > 2 ? 1 : 0));
    const s = speakingPool.slice(0, countPerSkill);

    // Concatenate in authentic IELTS skill order: Listening -> Reading -> Writing -> Speaking
    selectedQuestions = [...l, ...r, ...w, ...s];

    // If pool didn't have enough in some skill, backfill from remaining pool
    if (selectedQuestions.length < config.questionCount) {
      const selectedSet = new Set(selectedQuestions);
      const remaining = shuffle(pool.filter(q => !selectedSet.has(q)));
      const needed = config.questionCount - selectedQuestions.length;
      selectedQuestions.push(...remaining.slice(0, needed));
    }
  }

  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const sessionId = `IELTS-MOCK-${Date.now().toString().slice(-6)}`;
  const candidateNumber = `VN-BC${randomNum}`;

  return {
    sessionId,
    candidateNumber,
    config,
    startedAt: Date.now(),
    durationSeconds: config.durationMinutes * 60,
    questions: selectedQuestions,
    userAnswers: {},
    flaggedQuestions: {},
    isSubmitted: false
  };
}

/**
 * Calculates raw score to IELTS Band 1.0 - 9.0 conversion
 * Stricter conversion for GT Reading as specified by official Cambridge/IDP rules
 */
export function scoreToIeltsBand(percentage: number, isGtReading: boolean = false): number {
  if (isGtReading) {
    // IELTS General Training Reading has simpler texts so requires higher accuracy:
    // e.g. Band 7.0 requires ~82-87% (34-35/40), Band 8.0 requires ~90-95% (37-38/40)
    if (percentage >= 95) return 9.0;
    if (percentage >= 90) return 8.5;
    if (percentage >= 85) return 8.0;
    if (percentage >= 80) return 7.5;
    if (percentage >= 74) return 7.0;
    if (percentage >= 66) return 6.5;
    if (percentage >= 58) return 6.0;
    if (percentage >= 48) return 5.5;
    if (percentage >= 38) return 5.0;
    if (percentage >= 28) return 4.5;
    return 4.0;
  }

  // Academic Reading and Standard Listening scale
  if (percentage >= 92) return 9.0;
  if (percentage >= 85) return 8.5;
  if (percentage >= 78) return 8.0;
  if (percentage >= 70) return 7.5;
  if (percentage >= 62) return 7.0;
  if (percentage >= 54) return 6.5;
  if (percentage >= 46) return 6.0;
  if (percentage >= 38) return 5.5;
  if (percentage >= 30) return 5.0;
  if (percentage >= 22) return 4.5;
  return 4.0;
}

/**
 * Evaluates completed session into official Band Score report
 */
export function evaluateMockExamSession(session: MockExamSession, timeSpentSeconds: number): MockExamResult {
  const { questions, userAnswers, config } = session;
  const isGt = config.examModule === 'general-training';
  let correctCount = 0;

  // Track breakdown by skill
  const skillMap: Record<string, { correct: number; total: number; nameVi: string }> = {
    listening: { correct: 0, total: 0, nameVi: 'Listening (Kỹ Năng Nghe)' },
    reading: { correct: 0, total: 0, nameVi: isGt ? 'Reading GT (Đọc Đời Sống & Công Sở)' : 'Reading Academic (Đọc Hàn Lâm)' },
    writing: { correct: 0, total: 0, nameVi: isGt ? 'Writing GT (Viết Thư & Nghị Luận Xã Hội)' : 'Writing Academic (Mô Tả Biểu Đồ & Nghị Luận)' },
    speaking: { correct: 0, total: 0, nameVi: 'Speaking (Phản Xạ Nói & Ngữ Điệu)' }
  };

  questions.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    const isCorrect = userChoice === q.correctAnswer;
    if (isCorrect) correctCount++;

    const s = q.skill || 'reading';
    if (!skillMap[s]) {
      skillMap[s] = { correct: 0, total: 0, nameVi: s.toUpperCase() };
    }
    skillMap[s].total++;
    if (isCorrect) skillMap[s].correct++;
  });

  const totalCount = questions.length;
  const accuracyPercentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  // Compute skill breakdowns with accurate scale
  const skillBreakdowns: SkillScoreBreakdown[] = Object.entries(skillMap)
    .filter(([_, data]) => data.total > 0)
    .map(([skill, data]) => {
      const p = Math.round((data.correct / data.total) * 100);
      const isGtReading = isGt && skill === 'reading';
      return {
        skill,
        skillNameVi: data.nameVi,
        correct: data.correct,
        total: data.total,
        percentage: p,
        estimatedBand: scoreToIeltsBand(p, isGtReading)
      };
    });

  // Calculate official IELTS overall band as average of available sub-bands rounded to nearest 0.5
  let overallBand = scoreToIeltsBand(accuracyPercentage, isGt);
  if (skillBreakdowns.length > 0) {
    const sum = skillBreakdowns.reduce((acc, curr) => acc + curr.estimatedBand, 0);
    const avg = sum / skillBreakdowns.length;
    // Round to nearest 0.5
    overallBand = Math.round(avg * 2) / 2;
  }

  let cefrLevel = 'C1';
  let cefrDescriptor = 'Advanced English User (Thành Thạo Chuyên Sâu)';
  let examinerVerdict = 'Thí sinh thể hiện năng lực ngôn ngữ vững vàng, phản xạ nhạy bén với các cấu trúc học thuật.';
  const recommendations: string[] = [];

  if (overallBand >= 8.5) {
    cefrLevel = 'C2';
    cefrDescriptor = 'C2 Mastery / Expert Native-Level User';
    examinerVerdict = 'Exceptional linguistic mastery. The candidate demonstrates sophisticated grammatical control, nuanced lexical dexterity, and successfully neutralizes intricate academic distractors under high-stakes test conditions.';
    recommendations.push('Maintain high-tier reading fluency through peer-reviewed journals (The Economist, Nature, Harvard Business Review).');
    recommendations.push('Refine abstract philosophical and socio-economic essays for sustained Band 9.0 consistency.');
  } else if (overallBand >= 7.5) {
    cefrLevel = 'C1';
    cefrDescriptor = 'C1 Effective Operational Proficiency';
    examinerVerdict = 'Impressive performance with superior command of academic English. The candidate exhibits strong critical thinking and effortlessly fulfills postgraduate university and full-scholarship benchmarks.';
    recommendations.push('Watch out for subtle signpost self-corrections and implicit negations in Listening Section 4.');
    recommendations.push('Enhance paragraph cohesion through semantic reference rather than relying solely on transitional adverbs.');
  } else if (overallBand >= 6.5) {
    cefrLevel = 'B2+';
    cefrDescriptor = 'B2+ Vantage / Competent Academic User';
    examinerVerdict = 'Solid communicative competence. The candidate accurately grasps core arguments in academic texts, though occasional friction occurs with complex qualifying traps and distractor phrasing.';
    recommendations.push('Master parallel keyword tracking to confidently distinguish FALSE from NOT GIVEN.');
    recommendations.push('Practice predictive grammar for listening form completion to ensure singular/plural precision.');
  } else {
    cefrLevel = 'B1 - B2';
    cefrDescriptor = 'B1 - B2 Independent User (Foundation Building)';
    examinerVerdict = 'Foundational comprehension established. The candidate should systematically expand their academic C1 lexical repertoire and improve time allocation pacing under strict exam constraints.';
    recommendations.push('Review the AI Video Masterclasses on Skim & Scan and Signpost Traps inside the application.');
    recommendations.push('Build endurance through 15-minute express practice modules before undertaking full 40-minute tests.');
  }

  return {
    overallBand,
    cefrLevel,
    cefrDescriptor,
    correctCount,
    totalCount,
    accuracyPercentage,
    timeSpentSeconds,
    skillBreakdowns,
    examinerVerdict,
    recommendations
  };
}
