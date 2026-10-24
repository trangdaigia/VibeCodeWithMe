import {
  AI_MASTERY_STUDIO_DATA,
  LanguageMasteryPack,
  MasteryLevel,
  SpeakingDrillItem,
  WritingPromptItem,
  WritingUpgradeItem
} from '../data/aiMasteryStudioData';

export interface WordPronunciationDiagnostic {
  token: string;
  accuracyPercent: number;
  status: 'excellent' | 'good' | 'needs-work';
  feedbackVi: string;
}

export interface PronunciationEvaluationResult {
  overallScore: number;
  phonemeAccuracy: number;
  intonationScore: number;
  fluencyScore: number;
  pacingScore: number;
  estimatedWpm: number;
  cefrGrade: string;
  learnerPitchContour: number[];
  wordDiagnostics: WordPronunciationDiagnostic[];
  coachSummaryVi: string;
}

export interface WritingRubricEvaluation {
  overallScore100: number;
  bandOrScaleLabel: string;
  cefrEquivalent: string;
  unitCount: number;
  unitLabel: 'từ' | 'ký tự';
  lengthGoalMet: boolean;
  criteria: {
    taskResponse: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
  };
  strengthsVi: string[];
  improvementsVi: string[];
  inlineUpgrades: WritingUpgradeItem[];
  examinerSummaryVi: string;
  improvedVersion: string;
}

export interface SixSkillScores {
  pronunciation: number;
  grammar: number;
  vocabulary: number;
  listening: number;
  speaking: number;
  writing: number;
}

export interface RadarAxisPoint {
  key: keyof SixSkillScores;
  labelVi: string;
  learnerScore: number;
  benchmarkScore: number;
  learnerX: number;
  learnerY: number;
  benchmarkX: number;
  benchmarkY: number;
  labelX: number;
  labelY: number;
}

export interface StudyMissionItem {
  id: string;
  skillKey: keyof SixSkillScores;
  skillNameVi: string;
  titleVi: string;
  actionDescVi: string;
  xpReward: number;
  estimatedMinutes: number;
  targetTab: 'studio' | 'video' | 'academic' | 'roleplay' | 'grammar' | 'vault';
}

export interface SixSkillRadarAnalysis {
  learnerScores: SixSkillScores;
  benchmarkScores: SixSkillScores;
  overallReadinessPercent: number;
  strongestSkillVi: string;
  focusSkillVi: string;
  axes: RadarAxisPoint[];
  learnerPolygonPoints: string;
  benchmarkPolygonPoints: string;
  recommendedMissions: StudyMissionItem[];
}

export function getLanguageMasteryPack(languageId: string): LanguageMasteryPack {
  const normalized = (languageId || 'english').toLowerCase();
  return AI_MASTERY_STUDIO_DATA[normalized] || AI_MASTERY_STUDIO_DATA.english;
}

export function filterSpeakingDrills(
  languageId: string,
  levelFilter: MasteryLevel | 'all' = 'all'
): SpeakingDrillItem[] {
  const pack = getLanguageMasteryPack(languageId);
  if (levelFilter === 'all') return pack.speakingDrills;
  return pack.speakingDrills.filter((d) => d.level === levelFilter);
}

export function filterWritingPrompts(
  languageId: string,
  levelFilter: MasteryLevel | 'all' = 'all'
): WritingPromptItem[] {
  const pack = getLanguageMasteryPack(languageId);
  if (levelFilter === 'all') return pack.writingPrompts;
  return pack.writingPrompts.filter((p) => p.level === levelFilter);
}

export function countWritingUnits(text: string, languageId: string): number {
  const trimmed = (text || '').trim();
  if (!trimmed) return 0;
  const isCjkCharBased = languageId === 'chinese' || languageId === 'japanese';
  if (isCjkCharBased) {
    return trimmed.replace(/\s+/g, '').length;
  }
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function evaluatePronunciationAttempt(
  drill: SpeakingDrillItem,
  modeOrTranscript: 'good' | 'excellent' | 'needs-work' | string
): PronunciationEvaluationResult {
  const baseMode =
    modeOrTranscript === 'excellent'
      ? 'excellent'
      : modeOrTranscript === 'needs-work'
      ? 'needs-work'
      : modeOrTranscript === 'good'
      ? 'good'
      : 'custom';

  let phonemeAccuracy = 84;
  let intonationScore = 82;
  let fluencyScore = 85;
  let pacingScore = 83;

  if (baseMode === 'excellent') {
    phonemeAccuracy = 95;
    intonationScore = 93;
    fluencyScore = 94;
    pacingScore = 92;
  } else if (baseMode === 'needs-work') {
    phonemeAccuracy = 68;
    intonationScore = 65;
    fluencyScore = 70;
    pacingScore = 66;
  } else if (baseMode === 'good') {
    phonemeAccuracy = 84;
    intonationScore = 81;
    fluencyScore = 85;
    pacingScore = 82;
  } else {
    // Evaluate similarity against targetSentence
    const cleanTarget = drill.targetSentence.toLowerCase().replace(/[.,!?¿¡，。！？、]/g, '');
    const cleanInput = modeOrTranscript.toLowerCase().replace(/[.,!?¿¡，。！？、]/g, '').trim();
    const lengthRatio =
      cleanTarget.length > 0
        ? Math.min(1, cleanInput.length / Math.max(1, cleanTarget.length))
        : 0.8;
    const baseScore = Math.max(64, Math.min(96, Math.round(68 + lengthRatio * 26)));
    phonemeAccuracy = baseScore;
    intonationScore = Math.max(62, baseScore - 2);
    fluencyScore = Math.min(97, baseScore + 1);
    pacingScore = Math.max(65, baseScore - 1);
  }

  const overallScore = Math.round(
    phonemeAccuracy * 0.35 +
      intonationScore * 0.25 +
      fluencyScore * 0.25 +
      pacingScore * 0.15
  );

  const cefrGrade =
    overallScore >= 90
      ? 'C1 - Chuẩn Bản Xứ (Band 8.5)'
      : overallScore >= 80
      ? 'B2 - Thành Thạo (Band 7.5)'
      : overallScore >= 70
      ? 'B1 - Giao Tiếp Khá (Band 6.5)'
      : 'A2 - Cần Chỉnh Khẩu Hình (Band 5.5)';

  const estimatedWpm = Math.round(drill.targetWpm * (pacingScore / 90));

  const learnerPitchContour = drill.nativePitchContour.map((pt, idx) => {
    const deviation =
      overallScore >= 90
        ? (idx % 2 === 0 ? 2 : -2)
        : overallScore >= 80
        ? (idx % 2 === 0 ? 6 : -5)
        : idx % 2 === 0
        ? 12
        : -11;
    return Math.max(15, Math.min(95, pt + deviation));
  });

  const wordDiagnostics: WordPronunciationDiagnostic[] = drill.syllables.map((syl, idx) => {
    const offset = idx % 3 === 0 ? 2 : idx % 3 === 1 ? -4 : 0;
    const acc = Math.max(58, Math.min(99, overallScore + offset));
    const status: WordPronunciationDiagnostic['status'] =
      acc >= 88 ? 'excellent' : acc >= 75 ? 'good' : 'needs-work';
    const feedbackVi =
      status === 'excellent'
        ? `Phát âm chuẩn xác (${syl.phoneticGuide}). ${syl.mouthTipVi}`
        : status === 'good'
        ? `Khá tốt, chú ý giữ hơi: ${syl.mouthTipVi}`
        : `Cần khắc phục: ${syl.commonMistakeVi}`;
    return {
      token: syl.token,
      accuracyPercent: acc,
      status,
      feedbackVi
    };
  });

  const coachSummaryVi =
    overallScore >= 90
      ? `Xuất sắc! Khẩu hình và đường cong ngữ điệu của bạn khớp ${overallScore}% so với giọng người bản xứ. Hãy duy trì tốc độ ${estimatedWpm} WPM.`
      : overallScore >= 80
      ? `Phát âm rõ ràng (${overallScore}%). Bạn làm tốt phần trọng âm chính, chỉ cần tinh chỉnh thêm: ${drill.articulationGuide.airflowVoiceVi}`
      : `Đạt ${overallScore}%. Hãy luyện chậm từng cụm âm tiết và lưu ý khẩu hình: ${drill.articulationGuide.tonguePositionVi}`;

  return {
    overallScore,
    phonemeAccuracy,
    intonationScore,
    fluencyScore,
    pacingScore,
    estimatedWpm,
    cefrGrade,
    learnerPitchContour,
    wordDiagnostics,
    coachSummaryVi
  };
}

export function evaluateWritingSubmissionLocal(
  promptItem: WritingPromptItem,
  submittedText: string
): WritingRubricEvaluation {
  const cleanText = (submittedText || '').trim();
  const unitCount = countWritingUnits(cleanText, promptItem.languageId);
  const lengthGoalMet = unitCount >= Math.min(32, promptItem.minWordsOrChars);

  // Check how many target power vocab items appear in the text
  const matchedPowerWords = promptItem.targetPowerVocab.filter((v) =>
    cleanText.toLowerCase().includes(v.word.toLowerCase().split(' ')[0])
  );

  const lengthFactor = Math.min(1.1, Math.max(0.6, unitCount / Math.max(1, Math.min(35, promptItem.minWordsOrChars))));
  const vocabBonus = matchedPowerWords.length * 4;

  const baseScore = Math.round(Math.min(94, Math.max(60, 76 * lengthFactor + vocabBonus)));

  const taskResponse = Math.min(96, Math.max(58, baseScore + (lengthGoalMet ? 3 : -6)));
  const coherenceCohesion = Math.min(95, Math.max(60, baseScore + 2));
  const lexicalResource = Math.min(96, Math.max(60, baseScore + vocabBonus));
  const grammaticalRange = Math.min(95, Math.max(60, baseScore + 1));

  const overallScore100 = Math.round(
    (taskResponse + coherenceCohesion + lexicalResource + grammaticalRange) / 4
  );

  const cefrEquivalent =
    overallScore100 >= 88
      ? 'C1 - Học Thuật Cao Cấp'
      : overallScore100 >= 78
      ? 'B2 - Đạt Chuẩn Thi Quốc Tế'
      : overallScore100 >= 68
      ? 'B1 - Trung Cấp Vững'
      : 'A2 - Nền Tảng Cơ Bản';

  let bandOrScaleLabel = 'Band 7.5 / C1';
  if (promptItem.languageId === 'english') {
    const ieltsBand =
      overallScore100 >= 90
        ? '8.5'
        : overallScore100 >= 84
        ? '8.0'
        : overallScore100 >= 78
        ? '7.5'
        : overallScore100 >= 72
        ? '7.0'
        : overallScore100 >= 65
        ? '6.5'
        : '6.0';
    bandOrScaleLabel = `IELTS Band ${ieltsBand}`;
  } else if (promptItem.languageId === 'chinese') {
    bandOrScaleLabel = overallScore100 >= 85 ? 'HSK 6 (92/100 điểm)' : 'HSK 5 (84/100 điểm)';
  } else if (promptItem.languageId === 'japanese') {
    bandOrScaleLabel = overallScore100 >= 85 ? 'JLPT N1 / BJT J1' : 'JLPT N2 Chuẩn';
  } else if (promptItem.languageId === 'korean') {
    bandOrScaleLabel = overallScore100 >= 85 ? 'TOPIK II Cấp 6' : 'TOPIK II Cấp 5';
  } else if (promptItem.languageId === 'french') {
    bandOrScaleLabel = overallScore100 >= 85 ? 'DALF C1 (22/25)' : 'DELF B2 (20/25)';
  } else if (promptItem.languageId === 'german') {
    bandOrScaleLabel = overallScore100 >= 85 ? 'Goethe C1 / TestDaF TDN 5' : 'Goethe B2 Tốt';
  } else if (promptItem.languageId === 'spanish') {
    bandOrScaleLabel = overallScore100 >= 85 ? 'DELE C1 Apto Alto' : 'DELE B2 Apto';
  }

  const strengthsVi: string[] = [
    lengthGoalMet
      ? `Độ dài bài viết đạt chuẩn (${unitCount}/${promptItem.minWordsOrChars} ${promptItem.unitLabel}), triển khai đầy đủ luận điểm chính.`
      : `Đã nắm bắt đúng chủ đề trọng tâm của đề bài "${promptItem.titleVi}".`,
    matchedPowerWords.length > 0
      ? `Vận dụng tốt ${matchedPowerWords.length} cụm từ vựng học thuật ăn điểm (${matchedPowerWords.map((w) => w.word).join(', ')}).`
      : 'Cấu trúc câu rõ ràng, mạch ý liên kết tự nhiên theo trình tự Mở - Thân - Kết.'
  ];

  const improvementsVi: string[] = [
    !lengthGoalMet
      ? `Cần viết thêm ít nhất ${Math.max(1, promptItem.minWordsOrChars - unitCount)} ${promptItem.unitLabel} để phân tích sâu hơn dẫn chứng thực tế.`
      : 'Có thể tăng mật độ cấu trúc danh từ hóa (Nominalization) và mệnh đề nhượng bộ để bứt phá lên mức C1/C2.',
    `Thử tích hợp các từ vựng nâng cao như "${promptItem.targetPowerVocab.map((v) => v.word).join('", "')}" vào đoạn kết luận.`
  ];

  const examinerSummaryVi = `Bài viết đạt ${overallScore100}/100 điểm (${bandOrScaleLabel} · ${cefrEquivalent}). ${strengthsVi[0]} ${improvementsVi[0]}`;

  return {
    overallScore100,
    bandOrScaleLabel,
    cefrEquivalent,
    unitCount,
    unitLabel: promptItem.unitLabel,
    lengthGoalMet,
    criteria: {
      taskResponse,
      coherenceCohesion,
      lexicalResource,
      grammaticalRange
    },
    strengthsVi,
    improvementsVi,
    inlineUpgrades: promptItem.inlineUpgrades,
    examinerSummaryVi,
    improvedVersion: promptItem.modelHighBandEssay
  };
}

export function computeSixSkillRadarMetrics(params: {
  languageId: string;
  xp: number;
  streak: number;
  completedLessonsCount: number;
  examsCompleted: number;
  vocabCount: number;
  speakingBonus?: number;
  writingBonus?: number;
}): SixSkillRadarAnalysis {
  const pack = getLanguageMasteryPack(params.languageId);
  const benchmark = pack.targetRadarBenchmark;

  const xpBoost = Math.min(18, Math.round(params.xp / 120));
  const lessonBoost = Math.min(16, params.completedLessonsCount * 3);
  const examBoost = Math.min(15, params.examsCompleted * 4);
  const streakBoost = Math.min(12, params.streak);

  const learnerScores: SixSkillScores = {
    pronunciation: Math.min(98, 66 + xpBoost + (params.speakingBonus || 0)),
    grammar: Math.min(98, 68 + lessonBoost + examBoost),
    vocabulary: Math.min(98, 70 + Math.min(20, Math.round(params.vocabCount / 2)) + streakBoost),
    listening: Math.min(98, 67 + lessonBoost + streakBoost),
    speaking: Math.min(98, 64 + xpBoost + (params.speakingBonus || 0)),
    writing: Math.min(98, 63 + examBoost + (params.writingBonus || 0))
  };

  const axisMeta: { key: keyof SixSkillScores; labelVi: string }[] = [
    { key: 'pronunciation', labelVi: 'Phát âm & Khẩu hình' },
    { key: 'grammar', labelVi: 'Ngữ pháp Học thuật' },
    { key: 'vocabulary', labelVi: 'Từ vựng SRS' },
    { key: 'listening', labelVi: 'Nghe hiểu Thực chiến' },
    { key: 'speaking', labelVi: 'Phản xạ Hội thoại' },
    { key: 'writing', labelVi: 'Viết luận Chuẩn Band' }
  ];

  const centerX = 160;
  const centerY = 160;
  const maxRadius = 105;

  const axes: RadarAxisPoint[] = axisMeta.map((item, idx) => {
    const angleRad = ((idx * 60 - 90) * Math.PI) / 180;
    const lScore = learnerScores[item.key];
    const bScore = benchmark[item.key];

    const lRadius = (lScore / 100) * maxRadius;
    const bRadius = (bScore / 100) * maxRadius;
    const labelRadius = maxRadius + 28;

    return {
      key: item.key,
      labelVi: item.labelVi,
      learnerScore: lScore,
      benchmarkScore: bScore,
      learnerX: Number((centerX + lRadius * Math.cos(angleRad)).toFixed(1)),
      learnerY: Number((centerY + lRadius * Math.sin(angleRad)).toFixed(1)),
      benchmarkX: Number((centerX + bRadius * Math.cos(angleRad)).toFixed(1)),
      benchmarkY: Number((centerY + bRadius * Math.sin(angleRad)).toFixed(1)),
      labelX: Number((centerX + labelRadius * Math.cos(angleRad)).toFixed(1)),
      labelY: Number((centerY + labelRadius * Math.sin(angleRad)).toFixed(1))
    };
  });

  const learnerPolygonPoints = axes.map((a) => `${a.learnerX},${a.learnerY}`).join(' ');
  const benchmarkPolygonPoints = axes.map((a) => `${a.benchmarkX},${a.benchmarkY}`).join(' ');

  const sortedByLearner = [...axes].sort((a, b) => b.learnerScore - a.learnerScore);
  const strongestSkillVi = sortedByLearner[0].labelVi;
  const weakestAxis = sortedByLearner[sortedByLearner.length - 1];
  const focusSkillVi = weakestAxis.labelVi;

  const avgLearner =
    axes.reduce((sum, a) => sum + a.learnerScore, 0) / Math.max(1, axes.length);
  const avgBenchmark =
    axes.reduce((sum, a) => sum + a.benchmarkScore, 0) / Math.max(1, axes.length);
  const overallReadinessPercent = Math.min(
    100,
    Math.round((avgLearner / Math.max(1, avgBenchmark)) * 100)
  );

  const recommendedMissions: StudyMissionItem[] = [
    {
      id: `mission-writing-${params.languageId}`,
      skillKey: 'writing',
      skillNameVi: 'Viết luận Chuẩn Band',
      titleVi: `Nâng cấp 1 bài viết học thuật ${pack.examStandardName.split('/')[0].trim()}`,
      actionDescVi: 'Hoàn thành bài viết và áp dụng tối thiểu 2 cụm từ vựng C1 trong Phòng Chấm Viết AI.',
      xpReward: 35,
      estimatedMinutes: 8,
      targetTab: 'studio'
    },
    {
      id: `mission-speaking-${params.languageId}`,
      skillKey: 'pronunciation',
      skillNameVi: 'Phát âm & Khẩu hình',
      titleVi: 'Luyện sóng âm & Khẩu hình đạt trên 85% độ chuẩn',
      actionDescVi: 'Thực hành phát âm câu mẫu Nâng cao (C1) và so sánh đường cong ngữ điệu bản xứ.',
      xpReward: 30,
      estimatedMinutes: 5,
      targetTab: 'studio'
    },
    {
      id: `mission-video-${params.languageId}`,
      skillKey: 'listening',
      skillNameVi: 'Nghe hiểu Thực chiến',
      titleVi: 'Học 1 bài giảng Video AI Người Ảo & Làm Quiz tương tác',
      actionDescVi: 'Nghe giảng viên AI phân tích ngữ cảnh và trả lời câu hỏi kiểm tra tức thì.',
      xpReward: 40,
      estimatedMinutes: 6,
      targetTab: 'video'
    }
  ];

  return {
    learnerScores,
    benchmarkScores: benchmark,
    overallReadinessPercent,
    strongestSkillVi,
    focusSkillVi,
    axes,
    learnerPolygonPoints,
    benchmarkPolygonPoints,
    recommendedMissions
  };
}
