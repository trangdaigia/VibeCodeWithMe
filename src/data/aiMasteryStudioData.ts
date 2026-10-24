export type MasteryLevel = 'basic' | 'intermediate' | 'advanced';

export interface PhonemeSyllableItem {
  token: string;
  phoneticGuide: string;
  stressLevel: 'primary' | 'secondary' | 'unstressed';
  mouthTipVi: string;
  commonMistakeVi: string;
}

export interface SpeakingDrillItem {
  id: string;
  languageId: string;
  level: MasteryLevel;
  levelLabelVi: string;
  cefrTag: string;
  examTag: string;
  titleVi: string;
  targetSentence: string;
  phoneticTranscription: string;
  vietnameseTranslation: string;
  targetWpm: number;
  nativePitchContour: number[]; // 12 points (0-100) representing native intonation curve
  articulationGuide: {
    jawOpeningVi: string;
    tonguePositionVi: string;
    airflowVoiceVi: string;
    rhythmStressVi: string;
  };
  syllables: PhonemeSyllableItem[];
}

export interface WritingUpgradeItem {
  originalSnippet: string;
  upgradedSnippet: string;
  explanationVi: string;
  criterionTag: 'TR' | 'CC' | 'LR' | 'GRA';
}

export interface WritingPromptItem {
  id: string;
  languageId: string;
  level: MasteryLevel;
  levelLabelVi: string;
  cefrTag: string;
  examName: string;
  titleVi: string;
  promptText: string;
  promptTranslationVi: string;
  minWordsOrChars: number;
  unitLabel: 'từ' | 'ký tự';
  sampleLearnerDraft: string;
  modelHighBandEssay: string;
  modelTranslationVi: string;
  targetPowerVocab: {
    word: string;
    phonetic: string;
    meaningVi: string;
  }[];
  inlineUpgrades: WritingUpgradeItem[];
}

export interface LanguageMasteryPack {
  languageId: string;
  examStandardName: string;
  speakingDrills: SpeakingDrillItem[];
  writingPrompts: WritingPromptItem[];
  targetRadarBenchmark: {
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    listening: number;
    speaking: number;
    writing: number;
  };
}

export const AI_MASTERY_STUDIO_DATA: Record<string, LanguageMasteryPack> = {
  english: {
    languageId: 'english',
    examStandardName: 'IELTS Academic / CEFR C1',
    targetRadarBenchmark: {
      pronunciation: 88,
      grammar: 86,
      vocabulary: 90,
      listening: 88,
      speaking: 85,
      writing: 84
    },
    speakingDrills: [
      {
        id: 'en-spk-basic',
        languageId: 'english',
        level: 'basic',
        levelLabelVi: 'Cơ bản (A1 - A2)',
        cefrTag: 'A2',
        examTag: 'IELTS Speaking Part 1',
        titleVi: 'Giới thiệu bản thân & Thói quen làm việc hàng ngày',
        targetSentence: 'I usually start my morning with a cup of black coffee before checking my emails.',
        phoneticTranscription: '[Ai IU-zu-ơ-li stat mai MO-ning uít ơ kắp ọp blắk KO-fi bi-FO CHẾK-king mai I-meo-z]',
        vietnameseTranslation: 'Tôi thường bắt đầu buổi sáng bằng một tách cà phê đen trước khi kiểm tra thư điện tử.',
        targetWpm: 125,
        nativePitchContour: [42, 68, 55, 48, 72, 50, 44, 62, 78, 52, 74, 38],
        articulationGuide: {
          jawOpeningVi: 'Mở hàm vừa phải ở âm /a:/ trong "start" và âm /o/ trong "coffee".',
          tonguePositionVi: 'Đầu lưỡi chạm nhẹ vòm họng trên khi phát âm phụ âm cuối /t/ trong "start" và /l/ trong "emails".',
          airflowVoiceVi: 'Giữ luồng hơi đều, bật nhẹ âm gió /k/ ở "cup", "coffee" và rung dây thanh âm /z/ cuối từ "emails".',
          rhythmStressVi: 'Nhấn trọng âm chính vào các từ mang nội dung: USUALLY, MORNING, BLACK, COFFEE, CHECKING.'
        },
        syllables: [
          {
            token: 'usually',
            phoneticGuide: '[IU-zu-ơ-li]',
            stressLevel: 'primary',
            mouthTipVi: 'Tròn môi nhẹ ở âm tiết đầu IU, hạ giọng ở 3 âm tiết sau.',
            commonMistakeVi: 'Người Việt hay đọc rời rạc thành "iu-su-a-li" ngang giọng.'
          },
          {
            token: 'morning',
            phoneticGuide: '[MO-ning]',
            stressLevel: 'primary',
            mouthTipVi: 'Tròn môi sâu âm O dài, kết thúc bằng âm mũi -ng.',
            commonMistakeVi: 'Hay quên kéo dài nguyên âm O ở âm tiết đầu.'
          },
          {
            token: 'coffee',
            phoneticGuide: '[KO-fi]',
            stressLevel: 'primary',
            mouthTipVi: 'Bật hơi âm K đầu từ, răng trên chạm môi dưới ở âm F.',
            commonMistakeVi: 'Tránh đọc thành "cóp-phi" với âm p đóng môi.'
          },
          {
            token: 'checking',
            phoneticGuide: '[CHẾK-king]',
            stressLevel: 'secondary',
            mouthTipVi: 'Chu môi nhẹ bật âm CH, nâng gốc lưỡi ở đuôi -ing.',
            commonMistakeVi: 'Hay bỏ sót âm bật giữa từ hoặc đọc nhẹ như "chéc-inh".'
          },
          {
            token: 'emails',
            phoneticGuide: '[I-meo-z]',
            stressLevel: 'primary',
            mouthTipVi: 'Căng khóe miệng ở âm I đầu, uốn lưỡi nhẹ và rung âm Z cuối.',
            commonMistakeVi: 'Thường bỏ quên âm /z/ số nhiều ở cuối câu.'
          }
        ]
      },
      {
        id: 'en-spk-inter',
        languageId: 'english',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (B1 - B2)',
        cefrTag: 'B2',
        examTag: 'IELTS Speaking Part 2',
        titleVi: 'Trình bày giải pháp công nghệ nâng cao hiệu suất',
        targetSentence: 'Implementing flexible remote work policies significantly improves employee productivity and work-life balance.',
        phoneticTranscription: '[IM-pli-men-ting FLẾK-xơ-bô ri-MỐT uơk PO-li-xiz xig-NI-fi-cân-li im-PRUV-z im-PLOI-i pro-đắc-TI-vi-ti]',
        vietnameseTranslation: 'Việc áp dụng chính sách làm việc từ xa linh hoạt giúp cải thiện đáng kể năng suất nhân viên và sự cân bằng công việc - cuộc sống.',
        targetWpm: 140,
        nativePitchContour: [70, 54, 76, 62, 68, 48, 84, 58, 72, 64, 80, 40],
        articulationGuide: {
          jawOpeningVi: 'Hạ hàm rõ ở các nguyên âm đôi /oi/ trong "employee" và /ai/ trong "life".',
          tonguePositionVi: 'Lưỡi chuyển linh hoạt từ cụm phụ âm /pl/ ("implementing", "employee") sang /pr/ ("improves", "productivity").',
          airflowVoiceVi: 'Kiểm soát hơi thở theo 2 cụm ý (thought groups): ngắt nhịp nhẹ sau từ "policies".',
          rhythmStressVi: 'Đặt đỉnh cao độ (pitch peak) tại từ trạng từ nhấn mạnh "SIGNIFICANTLY" và danh từ chính "PRODUCTIVITY".'
        },
        syllables: [
          {
            token: 'Implementing',
            phoneticGuide: '[IM-pli-men-ting]',
            stressLevel: 'primary',
            mouthTipVi: 'Nhấn mạnh âm IM đầu tiên, lướt nhanh -pli-men-ting.',
            commonMistakeVi: 'Hay nhấn nhầm trọng âm vào âm tiết thứ 3 (-men-).'
          },
          {
            token: 'flexible',
            phoneticGuide: '[FLẾK-xơ-bô]',
            stressLevel: 'primary',
            mouthTipVi: 'Ghép liền phụ âm kép FL-, uốn lưỡi âm L cuối từ.',
            commonMistakeVi: 'Tách rời thành "phờ-lếch-xi-bồ" làm mất độ trôi chảy.'
          },
          {
            token: 'significantly',
            phoneticGuide: '[xig-NI-fi-cân-li]',
            stressLevel: 'primary',
            mouthTipVi: 'Nhấn rõ âm tiết thứ 2 -NI-, nuốt nhẹ âm T trước đuôi -ly.',
            commonMistakeVi: 'Đọc đều 5 âm tiết khiến câu thiếu nhạc điệu tự nhiên.'
          },
          {
            token: 'productivity',
            phoneticGuide: '[pro-đắc-TI-vi-ti]',
            stressLevel: 'primary',
            mouthTipVi: 'Nhấn mạnh âm tiết thứ 3 -TI-, giữ nhịp nhanh gọn.',
            commonMistakeVi: 'Nhấn nhầm vào âm đầu PRO- giống động từ produce.'
          }
        ]
      },
      {
        id: 'en-spk-adv',
        languageId: 'english',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (C1 - C2)',
        cefrTag: 'C1',
        examTag: 'IELTS Speaking Part 3',
        titleVi: 'Phản biện học thuật về Trí tuệ Nhân tạo & Giáo dục',
        targetSentence: 'While artificial intelligence accelerates personalized learning, cultivating critical thinking remains indispensable.',
        phoneticTranscription: '[Uai a-ti-FI-sồ in-TE-li-giân-x ăk-XE-lơ-rây-ts PƠ-xơ-nơ-lai-zd LƠ-ning, CĂN-ti-vây-ting KRI-ti-cồ THINH-king ri-MÊN-z in-đit-XPEN-xơ-bô]',
        vietnameseTranslation: 'Mặc dù trí tuệ nhân tạo thúc đẩy việc học cá nhân hóa, việc bồi dưỡng tư duy phản biện vẫn đóng vai trò không thể thay thế.',
        targetWpm: 150,
        nativePitchContour: [58, 74, 82, 66, 78, 42, 72, 68, 76, 60, 88, 36],
        articulationGuide: {
          jawOpeningVi: 'Mở khẩu hình rộng vừa phải, giữ độ căng cơ môi ổn định suốt chuỗi từ đa âm tiết học thuật.',
          tonguePositionVi: 'Đặt đầu lưỡi giữa hai hàm răng khi phát âm âm /th/ vô thanh trong từ "thinking".',
          airflowVoiceVi: 'Tạo độ tương phản ngữ điệu (contrastive intonation) giữa mệnh đề nhượng bộ "While..." (lên giọng nhẹ cuối vế) và mệnh đề chính (hạ giọng dứt khoát).',
          rhythmStressVi: 'Nhấn sắc nét vào "ACCELERATES", "CRITICAL THINKING" và "INDISPENSABLE".'
        },
        syllables: [
          {
            token: 'artificial',
            phoneticGuide: '[a-ti-FI-sồ]',
            stressLevel: 'primary',
            mouthTipVi: 'Nhấn âm tiết thứ 3 -FI-, tròn môi nhẹ ở âm s nặng (-sồ).',
            commonMistakeVi: 'Đọc âm -cial thành "xi-an" thay vì âm cong lưỡi nhẹ.'
          },
          {
            token: 'accelerates',
            phoneticGuide: '[ăk-XE-lơ-rây-ts]',
            stressLevel: 'primary',
            mouthTipVi: 'Nhấn âm -XE-, bật rõ tổ hợp phụ âm cuối -ts.',
            commonMistakeVi: 'Bỏ quên âm /s/ chia ngôi thứ 3 số ít ở cuối động từ.'
          },
          {
            token: 'indispensable',
            phoneticGuide: '[in-đit-XPEN-xơ-bô]',
            stressLevel: 'primary',
            mouthTipVi: 'Nhấn mạnh âm tiết thứ 3 -XPEN-, hạ trầm 2 âm tiết cuối.',
            commonMistakeVi: 'Ngập ngừng ở cụm phụ âm -sp- giữa từ.'
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: 'en-wrt-basic',
        languageId: 'english',
        level: 'basic',
        levelLabelVi: 'Cơ bản (A2 - B1)',
        cefrTag: 'B1',
        examName: 'IELTS General / Academic Foundation',
        titleVi: 'Viết đoạn văn ngắn về lợi ích của việc học ngoại ngữ',
        promptText: 'Write a short paragraph (50-80 words) explaining why learning a foreign language is beneficial for young professionals.',
        promptTranslationVi: 'Hãy viết một đoạn văn ngắn (50-80 từ) giải thích tại sao việc học ngoại ngữ lại mang lại nhiều lợi ích cho những người trẻ đi làm.',
        minWordsOrChars: 35,
        unitLabel: 'từ',
        sampleLearnerDraft: 'Learning a foreign language is very good for young people. First, it helps them find a good job in international companies with higher salary. Second, they can communicate with foreign clients easily and understand different cultures better.',
        modelHighBandEssay: 'Acquiring proficiency in a foreign language offers substantial advantages for young professionals. Primarily, bilingual candidates gain a competitive edge in the global job market, unlocking lucrative career opportunities at multinational corporations. Furthermore, cross-cultural communication skills foster stronger client relationships and broaden international perspectives.',
        modelTranslationVi: 'Việc đạt được sự thành thạo một ngoại ngữ mang lại những lợi thế to lớn cho các chuyên gia trẻ. Trước hết, các ứng viên song ngữ có được lợi thế cạnh tranh trên thị trường việc làm toàn cầu, mở ra cơ hội nghề nghiệp thu nhập cao tại các tập đoàn đa quốc gia. Hơn nữa, kỹ năng giao tiếp liên văn hóa giúp vun đắp mối quan hệ khách hàng bền chặt và mở rộng tầm nhìn quốc tế.',
        targetPowerVocab: [
          { word: 'proficiency', phonetic: '[prơ-FI-sân-xi]', meaningVi: 'Sự thông thạo, năng lực chuyên sâu' },
          { word: 'competitive edge', phonetic: '[cơm-PE-ti-tiv ét-ch]', meaningVi: 'Lợi thế cạnh tranh vượt trội' },
          { word: 'multinational corporations', phonetic: '[măn-ti-NA-sơ-nồ co-pơ-RÂY-sân-z]', meaningVi: 'Các tập đoàn đa quốc gia' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'Learning a foreign language is very good',
            upgradedSnippet: 'Acquiring proficiency in a foreign language offers substantial advantages',
            explanationVi: 'Thay cụm từ đơn giản "is very good" bằng cụm danh từ học thuật C1 "offers substantial advantages" để tăng điểm Lexical Resource.',
            criterionTag: 'LR'
          },
          {
            originalSnippet: 'find a good job in international companies',
            upgradedSnippet: 'gain a competitive edge at multinational corporations',
            explanationVi: 'Sử dụng collocation chuẩn thương mại "gain a competitive edge" thay cho "find a good job".',
            criterionTag: 'TR'
          }
        ]
      },
      {
        id: 'en-wrt-inter',
        languageId: 'english',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (B2 - Band 7.0)',
        cefrTag: 'B2',
        examName: 'IELTS Writing Task 2',
        titleVi: 'Thảo luận xu hướng làm việc từ xa (Remote Work)',
        promptText: 'Many companies now allow employees to work from home. Do the advantages of this trend outweigh the disadvantages?',
        promptTranslationVi: 'Nhiều công ty hiện nay cho phép nhân viên làm việc tại nhà. Liệu những lợi ích của xu hướng này có vượt trội hơn những bất cập không?',
        minWordsOrChars: 40,
        unitLabel: 'từ',
        sampleLearnerDraft: 'Nowadays, working from home is becoming very popular around the world. Although remote work can make employees feel isolated from team members, I strongly believe that its benefits are greater because it saves commuting time and reduces operational costs for businesses.',
        modelHighBandEssay: 'In recent years, telecommuting has transitioned from a temporary arrangement into a mainstream corporate practice across global industries. While remote work may occasionally hinder spontaneous team cohesion, I firmly contend that its merits far outweigh the drawbacks, as it eliminates daily commuting stress, enhances individual autonomy, and substantially optimizes overhead expenditures for modern organizations.',
        modelTranslationVi: 'Trong những năm gần đây, làm việc từ xa đã chuyển mình từ một giải pháp tạm thời thành thông lệ doanh nghiệp phổ biến. Mặc dù làm việc từ xa đôi khi có thể cản trở sự gắn kết tự nhiên của đội ngũ, tôi hoàn toàn tin rằng những giá trị của nó vượt xa các hạn chế, vì nó xóa bỏ áp lực đi lại hàng ngày và tối ưu hóa đáng kể chi phí vận hành cho tổ chức.',
        targetPowerVocab: [
          { word: 'telecommuting', phonetic: '[te-li-cơ-MIU-ting]', meaningVi: 'Làm việc từ xa qua mạng viễn thông' },
          { word: 'spontaneous cohesion', phonetic: '[xpon-TÂY-ni-ớt co-HI-zần]', meaningVi: 'Sự gắn kết tự nhiên, tức thời' },
          { word: 'overhead expenditures', phonetic: '[âu-vơ-HÉT ếk-XPEN-đi-chơ-z]', meaningVi: 'Chi phí vận hành cố định của doanh nghiệp' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'working from home is becoming very popular',
            upgradedSnippet: 'telecommuting has transitioned into a mainstream corporate practice',
            explanationVi: 'Dùng thuật ngữ chuyên ngành "telecommuting" và cấu trúc thì hiện tại hoàn thành giúp mở bài đạt chuẩn Band 7.5+.',
            criterionTag: 'LR'
          },
          {
            originalSnippet: 'I strongly believe that its benefits are greater',
            upgradedSnippet: 'I firmly contend that its merits far outweigh the drawbacks',
            explanationVi: 'Cấu trúc "firmly contend that its merits far outweigh the drawbacks" trả lời trực diện câu hỏi Outweigh của IELTS Task 2.',
            criterionTag: 'CC'
          }
        ]
      },
      {
        id: 'en-wrt-adv',
        languageId: 'english',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (C1 - Band 8.5+)',
        cefrTag: 'C1',
        examName: 'IELTS Academic Task 2 (Band 8.5)',
        titleVi: 'Tác động của tự động hóa AI đối với thị trường lao động',
        promptText: 'Artificial intelligence is automating many cognitive tasks once performed by humans. Discuss the socioeconomic implications and propose policy responses.',
        promptTranslationVi: 'Trí tuệ nhân tạo đang tự động hóa nhiều tác vụ nhận thức từng do con người thực hiện. Hãy thảo luận các hệ quả kinh tế - xã hội và đề xuất giải pháp chính sách.',
        minWordsOrChars: 42,
        unitLabel: 'từ',
        sampleLearnerDraft: 'Artificial intelligence is changing the labor market rapidly by replacing routine office jobs. To solve this problem, governments and universities must reform education systems so that workers can learn digital skills and adapt to new technological demands.',
        modelHighBandEssay: 'The rapid proliferation of generative artificial intelligence is fundamentally reshaping the global labor landscape by automating routine cognitive workflows. Rather than triggering inevitable structural unemployment, this paradigm shift necessitates proactive governmental intervention—specifically through subsidizing lifelong reskilling initiatives and restructuring tertiary curricula around human-centric critical inquiry.',
        modelTranslationVi: 'Sự bùng nổ nhanh chóng của trí tuệ nhân tạo tạo sinh đang định hình lại toàn diện bức tranh lao động toàn cầu thông qua việc tự động hóa các quy trình nhận thức lặp lại. Thay vì dẫn đến tình trạng thất nghiệp cơ cấu tất yếu, bước chuyển mô hình này đòi hỏi sự can thiệp chủ động từ chính phủ — cụ thể thông qua việc trợ cấp các chương trình đào tạo lại kỹ năng suốt đời và tái cấu trúc chương trình đại học xoay quanh tư duy phản biện lấy con người làm trung tâm.',
        targetPowerVocab: [
          { word: 'proliferation', phonetic: '[prơ-li-fơ-RÂY-sần]', meaningVi: 'Sự gia tăng, phổ biến nhanh chóng' },
          { word: 'paradigm shift', phonetic: '[PA-rơ-đaim síp-t]', meaningVi: 'Bước chuyển dịch mô hình mang tính bước ngoặt' },
          { word: 'lifelong reskilling', phonetic: '[LAI-f-long ri-XKI-ling]', meaningVi: 'Đào tạo nâng cấp kỹ năng suốt đời' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'Artificial intelligence is changing the labor market rapidly',
            upgradedSnippet: 'The rapid proliferation of generative AI is fundamentally reshaping the global labor landscape',
            explanationVi: 'Sử dụng danh từ hóa (Nominalization) "The rapid proliferation..." tạo văn phong học thuật chuẩn C2.',
            criterionTag: 'GRA'
          },
          {
            originalSnippet: 'governments and universities must reform education systems',
            upgradedSnippet: 'this paradigm shift necessitates proactive governmental intervention through restructuring tertiary curricula',
            explanationVi: 'Nâng cấp động từ khuyết thiếu đơn giản thành cấu trúc học thuật nhân quả sắc bén.',
            criterionTag: 'LR'
          }
        ]
      }
    ]
  },

  chinese: {
    languageId: 'chinese',
    examStandardName: 'HSK 4 - HSK 6 / HSKK Cao cấp',
    targetRadarBenchmark: {
      pronunciation: 86,
      grammar: 88,
      vocabulary: 87,
      listening: 85,
      speaking: 84,
      writing: 82
    },
    speakingDrills: [
      {
        id: 'zh-spk-basic',
        languageId: 'chinese',
        level: 'basic',
        levelLabelVi: 'Cơ bản (HSK 1 - HSK 2)',
        cefrTag: 'A2',
        examTag: 'HSKK Sơ cấp',
        titleVi: 'Giao tiếp lịch sự & Hỏi thăm lịch trình hàng ngày',
        targetSentence: '请问，今天下午的汉语课是在三楼教室上吗？',
        phoneticTranscription: '[Chỉnh uân, chin thiên xia u tơ Han uy khưa sư chai san lầu chiao sư sang ma?]',
        vietnameseTranslation: 'Xin hỏi, tiết học tiếng Trung chiều hôm nay có phải học ở phòng học tầng 3 không ạ?',
        targetWpm: 115,
        nativePitchContour: [45, 78, 82, 80, 76, 48, 40, 84, 52, 80, 62, 55],
        articulationGuide: {
          jawOpeningVi: 'Mở rộng miệng tự nhiên ở vận mẫu "ia" (xia - hạ) và "ao" (jiaoshi - giáo thất).',
          tonguePositionVi: 'Đầu lưỡi uốn cong chạm vòm cứng khi phát âm âm quặt lưỡi "sh" (shi, shang).',
          airflowVoiceVi: 'Bật hơi rõ ràng ở thanh mẫu "q" (qing), "t" (tian) và "k" (ke).',
          rhythmStressVi: 'Giữ chuẩn Thanh 4 dứt khoát ở các chữ: 问 (wen), 下 (xia), 汉 (han), 课 (ke), 室 (shi).'
        },
        syllables: [
          {
            token: '请问',
            phoneticGuide: '[chỉnh uân (Thanh 3 + Thanh 4)]',
            stressLevel: 'primary',
            mouthTipVi: 'Bật hơi âm Q, hạ giọng dứt khoát ở chữ Wen.',
            commonMistakeVi: 'Người Việt hay quên bật hơi chữ Q khiến nghe giống chữ J.'
          },
          {
            token: '汉语课',
            phoneticGuide: '[han uy khưa (Thanh 4 + 3 + 4)]',
            stressLevel: 'primary',
            mouthTipVi: 'Tròn môi giữ nguyên vị trí khi phát âm vận mẫu u tròn môi trong chữ Ngữ (yu).',
            commonMistakeVi: 'Bật hơi chưa đủ mạnh ở chữ Khóa (ke).'
          },
          {
            token: '教室',
            phoneticGuide: '[chiao sư (Thanh 4 + Thanh 4)]',
            stressLevel: 'secondary',
            mouthTipVi: 'Cong đầu lưỡi rõ ở chữ Thất (shi).',
            commonMistakeVi: 'Đọc nhẹ âm cong lưỡi sh thành âm s thẳng lưỡi.'
          }
        ]
      },
      {
        id: 'zh-spk-inter',
        languageId: 'chinese',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (HSK 3 - HSK 4)',
        cefrTag: 'B1',
        examTag: 'HSKK Trung cấp',
        titleVi: 'Thảo luận kế hoạch hợp tác thương mại điện tử',
        targetSentence: '随着电子商务的快速发展，越来越多的越南年轻人选择在网上创业。',
        phoneticTranscription: '[Xuấy trơ điên chử sang u tơ khoai xu pha trản, uyê lái uyê tuô tơ Uyê Nán niến chinh rấn xoản chứa chai oảng sang choang iê]',
        vietnameseTranslation: 'Cùng với sự phát triển nhanh chóng của thương mại điện tử, ngày càng nhiều người trẻ Việt Nam lựa chọn khởi nghiệp trên mạng.',
        targetWpm: 130,
        nativePitchContour: [56, 48, 84, 52, 78, 86, 62, 82, 64, 70, 50, 88],
        articulationGuide: {
          jawOpeningVi: 'Mở khẩu hình rõ ở vận mẫu kép "ua" (kuai, chuang) và "ian" (dian).',
          tonguePositionVi: 'Phân biệt rõ âm đầu lưỡi thẳng "z" (zi, zai) và âm quặt lưỡi "zh" (zhan, zhe, chuang).',
          airflowVoiceVi: 'Ngắt hơi tự nhiên sau cụm giới từ "随着电子商务的快速发展，" trước khi vào mệnh đề chính.',
          rhythmStressVi: 'Nhấn mạnh cấu trúc tăng tiến "越来越..." (ngày càng...) và cụm động từ kết quả "网上创业".'
        },
        syllables: [
          {
            token: '电子商务',
            phoneticGuide: '[điên chử sang u]',
            stressLevel: 'primary',
            mouthTipVi: 'Chữ Thương (shang) đọc Thanh 1 cao phẳng và cong lưỡi.',
            commonMistakeVi: 'Hay đọc thấp giọng Thanh 1 của chữ Thương.'
          },
          {
            token: '快速发展',
            phoneticGuide: '[khoai xu pha trản]',
            stressLevel: 'primary',
            mouthTipVi: 'Chữ Triển (zhan) cong lưỡi Thanh 3 đi xuống rồi lên nhẹ.',
            commonMistakeVi: 'Lẫn lộn giữa âm zh và j.'
          },
          {
            token: '创业',
            phoneticGuide: '[choang iê]',
            stressLevel: 'primary',
            mouthTipVi: 'Bật hơi cong lưỡi chữ Sáng (chuang), hạ dứt khoát Thanh 4.',
            commonMistakeVi: 'Thiếu độ bật hơi ở thanh mẫu ch-.'
          }
        ]
      },
      {
        id: 'zh-spk-adv',
        languageId: 'chinese',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (HSK 5 - HSK 6)',
        cefrTag: 'C1',
        examTag: 'HSKK Cao cấp',
        titleVi: 'Diễn thuyết học thuật về phát triển bền vững & đổi mới',
        targetSentence: '要想在激烈的国际竞争中立于不败之地，企业必须坚持科技创新与绿色发展并重。',
        phoneticTranscription: '[Iao tưởng chai chi liê tơ cuố chi ching trâng trung li uy pu pai trư ti, chỉ iê pi xuy chiên chứ khưa chi choang xin ủy luy xưa pha trản ping trung]',
        vietnameseTranslation: 'Muốn đứng ở vị thế bất khả chiến bại trong cuộc cạnh tranh quốc tế khốc liệt, doanh nghiệp bắt buộc phải kiên trì coi trọng cả đổi mới khoa học công nghệ lẫn phát triển xanh.',
        targetWpm: 142,
        nativePitchContour: [76, 54, 80, 68, 86, 72, 84, 50, 74, 82, 60, 90],
        articulationGuide: {
          jawOpeningVi: 'Khẩu hình linh hoạt, giữ âm vang khoang mũi ở các vận mẫu mũi sau "ing, eng, ong" (jingzheng, zhong, bing).',
          tonguePositionVi: 'Kiểm soát chuẩn xác chuỗi âm quặt lưỡi liên tiếp trong thành ngữ "立于不败之地" và "坚持".',
          airflowVoiceVi: 'Lấy hơi sâu đầu câu, đẩy khí mạnh ở cụm thành ngữ 4 chữ để tạo phong thái diễn thuyết trang trọng.',
          rhythmStressVi: 'Nhấn nhịp 4-4 ở cụm "科技创新" (Đổi mới công nghệ) và "绿色发展" (Phát triển xanh).'
        },
        syllables: [
          {
            token: '立于不败之地',
            phoneticGuide: '[li uy pu pai trư ti]',
            stressLevel: 'primary',
            mouthTipVi: 'Biến điệu chữ Bất (bu4 -> bu2) trước chữ Bại (bai4 - Thanh 4).',
            commonMistakeVi: 'Quên quy tắc biến điệu của chữ 不 trước âm tiết Thanh 4.'
          },
          {
            token: '科技创新',
            phoneticGuide: '[khưa chi choang xin]',
            stressLevel: 'primary',
            mouthTipVi: 'Hai Thanh 1 đầu và cuối giữ độ cao ổn định.',
            commonMistakeVi: 'Đọc hụt hơi ở chữ Tân (xin) cuối cụm.'
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: 'zh-wrt-basic',
        languageId: 'chinese',
        level: 'basic',
        levelLabelVi: 'Cơ bản (HSK 3)',
        cefrTag: 'A2',
        examName: 'HSK 3 - Viết đoạn văn ngắn',
        titleVi: 'Viết về thói quen học tiếng Trung mỗi ngày',
        promptText: '请写一段话（40-60个汉字），介绍你每天是怎么学习汉语的。',
        promptTranslationVi: 'Hãy viết một đoạn văn (40-60 chữ Hán) giới thiệu cách bạn học tiếng Trung mỗi ngày như thế nào.',
        minWordsOrChars: 35,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '我每天都学习汉语一个小时。早上我听汉语录音，晚上我复习生词和写汉字。我觉得学汉语很有意思。',
        modelHighBandEssay: '为了提高我的汉语水平，我每天坚持学习一个小时。早晨我会一边喝咖啡一边听标准录音练习发音；晚上则通过造句来巩固新学的词汇。持之以恒的练习让我的口语越来越流利。',
        modelTranslationVi: 'Để nâng cao trình độ tiếng Trung, mỗi ngày tôi đều kiên trì học một tiếng đồng hồ. Buổi sáng tôi vừa uống cà phê vừa nghe băng chuẩn để luyện phát âm; buổi tối thì thông qua việc đặt câu để củng cố từ vựng mới học. Việc luyện tập bền bỉ giúp khẩu ngữ của tôi ngày càng lưu loát.',
        targetPowerVocab: [
          { word: '坚持', phonetic: '[chiên chứ]', meaningVi: 'Kiên trì, bền bỉ duy trì' },
          { word: '巩固', phonetic: '[củng cu]', meaningVi: 'Củng cố, làm vững chắc' },
          { word: '持之以恒', phonetic: '[chứ trư ỷ hấng]', meaningVi: 'Thành ngữ: Kiên trì bền bỉ đến cùng' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '我每天都学习汉语',
            upgradedSnippet: '为了提高我的汉语水平，我每天坚持学习',
            explanationVi: 'Thêm cấu trúc mục đích "为了..." và động từ HSK 4 "坚持" (kiên trì) giúp câu văn có chiều sâu hơn.',
            criterionTag: 'GRA'
          },
          {
            originalSnippet: '复习生词和写汉字',
            upgradedSnippet: '通过造句来巩固新学的词汇',
            explanationVi: 'Thay động từ cơ bản "复习" (ôn tập) bằng "通过...来巩固..." (thông qua... để củng cố...).',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'zh-wrt-inter',
        languageId: 'chinese',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (HSK 4 - HSK 5)',
        cefrTag: 'B2',
        examName: 'HSK 5 - Viết đoạn nghị luận 80 chữ',
        titleVi: 'Bàn về lợi ích của phương thức thanh toán di động',
        promptText: '请结合实际生活，谈谈移动支付给人们带来的便利（80个汉字左右）。',
        promptTranslationVi: 'Hãy kết hợp thực tế đời sống để bàn về sự tiện lợi mà thanh toán di động mang lại cho con người (khoảng 80 chữ Hán).',
        minWordsOrChars: 50,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '现在移动支付非常方便。我们出门买东西不需要带现金，只要用手机扫码就可以付钱。这不仅节省了时间，而且提高了生活效率。',
        modelHighBandEssay: '如今，移动支付已经深入到人们日常生活的方方面面。无论是购物、餐饮还是乘坐公共交通，只需用手机轻松扫码即可完成交易。这种无现金模式不仅免去了找零的麻烦，更极大地提升了社会运转效率。',
        modelTranslationVi: 'Ngày nay, thanh toán di động đã đi sâu vào mọi mặt đời sống hàng ngày của con người. Bất kể là mua sắm, ăn uống hay đi phương tiện công cộng, chỉ cần dùng điện thoại quét mã nhẹ nhàng là hoàn tất giao dịch. Mô hình không tiền mặt này không những giúp tránh phiền phức khi trả tiền thừa mà còn nâng cao vượt bậc hiệu suất vận hành xã hội.',
        targetPowerVocab: [
          { word: '方方面面', phonetic: '[phang phang miên miên]', meaningVi: 'Mọi mặt, mọi khía cạnh' },
          { word: '无论是...还是...', phonetic: '[ú luân sư... hái sư...]', meaningVi: 'Bất kể là... hay là...' },
          { word: '运转效率', phonetic: '[uyn troản xiao luy]', meaningVi: 'Hiệu suất vận hành' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '现在移动支付非常方便',
            upgradedSnippet: '如今，移动支付已经深入到人们日常生活的方方面面',
            explanationVi: 'Sử dụng cụm từ "深入到...方方面面" (đi sâu vào mọi ngóc ngách) chuẩn văn phong HSK 5.',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'zh-wrt-adv',
        languageId: 'chinese',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (HSK 6)',
        cefrTag: 'C1',
        examName: 'HSK 6 - Viết luận học thuật',
        titleVi: 'Sự cân bằng giữa tăng trưởng kinh tế và bảo vệ môi trường',
        promptText: '请论述在现代社会发展中，如何实现经济增长与环境保护的和谐共生。',
        promptTranslationVi: 'Hãy luận bàn trong sự phát triển xã hội hiện đại, làm thế nào để thực hiện sự cộng sinh hài hòa giữa tăng trưởng kinh tế và bảo vệ môi trường.',
        minWordsOrChars: 65,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '经济发展和环境保护都很重要。我们不能只为了赚钱而破坏大自然，应该发展绿色能源，这样社会才能长久发展下去。',
        modelHighBandEssay: '经济增长与生态保护并非水火不容的对立面，而是相辅相成的命运共同体。以牺牲自然资源为代价的粗放型增长难以为继；唯有加快能源结构转型、大力扶持绿色低碳产业，方能实现经济效益与生态文明的可持续双赢。',
        modelTranslationVi: 'Tăng trưởng kinh tế và bảo vệ sinh thái hoàn toàn không phải hai mặt đối lập như nước với lửa, mà là cộng đồng vận mệnh bổ trợ lẫn nhau. Tăng trưởng thô phóng đánh đổi bằng tài nguyên thiên nhiên khó lòng duy trì lâu dài; chỉ có đẩy nhanh chuyển dịch cơ cấu năng lượng và hỗ trợ mạnh mẽ ngành công nghiệp xanh phát thải thấp mới có thể hiện thực hóa chiến thắng kép bền vững giữa hiệu quả kinh tế và văn minh sinh thái.',
        targetPowerVocab: [
          { word: '相辅相成', phonetic: '[xiang phủ xiang chấn]', meaningVi: 'Thành ngữ: Bổ trợ và thúc đẩy lẫn nhau' },
          { word: '难以为继', phonetic: '[nán ỷ uấy chi]', meaningVi: 'Thành ngữ: Khó lòng tiếp tục duy trì' },
          { word: '可持续双赢', phonetic: '[khửa chư xuy xoang ính]', meaningVi: 'Cùng thắng (win-win) một cách bền vững' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '经济发展和环境保护都很重要',
            upgradedSnippet: '经济增长与生态保护并非水火不容的对立面，而是相辅相成的命运共同体',
            explanationVi: 'Vận dụng cặp thành ngữ đối xứng "水火不容" và "相辅相成" giúp bài viết đạt điểm tối đa ở HSK 6.',
            criterionTag: 'LR'
          }
        ]
      }
    ]
  },

  japanese: {
    languageId: 'japanese',
    examStandardName: 'JLPT N5 - N1 / BJT Thương mại',
    targetRadarBenchmark: {
      pronunciation: 87,
      grammar: 89,
      vocabulary: 86,
      listening: 85,
      speaking: 84,
      writing: 83
    },
    speakingDrills: [
      {
        id: 'ja-spk-basic',
        languageId: 'japanese',
        level: 'basic',
        levelLabelVi: 'Cơ bản (JLPT N5 - N4)',
        cefrTag: 'A2',
        examTag: 'Giao tiếp N5/N4 chuẩn Pitch Accent',
        titleVi: 'Chào hỏi & Xác nhận lịch họp tại văn phòng Nhật Bản',
        targetSentence: '来週の月曜日の午前十時から、新しいプロジェクトの会議があります。',
        phoneticTranscription: '[Rai-shuu no getsu-you-bi no go-zen juu-ji ka-ra, a-ta-ra-shii pu-ro-jek-to no kai-gi ga a-ri-ma-su]',
        vietnameseTranslation: 'Từ 10 giờ sáng thứ Hai tuần sau sẽ có cuộc họp về dự án mới.',
        targetWpm: 120,
        nativePitchContour: [48, 74, 72, 50, 76, 68, 46, 52, 78, 76, 60, 42],
        articulationGuide: {
          jawOpeningVi: 'Mở miệng gọn, giữ nguyên âm Nhật ngắn và đều theo từng phách (Mora).',
          tonguePositionVi: 'Đầu lưỡi chạm nhẹ lợi trên ở hàng âm R (ra, ri, ru) — tuyệt đối không rung lưỡi hay cong lưỡi sâu như tiếng Việt.',
          airflowVoiceVi: 'Giữ trường âm (장음) đủ 2 phách ở "来週 (raishuu)" và "月曜日 (getsuyoubi)".',
          rhythmStressVi: 'Tiếng Nhật dùng Cao độ (Pitch Accent): lên giọng ở mora thứ 2 trong "新しい (a-TA-RA-SHI-i)" rồi hạ ở đuôi "-i".'
        },
        syllables: [
          {
            token: '来週',
            phoneticGuide: '[rai-shuu (Thấp - Cao - Cao)]',
            stressLevel: 'primary',
            mouthTipVi: 'Kéo dài âm uu ở cuối đủ 2 nhịp.',
            commonMistakeVi: 'Đọc ngắn thành "rai-shu" làm sai nhịp mora.'
          },
          {
            token: '新しい',
            phoneticGuide: '[a-ta-ra-shi-i]',
            stressLevel: 'primary',
            mouthTipVi: 'Bắt đầu thấp ở "a", nâng cao độ ở "ta-ra-shi" và hạ xuống ở "i" cuối.',
            commonMistakeVi: 'Nhấn mạnh lực vào chữ "ta" như trọng âm tiếng Anh.'
          },
          {
            token: 'あります',
            phoneticGuide: '[a-ri-ma-s]',
            stressLevel: 'secondary',
            mouthTipVi: 'Vô thanh hóa nhẹ nguyên âm /u/ cuối câu thành [-mas].',
            commonMistakeVi: 'Đọc rõ "ma-sự" nặng giọng cuối câu.'
          }
        ]
      },
      {
        id: 'ja-spk-inter',
        languageId: 'japanese',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (JLPT N3 - N2)',
        cefrTag: 'B2',
        examTag: 'BJT / Keigo Công sở Nhật Bản',
        titleVi: 'Báo cáo tiến độ & Xin ý kiến cấp trên bằng Kính ngữ (Keigo)',
        targetSentence: 'お忙しいところ恐れ入りますが、先ほどお送りした資料をご確認いただけますでしょうか。',
        phoneticTranscription: '[O-i-so-ga-shii to-ko-ro o-so-re-i-ri-ma-su ga, sa-ki-ho-do o-o-ku-ri shi-ta shi-ryou o go-ka-ku-nin i-ta-da-ke-ma-su de-shou ka]',
        vietnameseTranslation: 'Xin thứ lỗi vì làm phiền lúc anh/chị đang bận, liệu anh/chị có thể vui lòng kiểm tra giúp tôi tài liệu vừa gửi lúc nãy được không ạ?',
        targetWpm: 135,
        nativePitchContour: [50, 72, 70, 56, 68, 44, 64, 58, 76, 66, 74, 54],
        articulationGuide: {
          jawOpeningVi: 'Khẩu hình điềm tĩnh, lịch thiệp, không mở hàm quá lớn khi nói câu kính ngữ dài.',
          tonguePositionVi: 'Phát âm chuẩn âm ghép "ryou" trong "資料 (shiryoo)" một cách mượt mà không tách thành "ri-yo".',
          airflowVoiceVi: 'Ngắt nhịp mềm mại sau liên từ chuyển ý lịch sự "恐れ入りますが、" (osoreirimasu ga).',
          rhythmStressVi: 'Nâng nhẹ cao độ ở cuối câu "でしょうか (deshou ka)" để thể hiện sự thỉnh cầu tôn trọng.'
        },
        syllables: [
          {
            token: '恐れ入りますが',
            phoneticGuide: '[o-so-re-i-ri-ma-su ga]',
            stressLevel: 'primary',
            mouthTipVi: 'Cụm đệm mở lời kinh điển trong công sở Nhật Bản.',
            commonMistakeVi: 'Đọc vấp giữa âm "re" và "i-ri".'
          },
          {
            token: 'ご確認いただけます',
            phoneticGuide: '[go-ka-ku-nin i-ta-da-ke-ma-su]',
            stressLevel: 'primary',
            mouthTipVi: 'Khiêm nhường ngữ kết hợp thể khả năng lịch sự.',
            commonMistakeVi: 'Quên vô thanh hóa nhẹ âm "ku" trong "kakunin".'
          }
        ]
      },
      {
        id: 'ja-spk-adv',
        languageId: 'japanese',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (JLPT N1)',
        cefrTag: 'C1',
        examTag: 'Thuyết trình Học thuật & Chiến lược N1',
        titleVi: 'Phân tích giải pháp cho bài toán già hóa dân số & thiếu hụt nhân lực',
        targetSentence: '少子高齢化に伴う深刻な人手不足を解消するためには、デジタル技術の活用と多様な働き方の推進が不可欠である。',
        phoneticTranscription: '[Shou-shi kou-rei-ka ni to-mo-nau shin-ko-ku na hi-to-de bu-so-ku o kai-shou su-ru ta-me ni wa, de-ji-ta-ru gi-jutsu no katsu-you to ta-you na ha-ta-ra-ki-ka-ta no sui-shin ga fu-ka-ketsu de a-ru]',
        vietnameseTranslation: 'Để giải quyết tình trạng thiếu hụt lao động trầm trọng đi kèm với già hóa dân số và tỷ lệ sinh giảm, việc ứng dụng công nghệ số và thúc đẩy phương thức làm việc đa dạng là điều không thể thiếu.',
        targetWpm: 145,
        nativePitchContour: [78, 72, 64, 80, 58, 74, 46, 76, 68, 82, 70, 38],
        articulationGuide: {
          jawOpeningVi: 'Giữ khẩu hình sắc gọn cho chuỗi từ Hán - Nhật (Kango) 4 chữ.',
          tonguePositionVi: 'Phát âm chính xác tổ hợp âm bật "ketsu" trong "不可欠 (fukaketsu)" và "jutsu" trong "技術 (gijutsu)".',
          airflowVoiceVi: 'Lấy hơi sâu sau cụm mệnh đề mục đích "...解消するためには、" trước khi nêu 2 trụ cột giải pháp.',
          rhythmStressVi: 'Nhấn rõ cao độ đầu từ ở các danh từ học thuật: "少子高齢化", "人手不足", "不可欠".'
        },
        syllables: [
          {
            token: '少子高齢化',
            phoneticGuide: '[shou-shi kou-rei-ka]',
            stressLevel: 'primary',
            mouthTipVi: 'Giữ chuẩn 2 trường âm "shou" và "kou" liên tiếp.',
            commonMistakeVi: 'Rút ngắn trường âm làm người bản xứ khó nhận diện từ Hán.'
          },
          {
            token: '不可欠である',
            phoneticGuide: '[fu-ka-ketsu de a-ru]',
            stressLevel: 'primary',
            mouthTipVi: 'Hạ giọng trầm dứt khoát ở đuôi khẳng định học thuật "de aru".',
            commonMistakeVi: 'Lên giọng ở cuối câu khẳng định.'
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: 'ja-wrt-basic',
        languageId: 'japanese',
        level: 'basic',
        levelLabelVi: 'Cơ bản (JLPT N4)',
        cefrTag: 'A2',
        examName: 'JLPT N4 - Viết đoạn văn ngắn',
        titleVi: 'Kể về kế hoạch học tập và làm việc tại Nhật Bản',
        promptText: '日本語を勉強する目的と、将来の夢について簡単な文章（60〜100字程度）を書いてください。',
        promptTranslationVi: 'Hãy viết một đoạn văn ngắn (khoảng 60-100 chữ) về mục đích học tiếng Nhật và ước mơ tương lai của bạn.',
        minWordsOrChars: 45,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '私は日本のIT会社で働きたいですから、毎日一生懸命日本語を勉強しています。将来は日本でエンジニアになって、新しい技術を作りたいです。',
        modelHighBandEssay: '将来、日系IT企業でシステムエンジニアとして活躍するために、毎日欠かさず日本語の習得に励んでいます。専門知識だけでなく異文化理解も深め、日本とベトナムの架け橋となる人材を目指しています。',
        modelTranslationVi: 'Để có thể hoạt động tích cực với tư cách kỹ sư hệ thống tại doanh nghiệp IT Nhật Bản trong tương lai, mỗi ngày tôi đều không ngừng nỗ lực trau dồi tiếng Nhật. Không chỉ kiến thức chuyên môn mà tôi còn đào sâu sự thấu hiểu văn hóa, hướng tới việc trở thành nhân tài làm cầu nối giữa Nhật Bản và Việt Nam.',
        targetPowerVocab: [
          { word: '活躍する', phonetic: '[katsu-yaku suru]', meaningVi: 'Hoạt động sôi nổi, phát huy năng lực' },
          { word: '欠かさず', phonetic: '[ka-ka-sa-zu]', meaningVi: 'Đều đặn không bỏ sót ngày nào' },
          { word: '架け橋', phonetic: '[ka-ke-ha-shi]', meaningVi: 'Cầu nối (văn hóa, hợp tác)' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '日本のIT会社で働きたいですから',
            upgradedSnippet: '日系IT企業でシステムエンジニアとして活躍するために',
            explanationVi: 'Thay "働きたいですから" bằng cấu trúc mục đích trang trọng "〜として活躍するために" (để phát huy năng lực với tư cách là...).',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'ja-wrt-inter',
        languageId: 'japanese',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (JLPT N3 - N2)',
        cefrTag: 'B2',
        examName: 'JLPT N2 / BJT Email & Tiểu luận',
        titleVi: 'Lợi ích và thách thức của việc đọc sách điện tử (E-book)',
        promptText: '近年、電子書籍を利用する人が増えています。紙の本と比較して、電子書籍の利点についてのあなたの意見を述べてください。',
        promptTranslationVi: 'Những năm gần đây, số người sử dụng sách điện tử ngày càng tăng. So với sách giấy, hãy nêu ý kiến của bạn về ưu điểm của sách điện tử.',
        minWordsOrChars: 60,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '電子書籍はとても便利だと思います。スマートフォンやタブレットがあれば、いつでもどこでもたくさんの本を読むことができますし、場所も取りません。',
        modelHighBandEssay: '電子書籍の最大の利点は、圧倒的な携帯性と検索性の高さにあると考えられる。端末一つで数百冊もの蔵書を持ち運べるため、通勤時間などの隙間時間を有効活用できる上、保管スペースを圧迫しない点も現代のライフスタイルに合致している。',
        modelTranslationVi: 'Ưu điểm lớn nhất của sách điện tử được cho là nằm ở tính di động vượt trội và khả năng tra cứu cao. Vì chỉ với một thiết bị có thể mang theo hàng trăm đầu sách nên người đọc vừa tận dụng hiệu quả thời gian trống khi đi tàu điện, vừa không tốn diện tích lưu trữ — rất phù hợp với lối sống hiện đại.',
        targetPowerVocab: [
          { word: '携帯性', phonetic: '[kei-tai-sei]', meaningVi: 'Tính di động, nhỏ gọn dễ mang theo' },
          { word: '隙間時間', phonetic: '[su-ki-ma ji-kan]', meaningVi: 'Thời gian rảnh xen kẽ trong ngày' },
          { word: '合致する', phonetic: '[gat-chi su-ru]', meaningVi: 'Phù hợp hoàn toàn, khớp với' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '電子書籍はとても便利だと思います',
            upgradedSnippet: '電子書籍の最大の利点は、圧倒的な携帯性と検索性の高さにあると考えられる',
            explanationVi: 'Dùng thể văn viết học thuật "〜にあると考えられる" thay cho "〜と思います" trong bài luận N2.',
            criterionTag: 'GRA'
          }
        ]
      },
      {
        id: 'ja-wrt-adv',
        languageId: 'japanese',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (JLPT N1)',
        cefrTag: 'C1',
        examName: 'Tiểu luận Học thuật N1 / Đại học Nhật Bản',
        titleVi: 'Trách nhiệm xã hội của doanh nghiệp đối với môi trường',
        promptText: '地球温暖化対策において、現代の企業が果たすべき社会的責任について論じなさい。',
        promptTranslationVi: 'Hãy luận bàn về trách nhiệm xã hội mà các doanh nghiệp hiện đại cần thực thi trong các biện pháp ứng phó với nóng lên toàn cầu.',
        minWordsOrChars: 75,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '地球温暖化を止めるために、企業は利益だけを考えるのではなく、環境に優しい製品を作ったり、ゴミを減らしたりする責任があります。',
        modelHighBandEssay: '気候変動問題が深刻化する今日、企業には単なる短期的な利益追求にとどまらず、脱炭素社会の実現に向けた主導的役割が求められている。再生可能エネルギーの導入や循環型サプライチェーンの構築を通じて、環境負荷の低減と持続的成長を両立させることこそが企業の社会的責務である。',
        modelTranslationVi: 'Trong bối cảnh biến đổi khí hậu ngày càng trầm trọng hiện nay, các doanh nghiệp được đòi hỏi không chỉ dừng lại ở việc theo đuổi lợi nhuận ngắn hạn mà phải đóng vai trò chủ đạo hướng tới hiện thực hóa xã hội phi carbon. Thông qua việc đưa vào năng lượng tái tạo và xây dựng chuỗi cung ứng tuần hoàn, việc dung hòa giữa giảm thiểu gánh nặng môi trường và tăng trưởng bền vững chính là trách nhiệm xã hội của doanh nghiệp.',
        targetPowerVocab: [
          { word: '脱炭素社会', phonetic: '[datsu-tan-so sha-kai]', meaningVi: 'Xã hội phi carbon (Decarbonized society)' },
          { word: '両立させる', phonetic: '[ryou-ritsu sa-se-ru]', meaningVi: 'Dung hòa, thực hiện song hành cả hai mục tiêu' },
          { word: '社会的責務', phonetic: '[sha-kai-teki seki-mu]', meaningVi: 'Trách nhiệm, nghĩa vụ xã hội' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '利益だけを考えるのではなく',
            upgradedSnippet: '単なる短期的な利益追求にとどまらず',
            explanationVi: 'Cấu trúc N1 "〜にとどまらず" (không chỉ dừng lại ở...) kết hợp danh từ Hán Nhật "利益追求" tạo sức nặng lập luận.',
            criterionTag: 'GRA'
          }
        ]
      }
    ]
  },

  korean: {
    languageId: 'korean',
    examStandardName: 'TOPIK I & TOPIK II (Cấp 1 - Cấp 6)',
    targetRadarBenchmark: {
      pronunciation: 86,
      grammar: 88,
      vocabulary: 86,
      listening: 87,
      speaking: 85,
      writing: 84
    },
    speakingDrills: [
      {
        id: 'ko-spk-basic',
        languageId: 'korean',
        level: 'basic',
        levelLabelVi: 'Cơ bản (TOPIK I - Cấp 1-2)',
        cefrTag: 'A2',
        examTag: 'TOPIK Speaking Sơ cấp',
        titleVi: 'Giới thiệu kế hoạch cuối tuần & Luyện quy tắc nối âm (연음)',
        targetSentence: '이번 주말에는 친구들과 함께 한국 문화 축제를 구경하러 갈 거예요.',
        phoneticTranscription: '[I-bơn chu-ma-rê-nưn chin-gu-đưl-goa ham-kkê Han-guk mun-hoa chuk-chơ-rưl ku-gyơng-ha-rơ kal kơ-iê-iô]',
        vietnameseTranslation: 'Cuối tuần này tôi định sẽ đi xem lễ hội văn hóa Hàn Quốc cùng với những người bạn.',
        targetWpm: 120,
        nativePitchContour: [52, 68, 64, 58, 74, 62, 76, 66, 72, 56, 70, 44],
        articulationGuide: {
          jawOpeningVi: 'Mở hàm tự nhiên ở nguyên âm "어 (ơ)" và tròn môi ở nguyên âm "오/우 (ô/u)".',
          tonguePositionVi: 'Áp dụng quy tắc nối âm (연음): phụ âm cuối ㄹ trong "주말에" nối sang nguyên âm sau thành [chu-ma-rê].',
          airflowVoiceVi: 'Phân biệt rõ âm bật hơi "축 (chuk)", "친 (chin)" với âm căng "함께 (ham-kkê)", "축제 (chuk-chơ)".',
          rhythmStressVi: 'Giữ nhịp điệu mượt theo từng cụm trợ từ: "이번 주말에는 / 친구들과 함께 / 한국 문화 축제를...".'
        },
        syllables: [
          {
            token: '주말에는',
            phoneticGuide: '[chu-ma-rê-nưn]',
            stressLevel: 'primary',
            mouthTipVi: 'Nối phụ âm cuối ㄹ sang 에 thành âm [rê] mềm mại.',
            commonMistakeVi: 'Đọc tách rời thành "chu-mal-ê-nưn" nghe rất cứng.'
          },
          {
            token: '함께',
            phoneticGuide: '[ham-kkê]',
            stressLevel: 'primary',
            mouthTipVi: 'Căng thanh quản khi phát âm phụ âm kép ㄲ (kkê).',
            commonMistakeVi: 'Đọc nhẹ thành "ham-kê" giống âm ㄱ thường.'
          }
        ]
      },
      {
        id: 'ko-spk-inter',
        languageId: 'korean',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (TOPIK II - Cấp 3-4)',
        cefrTag: 'B2',
        examTag: 'Phỏng vấn Doanh nghiệp Hàn Quốc',
        titleVi: 'Trình bày kinh nghiệm làm việc & Mục tiêu nghề nghiệp trang trọng',
        targetSentence: '저는 지난 삼 년 동안 마케팅 분야에서 쌓은 경험을 바탕으로 귀사의 글로벌 프로젝트에 기여하고 싶습니다.',
        phoneticTranscription: '[Chơ-nưn chi-nan sam niơn tông-an ma-khê-thing pun-ia-ê-xơ xxa-ưn kiơng-hơ-mưl pa-thang-ư-rô quy-xa-ê kưl-lô-bơl phư-rô-chếk-thư-ê ki-iơ-ha-gô xip-xưm-ni-đa]',
        vietnameseTranslation: 'Dựa trên kinh nghiệm tích lũy trong lĩnh vực marketing suốt 3 năm qua, tôi muốn đóng góp vào dự án toàn cầu của quý công ty.',
        targetWpm: 135,
        nativePitchContour: [60, 72, 68, 54, 78, 66, 74, 52, 82, 70, 76, 40],
        articulationGuide: {
          jawOpeningVi: 'Giữ khẩu hình nghiêm túc, rõ nét từng âm tiết khi dùng đuôi câu trang trọng "-습니다".',
          tonguePositionVi: 'Biến âm mũi hóa ở đuôi "싶습니다": phụ âm ㅂ gặp ㄴ đọc thành [xip-xưm-ni-đa].',
          airflowVoiceVi: 'Bật hơi rõ ở các từ ngoại lai và Hán Hàn như "마케팅 (ma-khê-thing)" và "바탕으로 (pa-thang-ư-rô)".',
          rhythmStressVi: 'Nhấn giọng tự tin vào cụm "쌓은 경험을 바탕으로" (dựa trên nền tảng kinh nghiệm đã tích lũy).'
        },
        syllables: [
          {
            token: '경험을',
            phoneticGuide: '[kiơng-hơ-mưl]',
            stressLevel: 'primary',
            mouthTipVi: 'Nối phụ âm cuối ㅁ sang 을 thành [hơ-mưl].',
            commonMistakeVi: 'Quên nối âm khiến câu bị ngắt quãng.'
          },
          {
            token: '싶습니다',
            phoneticGuide: '[xip-xưm-ni-đa]',
            stressLevel: 'primary',
            mouthTipVi: 'Mím môi biến âm ㅂ trước ㄴ thành âm mũi ㅁ [xưm-ni-đa].',
            commonMistakeVi: 'Đọc cứng thành "xip-xưp-ni-đa".'
          }
        ]
      },
      {
        id: 'ko-spk-adv',
        languageId: 'korean',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (TOPIK II - Cấp 5-6)',
        cefrTag: 'C1',
        examTag: 'TOPIK II Speaking & Thuyết trình Học thuật',
        titleVi: 'Bàn luận chính sách cân bằng công việc và đời sống (워라밸)',
        targetSentence: '근로자의 삶의 질을 향상시키고 기업의 장기적인 생산성을 높이기 위해서는 유연 근무제의 정착이 필수적입니다.',
        phoneticTranscription: '[Kưl-lô-cha-ê xal-mê chi-rưl hiang-xang-xi-khi-gô ki-ơ-bê chang-gi-chơ-gin xeng-xan-xơng-ưl nô-phi-gi uy-hê-xơ-nưn iu-iơn kưn-mu-chê-ê chơng-cha-gi phil-xu-chơ-gim-ni-đa]',
        vietnameseTranslation: 'Để nâng cao chất lượng cuộc sống của người lao động và gia tăng năng suất dài hạn của doanh nghiệp, việc thiết lập vững chắc chế độ làm việc linh hoạt là điều tất yếu.',
        targetWpm: 146,
        nativePitchContour: [74, 68, 82, 60, 76, 84, 70, 52, 80, 72, 86, 38],
        articulationGuide: {
          jawOpeningVi: 'Mở khẩu hình chuẩn xác ở các nguyên âm ghép "의", "유", "향".',
          tonguePositionVi: 'Thực hiện biến âm lưu âm hóa (유음화) ở "근로자": ㄴ + ㄹ biến thành [kưl-lô-cha].',
          airflowVoiceVi: 'Kiểm soát luồng hơi dài qua hai mệnh đề mục đích nối bằng "-고" trước khi chốt ở "-기 위해서는".',
          rhythmStressVi: 'Nhấn mạnh vào từ khóa học thuật "유연 근무제" (chế độ làm việc linh hoạt) và "필수적입니다" (mang tính tất yếu).'
        },
        syllables: [
          {
            token: '근로자의',
            phoneticGuide: '[kưl-lô-cha-ê]',
            stressLevel: 'primary',
            mouthTipVi: 'Biến âm ㄴ+ㄹ thành ㄹ+ㄹ [kưl-lô], trợ từ sở hữu 의 đọc là [ê].',
            commonMistakeVi: 'Đọc nguyên chữ thành "kưn-rô-cha-ưi".'
          },
          {
            token: '필수적입니다',
            phoneticGuide: '[phil-xu-chơ-gim-ni-đa]',
            stressLevel: 'primary',
            mouthTipVi: 'Nối âm ㄱ sang 입니다 và mũi hóa thành [chơ-gim-ni-đa].',
            commonMistakeVi: 'Không nối âm ㄱ sang 이.'
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: 'ko-wrt-basic',
        languageId: 'korean',
        level: 'basic',
        levelLabelVi: 'Cơ bản (TOPIK I - II Cấp 2-3)',
        cefrTag: 'A2',
        examName: 'TOPIK II Câu 51-52 (Viết đoạn văn thực용)',
        titleVi: 'Viết đoạn văn ngắn giới thiệu thói quen rèn luyện sức khỏe',
        promptText: '건강을 지키기 위해서 여러분은 평소 어떤 운동이나 습관을 실천하고 있습니까? (50~80자)',
        promptTranslationVi: 'Để giữ gìn sức khỏe, thường ngày bạn đang thực hiện môn thể thao hay thói quen nào? (50~80 chữ)',
        minWordsOrChars: 40,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '저는 건강을 지키기 위해서 매일 아침 공원에서 삼십 분 동안 조깅을 합니다. 그리고 물을 많이 마시고 채소를 자주 먹으려고 노력합니다.',
        modelHighBandEssay: '저는 건강한 생활 습관을 유지하기 위해 매일 아침 삼십 분씩 꾸준히 조깅을 실천하고 있습니다. 아울러 충분한 수분 섭취와 균형 잡힌 식단을 병행함으로써 신체적 활력과 정신적 여유를 동시에 기르고자 노력합니다.',
        modelTranslationVi: 'Để duy trì thói quen sinh hoạt lành mạnh, mỗi sáng tôi đều đặn thực hiện chạy bộ 30 phút. Đồng thời, thông qua việc kết hợp bổ sung đủ nước và chế độ ăn cân bằng, tôi nỗ lực bồi dưỡng cả sinh lực thể chất lẫn sự thư thái tinh thần.',
        targetPowerVocab: [
          { word: '꾸준히 실천하다', phonetic: '[kku-chun-hi xil-chơn-ha-đa]', meaningVi: 'Thực hiện một cách đều đặn, bền bỉ' },
          { word: '균형 잡힌 식단', phonetic: '[kiun-hiơng cha-phin xik-đan]', meaningVi: 'Thực đơn ăn uống cân bằng dinh dưỡng' },
          { word: '병행하다', phonetic: '[piơng-heng-ha-đa]', meaningVi: 'Thực hiện song song, kết hợp' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '건강을 지키기 위해서 매일 아침 조깅을 합니다',
            upgradedSnippet: '건강한 생활 습관을 유지하기 위해 매일 아침 꾸준히 조깅을 실천하고 있습니다',
            explanationVi: 'Sử dụng phó từ "꾸준히" và động từ "실천하다" giúp nâng tầm câu văn lên chuẩn TOPIK cấp 4-5.',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'ko-wrt-inter',
        languageId: 'korean',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (TOPIK II - Câu 53 Phân tích)',
        cefrTag: 'B2',
        examName: 'TOPIK II Câu 53 (Phân tích xu hướng)',
        titleVi: 'Phân tích sự gia tăng của hộ gia đình 1 người (1인 가구) và tiêu dùng trực tuyến',
        promptText: '최근 1인 가구의 증가와 함께 온라인 쇼핑 이용률이 급증하고 있습니다. 이러한 변화의 원인과 영향을 서술하십시오.',
        promptTranslationVi: 'Gần đây cùng với sự gia tăng của hộ gia đình độc thân, tỷ lệ sử dụng mua sắm trực tuyến đang tăng vọt. Hãy trình bày nguyên nhân và ảnh hưởng của sự thay đổi này.',
        minWordsOrChars: 55,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '최근 1인 가구가 많아지면서 온라인으로 물건을 사는 사람들이 크게 늘어났습니다. 왜냐하면 혼자 사는 사람들은 시간이 부족하고 소량 포장된 상품을 집에서 편하게 배달받고 싶어 하기 때문입니다.',
        modelHighBandEssay: '최근 청년층의 독립과 만혼 추세로 인해 1인 가구 비중이 가파르게 상승함에 따라 온라인 쇼핑 이용률 또한 급증하고 있다. 이는 시간적 효율성을 중시하는 1인 가구 소비자들이 소포장 간편식을 비대면으로 신속히 배송받기를 선호하기 때문이며, 결과적으로 유통 산업의 디지털 전환을 가속화하고 있다.',
        modelTranslationVi: 'Gần đây do xu hướng tự lập của giới trẻ và kết hôn muộn khiến tỷ trọng hộ gia đình 1 người tăng mạnh, tỷ lệ sử dụng mua sắm trực tuyến cũng tăng vọt theo. Điều này là bởi người tiêu dùng độc thân coi trọng hiệu quả thời gian ưa chuộng việc nhận giao hàng nhanh không tiếp xúc các mặt hàng tiện lợi đóng gói nhỏ, và kết quả là đang thúc đẩy nhanh quá trình chuyển đổi số của ngành phân phối.',
        targetPowerVocab: [
          { word: '가파르게 상승하다', phonetic: '[ka-pha-rư-gê xang-xưng-ha-đa]', meaningVi: 'Tăng lên một cách dốc đứng / mạnh mẽ' },
          { word: '시간적 효율성', phonetic: '[xi-gan-chơk hiô-iul-xơng]', meaningVi: 'Hiệu quả về mặt thời gian' },
          { word: '가속화하다', phonetic: '[ka-xôk-hoa-ha-đa]', meaningVi: 'Thúc đẩy nhanh, tăng tốc' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '1인 가구가 많아지면서 온라인으로 물건을 사는 사람들이 크게 늘어났습니다',
            upgradedSnippet: '1인 가구 비중이 가파르게 상승함에 따라 온라인 쇼핑 이용률 또한 급증하고 있다',
            explanationVi: 'Chuyển sang đuôi văn viết nghị luận TOPIK "-ㄴ/는다" và cấu trúc "-함에 따라" chuẩn Câu 53-54.',
            criterionTag: 'GRA'
          }
        ]
      },
      {
        id: 'ko-wrt-adv',
        languageId: 'korean',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (TOPIK II - Câu 54 Nghị luận Cấp 6)',
        cefrTag: 'C1',
        examName: 'TOPIK II Câu 54 (Nghị luận Xã hội 600-700 chữ)',
        titleVi: 'Nghị luận về vai trò của phê bình tích cực trong sự phát triển xã hội',
        promptText: '사회 발전을 위해 건전한 비판 문화가 왜 필요한지, 그리고 바람직한 비판의 자세는 무엇인지 논술하십시오.',
        promptTranslationVi: 'Hãy viết bài nghị luận về lý do tại sao văn hóa phê bình lành mạnh lại cần thiết cho sự phát triển xã hội, và thái độ phê bình đúng đắn là gì.',
        minWordsOrChars: 70,
        unitLabel: 'ký tự',
        sampleLearnerDraft: '사회가 발전하려면 잘못된 문제점을 지적하는 건전한 비판이 꼭 필요합니다. 하지만 남을 무조건 비난하기보다는 객관적인 근거를 가지고 해결책을 함께 제시하는 태도가 중요합니다.',
        modelHighBandEssay: '건전한 비판은 사회의 구조적 모순을 바로잡고 공동체의 지속적인 진보를 견인하는 핵심 원동력이다. 그러나 근거 없는 비난이나 감정적 대립은 오히려 사회적 갈등을 증폭시킬 우려가 있으므로, 비판 시에는 객관적 사실에 입각하여 대안을 모색하는 성숙한 시민 의식이 뒷받침되어야 한다.',
        modelTranslationVi: 'Phê bình lành mạnh là động lực cốt lõi giúp chấn chỉnh những mâu thuẫn cấu trúc của xã hội và dẫn dắt sự tiến bộ bền vững của cộng đồng. Tuy nhiên, sự chỉ trích vô căn cứ hay đối đầu cảm tính ngược lại có nguy cơ làm trầm trọng thêm xung đột xã hội; do đó khi phê bình cần phải có sự hậu thuẫn của ý thức công dân trưởng thành — dựa trên sự thật khách quan để tìm kiếm giải pháp thay thế.',
        targetPowerVocab: [
          { word: '핵심 원동력', phonetic: '[hếk-xim uơn-đông-niơk]', meaningVi: 'Động lực cốt lõi, then chốt' },
          { word: '객관적 사실에 입각하다', phonetic: '[kếk-quan-chơk xa-xi-rê ip-kak-ha-đa]', meaningVi: 'Dựa trên cơ sở sự thật khách quan' },
          { word: '뒷받침되다', phonetic: '[tuýt-pat-chim-tuê-đa]', meaningVi: 'Được hậu thuẫn, làm nền tảng nâng đỡ' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: '사회가 발전하려면 잘못된 문제점을 지적하는 건전한 비판이 꼭 필요합니다',
            upgradedSnippet: '건전한 비판은 사회의 구조적 모순을 바로잡고 공동체의 진보를 견인하는 핵심 원동력이다',
            explanationVi: 'Sử dụng định nghĩa học thuật "견인하는 핵심 원동력이다" (là động lực cốt lõi dẫn dắt...) đạt chuẩn TOPIK cấp 6.',
            criterionTag: 'LR'
          }
        ]
      }
    ]
  },

  french: {
    languageId: 'french',
    examStandardName: 'DELF B1-B2 / DALF C1',
    targetRadarBenchmark: {
      pronunciation: 85,
      grammar: 87,
      vocabulary: 88,
      listening: 84,
      speaking: 85,
      writing: 86
    },
    speakingDrills: [
      {
        id: 'fr-spk-basic',
        languageId: 'french',
        level: 'basic',
        levelLabelVi: 'Cơ bản (DELF A1 - A2)',
        cefrTag: 'A2',
        examTag: 'DELF A2 Production Orale',
        titleVi: 'Luyện nối âm (Liaison) & Giao tiếp lịch sự tại Paris',
        targetSentence: 'Nous avons réservé une table pour deux personnes dans un restaurant traditionnel.',
        phoneticTranscription: '[Nu za-vông rê-zéc-vê uyn ta-blơ pua đơ péc-xôn đăng zăng rét-xtô-răng tra-đi-xi-ô-nen]',
        vietnameseTranslation: 'Chúng tôi đã đặt một bàn cho hai người tại một nhà hàng truyền thống.',
        targetWpm: 122,
        nativePitchContour: [50, 66, 62, 74, 58, 68, 72, 54, 64, 70, 78, 42],
        articulationGuide: {
          jawOpeningVi: 'Tròn môi đẩy về phía trước khi phát âm nguyên âm u Pháp trong "une" [uyn] và eu trong "deux" [đơ].',
          tonguePositionVi: 'Nối phụ âm cuối -s trong "Nous avons" thành âm rung [nu za-vông] và -n trong "dans un" thành [đăng zăng].',
          airflowVoiceVi: 'Đưa luồng hơi lên khoang mũi ở các nguyên âm mũi "on, an, un" (avons, dans, un, restaurant).',
          rhythmStressVi: 'Tiếng Pháp nhấn nhẹ vào âm tiết cuối của từng nhóm từ (groupe rythmique): réservé, personnes, traditionnel.'
        },
        syllables: [
          {
            token: 'Nous avons',
            phoneticGuide: '[Nu za-vông]',
            stressLevel: 'primary',
            mouthTipVi: 'Bắt buộc nối âm -s sang nguyên âm a- thành âm /z/.',
            commonMistakeVi: 'Đọc tách rời thành "nu a-vông" hoặc phát âm chữ s cuối.'
          },
          {
            token: 'une table',
            phoneticGuide: '[uyn ta-blơ]',
            stressLevel: 'secondary',
            mouthTipVi: 'Giữ đầu lưỡi chạm răng dưới, chu tròn môi ở âm "u" của "une".',
            commonMistakeVi: 'Đọc "une" thành "un" như tiếng Việt.'
          },
          {
            token: 'traditionnel',
            phoneticGuide: '[tra-đi-xi-ô-nen]',
            stressLevel: 'primary',
            mouthTipVi: 'Rung nhẹ âm R cuống họng và giữ âm L rõ ở cuối từ.',
            commonMistakeVi: 'Nuốt mất âm L cuối từ.'
          }
        ]
      },
      {
        id: 'fr-spk-inter',
        languageId: 'french',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (DELF B1 - B2)',
        cefrTag: 'B2',
        examTag: 'DELF B2 Exposé & Débat',
        titleVi: 'Trình bày quan điểm về chuyển đổi sinh thái đô thị',
        targetSentence: 'Il est essentiel que les grandes métropoles investissent davantage dans les transports en commun écologiques.',
        phoneticTranscription: '[Il ê tê-xăng-xi-en cơ lê grăng-đơ mê-trô-pôn anh-vét-xtít đa-văng-ta-jơ đăng lê trăng-xpo ăng cô-manh ê-cô-lô-jík]',
        vietnameseTranslation: 'Điều thiết yếu là các đô thị lớn phải đầu tư nhiều hơn nữa vào hệ thống giao thông công cộng thân thiện với môi trường.',
        targetWpm: 136,
        nativePitchContour: [64, 78, 60, 72, 68, 80, 74, 56, 70, 66, 82, 40],
        articulationGuide: {
          jawOpeningVi: 'Mở khẩu hình rõ ở các nguyên âm mũi "an/en" trong "grandes, davantage, transports, en".',
          tonguePositionVi: 'Hạ lưỡi và rung nhẹ cuống họng ở các cụm phụ âm /gr/, /tr/ (grandes, métropoles, transports).',
          airflowVoiceVi: 'Giữ luồng hơi liền mạch qua cấu trúc Subjonctif "Il est essentiel que... investissent".',
          rhythmStressVi: 'Nâng cao độ ở "essentiel" và "davantage" để làm nổi bật lập luận nghị luận DELF B2.'
        },
        syllables: [
          {
            token: 'Il est essentiel',
            phoneticGuide: '[Il ê tê-xăng-xi-en]',
            stressLevel: 'primary',
            mouthTipVi: 'Nối âm -t của "est" sang "essentiel" tạo sự trôi chảy.',
            commonMistakeVi: 'Ngắt hơi cứng giữa "est" và "essentiel".'
          },
          {
            token: 'investissent',
            phoneticGuide: '[anh-vét-xtít]',
            stressLevel: 'primary',
            mouthTipVi: 'Đuôi -ent ngôi thứ 3 số nhiều hoàn toàn câm, kết thúc ở âm /s/ rõ.',
            commonMistakeVi: 'Đọc luôn đuôi "-ent" thành "anh-vét-xtít-xăng".'
          }
        ]
      },
      {
        id: 'fr-spk-adv',
        languageId: 'french',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (DALF C1)',
        cefrTag: 'C1',
        examTag: 'DALF C1 Production Orale',
        titleVi: 'Phân tích triết lý giáo dục & Đa dạng văn hóa Pháp ngữ',
        targetSentence: 'Bien que la mondialisation favorise les échanges économiques, la préservation de la diversité linguistique demeure primordiale.',
        phoneticTranscription: '[Bi-anh cơ la mông-đi-a-li-za-xi-ông pha-vô-ri-zơ lê zê-săng-jơ ê-cô-nô-mík, la prê-zéc-va-xi-ông đơ la đi-véc-xi-tê lanh-guýt-xtík đơ-mơ pri-moóc-đi-al]',
        vietnameseTranslation: 'Mặc dù toàn cầu hóa thúc đẩy giao thương kinh tế, việc bảo tồn sự đa dạng ngôn ngữ vẫn giữ vai trò tối quan trọng.',
        targetWpm: 145,
        nativePitchContour: [62, 74, 80, 68, 76, 46, 70, 78, 72, 66, 86, 38],
        articulationGuide: {
          jawOpeningVi: 'Kiểm soát độ mở hàm cân đối giữa các âm mũi "on, an, in" và nguyên âm miệng.',
          tonguePositionVi: 'Nối âm chuẩn ở "les échanges" [lê zê-săng-jơ] và phát âm mềm âm [jơ].',
          airflowVoiceVi: 'Tạo đường cong ngữ điệu Đi lên (Intonation montante) ở cuối mệnh đề "économiques," và Đi xuống (Intonation descendante) ở "primordiale.".',
          rhythmStressVi: 'Nhấn trọng tâm vào "préservation", "diversité linguistique" và "primordiale".'
        },
        syllables: [
          {
            token: 'mondialisation',
            phoneticGuide: '[mông-đi-a-li-za-xi-ông]',
            stressLevel: 'primary',
            mouthTipVi: 'Đọc chữ -s- giữa hai nguyên âm thành âm rung /z/.',
            commonMistakeVi: 'Đọc âm -s- thành âm /s/ vô thanh.'
          },
          {
            token: 'primordiale',
            phoneticGuide: '[pri-moóc-đi-al]',
            stressLevel: 'primary',
            mouthTipVi: 'Hạ giọng trầm dứt khoát ở âm tiết cuối -al.',
            commonMistakeVi: 'Nhấn trọng âm vào âm đầu PRI- theo thói quen tiếng Anh.'
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: 'fr-wrt-basic',
        languageId: 'french',
        level: 'basic',
        levelLabelVi: 'Cơ bản (DELF A2 - B1)',
        cefrTag: 'B1',
        examName: 'DELF B1 Production Écrite',
        titleVi: 'Viết thư chia sẻ trải nghiệm học tiếng Pháp và văn hóa',
        promptText: 'Racontez en un court paragraphe (50 à 80 mots) pourquoi vous apprenez le français et comment cette langue vous aide dans vos projets.',
        promptTranslationVi: 'Hãy kể trong một đoạn văn ngắn (50 đến 80 từ) lý do bạn học tiếng Pháp và ngôn ngữ này giúp ích thế nào cho dự định của bạn.',
        minWordsOrChars: 45,
        unitLabel: 'từ',
        sampleLearnerDraft: 'J’apprends le français parce que j’aime beaucoup la culture française et la gastronomie. De plus, parler français va m’aider à trouver un bon travail dans une entreprise internationale au Vietnam.',
        modelHighBandEssay: 'Passionné par la richesse culturelle de la francophonie, j’ai entrepris l’apprentissage du français afin d’élargir mes horizons professionnels. En effet, la maîtrise de cette langue constitue un atout majeur pour intégrer une entreprise multinationale et collaborer efficacement avec des partenaires francophones.',
        modelTranslationVi: 'Đam mê sự phong phú văn hóa của cộng đồng Pháp ngữ, tôi đã bắt đầu việc học tiếng Pháp nhằm mở rộng chân trời nghề nghiệp của mình. Thực vậy, việc làm chủ ngôn ngữ này tạo nên một lợi thế lớn để gia nhập tập đoàn đa quốc gia và hợp tác hiệu quả với các đối tác Pháp ngữ.',
        targetPowerVocab: [
          { word: 'élargir ses horizons', phonetic: '[ê-lác-jia xê zô-ri-zông]', meaningVi: 'Mở rộng tầm nhìn, chân trời mới' },
          { word: 'un atout majeur', phonetic: '[ăng na-tu ma-jơ]', meaningVi: 'Một lợi thế lớn, chủ chốt' },
          { word: 'la maîtrise', phonetic: '[la mê-tri-zơ]', meaningVi: 'Sự làm chủ, thông thạo' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'parler français va m’aider à trouver un bon travail',
            upgradedSnippet: 'la maîtrise de cette langue constitue un atout majeur pour intégrer une entreprise multinationale',
            explanationVi: 'Sử dụng danh từ hóa "la maîtrise" và cụm "constitue un atout majeur" chuẩn tiêu chí chấm DELF B1/B2.',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'fr-wrt-inter',
        languageId: 'french',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (DELF B2)',
        cefrTag: 'B2',
        examName: 'DELF B2 Essai Argumenté',
        titleVi: 'Bài luận nghị luận về làm việc từ xa (Le télétravail)',
        promptText: 'Le télétravail se généralise dans de nombreux secteurs. Présentez les avantages de cette organisation tout en soulignant ses limites.',
        promptTranslationVi: 'Làm việc từ xa đang trở nên phổ biến trong nhiều lĩnh vực. Hãy trình bày những lợi ích của hình thức này đồng thời chỉ ra những giới hạn của nó.',
        minWordsOrChars: 60,
        unitLabel: 'từ',
        sampleLearnerDraft: 'Aujourd’hui, le télétravail est très populaire. D’un côté, il permet aux salariés de gagner du temps dans les transports. Mais d’un autre côté, il peut réduire le contact social entre les collègues.',
        modelHighBandEssay: 'À l’ère du numérique, le télétravail s’impose progressivement comme un mode d’organisation incontournable. S’il favorise indéniablement l’autonomie des collaborateurs en supprimant la fatigue liée aux trajets quotidiens, il comporte néanmoins le risque d’affaiblir la cohésion d’équipe et d’accentuer le sentiment d’isolement professionnel.',
        modelTranslationVi: 'Trong kỷ nguyên số, làm việc từ xa đang dần khẳng định vị thế như một phương thức tổ chức không thể bỏ qua. Dù không thể phủ nhận rằng nó thúc đẩy tính tự chủ của nhân sự nhờ xóa bỏ sự mệt mỏi khi đi lại hàng ngày, hình thức này vẫn tiềm ẩn nguy cơ làm suy yếu sự gắn kết đội ngũ và làm gia tăng cảm giác cô lập trong công việc.',
        targetPowerVocab: [
          { word: 'incontournable', phonetic: '[anh-công-tua-na-blơ]', meaningVi: 'Không thể bỏ qua, tất yếu' },
          { word: 'indéniablement', phonetic: '[anh-đê-ni-a-blơ-măng]', meaningVi: 'Không thể phủ nhận được' },
          { word: 'la cohésion d’équipe', phonetic: '[la cô-ê-zi-ông đê-kíp]', meaningVi: 'Sự gắn kết đội ngũ' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'le télétravail est très populaire',
            upgradedSnippet: 'le télétravail s’impose progressivement comme un mode d’organisation incontournable',
            explanationVi: 'Nâng cấp mở bài bằng động từ phản thân "s’imposer comme" và tính từ B2/C1 "incontournable".',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'fr-wrt-adv',
        languageId: 'french',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (DALF C1)',
        cefrTag: 'C1',
        examName: 'DALF C1 Essai Argumenté',
        titleVi: 'Trách nhiệm đạo đức trong kỷ nguyên Trí tuệ Nhân tạo',
        promptText: 'Dans quelle mesure le développement de l’intelligence artificielle nécessite-t-il un encadrement éthique rigoureux ?',
        promptTranslationVi: 'Ở mức độ nào sự phát triển của trí tuệ nhân tạo đòi hỏi một khuôn khổ đạo đức nghiêm ngặt?',
        minWordsOrChars: 75,
        unitLabel: 'từ',
        sampleLearnerDraft: 'L’intelligence artificielle apporte beaucoup de progrès techniques, mais elle pose aussi des problèmes éthiques. C’est pourquoi les gouvernements doivent créer des lois strictes pour protéger les citoyens et leurs données personnelles.',
        modelHighBandEssay: 'L’essor fulgurant de l’intelligence artificielle bouleverse profondément nos paradigmes socio-économiques. Quoique ces innovations offrent des perspectives inédites en matière de productivité, elles soulèvent des enjeux éthiques majeurs quant à la protection des libertés individuelles, rendant indispensable l’instauration d’un cadre réglementaire supranational rigoureux.',
        modelTranslationVi: 'Sự trỗi dậy thần tốc của trí tuệ nhân tạo đang làm đảo lộn sâu sắc các mô hình kinh tế - xã hội của chúng ta. Mặc dù những đổi mới này mở ra triển vọng chưa từng có về năng suất, chúng cũng đặt ra những thách thức đạo đức lớn liên quan đến việc bảo vệ quyền tự do cá nhân, khiến việc thiết lập một khuôn khổ pháp lý siêu quốc gia nghiêm ngặt trở nên không thể thiếu.',
        targetPowerVocab: [
          { word: 'l’essor fulgurant', phonetic: '[lê-xo phuyn-guy-răng]', meaningVi: 'Sự trỗi dậy, phát triển thần tốc' },
          { word: 'quoique (+ subjonctif)', phonetic: '[koa-cơ]', meaningVi: 'Mặc dù (liên từ nhượng bộ học thuật C1)' },
          { word: 'un cadre réglementaire', phonetic: '[ăng ca-đrơ rê-glơ-măng-te]', meaningVi: 'Khuôn khổ pháp lý, quy định' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'elle pose aussi des problèmes éthiques',
            upgradedSnippet: 'elles soulèvent des enjeux éthiques majeurs quant à la protection des libertés',
            explanationVi: 'Thay "poser des problèmes" bằng collocation học thuật cao cấp "soulever des enjeux majeurs".',
            criterionTag: 'LR'
          }
        ]
      }
    ]
  },

  german: {
    languageId: 'german',
    examStandardName: 'Goethe-Zertifikat A2 - C1 / TestDaF',
    targetRadarBenchmark: {
      pronunciation: 86,
      grammar: 88,
      vocabulary: 87,
      listening: 85,
      speaking: 84,
      writing: 85
    },
    speakingDrills: [
      {
        id: 'de-spk-basic',
        languageId: 'german',
        level: 'basic',
        levelLabelVi: 'Cơ bản (Goethe A1 - A2)',
        cefrTag: 'A2',
        examTag: 'Goethe A2 Sprechen',
        titleVi: 'Đặt lịch hẹn & Cấu trúc động từ đứng vị trí số 2 (V2)',
        targetSentence: 'Morgen früh fahre ich mit dem Schnellzug nach München, um unsere Geschäftspartner zu treffen.',
        phoneticTranscription: '[Moóc-gần phruy PHA-rơ ích mít đêm SNEN-tsuk nác MUYN-khân, um UN-zơ-rơ gơ-SẾP-ts-pát-nơ tsu TRẾP-phân]',
        vietnameseTranslation: 'Sáng sớm ngày mai tôi đi tàu cao tốc tới Munich để gặp gỡ các đối tác kinh doanh của chúng ta.',
        targetWpm: 120,
        nativePitchContour: [54, 72, 68, 52, 60, 78, 56, 82, 46, 70, 76, 38],
        articulationGuide: {
          jawOpeningVi: 'Tròn môi giữ đầu lưỡi chạm răng dưới khi phát âm nguyên âm Umlaut "ü" trong "früh" [phruy] và "München" [Muyn-khân].',
          tonguePositionVi: 'Phân biệt âm "ch" mềm (Ich-Laut) sau nguyên âm i, ü ("ich, München") và âm "ch" sâu cuống họng (Ach-Laut) sau a ("nach").',
          airflowVoiceVi: 'Bật rõ âm tắc xát "z" = [ts] trong "Schnellzug" và giới từ "zu".',
          rhythmStressVi: 'Nhấn mạnh tiền tố đầu của danh từ ghép "SCHNELLzug" và gốc từ "geSCHÄFTSpartner".'
        },
        syllables: [
          {
            token: 'Schnellzug',
            phoneticGuide: '[SNEN-tsuk]',
            stressLevel: 'primary',
            mouthTipVi: 'Chu môi ở cụm phụ âm đầu "Schn-" và bật âm [ts] ở chữ z.',
            commonMistakeVi: 'Đọc chữ z thành âm /z/ tiếng Anh thay vì âm [ts] tiếng Đức.'
          },
          {
            token: 'München',
            phoneticGuide: '[MUYN-khân]',
            stressLevel: 'primary',
            mouthTipVi: 'Tròn môi âm ü và đẩy hơi qua khe lưỡi tạo âm Ich-Laut.',
            commonMistakeVi: 'Đọc thành "Mun-chen" như âm ch tiếng Việt.'
          }
        ]
      },
      {
        id: 'de-spk-inter',
        languageId: 'german',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (Goethe B1 - B2)',
        cefrTag: 'B2',
        examTag: 'Goethe B2 Vortrag',
        titleVi: 'Thuyết trình về năng lượng tái tạo & Mệnh đề phụ (Nebensatz)',
        targetSentence: 'Obwohl der Ausbau erneuerbarer Energien hohe Investitionen erfordert, zahlt er sich langfristig für die Umwelt aus.',
        phoneticTranscription: '[Ốp-vôn đe AO-x-bao e-NOI-ơ-ba-rơ ê-ne-GHI-ân HÔ-ơ in-vét-xti-tsi-Ô-nân e-PHOÓC-đợt, tsan-t e dích LANG-phrít-xtích phuya đi UM-ven-t ao-x]',
        vietnameseTranslation: 'Mặc dù việc mở rộng năng lượng tái tạo đòi hỏi khoản đầu tư lớn, về lâu dài nó mang lại lợi ích xứng đáng cho môi trường.',
        targetWpm: 134,
        nativePitchContour: [58, 76, 64, 80, 70, 74, 84, 52, 78, 66, 72, 40],
        articulationGuide: {
          jawOpeningVi: 'Mở rộng khẩu hình ở các nguyên âm đôi "au" (Ausbau, aus) và "eu" [oi] (erneuerbarer).',
          tonguePositionVi: 'Đưa động từ chia "erfordert" về cuối mệnh đề phụ "Obwohl..." và nối liền bằng động từ đảo ngữ "zahlt" ở đầu mệnh đề chính.',
          airflowVoiceVi: 'Phát âm đuôi "-ig" trong "langfristig" giống âm Ich-Laut [-ích] theo chuẩn phát âm Hochdeutsch.',
          rhythmStressVi: 'Nhấn mạnh tiền tố tách được "AUS" ở cuối câu ("zahlt ... aus") để hoàn chỉnh khung động từ.'
        },
        syllables: [
          {
            token: 'erneuerbarer',
            phoneticGuide: '[e-NOI-ơ-ba-rơ]',
            stressLevel: 'primary',
            mouthTipVi: 'Nguyên âm đôi "eu" luôn đọc là [oi], đuôi "-er" hạ nhẹ thành âm [-ơ].',
            commonMistakeVi: 'Đọc "eu" thành "êu" và rung quá mạnh các chữ r cuối âm tiết.'
          },
          {
            token: 'langfristig',
            phoneticGuide: '[LANG-phrít-xtích]',
            stressLevel: 'primary',
            mouthTipVi: 'Nhấn âm đầu LANG-, đuôi -ig đọc mềm thành [-ích].',
            commonMistakeVi: 'Đọc cứng đuôi -ig thành [-ik].'
          }
        ]
      },
      {
        id: 'de-spk-adv',
        languageId: 'german',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (Goethe C1 / TestDaF)',
        cefrTag: 'C1',
        examTag: 'TestDaF Mündlicher Ausdruck',
        titleVi: 'Phản biện học thuật về chuyển đổi số trong giáo dục đại học',
        targetSentence: 'Die fortschreitende Digitalisierung der Hochschulbildung eröffnet vielfältige Möglichkeiten zur individuellen Wissensvermittlung.',
        phoneticTranscription: '[Đi PHOÓT-srai-tân-đơ đi-gi-ta-li-ZI-rung đe HỐC-sun-bin-đung e-ỚP-nợt PHIN-phen-ti-gơ MỚC-lích-kai-tân tsua in-đi-vi-đu-EN-lân VÍT-xân-x-phe-mít-lung]',
        vietnameseTranslation: 'Quá trình số hóa ngày càng tiến sâu của giáo dục đại học mở ra những khả năng đa dạng cho việc truyền đạt tri thức cá nhân hóa.',
        targetWpm: 144,
        nativePitchContour: [60, 78, 66, 84, 72, 80, 68, 76, 74, 62, 86, 38],
        articulationGuide: {
          jawOpeningVi: 'Kiểm soát tròn môi chính xác ở nguyên âm Umlaut "ö" (eröffnet, Möglichkeiten).',
          tonguePositionVi: 'Lưỡi di chuyển dứt khoát qua các danh từ ghép học thuật dài như "Hochschulbildung" và "Wissensvermittlung".',
          airflowVoiceVi: 'Giữ hơi ổn định suốt cụm danh từ mở rộng để làm nổi bật cấu trúc Nominalstil (văn phong danh từ hóa C1).',
          rhythmStressVi: 'Đặt trọng âm chính vào âm tiết "-SI-" trong "Digitalisierung" và âm đầu trong "WISSENSvermittlung".'
        },
        syllables: [
          {
            token: 'Digitalisierung',
            phoneticGuide: '[đi-gi-ta-li-ZI-rung]',
            stressLevel: 'primary',
            mouthTipVi: 'Danh từ đuôi -ierung luôn nhận trọng âm ở âm tiết -IE- [-ZI-].',
            commonMistakeVi: 'Nhấn nhầm vào âm đầu DI-.'
          },
          {
            token: 'Wissensvermittlung',
            phoneticGuide: '[VÍT-xân-x-phe-mít-lung]',
            stressLevel: 'primary',
            mouthTipVi: 'Bật rõ âm nối -s- (Fugen-s) giữa Wissens và vermittlung.',
            commonMistakeVi: 'Bỏ sót âm nối -s- giữa hai thành tố danh từ ghép.'
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: 'de-wrt-basic',
        languageId: 'german',
        level: 'basic',
        levelLabelVi: 'Cơ bản (Goethe A2 - B1)',
        cefrTag: 'B1',
        examName: 'Goethe-Zertifikat B1 Schreiben',
        titleVi: 'Viết về lợi ích của việc học tiếng Đức đối với sự nghiệp',
        promptText: 'Schreiben Sie einen kurzen Absatz (50–80 Wörter) darüber, warum Sie Deutsch lernen und welche beruflichen Ziele Sie haben.',
        promptTranslationVi: 'Hãy viết một đoạn văn ngắn (50-80 từ) về lý do tại sao bạn học tiếng Đức và mục tiêu nghề nghiệp của bạn là gì.',
        minWordsOrChars: 45,
        unitLabel: 'từ',
        sampleLearnerDraft: 'Ich lerne jeden Tag Deutsch, weil ich später in Deutschland studieren und arbeiten möchte. Gute Deutschkenntnisse sind sehr wichtig, wenn man in einer deutschen Firma eine gute Stelle finden will.',
        modelHighBandEssay: 'Da ich eine berufliche Laufbahn im Bereich Ingenieurwesen in Deutschland anstrebe, widme ich mich täglich intensiv dem Deutschlernen. Fundierte Sprachkenntnisse eröffnen nicht nur hervorragende Karrierechancen bei internationalen Konzernen, sondern erleichtern auch die soziale Integration vor Ort.',
        modelTranslationVi: 'Vì tôi hướng tới sự nghiệp chuyên môn trong lĩnh vực kỹ thuật tại Đức nên mỗi ngày tôi đều dành tâm huyết học tiếng Đức chuyên sâu. Kiến thức ngôn ngữ vững chắc không chỉ mở ra cơ hội nghề nghiệp xuất sắc tại các tập đoàn quốc tế mà còn giúp quá trình hội nhập xã hội tại bản địa thuận lợi hơn.',
        targetPowerVocab: [
          { word: 'eine Laufbahn anstreben', phonetic: '[ai-nơ LAO-f-ban AN-strê-bân]', meaningVi: 'Hướng tới, theo đuổi một con đường sự nghiệp' },
          { word: 'fundierte Kenntnisse', phonetic: '[phun-ĐIA-tơ KEN-t-nít-xơ]', meaningVi: 'Kiến thức nền tảng vững chắc, chuyên sâu' },
          { word: 'hervorragende Chancen', phonetic: '[he-PHOA-ra-gân-đơ SĂNG-xân]', meaningVi: 'Cơ hội xuất sắc, vượt trội' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'weil ich später in Deutschland arbeiten möchte',
            upgradedSnippet: 'Da ich eine berufliche Laufbahn in Deutschland anstrebe',
            explanationVi: 'Đưa mệnh đề nguyên nhân với "Da..." lên đầu câu và dùng cụm động từ B2 "eine Laufbahn anstreben".',
            criterionTag: 'GRA'
          }
        ]
      },
      {
        id: 'de-wrt-inter',
        languageId: 'german',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (Goethe B2)',
        cefrTag: 'B2',
        examName: 'Goethe-Zertifikat B2 Forumsbeitrag',
        titleVi: 'Thảo luận về làm việc tại nhà (Homeoffice) trong doanh nghiệp hiện đại',
        promptText: 'Äußern Sie Ihre Meinung zu den Vor- und Nachteilen von Homeoffice in modernen Unternehmen.',
        promptTranslationVi: 'Hãy trình bày quan điểm của bạn về ưu và nhược điểm của hình thức làm việc tại nhà (Homeoffice) trong các doanh nghiệp hiện đại.',
        minWordsOrChars: 60,
        unitLabel: 'từ',
        sampleLearnerDraft: 'Meiner Meinung nach hat das Homeoffice viele Vorteile, weil die Mitarbeiter Zeit und Geld für den Arbeitsweg sparen. Jedoch fehlt manchmal der persönliche Kontakt zu den Kollegen im Büro.',
        modelHighBandEssay: 'Meines Erachtens bietet die flexible Arbeit im Homeoffice erhebliche Vorteile, da der tägliche Pendelverkehr entfällt und die Vereinbarkeit von Beruf und Familie gestärkt wird. Dennoch darf nicht außer Acht gelassen werden, dass der Mangel an direktem Austausch das Zusammengehörigkeitsgefühl im Team beeinträchtigen kann.',
        modelTranslationVi: 'Theo quan điểm của tôi, làm việc linh hoạt tại nhà mang lại những lợi ích đáng kể vì việc đi lại hàng ngày được loại bỏ và sự cân bằng giữa công việc - gia đình được củng cố. Tuy nhiên, không thể bỏ qua thực tế rằng sự thiếu hụt trao đổi trực tiếp có thể làm ảnh hưởng đến tinh thần gắn kết trong đội ngũ.',
        targetPowerVocab: [
          { word: 'meines Erachtens', phonetic: '[MAI-nớt e-ÁC-tân-x]', meaningVi: 'Theo sự đánh giá / quan điểm của tôi (C1)' },
          { word: 'der Pendelverkehr', phonetic: '[đe PEN-đơn-phe-kea]', meaningVi: 'Việc di chuyển đi làm hàng ngày' },
          { word: 'außer Acht lassen', phonetic: '[AO-xơ ác-t LÁT-xân]', meaningVi: 'Bỏ qua, xem nhẹ (cấu trúc Nomen-Verb)' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'Meiner Meinung nach hat das Homeoffice viele Vorteile',
            upgradedSnippet: 'Meines Erachtens bietet die flexible Arbeit im Homeoffice erhebliche Vorteile',
            explanationVi: 'Sử dụng cụm trạng ngữ trang trọng "Meines Erachtens" (cách 2 - Genitiv) giúp ghi điểm ngữ pháp B2/C1.',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'de-wrt-adv',
        languageId: 'german',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (Goethe C1 / TestDaF TDN 5)',
        cefrTag: 'C1',
        examName: 'TestDaF Schriftlicher Ausdruck',
        titleVi: 'Chuyển dịch năng lượng xanh và sức cạnh tranh công nghiệp',
        promptText: 'Erörtern Sie, wie der Übergang zu erneuerbaren Energien mit der wirtschaftlichen Wettbewerbsfähigkeit vereinbart werden kann.',
        promptTranslationVi: 'Hãy phân tích làm thế nào quá trình chuyển dịch sang năng lượng tái tạo có thể dung hòa với năng lực cạnh tranh kinh tế.',
        minWordsOrChars: 75,
        unitLabel: 'từ',
        sampleLearnerDraft: 'Um den Klimawandel zu bekämpfen, müssen wir mehr erneuerbare Energien nutzen. Gleichzeitig muss der Staat den Unternehmen helfen, damit die Wirtschaft stark und wettbewerbsfähig bleibt.',
        modelHighBandEssay: 'Die Bewältigung der Klimakrise setzt voraus, dass die Dekarbonisierung der Industrie konsequent vorangetrieben wird. Anstatt ökologische Nachhaltigkeit und wirtschaftliche Wettbewerbsfähigkeit als Widerspruch zu begreifen, sollten gezielte Innovationsförderungen in grüne Schlüsseltechnologien als Katalysator für langfristiges Wachstum genutzt werden.',
        modelTranslationVi: 'Việc ứng phó với khủng hoảng khí hậu đòi hỏi quá trình phi carbon hóa ngành công nghiệp phải được thúc đẩy nhất quán. Thay vì coi tính bền vững sinh thái và năng lực cạnh tranh kinh tế là sự mâu thuẫn, các chính sách hỗ trợ đổi mới có trọng tâm vào công nghệ xanh chủ chốt cần được tận dụng như chất xúc tác cho tăng trưởng dài hạn.',
        targetPowerVocab: [
          { word: 'die Bewältigung', phonetic: '[đi bơ-VEN-ti-gung]', meaningVi: 'Sự giải quyết, vượt qua thách thức lớn' },
          { word: 'vorantreiben', phonetic: '[phô-RAN-trai-bân]', meaningVi: 'Thúc đẩy mạnh mẽ tiến về phía trước' },
          { word: 'der Katalysator', phonetic: '[đe ka-ta-ly-ZA-toa]', meaningVi: 'Nhân tố xúc tác, đòn bẩy' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'Um den Klimawandel zu bekämpfen, müssen wir',
            upgradedSnippet: 'Die Bewältigung der Klimakrise setzt voraus, dass die Dekarbonisierung konsequent vorangetrieben wird',
            explanationVi: 'Áp dụng Nominalstil ("Die Bewältigung...") và thể bị động quá trình ("vorangetrieben wird") chuẩn TestDaF TDN 5.',
            criterionTag: 'GRA'
          }
        ]
      }
    ]
  },

  spanish: {
    languageId: 'spanish',
    examStandardName: 'DELE A2 - C1 / SIELE Global',
    targetRadarBenchmark: {
      pronunciation: 88,
      grammar: 86,
      vocabulary: 87,
      listening: 86,
      speaking: 87,
      writing: 84
    },
    speakingDrills: [
      {
        id: 'es-spk-basic',
        languageId: 'spanish',
        level: 'basic',
        levelLabelVi: 'Cơ bản (DELE A1 - A2)',
        cefrTag: 'A2',
        examTag: 'DELE A2 Expresión Oral',
        titleVi: 'Luyện âm rung R/RR & Giao tiếp du lịch tại Madrid',
        targetSentence: 'Mañana por la mañana recorreremos el centro histórico de Madrid y probaremos la tortilla española.',
        phoneticTranscription: '[Ma-NHA-na poóc la ma-NHA-na rre-cô-rre-RÊ-mốt en XÊN-trô ít-XTÔ-ri-cô đê Ma-ĐRÍT y prô-ba-RÊ-mốt la toóc-TI-gia ét-xpa-NHÔ-la]',
        vietnameseTranslation: 'Sáng ngày mai chúng tôi sẽ dạo quanh trung tâm lịch sử của Madrid và thưởng thức món trứng đúc khoai tây Tây Ban Nha.',
        targetWpm: 128,
        nativePitchContour: [52, 74, 58, 66, 78, 72, 60, 82, 54, 70, 76, 42],
        articulationGuide: {
          jawOpeningVi: '5 nguyên âm tiếng Tây Ban Nha (a, e, i, o, u) phát âm mở, tròn trịa, tuyệt đối không bị lướt thành âm /ơ/ như tiếng Anh.',
          tonguePositionVi: 'Đầu lưỡi rung mạnh nhiều nhịp ở âm "rr" trong "recorreremos", và mặt lưỡi chạm vòm họng tạo âm "ñ" [nh] trong "mañana, española".',
          airflowVoiceVi: 'Chữ "h" trong "histórico" hoàn toàn câm — nối thẳng từ "el centro" sang [ít-XTÔ-ri-cô].',
          rhythmStressVi: 'Nhấn mạnh âm tiết có dấu sắc (tilde): histó-rico, và âm tiết áp chót của các từ kết thúc bằng nguyên âm.'
        },
        syllables: [
          {
            token: 'recorreremos',
            phoneticGuide: '[rre-cô-rre-RÊ-mốt]',
            stressLevel: 'primary',
            mouthTipVi: 'Rung đầu lưỡi ở cả r đầu từ và rr giữa từ, nhấn âm -RÊ-.',
            commonMistakeVi: 'Không rung lưỡi làm âm rr nghe giống âm l hoặc r nhẹ.'
          },
          {
            token: 'histórico',
            phoneticGuide: '[ít-XTÔ-ri-cô]',
            stressLevel: 'primary',
            mouthTipVi: 'Bỏ qua chữ h câm, nhấn cao giọng ở âm tiết có dấu sắc -TÓ-.',
            commonMistakeVi: 'Phát âm chữ h đầu từ thành "hít-tô-ri-cô".'
          }
        ]
      },
      {
        id: 'es-spk-inter',
        languageId: 'spanish',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (DELE B1 - B2)',
        cefrTag: 'B2',
        examTag: 'DELE B2 Monólogo & Debate',
        titleVi: 'Trình bày giải pháp du lịch bền vững với thể Subjuntivo',
        targetSentence: 'Es fundamental que las autoridades locales promuevan un turismo sostenible que proteja el patrimonio natural.',
        phoneticTranscription: '[Ét phun-đa-men-TAN kê lát ao-tô-ri-ĐA-đệt lô-CA-lệt prô-MUÊ-văn un tu-RÍT-mô xốt-xtê-NÍ-blê kê prô-TÊ-kha en pa-tri-MÔ-ni-ô na-tu-RAN]',
        vietnameseTranslation: 'Điều cốt lõi là chính quyền địa phương cần thúc đẩy nền du lịch bền vững giúp bảo vệ di sản thiên nhiên.',
        targetWpm: 140,
        nativePitchContour: [62, 78, 56, 74, 70, 82, 66, 76, 58, 72, 80, 40],
        articulationGuide: {
          jawOpeningVi: 'Mở hàm rõ ở nguyên âm đôi "ue" trong động từ biến đổi nguyên âm "promuevan".',
          tonguePositionVi: 'Phát âm phụ âm "j" trong "proteja" bằng âm xát cuống họng [kh] đặc trưng của tiếng Tây Ban Nha.',
          airflowVoiceVi: 'Giữ nhịp nối âm mượt mà (Sinalefa) giữa các từ liền kề để đạt độ trôi chảy tự nhiên của người bản xứ.',
          rhythmStressVi: 'Nhấn âm tiết cuối ở các từ kết thúc bằng phụ âm -l, -n, -r: fundamenTAL, natuRAL.'
        },
        syllables: [
          {
            token: 'promuevan',
            phoneticGuide: '[prô-MUÊ-văn]',
            stressLevel: 'primary',
            mouthTipVi: 'Chữ v đọc mềm gần như âm b khép hờ hai môi.',
            commonMistakeVi: 'Quên chia thể giả định Subjuntivo sau "Es fundamental que".'
          },
          {
            token: 'proteja',
            phoneticGuide: '[prô-TÊ-kha]',
            stressLevel: 'primary',
            mouthTipVi: 'Đẩy hơi từ cuống họng ở chữ j [kha].',
            commonMistakeVi: 'Đọc chữ j thành âm /dʒ/ như tiếng Anh.'
          }
        ]
      },
      {
        id: 'es-spk-adv',
        languageId: 'spanish',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (DELE C1)',
        cefrTag: 'C1',
        examTag: 'DELE C1 Expresión e Interacción Orales',
        titleVi: 'Diễn thuyết học thuật về chuyển đổi số & Đổi mới giáo dục',
        targetSentence: 'Por mucho que la transformación digital agilice la gestión empresarial, el liderazgo empático sigue siendo insustituible.',
        phoneticTranscription: '[Poóc MU-chô kê la tran-xphoóc-ma-XI-ôn đi-khi-TAN a-khi-LI-xê la khét-XTI-ôn em-prê-xa-ri-AN, en li-đê-RÁT-gô em-PA-ti-cô XI-gê xi-ÊN-đô in-xút-xti-tu-Í-blê]',
        vietnameseTranslation: 'Dù cho chuyển đổi số có thúc đẩy nhanh việc quản trị doanh nghiệp đến đâu, năng lực lãnh đạo thấu cảm vẫn luôn không thể thay thế.',
        targetWpm: 148,
        nativePitchContour: [66, 76, 82, 68, 78, 84, 48, 72, 80, 64, 88, 38],
        articulationGuide: {
          jawOpeningVi: 'Giữ khẩu hình sắc nét, phát âm rõ từng nguyên âm trong từ học thuật 6 âm tiết "insustituible".',
          tonguePositionVi: 'Phát âm chữ "g" trước e/i ("digital, agilice, gestión") bằng âm xát họng [kh], còn "gue" trong "sigue" đọc là âm [g] thường.',
          airflowVoiceVi: 'Tạo điểm nhấn tương phản sau cấu trúc nhượng bộ C1 "Por mucho que + Subjuntivo".',
          rhythmStressVi: 'Nhấn mạnh đỉnh ngữ điệu vào "EMPÁTICO" và "INSUSTITUIBLE".'
        },
        syllables: [
          {
            token: 'agilice',
            phoneticGuide: '[a-khi-LI-xê]',
            stressLevel: 'primary',
            mouthTipVi: 'Âm g trước i đọc là [kh], nhấn âm tiết -LI-.',
            commonMistakeVi: 'Đọc chữ g thành âm /g/ cứng.'
          },
          {
            token: 'insustituible',
            phoneticGuide: '[in-xút-xti-tu-Í-blê]',
            stressLevel: 'primary',
            mouthTipVi: 'Nhấn rõ vào âm -Í- trước đuôi -ble.',
            commonMistakeVi: 'Bỏ sót âm tiết giữa "-ti-" khi đọc nhanh.'
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: 'es-wrt-basic',
        languageId: 'spanish',
        level: 'basic',
        levelLabelVi: 'Cơ bản (DELE A2 - B1)',
        cefrTag: 'B1',
        examName: 'DELE B1 Expresión Escrita',
        titleVi: 'Viết về lợi ích của việc biết nói tiếng Tây Ban Nha',
        promptText: 'Escribe un breve párrafo (50–80 palabras) explicando por qué estudias español y qué ventajas tiene para tu futuro profesional.',
        promptTranslationVi: 'Hãy viết một đoạn văn ngắn (50-80 từ) giải thích tại sao bạn học tiếng Tây Ban Nha và ngôn ngữ này mang lại lợi thế gì cho tương lai nghề nghiệp của bạn.',
        minWordsOrChars: 45,
        unitLabel: 'từ',
        sampleLearnerDraft: 'Estudio español porque es un idioma muy hablado en todo el mundo. Además, saber español me ayudará a comunicarme con clientes de España y América Latina en mi trabajo futuro.',
        modelHighBandEssay: 'Decidí aprender español dado que es una de las lenguas con mayor proyección internacional. Dominar este idioma no solo me brinda la oportunidad de acceder a mercados emergentes en España y Latinoamérica, sino que también enriquece mi perfil profesional en el ámbito del comercio global.',
        modelTranslationVi: 'Tôi quyết định học tiếng Tây Ban Nha bởi đây là một trong những ngôn ngữ có tầm ảnh hưởng quốc tế lớn nhất. Việc làm chủ ngôn ngữ này không chỉ mang lại cho tôi cơ hội tiếp cận các thị trường mới nổi tại Tây Ban Nha và Mỹ Latinh mà còn làm giàu hồ sơ nghề nghiệp của tôi trong lĩnh vực thương mại toàn cầu.',
        targetPowerVocab: [
          { word: 'proyección internacional', phonetic: '[prô-iếc-XI-ôn in-téc-na-xi-ô-NAN]', meaningVi: 'Tầm ảnh hưởng / sức lan tỏa quốc tế' },
          { word: 'mercados emergentes', phonetic: '[méc-CA-đốt ê-méc-KHÊN-tệt]', meaningVi: 'Các thị trường mới nổi' },
          { word: 'enriquecer el perfil', phonetic: '[en-rri-kê-XẾC en péc-PHIN]', meaningVi: 'Làm giàu, nâng tầm hồ sơ năng lực' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'es un idioma muy hablado en todo el mundo',
            upgradedSnippet: 'es una de las lenguas con mayor proyección internacional',
            explanationVi: 'Sử dụng cụm danh từ học thuật "con mayor proyección internacional" thay cho "muy hablado".',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'es-wrt-inter',
        languageId: 'spanish',
        level: 'intermediate',
        levelLabelVi: 'Trung cấp (DELE B2)',
        cefrTag: 'B2',
        examName: 'DELE B2 Artículo de Opinión',
        titleVi: 'Bàn luận về ưu và nhược điểm của làm việc từ xa (El teletrabajo)',
        promptText: 'Analiza las ventajas y los inconvenientes del teletrabajo para los trabajadores y las empresas actuales.',
        promptTranslationVi: 'Hãy phân tích những ưu điểm và bất cập của hình thức làm việc từ xa đối với người lao động và các doanh nghiệp hiện nay.',
        minWordsOrChars: 60,
        unitLabel: 'từ',
        sampleLearnerDraft: 'En la actualidad, el teletrabajo ofrece mucha flexibilidad a los empleados porque evita los desplazamientos diarios. Sin embargo, trabajar siempre desde casa puede dificultar la comunicación directa con el equipo.',
        modelHighBandEssay: 'Hoy en día, el teletrabajo se ha consolidado como una modalidad laboral altamente valorada gracias a que facilita la conciliación familiar y elimina los desplazamientos cotidianos. No obstante, resulta imprescindible establecer dinámicas colaborativas eficaces para evitar que la distancia física merme la cohesión del equipo.',
        modelTranslationVi: 'Ngày nay, làm việc từ xa đã khẳng định vị thế là một hình thức lao động được đánh giá cao nhờ giúp cân bằng cuộc sống gia đình và loại bỏ việc đi lại hàng ngày. Tuy nhiên, việc thiết lập cơ chế phối hợp hiệu quả là vô cùng cần thiết để tránh việc khoảng cách vật lý làm suy giảm sự gắn kết của đội ngũ.',
        targetPowerVocab: [
          { word: 'consolidarse como', phonetic: '[côn-xô-li-ĐÁC-xê cô-mô]', meaningVi: 'Khẳng định vị thế vững chắc như là' },
          { word: 'la conciliación familiar', phonetic: '[la côn-xi-li-a-XI-ôn pha-mi-li-ÁC]', meaningVi: 'Sự cân bằng giữa công việc và gia đình' },
          { word: 'mermar la cohesión', phonetic: '[méc-MÁC la cô-ê-XI-ôn]', meaningVi: 'Làm suy giảm sự gắn kết (Subjuntivo: merme)' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'el teletrabajo ofrece mucha flexibilidad',
            upgradedSnippet: 'el teletrabajo se ha consolidado como una modalidad laboral altamente valorada',
            explanationVi: 'Sử dụng động từ "consolidarse" ở thì hiện tại hoàn thành giúp mở bài đạt chuẩn DELE B2/C1.',
            criterionTag: 'LR'
          }
        ]
      },
      {
        id: 'es-wrt-adv',
        languageId: 'spanish',
        level: 'advanced',
        levelLabelVi: 'Nâng cao (DELE C1)',
        cefrTag: 'C1',
        examName: 'DELE C1 Ensayo Argumentativo',
        titleVi: 'Trí tuệ nhân tạo và tương lai của giáo dục đại học',
        promptText: 'Reflexiona sobre el impacto de la inteligencia artificial en la educación superior y la necesidad de fomentar el pensamiento crítico.',
        promptTranslationVi: 'Hãy suy ngẫm về tác động của trí tuệ nhân tạo đối với giáo dục đại học và sự cần thiết của việc bồi dưỡng tư duy phản biện.',
        minWordsOrChars: 75,
        unitLabel: 'từ',
        sampleLearnerDraft: 'La inteligencia artificial está cambiando las universidades porque permite personalizar el aprendizaje. Sin embargo, los profesores deben enseñar a los estudiantes a pensar de manera crítica para no depender totalmente de la tecnología.',
        modelHighBandEssay: 'La irrupción de la inteligencia artificial generativa en el ámbito universitario plantea un cambio de paradigma sin precedentes. Si bien estas herramientas optimizan la personalización pedagógica, resulta imperativo que las instituciones académicas refuercen el pensamiento crítico y la ética intelectual, evitando así una dependencia acrítica de los algoritmos.',
        modelTranslationVi: 'Sự bùng nổ của trí tuệ nhân tạo tạo sinh trong môi trường đại học đặt ra một bước chuyển dịch mô hình chưa từng có tiền lệ. Mặc dù những công cụ này tối ưu hóa việc cá nhân hóa sư phạm, các cơ sở học thuật bắt buộc phải củng cố tư duy phản biện và đạo đức tri thức, qua đó tránh sự phụ thuộc thiếu chọn lọc vào các thuật toán.',
        targetPowerVocab: [
          { word: 'un cambio de paradigma', phonetic: '[un CAM-bi-ô đê pa-ra-ĐÍG-ma]', meaningVi: 'Một bước chuyển dịch mô hình' },
          { word: 'sin precedentes', phonetic: '[xin prê-xê-ĐÊN-tệt]', meaningVi: 'Chưa từng có tiền lệ' },
          { word: 'dependencia acrítica', phonetic: '[đê-pen-ĐÊN-xi-a a-CRÍ-ti-ca]', meaningVi: 'Sự phụ thuộc mù quáng / thiếu tư duy phản biện' }
        ],
        inlineUpgrades: [
          {
            originalSnippet: 'La inteligencia artificial está cambiando las universidades',
            upgradedSnippet: 'La irrupción de la IA generativa en el ámbito universitario plantea un cambio de paradigma sin precedentes',
            explanationVi: 'Sử dụng cụm danh từ học thuật C1 "La irrupción... plantea un cambio de paradigma sin precedentes".',
            criterionTag: 'LR'
          }
        ]
      }
    ]
  }
};
