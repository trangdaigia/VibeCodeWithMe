import {
  AI_VIDEO_LESSONS,
  AI_VIRTUAL_INSTRUCTORS,
  AiVideoLesson,
  AiVideoSegment,
  AiVirtualInstructor,
  VideoLevelTier
} from '../data/aiVideoCurriculum';

const LEVEL_ORDER: Record<VideoLevelTier, number> = {
  basic: 1,
  intermediate: 2,
  advanced: 3
};

export function getVideoLessonsByLanguage(
  languageId: string,
  customLessons: AiVideoLesson[] = []
): AiVideoLesson[] {
  const safeLang = AI_VIDEO_LESSONS.some((l) => l.languageId === languageId)
    ? languageId
    : 'english';

  const combined = [
    ...AI_VIDEO_LESSONS.filter((l) => l.languageId === safeLang),
    ...customLessons.filter((l) => l.languageId === safeLang)
  ];

  return combined.sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
}

export function filterVideoLessonsByTier(
  lessons: AiVideoLesson[],
  tierFilter: 'all' | VideoLevelTier
): AiVideoLesson[] {
  if (tierFilter === 'all') return lessons;
  return lessons.filter((lesson) => lesson.level === tierFilter);
}

export function getInstructorsForLanguage(languageId: string): AiVirtualInstructor[] {
  return AI_VIRTUAL_INSTRUCTORS[languageId] || AI_VIRTUAL_INSTRUCTORS['english'];
}

export function findActiveSegmentIndex(
  segments: AiVideoSegment[],
  currentTimeSeconds: number
): number {
  if (segments.length === 0) return 0;
  const clamped = Math.max(0, currentTimeSeconds);
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (clamped >= seg.startTime && clamped < seg.endTime) {
      return i;
    }
  }
  if (clamped >= segments[segments.length - 1].endTime) {
    return segments.length - 1;
  }
  return 0;
}

export function formatVideoTimestamp(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  const mm = mins < 10 ? `0${mins}` : `${mins}`;
  const ss = secs < 10 ? `0${secs}` : `${secs}`;
  return `${mm}:${ss}`;
}

export interface VideoProgressSummary {
  totalCount: number;
  completedCount: number;
  percent: number;
  basicCompleted: boolean;
  intermediateCompleted: boolean;
  advancedCompleted: boolean;
}

export function computeVideoCurriculumProgress(
  languageLessons: AiVideoLesson[],
  completedVideoIds: string[]
): VideoProgressSummary {
  const totalCount = languageLessons.length;
  if (totalCount === 0) {
    return {
      totalCount: 0,
      completedCount: 0,
      percent: 0,
      basicCompleted: false,
      intermediateCompleted: false,
      advancedCompleted: false
    };
  }

  const completedSet = new Set(completedVideoIds);
  const completedCount = languageLessons.filter((l) => completedSet.has(l.id)).length;
  const percent = Math.round((completedCount / totalCount) * 100);

  const basicLessons = languageLessons.filter((l) => l.level === 'basic');
  const interLessons = languageLessons.filter((l) => l.level === 'intermediate');
  const advLessons = languageLessons.filter((l) => l.level === 'advanced');

  return {
    totalCount,
    completedCount,
    percent,
    basicCompleted: basicLessons.length > 0 && basicLessons.every((l) => completedSet.has(l.id)),
    intermediateCompleted: interLessons.length > 0 && interLessons.every((l) => completedSet.has(l.id)),
    advancedCompleted: advLessons.length > 0 && advLessons.every((l) => completedSet.has(l.id))
  };
}

export interface CustomAiVideoInput {
  languageId: string;
  level: VideoLevelTier;
  topicTitle: string;
  targetSentence: string;
  phoneticHint?: string;
  vietnameseMeaning: string;
  instructorId?: string;
}

export function buildCustomAiVideoLesson(input: CustomAiVideoInput): AiVideoLesson {
  const trimmedTitle = input.topicTitle.trim();
  const trimmedSentence = input.targetSentence.trim();
  const trimmedMeaning = input.vietnameseMeaning.trim();

  if (!trimmedTitle || !trimmedSentence || !trimmedMeaning) {
    throw new Error('Vui lòng nhập đầy đủ tiêu đề chủ đề, câu mẫu ngoại ngữ và nghĩa tiếng Việt.');
  }

  const instructors = getInstructorsForLanguage(input.languageId);
  const chosenInstructor =
    instructors.find((inst) => inst.id === input.instructorId) || instructors[0];

  const levelBadgeMap: Record<VideoLevelTier, { badge: string; cefr: string; xp: number }> = {
    basic: { badge: 'Cơ bản • Studio AI', cefr: 'A1–A2', xp: 45 },
    intermediate: { badge: 'Trung cấp • Studio AI', cefr: 'B1–B2', xp: 60 },
    advanced: { badge: 'Nâng cao • Studio AI', cefr: 'C1–C2', xp: 80 }
  };

  const tierMeta = levelBadgeMap[input.level];
  const phonetic = input.phoneticHint?.trim() || `[Phiên âm chuẩn AI: ${trimmedSentence.slice(0, 38)}]`;
  const words = trimmedSentence.split(/\s+/).filter(Boolean);
  const keyTerm1 = words.slice(0, Math.min(2, words.length)).join(' ') || trimmedSentence;
  const keyTerm2 = words.slice(-Math.min(2, words.length)).join(' ') || trimmedSentence;

  const lessonId = `vid-custom-${input.languageId}-${Date.now()}`;

  return {
    id: lessonId,
    languageId: input.languageId,
    level: input.level,
    levelBadge: tierMeta.badge,
    cefrCode: tierMeta.cefr,
    title: `Clip AI Tùy Chỉnh: ${trimmedTitle}`,
    subtitle: `Bài giảng Người Ảo & Giọng Ảo AI tạo theo chủ đề cá nhân hóa của bạn (${tierMeta.cefr}).`,
    durationSeconds: 36,
    xpReward: tierMeta.xp,
    instructorId: chosenInstructor.id,
    segments: [
      {
        id: `${lessonId}-s1`,
        startTime: 0,
        endTime: 12,
        chapterTitle: '1. Giới thiệu Mẫu câu Trọng tâm',
        gesture: 'welcoming',
        targetScript: trimmedSentence,
        phoneticScript: phonetic,
        vietnameseSub: `Hãy lắng nghe câu mẫu trọng tâm của chủ đề "${trimmedTitle}": ${trimmedMeaning}`,
        boardFormula: `Chủ đề: ${trimmedTitle} (${tierMeta.cefr})`,
        boardExamples: [
          { term: keyTerm1, phonetic: 'Trọng âm mở đầu', meaning: 'Cụm mở đầu câu' },
          { term: keyTerm2, phonetic: 'Trọng âm kết câu', meaning: 'Cụm kết thúc câu' }
        ],
        pronunciationTip: 'Chú ý giữ nhịp thở đều và nhấn giọng vào các từ khóa mang nội dung chính.'
      },
      {
        id: `${lessonId}-s2`,
        startTime: 12,
        endTime: 24,
        chapterTitle: '2. Phân tích Cấu trúc & Ngữ điệu',
        gesture: 'pointing',
        targetScript: trimmedSentence,
        phoneticScript: phonetic,
        vietnameseSub: `Phân tích nghĩa chi tiết: "${trimmedMeaning}". Hãy chú ý cách nối âm giữa các cụm từ.`,
        boardFormula: `${keyTerm1} + ... + ${keyTerm2}`,
        boardExamples: [
          { term: trimmedSentence, phonetic, meaning: trimmedMeaning }
        ],
        pronunciationTip: 'Nghe kỹ độ cao giọng của Giảng viên AI và lặp lại với tốc độ 0.75x trước khi tăng lên 1.0x.'
      },
      {
        id: `${lessonId}-s3`,
        startTime: 24,
        endTime: 36,
        chapterTitle: '3. Thực hành Phản xạ & Ghi nhớ',
        gesture: 'emphasizing',
        targetScript: trimmedSentence,
        phoneticScript: phonetic,
        vietnameseSub: `Lượt của bạn! Hãy đọc to câu "${trimmedSentence}" cùng Giảng viên AI để ghi nhớ vĩnh viễn.`,
        boardFormula: 'Nghe chuẩn → Nhại giọng (Shadowing) → Ứng dụng thực tế',
        boardExamples: [
          { term: trimmedTitle, phonetic: tierMeta.cefr, meaning: trimmedMeaning }
        ],
        pronunciationTip: 'Đọc liền mạch toàn câu với ngữ điệu tự nhiên như người bản xứ.'
      }
    ],
    quiz: {
      question: `Ý nghĩa chính xác của câu mẫu "${trimmedSentence}" trong bài giảng AI vừa rồi là gì?`,
      options: [
        trimmedMeaning,
        'Xin lỗi, tôi chưa chuẩn bị tài liệu cho buổi họp hôm nay.',
        'Thời tiết hôm nay rất thuận lợi cho chuyến dã ngoại cuối tuần.',
        'Vui lòng cho tôi biết đường đi đến nhà ga gần nhất.'
      ],
      correctIndex: 0,
      explanation: `Câu "${trimmedSentence}" mang ý nghĩa chính xác là: "${trimmedMeaning}".`
    },
    shadowing: {
      phrase: trimmedSentence,
      phonetic,
      vietnamese: trimmedMeaning
    }
  };
}
