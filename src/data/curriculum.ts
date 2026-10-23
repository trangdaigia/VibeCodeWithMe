import { englishCourse } from './courses/english';
import { chineseCourse } from './courses/chinese';
import { japaneseCourse } from './courses/japanese';
import { koreanCourse } from './courses/korean';
import { frenchCourse } from './courses/french';
import { germanCourse } from './courses/german';
import { spanishCourse } from './courses/spanish';

export type LearningTrack = 'daily' | 'workplace' | 'academic';

export type ExerciseType = 
  | 'flashcard' 
  | 'sentence_build' 
  | 'quiz_choice' 
  | 'fill_blank' 
  | 'listening_drill'
  | 'speaking_drill'
  | 'writing_drill';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  targetText?: string;
  romanization?: string;
  vietnameseMeaning?: string;
  audioText?: string;
  wordTokens?: string[];
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  culturalNote?: string;
  // Enhanced Speaking & Writing drill properties
  speakingHints?: string[];
  targetPhonetic?: string;
  requiredKeywords?: string[];
  acceptableAnswers?: string[];
  minWords?: number;
  grammarFocus?: string;
  sampleAnswers?: string[];
}

export interface Lesson {
  id: string;
  track: LearningTrack;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  exercises: Exercise[];
}

export interface ExamQuestion {
  id?: string;
  skill?: 'listening' | 'reading' | 'writing' | 'speaking';
  sectionOrPart?: string;
  question: string;
  passage?: string;
  audioScript?: string;
  options: string[];
  correctAnswer: string;
  explanationInVietnamese: string;
  bandTarget?: string;
  trapAnalysis?: string;
  module?: 'Academic' | 'General Training' | 'Both';
}

export interface WritingModelPrompt {
  id: string;
  taskType: 'Task 1' | 'Task 2';
  title: string;
  prompt: string;
  chartDescription?: string;
  letterTone?: 'Formal' | 'Semi-formal' | 'Informal';
  module?: 'Academic' | 'General Training' | 'Both';
  bandScore: string;
  modelAnswer: string;
  outline: { point: string; explanation: string }[];
  keyVocabulary: { word: string; meaning: string; phonetic?: string }[];
  examinerComment: string;
}

export interface SpeakingCueCard {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  cueCardPrompt: string;
  bulletPoints?: string[];
  bandScore: string;
  modelAnswer: string;
  areaBreakdown?: { step: string; content: string }[];
  idiomaticExpressions: { phrase: string; meaning: string }[];
}

export interface IeltsTestSet {
  id: string;
  code: string;
  title: string;
  year: string;
  edition: string;
  difficulty: 'Tiêu chuẩn (Band 6.0-7.0)' | 'Nâng cao (Band 7.0-8.0)' | 'Thử thách chuyên sâu (Band 8.0+)';
  description: string;
  targetBand: string;
  estimatedTimeMinutes: number;
  tags: string[];
  module?: 'academic' | 'general-training';
  questions: ExamQuestion[];
  writingPrompts?: WritingModelPrompt[];
  speakingCueCards?: SpeakingCueCard[];
}

export interface IeltsVideoLesson {
  id: string;
  title: string;
  skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'overall';
  durationMinutes: number;
  durationLabel: string;
  instructorName: string;
  instructorTitle: string;
  badge: string;
  summary: string;
  chapters: { time: string; seconds: number; title: string; content: string }[];
  keyTakeaways: string[];
  subtitles: { timeSec: number; en: string; vi: string }[];
  slides: {
    title: string;
    subtitle?: string;
    bulletPoints: string[];
    formula?: string;
    highlightTip?: string;
  }[];
  miniQuiz?: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface ExamInfo {
  examName: string;
  targetLevel: string;
  overview: string;
  formatSections: string[];
  strategyTips: string[];
  sampleQuestions: ExamQuestion[];
  writingPrompts?: WritingModelPrompt[];
  speakingCueCards?: SpeakingCueCard[];
  testSets?: IeltsTestSet[];
  videoLessons?: IeltsVideoLesson[];
}

export interface Unit {
  id: string;
  number: number;
  track: LearningTrack;
  title: string;
  description: string;
  cefrLevel: string;
  lessons: Lesson[];
}

export interface Scenario {
  id: string;
  track: LearningTrack;
  title: string;
  context: string;
  location: string;
  characterName: string;
  characterRole: string;
  characterAvatar: string;
  starterMessage: {
    text: string;
    romanization: string;
    vietnameseTranslation: string;
  };
  objectives: string[];
}

export interface VocabCard {
  id: string;
  track: LearningTrack;
  word: string;
  romanization?: string;
  meaning: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleTranslation: string;
  category: string;
  easeFactor: number;
  repetitions: number;
  intervalDays: number;
  nextReviewDate: string;
  status: 'New' | 'Learning' | 'Reviewing' | 'Mastered';
}

export interface CulturalTip {
  id: string;
  topic: string;
  rule: string;
  doText: string;
  dontText: string;
  essentialPhrase: string;
  phraseTranslation: string;
}

export interface LanguageCourse {
  id: string;
  name: string;
  nativeName: string;
  vietnameseName: string;
  flagEmoji: string;
  flagColor: string;
  voiceLangCode: string;
  scriptType: string;
  examInfo: ExamInfo[];
  units: Unit[];
  scenarios: Scenario[];
  vocabCards: VocabCard[];
  culturalTips: CulturalTip[];
}

export const LANGUAGE_COURSES: Record<string, LanguageCourse> = {
  english: englishCourse,
  chinese: chineseCourse,
  japanese: japaneseCourse,
  korean: koreanCourse,
  french: frenchCourse,
  german: germanCourse,
  spanish: spanishCourse
};
