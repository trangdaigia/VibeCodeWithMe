export interface SentenceBuilderChallenge {
  id: string;
  languageId: string;
  cefrLevel: 'A2' | 'B1' | 'B2' | 'C1';
  vietnamesePrompt: string;
  correctTokens: string[];
  scrambledTokens: string[];
  grammarTip: string;
  xpReward: number;
}

export interface SmartMistakeItem {
  id: string;
  languageId: string;
  category: 'grammar' | 'collocation' | 'pronunciation' | 'academic';
  commonMistake: string;
  correctForm: string;
  explanationVi: string;
  practiceQuestion: string;
  options: string[];
  correctOption: string;
  masteryScore: number; // 0 to 100
}

export interface MasteryCertificateMeta {
  certificateId: string;
  recipientName: string;
  recipientEmail: string;
  languageNameVi: string;
  nativeLanguageName: string;
  estimatedCefr: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  examBenchmark: string;
  totalXp: number;
  streakDays: number;
  issuedDateVi: string;
  verificationHash: string;
  honorsTier: 'Xuất Sắc Tối Cao (Summa Cum Laude)' | 'Ưu Tú (Magna Cum Laude)' | 'Đạt Chuẩn Quốc Tế (Cum Laude)';
}

export interface EbbinghausPoint {
  day: number;
  label: string;
  unreviewedRetention: number;
  srsReviewedRetention: number;
}

const SENTENCE_CHALLENGES_BY_LANG: Record<string, SentenceBuilderChallenge[]> = {
  english: [
    {
      id: 'en-sb-1',
      languageId: 'english',
      cefrLevel: 'B2',
      vietnamesePrompt: 'Không những công nghệ AI nâng cao năng suất mà còn mở ra cơ hội sáng tạo mới.',
      correctTokens: [
        'Not only',
        'does AI technology',
        'enhance productivity,',
        'but it also',
        'unlocks new creative opportunities.',
      ],
      scrambledTokens: [
        'enhance productivity,',
        'but it also',
        'Not only',
        'unlocks new creative opportunities.',
        'does AI technology',
      ],
      grammarTip: 'Cấu trúc đảo ngữ "Not only + trợ động từ (does/did) + S + V, but ... also..." giúp ăn điểm tuyệt đối ở tiêu chí Grammatical Range trong IELTS Writing.',
      xpReward: 30,
    },
    {
      id: 'en-sb-2',
      languageId: 'english',
      cefrLevel: 'C1',
      vietnamesePrompt: 'Nếu không có các chính sách bảo vệ môi trường quyết liệt, biến đổi khí hậu sẽ gia tăng nhanh chóng.',
      correctTokens: [
        'Were it not for',
        'decisive environmental policies,',
        'climate change',
        'would accelerate',
        'rapidly.',
      ],
      scrambledTokens: [
        'climate change',
        'Were it not for',
        'rapidly.',
        'decisive environmental policies,',
        'would accelerate',
      ],
      grammarTip: 'Đảo ngữ câu điều kiện loại 2 "Were it not for + Noun Phrase" thay thế cho "If it were not for", mang sắc thái học thuật C1/C2.',
      xpReward: 35,
    },
    {
      id: 'en-sb-3',
      languageId: 'english',
      cefrLevel: 'B1',
      vietnamesePrompt: 'Tôi đã làm việc tại tập đoàn công nghệ đa quốc gia này được hơn ba năm.',
      correctTokens: [
        'I have been',
        'working at',
        'this multinational tech corporation',
        'for over',
        'three years.',
      ],
      scrambledTokens: [
        'for over',
        'I have been',
        'three years.',
        'working at',
        'this multinational tech corporation',
      ],
      grammarTip: 'Thì Hiện tại hoàn thành tiếp diễn (have/has been + V-ing) nhấn mạnh tính liên tục của hành động kéo dài từ quá khứ đến hiện tại.',
      xpReward: 25,
    },
  ],
  chinese: [
    {
      id: 'zh-sb-1',
      languageId: 'chinese',
      cefrLevel: 'B2',
      vietnamesePrompt: 'Bất kể gặp phải khó khăn gì, chúng ta đều cần kiên trì theo đuổi mục tiêu đến cùng.',
      correctTokens: ['不管', '遇到什么困难，', '我们都要', '坚持到底。'],
      scrambledTokens: ['我们都要', '不管', '坚持到底。', '遇到什么困难，'],
      grammarTip: 'Cấu trúc liên từ HSK 4–5 "不管... 都..." (Bất kể... đều...) dùng để nhấn mạnh kết quả không đổi trong mọi điều kiện.',
      xpReward: 30,
    },
    {
      id: 'zh-sb-2',
      languageId: 'chinese',
      cefrLevel: 'B1',
      vietnamesePrompt: 'Tôi đã đặt xong vé tàu cao tốc đi Thượng Hải vào sáng ngày mai rồi.',
      correctTokens: ['我已经', '把明天早上', '去上海的高铁票', '订好了。'],
      scrambledTokens: ['去上海的高铁票', '我已经', '订好了。', '把明天早上'],
      grammarTip: 'Câu chữ 把 (S + 把 + Tân ngữ + Động từ + Thành phần khác) nhấn mạnh sự tác động làm thay đổi trạng thái của sự vật.',
      xpReward: 25,
    },
  ],
  japanese: [
    {
      id: 'ja-sb-1',
      languageId: 'japanese',
      cefrLevel: 'B2',
      vietnamesePrompt: 'Nhờ có sự hướng dẫn tận tình của giáo viên, tôi đã đỗ kỳ thi năng lực tiếng Nhật JLPT.',
      correctTokens: ['先生の', '熱心なご指導', 'のおかげで、', '日本語能力試験に', '合格できました。'],
      scrambledTokens: ['のおかげで、', '先生の', '合格できました。', '熱心なご指導', '日本語能力試験に'],
      grammarTip: 'Mẫu ngữ pháp "~のおかげで" (Nhờ có...) diễn tả lòng biết ơn đối với nguyên nhân mang lại kết quả tích cực.',
      xpReward: 30,
    },
    {
      id: 'ja-sb-2',
      languageId: 'japanese',
      cefrLevel: 'B1',
      vietnamesePrompt: 'Trước khi bắt đầu cuộc họp, xin vui lòng kiểm tra lại tài liệu một lần nữa.',
      correctTokens: ['会議が', '始まる前に、', '資料をもう一度', '確認してください。'],
      scrambledTokens: ['資料をもう一度', '会議が', '確認してください。', '始まる前に、'],
      grammarTip: 'Cấu trúc "V-る + 前に" (Trước khi làm V...) luôn đi với động từ ở thể từ điển (nguyên dạng) dù hành động ở quá khứ hay tương lai.',
      xpReward: 25,
    },
  ],
  korean: [
    {
      id: 'ko-sb-1',
      languageId: 'korean',
      cefrLevel: 'B2',
      vietnamesePrompt: 'Càng luyện tập giao tiếp tiếng Hàn mỗi ngày, sự tự tin của bạn càng tăng lên.',
      correctTokens: ['매일 한국어 회화를', '연습할수록', '자신감이', '더 높아집니다.'],
      scrambledTokens: ['자신감이', '매일 한국어 회화를', '더 높아집니다.', '연습할수록'],
      grammarTip: 'Ngữ pháp TOPIK II "-(으)ㄹ수록" (Càng... càng...) diễn tả mức độ tăng tiến song hành giữa hai mệnh đề.',
      xpReward: 30,
    },
  ],
  french: [
    {
      id: 'fr-sb-1',
      languageId: 'french',
      cefrLevel: 'B2',
      vietnamesePrompt: 'Mặc dù trời mưa rất to nhưng buổi triển lãm văn hóa tại Paris vẫn thu hút đông đảo du khách.',
      correctTokens: [
        'Bien qu’il',
        'pleuve abondamment,',
        'l’exposition culturelle',
        'à Paris attire',
        'de nombreux visiteurs.',
      ],
      scrambledTokens: [
        'l’exposition culturelle',
        'Bien qu’il',
        'de nombreux visiteurs.',
        'pleuve abondamment,',
        'à Paris attire',
      ],
      grammarTip: 'Sau liên từ nhượng bộ "Bien que" (Mặc dù), động từ tiếng Pháp bắt buộc chia ở thức Giả định (Subjonctif: pleuve).',
      xpReward: 30,
    },
  ],
  german: [
    {
      id: 'de-sb-1',
      languageId: 'german',
      cefrLevel: 'B2',
      vietnamesePrompt: 'Vì anh ấy muốn làm việc tại Đức nên anh ấy đang tích cực học tiếng Đức mỗi ngày.',
      correctTokens: [
        'Weil er in Deutschland',
        'arbeiten möchte,',
        'lernt er',
        'jeden Tag intensiv',
        'Deutsch.',
      ],
      scrambledTokens: [
        'lernt er',
        'Weil er in Deutschland',
        'Deutsch.',
        'arbeiten möchte,',
        'jeden Tag intensiv',
      ],
      grammarTip: 'Mệnh đề phụ bắt đầu bằng "Weil" đẩy động từ chia (möchte) xuống cuối mệnh đề phụ, và mệnh đề chính đảo động từ (lernt) lên đầu.',
      xpReward: 30,
    },
  ],
  spanish: [
    {
      id: 'es-sb-1',
      languageId: 'spanish',
      cefrLevel: 'B2',
      vietnamesePrompt: 'Điều quan trọng là tất cả sinh viên đều tham gia tích cực vào dự án nghiên cứu quốc tế.',
      correctTokens: [
        'Es fundamental que',
        'todos los estudiantes',
        'participen activamente',
        'en el proyecto',
        'de investigación.',
      ],
      scrambledTokens: [
        'participen activamente',
        'Es fundamental que',
        'de investigación.',
        'todos los estudiantes',
        'en el proyecto',
      ],
      grammarTip: 'Cấu trúc đánh giá "Es fundamental que + Subjuntivo" yêu cầu động từ mệnh đề sau chia ở hiện tại giả định (participen).',
      xpReward: 30,
    },
  ],
};

const SMART_MISTAKES_BY_LANG: Record<string, SmartMistakeItem[]> = {
  english: [
    {
      id: 'en-err-1',
      languageId: 'english',
      category: 'grammar',
      commonMistake: 'The number of international students are increasing rapidly.',
      correctForm: 'The number of international students is increasing rapidly.',
      explanationVi: '"The number of + N số nhiều" mang nghĩa "Con số..." nên động từ chính phải chia ở ngôi số ít (is). Ngược lại, "A number of + N số nhiều" mới đi với động từ số nhiều (are).',
      practiceQuestion: 'Chọn đáp án chuẩn ngữ pháp IELTS Writing: "The number of renewable energy projects ___ risen by 40%."',
      options: ['has', 'have', 'are', 'were'],
      correctOption: 'has',
      masteryScore: 65,
    },
    {
      id: 'en-err-2',
      languageId: 'english',
      category: 'collocation',
      commonMistake: 'Governments should make more strict laws to protect forests.',
      correctForm: 'Governments should enact stricter legislation to protect forests.',
      explanationVi: 'Trong văn phong học thuật Band 7.5+, thay vì dùng "make laws", hãy dùng cụm Collocation chuẩn C1 "enact/introduce/enforce legislation".',
      practiceQuestion: 'Cụm từ học thuật C1 nào thay thế tự nhiên nhất cho "make a law"?',
      options: ['enact legislation', 'do a rule', 'create a legal', 'build a law'],
      correctOption: 'enact legislation',
      masteryScore: 50,
    },
    {
      id: 'en-err-3',
      languageId: 'english',
      category: 'academic',
      commonMistake: 'Despite of the economic challenges, the company expanded globally.',
      correctForm: 'Despite the economic challenges, the company expanded globally.',
      explanationVi: '"Despite" đi trực tiếp với cụm danh từ hoặc V-ing (KHÔNG có "of"). Chỉ có "In spite of" mới đi kèm giới từ "of".',
      practiceQuestion: 'Điền từ đúng vào chỗ trống: "___ the heavy traffic, she arrived at the conference on time."',
      options: ['Despite', 'Despite of', 'Although', 'Even'],
      correctOption: 'Despite',
      masteryScore: 80,
    },
  ],
  chinese: [
    {
      id: 'zh-err-1',
      languageId: 'chinese',
      category: 'grammar',
      commonMistake: '我昨天见面了我的老朋友。',
      correctForm: '我昨天跟我的老朋友见面了。',
      explanationVi: '"见面" (jiànmiàn) là động từ ly hợp nên KHÔNG mang tân ngữ trực tiếp phía sau. Phải dùng cấu trúc "跟/和 + Ai đó + 见面".',
      practiceQuestion: 'Câu nào dưới đây dùng đúng động từ ly hợp 见面?',
      options: ['我明天跟经理见面。', '我明天见面经理。', '我见面了他在北京。', '他要见面你。'],
      correctOption: '我明天跟经理见面。',
      masteryScore: 60,
    },
  ],
  japanese: [
    {
      id: 'ja-err-1',
      languageId: 'japanese',
      category: 'grammar',
      commonMistake: '日本へ行くの時、パスポートが必要です。',
      correctForm: '日本へ行く時、パスポートが必要です。',
      explanationVi: 'Khi nối động từ (V-る / V-た) với danh từ chỉ thời gian "時 (とき)", tuyệt đối KHÔNG thêm trợ từ "の" ở giữa.',
      practiceQuestion: 'Chọn câu đúng ngữ pháp JLPT: "___、電気を消してください。"',
      options: ['部屋を出る時', '部屋を出るの時', '部屋を出るのとき', '部屋に出る時'],
      correctOption: '部屋を出る時',
      masteryScore: 70,
    },
  ],
};

/**
 * Returns Sentence Builder challenges for a given language, falling back to English if needed.
 */
export function getSentenceBuilderChallenges(languageId: string): SentenceBuilderChallenge[] {
  const list = SENTENCE_CHALLENGES_BY_LANG[languageId];
  if (list && list.length > 0) return list;
  return SENTENCE_CHALLENGES_BY_LANG.english;
}

/**
 * Evaluates whether the user's selected token array matches the target sentence.
 */
export function evaluateSentenceOrder(
  userTokens: string[],
  correctTokens: string[]
): {
  isCorrect: boolean;
  matchedCount: number;
  accuracyPercent: number;
  assembledSentence: string;
} {
  if (!Array.isArray(correctTokens) || correctTokens.length === 0) {
    return {
      isCorrect: false,
      matchedCount: 0,
      accuracyPercent: 0,
      assembledSentence: '',
    };
  }

  let matchedCount = 0;
  for (let i = 0; i < correctTokens.length; i++) {
    if (userTokens[i] === correctTokens[i]) {
      matchedCount++;
    }
  }

  const isCorrect =
    userTokens.length === correctTokens.length && matchedCount === correctTokens.length;
  const accuracyPercent = Math.round((matchedCount / correctTokens.length) * 100);

  return {
    isCorrect,
    matchedCount,
    accuracyPercent,
    assembledSentence: userTokens.join(' '),
  };
}

/**
 * Calculates score and combo multiplier in the Speed Recall Arena.
 */
export function calculateArenaAttemptScore(params: {
  isCorrect: boolean;
  currentStreak: number;
  remainingSeconds: number;
  basePoints?: number;
}): {
  nextStreak: number;
  comboMultiplier: number;
  earnedPoints: number;
  earnedXp: number;
  isFeverMode: boolean;
} {
  const base = params.basePoints ?? 100;
  if (!params.isCorrect) {
    return {
      nextStreak: 0,
      comboMultiplier: 1,
      earnedPoints: 0,
      earnedXp: 0,
      isFeverMode: false,
    };
  }

  const nextStreak = Math.max(0, params.currentStreak) + 1;
  const comboMultiplier =
    nextStreak >= 8 ? 5 : nextStreak >= 5 ? 3 : nextStreak >= 3 ? 2 : 1;
  const timeBonus = Math.max(0, Math.min(30, params.remainingSeconds)) * 4;
  const earnedPoints = (base + timeBonus) * comboMultiplier;
  const earnedXp = Math.min(50, 5 * comboMultiplier);

  return {
    nextStreak,
    comboMultiplier,
    earnedPoints,
    earnedXp,
    isFeverMode: comboMultiplier >= 3,
  };
}

/**
 * Computes the Ebbinghaus memory retention curve comparing unreviewed decay vs SRS spaced repetition.
 */
export function computeEbbinghausRetention(reviewCount: number): EbbinghausPoint[] {
  const safeReviews = Math.max(1, Math.min(6, Math.round(reviewCount)));
  const days = [1, 3, 7, 14, 30];

  return days.map((day) => {
    // Classic Ebbinghaus exponential decay without review: R = exp(-t / S)
    const unreviewedRetention = Math.max(
      14,
      Math.round(100 * Math.exp(-day / 5.5))
    );

    // With SRS reviews, stability S grows exponentially per review cycle
    const stability = 6 * Math.pow(1.85, safeReviews);
    const srsReviewedRetention = Math.min(
      99,
      Math.max(unreviewedRetention + 15, Math.round(100 * Math.exp(-day / stability)))
    );

    return {
      day,
      label: `Ngày ${day}`,
      unreviewedRetention,
      srsReviewedRetention,
    };
  });
}

/**
 * Returns Smart Mistake Clinic items for a given language.
 */
export function getSmartMistakeClinicItems(languageId: string): SmartMistakeItem[] {
  return SMART_MISTAKES_BY_LANG[languageId] || SMART_MISTAKES_BY_LANG.english;
}

/**
 * Generates verifiable certificate metadata for a learner's portfolio.
 */
export function generateMasteryCertificateMeta(params: {
  recipientName: string;
  recipientEmail: string;
  languageId: string;
  languageNameVi: string;
  nativeLanguageName: string;
  examBenchmark: string;
  totalXp: number;
  streakDays: number;
  completedLessonsCount: number;
  examsCompleted: number;
}): MasteryCertificateMeta {
  const cleanName = params.recipientName.trim() || 'Học viên Xuất sắc';
  const scoreIndex =
    params.totalXp + params.completedLessonsCount * 120 + params.examsCompleted * 250;

  const estimatedCefr: MasteryCertificateMeta['estimatedCefr'] =
    scoreIndex >= 2200
      ? 'C2'
      : scoreIndex >= 1400
      ? 'C1'
      : scoreIndex >= 700
      ? 'B2'
      : scoreIndex >= 350
      ? 'B1'
      : 'A2';

  const honorsTier: MasteryCertificateMeta['honorsTier'] =
    estimatedCefr === 'C2' || estimatedCefr === 'C1'
      ? 'Xuất Sắc Tối Cao (Summa Cum Laude)'
      : estimatedCefr === 'B2'
      ? 'Ưu Tú (Magna Cum Laude)'
      : 'Đạt Chuẩn Quốc Tế (Cum Laude)';

  const langCode = (params.languageId || 'en').slice(0, 2).toUpperCase();
  const numericSeed = Math.abs(
    cleanName.split('').reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7) + params.totalXp
  )
    .toString(16)
    .toUpperCase()
    .slice(0, 6)
    .padStart(6, '8');

  return {
    certificateId: `LF-2026-${langCode}-${numericSeed}`,
    recipientName: cleanName,
    recipientEmail: params.recipientEmail || 'learner@linguaflow.edu',
    languageNameVi: params.languageNameVi,
    nativeLanguageName: params.nativeLanguageName,
    estimatedCefr,
    examBenchmark: params.examBenchmark || 'IELTS Academic / CEFR Global',
    totalXp: params.totalXp,
    streakDays: params.streakDays,
    issuedDateVi: '23/10/2026',
    verificationHash: `SHA256-LF-${langCode}-${numericSeed}-${estimatedCefr}`,
    honorsTier,
  };
}

/**
 * Sanitizes phonetic/romanization strings so they never render tofu boxes or double slashes in Linux Chromium.
 */
export function sanitizePhoneticsForDisplay(raw?: string): string {
  if (!raw) return '';
  const stripped = raw.trim().replace(/^\/+|\/+$/g, '');
  const ipaMap: Record<string, string> = {
    'ɪ': 'i',
    'ʃ': 'sh',
    'ʊ': 'u',
    'ə': 'a',
    'ɑ': 'a',
    'ɔ': 'o',
    'æ': 'ae',
    'θ': 'th',
    'ð': 'dh',
    'ʒ': 'zh',
    'ŋ': 'ng',
    'ɜ': 'er',
    'ʌ': 'u',
    'ɒ': 'o',
    'ˈ': "'",
    'ˌ': '',
    'ː': ':',
  };
  const clean = stripped.replace(
    /[ɪʃʊəɑɔæθðʒŋɜʌɒˈˌː]/g,
    (ch) => ipaMap[ch] ?? ch
  );
  return `/${clean}/`;
}

