// Pure business logic for the VIP 3D Odyssey Game, Neuro-Linguistics Bioscience Lab,
// and Multimodal AI Super-Studio. Decoupled from DOM/WebGL for deterministic unit testing.

export type GameStateStatus = 'title' | 'playing' | 'paused' | 'victory' | 'gameover';

export interface VocabGateItem {
  id: string;
  lane: -1 | 0 | 1; // Left (-1), Center (0), Right (1)
  zPosition: number;
  word: string;
  romanization: string;
  meaningVi: string;
  isCorrect: boolean;
  collected: boolean;
}

export interface Polyglot3DChallenge {
  id: string;
  languageId: string;
  promptVi: string;
  correctWord: string;
  correctRomanization: string;
  decoys: { word: string; romanization: string; meaningVi: string }[];
}

export interface GameSessionState {
  status: GameStateStatus;
  score: number;
  combo: number;
  maxCombo: number;
  shieldHp: number; // 0..100
  playerLane: -1 | 0 | 1;
  speed: number; // units per second
  roundIndex: number;
  totalRounds: number;
  correctCollected: number;
  mistakesMade: number;
}

export const POLYGLOT_3D_CHALLENGES: Record<string, Polyglot3DChallenge[]> = {
  english: [
    {
      id: 'en-3d-1',
      languageId: 'english',
      promptVi: 'Sự kiên trì, bền bỉ vượt khó',
      correctWord: 'Perseverance',
      correctRomanization: '/pur-si-veer-uhns/',
      decoys: [
        { word: 'Hesitation', romanization: '/hez-i-tay-shun/', meaningVi: 'Sự do dự' },
        { word: 'Complacency', romanization: '/kuhm-play-suhn-see/', meaningVi: 'Sự tự mãn' },
      ],
    },
    {
      id: 'en-3d-2',
      languageId: 'english',
      promptVi: 'Đột phá công nghệ vượt bậc',
      correctWord: 'Breakthrough',
      correctRomanization: '/brayk-throo/',
      decoys: [
        { word: 'Bottleneck', romanization: '/bot-uhl-nek/', meaningVi: 'Điểm nghẽn' },
        { word: 'Redundancy', romanization: '/ri-dun-duhn-see/', meaningVi: 'Sự dư thừa' },
      ],
    },
    {
      id: 'en-3d-3',
      languageId: 'english',
      promptVi: 'Khả năng thích ứng linh hoạt',
      correctWord: 'Resilience',
      correctRomanization: '/ri-zil-yuhns/',
      decoys: [
        { word: 'Fragility', romanization: '/fruh-jil-i-tee/', meaningVi: 'Sự mong manh' },
        { word: 'Obscurity', romanization: '/uhb-skyoor-i-tee/', meaningVi: 'Sự mờ mịt' },
      ],
    },
    {
      id: 'en-3d-4',
      languageId: 'english',
      promptVi: 'Tư duy phản biện sắc bén',
      correctWord: 'Critical Thinking',
      correctRomanization: '/krit-i-kuhl thing-king/',
      decoys: [
        { word: 'Wishful Thinking', romanization: '/wish-fuhl thing-king/', meaningVi: 'Ảo tưởng chủ quan' },
        { word: 'Passive Listening', romanization: '/pas-iv lis-uh-ning/', meaningVi: 'Nghe thụ động' },
      ],
    },
    {
      id: 'en-3d-5',
      languageId: 'english',
      promptVi: 'Năng lực thông thạo đa ngôn ngữ',
      correctWord: 'Multilingualism',
      correctRomanization: '/mul-tee-ling-gwuhl-iz-uhm/',
      decoys: [
        { word: 'Monotony', romanization: '/muh-not-uh-nee/', meaningVi: 'Sự đơn điệu' },
        { word: 'Isolation', romanization: '/eye-suh-lay-shun/', meaningVi: 'Sự cô lập' },
      ],
    },
  ],
  chinese: [
    {
      id: 'zh-3d-1',
      languageId: 'chinese',
      promptVi: 'Kiên trì bền bỉ ắt thành công',
      correctWord: '坚持不懈',
      correctRomanization: 'Jiānchí bùxiè',
      decoys: [
        { word: '半途而废', romanization: 'Bàntú ér fèi', meaningVi: 'Bỏ cuộc giữa chừng' },
        { word: '犹豫不决', romanization: 'Yóuyù bùjué', meaningVi: 'Do dự không quyết' },
      ],
    },
    {
      id: 'zh-3d-2',
      languageId: 'chinese',
      promptVi: 'Đổi mới sáng tạo công nghệ',
      correctWord: '科技创新',
      correctRomanization: 'Kējì chuàngxīn',
      decoys: [
        { word: '墨守成规', romanization: 'Mòshǒu chéngguī', meaningVi: 'Bảo thủ lối mòn' },
        { word: '粗心大意', romanization: 'Cūxīn dàyì', meaningVi: 'Cẩu thả bất cẩn' },
      ],
    },
    {
      id: 'zh-3d-3',
      languageId: 'chinese',
      promptVi: 'Hợp tác đôi bên cùng có lợi',
      correctWord: '互利共赢',
      correctRomanization: 'Hùlì gòngyíng',
      decoys: [
        { word: '各自为政', romanization: 'Gèzì wéizhèng', meaningVi: 'Mạnh ai nấy làm' },
        { word: '斤斤计较', romanization: 'Jīnjīn jìjiào', meaningVi: 'So đo tính toán' },
      ],
    },
    {
      id: 'zh-3d-4',
      languageId: 'chinese',
      promptVi: 'Tầm nhìn chiến lược toàn cầu',
      correctWord: '全球视野',
      correctRomanization: 'Quánqiú shìyě',
      decoys: [
        { word: '坐井观天', romanization: 'Zuòjǐng guāntiān', meaningVi: 'Ếch ngồi đáy giếng' },
        { word: '急功近利', romanization: 'Jígōng jìnlì', meaningVi: 'Ham lợi trước mắt' },
      ],
    },
    {
      id: 'zh-3d-5',
      languageId: 'chinese',
      promptVi: 'Học rộng hiểu nhiều, uyên bác',
      correctWord: '博学多才',
      correctRomanization: 'Bóxué duōcái',
      decoys: [
        { word: '一知半解', romanization: 'Yìzhī bànjiě', meaningVi: 'Biết nửa vời' },
        { word: '忘恩负义', romanization: 'Wàng ēn fùyì', meaningVi: 'Vong ân bội nghĩa' },
      ],
    },
  ],
  japanese: [
    {
      id: 'ja-3d-1',
      languageId: 'japanese',
      promptVi: 'Tinh thần cải tiến liên tục không ngừng',
      correctWord: '継続的改善',
      correctRomanization: 'Keizokuteki kaizen',
      decoys: [
        { word: '現状維持', romanization: 'Genjou iji', meaningVi: 'Giữ nguyên hiện trạng' },
        { word: '油断大敵', romanization: 'Yudan taiteki', meaningVi: 'Chủ quan là đại kỵ' },
      ],
    },
    {
      id: 'ja-3d-2',
      languageId: 'japanese',
      promptVi: 'Cơ hội ngàn năm có một trong đời',
      correctWord: '一期一会',
      correctRomanization: 'Ichigo ichie',
      decoys: [
        { word: '三日坊主', romanization: 'Mikkabouzu', meaningVi: 'Cả thèm chóng chán' },
        { word: '自業自得', romanization: 'Jigou jitoku', meaningVi: 'Gieo gió gặt bão' },
      ],
    },
    {
      id: 'ja-3d-3',
      languageId: 'japanese',
      promptVi: 'Trí tuệ nhân tạo thế hệ mới',
      correctWord: '次世代人工知能',
      correctRomanization: 'Jisedai jinkou chinou',
      decoys: [
        { word: '既成概念', romanization: 'Kisei gainen', meaningVi: 'Định kiến cũ kỹ' },
        { word: '試行錯誤', romanization: 'Shikou sakugo', meaningVi: 'Thử và sai' },
      ],
    },
    {
      id: 'ja-3d-4',
      languageId: 'japanese',
      promptVi: 'Năng lực giải quyết vấn đề thực tiễn',
      correctWord: '問題解決力',
      correctRomanization: 'Mondai kaiketsuryoku',
      decoys: [
        { word: '責任転嫁', romanization: 'Sekinin tenka', meaningVi: 'Đổ lỗi cho người khác' },
        { word: '優柔不断', romanization: 'Yuujuu fudan', meaningVi: 'Thiếu quyết đoán' },
      ],
    },
    {
      id: 'ja-3d-5',
      languageId: 'japanese',
      promptVi: 'Ý chí kiên cường bất khuất',
      correctWord: '不撓不屈',
      correctRomanization: 'Futou fukutsu',
      decoys: [
        { word: '付和雷同', romanization: 'Fuwa raidou', meaningVi: 'Gió chiều nào che chiều ấy' },
        { word: '本末転倒', romanization: 'Honmatsu tentou', meaningVi: 'Đảo lộn gốc ngọn' },
      ],
    },
  ],
  korean: [
    {
      id: 'ko-3d-1',
      languageId: 'korean',
      promptVi: 'Năng lực cạnh tranh toàn cầu',
      correctWord: '글로벌 경쟁력',
      correctRomanization: 'Geullobeol gyeongjaengnyeok',
      decoys: [
        { word: '고정관념', romanization: 'Gojeong gwannyeom', meaningVi: 'Định kiến cố hữu' },
        { word: '작심삼일', romanization: 'Jaksim samil', meaningVi: 'Quyết tâm 3 ngày rồi bỏ' },
      ],
    },
    {
      id: 'ko-3d-2',
      languageId: 'korean',
      promptVi: 'Phát triển bền vững tương lai',
      correctWord: '지속 가능한 발전',
      correctRomanization: 'Jisok ganeunghan baljeon',
      decoys: [
        { word: '임시방편', romanization: 'Imsibangpyeon', meaningVi: 'Giải pháp tạm bợ' },
        { word: '우유부단', romanization: 'Uyubudan', meaningVi: 'Do dự thiếu quyết đoán' },
      ],
    },
    {
      id: 'ko-3d-3',
      languageId: 'korean',
      promptVi: 'Đổi mới tư duy sáng tạo',
      correctWord: '창의적 혁신',
      correctRomanization: 'Chang-uijeok hyeoksin',
      decoys: [
        { word: '현실 안주', romanization: 'Hyeonsil anju', meaningVi: 'An phận thủ thường' },
        { word: '횡설수설', romanization: 'Hoengseol suseol', meaningVi: 'Nói năng lan man' },
      ],
    },
  ],
  french: [
    {
      id: 'fr-3d-1',
      languageId: 'french',
      promptVi: 'Sự phát triển bền vững & sinh thái',
      correctWord: 'Développement durable',
      correctRomanization: 'Day-vlop-mahn doo-rabl',
      decoys: [
        { word: 'Gaspillage excessif', romanization: 'Gas-pee-yazh', meaningVi: 'Lãng phí quá mức' },
        { word: 'Négligence grave', romanization: 'Nay-glee-zhahns', meaningVi: 'Sự thờ ơ nghiêm trọng' },
      ],
    },
    {
      id: 'fr-3d-2',
      languageId: 'french',
      promptVi: 'Năng lực sáng tạo nghệ thuật xuất chúng',
      correctWord: 'Génie créatif',
      correctRomanization: 'Zhay-nee kray-ah-teef',
      decoys: [
        { word: 'Manque de rigueur', romanization: 'Mahnk duh ree-gur', meaningVi: 'Thiếu sự chặt chẽ' },
        { word: 'Esprit étroit', romanization: 'Es-pree ay-trwah', meaningVi: 'Tư duy hẹp hòi' },
      ],
    },
  ],
  german: [
    {
      id: 'de-3d-1',
      languageId: 'german',
      promptVi: 'Tinh thần đổi mới kỹ thuật tiên phong',
      correctWord: 'Innovationskraft',
      correctRomanization: 'In-no-va-tsi-ons-kraft',
      decoys: [
        { word: 'Stillstand', romanization: 'Shtil-shtant', meaningVi: 'Sự đình trệ' },
        { word: 'Gleichgültigkeit', romanization: 'Glykh-guel-tikh-kyt', meaningVi: 'Sự thờ ơ' },
      ],
    },
    {
      id: 'de-3d-2',
      languageId: 'german',
      promptVi: 'Trách nhiệm với tương lai bền vững',
      correctWord: 'Zukunftsverantwortung',
      correctRomanization: 'Tsoo-koonfts-fer-ant-vor-toong',
      decoys: [
        { word: 'Zeitverschwendung', romanization: 'Tsyt-fer-shven-doong', meaningVi: 'Sự lãng phí thời gian' },
        { word: 'Unachtsamkeit', romanization: 'Oon-akht-zam-kyt', meaningVi: 'Sự bất cẩn' },
      ],
    },
  ],
  spanish: [
    {
      id: 'es-3d-1',
      languageId: 'spanish',
      promptVi: 'Sự đồng cảm và kết nối văn hóa',
      correctWord: 'Empatía intercultural',
      correctRomanization: 'Em-pa-tee-a in-ter-kool-too-ral',
      decoys: [
        { word: 'Indiferencia total', romanization: 'In-dee-fe-ren-sya', meaningVi: 'Sự thờ ơ hoàn toàn' },
        { word: 'Prejuicio antiguo', romanization: 'Pre-hwee-syo', meaningVi: 'Định kiến cũ kỹ' },
      ],
    },
    {
      id: 'es-3d-2',
      languageId: 'spanish',
      promptVi: 'Khát vọng vươn tới đỉnh cao tri thức',
      correctWord: 'Excelencia académica',
      correctRomanization: 'Ek-se-len-sya a-ka-de-mee-ka',
      decoys: [
        { word: 'Pereza mental', romanization: 'Pe-re-sa men-tal', meaningVi: 'Sự lười biếng tư duy' },
        { word: 'Falta de enfoque', romanization: 'Fal-ta de en-fo-ke', meaningVi: 'Thiếu tập trung' },
      ],
    },
  ],
};

export function createInitialGameSession(totalRounds = 5): GameSessionState {
  return {
    status: 'title',
    score: 0,
    combo: 0,
    maxCombo: 0,
    shieldHp: 100,
    playerLane: 0,
    speed: 18,
    roundIndex: 0,
    totalRounds: Math.max(1, totalRounds),
    correctCollected: 0,
    mistakesMade: 0,
  };
}

export function movePlayerLane(currentLane: -1 | 0 | 1, direction: 'left' | 'right'): -1 | 0 | 1 {
  if (direction === 'left') {
    return (Math.max(-1, currentLane - 1) as -1 | 0 | 1);
  }
  return (Math.min(1, currentLane + 1) as -1 | 0 | 1);
}

export function evaluateGateCollision(
  state: GameSessionState,
  hitCorrectGate: boolean
): GameSessionState {
  if (state.status !== 'playing') return state;

  if (hitCorrectGate) {
    const nextCombo = state.combo + 1;
    const nextMaxCombo = Math.max(state.maxCombo, nextCombo);
    const comboBonus = nextCombo * 35;
    const nextScore = state.score + 150 + comboBonus;
    const nextCorrect = state.correctCollected + 1;
    const nextRound = state.roundIndex + 1;
    const isFinished = nextRound >= state.totalRounds;

    return {
      ...state,
      score: nextScore,
      combo: nextCombo,
      maxCombo: nextMaxCombo,
      shieldHp: Math.min(100, state.shieldHp + 10),
      speed: Math.min(32, state.speed + 1.8),
      roundIndex: isFinished ? state.roundIndex : nextRound,
      correctCollected: nextCorrect,
      status: isFinished ? 'victory' : 'playing',
    };
  } else {
    const nextShield = Math.max(0, state.shieldHp - 35);
    const nextMistakes = state.mistakesMade + 1;
    return {
      ...state,
      combo: 0,
      shieldHp: nextShield,
      mistakesMade: nextMistakes,
      status: nextShield <= 0 ? 'gameover' : 'playing',
    };
  }
}

// ============================================================================
// Neuro-Linguistics & Bioscience Lab Logic (AlphaFold pLDDT, UniProt, PubChem)
// ============================================================================

export type PlddtConfidenceBand = 'very_high' | 'confident' | 'low' | 'very_low';

export interface PlddtBandMeta {
  band: PlddtConfidenceBand;
  labelVi: string;
  scientificLabel: string;
  hexColor: string;
  interpretationVi: string;
}

/**
 * Classifies an AlphaFold per-residue pLDDT score (0..100) into the official 4-band
 * confidence scale from EMBL-EBI AlphaFold DB.
 */
export function classifyAlphaFoldPlddt(score: number): PlddtBandMeta {
  const clamped = Math.max(0, Math.min(100, score));
  if (clamped > 90) {
    return {
      band: 'very_high',
      labelVi: 'Rất cao (pLDDT > 90)',
      scientificLabel: 'Very High (> 90)',
      hexColor: '#0053D6',
      interpretationVi:
        'Độ chính xác cực cao ở cả khung xương sống (backbone) và chuỗi bên (sidechains); tối ưu để phân tích vùng gắn kết ADN/thụ thể thần kinh.',
    };
  }
  if (clamped >= 70) {
    return {
      band: 'confident',
      labelVi: 'Đáng tin cậy (70 ≤ pLDDT ≤ 90)',
      scientificLabel: 'Confident (70 - 90)',
      hexColor: '#65CBF3',
      interpretationVi:
        'Cấu trúc bậc hai (xoắn alpha / phiến beta) được dự đoán chuẩn xác; định hướng chuỗi bên có thể dao động nhẹ.',
    };
  }
  if (clamped >= 50) {
    return {
      band: 'low',
      labelVi: 'Thấp (50 ≤ pLDDT < 70)',
      scientificLabel: 'Low (50 - 70)',
      hexColor: '#FFDB13',
      interpretationVi:
        'Vùng bản lề linh hoạt (loop/linker) nối giữa các miền chức năng; cần thận trọng khi suy diễn hình học cứng.',
    };
  }
  return {
    band: 'very_low',
    labelVi: 'Rất thấp / Vô trật tự nội tại (pLDDT < 50)',
    scientificLabel: 'Very Low (< 50) — IDPR',
    hexColor: '#FF7D45',
    interpretationVi:
      'Tương quan chặt chẽ với vùng protein vô trật tự nội tại (IDPR). Không diễn giải như một nếp gấp cố định khi chưa gắn phối tử.',
  };
}

export interface NeuroProteinRecord {
  uniprotAccession: string;
  geneSymbol: string;
  proteinName: string;
  vietnameseTitle: string;
  organism: string;
  sequenceLength: number;
  meanPlddt: number;
  pdbExperimentalId: string;
  neuroLinguisticRoleVi: string;
  learningOptimizationTipVi: string;
  keyDomains: { name: string; start: number; end: number; plddt: number; roleVi: string }[];
  residueConfidenceProfile: number[]; // 24 sampled segments across sequence
}

export const CURATED_NEURO_PROTEINS: NeuroProteinRecord[] = [
  {
    uniprotAccession: 'O15409',
    geneSymbol: 'FOXP2',
    proteinName: 'Forkhead box protein P2',
    vietnameseTitle: 'Protein Gen Ngôn Ngữ & Điều Khiển Phát Âm FOXP2',
    organism: 'Homo sapiens (Human)',
    sequenceLength: 715,
    meanPlddt: 78.4,
    pdbExperimentalId: '2A07',
    neuroLinguisticRoleVi:
      'Yếu tố phiên mã chủ chốt điều phối sự phát triển mạch thần kinh hạch nền (basal ganglia) và vùng Broca, giúp con người kiểm soát vận động cơ miệng tinh vi khi phát âm đa ngôn ngữ và xử lý quy tắc ngữ pháp phức tạp.',
    learningOptimizationTipVi:
      'Luyện tập Shadowing (nhại lại âm thanh bản xứ kèm vận động cơ miệng) kích hoạt biểu hiện FOXP2 và củng cố phản xạ phát âm chuẩn gấp 2.4 lần so với chỉ đọc thầm.',
    keyDomains: [
      {
        name: 'Polyglutamine Tract (N-terminal)',
        start: 1,
        end: 260,
        plddt: 46,
        roleVi: 'Vùng linh hoạt điều hòa tương tác đồng yếu tố phiên mã (IDPR)',
      },
      {
        name: 'Zinc Finger & Leucine Zipper',
        start: 345,
        end: 418,
        plddt: 84,
        roleVi: 'Miền dime hóa giúp gắn kết tổ hợp điều hòa gen thần kinh',
      },
      {
        name: 'Forkhead DNA-Binding Domain (FOX)',
        start: 502,
        end: 588,
        plddt: 95,
        roleVi: 'Miền lõi pLDDT > 90 gắn trực tiếp vào chuỗi xoắn kép ADN tại vùng vận động ngôn ngữ',
      },
    ],
    residueConfidenceProfile: [
      44, 48, 52, 45, 58, 64, 72, 81, 86, 84, 76, 68, 74, 88, 94, 96, 95, 93, 89, 77, 62, 54, 49, 45,
    ],
  },
  {
    uniprotAccession: 'P23560',
    geneSymbol: 'BDNF',
    proteinName: 'Brain-derived neurotrophic factor',
    vietnameseTitle: 'Yếu Tố Dinh Dưỡng Thần Kinh & Củng Cố Trí Nhớ Từ Vựng BDNF',
    organism: 'Homo sapiens (Human)',
    sequenceLength: 247,
    meanPlddt: 86.2,
    pdbExperimentalId: '1BND',
    neuroLinguisticRoleVi:
      'Thúc đẩy sự hình thành khớp thần kinh (synaptogenesis) và điện thế hóa dài hạn (LTP) tại hồi hải mã (hippocampus), chuyển hóa từ vựng mới từ trí nhớ ngắn hạn sang kho lưu trữ vĩnh viễn.',
    learningOptimizationTipVi:
      'Kết hợp ôn tập ngắt quãng (Spaced Repetition SRS) sau 15 phút vận động nhẹ hoặc nghe nhạc nhịp 60-85 BPM giúp tăng nồng độ BDNF nội sinh, giữ từ vựng bền vững qua nhiều tháng.',
    keyDomains: [
      {
        name: 'Pro-peptide Signal Region',
        start: 1,
        end: 127,
        plddt: 66,
        roleVi: 'Đoạn tiền chất định hướng tiết qua khe khớp thần kinh',
      },
      {
        name: 'Mature Neurotrophin Cystine-Knot Core',
        start: 128,
        end: 247,
        plddt: 94,
        roleVi: 'Cấu trúc nút cystine siêu bền (pLDDT 94) kích hoạt thụ thể TrkB trên tế bào thần kinh ghi nhớ',
      },
    ],
    residueConfidenceProfile: [
      58, 62, 65, 68, 71, 64, 69, 75, 82, 88, 91, 93, 95, 96, 94, 95, 93, 92, 94, 95, 93, 91, 89, 87,
    ],
  },
  {
    uniprotAccession: 'Q13224',
    geneSymbol: 'GRIN2B',
    proteinName: 'Glutamate receptor ionotropic, NMDA 2B',
    vietnameseTitle: 'Thụ Thể Độ Dẻo Thần Kinh & Nhạy Âm Vị Ngôn Ngữ Mới (NMDA-2B)',
    organism: 'Homo sapiens (Human)',
    sequenceLength: 1484,
    meanPlddt: 82.9,
    pdbExperimentalId: '7EU8',
    neuroLinguisticRoleVi:
      'Kênh ion phụ thuộc điện thế đóng vai trò "cổng trùng hợp" (coincidence detector) tại vỏ não thính giác, giúp phân biệt các âm vị tinh tế (như thanh điệu tiếng Trung hay âm bật hơi tiếng Hàn).',
    learningOptimizationTipVi:
      'Khi học âm vị khó, việc nhận phản hồi tức thì (Immediate Feedback dưới 500ms) giữ cổng NMDA mở đủ lâu để tái cấu trúc bản đồ âm thanh trong vỏ não.',
    keyDomains: [
      {
        name: 'Amino-Terminal Domain (ATD)',
        start: 28,
        end: 393,
        plddt: 91,
        roleVi: 'Miền ngoại bào điều biến dị lập thể',
      },
      {
        name: 'Ligand-Binding Domain (LBD)',
        start: 404,
        end: 800,
        plddt: 93,
        roleVi: 'Túi gắn kết chất dẫn truyền thần kinh Glutamate trong quá trình học tập',
      },
      {
        name: 'Transmembrane Ion Channel Pore',
        start: 556,
        end: 838,
        plddt: 89,
        roleVi: 'Kênh dẫn dòng Ca2+ khởi phát chuỗi tín hiệu ghi nhớ',
      },
    ],
    residueConfidenceProfile: [
      88, 91, 93, 92, 90, 89, 94, 95, 92, 91, 88, 86, 90, 92, 87, 84, 78, 69, 61, 56, 52, 48, 46, 51,
    ],
  },
];

export interface NeurotransmitterCompound {
  cid: number;
  name: string;
  vietnameseName: string;
  formula: string;
  molecularWeight: string;
  canonicalSmiles: string;
  cognitiveFunctionVi: string;
  studyProtocolVi: string;
}

export const CURATED_NEUROTRANSMITTERS: NeurotransmitterCompound[] = [
  {
    cid: 681,
    name: 'Dopamine',
    vietnameseName: 'Dopamine — Chất dẫn truyền Động lực & Phần thưởng Học tập',
    formula: 'C8H11NO2',
    molecularWeight: '153.18 g/mol',
    canonicalSmiles: 'C1=CC(=C(C=C1CCN)O)O',
    cognitiveFunctionVi:
      'Tăng cường sự hứng thú, củng cố thói quen học hàng ngày (Streak) và mã hóa các sự kiện vượt thử thách thành ký ức ưu tiên cao.',
    studyProtocolVi:
      'Chia buổi học thành các chặng ngắn 5–10 phút kèm thử thách Game 3D hoặc Quiz phản xạ để tạo nhịp tiết Dopamine tự nhiên.',
  },
  {
    cid: 187,
    name: 'Acetylcholine',
    vietnameseName: 'Acetylcholine — Chất dẫn truyền Tập trung Sâu & Nhạy bén Âm thanh',
    formula: 'C7H16NO2+',
    molecularWeight: '146.21 g/mol',
    canonicalSmiles: 'CC(=O)OCC[N+](C)(C)C',
    cognitiveFunctionVi:
      'Làm sắc nét tín hiệu thần kinh tại vỏ não thính giác và thị giác, giúp tập trung cao độ vào cấu trúc ngữ pháp và mặt chữ tượng hình (Kanji/Hán tự).',
    studyProtocolVi:
      'Dành 25 phút đầu buổi học cho phần khó nhất (Soi Ngữ pháp hoặc Đề thi Học thuật) khi mức Acetylcholine ở đỉnh cao.',
  },
  {
    cid: 33032,
    name: 'L-Glutamic Acid (Glutamate)',
    vietnameseName: 'Glutamate — Chất dẫn truyền Kích thích Khớp thần kinh & Ghi nhớ Tốc độ',
    formula: 'C5H9NO4',
    molecularWeight: '147.13 g/mol',
    canonicalSmiles: 'C(CC(=O)O)C(C(=O)O)N',
    cognitiveFunctionVi:
      'Chất dẫn truyền kích thích chính (chiếm >80% khớp thần kinh vỏ não) trực tiếp mở thụ thể AMPA/NMDA để tạo đường dẫn ngôn ngữ mới.',
    studyProtocolVi:
      'Đọc to thành tiếng + gõ lại câu ngay lập tức giúp đồng bộ hóa tín hiệu Glutamate giữa vùng ngôn ngữ Wernicke và Broca.',
  },
];
