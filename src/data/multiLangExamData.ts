import { ExamQuestion, WritingModelPrompt, SpeakingCueCard, IeltsTestSet } from './curriculum';

export interface LanguageExamMetadata {
  languageId: string;
  examShortName: string;
  examFullTitle: string;
  examAuthority: string;
  targetBadge: string;
  scoreScaleLabel: string;
  passingCriteria: string;
  maxScorePerSkill: number;
  totalMaxScore: number;
  skillLabels: {
    id: string;
    label: string;
    maxScore: number;
  }[];
  extraQuestions: ExamQuestion[];
  writingPrompts: WritingModelPrompt[];
  speakingCueCards: SpeakingCueCard[];
  testSets: IeltsTestSet[];
}

export const MULTI_LANG_EXAM_METADATA: Record<string, LanguageExamMetadata> = {
  chinese: {
    languageId: 'chinese',
    examShortName: 'HSK & HSKK',
    examFullTitle: 'Kỳ Thi Năng Lực Hán Ngữ Quốc Tế (HSK 4–5 & HSKK Trung/Cao Cấp)',
    examAuthority: 'Chinese Testing International (CTI / Hanban - Bộ Giáo dục Trung Quốc)',
    targetBadge: 'HSK 4 - HSK 5 (180–300 điểm)',
    scoreScaleLabel: 'Thang điểm 300 (Nghe 100 · Đọc 100 · Viết 100)',
    passingCriteria: 'Đạt từ 180/300 điểm trở lên (Mỗi kỹ năng tối đa 100 điểm)',
    maxScorePerSkill: 100,
    totalMaxScore: 300,
    skillLabels: [
      { id: 'listening', label: 'Nghe hiểu (听力 - Tīnglì)', maxScore: 100 },
      { id: 'reading', label: 'Đọc hiểu (阅读 - Yuèdú)', maxScore: 100 },
      { id: 'writing', label: 'Viết (书写 - Shūxiě)', maxScore: 100 },
    ],
    testSets: [
      {
        id: 'HSK4-OFFICIAL-01',
        code: 'HSK4-H41001',
        title: 'Đề Thi Thật HSK 4 & HSKK Trung Cấp - Bộ Đề Chuẩn Bắc Kinh #1',
        year: '2025',
        edition: 'CTI Official Test',
        difficulty: 'Tiêu chuẩn (Band 6.0-7.0)',
        description: 'Bao gồm Nghe hiểu hội thoại công sở, Đọc hiểu đoạn văn chữ Hán, Sắp xếp câu chữ 把/被 và Viết đoạn văn HSK 4–5.',
        targetBand: 'HSK 4 (240+/300)',
        estimatedTimeMinutes: 35,
        tags: ['HSK 4', 'Chữ 把', 'Âm Hán Việt'],
        questions: []
      },
      {
        id: 'HSK5-OFFICIAL-02',
        code: 'HSK5-H51002',
        title: 'Đề Thi Thật HSK 5 Học Bổng Chính Phủ CSC - Bộ Đề Nâng Cao #2',
        year: '2025',
        edition: 'Hanban CSC Edition',
        difficulty: 'Nâng cao (Band 7.0-8.0)',
        description: 'Tập trung từ vựng thương mại, thành ngữ 4 chữ (Chengyu), đọc hiểu nghị luận và viết luận 80 chữ.',
        targetBand: 'HSK 5 (220+/300)',
        estimatedTimeMinutes: 45,
        tags: ['HSK 5', 'Thương mại', 'Học bổng CSC'],
        questions: []
      }
    ],
    extraQuestions: [
      {
        id: 'zh-q-listen-1',
        skill: 'listening',
        sectionOrPart: 'HSK 4 - 听力 Phần 1',
        question: 'Nghe đoạn hội thoại sau và chọn đáp án đúng: Người phụ nữ có ý gì về buổi phỏng vấn?',
        audioScript: '男：听说你昨天去那家跨国公司面试了，结果怎么样？ 女：别提了，本来准备得很充分，结果因为堵车迟到了二十分钟，印象分全没了。 问：关于女的，可以知道什么？',
        passage: '男：听说你昨天去那家跨国公司面试了，结果怎么样？\n女：别提了，本来准备得很充分，结果因为堵车迟到了二十分钟，印象分全没了。\n(Nán: Tīngshuō nǐ zuótiān qù nà jiā kuàguó gōngsī miànshì le, jiéguǒ zěnmeyàng?\nNǚ: Bié tí le, běnlái zhǔnbèi de hěn chōngfèn, jiéguǒ yīnwèi dǔchē chídào le èrshí fēnzhōng, yìnxiàngfēn quán méi le.)',
        options: [
          'Cô ấy đi muộn 20 phút do tắc đường nên mất điểm ấn tượng.',
          'Cô ấy chưa chuẩn bị kỹ trước khi đi phỏng vấn.',
          'Cô ấy đã trúng tuyển vào tập đoàn đa quốc gia.',
          'Buổi phỏng vấn bị dời sang ngày mai.'
        ],
        correctAnswer: 'Cô ấy đi muộn 20 phút do tắc đường nên mất điểm ấn tượng.',
        explanationInVietnamese: 'Từ khóa quan trọng: "本来准备得很充分" (vốn dĩ chuẩn bị rất kỹ), nhưng "因为堵车迟到了二十分钟" (vì tắc đường nên muộn 20 phút), làm mất sạch điểm ấn tượng ("印象分全没了").',
        bandTarget: 'HSK 4',
        trapAnalysis: 'Bẫy đề HSK hay nhắc đến "准备得很充分" (chuẩn bị kỹ) ở đầu câu để đánh lừa thí sinh hấp tấp chọn phương án tích cực, nhưng kết quả thật sự nằm sau từ "结果" (kết quả là).'
      },
      {
        id: 'zh-q-listen-2',
        skill: 'listening',
        sectionOrPart: 'HSK 5 - 听力 Phần 2',
        question: 'Nghe thông báo và cho biết: Tại sao chuyến bay đi Thượng Hải bị hoãn?',
        audioScript: '各位旅客请注意，您所乘坐的飞往上海的CA185航班，由于目的地突降暴雨，不得不推迟起飞时间，具体登机时间请留意广播通知。',
        passage: '各位旅客请注意，您所乘坐的飞往上海的CA185航班，由于目的地突降暴雨，不得不推迟起飞时间。\n(Gèwèi lǚkè qǐng zhùyì, nín suǒ chéngzuò de fēiwǎng Shànghǎi de CA185 hángbān, yóuyú mùdìdì tū jiàng bàoyǔ, bùdébù tuīchí qǐfēi shíjiān.)',
        options: [
          'Do thời tiết mưa bão bất ngờ tại sân bay điểm đến (Thượng Hải).',
          'Do máy bay gặp sự cố kỹ thuật cần bảo dưỡng.',
          'Do phi hành đoàn đến trễ giờ quy định.',
          'Chuyến bay đã bị hủy hoàn toàn.'
        ],
        correctAnswer: 'Do thời tiết mưa bão bất ngờ tại sân bay điểm đến (Thượng Hải).',
        explanationInVietnamese: 'Cụm từ "由于目的地突降暴雨" (do điểm đến bất ngờ đổ mưa lớn/bão) và "不得不推迟起飞时间" (buộc phải hoãn giờ cất cánh).',
        bandTarget: 'HSK 5',
        trapAnalysis: 'Phân biệt giữa "推迟" (tuīchí - hoãn lại) và "取消" (qǔxiāo - hủy bỏ).'
      },
      {
        id: 'zh-q-read-1',
        skill: 'reading',
        sectionOrPart: 'HSK 4 - 阅读 Phần 2',
        question: 'HSK 4 Đọc hiểu: "虽然这次比赛我们没有拿到第一名，但是大家学到了很多宝贵的经验。"',
        passage: '虽然这次比赛我们没有拿到第一名，但是大家学到了很多宝贵的经验。(Suīrán zhè cì bǐsài wǒmen méiyǒu nádào dì-yī míng, dànshì dàjiā xuédàole hěnduō bǎoguì de jīngyàn.)',
        options: [
          'Tuy không đạt giải nhất nhưng cả đội đã tích lũy được nhiều kinh nghiệm quý báu.',
          'Cả đội đã giành giải nhất và rất tự hào.',
          'Trận đấu bị hoãn do thời tiết xấu.',
          'Mọi người đều thất vọng và không học được gì.'
        ],
        correctAnswer: 'Tuy không đạt giải nhất nhưng cả đội đã tích lũy được nhiều kinh nghiệm quý báu.',
        explanationInVietnamese: 'Cặp liên từ chỉ sự nhượng bộ kinh điển trong HSK: "虽然...但是..." (Tuy... nhưng...). "宝贵的经验" (Bǎoguì de jīngyàn) nghĩa là "kinh nghiệm quý báu".',
        bandTarget: 'HSK 4'
      },
      {
        id: 'zh-q-read-2',
        skill: 'reading',
        sectionOrPart: 'HSK 5 - 阅读 Phần 1',
        question: 'HSK 5 Từ vựng: "经过双方的友好协商，我们终于______了合作意向书。"',
        passage: '经过双方的友好协商，我们终于______了合作意向书。(Jīngguò shuāngfāng de yǒuhǎo xiéshāng, wǒmen zhōngyú ______ le hézuò yìxiàngshū.)',
        options: ['签署 (qiānshǔ)', '签字 (qiānzì)', '写作 (xiězuò)', '登记 (dēngjì)'],
        correctAnswer: '签署 (qiānshǔ)',
        explanationInVietnamese: '"签署" (qiānshǔ - Ký kết) là từ trang trọng chuyên dùng với văn bản pháp lý, hợp đồng, thỏa thuận (签署合同/协议/意向书). Trong khi "签字" mang tính khẩu ngữ thông thường hơn.',
        bandTarget: 'HSK 5'
      },
      {
        id: 'zh-q-write-1',
        skill: 'writing',
        sectionOrPart: 'HSK 4 - 书写 Phần 1 (Sắp xếp câu)',
        question: 'HSK 4 Sắp xếp câu: Chọn thứ tự đúng cho cấu trúc chữ "把": [我已经] [把这份合同] [仔细检查了] [一遍]',
        options: [
          '我已经把这份合同仔细检查了一遍。',
          '我把已经仔细检查了一遍这份合同。',
          '仔细检查了一遍我已经把这份合同。',
          '合同我已经把仔细检查了一遍。'
        ],
        correctAnswer: '我已经把这份合同仔细检查了一遍。',
        explanationInVietnamese: 'Công thức câu chữ 把 chuẩn mực: Chủ ngữ (我) + Trạng từ/Phó từ (已经) + 把 + Tân ngữ chịu tác động (这份合同) + Động từ (仔细检查) + Bổ ngữ (了一遍).',
        bandTarget: 'HSK 4'
      },
      {
        id: 'zh-q-speak-1',
        skill: 'speaking',
        sectionOrPart: 'HSKK Trung Cấp - Phản Xạ Nói',
        question: 'Trong phần thi nói HSKK Trung Cấp, cách diễn đạt nào sau đây dùng cấu trúc liên từ học thuật tự nhiên nhất để trình bày 2 mặt của làm việc từ xa?',
        audioScript: '一方面，远程办公能节省通勤时间；另一方面，它也需要员工具有高度的自律性。',
        options: [
          '一方面，远程办公能节省通勤时间；另一方面，它也需要员工具有高度的自律性。',
          '远程办公好，但是也不好，我不喜欢。',
          '因为远程办公节省时间，所以大家不去公司。',
          '在家工作比公司工作更累一点儿。'
        ],
        correctAnswer: '一方面，远程办公能节省通勤时间；另一方面，它也需要员工具有高度的自律性。',
        explanationInVietnamese: 'Cấu trúc "一方面... 另一方面..." (Một mặt... mặt khác...) kết hợp với từ vựng HSK 5 như "通勤时间" (thời gian đi làm) và "自律性" (tính tự giác) giúp bài nói HSKK đạt điểm tối đa.',
        bandTarget: 'HSKK Trung/Cao cấp'
      }
    ],
    writingPrompts: [
      {
        id: 'zh-wp-1',
        taskType: 'Task 2',
        title: 'HSK 5 书写 Phần 2: Viết đoạn văn 80 chữ kết hợp 5 từ cho sẵn',
        prompt: 'Hãy sử dụng 5 từ bắt buộc sau đây để viết một đoạn văn khoảng 80 chữ Hán về chủ đề Bảo vệ môi trường & Phát triển bền vững: 【环境 (huánjìng)】【保护 (bǎohù)】【不仅 (bùjǐn)】【责任 (zérèn)】【未来 (wèilái)】',
        bandScore: 'HSK 5 (95/100 điểm)',
        modelAnswer: '随着经济的快速发展，环境污染问题日益严重。保护大自然不仅是政府的责任，也是我们每一个公民的义务。在日常生活中，我们应该养成节约用水、减少使用塑料袋的好习惯。只有大家共同努力，才能创造一个绿色、美好的未来。',
        outline: [
          { point: 'Mở đoạn: Nêu thực trạng với từ 环境 (môi trường)', explanation: '随着经济的快速发展，环境污染问题日益严重。(Cùng với sự phát triển nhanh của kinh tế, vấn đề ô nhiễm môi trường ngày càng nghiêm trọng.)' },
          { point: 'Thân đoạn: Dùng cấu trúc 不仅...也... cùng 保护 và 责任', explanation: '保护大自然不仅是政府的责任，也是我们每一个公民的义务。(Bảo vệ thiên nhiên không chỉ là trách nhiệm của chính phủ mà còn là nghĩa vụ của mỗi công dân.)' },
          { point: 'Kết đoạn: Kêu gọi hành động hướng tới 未来 (tương lai)', explanation: '只有大家共同努力，才能创造一个绿色、美好的未来。(Chỉ khi mọi người cùng nỗ lực mới tạo dựng được tương lai xanh tươi đẹp.)' }
        ],
        keyVocabulary: [
          { word: '日益严重 (rìyì yánzhòng)', meaning: 'Ngày càng nghiêm trọng', phonetic: 'rì yì yán zhòng' },
          { word: '公民的义务 (gōngmín de yìwù)', meaning: 'Nghĩa vụ của người công dân', phonetic: 'gōng mín de yì wù' },
          { word: '共同努力 (gòngtóng nǔlì)', meaning: 'Cùng nhau chung sức nỗ lực', phonetic: 'gòng tóng nǔ lì' }
        ],
        examinerComment: 'Bài viết sử dụng đầy đủ và chính xác cả 5 từ khóa yêu cầu, kết hợp mượt mà cặp liên từ "不仅...也..." và "只有...才...", đạt điểm tối đa phần viết HSK 5.'
      }
    ],
    speakingCueCards: [
      {
        id: 'zh-sc-1',
        part: 2,
        topic: 'HSKK Trung Cấp: 谈谈你最难忘的一次旅行 (Kể về chuyến du lịch đáng nhớ nhất)',
        cueCardPrompt: '请谈谈你最难忘的一次旅行经历。你去了哪里？和谁一起去的？为什么那次旅行让你印象深刻？(Hãy kể về chuyến du lịch đáng nhớ nhất của bạn trong 2 phút.)',
        bulletPoints: [
          'Nêu địa điểm và thời gian chuyến đi (Ví dụ: 去年夏天我去云南旅行)',
          'Miêu tả cảnh sắc và ẩm thực địa phương (风景优美、当地特色美食)',
          'Bài học hoặc kỷ niệm sâu sắc nhất (拓宽了视野、加深了友谊)'
        ],
        bandScore: 'HSKK Trung Cấp (88/100)',
        modelAnswer: '让我印象最深刻的一次旅行是去年秋天，我和大学朋友们一起去了越南的岘港和会安古镇。那里的风景非常迷人，古老的街道上挂满了五颜六色的灯笼。我们不仅品尝了地道的高楼面，还和当地人热情地交流。这次旅行不仅让我放松了身心，也让我深刻体会到了传统文化的魅力。',
        idiomaticExpressions: [
          { phrase: '五颜六色 (wǔ yán liù sè)', meaning: 'Đầy màu sắc rực rỡ' },
          { phrase: '放松身心 (fàngsōng shēnxīn)', meaning: 'Thư giãn cả thể chất lẫn tinh thần' },
          { phrase: '拓宽视野 (tuòkuān shìyě)', meaning: 'Mở rộng tầm nhìn' }
        ]
      }
    ]
  },

  japanese: {
    languageId: 'japanese',
    examShortName: 'JLPT',
    examFullTitle: 'Kỳ Thi Năng Lực Nhật Ngữ Quốc Tế (JLPT N3 – N2 – N1)',
    examAuthority: 'Japan Foundation & JEES (Hiệp hội Hỗ trợ Giáo dục Quốc tế Nhật Bản)',
    targetBadge: 'JLPT N2 / N3 (90–180 điểm)',
    scoreScaleLabel: 'Thang điểm 180 (Từ vựng & Ngữ pháp 60 · Đọc hiểu 60 · Nghe hiểu 60)',
    passingCriteria: 'Tổng điểm ≥ 90/180 (N2) hoặc ≥ 95/180 (N3), và KHÔNG phần nào bị điểm liệt dưới 19/60',
    maxScorePerSkill: 60,
    totalMaxScore: 180,
    skillLabels: [
      { id: 'vocab_grammar', label: 'Kiến thức ngôn ngữ: Từ vựng & Ngữ pháp (言語知識)', maxScore: 60 },
      { id: 'reading', label: 'Đọc hiểu (読解 - Dokkai)', maxScore: 60 },
      { id: 'listening', label: 'Nghe hiểu (聴解 - Choukai)', maxScore: 60 },
    ],
    testSets: [
      {
        id: 'JLPT-N2-OFFICIAL-01',
        code: 'JLPT-N2-2025A',
        title: 'Đề Thi Thật JLPT N2 Chuẩn Japan Foundation - Kỳ Thi Tháng 7',
        year: '2025',
        edition: 'JEES Official Format',
        difficulty: 'Nâng cao (Band 7.0-8.0)',
        description: 'Tập trung Ngữ pháp N2, Kính ngữ thương mại (Sonkeigo / Kenjougo), Đọc hiểu bài bình luận trung văn và Nghe hiểu phản xạ tức thì (即时応答).',
        targetBand: 'JLPT N2 (125+/180)',
        estimatedTimeMinutes: 40,
        tags: ['JLPT N2', 'Kính ngữ Keigo', 'Dokkai'],
        questions: []
      },
      {
        id: 'JLPT-N3-OFFICIAL-02',
        code: 'JLPT-N3-2025B',
        title: 'Đề Thi Thật JLPT N3 Thực Chiến Giao Tiếp & Công Sở Nhật Bản',
        year: '2025',
        edition: 'JEES Official Format',
        difficulty: 'Tiêu chuẩn (Band 6.0-7.0)',
        description: 'Ôn luyện toàn diện chữ Hán N3, từ láy擬音語, đọc email nội bộ công ty Nhật và nghe hiểu nhiệm vụ (課題理解).',
        targetBand: 'JLPT N3 (130+/180)',
        estimatedTimeMinutes: 35,
        tags: ['JLPT N3', 'Kanji', 'Choukai'],
        questions: []
      }
    ],
    extraQuestions: [
      {
        id: 'ja-q-listen-1',
        skill: 'listening',
        sectionOrPart: 'JLPT N2 - 聴解 (Nghe hiểu nhiệm vụ)',
        question: 'Nghe đoạn hội thoại tại văn phòng Nhật Bản: Sau cuộc trò chuyện này, nhân viên nam phải làm việc gì ĐẦU TIÊN?',
        audioScript: '女：山田さん、明日の会議の資料、もう印刷してくれた？ 男：あ、すみません、今からやるところです。 女：じゃあ、印刷する前に、3ページのグラフの数字が最新かどうか、もう一度課長に確認してもらえる？ 男：わかりました。すぐに行ってきます。',
        passage: '女：山田さん、明日の会議の資料、もう印刷してくれた？\n男：あ、すみません、今からやるところです。\n女：じゃあ、印刷する前に、3ページのグラフの数字が最新かどうか、もう一度課長に確認してもらえる？\n男：わかりました。すぐに行ってきます。',
        options: [
          'Gặp Trưởng phòng (Kachou) để xác nhận lại số liệu biểu đồ trang 3.',
          'In ngay tài liệu cuộc họp ngày mai ra giấy.',
          'Gửi email tài liệu cho khách hàng.',
          'Đặt phòng họp cho buổi sáng ngày mai.'
        ],
        correctAnswer: 'Gặp Trưởng phòng (Kachou) để xác nhận lại số liệu biểu đồ trang 3.',
        explanationInVietnamese: 'Chú ý cụm "印刷する前に" (trước khi in): Người sếp nữ dặn trước khi in tài liệu thì phải nhờ Trưởng phòng xác nhận lại số liệu biểu đồ trang 3 đã cập nhật mới nhất chưa ("課長に確認してもらえる？").',
        bandTarget: 'JLPT N2',
        trapAnalysis: 'Bẫy kinh điển của JLPT Choukai: Hành động được nhắc đến đầu tiên ("印刷" - in ấn) lại là việc làm SAU, còn việc phải làm TRƯỚC nằm sau cụm "～する前に" (trước khi...).'
      },
      {
        id: 'ja-q-read-1',
        skill: 'reading',
        sectionOrPart: 'JLPT N2 - 文法 (Ngữ pháp)',
        question: 'JLPT N2 Ngữ pháp: "いくら忙しくても、健康管理を怠る______。"',
        passage: 'いくら忙しくても、健康管理を怠る______。(Ikura isogashikute mo, kenkou kanri o okotaru ______.)',
        options: [
          'わけにはいかない (wake ni wa ikanai - không thể vì lý do đạo đức/trách nhiệm)',
          'わけがない (wake ga nai - tuyệt đối không có lý nào)',
          'はずがない (hazu ga nai - chắc chắn không thể)',
          'にすぎない (ni suginai - chỉ là/chẳng qua là)'
        ],
        correctAnswer: 'わけにはいかない (wake ni wa ikanai - không thể vì lý do đạo đức/trách nhiệm)',
        explanationInVietnamese: 'Mẫu câu "V-ru + わけにはいかない" biểu thị: Dù có lý do gì thì vì lương tâm, trách nhiệm xã hội hoặc chuẩn mực đạo đức cũng KHÔNG THỂ làm việc đó.',
        bandTarget: 'JLPT N2'
      },
      {
        id: 'ja-q-read-2',
        skill: 'reading',
        sectionOrPart: 'JLPT N2 - 敬語 (Kính ngữ)',
        question: 'JLPT N2 Kính ngữ: Trả lời khách hàng hỏi Giám đốc Tanaka có ở đó không: "Tanaka wa tadaima, gaishutsu ______."',
        options: [
          'しております (shite orimasu - Khiêm nhường ngữ)',
          'なさっています (nasatte imasu - Tôn kính ngữ)',
          'されています (sarete imasu)',
          'おられます (oraremasu)'
        ],
        correctAnswer: 'しております (shite orimasu - Khiêm nhường ngữ)',
        explanationInVietnamese: 'Khi nói về người trong công ty mình (Tanaka) với khách hàng bên ngoài (soto), phải dùng Khiêm nhường ngữ (Kenjougo: しております) để hạ thấp bên mình, tôn trọng đối tác bên ngoài.',
        bandTarget: 'JLPT N2'
      },
      {
        id: 'ja-q-write-1',
        skill: 'writing',
        sectionOrPart: 'JLPT N2 - 文章の文法 (Cấu trúc câu văn)',
        question: 'JLPT N3/N2 Từ vựng & Kết cấu câu: "このプロジェクトは、関係者全員の協力の______成り立っている。"',
        options: [
          'もとで (moto de - dưới sự)',
          'かわりに (kawari ni - thay vì)',
          'せいで (sei de - tại vì mang nghĩa tiêu cực)',
          'うちに (uchi ni - trong khi)'
        ],
        correctAnswer: 'もとで (moto de - dưới sự)',
        explanationInVietnamese: 'Cấu trúc "N + のもとで" mang ý nghĩa "dưới sự... / dựa trên sự...": Dự án này thành công là dưới sự chung tay hợp tác của tất cả các bên liên quan.',
        bandTarget: 'JLPT N3'
      },
      {
        id: 'ja-q-speak-1',
        skill: 'speaking',
        sectionOrPart: 'JLPT N2 - 即時応答 (Phản xạ hội thoại)',
        question: 'Khi cấp trên khen ngợi dự án của bạn: "今回の企画書、よくまとまっているね。" (Bản kế hoạch lần này tổng hợp rất tốt đấy), cách đáp lại nào đúng chuẩn văn hóa công sở Nhật Bản nhất?',
        audioScript: 'ありがとうございます。課長にご指導いただいたおかげです。',
        options: [
          'ありがとうございます。課長にご指導いただいたおかげです。(Cảm ơn sếp. Đó là nhờ sự chỉ dẫn của Trưởng phòng ạ.)',
          'はい、私はとても優秀ですから。(Vâng, vì tôi rất giỏi mà.)',
          'いいえ、全然だめですよ。(Không, tệ lắm ạ.)',
          'どういたしまして。(Không có chi.)'
        ],
        correctAnswer: 'ありがとうございます。課長にご指導いただいたおかげです。(Cảm ơn sếp. Đó là nhờ sự chỉ dẫn của Trưởng phòng ạ.)',
        explanationInVietnamese: 'Trong văn hóa doanh nghiệp Nhật Bản, khi được cấp trên khen, cách đáp chuẩn mực nhất là cảm ơn và ghi nhận sự chỉ bảo của cấp trên ("～おかげです" - nhờ ơn của...).',
        bandTarget: 'JLPT N2'
      }
    ],
    writingPrompts: [
      {
        id: 'ja-wp-1',
        taskType: 'Task 1',
        title: 'Viết Email Thương Mại Nhật Bản (ビジネスメール): Xin đổi lịch họp với đối tác',
        prompt: 'Hãy viết một bức email trang trọng bằng tiếng Nhật (sử dụng Kính ngữ chuẩn mực) gửi cho ông Sato tại công ty đối tác ABC để xin dời lịch họp từ thứ Tư sang thứ Sáu tuần này.',
        bandScore: 'Chuẩn Keigo Doanh Nghiệp (N2/N1)',
        modelAnswer: '株式会社ABC 営業部 佐藤様\n\nいつも大変お世話になっております。リンガフロー株式会社のグエンでございます。\n\nさて、今週水曜日に予定しております打ち合わせの件ですが、急な出張が入ってしまったため、日程を変更していただけないでしょうか。\n\n誠に勝手なお願いで恐縮ですが、今週金曜日の午後2時からはいかがでしょうか。ご検討のほど、何卒よろしくお願い申し上げます。',
        outline: [
          { point: 'Lời chào mở đầu chuẩn Business Mail', explanation: 'いつも大変お世話になっております。～の[Tên]でございます。(Xin chân thành cảm ơn sự giúp đỡ của quý ngài...)' },
          { point: 'Nêu lý do và lời đề nghị lịch sự bằng thể khả năng phủ định', explanation: '日程を変更していただけないでしょうか。(Liệu ngài có thể vui lòng cho phép đổi lịch được không ạ?)' },
          { point: 'Lời kết khiêm nhường', explanation: 'ご検討のほど、何卒よろしくお願い申し上げます。(Kính mong ngài xem xét giúp.)' }
        ],
        keyVocabulary: [
          { word: '打ち合わせ (uchiawase)', meaning: 'Buổi họp bàn công việc', phonetic: 'u-chi-a-wa-se' },
          { word: '恐縮ですが (kyoushuku desu ga)', meaning: 'Thật vô cùng ngại quá nhưng...', phonetic: 'kyou-shu-ku de-su ga' },
          { word: 'ご検討 (gokentou)', meaning: 'Sự xem xét, cân nhắc (Tôn kính ngữ)', phonetic: 'go-ken-tou' }
        ],
        examinerComment: 'Bức thư tuân thủ nghiêm ngặt cấu trúc 3 phần của Business Email Nhật Bản, sử dụng chính xác cụm mở đầu "いつも大変お世話になっております" và câu đề nghị tế nhị "～ていただけないでしょうか".'
      }
    ],
    speakingCueCards: [
      {
        id: 'ja-sc-1',
        part: 2,
        topic: 'Phỏng Vấn Doanh Nghiệp Nhật (面接): Tự giới thiệu Jikoshoukai & Lý do ứng tuyển (志望動機)',
        cueCardPrompt: '自己紹介と、弊社を志望した理由を1分〜2分程度で話してください。(Hãy tự giới thiệu bản thân và nêu lý do ứng tuyển vào công ty chúng tôi trong 1–2 phút bằng thể lịch sự Desu/Masu và Kính ngữ.)',
        bulletPoints: [
          'Chào hỏi và giới thiệu tên, chuyên môn (初めまして、～と申します)',
          'Kinh nghiệm và điểm mạnh của bản thân (私の強みは～です)',
          'Lý do mong muốn cống hiến cho công ty (御社を志望した理由は～)'
        ],
        bandScore: 'JLPT N2 Kaiwa / Mensetsu',
        modelAnswer: '初めまして。ベトナムから参りましたグエン・ミンと申します。大学では情報工学を専攻し、卒業後は3年間ソフトウェアエンジニアとして働いておりました。私の強みは、新しい技術を素早く学び、チームと協力して課題を解決する力です。御社の先進的なAI技術に強い関心があり、これまでの経験を活かして御社のプロジェクトに貢献したいと考え、志望いたしました。どうぞよろしくお願いいたします。',
        idiomaticExpressions: [
          { phrase: '～と申します (to moushimasu)', meaning: 'Tôi tên là... (Khiêm nhường ngữ chuẩn mực)' },
          { phrase: '経験を活かして (keiken o ikashite)', meaning: 'Phát huy kinh nghiệm đã tích lũy' },
          { phrase: '貢献したい (kouken shitai)', meaning: 'Mong muốn đóng góp, cống hiến' }
        ]
      }
    ]
  },

  korean: {
    languageId: 'korean',
    examShortName: 'TOPIK II',
    examFullTitle: 'Kỳ Thi Năng Lực Tiếng Hàn Quốc Tế (TOPIK II - Cấp 3 đến Cấp 6)',
    examAuthority: 'NIIED (Viện Giáo dục Quốc tế Quốc gia - Bộ Giáo dục Hàn Quốc)',
    targetBadge: 'TOPIK II Cấp 4 – Cấp 6 (150–300 điểm)',
    scoreScaleLabel: 'Thang điểm 300 (Nghe 100 · Đọc 100 · Viết 100)',
    passingCriteria: 'Cấp 3: ≥120đ · Cấp 4: ≥150đ · Cấp 5: ≥190đ · Cấp 6: ≥230/300đ',
    maxScorePerSkill: 100,
    totalMaxScore: 300,
    skillLabels: [
      { id: 'listening', label: 'Nghe hiểu (듣기 - Deutgi)', maxScore: 100 },
      { id: 'reading', label: 'Đọc hiểu (읽기 - Ilgi)', maxScore: 100 },
      { id: 'writing', label: 'Viết (쓰기 - Sseugi)', maxScore: 100 },
    ],
    testSets: [
      {
        id: 'TOPIK2-OFFICIAL-01',
        code: 'TOPIK-92nd',
        title: 'Đề Thi Thật TOPIK II Kỳ 92 - Bộ Đề Chuẩn NIIED Hàn Quốc',
        year: '2025',
        edition: 'NIIED Official',
        difficulty: 'Nâng cao (Band 7.0-8.0)',
        description: 'Bao gồm Nghe hiểu hội thoại & phỏng vấn chuyên gia, Đọc hiểu báo chí Hàn Quốc và Viết biểu đồ câu 53 & nghị luận câu 54.',
        targetBand: 'TOPIK Cấp 4 - 5 (180+/300)',
        estimatedTimeMinutes: 40,
        tags: ['TOPIK II', 'Câu 53 Biểu đồ', 'Quán ngữ Hàn'],
        questions: []
      }
    ],
    extraQuestions: [
      {
        id: 'ko-q-listen-1',
        skill: 'listening',
        sectionOrPart: 'TOPIK II - 듣기 (Nghe hiểu hội thoại)',
        question: 'Nghe đoạn hội thoại sau và chọn việc mà người phụ nữ sẽ làm tiếp theo:',
        audioScript: '남: 김 대리님, 이번 신제품 발표회 장소 예약은 다 끝났나요? 여: 네, 방금 호텔 측과 통화해서 확정했습니다. 이제 발표 자료 최종 수정만 남았어요. 남: 다행이네요. 그럼 자료 수정이 끝나면 저한테 먼저 이메일로 보내 주세요. 여: 네, 지금 바로 수정해서 보내 드리겠습니다.',
        passage: '남: 김 대리님, 이번 신제품 발표회 장소 예약은 다 끝났나요?\n여: 네, 방금 호텔 측과 통화해서 확정했습니다. 이제 발표 자료 최종 수정만 남았어요.\n남: 다행이네요. 그럼 자료 수정이 끝나면 저한테 먼저 이메일로 보내 주세요.\n여: 네, 지금 바로 수정해서 보내 드리겠습니다.',
        options: [
          'Chỉnh sửa lần cuối tài liệu thuyết trình và gửi email cho cấp trên.',
          'Gọi điện thoại cho khách sạn để đặt hội trường.',
          'Đi in danh sách khách mời tham dự lễ ra mắt sản phẩm.',
          'Hủy buổi lễ giới thiệu sản phẩm mới.'
        ],
        correctAnswer: 'Chỉnh sửa lần cuối tài liệu thuyết trình và gửi email cho cấp trên.',
        explanationInVietnamese: 'Người nữ nói việc đặt khách sạn đã xong ("방금 호텔 측과 통화해서 확정했습니다"), chỉ còn việc chỉnh sửa cuối cùng tài liệu thuyết trình ("발표 자료 최종 수정만 남았어요") và sẽ làm ngay.',
        bandTarget: 'TOPIK Cấp 4',
        trapAnalysis: 'Tránh bẫy chọn "Gọi điện cho khách sạn" vì việc đó đã hoàn thành trước khi cuộc hội thoại diễn ra ("방금 ... 확정했습니다").'
      },
      {
        id: 'ko-q-read-1',
        skill: 'reading',
        sectionOrPart: 'TOPIK II - 읽기 (Ngữ pháp)',
        question: 'TOPIK II Ngữ pháp: "아무리 피곤해도 운동을 ______."',
        passage: '아무리 피곤해도 운동을 ______。(Amuri pigonhaedo undong-eul ______.)',
        options: [
          '거르지 않으려고 한다 (georeuji anheuryeogo handa - cố gắng không bỏ dở)',
          '거를 수밖에 없다 (georeul subakke eopda - buộc phải bỏ)',
          '거를 리가 없다 (georeul riga eopda - lẽ nào lại bỏ)',
          '거르는 편이다 (georeuneun pyeon-ida - thuộc diện hay bỏ)'
        ],
        correctAnswer: '거르지 않으려고 한다 (georeuji anheuryeogo handa - cố gắng không bỏ dở)',
        explanationInVietnamese: 'Cấu trúc "아무리 A/V-아/어도 + -(으)려고 하다" diễn tả quyết tâm: "Dù có mệt mỏi đến đâu thì tôi cũng cố gắng không bỏ tập thể dục".',
        bandTarget: 'TOPIK Cấp 4'
      },
      {
        id: 'ko-q-read-2',
        skill: 'reading',
        sectionOrPart: 'TOPIK II - 읽기 (Từ vựng & Quán ngữ)',
        question: 'TOPIK II Từ vựng: "신제품 출시를 앞두고 마케팅 팀에서는 대대적인 홍보 활동에 ______."',
        options: [
          '착수했다 (chaksuhaetda - bắt tay vào thực hiện)',
          '포기했다 (pogihaetda - từ bỏ)',
          '거절했다 (geojeolhaetda - từ chối)',
          '지연되었다 (jiyeon-doeeotda - bị trì hoãn)'
        ],
        correctAnswer: '착수했다 (chaksuhaetda - bắt tay vào thực hiện)',
        explanationInVietnamese: '"착수하다" (Chaksu-hada - Trứ thủ / Bắt tay vào làm việc) là động từ cao cấp chuyên dùng trong bối cảnh kế hoạch, dự án kinh doanh.',
        bandTarget: 'TOPIK Cấp 5'
      },
      {
        id: 'ko-q-write-1',
        skill: 'writing',
        sectionOrPart: 'TOPIK II - 쓰기 Câu 53 (Mô tả biểu đồ)',
        question: 'Trong bài thi Viết TOPIK II Câu 53 (mô tả biểu đồ thống kê), mẫu câu nào sau đây dùng đúng thể văn viết báo cáo trang trọng (-ㄴ/는다) để diễn tả số liệu tăng gấp đôi?',
        options: [
          '2020년에 비해 2024년에는 이용자 수가 두 배 이상 크게 증가한 것으로 나타났다.',
          '2020년보다 2024년에 사람들이 두 배 많이 썼어요.',
          '이용자 수가 두 배 올라갔습니다요.',
          '내 생각에는 이용자 수가 많이 늘어난 것 같다.'
        ],
        correctAnswer: '2020년에 비해 2024년에는 이용자 수가 두 배 이상 크게 증가한 것으로 나타났다.',
        explanationInVietnamese: 'Trong TOPIK II 쓰기 (Câu 53 & 54), bắt buộc phải dùng đuôi câu văn viết trung lập (-ㄴ/는다, -았다/었다), tuyệt đối không dùng đuôi khẩu ngữ "-아/어요" hay "-습니다".',
        bandTarget: 'TOPIK Cấp 5'
      },
      {
        id: 'ko-q-speak-1',
        skill: 'speaking',
        sectionOrPart: 'TOPIK Speaking - Kính ngữ Công sở',
        question: 'Khi trình bày ý kiến phản biện lịch sự trong cuộc họp tại công ty Hàn Quốc, câu mở đầu nào thể hiện sự chuyên nghiệp cao nhất?',
        audioScript: '부장님 말씀에 공감합니다만, 예산 문제도 함께 고려해야 할 것 같습니다.',
        options: [
          '부장님 말씀에 공감합니다만, 예산 문제도 함께 고려해야 할 것 같습니다.',
          '부장님 생각은 틀렸고 제 생각이 맞습니다.',
          '그건 절대 안 돼요.',
          '왜 그렇게 생각하시는지 모르겠네요.'
        ],
        correctAnswer: '부장님 말씀에 공감합니다만, 예산 문제도 함께 고려해야 할 것 같습니다.',
        explanationInVietnamese: 'Cấu trúc "말씀에 공감합니다만..." (Tôi đồng cảm với ý kiến của Trưởng phòng, tuy nhiên...) giúp vừa giữ thể diện cho cấp trên vừa nêu được góc nhìn bổ sung về ngân sách.',
        bandTarget: 'TOPIK Cấp 5'
      }
    ],
    writingPrompts: [
      {
        id: 'ko-wp-1',
        taskType: 'Task 1',
        title: 'TOPIK II 쓰기 Câu 53: Phân tích biểu đồ xu hướng tiêu dùng trực tuyến (200–300 chữ)',
        prompt: 'Dựa vào số liệu khảo sát của Viện Nghiên cứu Kinh tế Hàn Quốc về tỷ lệ mua sắm qua thiết bị di động (tăng từ 42% năm 2020 lên 78% năm 2024 do sự tiện lợi thanh toán và giao hàng nhanh), hãy viết đoạn văn báo cáo từ 200–300 chữ bằng đuôi câu văn viết (-ㄴ/는다).',
        bandScore: 'TOPIK II Cấp 5 (28/30 điểm Câu 53)',
        modelAnswer: '한국경제연구원에서 조사한 ‘모바일 쇼핑 이용 현황’에 따르면, 전체 소비자 중 모바일 쇼핑이 차지하는 비율은 2020년 42%에서 2024년 78%로 4년 만에 크게 증가한 것으로 나타났다. 이처럼 모바일 쇼핑 이용률이 급증한 원인은 간편 결제 시스템의 보급과 당일 배송 서비스의 확대 때문인 것으로 분석된다. 이러한 추세가 지속된다면 향후 온라인 유통 시장의 규모는 더욱 확대될 것으로 전망된다.',
        outline: [
          { point: 'Mở bài: Giới thiệu nguồn khảo sát và chủ đề biểu đồ', explanation: '[Cơ quan]에서 조사한 ‘[Chủ đề]’에 따르면...' },
          { point: 'Thân bài: Nêu sự biến đổi số liệu và nguyên nhân', explanation: '2020년 42%에서 2024년 78%로 크게 증가한 것으로 나타났다. 원인은 ~ 때문인 것으로 분석된다.' },
          { point: 'Kết bài: Dự báo xu hướng tương lai', explanation: '향후 ~ 더욱 확대될 것으로 전망된다.' }
        ],
        keyVocabulary: [
          { word: '급증하다 (geupjeunghada)', meaning: 'Tăng vọt, tăng mạnh', phonetic: 'geup-jeung-ha-da' },
          { word: '~(으)로 나타났다', meaning: 'Được ghi nhận / cho thấy là...', phonetic: 'eu-ro na-ta-nat-da' },
          { word: '전망되다 (jeonmangdoeda)', meaning: 'Được dự báo, triển vọng là...', phonetic: 'jeon-mang-doe-da' }
        ],
        examinerComment: 'Bài viết sử dụng chuẩn xác các khung câu ăn điểm tuyệt đối của TOPIK 53: "~에 따르면", "~(으)로 나타났다", "~(으)로 분석된다" và "~(으)로 전망된다".'
      }
    ],
    speakingCueCards: [
      {
        id: 'ko-sc-1',
        part: 2,
        topic: 'TOPIK Speaking: 현대 사회에서 일과 삶의 균형 (워라밸 - Work-Life Balance)',
        cueCardPrompt: '요즘 젊은 세대 사이에서 ‘일과 삶의 균형(워라밸)’이 중요한 가치로 여겨지고 있습니다. 이에 대한 본인의 생각과 이유를 말씀해 주세요.',
        bulletPoints: [
          'Nêu định nghĩa và tầm quan trọng của 워라밸 (Work-Life Balance)',
          'Lợi ích đối với sức khỏe tinh thần và năng suất làm việc lâu dài (업무 효율성 향상)',
          'Đề xuất giải pháp từ phía doanh nghiệp và cá nhân'
        ],
        bandScore: 'TOPIK Speaking Cấp 5',
        modelAnswer: '저는 현대 사회에서 일과 삶의 균형이 무엇보다 중요하다고 생각합니다. 과거에는 야근을 많이 하는 것이 성실함의 상징이었지만, 지나친 과로는 오히려 건강을 해치고 업무 효율성을 떨어뜨립니다. 충분한 휴식과 자기계발 시간이 보장될 때 창의적인 아이디어가 나오고, 결과적으로 기업의 생산성도 높아질 수 있습니다.',
        idiomaticExpressions: [
          { phrase: '업무 효율성을 높이다', meaning: 'Nâng cao hiệu suất công việc' },
          { phrase: '자기계발 (jagi-gyebal)', meaning: 'Phát triển bản thân' },
          { phrase: '성실함의 상징', meaning: 'Biểu tượng của sự chăm chỉ, tận tụy' }
        ]
      }
    ]
  },

  french: {
    languageId: 'french',
    examShortName: 'DELF / DALF',
    examFullTitle: 'Văn Bằng Tiếng Pháp Quốc Tế (DELF B1 – B2 / DALF C1)',
    examAuthority: 'France Éducation International (Bộ Giáo dục Quốc gia Pháp)',
    targetBadge: 'DELF B2 (Định cư Canada & Du học Pháp)',
    scoreScaleLabel: 'Thang điểm 100 (Nghe 25 · Đọc 25 · Viết 25 · Nói 25)',
    passingCriteria: 'Tổng điểm ≥ 50/100 và KHÔNG có kỹ năng nào dưới 5/25 điểm',
    maxScorePerSkill: 25,
    totalMaxScore: 100,
    skillLabels: [
      { id: 'listening', label: 'Compréhension de l’oral (Nghe hiểu)', maxScore: 25 },
      { id: 'reading', label: 'Compréhension des écrits (Đọc hiểu)', maxScore: 25 },
      { id: 'writing', label: 'Production écrite (Viết nghị luận)', maxScore: 25 },
      { id: 'speaking', label: 'Production orale (Thuyết trình & Tranh biện)', maxScore: 25 },
    ],
    testSets: [
      {
        id: 'DELF-B2-OFFICIAL-01',
        code: 'DELF-B2-FEI',
        title: 'Đề Thi Chuẩn DELF B2 Tout Public - France Éducation International',
        year: '2025',
        edition: 'FEI Official',
        difficulty: 'Nâng cao (Band 7.0-8.0)',
        description: 'Đánh giá toàn diện 4 kỹ năng tiếng Pháp B2: Nghe đài France Inter, Đọc báo Le Monde, Viết thư kiến nghị Thị trưởng và Thuyết trình phản biện.',
        targetBand: 'DELF B2 (75+/100)',
        estimatedTimeMinutes: 40,
        tags: ['DELF B2', 'Subjonctif', 'Connecteurs logiques'],
        questions: []
      }
    ],
    extraQuestions: [
      {
        id: 'fr-q-listen-1',
        skill: 'listening',
        sectionOrPart: 'DELF B2 - Compréhension de l’oral',
        question: 'Nghe đoạn trích bản tin phát thanh Pháp: Theo chuyên gia, lợi ích chính của việc áp dụng tuần làm việc 4 ngày (la semaine de quatre jours) là gì?',
        audioScript: 'D’après notre étude menée auprès de cinquante entreprises françaises, la semaine de quatre jours permet non seulement de réduire l’épuisement professionnel, mais aussi d’augmenter la productivité globale de près de quinze pour cent.',
        passage: 'D’après notre étude menée auprès de cinquante entreprises françaises, la semaine de quatre jours permet non seulement de réduire l’épuisement professionnel, mais aussi d’augmenter la productivité globale de près de quinze pour cent.',
        options: [
          'Giảm kiệt sức nghề nghiệp (burn-out) và tăng năng suất chung gần 15%.',
          'Giảm lương của người lao động xuống 15%.',
          'Khiến các doanh nghiệp Pháp phải đóng cửa vào mùa hè.',
          'Tăng số giờ làm thêm vào cuối tuần.'
        ],
        correctAnswer: 'Giảm kiệt sức nghề nghiệp (burn-out) và tăng năng suất chung gần 15%.',
        explanationInVietnamese: 'Cấu trúc "non seulement... mais aussi..." (không những... mà còn...): giảm kiệt sức công việc ("réduire l’épuisement professionnel") và tăng năng suất chung ("augmenter la productivité globale").',
        bandTarget: 'DELF B2'
      },
      {
        id: 'fr-q-read-1',
        skill: 'reading',
        sectionOrPart: 'DELF B2 - Compréhension des écrits',
        question: 'DELF B2 Connecteur logique: "______ les mesures prises par la mairie, la circulation reste dense aux heures de pointe."',
        options: ['Malgré', 'Parce que', 'Puisque', 'Grâce à'],
        correctAnswer: 'Malgré',
        explanationInVietnamese: 'Cấu trúc chỉ sự nhượng bộ đối lập: "Malgré + Danh từ" (Mặc dù...). "Grâce à" chỉ nguyên nhân tích cực (nhờ có), "Parce que" chỉ nguyên nhân logic.',
        bandTarget: 'DELF B2'
      },
      {
        id: 'fr-q-write-1',
        skill: 'writing',
        sectionOrPart: 'DELF B2 - Grammaire & Production Écrite',
        question: 'DELF B2 Grammaire: "Il est indispensable que nous ______ une solution durable avant la fin du trimestre."',
        options: ['trouvions (Subjonctif présent)', 'trouvons (Indicatif présent)', 'trouverons (Futur simple)', 'avons trouvé'],
        correctAnswer: 'trouvions (Subjonctif présent)',
        explanationInVietnamese: 'Cấu trúc biểu thị sự cấp thiết, bắt buộc: "Il est indispensable que + Mệnh đề chia ở Thức giả định (Subjonctif)". Với chủ ngữ "nous", động từ "trouver" chia thành "trouvions".',
        bandTarget: 'DELF B2'
      },
      {
        id: 'fr-q-speak-1',
        skill: 'speaking',
        sectionOrPart: 'DELF B2 - Production Orale',
        question: 'Khi mở đầu phần trình bày quan điểm (Production orale DELF B2), câu nào giúp giới thiệu vấn đề (la problématique) một cách học thuật và trang trọng nhất?',
        audioScript: 'Cet article soulève une question essentielle : dans quelle mesure le télétravail transforme-t-il durablement notre rapport à l’entreprise ?',
        options: [
          'Cet article soulève une question essentielle : dans quelle mesure le télétravail transforme-t-il durablement notre rapport à l’entreprise ?',
          'Je vais parler du travail à la maison parce que c’est intéressant.',
          'Bonjour, le texte parle de beaucoup de choses.',
          'Je suis d’accord avec le journaliste.'
        ],
        correctAnswer: 'Cet article soulève une question essentielle : dans quelle mesure le télétravail transforme-t-il durablement notre rapport à l’entreprise ?',
        explanationInVietnamese: 'Trong DELF B2 Production Orale, giám khảo chấm điểm rất cao cấu trúc đặt câu hỏi problématique: "Cet article soulève une question essentielle : dans quelle mesure... ?" (Bài báo này nêu lên một câu hỏi cốt lõi: ở mức độ nào...?).',
        bandTarget: 'DELF B2'
      }
    ],
    writingPrompts: [
      {
        id: 'fr-wp-1',
        taskType: 'Task 1',
        title: 'DELF B2 Production Écrite: Lettre formelle au Maire (Thư kiến nghị Thị trưởng)',
        prompt: 'Au nom des habitants de votre quartier, vous écrivez une lettre formelle au maire de votre ville pour demander la création de nouvelles pistes cyclables et d’espaces verts afin de réduire la pollution. (Minimum 250 mots)',
        bandScore: 'DELF B2 (23/25 điểm)',
        modelAnswer: 'Monsieur le Maire,\n\nAu nom des riverains du quartier Saint-Michel, je me permets de solliciter votre bienveillante attention concernant la dégradation de la qualité de l’air dans notre arrondissement.\n\nD’une part, l’augmentation constante du trafic automobile aux heures de pointe engendre des nuisances sonores et une pollution préoccupante. D’autre part, l’absence de pistes cyclables sécurisées décourage les citoyens qui souhaiteraient privilégier des modes de transport doux.\n\nPar conséquent, il serait indispensable que la municipalité aménage des voies réservées aux vélos ainsi que de nouveaux espaces verts. Dans l’attente d’une réponse favorable, je vous prie d’agréer, Monsieur le Maire, l’expression de ma considération distinguée.',
        outline: [
          { point: 'Formule d’appel & Objet', explanation: 'Monsieur le Maire, je me permets de solliciter votre attention concernant...' },
          { point: 'Développement avec connecteurs (D’une part / D’autre part)', explanation: 'Nêu thực trạng ô nhiễm và thiếu làn đường xe đạp an toàn.' },
          { point: 'Proposition au Subjonctif & Formule de politesse finale', explanation: 'Il serait indispensable que la municipalité aménage... Je vous prie d’agréer...' }
        ],
        keyVocabulary: [
          { word: 'les riverains', meaning: 'Cư dân sinh sống trong khu vực', phonetic: 'le ʁi.vʁɛ̃' },
          { word: 'les nuisances sonores', meaning: 'Ô nhiễm tiếng ồn', phonetic: 'nɥi.zɑ̃s sɔ.nɔʁ' },
          { word: 'considération distinguée', meaning: 'Sự kính trọng cao quý (câu kết thư trang trọng)', phonetic: 'kɔ̃.si.de.ʁa.sjɔ̃' }
        ],
        examinerComment: 'Đúng chuẩn thể thức Lettre formelle của Pháp, sử dụng Subjonctif ("aménagement / aménage") và câu kết thư trang trọng hoàn hảo.'
      }
    ],
    speakingCueCards: [
      {
        id: 'fr-sc-1',
        part: 2,
        topic: 'DELF B2 Production Orale: L’impact des réseaux sociaux sur l’information',
        cueCardPrompt: 'Présentez le thème du document déclencheur, formulez une problématique claire et développez votre argumentation en deux parties avant de conclure.',
        bulletPoints: [
          'Introduction : définir le sujet et annoncer la problématique',
          'Partie 1 : La démocratisation et l’instantanéité de l’information',
          'Partie 2 : Les risques de désinformation et la nécessité d’un esprit critique'
        ],
        bandScore: 'DELF B2 (23.5/25)',
        modelAnswer: 'Le document que j’ai choisi aborde la question de l’influence des réseaux sociaux sur notre manière de nous informer. Nous pouvons donc nous demander dans quelle mesure ces plateformes enrichissent le débat démocratique tout en présentant des risques de désinformation. D’une part, elles offrent un accès immédiat et gratuit à une pluralité de sources. En revanche, les algorithmes favorisent souvent le sensationnalisme au détriment de la vérification des faits.',
        idiomaticExpressions: [
          { phrase: 'dans quelle mesure', meaning: 'Ở mức độ nào (mẫu câu mở đầu problématique)' },
          { phrase: 'au détriment de', meaning: 'Gây thiệt hại / bất lợi cho...' },
          { phrase: 'l’esprit critique', meaning: 'Tư duy phản biện' }
        ]
      }
    ]
  },

  german: {
    languageId: 'german',
    examShortName: 'Goethe-Zertifikat',
    examFullTitle: 'Chứng Chỉ Tiếng Đức Quốc Tế (Goethe-Zertifikat B1 – B2 / telc Deutsch)',
    examAuthority: 'Goethe-Institut (Viện Goethe CHLB Đức)',
    targetBadge: 'Goethe B1 – B2 (Du học nghề Ausbildung & Đại học Đức)',
    scoreScaleLabel: 'Thang điểm 100 (Lesen 25 · Hören 25 · Schreiben 25 · Sprechen 25)',
    passingCriteria: 'Đạt tối thiểu 60/100 điểm ở từng mô-đun (Lesen, Hören, Schreiben, Sprechen)',
    maxScorePerSkill: 100,
    totalMaxScore: 100,
    skillLabels: [
      { id: 'reading', label: 'Lesen (Đọc hiểu)', maxScore: 100 },
      { id: 'listening', label: 'Hören (Nghe hiểu)', maxScore: 100 },
      { id: 'writing', label: 'Schreiben (Viết thư & Diễn đàn)', maxScore: 100 },
      { id: 'speaking', label: 'Sprechen (Thuyết trình & Thảo luận)', maxScore: 100 },
    ],
    testSets: [
      {
        id: 'GOETHE-B2-OFFICIAL-01',
        code: 'GOETHE-B2-MOD1',
        title: 'Đề Thi Chuẩn Goethe-Zertifikat B2 - Viện Goethe CHLB Đức',
        year: '2025',
        edition: 'Goethe-Institut Official',
        difficulty: 'Nâng cao (Band 7.0-8.0)',
        description: 'Kiểm tra toàn diện 4 mô-đun Lesen, Hören, Schreiben, Sprechen chuẩn khung tham chiếu châu Âu CEFR B2.',
        targetBand: 'Goethe B2 (80+/100)',
        estimatedTimeMinutes: 40,
        tags: ['Goethe B2', 'Nebensatz', 'Nomen-Verb'],
        questions: []
      }
    ],
    extraQuestions: [
      {
        id: 'de-q-listen-1',
        skill: 'listening',
        sectionOrPart: 'Goethe B2 - Hören Teil 1',
        question: 'Nghe thông báo tại nhà ga München: Hành khách đi chuyến tàu ICE 518 đến Frankfurt cần lưu ý điều gì?',
        audioScript: 'Achtung am Gleis 4: Der ICE 518 nach Frankfurt Hauptbahnhof fährt heute ausnahmsweise von Gleis 9 ab. Bitte beachten Sie auch, dass sich die Abfahrt um etwa fünfzehn Minuten verzögert.',
        passage: 'Achtung am Gleis 4: Der ICE 518 nach Frankfurt Hauptbahnhof fährt heute ausnahmsweise von Gleis 9 ab. Bitte beachten Sie auch, dass sich die Abfahrt um etwa fünfzehn Minuten verzögert.',
        options: [
          'Tàu đổi sang khởi hành ở đường ray số 9 (Gleis 9) và trễ khoảng 15 phút.',
          'Tàu khởi hành đúng giờ tại đường ray số 4 (Gleis 4).',
          'Chuyến tàu ICE 518 đến Frankfurt đã bị hủy.',
          'Hành khách phải chuyển sang đi xe buýt thay thế.'
        ],
        correctAnswer: 'Tàu đổi sang khởi hành ở đường ray số 9 (Gleis 9) và trễ khoảng 15 phút.',
        explanationInVietnamese: 'Từ khóa: "ausnahmsweise von Gleis 9 ab" (ngoại lệ hôm nay khởi hành từ đường ray số 9) và "um etwa fünfzehn Minuten verzögert" (trễ khoảng 15 phút).',
        bandTarget: 'Goethe B1/B2'
      },
      {
        id: 'de-q-read-1',
        skill: 'reading',
        sectionOrPart: 'Goethe B2 - Lesen & Grammatik',
        question: 'Goethe B2 Grammatik: Chọn vị trí động từ đúng sau liên từ "obwohl":',
        options: [
          'Er kam pünktlich zur Konferenz, obwohl sein Flug zwei Stunden Verspätung hatte.',
          'Er kam pünktlich zur Konferenz, obwohl hatte sein Flug zwei Stunden Verspätung.',
          'Er kam pünktlich zur Konferenz, obwohl sein Flug hatte zwei Stunden Verspätung.',
          'Er kam pünktlich zur Konferenz, obwohl zwei Stunden Verspätung sein Flug hatte.'
        ],
        correctAnswer: 'Er kam pünktlich zur Konferenz, obwohl sein Flug zwei Stunden Verspätung hatte.',
        explanationInVietnamese: 'Sau liên từ phụ thuộc "obwohl" (mặc dù), động từ chia (hatte) bắt buộc phải nằm ở vị trí CUỐI CÙNG của mệnh đề phụ.',
        bandTarget: 'Goethe B2'
      },
      {
        id: 'de-q-write-1',
        skill: 'writing',
        sectionOrPart: 'Goethe B2 - Schreiben',
        question: 'Goethe B2 Wortschatz: "Wir müssen alle relevanten Faktoren sorgfältig in Betracht ______."',
        options: ['ziehen', 'nehmen', 'bringen', 'machen'],
        correctAnswer: 'ziehen',
        explanationInVietnamese: 'Cụm diễn đạt cố định cấp cao (Nomen-Verb-Verbindung): "etwas in Betracht ziehen" = cân nhắc, xem xét kỹ lưỡng điều gì.',
        bandTarget: 'Goethe B2'
      },
      {
        id: 'de-q-speak-1',
        skill: 'speaking',
        sectionOrPart: 'Goethe B2 - Sprechen Teil 1',
        question: 'Trong phần thuyết trình Goethe B2 Sprechen, mẫu câu nào dùng cấu trúc liên từ hai vế đúng ngữ pháp để cân nhắc ưu và nhược điểm?',
        audioScript: 'Einerseits bietet das Homeoffice eine hohe Flexibilität, andererseits fehlt vielen Mitarbeitern der persönliche Kontakt zu den Kollegen.',
        options: [
          'Einerseits bietet das Homeoffice eine hohe Flexibilität, andererseits fehlt vielen Mitarbeitern der persönliche Kontakt zu den Kollegen.',
          'Homeoffice ist gut, aber auch schlecht für uns.',
          'Weil Homeoffice flexibel ist, arbeiten wir zu Hause.',
          'Ich finde Homeoffice sehr schön.'
        ],
        correctAnswer: 'Einerseits bietet das Homeoffice eine hohe Flexibilität, andererseits fehlt vielen Mitarbeitern der persönliche Kontakt zu den Kollegen.',
        explanationInVietnamese: 'Cặp liên từ "Einerseits... andererseits..." (Một mặt... mặt khác...) kèm đảo ngữ động từ lên vị trí số 2 (V2-Stellung) là cấu trúc vàng để đạt điểm tối đa trong Goethe B2 Sprechen.',
        bandTarget: 'Goethe B2'
      }
    ],
    writingPrompts: [
      {
        id: 'de-wp-1',
        taskType: 'Task 1',
        title: 'Goethe B2 Schreiben Teil 2: फॉर्मल E-Mail (Thư xin phép cấp trên làm việc từ xa)',
        prompt: 'Sie machen gerade ein Praktikum in einem deutschen Unternehmen. Schreiben Sie eine formelle E-Mail an Ihren Abteilungsleiter, Herrn Müller, und bitten Sie darum, nächste Woche zwei Tage im Homeoffice arbeiten zu dürfen.',
        bandScore: 'Goethe B2 (92/100 điểm)',
        modelAnswer: 'Sehr geehrter Herr Müller,\n\nich schreibe Ihnen, weil ich Sie um Ihr Verständnis in einer dringenden Angelegenheit bitten möchte. Nächste Woche werden in meiner Wohnung wichtige Reparaturarbeiten an der Heizung durchgeführt, weshalb ich am Dienstag und Mittwoch zu Hause anwesend sein muss.\n\nAus diesem Grund möchte ich Sie höflich fragen, ob es möglich wäre, an diesen beiden Tagen im Homeoffice zu arbeiten. Selbstverständlich werde ich alle laufenden Aufgaben termingerecht erledigen und telefonisch jederzeit erreichbar sein.\n\nFür Ihre Unterstützung danke ich Ihnen im Voraus.\n\nMit freundlichen Grüßen\nMinh Nguyen',
        outline: [
          { point: 'Anrede & Grund des Schreibens', explanation: 'Sehr geehrter Herr Müller, ich schreibe Ihnen, weil...' },
          { point: 'Erklärung der Situation & Höfliche Bitte (Konjunktiv II)', explanation: 'Ich möchte Sie höflich fragen, ob es möglich wäre...' },
          { point: 'Lösungsvorschlag & Grußformel', explanation: 'Selbstverständlich werde ich alle Aufgaben termingerecht erledigen... Mit freundlichen Grüßen' }
        ],
        keyVocabulary: [
          { word: 'um Verständnis bitten', meaning: 'Mong nhận được sự thông cảm', phonetic: 'ʊm fɛɐ̯ˈʃtɛntnɪs ˈbɪtn̩' },
          { word: 'termingerecht erledigen', meaning: 'Hoàn thành công việc đúng thời hạn', phonetic: 'tɛʁˈmiːnɡəˌʁɛçt' },
          { word: 'im Voraus danken', meaning: 'Cảm ơn trước', phonetic: 'ɪm foˈʁaʊ̯s' }
        ],
        examinerComment: 'Sử dụng hoàn hảo thức giả định lịch sự Konjunktiv II ("ob es möglich wäre"), mệnh đề phụ với "weil" và "weshalb", đúng chuẩn Goethe B2.'
      }
    ],
    speakingCueCards: [
      {
        id: 'de-sc-1',
        part: 2,
        topic: 'Goethe B2 Sprechen Teil 1: Konsumverhalten & Online-Shopping (Thói quen mua sắm trực tuyến)',
        cueCardPrompt: 'Halten Sie einen kurzen Vortrag (ca. 3–4 Minuten) über das Thema „Online-Shopping vs. Einkaufen im Geschäft“. Stellen Sie Vor- und Nachteile dar und berichten Sie von Ihren eigenen Erfahrungen.',
        bulletPoints: [
          'Verschiedene Möglichkeiten des Einkaufens vorstellen',
          'Vor- und Nachteile des Online-Shoppings abwägen (Bequemlichkeit vs. Umweltbelastung durch Retouren)',
          'Eigene Erfahrungen und Fazit formulieren'
        ],
        bandScore: 'Goethe B2 (90/100)',
        modelAnswer: 'In meinem heutigen Vortrag möchte ich über das Thema „Online-Shopping“ sprechen. Heutzutage bestellen immer mehr Menschen Waren im Internet. Einerseits ist das äußerst bequem, da man rund um die Uhr von zu Hause aus einkaufen und Preise leicht vergleichen kann. Andererseits führt der zunehmende Online-Handel zu viel Verpackungsmüll und belastet durch häufige Rücksendungen die Umwelt.',
        idiomaticExpressions: [
          { phrase: 'rund um die Uhr', meaning: 'Suốt 24/24 giờ' },
          { phrase: 'Vor- und Nachteile abwägen', meaning: 'Cân nhắc mặt lợi và mặt hại' },
          { phrase: 'die Umwelt belasten', meaning: 'Gây áp lực / ô nhiễm cho môi trường' }
        ]
      }
    ]
  },

  spanish: {
    languageId: 'spanish',
    examShortName: 'DELE / SIELE',
    examFullTitle: 'Văn Bằng Tiếng Tây Ban Nha Quốc Tế (DELE B1 – B2 / Instituto Cervantes)',
    examAuthority: 'Instituto Cervantes (Thay mặt Bộ Giáo dục Tây Ban Nha)',
    targetBadge: 'DELE B2 (Giá trị vĩnh viễn toàn cầu)',
    scoreScaleLabel: 'Thang điểm 100 (Đọc 25 · Nghe 25 · Viết 25 · Nói 25)',
    passingCriteria: 'Đạt kết quả APTO (≥ 60/100 điểm tổng, tối thiểu 30/50 ở mỗi nhóm kỹ năng)',
    maxScorePerSkill: 25,
    totalMaxScore: 100,
    skillLabels: [
      { id: 'reading', label: 'Comprensión de lectura (Đọc hiểu)', maxScore: 25 },
      { id: 'listening', label: 'Comprensión auditiva (Nghe hiểu)', maxScore: 25 },
      { id: 'writing', label: 'Expresión e interacción escritas (Viết)', maxScore: 25 },
      { id: 'speaking', label: 'Expresión e interacción orales (Nói)', maxScore: 25 },
    ],
    testSets: [
      {
        id: 'DELE-B2-OFFICIAL-01',
        code: 'DELE-B2-CERVANTES',
        title: 'Đề Thi Chuẩn DELE B2 - Viện Cervantes Tây Ban Nha',
        year: '2025',
        edition: 'Instituto Cervantes Official',
        difficulty: 'Nâng cao (Band 7.0-8.0)',
        description: 'Bao gồm 4 kỹ năng chuẩn DELE B2: Ngữ pháp Subjuntivo, phân biệt Por/Para, đọc hiểu báo El País và viết thư trang trọng.',
        targetBand: 'DELE B2 (APTO 80+/100)',
        estimatedTimeMinutes: 40,
        tags: ['DELE B2', 'Subjuntivo', 'Por vs Para'],
        questions: []
      }
    ],
    extraQuestions: [
      {
        id: 'es-q-listen-1',
        skill: 'listening',
        sectionOrPart: 'DELE B2 - Comprensión auditiva',
        question: 'Nghe thông báo từ ban tổ chức hội thảo tại Madrid: Thay đổi nào đã được thông báo cho các đại biểu?',
        audioScript: 'Estimados participantes, les informamos de que la conferencia inaugural sobre energías renovables no tendrá lugar en el salón principal, sino en el auditorio de la segunda planta a las diez en punto.',
        passage: 'Estimados participantes, les informamos de que la conferencia inaugural sobre energías renovables no tendrá lugar en el salón principal, sino en el auditorio de la segunda planta a las diez en punto.',
        options: [
          'Buổi hội thảo khai mạc được chuyển sang hội trường ở tầng 2 lúc 10 giờ đúng.',
          'Buổi hội thảo khai mạc bị hoãn sang buổi chiều.',
          'Chủ đề hội thảo được đổi từ năng lượng tái tạo sang tài chính.',
          'Buổi hội thảo vẫn diễn ra tại sảnh chính ở tầng trệt.'
        ],
        correctAnswer: 'Buổi hội thảo khai mạc được chuyển sang hội trường ở tầng 2 lúc 10 giờ đúng.',
        explanationInVietnamese: 'Cấu trúc "no A, sino B" (không phải ở A, mà là ở B): không diễn ra ở sảnh chính ("salón principal") mà chuyển sang hội trường tầng 2 ("auditorio de la segunda planta").',
        bandTarget: 'DELE B2'
      },
      {
        id: 'es-q-read-1',
        skill: 'reading',
        sectionOrPart: 'DELE B2 - Gramática (Subjuntivo)',
        question: 'DELE B2 Gramática: Chọn thể động từ đúng: "Es imprescindible que los empleados ______ las normas de seguridad."',
        options: [
          'respeten (Subjuntivo presente)',
          'respetan (Indicativo presente)',
          'respetarán (Futuro simple)',
          'han respetado'
        ],
        correctAnswer: 'respeten (Subjuntivo presente)',
        explanationInVietnamese: 'Cấu trúc biểu thị sự cần thiết khách quan: "Es imprescindible que + Mệnh đề chia ở Thức giả định Subjuntivo". Với chủ ngữ số nhiều "los empleados", động từ "respetar" đổi đuôi thành "respeten".',
        bandTarget: 'DELE B2'
      },
      {
        id: 'es-q-write-1',
        skill: 'writing',
        sectionOrPart: 'DELE B1/B2 - Uso de la Lengua',
        question: 'DELE B1/B2 Uso de la Lengua: "Este informe debe estar terminado ______ el próximo viernes."',
        options: ['para', 'por', 'en', 'de'],
        correctAnswer: 'para',
        explanationInVietnamese: 'Khi diễn đạt thời hạn chót (Deadline), tiếng Tây Ban Nha luôn dùng giới từ "para": "para el próximo viernes" (trước/hạn chót là thứ Sáu tuần tới).',
        bandTarget: 'DELE B1/B2'
      },
      {
        id: 'es-q-speak-1',
        skill: 'speaking',
        sectionOrPart: 'DELE B2 - Expresión e interacción orales',
        question: 'Trong phần thi nói DELE B2, cụm từ nối nào sau đây giúp đưa ra lập luận nhượng bộ trang trọng nhất (kèm Subjuntivo hoặc Indicativo)?',
        audioScript: 'A pesar de que el teletrabajo ofrece mayor flexibilidad, es fundamental mantener la cohesión del equipo.',
        options: [
          'A pesar de que el teletrabajo ofrece mayor flexibilidad, es fundamental mantener la cohesión del equipo.',
          'El teletrabajo es bueno pero también malo.',
          'Me gusta trabajar en casa todos los días.',
          'Porque trabajamos mucho en la oficina.'
        ],
        correctAnswer: 'A pesar de que el teletrabajo ofrece mayor flexibilidad, es fundamental mantener la cohesión del equipo.',
        explanationInVietnamese: '"A pesar de que..." (Mặc dù thực tế là...) kết hợp với "es fundamental..." (điều cốt lõi là...) giúp nâng điểm tiêu chí Coherencia và Riqueza léxica lên mức B2–C1.',
        bandTarget: 'DELE B2'
      }
    ],
    writingPrompts: [
      {
        id: 'es-wp-1',
        taskType: 'Task 1',
        title: 'DELE B2 Expresión Escrita Tarea 1: Carta formal de reclamación / propuesta',
        prompt: 'Escriba una carta formal al director de la biblioteca municipal de su ciudad para proponer la ampliación del horario de apertura durante la época de exámenes universitarios y solicitar más enchufes para ordenadores portátiles. (180–200 palabras)',
        bandScore: 'DELE B2 (23/25 điểm)',
        modelAnswer: 'Estimado Sr. Director:\n\nMe dirijo a usted como usuario habitual de la Biblioteca Municipal Central con el fin de transmitirle alcune sugerencias en nombre de los estudiantes universitarios del barrio.\n\nEn primer lugar, durante el periodo de exámenes finales, el aforo se completa a primera hora de la mañana. Por ello, sería sumamente beneficioso que la biblioteca ampliara su horario de apertura hasta las diez de la noche, incluidos los fines de semana. Asimismo, agradeceríamos que se instalaran más tomas de corriente en las mesas de lectura para facilitar el uso de ordenadores portátiles.\n\nAgradeciendo de antemano su atención, reciba un cordial saludo.\n\nAtentamente,\nMinh Nguyen',
        outline: [
          { point: 'Saludo formal & Motivo de la carta', explanation: 'Estimado Sr. Director: Me dirijo a usted con el fin de...' },
          { point: 'Exposición del problema & Propuestas con Subjuntivo imperfecto', explanation: 'Sería sumamente beneficioso que la biblioteca ampliara... Agradeceríamos que se instalaran...' },
          { point: 'Despedida formal', explanation: 'Agradeciendo de antemano su atención, reciba un cordial saludo.' }
        ],
        keyVocabulary: [
          { word: 'el aforo', meaning: 'Sức chứa tối đa của phòng/tòa nhà', phonetic: 'a-fo-ro' },
          { word: 'ampliar el horario', meaning: 'Mở rộng khung giờ hoạt động', phonetic: 'am-pliar el o-ra-rio' },
          { word: 'de antemano', meaning: 'Trước (cảm ơn trước)', phonetic: 'de an-te-ma-no' }
        ],
        examinerComment: 'Sử dụng chính xác cấu trúc điều kiện lịch sự kết hợp Subjuntivo quá khứ ("sería beneficioso que ampliara", "agradeceríamos que se instalaran"), đạt điểm tối đa DELE B2.'
      }
    ],
    speakingCueCards: [
      {
        id: 'es-sc-1',
        part: 2,
        topic: 'DELE B2 Expresión Oral Tarea 1: Valorar propuestas sobre el transporte urbano sostenible',
        cueCardPrompt: 'Analice las ventajas y los inconvenientes de restringir el acceso de los coches privados al centro histórico de las grandes ciudades y exponga su opinión personal durante 3 minutos.',
        bulletPoints: [
          'Ventajas medioambientales: reducción de emisiones y del ruido urbano',
          'Inconvenientes para los comerciantes y residentes sin transporte público cercano',
          'Propuesta equilibrada: fomentar el transporte público eléctrico y aparcamientos disuasorios'
        ],
        bandScore: 'DELE B2 (APTO Sobresaliente)',
        modelAnswer: 'En mi opinión, restringir la circulación de vehículos privados en el casco histórico es una medida necesaria para combatir el cambio climático. Por un lado, disminuye drásticamente la contaminación atmosférica y devuelve el espacio público a los peatones. Sin embargo, para que esta iniciativa tenga éxito, es imprescindible que el ayuntamiento aumente la frecuencia del transporte público.',
        idiomaticExpressions: [
          { phrase: 'por un lado... por otro lado', meaning: 'Một mặt... mặt khác...' },
          { phrase: 'el casco histórico', meaning: 'Khu phố cổ trung tâm' },
          { phrase: 'es imprescindible que + Subjuntivo', meaning: 'Điều tối quan trọng/bắt buộc là...' }
        ]
      }
    ]
  }
};

export interface CertificateCalculationResult {
  totalScore: number;
  maxTotalScore: number;
  percentage: number;
  levelAchieved: string;
  isPassed: boolean;
  verdictInVietnamese: string;
}

/**
 * Pure function to calculate international language certificate scores
 * for non-English exams (HSK, JLPT, TOPIK, DELF, Goethe, DELE).
 */
export function calculateMultiLangCertificateScore(
  languageId: string,
  skillScores: Record<string, number>
): CertificateCalculationResult {
  const meta = MULTI_LANG_EXAM_METADATA[languageId];
  if (!meta) {
    return {
      totalScore: 0,
      maxTotalScore: 100,
      percentage: 0,
      levelAchieved: 'Chưa xác định',
      isPassed: false,
      verdictInVietnamese: 'Ngôn ngữ chưa có cấu hình thang điểm.'
    };
  }

  const values = meta.skillLabels.map(s => {
    const raw = skillScores[s.id] ?? 0;
    return Math.max(0, Math.min(s.maxScore, raw));
  });

  if (languageId === 'german') {
    // Goethe B2 evaluates average across 4 modules (each out of 100), passing is >= 60 in each module
    const avgScore = Math.round(values.reduce((acc, v) => acc + v, 0) / Math.max(1, values.length));
    const allModulesPassed = values.every(v => v >= 60);
    let level = 'Chưa đạt B2';
    if (allModulesPassed && avgScore >= 90) level = 'Goethe B2 - Sehr gut (Xuất sắc)';
    else if (allModulesPassed && avgScore >= 80) level = 'Goethe B2 - Gut (Giỏi)';
    else if (allModulesPassed && avgScore >= 70) level = 'Goethe B2 - Befriedigend (Khá)';
    else if (allModulesPassed && avgScore >= 60) level = 'Goethe B2 - Ausreichend (Đạt)';

    return {
      totalScore: avgScore,
      maxTotalScore: 100,
      percentage: avgScore,
      levelAchieved: level,
      isPassed: allModulesPassed,
      verdictInVietnamese: allModulesPassed
        ? `Chúc mừng! Bạn đã vượt qua tất cả 4 mô-đun Goethe-Zertifikat với điểm trung bình ${avgScore}/100 (${level}).`
        : `Chưa đạt chứng chỉ toàn phần: Goethe yêu cầu mỗi mô-đun (Lesen, Hören, Schreiben, Sprechen) đều phải đạt tối thiểu 60/100 điểm.`
    };
  }

  const totalScore = values.reduce((acc, v) => acc + v, 0);
  const maxTotalScore = meta.totalMaxScore;
  const percentage = Math.round((totalScore / Math.max(1, maxTotalScore)) * 100);

  if (languageId === 'chinese') {
    const isPassed = totalScore >= 180;
    let level = 'Dưới chuẩn HSK 4 (<180đ)';
    if (totalScore >= 260) level = 'HSK 5 Xuất sắc (Đủ điều kiện học bổng CSC toàn phần)';
    else if (totalScore >= 210) level = 'Đạt chuẩn HSK 4–5 Khá Giỏi';
    else if (totalScore >= 180) level = 'Đạt chứng chỉ HSK (≥180/300 điểm)';

    return {
      totalScore,
      maxTotalScore,
      percentage,
      levelAchieved: level,
      isPassed,
      verdictInVietnamese: isPassed
        ? `Chúc mừng! Tổng điểm ${totalScore}/300 vượt mốc đỗ tiêu chuẩn 180 điểm của kỳ thi HSK quốc tế.`
        : `Bạn đạt ${totalScore}/300 điểm. Cần thêm ${180 - totalScore} điểm nữa để đạt ngưỡng đỗ 180/300 của HSK.`
    };
  }

  if (languageId === 'japanese') {
    const noSectionFailed = values.every(v => v >= 19);
    const isPassed = totalScore >= 90 && noSectionFailed;
    let level = 'Chưa đỗ JLPT N2';
    if (!noSectionFailed) level = 'Điểm liệt thành phần (<19/60 điểm)';
    else if (totalScore >= 140) level = 'Đỗ JLPT N2 Xuất sắc (Tiệm cận N1)';
    else if (totalScore >= 90) level = 'Đỗ chính thức JLPT N2 (合格 - Goukaku)';

    return {
      totalScore,
      maxTotalScore,
      percentage,
      levelAchieved: level,
      isPassed,
      verdictInVietnamese: isPassed
        ? `合格 (Goukaku)! Bạn đạt ${totalScore}/180 điểm và không có phần thi nào dưới điểm liệt 19/60.`
        : !noSectionFailed
        ? `Chưa đỗ: Dù tổng điểm là ${totalScore}/180 nhưng có ít nhất 1 kỹ năng bị điểm liệt dưới 19/60 điểm.`
        : `Chưa đỗ: Tổng điểm ${totalScore}/180 chưa đạt mốc chuẩn 90/180 của JLPT N2.`
    };
  }

  if (languageId === 'korean') {
    const isPassed = totalScore >= 120;
    let level = 'Chưa đạt TOPIK II (<120đ)';
    if (totalScore >= 230) level = 'TOPIK II Cấp 6 (6급 - Cao cấp nhất)';
    else if (totalScore >= 190) level = 'TOPIK II Cấp 5 (5급 - Cao cấp)';
    else if (totalScore >= 150) level = 'TOPIK II Cấp 4 (4급 - Đủ chuẩn Đại học & Doanh nghiệp)';
    else if (totalScore >= 120) level = 'TOPIK II Cấp 3 (3급 - Trung cấp)';

    return {
      totalScore,
      maxTotalScore,
      percentage,
      levelAchieved: level,
      isPassed,
      verdictInVietnamese: isPassed
        ? `Chúc mừng! Với ${totalScore}/300 điểm, bạn chính thức đạt ${level}.`
        : `Bạn đạt ${totalScore}/300 điểm. Cần đạt tối thiểu 120 điểm để lấy Cấp 3 hoặc 150 điểm để lấy Cấp 4 TOPIK II.`
    };
  }

  if (languageId === 'french') {
    const noSectionFailed = values.every(v => v >= 5);
    const isPassed = totalScore >= 50 && noSectionFailed;
    let level = 'Non admis (Chưa đạt DELF B2)';
    if (!noSectionFailed) level = 'Điểm liệt kỹ năng (<5/25 điểm)';
    else if (totalScore >= 80) level = 'DELF B2 - Mention Très Bien (Xuất sắc)';
    else if (totalScore >= 65) level = 'DELF B2 - Mention Bien (Giỏi)';
    else if (totalScore >= 50) level = 'DELF B2 - Admis (Đạt văn bằng vĩnh viễn)';

    return {
      totalScore,
      maxTotalScore,
      percentage,
      levelAchieved: level,
      isPassed,
      verdictInVietnamese: isPassed
        ? `Félicitations! Bạn đạt ${totalScore}/100 điểm và không kỹ năng nào dưới ngưỡng liệt 5/25.`
        : `Chưa đạt DELF: Yêu cầu tổng điểm ≥ 50/100 và không có kỹ năng nào dưới 5/25 điểm.`
    };
  }

  // Spanish DELE
  const isPassed = totalScore >= 60 && values.every(v => v >= 15);
  const level = isPassed ? 'DELE B2 - APTO (Đạt văn bằng Instituto Cervantes)' : 'NO APTO (Chưa đạt chuẩn 60/100)';
  return {
    totalScore,
    maxTotalScore,
    percentage,
    levelAchieved: level,
    isPassed,
    verdictInVietnamese: isPassed
      ? `¡Enhorabuena! Bạn đạt kết quả APTO (${totalScore}/100 điểm) cho kỳ thi DELE B2.`
      : `Kết quả NO APTO (${totalScore}/100 điểm). DELE yêu cầu đạt tối thiểu 60/100 và mỗi kỹ năng đạt từ 15/25 trở lên.`
  };
}

/**
 * Helper to return enriched questions for a course's exam without mixing languages.
 */
export function getLanguagePureExamQuestions(
  languageId: string,
  baseQuestions: ExamQuestion[]
): ExamQuestion[] {
  const meta = MULTI_LANG_EXAM_METADATA[languageId];
  if (!meta) return baseQuestions;
  // Combine extraQuestions (which have explicit skill tags listening/reading/writing/speaking)
  return meta.extraQuestions;
}
