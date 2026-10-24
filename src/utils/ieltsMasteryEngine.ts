import { ExamQuestion, IeltsTestSet, WritingModelPrompt, SpeakingCueCard } from '../data/curriculum';
import {
  officialListening40Questions,
  officialReading40Questions,
  officialWritingTasks,
  officialSpeakingParts,
} from '../data/courses/ieltsOfficialFullExamData';
import {
  convertListeningRawToBand,
  convertReadingRawToBand,
  calculateOfficialOverallBand,
} from './ieltsOfficialScoreEngine';

export interface WritingRubricEvaluation {
  taskAchievementBand: number;
  coherenceCohesionBand: number;
  lexicalResourceBand: number;
  grammaticalRangeBand: number;
  overallWritingBand: number;
  wordCount: number;
  paragraphCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  detectedCohesiveDevices: string[];
  detectedAcademicLexis: string[];
  detectedComplexGrammar: string[];
  strengths: string[];
  improvements: string[];
}

export interface ParaphraseDrillItem {
  id: string;
  source: string;
  skill: 'reading' | 'listening';
  originalInPassageOrAudio: string;
  paraphrasedInQuestion: string;
  trapType: 'Synonym & Nominalization' | 'Antonym & Polarity Reversal' | 'Quantifier / Exclusivity Trap' | 'Temporal / Self-Correction Trap';
  options: string[];
  correctOption: string;
  vietnameseExplanation: string;
  bandLevel: 'Band 7.0' | 'Band 8.0' | 'Band 8.5+';
}

export interface SentenceUpgradeDrill {
  id: string;
  topic: string;
  taskType: 'Writing Task 1' | 'Writing Task 2' | 'Speaking Part 2/3';
  band6Sentence: string;
  band85Sentence: string;
  keyUpgrades: string[];
  grammarStructureUsed: string;
}

export interface StudyRoadmapMilestone {
  id: string;
  phase: string;
  title: string;
  skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'strategy';
  targetBand: '6.5' | '7.5' | '8.5+';
  dailyMinutes: number;
  tasks: string[];
  recommendedTab: string;
}

export interface SectionDiagnosticSummary {
  sectionLabel: string;
  correct: number;
  total: number;
  accuracyPercent: number;
  status: 'strong' | 'moderate' | 'needs-focus';
  advice: string;
}

const COHESIVE_MARKERS = [
  'furthermore',
  'moreover',
  'consequently',
  'nevertheless',
  'nonetheless',
  'notwithstanding',
  'conversely',
  'in contrast',
  'by contrast',
  'subsequently',
  'accordingly',
  'in addition',
  'for instance',
  'specifically',
  'in conclusion',
  'to summarize',
  'overall',
  'admittedly',
  'undoubtedly',
  'while',
  'whereas',
  'although',
];

const ACADEMIC_LEXIS_BANK = [
  'unprecedented',
  'proliferation',
  'mitigate',
  'exacerbate',
  'indispensable',
  'paradigm',
  'sustainable',
  'socioeconomic',
  'infrastructure',
  'disproportionately',
  'trajectory',
  'implications',
  'catalyst',
  'ubiquitous',
  'detrimental',
  'imperative',
  'equilibrium',
  'demographic',
  'autonomous',
  'empirical',
  'substantiate',
  'predominantly',
  'proportion',
  'fluctuation',
  'outweighed',
];

/**
 * Evaluates an IELTS Writing response (Task 1 or Task 2) against the 4 official Cambridge criteria.
 */
export function evaluateWritingBy4Criteria(
  text: string,
  taskType: 'Task 1' | 'Task 2',
  isFormalRequired = true
): WritingRubricEvaluation {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const minTarget = taskType === 'Task 1' ? 150 : 250;

  const paragraphs = trimmed
    ? trimmed.split(/\n+/).map((p) => p.trim()).filter((p) => p.length > 0)
    : [];
  const paragraphCount = paragraphs.length;

  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 2)
    : [];
  const sentenceCount = Math.max(1, sentences.length);
  const avgWordsPerSentence = wordCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;

  const lower = trimmed.toLowerCase();

  const detectedCohesiveDevices = COHESIVE_MARKERS.filter((marker) => lower.includes(marker));
  const detectedAcademicLexis = ACADEMIC_LEXIS_BANK.filter((lex) => lower.includes(lex));

  // Detect complex grammar patterns
  const detectedComplexGrammar: string[] = [];
  if (/\b(not only|rarely|seldom|hardly|under no circumstances|little did)\b/i.test(trimmed)) {
    detectedComplexGrammar.push('Cấu trúc Đảo ngữ (Inversion)');
  }
  if (/\b(having been|having \w+ed|being \w+ed)\b/i.test(trimmed)) {
    detectedComplexGrammar.push('Mệnh đề Phân từ (Participle Clause)');
  }
  if (/\b(were .+ to|had .+ not|if .+ were to|provided that|unless)\b/i.test(trimmed)) {
    detectedComplexGrammar.push('Câu Điều kiện Nâng cao (Advanced Conditional)');
  }
  if (/\b(which|whom|whose|whereby|in which|to which)\b/i.test(trimmed)) {
    detectedComplexGrammar.push('Mệnh đề Quan hệ Học thuật (Relative Clause)');
  }
  if (/\b(although|even though|while|whereas|despite the fact that|notwithstanding)\b/i.test(trimmed)) {
    detectedComplexGrammar.push('Mệnh đề Nhượng bộ & Đối lập (Concessive Clause)');
  }
  if (/\b(is|are|was|were|been)\s+\w+ed\b/i.test(trimmed)) {
    detectedComplexGrammar.push('Thể Bị động Học thuật (Academic Passive)');
  }

  if (wordCount === 0) {
    return {
      taskAchievementBand: 0,
      coherenceCohesionBand: 0,
      lexicalResourceBand: 0,
      grammaticalRangeBand: 0,
      overallWritingBand: 0,
      wordCount: 0,
      paragraphCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      detectedCohesiveDevices: [],
      detectedAcademicLexis: [],
      detectedComplexGrammar: [],
      strengths: [],
      improvements: ['Hãy nhập bài viết của bạn hoặc nạp bài mẫu để nhận phân tích 4 tiêu chí chấm IELTS.'],
    };
  }

  // 1. Task Achievement / Task Response (TA/TR)
  let ta = 5.5;
  if (wordCount >= minTarget) ta += 1.5;
  else if (wordCount >= minTarget * 0.8) ta += 0.5;
  else ta -= 0.5;

  if (paragraphCount >= 3 && paragraphCount <= 6) ta += 0.5;
  if (taskType === 'Task 1' && /\b(overall|in general|broadly|main trend|projection)\b/i.test(trimmed)) {
    ta += 0.5;
  }
  if (taskType === 'Task 2' && /\b(in conclusion|to conclude|i firmly believe|i would argue|from my perspective)\b/i.test(trimmed)) {
    ta += 0.5;
  }

  // 2. Coherence & Cohesion (CC)
  let cc = 5.5;
  if (paragraphCount >= 4) cc += 1.0;
  else if (paragraphCount >= 3) cc += 0.5;
  if (detectedCohesiveDevices.length >= 5) cc += 1.5;
  else if (detectedCohesiveDevices.length >= 3) cc += 1.0;
  else if (detectedCohesiveDevices.length >= 1) cc += 0.5;

  // 3. Lexical Resource (LR)
  let lr = 5.5;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z]/g, '')).filter(Boolean));
  const lexicalDiversity = wordCount > 0 ? uniqueWords.size / wordCount : 0;
  if (lexicalDiversity >= 0.52 && wordCount >= 100) lr += 1.0;
  else if (lexicalDiversity >= 0.45 && wordCount >= 60) lr += 0.5;

  if (detectedAcademicLexis.length >= 5) lr += 1.5;
  else if (detectedAcademicLexis.length >= 3) lr += 1.0;
  else if (detectedAcademicLexis.length >= 1) lr += 0.5;

  if (isFormalRequired && /\b(don't|can't|won't|isn't|didn't|it's|i'm|gonna|wanna)\b/i.test(trimmed)) {
    lr -= 0.5;
  }

  // 4. Grammatical Range & Accuracy (GRA)
  let gra = 5.5;
  if (detectedComplexGrammar.length >= 4) gra += 2.0;
  else if (detectedComplexGrammar.length >= 2) gra += 1.5;
  else if (detectedComplexGrammar.length >= 1) gra += 0.5;

  if (avgWordsPerSentence >= 16 && avgWordsPerSentence <= 28) {
    gra += 0.5;
  }

  const clampBand = (val: number) => {
    const clamped = Math.max(4.0, Math.min(9.0, val));
    return Math.round(clamped * 2) / 2;
  };

  const taskAchievementBand = clampBand(ta);
  const coherenceCohesionBand = clampBand(cc);
  const lexicalResourceBand = clampBand(lr);
  const grammaticalRangeBand = clampBand(gra);

  const avg = (taskAchievementBand + coherenceCohesionBand + lexicalResourceBand + grammaticalRangeBand) / 4;
  const overallWritingBand = Math.round(avg * 2) / 2;

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (wordCount >= minTarget) {
    strengths.push(`Độ dài đạt chuẩn (${wordCount}/${minTarget} từ tối thiểu), đảm bảo phát triển đủ luận điểm.`);
  } else {
    improvements.push(`Cần viết thêm ít nhất ${minTarget - wordCount} từ để đạt ngưỡng tối thiểu ${minTarget} từ của ${taskType}.`);
  }

  if (paragraphCount >= 4) {
    strengths.push(`Bố cục chia ${paragraphCount} đoạn văn mạch lạc (Mở bài - Thân bài 1 - Thân bài 2 - Kết luận/Overview).`);
  } else {
    improvements.push('Nên tách bài viết thành 4 đoạn rõ ràng (Introduction, Overview/Body 1, Body 2, Conclusion) để tăng điểm Coherence & Cohesion.');
  }

  if (detectedCohesiveDevices.length >= 3) {
    strengths.push(`Sử dụng hiệu quả ${detectedCohesiveDevices.length} từ nối học thuật (${detectedCohesiveDevices.slice(0, 4).join(', ')}).`);
  } else {
    improvements.push('Bổ sung thêm các liên từ học thuật C1/C2 như "Furthermore", "Conversely", "Notwithstanding", "Consequently".');
  }

  if (detectedComplexGrammar.length >= 2) {
    strengths.push(`Vận dụng tốt cấu trúc câu phức: ${detectedComplexGrammar.join(', ')}.`);
  } else {
    improvements.push('Tăng cường mệnh đề quan hệ (which/whereby), mệnh đề nhượng bộ (Although/While) và câu phân từ (Having been...) để nâng điểm GRA lên 7.5+.');
  }

  return {
    taskAchievementBand,
    coherenceCohesionBand,
    lexicalResourceBand,
    grammaticalRangeBand,
    overallWritingBand,
    wordCount,
    paragraphCount,
    sentenceCount,
    avgWordsPerSentence,
    detectedCohesiveDevices,
    detectedAcademicLexis,
    detectedComplexGrammar,
    strengths,
    improvements,
  };
}

/**
 * Builds a complete 40-Listening + 40-Reading + 2-Writing + 3-Speaking exam paper from any IeltsTestSet,
 * ensuring the Computer-Delivered IELTS Simulator can run any chosen test paper seamlessly.
 */
export function buildFullSimulatorPaperFromTestSet(testSet?: IeltsTestSet): {
  paperCode: string;
  paperTitle: string;
  paperModule: 'academic' | 'general-training';
  listening40: ExamQuestion[];
  reading40: ExamQuestion[];
  writingTasks: WritingModelPrompt[];
  speakingParts: SpeakingCueCard[];
} {
  if (!testSet || testSet.id === 'set-cam-official-80q') {
    return {
      paperCode: testSet?.code || 'CAM-FULL-80Q',
      paperTitle: testSet?.title || 'Cambridge & IDP Official Standard Test (80 Câu L & R)',
      paperModule: testSet?.module || 'academic',
      listening40: officialListening40Questions,
      reading40: officialReading40Questions,
      writingTasks: officialWritingTasks,
      speakingParts: officialSpeakingParts,
    };
  }

  const customListening = testSet.questions.filter((q) => q.skill === 'listening');
  const customReading = testSet.questions.filter((q) => q.skill === 'reading');

  // Overlay custom test set questions at the front of each section so the test paper is 100% authentic to the chosen set while keeping full 40-question scale
  const listening40: ExamQuestion[] = officialListening40Questions.map((defaultQ, idx) => {
    const customMatch = customListening[idx];
    if (customMatch) {
      return {
        ...defaultQ,
        ...customMatch,
        id: `${testSet.code}-L-${idx + 1}`,
        question: customMatch.question.match(/^\d+\./)
          ? customMatch.question
          : `${idx + 1}. [${testSet.code}] ${customMatch.question}`,
      };
    }
    return defaultQ;
  });

  const reading40: ExamQuestion[] = officialReading40Questions.map((defaultQ, idx) => {
    const customMatch = customReading[idx];
    if (customMatch) {
      return {
        ...defaultQ,
        ...customMatch,
        id: `${testSet.code}-R-${idx + 1}`,
        question: customMatch.question.match(/^\d+\./)
          ? customMatch.question
          : `${idx + 1}. [${testSet.code}] ${customMatch.question}`,
      };
    }
    return defaultQ;
  });

  const writingTasks =
    testSet.writingPrompts && testSet.writingPrompts.length >= 2
      ? testSet.writingPrompts
      : officialWritingTasks;

  const speakingParts =
    testSet.speakingCueCards && testSet.speakingCueCards.length >= 3
      ? testSet.speakingCueCards
      : officialSpeakingParts;

  return {
    paperCode: testSet.code,
    paperTitle: testSet.title,
    paperModule: testSet.module || 'academic',
    listening40,
    reading40,
    writingTasks,
    speakingParts,
  };
}

/**
 * Analyzes section-by-section accuracy for Listening (Sections 1-4) and Reading (Passages 1-3).
 */
export function computeSectionDiagnostics(
  listeningAnswers: Record<number, string>,
  listeningQuestions: ExamQuestion[],
  readingAnswers: Record<number, string>,
  readingQuestions: ExamQuestion[]
): {
  listeningSections: SectionDiagnosticSummary[];
  readingPassages: SectionDiagnosticSummary[];
} {
  const buildSummary = (
    label: string,
    startIdx: number,
    endIdx: number,
    answers: Record<number, string>,
    questions: ExamQuestion[],
    focusAdvice: string
  ): SectionDiagnosticSummary => {
    let correct = 0;
    const total = endIdx - startIdx;
    for (let i = startIdx; i < endIdx; i++) {
      if (questions[i] && answers[i] === questions[i].correctAnswer) {
        correct++;
      }
    }
    const accuracyPercent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const status =
      accuracyPercent >= 80 ? 'strong' : accuracyPercent >= 60 ? 'moderate' : 'needs-focus';

    return {
      sectionLabel: label,
      correct,
      total,
      accuracyPercent,
      status,
      advice:
        status === 'strong'
          ? 'Phong độ xuất sắc! Duy trì phản xạ bắt từ khóa đồng nghĩa.'
          : focusAdvice,
    };
  };

  const listeningSections: SectionDiagnosticSummary[] = [
    buildSummary(
      'Section 1 (Q1–10 · Hội thoại đời sống)',
      0,
      10,
      listeningAnswers,
      listeningQuestions,
      'Cẩn trọng bẫy tự sửa lỗi (Self-correction: "wait, actually...") và đánh vần tên/mã bưu chính.'
    ),
    buildSummary(
      'Section 2 (Q11–20 · Độc thoại hướng dẫn)',
      10,
      20,
      listeningAnswers,
      listeningQuestions,
      'Chú ý các từ chỉ phương hướng bản đồ (adjacent to, opposite) và mốc thời gian bị thay đổi.'
    ),
    buildSummary(
      'Section 3 (Q21–30 · Thảo luận học thuật)',
      20,
      30,
      listeningAnswers,
      listeningQuestions,
      'Tập trung nghe sự đồng thuận/phản đối giữa 2 sinh viên và giáo sư hướng dẫn.'
    ),
    buildSummary(
      'Section 4 (Q31–40 · Bài giảng đại học)',
      30,
      40,
      listeningAnswers,
      listeningQuestions,
      'Luyện nghe từ nối chuyển ý (Signpost words: However, Consequently) và danh từ học thuật.'
    ),
  ];

  const readingPassages: SectionDiagnosticSummary[] = [
    buildSummary(
      'Passage 1 (Q1–13 · Khoa học & Lịch sử)',
      0,
      13,
      readingAnswers,
      readingQuestions,
      'Nắm chắc kỹ thuật Scanning tìm tên riêng, năm tháng và phân biệt FALSE với NOT GIVEN.'
    ),
    buildSummary(
      'Passage 2 (Q14–26 · Công nghệ & Xã hội)',
      13,
      26,
      readingAnswers,
      readingQuestions,
      'Đọc câu chủ đề (Topic Sentence) đầu và cuối đoạn để xử lý dạng Matching Headings.'
    ),
    buildSummary(
      'Passage 3 (Q27–40 · Phê bình & Triết học)',
      26,
      40,
      readingAnswers,
      readingQuestions,
      'Chú ý thái độ tác giả (Writer’s Claims) và các cụm danh từ hóa (Nominalization) C1/C2.'
    ),
  ];

  return { listeningSections, readingPassages };
}

/**
 * Curated Cambridge 17-19 Paraphrase & Trap Drills
 */
export const CAMBRIDGE_PARAPHRASE_DRILLS: ParaphraseDrillItem[] = [
  {
    id: 'para-1',
    source: 'Cambridge IELTS 19 · Reading Passage 1',
    skill: 'reading',
    originalInPassageOrAudio:
      'While Champollion made his initial breakthrough by isolating phonetic values within royal cartouches, he subsequently recognized that hieroglyphics simultaneously incorporated ideograms, phonograms, and determinatives.',
    paraphrasedInQuestion:
      'Champollion deciphered Egyptian hieroglyphs exclusively through the phonetic values of royal cartouches.',
    trapType: 'Quantifier / Exclusivity Trap',
    options: [
      'FALSE — Từ tuyệt đối "exclusively" (duy nhất) mâu thuẫn với việc chữ tượng hình kết hợp cả 3 yếu tố.',
      'TRUE — Vì bài đọc có nhắc đến "phonetic values within royal cartouches".',
      'NOT GIVEN — Bài đọc không nói rõ ông giải mã như thế nào.',
    ],
    correctOption:
      'FALSE — Từ tuyệt đối "exclusively" (duy nhất) mâu thuẫn với việc chữ tượng hình kết hợp cả 3 yếu tố.',
    vietnameseExplanation:
      'Mẹo vàng IELTS Reading: Khi câu hỏi chứa các từ tuyệt đối như "exclusively, only, solely, always, never", 85% đáp án là FALSE vì bài đọc học thuật luôn nêu nhiều nguyên nhân/yếu tố kết hợp.',
    bandLevel: 'Band 8.0',
  },
  {
    id: 'para-2',
    source: 'Cambridge IELTS 18 · Reading Passage 3',
    skill: 'reading',
    originalInPassageOrAudio:
      'By selecting one product, the decision-maker mentally tallies the forfeited cumulative benefits of all unchosen candidates, culminating in profound psychological disutility.',
    paraphrasedInQuestion:
      'Why do consumers experience acute regret when choosing among excessive options?',
    trapType: 'Synonym & Nominalization',
    options: [
      'They mentally aggregate the forgone positive attributes of unchosen alternatives.',
      'The purchased items frequently suffer from manufacturing defects.',
      'Retailers intentionally conceal warranty restrictions.',
    ],
    correctOption:
      'They mentally aggregate the forgone positive attributes of unchosen alternatives.',
    vietnameseExplanation:
      'Chuỗi Paraphrase kinh điển: "mentally tallies" = "mentally aggregate" (cộng dồn trong tâm trí); "forfeited cumulative benefits" = "forgone positive attributes" (những lợi ích bị bỏ lỡ).',
    bandLevel: 'Band 8.5+',
  },
  {
    id: 'para-3',
    source: 'Cambridge IELTS 19 · Listening Section 1',
    skill: 'listening',
    originalInPassageOrAudio:
      'Customer: "My postcode is NW4 2XP... actually, wait! That was my previous flat. My current tenancy agreement is under NW4 2PX."',
    paraphrasedInQuestion:
      'What is the applicant’s current residential postcode?',
    trapType: 'Temporal / Self-Correction Trap',
    options: [
      'NW4 2PX (Đáp án sau từ khóa tự sửa lỗi "actually, wait!")',
      'NW4 2XP (Mã bưu chính căn hộ cũ)',
      'NW4 2PB (Nhiễu âm đọc P và B)',
    ],
    correctOption: 'NW4 2PX (Đáp án sau từ khóa tự sửa lỗi "actually, wait!")',
    vietnameseExplanation:
      'Trong Listening Section 1 & 2, thông tin nói ra đầu tiên thường là mồi nhử (distractor). Hãy luôn đợi các từ chuyển hướng như "wait", "actually", "sorry, I mean", "however" để ghi đáp án chính thức.',
    bandLevel: 'Band 7.0',
  },
  {
    id: 'para-4',
    source: 'Cambridge IELTS 17 · Reading Passage 2',
    skill: 'reading',
    originalInPassageOrAudio:
      'Functional MRI scans revealed that the dorsolateral prefrontal cortex, the neural seat of conscious self-monitoring and inhibition, exhibited widespread deactivation during jazz improvisation.',
    paraphrasedInQuestion:
      'What occurs in the dorsolateral prefrontal cortex when musicians improvise?',
    trapType: 'Synonym & Nominalization',
    options: [
      'Neural activity decreases, which reduces conscious self-censorship.',
      'Brain cells consume twice as much oxygen to monitor mistakes.',
      'Auditory nerves temporarily stop transmitting high-frequency sounds.',
    ],
    correctOption:
      'Neural activity decreases, which reduces conscious self-censorship.',
    vietnameseExplanation:
      '"widespread deactivation" được paraphrase thành "neural activity decreases", còn "conscious self-monitoring and inhibition" tương đương với "conscious self-censorship".',
    bandLevel: 'Band 8.0',
  },
  {
    id: 'para-5',
    source: 'IDP / British Council Official Test · Reading Passage 1',
    skill: 'reading',
    originalInPassageOrAudio:
      'While vertical farming drastically curtails freshwater consumption by 95% compared to open-field agriculture, the exorbitant electricity required for artificial LED photoperiods renders staple cereal crops economically unviable.',
    paraphrasedInQuestion:
      'Vertical farming is currently a cost-effective method for cultivating wheat and rice on a commercial scale.',
    trapType: 'Antonym & Polarity Reversal',
    options: [
      'FALSE — Chi phí điện LED quá đắt đỏ khiến cây lương thực chính (staple cereal crops = wheat/rice) không khả thi về kinh tế.',
      'TRUE — Vì tiết kiệm tới 95% lượng nước ngọt.',
      'NOT GIVEN — Bài đọc không nhắc cụ thể đến lúa mì hay lúa gạo.',
    ],
    correctOption:
      'FALSE — Chi phí điện LED quá đắt đỏ khiến cây lương thực chính (staple cereal crops = wheat/rice) không khả thi về kinh tế.',
    vietnameseExplanation:
      'Bẫy khái quát hóa (Hypernym): "wheat and rice" thuộc nhóm "staple cereal crops" (cây lương thực chính), và "cost-effective" đối lập trực tiếp với "economically unviable".',
    bandLevel: 'Band 8.5+',
  },
];

/**
 * Band 6.0 -> Band 8.5+ Sentence Transformation Library
 */
export const SENTENCE_UPGRADE_DRILLS: SentenceUpgradeDrill[] = [
  {
    id: 'upg-1',
    topic: 'Writing Task 2 · Công nghệ & Giáo dục',
    taskType: 'Writing Task 2',
    band6Sentence:
      'Many people think AI is bad for students because they will copy homework, but I think schools should teach how to use it.',
    band85Sentence:
      'While critics invoke legitimate apprehensions regarding algorithmic plagiarism, preemptive prohibitions fail to equip learners with the digital literacy imperative for contemporary scholarship.',
    keyUpgrades: [
      'think AI is bad -> invoke legitimate apprehensions',
      'copy homework -> algorithmic plagiarism',
      'schools should teach -> equip learners with the digital literacy imperative',
    ],
    grammarStructureUsed: 'Mệnh đề nhượng bộ While + Danh từ hóa (Nominalization)',
  },
  {
    id: 'upg-2',
    topic: 'Writing Task 1 · Mô tả biểu đồ xu hướng',
    taskType: 'Writing Task 1',
    band6Sentence:
      'The number of electric cars went up very fast from 2015 to 2025, while petrol cars went down.',
    band85Sentence:
      'Electric vehicle adoption witnessed an exponential surge between 2015 and 2025, whereas conventional internal-combustion registrations experienced a pronounced downward trajectory.',
    keyUpgrades: [
      'went up very fast -> witnessed an exponential surge',
      'petrol cars -> conventional internal-combustion registrations',
      'went down -> experienced a pronounced downward trajectory',
    ],
    grammarStructureUsed: 'Liên từ đối lập whereas + Cụm danh từ định lượng học thuật',
  },
  {
    id: 'upg-3',
    topic: 'Speaking Part 3 · Môi trường & Đô thị hóa',
    taskType: 'Speaking Part 2/3',
    band6Sentence:
      'Governments must make tickets for buses and trains cheaper so people stop driving their own cars.',
    band85Sentence:
      'Were municipal authorities to heavily subsidize mass transit networks, commuters would be organically incentivized torelinquish private vehicular dependency.',
    keyUpgrades: [
      'Governments -> municipal authorities',
      'make tickets cheaper -> heavily subsidize mass transit networks',
      'stop driving own cars -> relinquish private vehicular dependency',
    ],
    grammarStructureUsed: 'Đảo ngữ câu điều kiện loại 2 (Were + S + to V)',
  },
];

/**
 * Structured IELTS Study Roadmap Milestones by Target Band
 */
export const IELTS_STUDY_ROADMAP: StudyRoadmapMilestone[] = [
  {
    id: 'rm-65-1',
    phase: 'Giai đoạn 1 · Nền tảng Chuẩn',
    title: 'Chinh phục Listening Section 1-2 & Reading Scanning',
    skill: 'listening',
    targetBand: '6.5',
    dailyMinutes: 45,
    tasks: [
      'Đạt tối thiểu 18/20 câu đúng ở Listening Section 1 & Section 2 (nhận diện bẫy đánh vần, số điện thoại, mã bưu chính).',
      'Nắm vững phương pháp phân biệt FALSE (ngược thông tin) và NOT GIVEN (không đủ dữ kiện suy luận).',
      'Viết chuẩn cấu trúc đoạn Overview 2 câu cho Writing Task 1.',
    ],
    recommendedTab: 'all',
  },
  {
    id: 'rm-75-1',
    phase: 'Giai đoạn 2 · Tăng tốc Học thuật',
    title: 'Làm chủ Matching Headings, Listening Sec 3 & Cấu trúc PEEL',
    skill: 'reading',
    targetBand: '7.5',
    dailyMinutes: 60,
    tasks: [
      'Đạt 33–35/40 câu ở cả Listening và Academic Reading thông qua bảng Paraphrase đồng nghĩa C1.',
      'Triển khai mô hình PEEL (Point - Explain - Evidence - Link) cho mọi đoạn thân bài Writing Task 2.',
      'Trả lời Speaking Part 2 mượt mà đủ 2 phút và mở rộng Part 3 bằng công thức A.R.E.A.',
    ],
    recommendedTab: 'writing-lab',
  },
  {
    id: 'rm-85-1',
    phase: 'Giai đoạn 3 · Đỉnh cao Band 8.5+',
    title: 'Tư duy Phản biện C2, Đảo ngữ & Phòng Thi Máy 80 Câu Thực Chiến',
    skill: 'strategy',
    targetBand: '8.5+',
    dailyMinutes: 90,
    tasks: [
      'Xử lý trọn vẹn Passage 3 chủ đề Triết học/Khoa học thần kinh trong dưới 20 phút với độ chính xác 38+/40.',
      'Vận dụng tự nhiên câu Đảo ngữ (Not only / Were...to), Mệnh đề Phân từ (Having been...) và từ vựng học thuật C2.',
      'Hoàn thành tối thiểu 3 đề thi Full 80 câu (165 phút) trong Phòng Thi Máy CD-IELTS.',
    ],
    recommendedTab: 'speaking-lab',
  },
];
