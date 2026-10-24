export type VideoLevelTier = 'basic' | 'intermediate' | 'advanced';

export type AvatarGesture = 'welcoming' | 'explaining' | 'pointing' | 'emphasizing';

export type VoicePersonaId = 'female-warm' | 'male-deep' | 'academic-clear' | 'energetic-native';

export interface AiVirtualInstructor {
  id: string;
  languageId: string;
  name: string;
  title: string;
  gender: 'female' | 'male';
  voicePersona: VoicePersonaId;
  defaultPitch: number;
  defaultRate: number;
  specialty: string;
  avatarStyle: {
    skinTone: string;
    hairColor: string;
    hairStyle: 'long-wave' | 'bob-cut' | 'short-parted' | 'scholar-slick';
    blazerColor: string;
    shirtColor: string;
    tieOrScarfColor: string;
    glasses: boolean;
    studioBackdrop: string;
  };
}

export interface VideoBoardItem {
  term: string;
  phonetic: string;
  meaning: string;
}

export interface AiVideoSegment {
  id: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  chapterTitle: string;
  gesture: AvatarGesture;
  targetScript: string;
  phoneticScript: string;
  vietnameseSub: string;
  boardFormula: string;
  boardExamples: VideoBoardItem[];
  pronunciationTip: string;
}

export interface AiVideoLesson {
  id: string;
  languageId: string;
  level: VideoLevelTier;
  levelBadge: string; // e.g. "Cơ bản • A1–A2", "Trung cấp • B1–B2", "Nâng cao • C1–C2"
  cefrCode: string;
  title: string;
  subtitle: string;
  durationSeconds: number;
  xpReward: number;
  instructorId: string;
  segments: AiVideoSegment[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  shadowing: {
    phrase: string;
    phonetic: string;
    vietnamese: string;
  };
}

export const AI_VIRTUAL_INSTRUCTORS: Record<string, AiVirtualInstructor[]> = {
  english: [
    {
      id: 'en-clara',
      languageId: 'english',
      name: 'Dr. Clara Vance AI',
      title: 'Giảng viên AI Ngữ âm & Học thuật Cambridge',
      gender: 'female',
      voicePersona: 'female-warm',
      defaultPitch: 1.1,
      defaultRate: 0.95,
      specialty: 'Phát âm IPA, Giao tiếp Phản xạ & IELTS Academic C1–C2',
      avatarStyle: {
        skinTone: '#F6D7C3',
        hairColor: '#3B2314',
        hairStyle: 'long-wave',
        blazerColor: '#1E293B',
        shirtColor: '#F8FAFC',
        tieOrScarfColor: '#4F46E5',
        glasses: false,
        studioBackdrop: 'from-slate-900 via-indigo-950 to-slate-900'
      }
    },
    {
      id: 'en-liam',
      languageId: 'english',
      name: 'Prof. Liam Sterling AI',
      title: 'Giảng viên AI Tiếng Anh Thương mại & Hùng biện',
      gender: 'male',
      voicePersona: 'male-deep',
      defaultPitch: 0.88,
      defaultRate: 0.95,
      specialty: 'Thuyết trình Quốc tế, Cú pháp Nâng cao & Đàm phán',
      avatarStyle: {
        skinTone: '#F1C6B3',
        hairColor: '#27272A',
        hairStyle: 'short-parted',
        blazerColor: '#0F172A',
        shirtColor: '#E2E8F0',
        tieOrScarfColor: '#0284C7',
        glasses: true,
        studioBackdrop: 'from-slate-950 via-sky-950 to-slate-900'
      }
    }
  ],
  chinese: [
    {
      id: 'zh-meiling',
      languageId: 'chinese',
      name: 'Lâm Mỹ Linh AI (林美玲)',
      title: 'Giảng viên AI Thanh điệu Bắc Kinh & HSK',
      gender: 'female',
      voicePersona: 'female-warm',
      defaultPitch: 1.12,
      defaultRate: 0.9,
      specialty: 'Chuẩn hóa 4 Thanh điệu, Hán tự Tư duy & HSK 1–6',
      avatarStyle: {
        skinTone: '#F8DEC8',
        hairColor: '#18181B',
        hairStyle: 'bob-cut',
        blazerColor: '#7F1D1D',
        shirtColor: '#FFFBEB',
        tieOrScarfColor: '#F59E0B',
        glasses: false,
        studioBackdrop: 'from-slate-900 via-rose-950 to-slate-900'
      }
    },
    {
      id: 'zh-chenhao',
      languageId: 'chinese',
      name: 'GS. Trần Hạo AI (陈浩)',
      title: 'Giảng viên AI Hán ngữ Thương mại & Thành ngữ',
      gender: 'male',
      voicePersona: 'male-deep',
      defaultPitch: 0.86,
      defaultRate: 0.92,
      specialty: 'Giao thương Trung - Việt, HSKK Cao cấp & Văn phạm Cổ - Kim',
      avatarStyle: {
        skinTone: '#F3D1B8',
        hairColor: '#1C1917',
        hairStyle: 'scholar-slick',
        blazerColor: '#1E293B',
        shirtColor: '#F8FAFC',
        tieOrScarfColor: '#DC2626',
        glasses: true,
        studioBackdrop: 'from-slate-950 via-red-950 to-slate-900'
      }
    }
  ],
  japanese: [
    {
      id: 'ja-haruka',
      languageId: 'japanese',
      name: 'Sato Haruka AI (佐藤 遥)',
      title: 'Giảng viên AI Hội thoại Tokyo & JLPT',
      gender: 'female',
      voicePersona: 'female-warm',
      defaultPitch: 1.15,
      defaultRate: 0.92,
      specialty: 'Ngữ điệu Pitch Accent, Trợ từ & Kính ngữ Keigo N5–N1',
      avatarStyle: {
        skinTone: '#F9E2D2',
        hairColor: '#271C19',
        hairStyle: 'long-wave',
        blazerColor: '#1E1B4B',
        shirtColor: '#FFF1F2',
        tieOrScarfColor: '#EC4899',
        glasses: false,
        studioBackdrop: 'from-slate-900 via-fuchsia-950 to-slate-900'
      }
    },
    {
      id: 'ja-kenji',
      languageId: 'japanese',
      name: 'Takahashi Kenji AI (高橋 健司)',
      title: 'Giảng viên AI Tiếng Nhật Doanh nghiệp & JLPT N1',
      gender: 'male',
      voicePersona: 'male-deep',
      defaultPitch: 0.85,
      defaultRate: 0.92,
      specialty: 'Kính ngữ Doanh nghiệp (Sonkeigo/Kenjougo) & Đọc hiểu N2–N1',
      avatarStyle: {
        skinTone: '#F2CFB6',
        hairColor: '#18181B',
        hairStyle: 'short-parted',
        blazerColor: '#0F172A',
        shirtColor: '#F8FAFC',
        tieOrScarfColor: '#6366F1',
        glasses: true,
        studioBackdrop: 'from-slate-950 via-indigo-950 to-slate-900'
      }
    }
  ],
  korean: [
    {
      id: 'ko-jiyoon',
      languageId: 'korean',
      name: 'Park Ji-yoon AI (박지윤)',
      title: 'Giảng viên AI Phát âm Seoul & TOPIK',
      gender: 'female',
      voicePersona: 'female-warm',
      defaultPitch: 1.12,
      defaultRate: 0.92,
      specialty: 'Quy tắc Biến âm Hangul, Đuôi câu Giao tiếp & TOPIK I–II',
      avatarStyle: {
        skinTone: '#FBE5D6',
        hairColor: '#291D16',
        hairStyle: 'long-wave',
        blazerColor: '#1E3A8A',
        shirtColor: '#FFFFFF',
        tieOrScarfColor: '#38BDF8',
        glasses: false,
        studioBackdrop: 'from-slate-900 via-blue-950 to-slate-900'
      }
    },
    {
      id: 'ko-minjun',
      languageId: 'korean',
      name: 'Kim Min-jun AI (김민준)',
      title: 'Giảng viên AI Hàn ngữ Học thuật & Viết luận TOPIK 54',
      gender: 'male',
      voicePersona: 'male-deep',
      defaultPitch: 0.87,
      defaultRate: 0.94,
      specialty: 'Cấu trúc Biểu hiện Nâng cao & Luyện viết TOPIK II Cấp 5–6',
      avatarStyle: {
        skinTone: '#F3D2BC',
        hairColor: '#18181B',
        hairStyle: 'short-parted',
        blazerColor: '#1E293B',
        shirtColor: '#F1F5F9',
        tieOrScarfColor: '#2563EB',
        glasses: true,
        studioBackdrop: 'from-slate-950 via-sky-950 to-slate-900'
      }
    }
  ],
  french: [
    {
      id: 'fr-camille',
      languageId: 'french',
      name: 'Dr. Camille Laurent AI',
      title: 'Giảng viên AI Ngữ âm Sorbonne & DELF/DALF',
      gender: 'female',
      voicePersona: 'female-warm',
      defaultPitch: 1.1,
      defaultRate: 0.93,
      specialty: 'Nối âm Liaison, Ngữ điệu Paris & Lập luận DELF B2–C1',
      avatarStyle: {
        skinTone: '#F7DAC6',
        hairColor: '#4A2C18',
        hairStyle: 'bob-cut',
        blazerColor: '#1E1B4B',
        shirtColor: '#F8FAFC',
        tieOrScarfColor: '#E11D48',
        glasses: false,
        studioBackdrop: 'from-slate-900 via-indigo-950 to-slate-900'
      }
    },
    {
      id: 'fr-lucas',
      languageId: 'french',
      name: 'Prof. Lucas Moreau AI',
      title: 'Giảng viên AI Văn phạm Pháp & Hùng biện Học thuật',
      gender: 'male',
      voicePersona: 'male-deep',
      defaultPitch: 0.88,
      defaultRate: 0.93,
      specialty: 'Thức giả định Subjonctif & Nghị luận Xã hội DALF C1',
      avatarStyle: {
        skinTone: '#EFC5AF',
        hairColor: '#27272A',
        hairStyle: 'scholar-slick',
        blazerColor: '#0F172A',
        shirtColor: '#F1F5F9',
        tieOrScarfColor: '#3B82F6',
        glasses: true,
        studioBackdrop: 'from-slate-950 via-blue-950 to-slate-900'
      }
    }
  ],
  german: [
    {
      id: 'de-hannah',
      languageId: 'german',
      name: 'Dr. Hannah Weber AI',
      title: 'Giảng viên AI Ngữ pháp Goethe & Giao tiếp chuẩn Đức',
      gender: 'female',
      voicePersona: 'female-warm',
      defaultPitch: 1.08,
      defaultRate: 0.92,
      specialty: '4 Cách (Kasus), Trật tự từ Nebensatz & Goethe A1–C1',
      avatarStyle: {
        skinTone: '#F8DEC9',
        hairColor: '#6B4423',
        hairStyle: 'long-wave',
        blazerColor: '#1C1917',
        shirtColor: '#FEF3C7',
        tieOrScarfColor: '#D97706',
        glasses: false,
        studioBackdrop: 'from-slate-900 via-amber-950 to-slate-900'
      }
    },
    {
      id: 'de-lukas',
      languageId: 'german',
      name: 'Prof. Lukas Meyer AI',
      title: 'Giảng viên AI Tiếng Đức Khoa học & Kỹ thuật',
      gender: 'male',
      voicePersona: 'male-deep',
      defaultPitch: 0.86,
      defaultRate: 0.92,
      specialty: 'Cấu trúc Học thuật TestDaF & Giao tiếp Chuyên gia B2–C1',
      avatarStyle: {
        skinTone: '#F0C7B0',
        hairColor: '#262626',
        hairStyle: 'short-parted',
        blazerColor: '#1E293B',
        shirtColor: '#F8FAFC',
        tieOrScarfColor: '#F59E0B',
        glasses: true,
        studioBackdrop: 'from-slate-950 via-stone-900 to-slate-900'
      }
    }
  ],
  spanish: [
    {
      id: 'es-sofia',
      languageId: 'spanish',
      name: 'Dra. Sofía Morales AI',
      title: 'Giảng viên AI Phản xạ Giao tiếp Madrid & DELE',
      gender: 'female',
      voicePersona: 'female-warm',
      defaultPitch: 1.12,
      defaultRate: 0.95,
      specialty: 'Phân biệt Ser/Estar, Chia động từ Phản xạ & DELE A1–C1',
      avatarStyle: {
        skinTone: '#F3CCA8',
        hairColor: '#2B1B12',
        hairStyle: 'long-wave',
        blazerColor: '#7C2D12',
        shirtColor: '#FFF7ED',
        tieOrScarfColor: '#EA580C',
        glasses: false,
        studioBackdrop: 'from-slate-900 via-orange-950 to-slate-900'
      }
    },
    {
      id: 'es-mateo',
      languageId: 'spanish',
      name: 'Prof. Mateo Silva AI',
      title: 'Giảng viên AI Tiếng Tây Ban Nha Thương mại & Học thuật',
      gender: 'male',
      voicePersona: 'male-deep',
      defaultPitch: 0.88,
      defaultRate: 0.95,
      specialty: 'Thức giả định Subjuntivo & Thuyết trình Quốc tế DELE B2–C1',
      avatarStyle: {
        skinTone: '#E8BD98',
        hairColor: '#1C1917',
        hairStyle: 'short-parted',
        blazerColor: '#1E293B',
        shirtColor: '#F8FAFC',
        tieOrScarfColor: '#F97316',
        glasses: true,
        studioBackdrop: 'from-slate-950 via-amber-950 to-slate-900'
      }
    }
  ]
};

export const AI_VIDEO_LESSONS: AiVideoLesson[] = [
  // ==================== 1. ENGLISH (Cơ bản -> Trung cấp -> Nâng cao) ====================
  {
    id: 'vid-en-basic-1',
    languageId: 'english',
    level: 'basic',
    levelBadge: 'Cơ bản • A1–A2',
    cefrCode: 'A1–A2',
    title: 'Bài 1: Ngữ điệu Giao tiếp Tự nhiên & Nối âm Chuẩn Bản Xứ',
    subtitle: 'Làm chủ nhịp điệu câu (Sentence Stress), nối âm (Linking Sounds) và giới thiệu bản thân ấn tượng.',
    durationSeconds: 48,
    xpReward: 40,
    instructorId: 'en-clara',
    segments: [
      {
        id: 'en-b1-s1',
        startTime: 0,
        endTime: 12,
        chapterTitle: '1. Chào hỏi & Nhịp điệu tự nhiên',
        gesture: 'welcoming',
        targetScript: 'Hello everyone! Welcome to our interactive AI studio. Today, we will master natural English rhythm.',
        phoneticScript: '[hơ-LÔU ÉV-ri-goăn | WÉL-kơm tu au-ơr in-tơ-RẮK-tiv STIU-đi-ôu]',
        vietnameseSub: 'Xin chào mọi người! Chào mừng đến với trường quay AI tương tác. Hôm nay chúng ta sẽ làm chủ nhịp điệu tiếng Anh tự nhiên.',
        boardFormula: 'Content Words (Từ mang nghĩa) = Nhấn mạnh • Function Words = Lướt nhẹ',
        boardExamples: [
          { term: 'Interactive studio', phonetic: '[in-tơ-RẮK-tiv STIU-đi-ôu]', meaning: 'Trường quay tương tác' },
          { term: 'Natural rhythm', phonetic: '[NÁT-chơ-rồ RÍ-đờm]', meaning: 'Nhịp điệu tự nhiên' }
        ],
        pronunciationTip: 'Hạ nhẹ giọng ở cuối câu trần thuật và lướt âm "to our" thành [tu-au-ơr].'
      },
      {
        id: 'en-b1-s2',
        startTime: 12,
        endTime: 24,
        chapterTitle: '2. Kỹ thuật Nối phụ âm sang nguyên âm',
        gesture: 'pointing',
        targetScript: 'When a word ends in a consonant and the next begins with a vowel, link them smoothly: Pick it up!',
        phoneticScript: 'Pick it up → [pík - kịt - tắp]',
        vietnameseSub: 'Khi một từ kết thúc bằng phụ âm và từ kế tiếp bắt đầu bằng nguyên âm, hãy nối mượt mà: Pick it up!',
        boardFormula: 'Consonant + Vowel → Nối âm liền mạch (C + V Linking)',
        boardExamples: [
          { term: 'Pick it up', phonetic: '[pík-kịt-tắp]', meaning: 'Nhặt nó lên / Tiếp tục' },
          { term: 'Check it out', phonetic: '[chék-kịt-đao]', meaning: 'Kiểm tra / Khám phá ngay' }
        ],
        pronunciationTip: 'Không ngắt hơi giữa "pick", "it" và "up". Đọc liền thành 3 âm tiết mượt [pík-kịt-tắp].'
      },
      {
        id: 'en-b1-s3',
        startTime: 24,
        endTime: 36,
        chapterTitle: '3. Mẫu câu Giới thiệu Công việc & Mục tiêu',
        gesture: 'explaining',
        targetScript: 'I am currently working on improving my communication skills for international projects.',
        phoneticScript: '[ai am KƠ-rần-li WỚK-inh on im-PRU-vinh mai kơ-miu-ni-KÂY-shần skilz]',
        vietnameseSub: 'Hiện tại tôi đang tập trung cải thiện kỹ năng giao tiếp của mình cho các dự án quốc tế.',
        boardFormula: 'I am currently working on + V-ing / Noun Phrase',
        boardExamples: [
          { term: 'Currently working on', phonetic: '[KƠ-rần-li WỚK-inh on]', meaning: 'Hiện đang thực hiện' },
          { term: 'Communication skills', phonetic: '[kơ-miu-ni-KÂY-shần skilz]', meaning: 'Kỹ năng giao tiếp' }
        ],
        pronunciationTip: 'Nhấn trọng âm chính vào âm tiết thứ 4 của từ "commu-ni-CA-tion".'
      },
      {
        id: 'en-b1-s4',
        startTime: 36,
        endTime: 48,
        chapterTitle: '4. Tổng kết & Thực hành Nhại giọng',
        gesture: 'emphasizing',
        targetScript: 'Practice speaking out loud with me every day, and your confidence will grow rapidly!',
        phoneticScript: '[PRẮK-tịs SPÍ-kinh ao lao wít mi ÉV-ri đây | and yo KÓN-fi-đần-s wil grâu RÁP-pịt-li]',
        vietnameseSub: 'Hãy luyện nói to cùng tôi mỗi ngày, và sự tự tin của bạn sẽ tăng lên nhanh chóng!',
        boardFormula: 'Imperative Verb + and + Clause (will + V)',
        boardExamples: [
          { term: 'Speak out loud', phonetic: '[spík ao lao-đ]', meaning: 'Nói to thành tiếng' },
          { term: 'Grow rapidly', phonetic: '[grâu RÁP-pịt-li]', meaning: 'Phát triển nhanh chóng' }
        ],
        pronunciationTip: 'Âm "th" trong "with" đặt nhẹ đầu lưỡi giữa hai hàm răng và rung dây thanh.'
      }
    ],
    quiz: {
      question: 'Theo Giảng viên AI Dr. Clara Vance, cụm "Pick it up" khi nối âm tự nhiên chuẩn bản xứ sẽ phát âm như thế nào?',
      options: [
        '[pík-kịt-tắp] — Nối phụ âm cuối sang nguyên âm đầu của từ tiếp theo',
        'Đọc tách rời từng từ có khoảng nghỉ dài giữa mỗi từ',
        'Bỏ hoàn toàn âm /k/ và âm /t/ ở cuối từ',
        'Nhấn mạnh vào từ "it" và hạ giọng ở từ "up"'
      ],
      correctIndex: 0,
      explanation: 'Quy tắc C+V Linking nối phụ âm /k/ sang /i/ và /t/ sang /u/, tạo thành chuỗi âm liền mạch [pík-kịt-tắp].'
    },
    shadowing: {
      phrase: 'I am currently working on improving my communication skills.',
      phonetic: '[ai am KƠ-rần-li WỚK-inh on im-PRU-vinh mai kơ-miu-ni-KÂY-shần skilz]',
      vietnamese: 'Hiện tại tôi đang tập trung cải thiện kỹ năng giao tiếp của mình.'
    }
  },
  {
    id: 'vid-en-inter-1',
    languageId: 'english',
    level: 'intermediate',
    levelBadge: 'Trung cấp • B1–B2',
    cefrCode: 'B1–B2',
    title: 'Bài 2: Phản xạ Thuyết trình Công sở & Liên từ Chuyển ý Mượt mà',
    subtitle: 'Cách mở đầu cuộc họp, đưa ra lập luận đa chiều và xử lý câu hỏi chuyên nghiệp.',
    durationSeconds: 48,
    xpReward: 55,
    instructorId: 'en-liam',
    segments: [
      {
        id: 'en-i1-s1',
        startTime: 0,
        endTime: 12,
        chapterTitle: '1. Mở đầu Cuộc họp & Định hướng Chủ đề',
        gesture: 'welcoming',
        targetScript: 'Let us get started by looking at the key performance indicators from the previous quarter.',
        phoneticScript: '[lét-s gét STÁR-tịt bai LÚK-inh at đơ ki pơ-FÓR-mần-s IN-đi-kây-tơz]',
        vietnameseSub: 'Hãy cùng bắt đầu bằng việc điểm qua các chỉ số hiệu suất cốt lõi từ quý trước.',
        boardFormula: 'Let’s get started by + V-ing (Mở đầu thuyết trình)',
        boardExamples: [
          { term: 'Key performance indicators', phonetic: '[ki pơ-FÓR-mần-s IN-đi-kây-tơz]', meaning: 'Chỉ số đánh giá hiệu quả (KPI)' },
          { term: 'Previous quarter', phonetic: '[PRI-vi-ợt-s KWÓ-tơr]', meaning: 'Quý trước' }
        ],
        pronunciationTip: 'Giữ nhịp đĩnh đạc, nhấn rõ 3 từ khóa: "started", "key", và "previous".'
      },
      {
        id: 'en-i1-s2',
        startTime: 12,
        endTime: 24,
        chapterTitle: '2. Đưa ra Quan điểm Đối lập Lịch sự',
        gesture: 'explaining',
        targetScript: 'While I see your point regarding the budget, we also need to consider long-term scalability.',
        phoneticScript: '[wai-l ai si yo poin-t ri-GÁR-đinh đơ BẮT-jịt | wi ÓL-sâu ni-đ tu kần-SI-đơr...]',
        vietnameseSub: 'Mặc dù tôi hiểu quan điểm của bạn về ngân sách, chúng ta cũng cần cân nhắc khả năng mở rộng dài hạn.',
        boardFormula: 'While I see your point regarding [X], we also need to consider [Y]',
        boardExamples: [
          { term: 'See your point', phonetic: '[si yo poin-t]', meaning: 'Hiểu ý kiến của bạn' },
          { term: 'Long-term scalability', phonetic: '[long-tơm skây-lơ-BI-li-ti]', meaning: 'Khả năng mở rộng dài hạn' }
        ],
        pronunciationTip: 'Lên giọng nhẹ ở cuối mệnh đề "budget," để báo hiệu ý chính nằm ở vế sau.'
      },
      {
        id: 'en-i1-s3',
        startTime: 24,
        endTime: 36,
        chapterTitle: '3. Nhấn mạnh Giải pháp Chiến lược',
        gesture: 'pointing',
        targetScript: 'What matters most is delivering measurable value to our clients on schedule.',
        phoneticScript: '[wót MÁT-tơz mâu-st iz đi-LI-vơ-rinh MÉ-jơ-rơ-bồ VÁ-liu tu au-ơr KLAI-ần-ts]',
        vietnameseSub: 'Điều quan trọng nhất là mang lại giá trị đo lường được cho khách hàng đúng tiến độ.',
        boardFormula: 'What matters most is + V-ing / Noun Phrase (Cấu trúc chẻ nhấn mạnh)',
        boardExamples: [
          { term: 'Measurable value', phonetic: '[MÉ-jơ-rơ-bồ VÁ-liu]', meaning: 'Giá trị đo lường được' },
          { term: 'On schedule', phonetic: '[on SKÉ-ju-ồ]', meaning: 'Đúng tiến độ' }
        ],
        pronunciationTip: 'Âm "s" trong "measurable" phát âm mềm như âm "gi/j" trong từ "vision".'
      },
      {
        id: 'en-i1-s4',
        startTime: 36,
        endTime: 48,
        chapterTitle: '4. Chốt lại Kế hoạch Hành động',
        gesture: 'emphasizing',
        targetScript: 'To wrap up, let us align on the next steps and assign clear responsibilities.',
        phoneticScript: '[tu ráp-ắp | lét-s ơ-LAI-n on đơ nékst stép-s and ơ-SAI-n kli-ơr ri-spon-sơ-BI-li-tiz]',
        vietnameseSub: 'Để tóm lại, hãy thống nhất các bước tiếp theo và phân công trách nhiệm rõ ràng.',
        boardFormula: 'To wrap up, let’s align on + [Noun]',
        boardExamples: [
          { term: 'To wrap up', phonetic: '[tu ráp-ắp]', meaning: 'Để tổng kết lại' },
          { term: 'Align on next steps', phonetic: '[ơ-LAI-n on nékst stép-s]', meaning: 'Thống nhất bước tiếp theo' }
        ],
        pronunciationTip: 'Nối âm "wrap up" thành [ráp-ắp] và "align on" thành [ơ-lai-non].'
      }
    ],
    quiz: {
      question: 'Cấu trúc nào giúp bạn phản biện lịch sự và chuyên nghiệp trong cuộc họp bằng tiếng Anh?',
      options: [
        'While I see your point regarding X, we also need to consider Y.',
        'You are completely wrong about X, do Y instead.',
        'No, budget is not important at all.',
        'I do not care about your point.'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc "While I see your point regarding X, we also need to consider Y" vừa ghi nhận ý kiến đối phương vừa đưa ra góc nhìn chiến lược.'
    },
    shadowing: {
      phrase: 'While I see your point regarding the budget, we also need to consider long-term scalability.',
      phonetic: '[wai-l ai si yo poin-t ri-GÁR-đinh đơ BẮT-jịt | wi ÓL-sâu ni-đ tu kần-SI-đơr long-tơm skây-lơ-BI-li-ti]',
      vietnamese: 'Mặc dù tôi hiểu quan điểm của bạn về ngân sách, chúng ta cũng cần cân nhắc khả năng mở rộng dài hạn.'
    }
  },
  {
    id: 'vid-en-adv-1',
    languageId: 'english',
    level: 'advanced',
    levelBadge: 'Nâng cao • C1–C2 (IELTS 8.0+)',
    cefrCode: 'C1–C2',
    title: 'Bài 3: Đảo ngữ Học thuật (Inversion) & Tư duy Phản biện C1–C2',
    subtitle: 'Bí quyết nâng điểm Grammatical Range & Lexical Resource lên Band 8.0+ trong IELTS Speaking & Writing.',
    durationSeconds: 48,
    xpReward: 75,
    instructorId: 'en-clara',
    segments: [
      {
        id: 'en-a1-s1',
        startTime: 0,
        endTime: 12,
        chapterTitle: '1. Đảo ngữ Phủ định tạo Sức nặng Học thuật',
        gesture: 'pointing',
        targetScript: 'Not only does artificial intelligence automate routine tasks, but it also reshapes cognitive workflows.',
        phoneticScript: '[nót ÔUN-li đơz ar-ti-FI-shồ in-TÉ-li-jần-s Ó-tơ-mây-t ru-TIN tásk-s...]',
        vietnameseSub: 'Trí tuệ nhân tạo không chỉ tự động hóa các tác vụ lặp lại mà còn định hình lại quy trình tư duy.',
        boardFormula: 'Not only + Auxiliary + S + V, but S + also + V',
        boardExamples: [
          { term: 'Automate routine tasks', phonetic: '[Ó-tơ-mây-t ru-TIN tásk-s]', meaning: 'Tự động hóa tác vụ lặp lại' },
          { term: 'Cognitive workflows', phonetic: '[KÓG-ni-tiv WỚK-flâu-z]', meaning: 'Quy trình xử lý nhận thức' }
        ],
        pronunciationTip: 'Nhấn mạnh vào trợ động từ "does" ngay sau "Not only" để làm nổi bật cấu trúc đảo ngữ.'
      },
      {
        id: 'en-a1-s2',
        startTime: 12,
        endTime: 24,
        chapterTitle: '2. Đảo ngữ Điều kiện loại 3 (Were / Had / Should)',
        gesture: 'explaining',
        targetScript: 'Had policymakers intervened earlier, the environmental repercussions would have been mitigated.',
        phoneticScript: '[hát PÓ-li-si-mây-kơz in-tơ-VIN-đ Ớ-li-ơr | đơ in-vai-rần-MÉN-tồ ri-pơ-KỚ-shần-z...]',
        vietnameseSub: 'Giá như các nhà hoạch định chính sách can thiệp sớm hơn, những hệ lụy môi trường đã được giảm thiểu.',
        boardFormula: 'Had + S + V3/ed, S + would have + V3/ed (Thay cho If + S + had V3)',
        boardExamples: [
          { term: 'Repercussions', phonetic: '[ri-pơ-KỚ-shần-z]', meaning: 'Hệ lụy / Hậu quả sâu rộng' },
          { term: 'Be mitigated', phonetic: '[bi MÍ-ti-gây-tịt]', meaning: 'Được giảm nhẹ / làm dịu' }
        ],
        pronunciationTip: 'Từ "repercussions" nhấn âm tiết thứ 3 ([ri-pơ-KỚ-shần-z]).'
      },
      {
        id: 'en-a1-s3',
        startTime: 24,
        endTime: 36,
        chapterTitle: '3. Danh từ hóa (Nominalization) trong Văn phong C2',
        gesture: 'pointing',
        targetScript: 'The rapid proliferation of renewable energy infrastructure signifies a paradigm shift.',
        phoneticScript: '[đơ RÁP-pịt prơ-li-fơ-RÂY-shần of ri-NIU-ơ-bồ É-nơ-ji IN-frơ-strắc-chơr SÍG-ni-fai-z ơ PA-rơ-đaim shíp-t]',
        vietnameseSub: 'Sự nhân rộng nhanh chóng của cơ sở hạ tầng năng lượng tái tạo đánh dấu một bước chuyển dịch mô hình.',
        boardFormula: 'The + Adj + Nominalized Noun + of [X] + signifies + [Y]',
        boardExamples: [
          { term: 'Rapid proliferation', phonetic: '[RÁP-pịt prơ-li-fơ-RÂY-shần]', meaning: 'Sự gia tăng/phổ biến nhanh chóng' },
          { term: 'Paradigm shift', phonetic: '[PA-rơ-đaim shíp-t]', meaning: 'Sự chuyển dịch hệ quy chiếu' }
        ],
        pronunciationTip: 'Từ "paradigm" có âm "g" câm, phát âm chuẩn là [PA-rơ-đaim].'
      },
      {
        id: 'en-a1-s4',
        startTime: 36,
        endTime: 48,
        chapterTitle: '4. Tổng kết Chiến thuật Band 8.5+',
        gesture: 'emphasizing',
        targetScript: 'Seldom do we witness such a profound transformation without rigorous institutional reform.',
        phoneticScript: '[SÉL-đờm đu wi WÍT-nợt-s sắt-ch ơ prơ-FAO-n tran-sfơ-MÂY-shần...]',
        vietnameseSub: 'Hiếm khi chúng ta chứng kiến một sự chuyển đổi sâu sắc như vậy mà không có cải cách thể chế nghiêm ngặt.',
        boardFormula: 'Seldom / Rarely + do/does/did + S + V_inf',
        boardExamples: [
          { term: 'Profound transformation', phonetic: '[prơ-FAO-n tran-sfơ-MÂY-shần]', meaning: 'Sự chuyển đổi sâu sắc' },
          { term: 'Institutional reform', phonetic: '[in-sti-TIU-shơ-nồ ri-FÓM]', meaning: 'Cải cách thể chế' }
        ],
        pronunciationTip: 'Khi "Seldom" đứng đầu câu, bắt buộc mượn trợ động từ "do/does/did" đứng trước chủ ngữ.'
      }
    ],
    quiz: {
      question: 'Trong câu "Had policymakers intervened earlier, the repercussions would have been mitigated", từ "Had" ở đầu câu đóng vai trò gì?',
      options: [
        'Đảo ngữ câu điều kiện loại 3 (thay thế cho "If policymakers had intervened...")',
        'Câu hỏi nghi vấn ở thì quá khứ đơn',
        'Cấu trúc sai ngữ pháp do thiếu từ "If"',
        'Mệnh đề quan hệ rút gọn chỉ nguyên nhân'
      ],
      correctIndex: 0,
      explanation: 'Đảo ngữ loại 3 đưa "Had" lên trước chủ ngữ để lược bỏ "If", giúp câu văn trang trọng và đạt điểm tối đa tiêu chí Grammatical Range ở mức C1–C2.'
    },
    shadowing: {
      phrase: 'Not only does artificial intelligence automate routine tasks, but it also reshapes cognitive workflows.',
      phonetic: '[nót ÔUN-li đơz ar-ti-FI-shồ in-TÉ-li-jần-s Ó-tơ-mây-t ru-TIN tásk-s]',
      vietnamese: 'Trí tuệ nhân tạo không chỉ tự động hóa các tác vụ lặp lại mà còn định hình lại quy trình tư duy.'
    }
  },

  // ==================== 2. CHINESE (Cơ bản -> Trung cấp -> Nâng cao) ====================
  {
    id: 'vid-zh-basic-1',
    languageId: 'chinese',
    level: 'basic',
    levelBadge: 'Cơ bản • HSK 1–2',
    cefrCode: 'HSK 1–2',
    title: 'Bài 1: Bí quyết Phát âm 4 Thanh điệu & Biến điệu Thanh 3 Chuẩn Bắc Kinh',
    subtitle: 'Làm chủ độ cao giọng (55, 35, 214, 51) và giao tiếp chào hỏi tự nhiên cùng Giảng viên AI.',
    durationSeconds: 45,
    xpReward: 40,
    instructorId: 'zh-meiling',
    segments: [
      {
        id: 'zh-b1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Chào hỏi & Quy tắc Biến điệu hai Thanh 3',
        gesture: 'welcoming',
        targetScript: '大家好！很高兴认识你们。今天我们一起学习标准普通话的声调。',
        phoneticScript: 'Dàjiā hǎo! Hěn gāoxìng rènshi nǐmen. Jīntiān wǒmen yìqǐ xuéxí biāozhǔn Pǔtōnghuà de shēngdiào.',
        vietnameseSub: 'Xin chào mọi người! Rất vui được làm quen với các bạn. Hôm nay chúng ta cùng học thanh điệu tiếng Phổ thông chuẩn.',
        boardFormula: 'Thanh 3 + Thanh 3 → Thanh 2 + Thanh 3 (你好 nǐ hǎo → ní hǎo)',
        boardExamples: [
          { term: '很高兴 (hěn gāoxìng)', phonetic: 'hěn gāo xìng', meaning: 'Rất vui mừng' },
          { term: '普通话 (Pǔtōnghuà)', phonetic: 'pǔ tōng huà', meaning: 'Tiếng Phổ thông chuẩn' }
        ],
        pronunciationTip: 'Khi hai chữ thanh 3 đi liền nhau như "你好 (nǐ hǎo)", chữ đầu tiên đọc nâng giọng thành thanh 2 (ní hǎo).'
      },
      {
        id: 'zh-b1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Hỏi thăm & Trả lời Lịch sự hàng ngày',
        gesture: 'explaining',
        targetScript: '请问，你平时喜欢怎么学习汉语？我每天都看人工智能教学视频。',
        phoneticScript: 'Qǐngwèn, nǐ píngshí xǐhuan zěnme xuéxí Hànyǔ? Wǒ měitiān dōu kàn réngōng zhìnéng jiàoxué shìpín.',
        vietnameseSub: 'Xin hỏi, bình thường bạn thích học tiếng Trung như thế nào? Mỗi ngày tôi đều xem video giảng dạy AI.',
        boardFormula: 'Chủ ngữ + 每天都 (měitiān dōu) + Động từ + Tân ngữ',
        boardExamples: [
          { term: '平时 (píngshí)', phonetic: 'píng shí', meaning: 'Bình thường / Ngày thường' },
          { term: '教学视频 (jiàoxué shìpín)', phonetic: 'jiào xué shì pín', meaning: 'Video giảng dạy' }
        ],
        pronunciationTip: 'Âm "q" trong "请问 (qǐngwèn)" bật hơi mạnh từ mặt lưỡi, không đọc giống âm "ch" tiếng Việt.'
      },
      {
        id: 'zh-b1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Luyện nói & Khích lệ',
        gesture: 'emphasizing',
        targetScript: '只要每天坚持练习十分钟，你的发音一定会越来越标准！',
        phoneticScript: 'Zhǐyào měitiān jiānchí liànxí shí fēnzhōng, nǐ de fāyīn yídìng huì yuèláiyuè biāozhǔn!',
        vietnameseSub: 'Chỉ cần mỗi ngày kiên trì luyện tập 10 phút, phát âm của bạn nhất định sẽ ngày càng chuẩn!',
        boardFormula: '越来越 (yuèláiyuè) + Tính từ = Ngày càng...',
        boardExamples: [
          { term: '坚持练习 (jiānchí liànxí)', phonetic: 'jiān chí liàn xí', meaning: 'Kiên trì luyện tập' },
          { term: '越来越标准 (yuèláiyuè biāozhǔn)', phonetic: 'yuè lái yuè biāo zhǔn', meaning: 'Ngày càng chuẩn xác' }
        ],
        pronunciationTip: 'Chữ "一 (yī)" khi đứng trước thanh 4 như "一定 (yídìng)" sẽ biến điệu thành thanh 2 (yí dìng).'
      }
    ],
    quiz: {
      question: 'Trong tiếng Trung, khi hai âm tiết mang Thanh 3 đi liền nhau (ví dụ: 你好 nǐ hǎo), quy tắc biến điệu chuẩn là gì?',
      options: [
        'Âm tiết thứ nhất đọc thành Thanh 2 (ní hǎo)',
        'Cả hai âm tiết đều đọc thành Thanh 4',
        'Âm tiết thứ hai bị lược bỏ hoàn toàn thanh điệu',
        'Giữ nguyên độ trầm của cả hai Thanh 3 mà không đổi'
      ],
      correctIndex: 0,
      explanation: 'Khi hai Thanh 3 (214 + 214) đứng cạnh nhau, âm tiết đầu tự động biến thành Thanh 2 (35) để luồng hơi tự nhiên và không bị nghẹn giọng.'
    },
    shadowing: {
      phrase: '只要每天坚持练习，你的发音一定会越来越标准！',
      phonetic: 'Zhǐyào měitiān jiānchí liànxí, nǐ de fāyīn yídìng huì yuèláiyuè biāozhǔn!',
      vietnamese: 'Chỉ cần mỗi ngày kiên trì luyện tập, phát âm của bạn nhất định sẽ ngày càng chuẩn!'
    }
  },
  {
    id: 'vid-zh-inter-1',
    languageId: 'chinese',
    level: 'intermediate',
    levelBadge: 'Trung cấp • HSK 3–4',
    cefrCode: 'HSK 3–4',
    title: 'Bài 2: Câu chữ 把 (Bǎ) & Cấu trúc Nhân quả Chuyển折 trong Giao tiếp',
    subtitle: 'Cách diễn đạt sự tác động làm thay đổi trạng thái sự vật và liên kết câu mạch lạc ở trình độ HSK 3–4.',
    durationSeconds: 45,
    xpReward: 55,
    instructorId: 'zh-chenhao',
    segments: [
      {
        id: 'zh-i1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Bản chất Câu chữ 把 (Bǎ)',
        gesture: 'pointing',
        targetScript: '请把这份重要的合同翻译成越南语，然后发给客户。',
        phoneticScript: 'Qǐng bǎ zhè fèn zhòngyào de hétong fānyì chéng Yuènányǔ, ránhòu fā gěi kèhù.',
        vietnameseSub: 'Xin hãy dịch bản hợp đồng quan trọng này sang tiếng Việt, sau đó gửi cho khách hàng.',
        boardFormula: 'S + 把 (bǎ) + Tân ngữ xác định + Động từ + Bổ ngữ kết quả (成/好/完)',
        boardExamples: [
          { term: '一份合同 (yí fèn hétong)', phonetic: 'yí fèn hé tong', meaning: 'Một bản hợp đồng' },
          { term: '翻译成 (fānyì chéng)', phonetic: 'fān yì chéng', meaning: 'Dịch sang / chuyển thành' }
        ],
        pronunciationTip: 'Trong câu chữ 把, động từ bắt buộc phải có thành phần bổ ngữ đi kèm phía sau (như 成, 完, 好).'
      },
      {
        id: 'zh-i1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Cấu trúc Nhượng bộ 尽管...但是...',
        gesture: 'explaining',
        targetScript: '尽管市场竞争非常激烈，但是我们的团队依然取得了优秀的成绩。',
        phoneticScript: 'Jǐnguǎn shìchǎng jìngzhēng fēicháng jīliè, dànshì wǒmen de tuánduì yīrán qǔdé le yōuxiù de chéngjì.',
        vietnameseSub: 'Mặc dù cạnh tranh thị trường vô cùng khốc liệt, nhưng đội ngũ của chúng tôi vẫn đạt được thành tích xuất sắc.',
        boardFormula: '尽管 (Jǐnguǎn)...，但是 / 却 (dànshì / què)...',
        boardExamples: [
          { term: '竞争激烈 (jìngzhēng jīliè)', phonetic: 'jìng zhēng jī liè', meaning: 'Cạnh tranh khốc liệt' },
          { term: '取得成绩 (qǔdé chéngjì)', phonetic: 'qǔ dé chéng jì', meaning: 'Đạt được thành tích' }
        ],
        pronunciationTip: 'Nhấn giọng rõ ở "尽管 (jǐnguǎn)" và "依然 (yīrán - vẫn như cũ)" để làm nổi bật sự tương phản.'
      },
      {
        id: 'zh-i1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Cấu trúc Điều kiện 无论...都...',
        gesture: 'emphasizing',
        targetScript: '无论遇到什么困难，我们都要保持积极的态度。',
        phoneticScript: 'Wúlùn yùdào shénme kùnnan, wǒmen dōu yào bǎochí jījí de tàidù.',
        vietnameseSub: 'Bất luận gặp phải khó khăn gì, chúng ta đều phải giữ vững thái độ tích cực.',
        boardFormula: '无论 (Wúlùn) + Từ nghi vấn / Chọn lựa，S + 都 (dōu) + V',
        boardExamples: [
          { term: '遇到困难 (yùdào kùnnan)', phonetic: 'yù dào kùn nan', meaning: 'Gặp phải khó khăn' },
          { term: '积极的态度 (jījí de tàidù)', phonetic: 'jī jí de tài dù', meaning: 'Thái độ tích cực' }
        ],
        pronunciationTip: 'Từ "困难 (kùnnan)" có âm tiết thứ hai đọc thanh nhẹ (khinh thanh).'
      }
    ],
    quiz: {
      question: 'Khi sử dụng câu chữ 把 (Bǎ) trong tiếng Trung HSK 3–4, yêu cầu ngữ pháp bắt buộc đối với động từ chính là gì?',
      options: [
        'Động từ phải mang theo bổ ngữ kết quả, bổ ngữ xu hướng hoặc thành phần khác phía sau',
        'Động từ phải đứng ở đầu câu trước chủ ngữ',
        'Không được phép có tân ngữ đi sau chữ 把',
        'Luôn phải đặt chữ 了 ở đầu câu'
      ],
      correctIndex: 0,
      explanation: 'Câu chữ 把 nhấn mạnh kết quả xử lý đối tượng, nên sau động từ không thể đứng trơ trọi mà cần có bổ ngữ (như 翻译成..., 做完...).'
    },
    shadowing: {
      phrase: '请把这份重要的合同翻译成越南语。',
      phonetic: 'Qǐng bǎ zhè fèn zhòngyào de hétong fānyì chéng Yuènányǔ.',
      vietnamese: 'Xin hãy dịch bản hợp đồng quan trọng này sang tiếng Việt.'
    }
  },
  {
    id: 'vid-zh-adv-1',
    languageId: 'chinese',
    level: 'advanced',
    levelBadge: 'Nâng cao • HSK 5–6',
    cefrCode: 'HSK 5–6',
    title: 'Bài 3: Ngôn ngữ Học thuật HSK 5–6, Thành ngữ Bốn chữ & Diễn thuyết Thương mại',
    subtitle: 'Sử dụng cấu trúc văn viết trang trọng (书面语) và thành ngữ (成语) để thuyết phục đối tác.',
    durationSeconds: 45,
    xpReward: 75,
    instructorId: 'zh-meiling',
    segments: [
      {
        id: 'zh-a1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Cấu trúc Học thuật 之所以...是因为...',
        gesture: 'pointing',
        targetScript: '这项技术之所以备受关注，是因为它彻底改变了传统生产模式。',
        phoneticScript: 'Zhè xiàng jìshù zhīsuǒyǐ bèishòu guānzhù, shì yīnwèi tā chèdǐ gǎibiàn le chuántǒng shēngchǎn móshì.',
        vietnameseSub: 'Sở dĩ công nghệ này nhận được sự quan tâm đặc biệt là bởi vì nó đã thay đổi triệt để mô hình sản xuất truyền thống.',
        boardFormula: 'Chủ ngữ + 之所以 (zhīsuǒyǐ) + [Kết quả]，是因为 (shì yīnwèi) + [Nguyên nhân]',
        boardExamples: [
          { term: '备受关注 (bèishòu guānzhù)', phonetic: 'bèi shòu guān zhù', meaning: 'Nhận được nhiều sự quan tâm' },
          { term: '生产模式 (shēngchǎn móshì)', phonetic: 'shēng chǎn mó shì', meaning: 'Mô hình sản xuất' }
        ],
        pronunciationTip: 'Ngắt nhịp nhẹ sau "关注 (guānzhù)" để tạo điểm nhấn lập luận cho vế "是因为".'
      },
      {
        id: 'zh-a1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Ứng dụng Thành ngữ 4 chữ (成语) trong Kinh doanh',
        gesture: 'explaining',
        targetScript: '在全球化背景下，科技创新与可持续发展息息相关、密不可分。',
        phoneticScript: 'Zài quánqiúhuà bèijǐng xià, kējì chuàngxīn yǔ kě chíxù fāzhǎn xīxī-xiāngguān, mìbùkěfēn.',
        vietnameseSub: 'Trong bối cảnh toàn cầu hóa, đổi mới công nghệ và phát triển bền vững gắn bó mật thiết, không thể tách rời.',
        boardFormula: '[A] 与 [B] + 息息相关 (xīxī-xiāngguān) / 密不可分 (mìbùkěfēn)',
        boardExamples: [
          { term: '息息相关', phonetic: 'xī xī xiāng guān', meaning: 'Gắn bó mật thiết như hơi thở' },
          { term: '可持续发展', phonetic: 'kě chí xù fā zhǎn', meaning: 'Phát triển bền vững' }
        ],
        pronunciationTip: 'Khi đọc thành ngữ 4 chữ, giữ nhịp 2-2 đều đặn và rõ từng thanh điệu.'
      },
      {
        id: 'zh-a1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Tổng kết Diễn văn Cấp cao HSK 6',
        gesture: 'emphasizing',
        targetScript: '综上所述，唯有不断突破自我，方能在时代的浪潮中立于不败之地。',
        phoneticScript: 'Zōngshù suǒshù, wéiyǒu búduàn tūpò zìwǒ, fāng néng zài shídài de làngcháo zhōng lì yú búbài zhī dì.',
        vietnameseSub: 'Tóm lại những điều trên, chỉ có không ngừng bứt phá bản thân mới có thể đứng vững ở vị thế bất bại trong làn sóng thời đại.',
        boardFormula: '唯有 (Wéiyǒu)...，方能 (fāng néng)... = Chỉ có... mới có thể... (Văn viết C2)',
        boardExamples: [
          { term: '综上所述', phonetic: 'zōng shàng suǒ shù', meaning: 'Tổng hợp những điều đã nêu' },
          { term: '立于不败之地', phonetic: 'lì yú bú bài zhī dì', meaning: 'Đứng ở vị thế bất bại' }
        ],
        pronunciationTip: 'Cặp liên từ "唯有...方能..." là phiên bản học thuật cao cấp của "只有...才能...".'
      }
    ],
    quiz: {
      question: 'Cấu trúc "之所以 [A]，是因为 [B]" trong tiếng Trung HSK 5–6 dùng để diễn đạt mối quan hệ gì?',
      options: [
        'Sở dĩ xảy ra kết quả [A] là bởi vì nguyên nhân [B] (Nhấn mạnh kết quả trước, nguyên nhân sau)',
        'Mặc dù [A] nhưng vẫn [B]',
        'Hễ [A] thì lập tức [B]',
        'Không những [A] mà còn [B]'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc "之所以...是因为..." đảo kết quả lên trước để thu hút sự chú ý của người nghe, sau đó mới giải thích nguyên nhân sâu xa.'
    },
    shadowing: {
      phrase: '科技创新与可持续发展息息相关、密不可分。',
      phonetic: 'Kējì chuàngxīn yǔ kě chíxù fāzhǎn xīxī-xiāngguān, mìbùkěfēn.',
      vietnamese: 'Đổi mới công nghệ và phát triển bền vững gắn bó mật thiết, không thể tách rời.'
    }
  },

  // ==================== 3. JAPANESE (Cơ bản -> Trung cấp -> Nâng cao) ====================
  {
    id: 'vid-ja-basic-1',
    languageId: 'japanese',
    level: 'basic',
    levelBadge: 'Cơ bản • JLPT N5–N4',
    cefrCode: 'JLPT N5–N4',
    title: 'Bài 1: Ngữ điệu Pitch Accent Tokyo & Làm chủ Trợ từ は・が・を・に',
    subtitle: 'Phát âm chuẩn nhịp mora tiếng Nhật và phân biệt chính xác các trợ từ nền tảng N5–N4.',
    durationSeconds: 45,
    xpReward: 40,
    instructorId: 'ja-haruka',
    segments: [
      {
        id: 'ja-b1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Chào hỏi Chuẩn Tokyo & Nhịp Mora',
        gesture: 'welcoming',
        targetScript: '皆さん、こんにちは！AI日本語スタジオへようこそ。一緒に自然な発音を練習しましょう。',
        phoneticScript: 'Minasan, konnichiwa! AI Nihongo sutajio e yōkoso. Issho ni shizen na hatsuon o renshū shimashō.',
        vietnameseSub: 'Xin chào mọi người! Chào mừng đến với Studio Tiếng Nhật AI. Hãy cùng nhau luyện phát âm tự nhiên nhé.',
        boardFormula: 'Danh từ + へ (e) + ようこそ = Chào mừng đến với...',
        boardExamples: [
          { term: '自然な発音 (shizen na hatsuon)', phonetic: 'shi-ze-n na ha-tsu-o-n', meaning: 'Phát âm tự nhiên' },
          { term: '練習しましょう (renshū shimashō)', phonetic: 're-n-shū shi-ma-shō', meaning: 'Hãy cùng luyện tập nào' }
        ],
        pronunciationTip: 'Trường âm "よう (yō)" và âm mũi "ん (n)" đều được tính bằng 1 phách nhịp (mora) đầy đủ.'
      },
      {
        id: 'ja-b1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Phân biệt Trợ từ は (wa) và を (o) trong Câu hành động',
        gesture: 'pointing',
        targetScript: '私は毎朝七時にコーヒーを飲んでから、会社へ行きます。',
        phoneticScript: 'Watashi wa maiasa shichiji ni kōhī o nonde kara, kaisha e ikimasu.',
        vietnameseSub: 'Mỗi sáng sau khi uống cà phê vào lúc 7 giờ, tôi đi đến công ty.',
        boardFormula: 'V-て (te) + から (kara) = Sau khi làm V1 thì làm V2',
        boardExamples: [
          { term: '毎朝 (maiasa)', phonetic: 'ma-i-a-sa', meaning: 'Mỗi buổi sáng' },
          { term: '飲んでから (nonde kara)', phonetic: 'no-n-de ka-ra', meaning: 'Sau khi uống' }
        ],
        pronunciationTip: 'Trợ từ "は" đọc là "wa", trợ từ "へ" đọc là "e", và trợ từ "を" đọc là "o".'
      },
      {
        id: 'ja-b1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Diễn đạt Mong muốn & Mục tiêu N4',
        gesture: 'emphasizing',
        targetScript: '来年は日本で働きたいですから、毎日一生懸命勉強しています。',
        phoneticScript: 'Rainen wa Nihon de hatarakitai desu kara, mainichi isshōkenmei benkyō shite imasu.',
        vietnameseSub: 'Vì năm sau tôi muốn làm việc tại Nhật Bản nên mỗi ngày tôi đều đang học tập hết sức chăm chỉ.',
        boardFormula: 'V-ます (bỏ ます) + たいです (tai desu) = Muốn làm V',
        boardExamples: [
          { term: '働きたい (hatarakitai)', phonetic: 'ha-ta-ra-ki-ta-i', meaning: 'Muốn làm việc' },
          { term: '一生懸命 (isshōkenmei)', phonetic: 'i-sshō-ke-n-me-i', meaning: 'Chăm chỉ hết mình' }
        ],
        pronunciationTip: 'Âm ngắt "っ" trong "一生懸命 (isshōkenmei)" cần giữ hơi 1 nhịp trước khi bật âm "shō".'
      }
    ],
    quiz: {
      question: 'Cấu trúc "V-て から (V-te kara)" trong câu "コーヒーを飲んでから、会社へ行きます" mang ý nghĩa gì?',
      options: [
        'Sau khi thực hiện hành động V1 thì thực hiện hành động V2 theo trình tự thời gian',
        'Bởi vì uống cà phê nên không đi làm',
        'Vừa uống cà phê vừa đi tàu điện',
        'Trước khi uống cà phê thì đã đến công ty'
      ],
      correctIndex: 0,
      explanation: 'Mẫu "V-てから" diễn tả trình tự thời gian rõ ràng: hoàn tất hành động thứ nhất (uống cà phê) rồi mới sang hành động thứ hai (đến công ty).'
    },
    shadowing: {
      phrase: '私は毎朝コーヒーを飲んでから、会社へ行きます。',
      phonetic: 'Watashi wa maiasa kōhī o nonde kara, kaisha e ikimasu.',
      vietnamese: 'Mỗi sáng sau khi uống cà phê, tôi đi đến công ty.'
    }
  },
  {
    id: 'vid-ja-inter-1',
    languageId: 'japanese',
    level: 'intermediate',
    levelBadge: 'Trung cấp • JLPT N3–N2',
    cefrCode: 'JLPT N3–N2',
    title: 'Bài 2: Giao tiếp Công sở Nhật Bản (Hou-Ren-Sou) & Ngữ pháp Trọng tâm N3–N2',
    subtitle: 'Cách báo cáo tiến độ, xin phép cấp trên và dùng cấu trúc ～に関して・～に伴って chuẩn mực.',
    durationSeconds: 45,
    xpReward: 55,
    instructorId: 'ja-kenji',
    segments: [
      {
        id: 'ja-i1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Mở đầu Báo cáo Dự án với ～に関して',
        gesture: 'explaining',
        targetScript: '新しいプロジェクトの進捗状況に関して、ご報告いたします。',
        phoneticScript: 'Atarashii purojekuto no shinchoku jōkyō ni kanshite, go-hōkoku itashimasu.',
        vietnameseSub: 'Liên quan đến tình hình tiến độ của dự án mới, tôi xin phép được báo cáo.',
        boardFormula: 'Danh từ + に関して (ni kanshite) = Liên quan đến / Về vấn đề...',
        boardExamples: [
          { term: '進捗状況 (shinchoku jōkyō)', phonetic: 'shin-cho-ku jō-kyō', meaning: 'Tình hình tiến độ' },
          { term: 'ご報告いたします', phonetic: 'go-hō-ko-ku i-ta-shi-ma-su', meaning: 'Xin phép báo cáo (Khiêm nhường ngữ)' }
        ],
        pronunciationTip: 'Dùng "ご + Danh từ Hán Nhật + いたします" để hạ mình lịch sự khi báo cáo với cấp trên.'
      },
      {
        id: 'ja-i1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Diễn đạt Biến đổi Song hành ～に伴って (N2)',
        gesture: 'pointing',
        targetScript: 'デジタル化が進むに伴って、働き方も大きく変わってきました。',
        phoneticScript: 'Dejitaru-ka ga susumu ni tomonatte, hatarakikata mo ōkiku kawatte kimashita.',
        vietnameseSub: 'Cùng với sự phát triển của chuyển đổi số, phương thức làm việc cũng đã thay đổi lớn.',
        boardFormula: 'N / V-る + に伴って (ni tomonatte) = Cùng với / Kéo theo sự thay đổi của...',
        boardExamples: [
          { term: 'デジタル化 (dejitaru-ka)', phonetic: 'de-ji-ta-ru ka', meaning: 'Sự số hóa / Chuyển đổi số' },
          { term: '働き方 (hatarakikata)', phonetic: 'ha-ta-ra-ki-ka-ta', meaning: 'Cách thức làm việc' }
        ],
        pronunciationTip: 'Giữ giọng trầm ổn ở cụm "に伴って" để thể hiện văn phong phân tích khách quan.'
      },
      {
        id: 'ja-i1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Xin ý kiến & Xác nhận Lịch sự',
        gesture: 'emphasizing',
        targetScript: 'お忙しいところ恐れ入りますが、こちらの資料をご確認いただけますでしょうか。',
        phoneticScript: 'O-isogashii tokoro osoreirimasu ga, kochira no shiryō o go-kakunin itadakemasu deshō ka.',
        vietnameseSub: 'Xin lỗi vì làm phiền lúc anh/chị đang bận, liệu anh/chị có thể kiểm tra giúp tài liệu này được không ạ?',
        boardFormula: 'お忙しいところ恐れ入りますが (Mở đầu xin nhờ vả lịch sự nơi công sở)',
        boardExamples: [
          { term: '恐れ入りますが (osoreirimasu ga)', phonetic: 'o-so-re-i-ri-ma-su ga', meaning: 'Xin thất lễ / Rất ngại quá nhưng...' },
          { term: 'ご確認いただけますか', phonetic: 'go-ka-ku-nin i-ta-da-ke-ma-su ka', meaning: 'Anh/chị có thể xác nhận giúp không ạ?' }
        ],
        pronunciationTip: 'Câu đệm "お忙しいところ恐れ入りますが" là chìa khóa vàng trong giao tiếp email và hội thoại công ty Nhật.'
      }
    ],
    quiz: {
      question: 'Mẫu ngữ pháp N2 "～に伴って (ni tomonatte)" được dùng trong ngữ cảnh nào?',
      options: [
        'Diễn tả khi sự việc A thay đổi/phát triển thì kéo theo sự việc B cũng biến đổi tương ứng',
        'Diễn tả hành động làm thử một việc gì đó',
        'Dùng để từ chối lời mời của bạn bè thân thiết',
        'Diễn tả nguyên nhân dẫn đến kết quả tiêu cực ngoài ý muốn'
      ],
      correctIndex: 0,
      explanation: '「～に伴って」 biểu thị hai sự biến đổi diễn ra song hành hoặc sự việc sau phát sinh kéo theo đà tiến triển của sự việc trước.'
    },
    shadowing: {
      phrase: '新しいプロジェクトの進捗状況に関して、ご報告いたします。',
      phonetic: 'Atarashii purojekuto no shinchoku jōkyō ni kanshite, go-hōkoku itashimasu.',
      vietnamese: 'Liên quan đến tình hình tiến độ của dự án mới, tôi xin phép được báo cáo.'
    }
  },
  {
    id: 'vid-ja-adv-1',
    languageId: 'japanese',
    level: 'advanced',
    levelBadge: 'Nâng cao • JLPT N1',
    cefrCode: 'JLPT N1',
    title: 'Bài 3: Kính ngữ Tối cao (Keigo) & Cấu trúc Học thuật JLPT N1',
    subtitle: 'Làm chủ các mẫu ngữ pháp N1 (～を余儀なくされる, ～にほかならない) và diễn thuyết cấp điều hành.',
    durationSeconds: 45,
    xpReward: 75,
    instructorId: 'ja-haruka',
    segments: [
      {
        id: 'ja-a1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Cấu trúc N1 ～を余儀なくされる (Buộc phải...)',
        gesture: 'pointing',
        targetScript: '世界的な原材料費の高騰により、多くの企業が戦略の見直しを余儀なくされている。',
        phoneticScript: 'Sekaiteki na genzairyōhi no kōtō ni yori, ōku no kigyō ga senryaku no minaoshi o yoginaku sarete iru.',
        vietnameseSub: 'Do giá nguyên vật liệu tăng vọt trên toàn cầu, nhiều doanh nghiệp buộc phải rà soát lại chiến lược.',
        boardFormula: 'Danh từ + を余儀なくされる (o yoginaku sareru) = Bất đắc dĩ buộc phải...',
        boardExamples: [
          { term: '高騰 (kōtō)', phonetic: 'kō-tō', meaning: 'Sự tăng vọt (giá cả)' },
          { term: '見直し (minaoshi)', phonetic: 'mi-na-o-shi', meaning: 'Sự xem xét / đánh giá lại' }
        ],
        pronunciationTip: 'Mẫu này thường đi với các danh từ mang tính thay đổi kế hoạch như 変更 (thay đổi), 中止 (hủy bỏ), 見直し (xem lại).'
      },
      {
        id: 'ja-a1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Khẳng định Tuyệt đối ～にほかならない (N1)',
        gesture: 'explaining',
        targetScript: '今回の成功は、チーム全員のたゆまぬ努力の結果にほかならない。',
        phoneticScript: 'Konkai no seikō wa, chīmu zen’in no tayumanu doryoku no kekka ni hokanaranai.',
        vietnameseSub: 'Thành công lần này chính là kết quả từ sự nỗ lực không ngừng nghỉ của toàn bộ đội ngũ chứ không phải điều gì khác.',
        boardFormula: 'Danh từ / Мệnh đề + にほかならない = Chính là / Không gì khác ngoài...',
        boardExamples: [
          { term: 'たゆまぬ努力 (tayumanu doryoku)', phonetic: 'ta-yu-ma-nu do-ryo-ku', meaning: 'Nỗ lực không ngừng nghỉ' },
          { term: '～にほかならない', phonetic: 'ni ho-ka-na-ra-na-i', meaning: 'Chính là... chứ không gì khác' }
        ],
        pronunciationTip: '「たゆまぬ」 là dạng phủ định cổ trang trọng của động từ 弛む (tayumu - lơi lỏng).'
      },
      {
        id: 'ja-a1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Kính ngữ Đặc biệt trong Đàm phán Đối tác',
        gesture: 'emphasizing',
        targetScript: '弊社の提案をご高覧の上、忌憚のないご意見を賜りますようお願い申し上げます。',
        phoneticScript: 'Heisha no teian o go-kōran no ue, kitan no nai go-iken o tamawarimasu yō onegai mōshiagemasu.',
        vietnameseSub: 'Sau khi quý vị xem qua đề xuất của công ty chúng tôi, kính mong nhận được ý kiến đóng góp thẳng thắn của quý vị.',
        boardFormula: 'ご高覧の上 (Sau khi ngài xem) + 賜りますよう (Kính mong nhận được)',
        boardExamples: [
          { term: 'ご高覧 (go-kōran)', phonetic: 'go-kō-ran', meaning: 'Tôn kính ngữ của việc Đọc/Xem' },
          { term: '忌憚のない (kitan no nai)', phonetic: 'ki-tan no na-i', meaning: 'Thẳng thắn / Không e ngại' }
        ],
        pronunciationTip: 'Đây là chuẩn mực cao nhất của tiếng Nhật thương mại (Keigo C2) khi gửi đề xuất cho đối tác lớn.'
      }
    ],
    quiz: {
      question: 'Trong ngữ pháp JLPT N1, cấu trúc "～を余儀なくされる (o yoginaku sareru)" mang sắc thái ý nghĩa nào?',
      options: [
        'Rơi vào tình thế bắt buộc phải làm điều gì đó dù không mong muốn do hoàn cảnh khách quan',
        'Chủ động lựa chọn phương án tối ưu nhất với sự hào hứng',
        'Hoàn toàn miễn trừ trách nhiệm pháp lý',
        'Vừa mới bắt đầu một thói quen cá nhân'
      ],
      correctIndex: 0,
      explanation: '「余儀なくされる」 diễn tả việc một cá nhân hay tổ chức không còn lựa chọn nào khác, đành phải đưa ra quyết định (như hoãn, hủy, sửa đổi chiến lược) vì áp lực ngoại cảnh.'
    },
    shadowing: {
      phrase: '今回の成功は、チーム全員のたゆまぬ努力の結果にほかならない。',
      phonetic: 'Konkai no seikō wa, chīmu zen’in no tayumanu doryoku no kekka ni hokanaranai.',
      vietnamese: 'Thành công lần này chính là kết quả từ sự nỗ lực không ngừng nghỉ của toàn bộ đội ngũ.'
    }
  },

  // ==================== 4. KOREAN (Cơ bản -> Trung cấp -> Nâng cao) ====================
  {
    id: 'vid-ko-basic-1',
    languageId: 'korean',
    level: 'basic',
    levelBadge: 'Cơ bản • TOPIK I (Cấp 1–2)',
    cefrCode: 'TOPIK 1–2',
    title: 'Bài 1: Quy tắc Nối âm & Biến âm Hangul Chuẩn Giọng Seoul',
    subtitle: 'Làm chủ hiện tượng nối phụ âm cuối (Batchim) và giao tiếp đuôi câu lịch sự -아/어요, -습니다.',
    durationSeconds: 45,
    xpReward: 40,
    instructorId: 'ko-jiyoon',
    segments: [
      {
        id: 'ko-b1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Chào hỏi & Quy tắc Nối âm Batchim (연음화)',
        gesture: 'welcoming',
        targetScript: '안녕하세요 여러분! 오늘 저와 함께 자연스러운 한국어 발음을 배워 볼까요?',
        phoneticScript: 'Annyeonghaseyo yeoreobun! Oneul jeowa hamkke jayeonseureoun Hangugeo bareumeul baewo bolkkayo?',
        vietnameseSub: 'Xin chào các bạn! Hôm nay hãy cùng tôi học cách phát âm tiếng Hàn tự nhiên nhé?',
        boardFormula: 'Batchim + Nguyên âm ㅇ → Đọc nối phụ âm sang âm tiết sau (한국어 → [한구거])',
        boardExamples: [
          { term: '한국어 [한구거]', phonetic: 'han-gu-geo', meaning: 'Tiếng Hàn Quốc' },
          { term: '발음을 [바르믈]', phonetic: 'ba-reu-meul', meaning: 'Phát âm (tân ngữ)' }
        ],
        pronunciationTip: 'Trong từ "발음을", batchim ㄹ nối sang 으 và ㅁ nối sang 을, đọc mượt thành [바르믈].'
      },
      {
        id: 'ko-b1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Biến âm Mũi hóa (비음화): ㅂ/ㄷ/ㄱ + ㅁ/ㄴ',
        gesture: 'pointing',
        targetScript: '저는 한국 문화에 관심이 많아서 매일 한국어 강의를 듣습니다.',
        phoneticScript: 'Jeoneun Hanguk munhwa-e gwansimi manhaseo maeil Hangugeo gang-uireul deutseumnida.',
        vietnameseSub: 'Vì rất quan tâm đến văn hóa Hàn Quốc nên mỗi ngày tôi đều nghe bài giảng tiếng Hàn.',
        boardFormula: 'ㅂ + ㄴ → [ㅁ + ㄴ] (듣습니다 → [듣씀니다])',
        boardExamples: [
          { term: '관심이 많다 [관시미 만타]', phonetic: 'gwan-si-mi man-ta', meaning: 'Có nhiều sự quan tâm' },
          { term: '듣습니다 [듣씀니다]', phonetic: 'deut-sseum-ni-da', meaning: 'Nghe (trang trọng)' }
        ],
        pronunciationTip: 'Đuôi "-습니다" luôn biến âm ㅂ thành ㅁ khi gặp ㄴ, phát âm là [-씀니다 / -슴니다].'
      },
      {
        id: 'ko-b1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Diễn đạt Kế hoạch Tương lai -(으)ㄹ 거예요',
        gesture: 'emphasizing',
        targetScript: '이번 주말에는 친구들과 같이 도서관에서 시험 공부를 할 거예요.',
        phoneticScript: 'Ibeon jumareneun chingudeulgwa gachi doseogwaneseo siheom gongbureul hal geoyeyo.',
        vietnameseSub: 'Cuối tuần này tôi sẽ cùng những người bạn ôn thi ở thư viện.',
        boardFormula: 'Động từ + -(으)ㄹ 거예요 = Sẽ làm gì (Kế hoạch tương lai)',
        boardExamples: [
          { term: '같이 [가치]', phonetic: 'ga-chi', meaning: 'Cùng nhau (Nhũ âm hóa ㅌ+이→치)' },
          { term: '공부를 할 거예요', phonetic: 'gong-bu-reul hal geo-ye-yo', meaning: 'Sẽ học bài' }
        ],
        pronunciationTip: 'Chú ý từ "같이" không đọc là "gat-i" mà biến âm thành [가치 (ga-chi)].'
      }
    ],
    quiz: {
      question: 'Theo quy tắc biến âm tiếng Hàn, chữ "같이 (cùng nhau)" và đuôi câu "-습니다" được phát âm chuẩn như thế nào?',
      options: [
        '같이 đọc là [가치 (ga-chi)] và -습니다 đọc là [-슴니다 (-seumnida)]',
        '같이 đọc là [간이] và -습니다 đọc là [-습디다]',
        'Giữ nguyên âm [갇이] và [-습리다]',
        'Bỏ hoàn toàn phụ âm cuối ở cả hai từ'
      ],
      correctIndex: 0,
      explanation: 'Batchim ㅌ gặp nguyên âm 이 xảy ra hiện tượng nhũ âm hóa thành [치], còn batchim ㅂ gặp ㄴ bị mũi hóa thành [ㅁ].'
    },
    shadowing: {
      phrase: '저는 한국 문화에 관심이 많아서 매일 한국어 강의를 듣습니다.',
      phonetic: 'Jeoneun Hanguk munhwa-e gwansimi manhaseo maeil Hangugeo gang-uireul deutseumnida.',
      vietnamese: 'Vì rất quan tâm đến văn hóa Hàn Quốc nên mỗi ngày tôi đều nghe bài giảng tiếng Hàn.'
    }
  },
  {
    id: 'vid-ko-inter-1',
    languageId: 'korean',
    level: 'intermediate',
    levelBadge: 'Trung cấp • TOPIK II (Cấp 3–4)',
    cefrCode: 'TOPIK 3–4',
    title: 'Bài 2: Ngữ pháp Trung cấp TOPIK 3–4 & Giao tiếp Công sở Hàn Quốc',
    subtitle: 'Cách diễn đạt nguyên nhân, mục đích và trình bày ý kiến mạch lạc với -(으)므로 và -는 데다가.',
    durationSeconds: 45,
    xpReward: 55,
    instructorId: 'ko-minjun',
    segments: [
      {
        id: 'ko-i1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Bổ sung Thông tin với -는 데다가',
        gesture: 'explaining',
        targetScript: '이 프로그램은 사용법이 간단한 데다가 기능도 다양해서 인기가 많습니다.',
        phoneticScript: 'I peurogeuraemeun sayongbeobi gandanhan dedaga gineungdo dayanghaeseo ingiga manseumnida.',
        vietnameseSub: 'Chương trình này không những cách sử dụng đơn giản mà tính năng còn đa dạng nên rất được ưa chuộng.',
        boardFormula: 'V/A-(으)ㄴ/는 데다가 = Không những... mà còn thêm vào đó...',
        boardExamples: [
          { term: '사용법이 간단하다', phonetic: 'sa-yong-beo-bi gan-dan-ha-da', meaning: 'Cách sử dụng đơn giản' },
          { term: '기능이 다양하다', phonetic: 'gi-neung-i da-yang-ha-da', meaning: 'Tính năng đa dạng' }
        ],
        pronunciationTip: 'Cấu trúc "-는 데다가" dùng khi cả hai vế cùng mang sắc thái tích cực hoặc cùng tiêu cực.'
      },
      {
        id: 'ko-i1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Lý do Trang trọng -(으)므로 trong Báo cáo',
        gesture: 'pointing',
        targetScript: '내일 오전에는 중요한 회의가 있으므로 모든 자료를 미리 점검해 주시기 바랍니다.',
        phoneticScript: 'Naeil ojeone-neun jungyohan hoe-uiga isseumeuro modeun jaryoreul miri jeomgeomhae jusigi baramnida.',
        vietnameseSub: 'Vì sáng mai có cuộc họp quan trọng nên mong mọi người hãy kiểm tra trước toàn bộ tài liệu.',
        boardFormula: 'V/A-(으)므로 = Bởi vì... cho nên... (Văn phong công sở & viết luận)',
        boardExamples: [
          { term: '점검하다', phonetic: 'jeom-geom-ha-da', meaning: 'Kiểm tra / Rà soát' },
          { term: '-아/어 주시기 바랍니다', phonetic: 'ju-si-gi ba-ram-ni-da', meaning: 'Mong quý vị hãy làm...' }
        ],
        pronunciationTip: 'Kết hợp "-(으)므로" với đuôi "-주시기 바랍니다" tạo nên câu thông báo công sở chuẩn mực.'
      },
      {
        id: 'ko-i1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Diễn đạt Xu hướng Đang thay đổi -아/어 가다',
        gesture: 'emphasizing',
        targetScript: '꾸준히 연습한 덕분에 한국어 실력이 조금씩 늘어가고 있습니다.',
        phoneticScript: 'Kkujunhi yeonseuphan deokbune Hangugeo sillyeogi jogeumssik neureogago isseumnida.',
        vietnameseSub: 'Nhờ luyện tập đều đặn mà năng lực tiếng Hàn của tôi đang từng chút một tiến bộ lên.',
        boardFormula: 'N 덕분에 (Nhờ có N) + V-아/어 가고 있다 (Đang dần tiến triển)',
        boardExamples: [
          { term: '꾸준히 [꾸주니]', phonetic: 'kku-ju-ni', meaning: 'Đều đặn / Bền bỉ' },
          { term: '실력이 늘어가다', phonetic: 'sil-lyeo-gi neu-reo-ga-da', meaning: 'Năng lực tiến bộ dần lên' }
        ],
        pronunciationTip: 'Trong "실력이", batchim ㄹ gặp ㄴ của từ gốc hoặc nối âm tạo âm đôi [실려기].'
      }
    ],
    quiz: {
      question: 'Cấu trúc "-는 데다가" trong câu "사용법이 간단한 데다가 기능도 다양하다" dùng để diễn tả điều gì?',
      options: [
        'Bổ sung thêm một đặc điểm cùng chiều (Không những đơn giản mà tính năng còn đa dạng)',
        'Hai sự việc hoàn toàn trái ngược nhau',
        'Sự hối tiếc về một việc đã qua trong quá khứ',
        'Mệnh lệnh bắt buộc đối phương thực hiện ngay'
      ],
      correctIndex: 0,
      explanation: '"-는 데다가" dùng để cộng hưởng hai thông tin cùng chiều (tích cực + tích cực, hoặc tiêu cực + tiêu cực).'
    },
    shadowing: {
      phrase: '이 프로그램은 사용법이 간단한 데다가 기능도 다양해서 인기가 많습니다.',
      phonetic: 'I peurogeuraemeun sayongbeobi gandanhan dedaga gineungdo dayanghaeseo ingiga manseumnida.',
      vietnamese: 'Chương trình này không những cách sử dụng đơn giản mà tính năng còn đa dạng nên rất được ưa chuộng.'
    }
  },
  {
    id: 'vid-ko-adv-1',
    languageId: 'korean',
    level: 'advanced',
    levelBadge: 'Nâng cao • TOPIK II (Cấp 5–6)',
    cefrCode: 'TOPIK 5–6',
    title: 'Bài 3: Lập luận Học thuật TOPIK 54 & Cấu trúc Biểu hiện Cấp 5–6',
    subtitle: 'Làm chủ các mẫu câu nghị luận xã hội (-기 마련이다, -(으)ㄹ 따름이다) để đạt điểm tối đa bài viết TOPIK II.',
    durationSeconds: 45,
    xpReward: 75,
    instructorId: 'ko-jiyoon',
    segments: [
      {
        id: 'ko-a1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Quy luật Tất yếu với -기 마련이다 (TOPIK 5–6)',
        gesture: 'pointing',
        targetScript: '시대가 변하면 사회의 가치관과 소비 방식도 자연스럽게 달라지기 마련이다.',
        phoneticScript: 'Sidaega byeonhamyeon sahoe-ui gachigwangwa sobi bangsikdo jayeonseureopge dallajigi maryeonida.',
        vietnameseSub: 'Khi thời đại thay đổi, hệ giá trị xã hội và phương thức tiêu dùng lẽ dĩ nhiên cũng sẽ thay đổi theo.',
        boardFormula: 'Động từ + -기 마련이다 = Lẽ dĩ nhiên / Tất yếu sẽ...',
        boardExamples: [
          { term: '가치관 (Giá trị quan)', phonetic: 'ga-chi-gwan', meaning: 'Hệ giá trị / Quan điểm sống' },
          { term: '달라지기 마련이다', phonetic: 'dal-la-ji-gi ma-ryeo-ni-da', meaning: 'Tất yếu sẽ thay đổi' }
        ],
        pronunciationTip: 'Đây là mẫu câu mở bài cực kỳ ăn điểm trong Câu 54 bài thi Viết TOPIK II.'
      },
      {
        id: 'ko-a1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Nhấn mạnh Điều kiện Cần thiết -아/어야 할 것이다',
        gesture: 'explaining',
        targetScript: '환경 보호와 경제 성장이 조화를 이루기 위해서는 장기적인 정책이 뒷받침되어야 할 것이다.',
        phoneticScript: 'Hwangyeong bohowa gyeongje seongjang-i johwareul irugi wihaeseoneun janggijeogin jeongchaegi dwitbatchimdoeeoya hal geosida.',
        vietnameseSub: 'Để bảo vệ môi trường và tăng trưởng kinh tế đạt được sự hài hòa, cần phải có sự hậu thuẫn của các chính sách dài hạn.',
        boardFormula: '-기 위해서는 (Để...) + S-이/가 뒷받침되어야 할 것이다 (Cần được hậu thuẫn bởi...)',
        boardExamples: [
          { term: '조화를 이루다', phonetic: 'jo-hwa-reul i-ru-da', meaning: 'Đạt được sự hài hòa' },
          { term: '뒷받침되다', phonetic: 'dwit-bat-chim-doe-da', meaning: 'Được làm hậu thuẫn / nền tảng' }
        ],
        pronunciationTip: 'Trong văn viết nghị luận TOPIK 54, luôn chia đuôi câu ở dạng nguyên thể (-다 / -할 것이다).'
      },
      {
        id: 'ko-a1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Cấu trúc Phủ định Nhấn mạnh -에 불과하다',
        gesture: 'emphasizing',
        targetScript: '근본적인 원인을 해결하지 않는 대책은 일시적인 미봉책에 불과하다.',
        phoneticScript: 'Geunbonjeogin wonineul haegyeolhaji anneun daechaegeun ilssijeogin mibongchaege bulgwahada.',
        vietnameseSub: 'Giải pháp không giải quyết được nguyên nhân gốc rễ thì chẳng qua chỉ là kế sách chắp vá tạm thời.',
        boardFormula: 'Danh từ + -에 불과하다 = Chẳng qua chỉ là / Không quá...',
        boardExamples: [
          { term: '근본적인 원인', phonetic: 'geun-bon-jeo-gin wo-nin', meaning: 'Nguyên nhân căn bản / gốc rễ' },
          { term: '미봉책에 불과하다', phonetic: 'mi-bong-chae-ge bul-gwa-ha-da', meaning: 'Chỉ là giải pháp tạm bợ' }
        ],
        pronunciationTip: 'Từ Hán Hàn "미봉책 (彌縫策)" giúp nâng tầm từ vựng lên chuẩn C2 (TOPIK 6).'
      }
    ],
    quiz: {
      question: 'Mẫu câu "-기 마련이다" trong bài giảng TOPIK Cấp 5–6 được dùng để biểu đạt ý nghĩa nào?',
      options: [
        'Một quy luật tự nhiên hoặc kết quả tất yếu đương nhiên sẽ xảy ra',
        'Một hành động vừa mới kết thúc cách đây vài giây',
        'Sự nghi ngờ không chắc chắn về thông tin nghe được',
        'Lời rủ rê bạn bè cùng tham gia hoạt động giải trí'
      ],
      correctIndex: 0,
      explanation: '"-기 마련이다" (tương đương với -는 법이다) dùng để khẳng định một quy luật tất yếu trong lập luận học thuật.'
    },
    shadowing: {
      phrase: '시대가 변하면 사회의 가치관도 자연스럽게 달라지기 마련이다.',
      phonetic: 'Sidaega byeonhamyeon sahoe-ui gachigwando jayeonseureopge dallajigi maryeonida.',
      vietnamese: 'Khi thời đại thay đổi, hệ giá trị xã hội lẽ dĩ nhiên cũng sẽ thay đổi theo.'
    }
  },

  // ==================== 5. FRENCH (Cơ bản -> Trung cấp -> Nâng cao) ====================
  {
    id: 'vid-fr-basic-1',
    languageId: 'french',
    level: 'basic',
    levelBadge: 'Cơ bản • DELF A1–A2',
    cefrCode: 'A1–A2',
    title: 'Bài 1: Nghệ thuật Nối âm Liaison & Ngữ điệu Tiếng Pháp Chuẩn Paris',
    subtitle: 'Làm chủ nguyên âm mũi (Voyelles nasales), quy tắc nối âm bắt buộc và giao tiếp hàng ngày.',
    durationSeconds: 45,
    xpReward: 40,
    instructorId: 'fr-camille',
    segments: [
      {
        id: 'vid-fr-b1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Chào hỏi & Quy tắc Liaison (Nối âm)',
        gesture: 'welcoming',
        targetScript: 'Bonjour à tous ! Bienvenue dans notre studio interactif. Vous avez une excellente prononciation.',
        phoneticScript: '[bông-ju-ra tút | bi-anh-vơ-nuy đăng nô-trơ stuy-đi-ô | vu-za-vê uyn ék-xê-lăng-t prô-nông-xi-a-xi-ông]',
        vietnameseSub: 'Xin chào tất cả mọi người! Chào mừng đến với trường quay tương tác. Các bạn có phát âm rất tuyệt vời.',
        boardFormula: 'Đại từ + Động từ nguyên âm → Nối âm /z/ (Vous avez → [vu-za-vê])',
        boardExamples: [
          { term: 'Vous avez', phonetic: '[vu-za-vê]', meaning: 'Bạn có / Các bạn có' },
          { term: 'Les amis', phonetic: '[lê-za-mi]', meaning: 'Những người bạn' }
        ],
        pronunciationTip: 'Chữ "s" cuối "Vous" bình thường câm, nhưng khi gặp nguyên âm "a" của "avez" sẽ phát âm thành /z/.'
      },
      {
        id: 'vid-fr-b1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Diễn đạt Dự định Gần với Futur Proche',
        gesture: 'explaining',
        targetScript: 'Ce soir, je vais réserver une table dans un petit restaurant français.',
        phoneticScript: '[xơ xoa | jơ ve rê-déc-vê uyn ta-blơ đăng-dâng pơ-ti rét-xtô-răng frăng-xe]',
        vietnameseSub: 'Tối nay, tôi sẽ đặt một bàn tại một nhà hàng Pháp nhỏ.',
        boardFormula: 'Aller (chia ở hiện tại) + Động từ nguyên mẫu (Infinitif)',
        boardExamples: [
          { term: 'Je vais réserver', phonetic: '[jơ ve rê-déc-vê]', meaning: 'Tôi sắp / sẽ đặt chỗ' },
          { term: 'Un restaurant français', phonetic: '[âng rét-xtô-răng frăng-xe]', meaning: 'Một nhà hàng Pháp' }
        ],
        pronunciationTip: 'Nguyên âm mũi "an/en" trong "dans", "restaurant", "français" ngân nhẹ ở khoang mũi, không đóng môi.'
      },
      {
        id: 'vid-fr-b1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Hỏi lịch sự với Conditionnel de politesse',
        gesture: 'emphasizing',
        targetScript: 'Je voudrais pratiquer le français tous les jours pour parler avec confiance.',
        phoneticScript: '[jơ vu-đre pra-ti-kê lơ frăng-xe tu lê ju-r pu-r pác-lê a-véc công-fi-ăng-x]',
        vietnameseSub: 'Tôi muốn luyện tiếng Pháp mỗi ngày để nói chuyện một cách tự tin.',
        boardFormula: 'Je voudrais + Infinitif (Lịch sự hơn "Je veux")',
        boardExamples: [
          { term: 'Je voudrais', phonetic: '[jơ vu-đre]', meaning: 'Tôi mong muốn (lịch sự)' },
          { term: 'Avec confiance', phonetic: '[a-véc công-fi-ăng-x]', meaning: 'Một cách tự tin' }
        ],
        pronunciationTip: 'Trọng âm tiếng Pháp luôn rơi nhẹ vào âm tiết cuối cùng của cụm từ có nghĩa.'
      }
    ],
    quiz: {
      question: 'Khi phát âm cụm từ "Vous avez" trong tiếng Pháp, hiện tượng nối âm (Liaison) diễn ra như thế nào?',
      options: [
        'Phụ âm cuối "s" của "Vous" nối sang nguyên âm "a" và phát âm thành âm /z/ ([vu-za-vê])',
        'Đọc tách rời và phát âm chữ "s" thành âm /s/ mạnh',
        'Bỏ nguyên âm "a" của từ "avez"',
        'Đọc chữ "v" thành âm /b/'
      ],
      correctIndex: 0,
      explanation: 'Khi phụ âm cuối "s" hoặc "x" thực hiện nối âm (liaison) sang từ bắt đầu bằng nguyên âm, nó luôn biến thành âm hữu thanh /z/.'
    },
    shadowing: {
      phrase: 'Je voudrais pratiquer le français tous les jours avec confiance.',
      phonetic: '[jơ vu-đre pra-ti-kê lơ frăng-xe tu lê ju-r a-véc công-fi-ăng-x]',
      vietnamese: 'Tôi muốn luyện tiếng Pháp mỗi ngày một cách tự tin.'
    }
  },
  {
    id: 'vid-fr-inter-1',
    languageId: 'french',
    level: 'intermediate',
    levelBadge: 'Trung cấp • DELF B1–B2',
    cefrCode: 'B1–B2',
    title: 'Bài 2: Phân biệt Passé Composé vs Imparfait & Lập luận DELF B2',
    subtitle: 'Cách kể chuyện mạch lạc và bảo vệ quan điểm cá nhân bằng các từ nối logic (Connecteurs logiques).',
    durationSeconds: 45,
    xpReward: 55,
    instructorId: 'fr-lucas',
    segments: [
      {
        id: 'vid-fr-i1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Phối hợp Imparfait (Bối cảnh) & Passé Composé (Sự kiện)',
        gesture: 'explaining',
        targetScript: 'Pendant que je travaillais sur le rapport, le directeur m’a appelé pour une réunion urgente.',
        phoneticScript: '[păng-đăng cơ jơ tra-vai-de xuy-r lơ ra-po | lơ đi-réc-tơ ma a-pơ-lê...]',
        vietnameseSub: 'Trong khi tôi đang làm báo cáo thì giám đốc đã gọi cho tôi vì một cuộc họp khẩn.',
        boardFormula: 'Imparfait (Hành động đang diễn ra) + Passé Composé (Hành động cắt ngang)',
        boardExamples: [
          { term: 'Je travaillais', phonetic: '[jơ tra-vai-de]', meaning: 'Tôi đang làm việc (Imparfait)' },
          { term: 'Il m’a appelé', phonetic: '[il ma a-pơ-lê]', meaning: 'Ông ấy đã gọi tôi (Passé Composé)' }
        ],
        pronunciationTip: 'Đuôi "-ais" của Imparfait phát âm mở [e], phân biệt rõ với "-é" ([ê]) của Passé Composé.'
      },
      {
        id: 'vid-fr-i1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Liên từ Chuyển ý trong Tranh luận B2',
        gesture: 'pointing',
        targetScript: 'Certes, le télétravail offre une grande flexibilité ; néanmoins, il exige une discipline rigoureuse.',
        phoneticScript: '[xéc-t | lơ tê-lê-tra-vai óp-frơ uyn grăng-đ flék-xi-bi-li-tê | nê-ăng-moanh...]',
        vietnameseSub: 'Quả thực làm việc từ xa mang lại sự linh hoạt lớn; tuy nhiên, nó đòi hỏi tính kỷ luật nghiêm ngặt.',
        boardFormula: 'Certes + [Mệnh đề 1] ; néanmoins / toutefois + [Mệnh đề 2]',
        boardExamples: [
          { term: 'Certes... néanmoins', phonetic: '[xéc-t... nê-ăng-moanh]', meaning: 'Quả thực... tuy nhiên' },
          { term: 'Une discipline rigoureuse', phonetic: '[uyn đi-xi-plin ri-gu-rơ-z]', meaning: 'Kỷ luật nghiêm ngặt' }
        ],
        pronunciationTip: 'Cặp "Certes... néanmoins..." là cấu trúc vàng trong bài thi Nói và Viết DELF B2.'
      },
      {
        id: 'vid-fr-i1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Đại từ Quan hệ Phức hợp lequel / dont',
        gesture: 'emphasizing',
        targetScript: 'C’est un projet innovant dont les résultats dépassent toutes nos attentes.',
        phoneticScript: '[xe-tâng prô-je i-nô-văng đông lê rê-duyn-ta đê-pát-x tút nô-da-tăng-t]',
        vietnameseSub: 'Đây là một dự án đổi mới mà kết quả của nó vượt xa mọi kỳ vọng của chúng tôi.',
        boardFormula: 'Antécédent + dont (thay cho de + danh từ) + Chủ ngữ + Động từ',
        boardExamples: [
          { term: 'Dont les résultats', phonetic: '[đông lê rê-duyn-ta]', meaning: 'Mà kết quả của nó' },
          { term: 'Dépasser les attentes', phonetic: '[đê-pa-xê lê-da-tăng-t]', meaning: 'Vượt qua kỳ vọng' }
        ],
        pronunciationTip: 'Nối âm "nos attentes" thành [nô-da-tăng-t].'
      }
    ],
    quiz: {
      question: 'Trong tiếng Pháp B1–B2, cặp liên từ "Certes..., néanmoins..." được sử dụng với mục đích gì?',
      options: [
        'Thừa nhận một mặt đúng của vấn đề (Certes) rồi đưa ra lập luận phản biện/bổ sung (néanmoins)',
        'Liệt kê các sự kiện theo thứ tự thời gian trong quá khứ',
        'Diễn tả nguyên nhân trực tiếp dẫn đến hậu quả',
        'Đặt câu hỏi trực tiếp trong giao tiếp thân mật'
      ],
      correctIndex: 0,
      explanation: '"Certes... néanmoins..." giúp bài nói DELF B2 thể hiện tư duy đa chiều: công nhận một thực tế trước khi nêu ra giới hạn hoặc điều kiện đi kèm.'
    },
    shadowing: {
      phrase: 'Certes, le télétravail offre une grande flexibilité ; néanmoins, il exige une discipline rigoureuse.',
      phonetic: '[xéc-t | lơ tê-lê-tra-vai óp-frơ uyn grăng-đ flék-xi-bi-li-tê | nê-ăng-moanh il ék-di-j uyn đi-xi-plin ri-gu-rơ-z]',
      vietnamese: 'Quả thực làm việc từ xa mang lại sự linh hoạt lớn; tuy nhiên, nó đòi hỏi tính kỷ luật nghiêm ngặt.'
    }
  },
  {
    id: 'vid-fr-adv-1',
    languageId: 'french',
    level: 'advanced',
    levelBadge: 'Nâng cao • DALF C1–C2',
    cefrCode: 'C1–C2',
    title: 'Bài 3: Thức Giả định (Subjonctif) & Hùng biện Học thuật DALF C1–C2',
    subtitle: 'Làm chủ Subjonctif sau các liên từ nhượng bộ (Bien que, Quoique) và phong cách nghị luận Sorbonne.',
    durationSeconds: 45,
    xpReward: 75,
    instructorId: 'fr-camille',
    segments: [
      {
        id: 'vid-fr-a1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Subjonctif sau Liên từ Nhượng bộ Bien que',
        gesture: 'pointing',
        targetScript: 'Bien que cette réforme soit indispensable, sa mise en œuvre suscite encore de vifs débats.',
        phoneticScript: '[bi-anh cơ xét rê-foóc-m xoa anh-đít-xpăng-xa-blơ | xa mi-dăng-nơ-vrơ xuy-xít ăng-co đơ víp đê-ba]',
        vietnameseSub: 'Mặc dù cuộc cải cách này là không thể thiếu, việc triển khai nó vẫn làm dấy lên những cuộc tranh luận sôi nổi.',
        boardFormula: 'Bien que / Quoique + Chủ ngữ + Động từ chia ở Subjonctif',
        boardExamples: [
          { term: 'Bien qu’elle soit', phonetic: '[bi-anh ken xoa]', meaning: 'Mặc dù nó là (Subjonctif của être)' },
          { term: 'La mise en œuvre', phonetic: '[la mi-dăng-nơ-vrơ]', meaning: 'Sự triển khai thực hiện' }
        ],
        pronunciationTip: 'Sau "Bien que", động từ "être" bắt buộc chia ở Subjonctif là "soit" chứ không dùng "est".'
      },
      {
        id: 'vid-fr-a1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Cấu trúc Nhấn mạnh Học thuật Il importe que',
        gesture: 'explaining',
        targetScript: 'Il importe que les institutions internationales prennent des mesures concrètes face aux défis climatiques.',
        phoneticScript: '[il anh-poóc-t cơ lê-danh-xti-tuy-xi-ông anh-téc-na-xi-ô-nan pren đê mơ-duy-r công-crét...]',
        vietnameseSub: 'Điều quan trọng là các tổ chức quốc tế phải đưa ra những biện pháp cụ thể trước các thách thức khí hậu.',
        boardFormula: 'Il importe que / Il est primordial que + Subjonctif',
        boardExamples: [
          { term: 'Prendre des mesures', phonetic: '[prăng-đrơ đê mơ-duy-r]', meaning: 'Đưa ra các biện pháp' },
          { term: 'Les défis climatiques', phonetic: '[lê đê-fi cli-ma-tích]', meaning: 'Những thách thức khí hậu' }
        ],
        pronunciationTip: 'Động từ "prendre" ở ngôi thứ 3 số nhiều Subjonctif đọc là "prennent" [pren].'
      },
      {
        id: 'vid-fr-a1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Tổng kết Phong cách DALF C2',
        gesture: 'emphasizing',
        targetScript: 'En définitive, l’innovation technologique ne saurait remplacer la réflexion éthique.',
        phoneticScript: '[ăng đê-fi-ni-típ | li-nô-va-xi-ông téc-nô-lô-jích nơ xô-re răng-pla-xê la rê-flék-xi-ông ê-tích]',
        vietnameseSub: 'Xét cho cùng, đổi mới công nghệ không thể nào thay thế được sự suy ngẫm về mặt đạo đức.',
        boardFormula: 'Ne saurait + Infinitif (Phủ định trang trọng C2 thay cho "ne peut pas")',
        boardExamples: [
          { term: 'En définitive', phonetic: '[ăng đê-fi-ni-típ]', meaning: 'Rốt cuộc / Xét cho cùng' },
          { term: 'Ne saurait remplacer', phonetic: '[nơ xô-re răng-pla-xê]', meaning: 'Không thể nào thay thế' }
        ],
        pronunciationTip: 'Cấu trúc "ne saurait + V" (Conditionnel của savoir dùng một mình với "ne") là dấu ấn của văn phong học thuật C2.'
      }
    ],
    quiz: {
      question: 'Sau liên từ chỉ sự nhượng bộ "Bien que" (Mặc dù) trong tiếng Pháp, động từ của mệnh đề phải chia ở thức nào?',
      options: [
        'Thức Giả định (Subjonctif — ví dụ: Bien que cette réforme soit...)',
        'Thức Chỉ định hiện tại (Indicatif — ví dụ: Bien que cette réforme est...)',
        'Động từ nguyên mẫu không chia (Infinitif)',
        'Thức Mệnh lệnh (Impératif)'
      ],
      correctIndex: 0,
      explanation: 'Sau "Bien que" và "Quoique", ngữ pháp tiếng Pháp bắt buộc chia động từ ở thức Subjonctif.'
    },
    shadowing: {
      phrase: 'Bien que cette réforme soit indispensable, sa mise en œuvre suscite de vifs débats.',
      phonetic: '[bi-anh cơ xét rê-foóc-m xoa anh-đít-xpăng-xa-blơ | xa mi-dăng-nơ-vrơ xuy-xít đơ víp đê-ba]',
      vietnamese: 'Mặc dù cuộc cải cách này là không thể thiếu, việc triển khai nó vẫn làm dấy lên những cuộc tranh luận sôi nổi.'
    }
  },

  // ==================== 6. GERMAN (Cơ bản -> Trung cấp -> Nâng cao) ====================
  {
    id: 'vid-de-basic-1',
    languageId: 'german',
    level: 'basic',
    levelBadge: 'Cơ bản • Goethe A1–A2',
    cefrCode: 'A1–A2',
    title: 'Bài 1: Phát âm Chuẩn Hochdeutsch & Quy tắc Động từ Đứng vị trí Số 2 (V2)',
    subtitle: 'Làm chủ âm Umlaut (ä, ö, ü), phụ âm ch/sch và quy tắc vàng trật tự từ tiếng Đức.',
    durationSeconds: 45,
    xpReward: 40,
    instructorId: 'de-hannah',
    segments: [
      {
        id: 'vid-de-b1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Chào hỏi & Phát âm chuẩn Hochdeutsch',
        gesture: 'welcoming',
        targetScript: 'Hallo zusammen! Herzlich willkommen in unserem interaktiven Deutsch-Studio.',
        phoneticScript: '[HA-lô tsu-DA-mần | HÉC-ts-lích vin-KÔ-mần in UN-dơ-rờm in-tơ-rắc-TI-vần Đói-ch STU-đi-ô]',
        vietnameseSub: 'Xin chào tất cả mọi người! Nhiệt liệt chào mừng đến với trường quay tiếng Đức tương tác của chúng ta.',
        boardFormula: 'Chữ "z" đọc là [ts] • Chữ "w" đọc là [v] • "st/sp" đầu từ đọc là [sht], [shp]',
        boardExamples: [
          { term: 'Herzlich willkommen', phonetic: '[HÉC-ts-lích vin-KÔ-mần]', meaning: 'Nhiệt liệt chào mừng' },
          { term: 'Zusammen', phonetic: '[tsu-DA-mần]', meaning: 'Cùng nhau / Tất cả mọi người' }
        ],
        pronunciationTip: 'Âm "ch" sau nguyên âm i, e (như trong "herzlich") là Ich-Laut, đẩy hơi nhẹ qua vòm miệng.'
      },
      {
        id: 'vid-de-b1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Quy tắc Động từ Đứng vị trí thứ 2 (V2-Regel)',
        gesture: 'pointing',
        targetScript: 'Jeden Morgen trinke ich eine Tasse Kaffee und lese die Nachrichten auf Deutsch.',
        phoneticScript: '[YÊ-đần MOÓC-gần TRINH-kơ ích AI-nơ TÁT-xơ KA-fê un-t LÊ-dơ đi NA-kh-rích-tần ao-f Đói-ch]',
        vietnameseSub: 'Mỗi buổi sáng tôi uống một tách cà phê và đọc tin tức bằng tiếng Đức.',
        boardFormula: '[Thành phần 1: Thời gian] + [Vị trí 2: Động từ chia] + [Chủ ngữ] + ...',
        boardExamples: [
          { term: 'Jeden Morgen trinke ich', phonetic: '[YÊ-đần MOÓC-gần TRINH-kơ ích]', meaning: 'Mỗi sáng tôi uống (Đảo V lên trước S)' },
          { term: 'Die Nachrichten', phonetic: '[đi NA-kh-rích-tần]', meaning: 'Tin tức / Bản tin' }
        ],
        pronunciationTip: 'Khi đưa trạng từ thời gian "Jeden Morgen" lên đầu câu, động từ "trinke" bắt buộc đứng ngay sau đó (vị trí số 2).'
      },
      {
        id: 'vid-de-b1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Khung câu với Động từ Khuyết thiếu (Satzklammer)',
        gesture: 'emphasizing',
        targetScript: 'Ich möchte dieses Jahr meine Deutschkenntnisse Schritt für Schritt verbessern.',
        phoneticScript: '[ích MỚT-tơ ĐI-dớt ya MAI-nơ ĐÓI-ch-ken-ni-xơ shrít fuya shrít fea-BÉT-xờn]',
        vietnameseSub: 'Năm nay tôi muốn cải thiện kiến thức tiếng Đức của mình từng bước một.',
        boardFormula: 'Chủ ngữ + Modalverb (Vị trí 2) + ... + Infinitiv (Cuối câu)',
        boardExamples: [
          { term: 'Schritt für Schritt', phonetic: '[shrít fuya shrít]', meaning: 'Từng bước một' },
          { term: 'Deutschkenntnisse verbessern', phonetic: '[ĐÓI-ch-ken-ni-xơ fea-BÉT-xờn]', meaning: 'Cải thiện trình độ tiếng Đức' }
        ],
        pronunciationTip: 'Động từ nguyên mẫu "verbessern" luôn được đẩy về vị trí cuối cùng của câu.'
      }
    ],
    quiz: {
      question: 'Theo quy tắc V2 (Vị trí số 2) trong câu tiếng Đức, nếu câu bắt đầu bằng trạng từ chỉ thời gian "Jeden Morgen", từ tiếp theo phải là gì?',
      options: [
        'Động từ chính đã chia theo chủ ngữ ("Jeden Morgen trinke ich...")',
        'Chủ ngữ đứng trước rồi mới đến động từ ("Jeden Morgen ich trinke...")',
        'Động từ nguyên mẫu không chia đặt ở đầu câu',
        'Mạo từ xác định ở cách 4 (Akkusativ)'
      ],
      correctIndex: 0,
      explanation: 'Trong câu trần thuật tiếng Đức, động từ đã chia (finites Verb) luôn cố định ở vị trí thứ 2. Khi trạng từ đứng vị trí 1 thì động từ đứng vị trí 2 và chủ ngữ lùi sang vị trí 3.'
    },
    shadowing: {
      phrase: 'Ich möchte meine Deutschkenntnisse Schritt für Schritt verbessern.',
      phonetic: '[ích MỚT-tơ MAI-nơ ĐÓI-ch-ken-ni-xơ shrít fuya shrít fea-BÉT-xờn]',
      vietnamese: 'Tôi muốn cải thiện trình độ tiếng Đức của mình từng bước một.'
    }
  },
  {
    id: 'vid-de-inter-1',
    languageId: 'german',
    level: 'intermediate',
    levelBadge: 'Trung cấp • Goethe B1–B2',
    cefrCode: 'B1–B2',
    title: 'Bài 2: Mệnh đề Phụ (Nebensatz) với weil, obwohl & Liên từ Kép je... desto...',
    subtitle: 'Làm chủ cấu trúc đẩy động từ xuống cuối mệnh đề phụ và so sánh tỷ lệ thuận B1–B2.',
    durationSeconds: 45,
    xpReward: 55,
    instructorId: 'de-lukas',
    segments: [
      {
        id: 'vid-de-i1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Mệnh đề Phụ Nhượng bộ với obwohl',
        gesture: 'explaining',
        targetScript: 'Obwohl die Aufgabe ziemlich anspruchsvoll war, haben wir das Projekt pünktlich abgeschlossen.',
        phoneticScript: '[ốp-VÔN đi AO-f-ga-bơ TSIM-lích AN-shprúc-x-vôn va | HA-bần via đát prô-YÉK-t PUYNH-t-lích ÁP-gơ-shlót-xần]',
        vietnameseSub: 'Mặc dù nhiệm vụ khá thử thách, chúng tôi vẫn đã hoàn thành dự án đúng hạn.',
        boardFormula: 'Obwohl + S + ... + V_cuối, V_chính + S + ...',
        boardExamples: [
          { term: 'Anspruchsvoll', phonetic: '[AN-shprúc-x-vôn]', meaning: 'Đòi hỏi cao / Thách thức' },
          { term: 'Pünktlich abschließen', phonetic: '[PUYNH-t-lích ÁP-shli-xần]', meaning: 'Hoàn thành đúng giờ' }
        ],
        pronunciationTip: 'Khi mệnh đề phụ (Obwohl...) đứng trước, mệnh đề chính bắt đầu ngay bằng động từ chia ("haben wir...").'
      },
      {
        id: 'vid-de-i1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Cấu trúc So sánh Kép Je... desto... (B2)',
        gesture: 'pointing',
        targetScript: 'Je regelmäßiger man mit dem KI-Tutor spricht, desto flüssiger wird die Aussprache.',
        phoneticScript: '[yê RÊ-gần-mê-xi-gơ man mít đêm KA-I TU-toa shprích-t | ĐÉT-xtô FLUY-xi-gơ vía-t đi AO-x-shpra-khơ]',
        vietnameseSub: 'Càng trò chuyện đều đặn với gia sư AI bao nhiêu, phát âm càng trở nên lưu loát bấy nhiêu.',
        boardFormula: 'Je + Komparativ + S + ... + V_cuối, desto + Komparativ + V_chính + S',
        boardExamples: [
          { term: 'Je... desto...', phonetic: '[yê... ĐÉT-xtô...]', meaning: 'Càng... càng...' },
          { term: 'Die Aussprache', phonetic: '[đi AO-x-shpra-khơ]', meaning: 'Sự phát âm' }
        ],
        pronunciationTip: 'Chú ý sự đối lập vị trí động từ: vế "Je" động từ ("spricht") ở cuối, vế "desto" động từ ("wird") đứng ngay sau tính từ so sánh hơn!'
      },
      {
        id: 'vid-de-i1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Động từ Đi kèm Giới từ Cố định (Rektion der Verben)',
        gesture: 'emphasizing',
        targetScript: 'Wir freuen uns sehr darauf, bald mit neuen internationalen Partnern zusammenzuarbeiten.',
        phoneticScript: '[via FROI-ần un-x dea đa-RAO-f | ban-t mít NOI-ần in-tơ-na-tsi-ô-NA-lần PÁC-t-nờn tsu-DA-mần-tsu-a-bai-tần]',
        vietnameseSub: 'Chúng tôi rất hào hứng mong chờ việc sớm được hợp tác với các đối tác quốc tế mới.',
        boardFormula: 'sich freuen auf (+ Akk) → darauf, ... zu + Infinitiv',
        boardExamples: [
          { term: 'Sich freuen auf', phonetic: '[dích FROI-ần ao-f]', meaning: 'Mong chờ điều sắp tới' },
          { term: 'Zusammenarbeiten', phonetic: '[tsu-DA-mần-a-bai-tần]', meaning: 'Hợp tác làm việc cùng nhau' }
        ],
        pronunciationTip: 'Với động từ tách "zusammenarbeiten", từ "zu" được chèn vào giữa tiền tố và gốc động từ: "zusammenzuarbeiten".'
      }
    ],
    quiz: {
      question: 'Trong cấu trúc "Je..., desto..." của tiếng Đức B2, vị trí của động từ ở hai vế được sắp xếp như thế nào?',
      options: [
        'Ở vế "Je" động từ đứng cuối mệnh đề; ở vế "desto" động từ đứng ngay sau tính từ so sánh hơn',
        'Cả hai vế động từ đều đứng ở cuối câu',
        'Cả hai vế động từ đều đứng ở đầu câu trước chữ Je và desto',
        'Không chia động từ ở cả hai vế'
      ],
      correctIndex: 0,
      explanation: 'Vế "Je" là mệnh đề phụ (Nebensatz) nên động từ về cuối; vế "desto" là mệnh đề chính (Hauptsatz) nên cụm "desto + Komparativ" chiếm vị trí 1 và động từ đứng ở vị trí 2.'
    },
    shadowing: {
      phrase: 'Je regelmäßiger man spricht, desto flüssiger wird die Aussprache.',
      phonetic: '[yê RÊ-gần-mê-xi-gơ man shprích-t | ĐÉT-xtô FLUY-xi-gơ vía-t đi AO-x-shpra-khơ]',
      vietnamese: 'Càng nói đều đặn bao nhiêu, phát âm càng trở nên lưu loát bấy nhiêu.'
    }
  },
  {
    id: 'vid-de-adv-1',
    languageId: 'german',
    level: 'advanced',
    levelBadge: 'Nâng cao • Goethe C1 / TestDaF',
    cefrCode: 'C1–C2',
    title: 'Bài 3: Văn phong Danh từ hóa (Nominalstil) & Cụm Động-Danh từ C1',
    subtitle: 'Làm chủ Funktionsverbgefüge và cấu trúc học thuật chuẩn đại học Đức (TestDaF TDN 5 / Goethe C1).',
    durationSeconds: 45,
    xpReward: 75,
    instructorId: 'de-hannah',
    segments: [
      {
        id: 'vid-de-a1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Cụm Động-Danh từ Học thuật (Funktionsverbgefüge)',
        gesture: 'pointing',
        targetScript: 'Der technologische Fortschritt leistet einen wesentlichen Beitrag zur Steigerung der Produktivität.',
        phoneticScript: '[đea téc-nô-LÔ-gi-shơ FOÓC-t-shrít LAI-xtợt AI-nần VÊ-dần-lích-ần BAI-trác tsua SHTAI-gơ-rung đea prô-đúc-ti-vi-TẾT]',
        vietnameseSub: 'Tiến bộ công nghệ đóng góp một phần thiết yếu vào việc gia tăng năng suất.',
        boardFormula: 'einen Beitrag leisten zu (+ Dativ) = Đóng góp vào... (Thay cho "beitragen zu")',
        boardExamples: [
          { term: 'Einen Beitrag leisten', phonetic: '[AI-nần BAI-trác LAI-xtần]', meaning: 'Đóng góp (Văn phong C1)' },
          { term: 'Zur Steigerung (+ Genitiv)', phonetic: '[tsua SHTAI-gơ-rung]', meaning: 'Vào sự gia tăng của...' }
        ],
        pronunciationTip: 'Trong kỳ thi TestDaF và Goethe C1, dùng "einen Beitrag leisten" được đánh giá cao hơn hẳn động từ đơn "beitragen".'
      },
      {
        id: 'vid-de-a1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Giới từ Cấp cao đi với Cách 2 (Genitivpräpositionen)',
        gesture: 'explaining',
        targetScript: 'Angesichts des demografischen Wandels müssen Unternehmen innovative Konzepte in Betracht ziehen.',
        phoneticScript: '[AN-gơ-dích-ts đét đê-mô-GRA-fi-shần VAN-đần-x MUY-xần un-tơ-NÊ-mần in-nô-va-TI-vơ côn-TSÉP-tơ in bơ-TRÁC-t TSI-ần]',
        vietnameseSub: 'Trước bối cảnh biến đổi nhân khẩu học, các doanh nghiệp phải cân nhắc những mô hình sáng tạo.',
        boardFormula: 'Angesichts / Aufgrund (+ Genitiv) + in Betracht ziehen (Cân nhắc)',
        boardExamples: [
          { term: 'Angesichts (+ Genitiv)', phonetic: '[AN-gơ-dích-ts]', meaning: 'Trước tình hình / Xét thấy' },
          { term: 'In Betracht ziehen', phonetic: '[in bơ-TRÁC-t TSI-ần]', meaning: 'Đưa vào cân nhắc / xem xét' }
        ],
        pronunciationTip: 'Danh từ giống đực "der Wandel" ở cách 2 (Genitiv) đổi thành "des Wandels".'
      },
      {
        id: 'vid-de-a1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Phân từ Mở rộng (Erweitertes Partizip) C1–C2',
        gesture: 'emphasizing',
        targetScript: 'Die in der Studie gewonnenen Erkenntnisse eröffnen völlig neue Perspektiven für die Forschung.',
        phoneticScript: '[đi in đea SHTU-đi-ơ gơ-VÔ-nơ-nần ea-KEN-ni-xơ ea-ỚP-nần FƠ-lích NOI-ơ péc-xpéc-TI-vần fuya đi FOÓC-shung]',
        vietnameseSub: 'Những phát hiện thu được trong nghiên cứu mở ra những triển vọng hoàn toàn mới cho giới khoa học.',
        boardFormula: 'Mạo từ + [Cụm bổ ngữ + Partizip II] + Danh từ chính',
        boardExamples: [
          { term: 'Gewonnene Erkenntnisse', phonetic: '[gơ-VÔ-nơ-nơ ea-KEN-ni-xơ]', meaning: 'Những nhận thức/phát hiện đạt được' },
          { term: 'Perspektiven eröffnen', phonetic: '[péc-xpéc-TI-vần ea-ỚP-nần]', meaning: 'Mở ra những triển vọng' }
        ],
        pronunciationTip: 'Cụm "Die in der Studie gewonnenen Erkenntnisse" nén toàn bộ mệnh đề quan hệ vào giữa mạo từ "Die" và danh từ "Erkenntnisse".'
      }
    ],
    quiz: {
      question: 'Trong tiếng Đức C1, cụm "einen Beitrag leisten zu" và "in Betracht ziehen" thuộc hiện tượng ngữ pháp học thuật nào?',
      options: [
        'Funktionsverbgefüge (Cụm động-danh từ cố định mang sắc thái trang trọng, học thuật)',
        'Khẩu ngữ vùng miền chỉ dùng trong giao tiếp gia đình',
        'Câu mệnh lệnh rút gọn cho trẻ em',
        'Lỗi lặp từ cần tránh trong văn viết'
      ],
      correctIndex: 0,
      explanation: 'Funktionsverbgefüge kết hợp một động từ chức năng (leisten, ziehen, treffen) với danh từ để tạo sắc thái chuyên môn chuẩn C1–C2.'
    },
    shadowing: {
      phrase: 'Der technologische Fortschritt leistet einen wesentlichen Beitrag zur Produktivität.',
      phonetic: '[đea téc-nô-LÔ-gi-shơ FOÓC-t-shrít LAI-xtợt AI-nần VÊ-dần-lích-ần BAI-trác tsua prô-đúc-ti-vi-TẾT]',
      vietnamese: 'Tiến bộ công nghệ đóng góp một phần thiết yếu vào năng suất.'
    }
  },

  // ==================== 7. SPANISH (Cơ bản -> Trung cấp -> Nâng cao) ====================
  {
    id: 'vid-es-basic-1',
    languageId: 'spanish',
    level: 'basic',
    levelBadge: 'Cơ bản • DELE A1–A2',
    cefrCode: 'A1–A2',
    title: 'Bài 1: Phát âm Tây Ban Nha Chuẩn & Phân biệt Tận gốc SER vs ESTAR',
    subtitle: 'Làm chủ âm rung R/RR, trọng âm tự nhiên và quy tắc bất biến khi dùng hai động từ "To Be" (Ser & Estar).',
    durationSeconds: 45,
    xpReward: 40,
    instructorId: 'es-sofia',
    segments: [
      {
        id: 'vid-es-b1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Chào hỏi & Quy tắc Dùng SER (Bản chất / Nghề nghiệp)',
        gesture: 'welcoming',
        targetScript: '¡Hola a todos! Bienvenidos a nuestra clase virtual. Yo soy Sofía y soy profesora de español.',
        phoneticScript: '[Ô-la a TÔ-đốt | bi-ên-bê-NI-đốt a NUẾT-xtra CLA-xê biệc-TUAN | yô xôi Xô-FI-a y xôi prô-fê-XÔ-ra đê ét-xpa-NHÔN]',
        vietnameseSub: 'Xin chào tất cả mọi người! Chào mừng đến với lớp học ảo của chúng ta. Tôi là Sofía và tôi là giảng viên tiếng Tây Ban Nha.',
        boardFormula: 'SER (soy, eres, es, somos, sois, son) → Định danh, Quốc tịch, Nghề nghiệp',
        boardExamples: [
          { term: 'Yo soy profesora', phonetic: '[yô xôi prô-fê-XÔ-ra]', meaning: 'Tôi là nữ giảng viên (Nghề nghiệp)' },
          { term: 'Bienvenidos', phonetic: '[bi-ên-bê-NI-đốt]', meaning: 'Chào mừng các bạn' }
        ],
        pronunciationTip: 'Trong tiếng Tây Ban Nha, hai chữ "b" và "v" có cách phát âm hoàn toàn giống nhau ([b]).'
      },
      {
        id: 'vid-es-b1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Khi nào dùng ESTAR (Trạng thái & Vị trí)',
        gesture: 'pointing',
        targetScript: 'Hoy estoy muy contenta porque estamos aprendiendo juntos en este estudio interactivo.',
        phoneticScript: '[ôi ét-XTÔI mui côn-TÊN-ta poóc-KÊ ét-XTA-mốt a-prên-ĐI-ÊN-đô KHUN-tốt...]',
        vietnameseSub: 'Hôm nay tôi rất vui vì chúng ta đang cùng nhau học tập trong trường quay tương tác này.',
        boardFormula: 'ESTAR (estoy, estás, está, estamos...) → Cảm xúc tạm thời, Vị trí & Thì tiếp diễn',
        boardExamples: [
          { term: 'Estoy muy contenta', phonetic: '[ét-XTÔI mui côn-TÊN-ta]', meaning: 'Tôi đang rất vui (Trạng thái cảm xúc)' },
          { term: 'Estamos aprendiendo', phonetic: '[ét-XTA-mốt a-prên-ĐI-ÊN-đô]', meaning: 'Chúng ta đang học (Estar + Gerundio)' }
        ],
        pronunciationTip: 'Chữ "h" trong "hoy" luôn là âm câm ([ôi]), còn chữ "j" trong "juntos" phát âm khàn nhẹ từ cuống họng ([kh]).'
      },
      {
        id: 'vid-es-b1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Cấu trúc Dự định Ir a + Infinitivo',
        gesture: 'emphasizing',
        targetScript: 'Ahora vamos a practicar la pronunciación con frases útiles para viajar.',
        phoneticScript: '[a-Ô-ra BA-mốt a prắc-ti-CAR la prô-nun-xi-a-XI-ÔN côn FRA-xết U-ti-lết PA-ra bi-a-KHAR]',
        vietnameseSub: 'Bây giờ chúng ta sẽ luyện phát âm với những mẫu câu hữu ích để đi du lịch.',
        boardFormula: 'Ir (voy, vas, va, vamos...) + a + Động từ nguyên mẫu = Sẽ làm gì',
        boardExamples: [
          { term: 'Vamos a practicar', phonetic: '[BA-mốt a prắc-ti-CAR]', meaning: 'Chúng ta sẽ luyện tập' },
          { term: 'Frases útiles', phonetic: '[FRA-xết U-ti-lết]', meaning: 'Những câu hữu ích' }
        ],
        pronunciationTip: 'Từ có dấu sắc như "útiles" luôn nhấn trọng âm ngay tại nguyên âm có dấu sắc ([U-ti-lết]).'
      }
    ],
    quiz: {
      question: 'Trong tiếng Tây Ban Nha, sự khác biệt cốt lõi giữa động từ "SER" và "ESTAR" là gì?',
      options: [
        'SER chỉ bản chất, định danh, nghề nghiệp, quốc tịch; còn ESTAR chỉ vị trí, cảm xúc tạm thời và hành động đang diễn ra',
        'SER chỉ dùng cho câu phủ định, còn ESTAR chỉ dùng cho câu khẳng định',
        'Hai động từ hoàn toàn giống nhau và có thể thay thế tự do trong mọi câu',
        'SER chỉ dùng cho ngôi thứ nhất, còn ESTAR dùng cho ngôi thứ ba'
      ],
      correctIndex: 0,
      explanation: 'Quy tắc vàng: SER = Bản chất cố định/Định danh (Soy profesora); ESTAR = Trạng thái/Cảm xúc/Vị trí/Tiếp diễn (Estoy contenta / Estamos aprendiendo).'
    },
    shadowing: {
      phrase: 'Hoy estoy muy contenta porque estamos aprendiendo juntos.',
      phonetic: '[ôi ét-XTÔI mui côn-TÊN-ta poóc-KÊ ét-XTA-mốt a-prên-ĐI-ÊN-đô KHUN-tốt]',
      vietnamese: 'Hôm nay tôi rất vui vì chúng ta đang cùng nhau học tập.'
    }
  },
  {
    id: 'vid-es-inter-1',
    languageId: 'spanish',
    level: 'intermediate',
    levelBadge: 'Trung cấp • DELE B1–B2',
    cefrCode: 'B1–B2',
    title: 'Bài 2: Quá khứ Indefinido vs Imperfecto & Khởi đầu với Thức Giả định (Subjuntivo)',
    subtitle: 'Cách kể lại trải nghiệm quá khứ tự nhiên và bày tỏ mong muốn, lời khuyên ở trình độ B1–B2.',
    durationSeconds: 45,
    xpReward: 55,
    instructorId: 'es-mateo',
    segments: [
      {
        id: 'vid-es-i1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Phối hợp Imperfecto (Bối cảnh) & Indefinido (Hành động)',
        gesture: 'explaining',
        targetScript: 'Cuando vivía en Madrid, conocí a muchos profesionales internacionales del sector tecnológico.',
        phoneticScript: '[CUAN-đô bi-BI-a ên Ma-ĐRÍT | cô-nô-XI a MU-chốt prô-fê-xi-ô-NA-lết...]',
        vietnameseSub: 'Khi tôi còn sống ở Madrid, tôi đã làm quen với nhiều chuyên gia quốc tế trong lĩnh vực công nghệ.',
        boardFormula: 'Imperfecto (vivía - bối cảnh kéo dài) + Indefinido (conocí - sự kiện xác định)',
        boardExamples: [
          { term: 'Cuando vivía', phonetic: '[CUAN-đô bi-BI-a]', meaning: 'Khi tôi từng sống (Imperfecto)' },
          { term: 'Conocí a...', phonetic: '[cô-nô-XI a]', meaning: 'Tôi đã gặp/quen (Indefinido)' }
        ],
        pronunciationTip: 'Khi tân ngữ trực tiếp là người ("muchos profesionales"), luôn phải có giới từ "a" đứng trước (a personal).'
      },
      {
        id: 'vid-es-i1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Đưa ra Lời khuyên với Es recomendable que + Subjuntivo',
        gesture: 'pointing',
        targetScript: 'Es fundamental que escuches diversos acentos hispanos para mejorar tu comprensión auditiva.',
        phoneticScript: '[ết fun-đa-mên-TAN kê ét-XCU-chết đi-BÉC-xốt a-XÊN-tốt ít-XPA-nốt...]',
        vietnameseSub: 'Điều cốt yếu là bạn hãy nghe nhiều giọng Tây Ban Nha khác nhau để cải thiện kỹ năng nghe hiểu.',
        boardFormula: 'Es fundamental / importante que + Chủ ngữ + Động từ chia ở Subjuntivo',
        boardExamples: [
          { term: 'Es fundamental que escuches', phonetic: '[kê ét-XCU-chết]', meaning: 'Điều cốt yếu là bạn nghe (Subjuntivo)' },
          { term: 'Comprensión auditiva', phonetic: '[côm-prên-XI-ÔN au-đi-TI-ba]', meaning: 'Kỹ năng nghe hiểu' }
        ],
        pronunciationTip: 'Động từ nhóm -AR ("escuchar") khi sang Subjuntivo sẽ đổi nguyên âm đuôi từ -a sang -e ("escuches").'
      },
      {
        id: 'vid-es-i1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Mệnh đề Thời gian Tương lai Cuando + Subjuntivo',
        gesture: 'emphasizing',
        targetScript: 'Cuando domines estas estructuras, podrás comunicarte con total fluidez en cualquier reunión.',
        phoneticScript: '[CUAN-đô đô-MI-nết ÉT-xtát ét-xtrúc-TU-rát | pô-ĐRÁT cô-mu-ni-CAR-tê côn tô-TAN flui-ĐẾT]',
        vietnameseSub: 'Khi bạn làm chủ được những cấu trúc này, bạn sẽ có thể giao tiếp hoàn toàn lưu loát trong bất kỳ cuộc họp nào.',
        boardFormula: 'Cuando + Subjuntivo (chỉ tương lai), + Futuro Simple (podrás)',
        boardExamples: [
          { term: 'Cuando domines', phonetic: '[CUAN-đô đô-MI-nết]', meaning: 'Khi bạn làm chủ (Subjuntivo tương lai)' },
          { term: 'Con total fluidez', phonetic: '[côn tô-TAN flui-ĐẾT]', meaning: 'Hoàn toàn trôi chảy / lưu loát' }
        ],
        pronunciationTip: 'Trong tiếng Tây Ban Nha, sau "Cuando" chỉ hành động chưa xảy ra ở tương lai, bắt buộc dùng Subjuntivo ("domines") chứ không dùng thì tương lai đơn.'
      }
    ],
    quiz: {
      question: 'Trong tiếng Tây Ban Nha B1–B2, khi mệnh đề "Cuando..." diễn tả một sự việc sẽ xảy ra trong tương lai ("Khi bạn làm chủ cấu trúc này..."), động từ sau "Cuando" phải chia ở thì/thức nào?',
      options: [
        'Presente de Subjuntivo ("Cuando domines estas estructuras...")',
        'Futuro Simple ("Cuando dominarás...")',
        'Pretérito Indefinido ("Cuando dominaste...")',
        'Động từ nguyên mẫu không chia ("Cuando dominar...")'
      ],
      correctIndex: 0,
      explanation: 'Khi "Cuando" hướng về tương lai, tiếng Tây Ban Nha bắt buộc chia động từ ở Presente de Subjuntivo (domines, llegues, tengas).'
    },
    shadowing: {
      phrase: 'Cuando domines estas estructuras, podrás comunicarte con total fluidez.',
      phonetic: '[CUAN-đô đô-MI-nết ÉT-xtát ét-xtrúc-TU-rát | pô-ĐRÁT cô-mu-ni-CAR-tê côn tô-TAN flui-ĐẾT]',
      vietnamese: 'Khi bạn làm chủ được những cấu trúc này, bạn sẽ có thể giao tiếp hoàn toàn lưu loát.'
    }
  },
  {
    id: 'vid-es-adv-1',
    languageId: 'spanish',
    level: 'advanced',
    levelBadge: 'Nâng cao • DELE C1–C2',
    cefrCode: 'C1–C2',
    title: 'Bài 3: Hùng biện Học thuật DELE C1–C2 & Giả định Quá khứ (Imperfecto de Subjuntivo)',
    subtitle: 'Làm chủ câu điều kiện giả định và liên từ nhượng bộ cao cấp (Por más que, A pesar de que).',
    durationSeconds: 45,
    xpReward: 75,
    instructorId: 'es-sofia',
    segments: [
      {
        id: 'vid-es-a1-s1',
        startTime: 0,
        endTime: 15,
        chapterTitle: '1. Câu Điều kiện Giả định Si + Imperfecto de Subjuntivo',
        gesture: 'pointing',
        targetScript: 'Si las empresas invirtieran más en formación continua, la productividad aumentaría considerablemente.',
        phoneticScript: '[xi lát êm-PRÊ-xát in-biệc-TI-Ê-ran mát ên foóc-ma-XI-ÔN côn-TI-nua | la prô-đúc-ti-bi-ĐÁT au-mên-ta-RI-a...]',
        vietnameseSub: 'Nếu các doanh nghiệp đầu tư nhiều hơn vào đào tạo liên tục, năng suất sẽ tăng lên đáng kể.',
        boardFormula: 'Si + Imperfecto de Subjuntivo (-ra/-se), + Condicional Simple (-ía)',
        boardExamples: [
          { term: 'Si invirtieran', phonetic: '[xi in-biệc-TI-Ê-ran]', meaning: 'Nếu họ đầu tư (Giả định)' },
          { term: 'Formación continua', phonetic: '[foóc-ma-XI-ÔN côn-TI-nua]', meaning: 'Đào tạo liên tục' }
        ],
        pronunciationTip: 'Động từ "invertir" ở Imperfecto de Subjuntivo biến đổi nguyên âm gốc thành "invirtieran".'
      },
      {
        id: 'vid-es-a1-s2',
        startTime: 15,
        endTime: 30,
        chapterTitle: '2. Nhượng bộ Cao cấp với Por más que + Subjuntivo',
        gesture: 'explaining',
        targetScript: 'Por más que avance la automatización, la empatía humana seguirá siendo insustituible.',
        phoneticScript: '[poóc mát kê a-BAN-xê la au-tô-ma-ti-xa-XI-ÔN | la êm-pa-TI-a u-MA-na xê-ghi-RA xi-ÊN-đô in-xút-xti-TUI-blê]',
        vietnameseSub: 'Cho dù tự động hóa có tiến xa đến đâu đi nữa, sự thấu cảm của con người vẫn sẽ luôn là điều không thể thay thế.',
        boardFormula: 'Por más que / Por mucho que + Subjuntivo = Cho dù... đến đâu đi nữa',
        boardExamples: [
          { term: 'Por más que avance', phonetic: '[poóc mát kê a-BAN-xê]', meaning: 'Cho dù có tiến bộ đến đâu' },
          { term: 'Insustituible', phonetic: '[in-xút-xti-TUI-blê]', meaning: 'Không thể thay thế được' }
        ],
        pronunciationTip: 'Cấu trúc "seguir + gerundio" ("seguirá siendo") diễn tả một bản chất tiếp diễn bền vững.'
      },
      {
        id: 'vid-es-a1-s3',
        startTime: 30,
        endTime: 45,
        chapterTitle: '3. Kết luận Nghị luận DELE C1–C2',
        gesture: 'emphasizing',
        targetScript: 'En definitiva, cabe destacar la importancia de fomentar un diálogo intercultural constructivo.',
        phoneticScript: '[ên đê-fi-ni-TI-ba | CA-bê đét-xta-CAR la im-poóc-TAN-xi-a đê fô-mên-TAR un ĐI-A-lô-gô...]',
        vietnameseSub: 'Tóm lại, cần nhấn mạnh tầm quan trọng của việc thúc đẩy đối thoại liên văn hóa mang tính xây dựng.',
        boardFormula: 'Cabe destacar / Conviene subrayar + [Danh từ / Infinitivo] (Cần nhấn mạnh rằng...)',
        boardExamples: [
          { term: 'Cabe destacar', phonetic: '[CA-bê đét-xta-CAR]', meaning: 'Cần nhấn mạnh (Văn phong C1–C2)' },
          { term: 'Fomentar un diálogo', phonetic: '[fô-mên-TAR un ĐI-A-lô-gô]', meaning: 'Thúc đẩy đối thoại' }
        ],
        pronunciationTip: 'Cụm "Cabe destacar" là dấu hiệu đặc trưng của bài thuyết trình học thuật DELE C1–C2.'
      }
    ],
    quiz: {
      question: 'Trong câu điều kiện không có thật ở hiện tại của tiếng Tây Ban Nha C1 ("Si las empresas invirtieran más..., la productividad aumentaría"), hai mệnh đề được chia như thế nào?',
      options: [
        'Si + Imperfecto de Subjuntivo (-ra/-se), mệnh đề chính chia ở Condicional Simple (-ía)',
        'Si + Presente de Indicativo, mệnh đề chính chia ở Imperativo',
        'Cả hai mệnh đề đều chia ở thì quá khứ đơn Indefinido',
        'Si + Condicional Simple, mệnh đề chính chia ở nguyên mẫu'
      ],
      correctIndex: 0,
      explanation: 'Câu điều kiện loại 2 trong tiếng Tây Ban Nha luôn tuân theo công thức: Si + Imperfecto de Subjuntivo (invirtieran), + Condicional Simple (aumentaría).'
    },
    shadowing: {
      phrase: 'Por más que avance la automatización, la empatía humana seguirá siendo insustituible.',
      phonetic: '[poóc mát kê a-BAN-xê la au-tô-ma-ti-xa-XI-ÔN | la êm-pa-TI-a u-MA-na xê-ghi-RA xi-ÊN-đô in-xút-xti-TUI-blê]',
      vietnamese: 'Cho dù tự động hóa có tiến xa đến đâu đi nữa, sự thấu cảm của con người vẫn sẽ luôn là điều không thể thay thế.'
    }
  }
];
