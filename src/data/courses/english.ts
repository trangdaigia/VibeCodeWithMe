import { LanguageCourse } from '../curriculum';
import { ieltsQuestions, ieltsWritingPrompts, ieltsSpeakingCueCards } from './englishIeltsData';
import { ieltsGtQuestions, ieltsGtWritingPrompts } from './englishIeltsGtData';
import { ieltsTestSets } from './englishIeltsSetsData';
import { ieltsVideoLessons } from './englishIeltsVideoData';

export const englishCourse: LanguageCourse = {
  id: 'english',
  name: 'English',
  nativeName: 'English',
  vietnameseName: 'Tiếng Anh',
  flagEmoji: '🇬🇧',
  flagColor: '#2563eb',
  voiceLangCode: 'en-US',
  scriptType: 'Bảng chữ cái Latinh & Phiên âm IPA chuẩn quốc tế (Oxford / Cambridge)',
  examInfo: [
    {
      examName: 'IELTS Academic & General Training',
      targetLevel: 'Band 6.5 - 8.5+ (Học Thuật & Định Cư Toàn Cầu)',
      overview: 'Hệ thống kiểm tra Anh ngữ quốc tế đánh giá 4 kỹ năng Nghe, Đọc, Viết, Nói do Cambridge, IDP và British Council đồng sở hữu. Hỗ trợ chuẩn xác 2 phân hệ chuyên biệt: IELTS Academic (Du học & Nghiên cứu) và IELTS General Training (Định cư Úc/Canada/NZ & Làm việc quốc tế).',
      formatSections: [
        'Listening: 4 phần, 40 câu hỏi từ đời sống đến học thuật (30 phút nghe + thời gian chuyển đáp án)',
        'Academic Reading: 3 bài luận khoa học dài, 40 câu hỏi True/False/Not Given, Matching Headings (60 phút)',
        'General Training Reading: 3 phần (Section 1: Đời sống thường nhật - Social Survival; Section 2: Môi trường làm việc - Workplace Survival; Section 3: Bài đọc tổng quát) với thang điểm quy đổi khắt khe hơn (Band 7.0 cần 34-35/40 câu)',
        'Academic Writing: Task 1 miêu tả biểu đồ xu hướng / quy trình + Task 2 bài luận học thuật (60 phút)',
        'General Training Writing: Task 1 viết thư Letter với 3 phong cách hành văn (Formal, Semi-formal, Informal) + Task 2 bài luận đời sống xã hội (60 phút)',
        'Speaking: Phỏng vấn trực tiếp 1-1 gồm 3 phần: Giới thiệu bản thân (Part 1), Độc thoại theo Cue Card 2 phút (Part 2), và Thảo luận mở rộng trừu tượng (Part 3) - tổng cộng 11-14 phút'
      ],
      strategyTips: [
        'IELTS General Training Reading: Vì bài đọc GT gần gũi với đời sống hơn Academic, thang điểm quy đổi khắt khe hơn đáng kể (cần 34-35/40 để đạt Band 7.0 thay vì 30-31 câu như Academic). Cần cẩn trọng tuyệt đối với các bẫy điều kiện trong nội quy và thông báo.',
        'IELTS GT Writing Task 1: Xác định đúng phong cách (Tone): Thư Formal (khiếu nại, xin việc) dùng "Dear Sir or Madam ... Yours faithfully"; Thư Semi-formal (chủ nhà, đồng nghiệp) dùng "Dear Mr. ... Yours sincerely"; Thư Informal (bạn bè) dùng từ ngữ gần gũi và ký tên thân mật.',
        'Speaking Part 1 & 3: Áp dụng công thức A.R.E.A (Answer - Reason - Example - Alternative) để câu trả lời luôn có chiều sâu, mở rộng tự nhiên từ 3-5 câu mà không bị ậm ừ ngắt quãng.',
        'Writing Task 2: Dành 5 phút đầu lập dàn ý theo mô hình PEEL (Point - Explain - Evidence - Link), đảm bảo mỗi đoạn thân bài chỉ tập trung vào 1 luận điểm duy nhất kèm dẫn chứng thuyết phục.',
        'Listening Signpost Words: Luôn chú ý các từ chuyển hướng tư duy như "However", "In contrast", "Surprisingly", "In fact", vì thông tin theo sau thường là đáp án thật nhằm bẫy người nghe vội vàng.'
      ],
      sampleQuestions: [...ieltsQuestions, ...ieltsGtQuestions],
      writingPrompts: [...ieltsWritingPrompts, ...ieltsGtWritingPrompts],
      speakingCueCards: ieltsSpeakingCueCards,
      testSets: ieltsTestSets,
      videoLessons: ieltsVideoLessons
    },
    {
      examName: 'TOEIC (Test of English for International Communication)',
      targetLevel: '750 - 990 Điểm Tuyệt Đối',
      overview: 'Thước đo tiêu chuẩn vàng quốc tế của Viện Khảo thí Giáo dục Hoa Kỳ (ETS) về khả năng sử dụng tiếng Anh trong môi trường thương mại, văn phòng doanh nghiệp FDI, logistics và ngân hàng.',
      formatSections: [
        'Listening Comprehension (Part 1 - 4): 100 câu trắc nghiệm (Hình ảnh, Hỏi-Đáp nhanh, Hội thoại ngắn, Độc thoại thông báo) - 45 phút',
        'Reading Comprehension (Part 5 - 7): 100 câu trắc nghiệm (Điền từ vào câu, Điền đoạn văn, Đọc hiểu thư tín/báo cáo/hợp đồng/chuỗi email công sở) - 75 phút'
      ],
      strategyTips: [
        'Part 2 (Hỏi - Đáp): Tập trung cao độ nghe từ để hỏi đầu câu (Who, Where, When, Why, How, Did you). Đề thi luôn cài bẫy từ phát âm tương tự (Same Sound Trap) hoặc lặp lại từ trong câu hỏi.',
        'Part 5 (Ngữ pháp & Từ vựng): Nhìn 2 từ đứng liền trước và liền sau chỗ trống để xác định loại từ (Danh từ, Động từ, Tính từ, Trạng từ) trong vòng 5-10 giây mỗi câu.',
        'Chiến thuật thời gian Part 7: Dành tối đa 50 phút cho 54 câu đọc hiểu, tuyệt đối không dừng lại ở bất kỳ câu khó nào quá 60 giây.'
      ],
      sampleQuestions: [
        {
          question: 'TOEIC Part 5: "The board members ______ decided to expand into Southeast Asian markets after reviewing the Q3 performance."',
          options: ['unanimously', 'unanimous', 'unanimity', 'unanimousness'],
          correctAnswer: 'unanimously',
          explanationInVietnamese: 'Vị trí giữa chủ ngữ "The board members" và động từ chính "decided" cần một TRẠNG TỪ (Adverb đuôi -ly) để bổ nghĩa: "unanimously decided" (nhất trí đồng lòng quyết định).'
        },
        {
          question: 'TOEIC Part 5: "All travel expenses must be submitted to the accounting department ______ five business days of returning from the conference."',
          options: ['within', 'between', 'during', 'among'],
          correctAnswer: 'within',
          explanationInVietnamese: 'Cấu trúc chỉ thời hạn chót: "within + khoảng thời gian" có nghĩa là "trong vòng 5 ngày làm việc".'
        },
        {
          question: 'TOEIC Part 6: "Please be ______ that the scheduled server maintenance will take place this Saturday from 10 PM to 2 AM."',
          options: ['advised', 'advise', 'advisable', 'advising'],
          correctAnswer: 'advised',
          explanationInVietnamese: 'Cụm từ thông báo trang trọng trong công văn doanh nghiệp: "Please be advised that..." (Xin lưu ý/được thông báo rằng...).'
        },
        {
          question: 'TOEIC Part 5: "Mr. Henderson requested that all project deliverables ______ submitted prior to the Friday deadline."',
          options: ['be', 'are', 'were', 'being'],
          correctAnswer: 'be',
          explanationInVietnamese: 'Cấu trúc giả định thức (Subjunctive mood) sau động từ yêu cầu: "request that + S + (should) + V-nguyên thể không chia", do đó đáp án chuẩn xác là "be submitted".'
        }
      ]
    },
    {
      examName: 'Cambridge C1 Advanced (CAE) / TOEFL iBT',
      targetLevel: 'C1 - C2 Advanced Mastery',
      overview: 'Chứng chỉ năng lực Anh ngữ cao cấp của Đại học Cambridge và ETS, công nhận khả năng tư duy học thuật độc lập, tranh luận đa chiều và nghiên cứu khoa học tại các viện hàn lâm hàng đầu.',
      formatSections: [
        'Reading and Use of English: 90 phút (Biến đổi câu giữ nguyên nghĩa, điền từ khuyết, đoạn văn học thuật phức tạp)',
        'Writing: 90 phút (Bài luận tranh biện tổng hợp 2 ý kiến đối lập và 1 bài viết tùy chọn: Báo cáo, Đề xuất dự án, Đánh giá chuyên sâu)',
        'Listening: 40 phút (Bài giảng đại học, phỏng vấn chuyên gia khoa học xã hội)',
        'Speaking: 15 phút (Tranh luận phản biện đa chiều cùng bạn thi trước 2 giám khảo)'
      ],
      strategyTips: [
        'Use of English Part 4: Luyện thành thạo các cấu trúc đảo ngữ (Inversion), câu chẻ (Cleft sentences) và thành ngữ nâng cao.',
        'Writing Proposals: Sử dụng tiêu đề phân đoạn rõ ràng (Introduction, Current Situation, Recommendations, Expected Outcomes).'
      ],
      sampleQuestions: [
        {
          question: 'C1 Sentence Transformation: "I only realized the significance of the contract when I read the fine print." -> "Not until I read the fine print ______ the significance of the contract."',
          options: [
            'did I realize',
            'I realized',
            'had I realized',
            'I did realize'
          ],
          correctAnswer: 'did I realize',
          explanationInVietnamese: 'Cấu trúc đảo ngữ với cụm phủ định đầu câu: "Not until + Mệnh đề thời gian + Trợ động từ (did) + Chủ ngữ (I) + Động từ nguyên thể (realize)".'
        },
        {
          question: 'C1 Vocabulary Collocation: "The company’s innovative marketing campaign ______ a chord with eco-conscious consumers across the nation."',
          options: ['struck', 'hit', 'touched', 'rang'],
          correctAnswer: 'struck',
          explanationInVietnamese: 'Thành ngữ cố định C1/C2: "strike a chord with someone" có nghĩa là đánh trúng tâm lý, gợi lên sự đồng cảm sâu sắc ở người khác.'
        }
      ]
    }
  ],
  units: [
    {
      id: 'en-u1',
      number: 1,
      track: 'daily',
      title: 'Giao Tiếp Đời Sống Cơ Bản, Small Talk & Kết Nối Bạn Bè',
      description: 'Học cách mở lời chào tự nhiên, xưng hô lịch thiệp, nghệ thuật bắt chuyện phá băng (small talk), rủ bạn bè và nghệ thuật khen ngợi.',
      cefrLevel: 'A1 - A2',
      lessons: [
        {
          id: 'en-l1',
          track: 'daily',
          title: 'Làm quen & Chào hỏi tự nhiên',
          description: 'Cách người bản xứ mở lời chào, hỏi thăm và kết nối bạn bè mà không bị gượng gạo theo sách vở cũ.',
          durationMinutes: 6,
          xpReward: 40,
          exercises: [
            {
              id: 'en-e1',
              type: 'flashcard',
              prompt: 'Cách chào hỏi thân thiện, tự nhiên của người bản xứ',
              targetText: 'How have you been lately?',
              romanization: '/haʊ hæv juː biːn ˈleɪt.li/',
              vietnameseMeaning: 'Dạo này bạn thế nào rồi? (ấm áp hơn "How are you?")',
              audioText: 'How have you been lately?',
              explanation: 'Dùng khi gặp lại người quen hoặc đồng nghiệp sau một khoảng thời gian.',
              culturalNote: 'Người Anh/Mỹ thường trả lời ngắn gọn: "Pretty good, thanks! How about yourself?"'
            },
            {
              id: 'en-e1-listen',
              type: 'listening_drill',
              prompt: 'Lắng nghe ngữ điệu chào hỏi thân mật giữa hai người bạn thân:',
              audioText: 'Hey there! Long time no see, it is so good to run into you!',
              options: [
                'Chào hỏi thân thiết khi tình cờ gặp lại bạn cũ sau thời gian dài',
                'Lời chào trang trọng trong cuộc phỏng vấn xin việc',
                'Lời chào tạm biệt khi kết thúc buổi làm việc',
                'Lời phàn nàn vì người khác đến muộn'
              ],
              correctAnswer: 'Chào hỏi thân thiết khi tình cờ gặp lại bạn cũ sau thời gian dài',
              explanation: '"Long time no see" và "run into someone" là cụm từ kinh điển khi tình cờ gặp lại người quen.'
            },
            {
              id: 'en-e2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Rất vui được gặp bạn, tôi vừa mới chuyển đến đây."',
              targetText: 'Nice to meet you, I just moved here.',
              wordTokens: ['Nice', 'to meet', 'you,', 'I', 'just', 'moved', 'here.', 'coffee', 'tomorrow'],
              explanation: '"Just + V-quá khứ" diễn tả hành động vừa mới xảy ra trong quá khứ gần.'
            },
            {
              id: 'en-e-speak1',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu chào hỏi và biểu đạt niềm vui khi gặp lại bạn bè:',
              targetText: 'How have you been lately? It is great to see you again!',
              targetPhonetic: 'haʊ hæv juː biːn ˈleɪtli? ɪt ɪz ɡreɪt tuː siː juː əˈɡen!',
              vietnameseMeaning: 'Dạo này bạn thế nào rồi? Rất vui được gặp lại bạn!',
              audioText: 'How have you been lately? It is great to see you again!',
              speakingHints: [
                'Nhấn trọng âm vào từ "lately" và "great"',
                'Lướt nhẹ cụm "have you been" với tốc độ tự nhiên',
                'Lên giọng nhẹ ở cuối câu hỏi để tạo không khí ấm áp, chân thành'
              ]
            },
            {
              id: 'en-e3b',
              type: 'fill_blank',
              prompt: 'Điền cụm từ phù hợp: "Good morning! It is ______ pleasure to finally meet you in person."',
              options: ['a genuine', 'some real', 'the very', 'many'],
              correctAnswer: 'a genuine',
              explanation: '"It is a genuine pleasure to meet you" (Thật sự là một vinh hạnh lớn khi được gặp bạn) là cách biểu đạt trang nhã và chân thành.'
            },
            {
              id: 'en-e-write1',
              type: 'writing_drill',
              prompt: 'Viết câu mở đầu chào hỏi và bày tỏ mong đợi được hợp tác cùng đối tác:',
              vietnameseMeaning: 'Tình huống: Bạn gặp đối tác quốc tế mới tại buổi hội thảo. Hãy viết câu hoàn chỉnh chào mừng và bày tỏ mong muốn được hợp tác cùng họ.',
              targetText: 'It is a pleasure to meet you, and I look forward to working together.',
              acceptableAnswers: [
                'It is a pleasure to meet you, and I look forward to working with you.',
                'It is a real pleasure to meet you, and I look forward to our cooperation.',
                'Nice to meet you, I look forward to working together.'
              ],
              requiredKeywords: ['pleasure', 'meet', 'forward'],
              minWords: 6,
              grammarFocus: 'Cấu trúc trang trọng: "It is a pleasure to meet you" + "look forward to + V-ing/Noun"',
              explanation: 'Kết hợp hài hòa giữa sự lịch thiệp khi gặp gỡ và thái độ tích cực hướng tới tương lai hợp tác.'
            },
            {
              id: 'en-e3',
              type: 'quiz_choice',
              prompt: 'Khi muốn xin phép ngắt lời ai đó một cách lịch sự trong cuộc trò chuyện, người bản xứ hay nói gì?',
              options: ['Sorry to interrupt, but...', 'Stop talking please.', 'Listen to me now.', 'Hey you, be quiet.'],
              correctAnswer: 'Sorry to interrupt, but...',
              explanation: '"Sorry to interrupt, but..." là câu mở đầu kinh điển vừa lịch thiệp vừa chuyên nghiệp.',
              audioText: 'Sorry to interrupt, but could I ask a quick question?'
            }
          ]
        },
        {
          id: 'en-l2',
          track: 'daily',
          title: 'Bắt chuyện xã giao (Small Talk) & Thời tiết',
          description: 'Nắm vững nghệ thuật Small Talk của người phương Tây để phá băng (break the ice) trong thang máy hay tiệc tùng.',
          durationMinutes: 6,
          xpReward: 40,
          exercises: [
            {
              id: 'en-e4',
              type: 'flashcard',
              prompt: 'Mẫu câu phá băng về thời tiết và không khí',
              targetText: 'Can you believe this weather we are having?',
              romanization: '/kæn juː bɪˈliːv ðɪs ˈweð.ər wiː ɑːr ˈhæv.ɪŋ/',
              vietnameseMeaning: 'Bạn có tin nổi thời tiết hôm nay không? (mở đầu small talk cực phổ biến)',
              audioText: 'Can you believe this weather we are having today?',
              explanation: 'Tại Anh và Mỹ, thời tiết là chủ đề an toàn và tự nhiên nhất để bắt chuyện với người lạ.',
              culturalNote: 'Không nên hỏi ngay về lương bổng hay tình trạng hôn nhân khi mới gặp lần đầu.'
            },
            {
              id: 'en-e5',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "I am really looking ______ the weekend. Any plans?"',
              options: ['forward to', 'ahead of', 'up to', 'out for'],
              correctAnswer: 'forward to',
              explanation: 'Cấu trúc cố định "look forward to + Noun/V-ing" nghĩa là rất mong chờ, háo hức điều gì.'
            },
            {
              id: 'en-e-speak2',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu phá băng về thời tiết với ngữ điệu ngạc nhiên, tự nhiên:',
              targetText: 'Can you believe this gorgeous weather we are having today?',
              targetPhonetic: 'kæn juː bɪˈliːv ðɪs ˈɡɔːdʒəs ˈweðər wiː ɑːr ˈhævɪŋ təˈdeɪ?',
              vietnameseMeaning: 'Bạn có tin nổi thời tiết hôm nay tuyệt đẹp thế này không?',
              audioText: 'Can you believe this gorgeous weather we are having today?',
              speakingHints: [
                'Nhấn giọng vào tính từ "gorgeous" (tuyệt đẹp)',
                'Cụm "weather we are having" phát âm liền mạch không dừng',
                'Giữ giọng điệu cởi mở, thân thiện'
              ]
            },
            {
              id: 'en-e6b',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Thời tiết hôm nay đẹp thật, trời trong veo và nhiều nắng."',
              targetText: 'The weather is gorgeous today, crisp and sunny.',
              wordTokens: ['The weather', 'is gorgeous', 'today,', 'crisp', 'and sunny.', 'bad', 'rainy'],
              explanation: '"Crisp and sunny" (se lạnh dễ chịu và chan hòa ánh nắng) là cách miêu tả thời tiết rất giàu cảm xúc của người bản xứ.'
            },
            {
              id: 'en-e-write2',
              type: 'writing_drill',
              prompt: 'Viết câu small talk chúc đồng nghiệp cuối tuần vui vẻ và hỏi kế hoạch:',
              vietnameseMeaning: 'Tình huống: Chiều thứ Sáu khi tan sở tại sảnh thang máy, bạn gặp đồng nghiệp cùng phòng. Hãy viết một câu chúc họ cuối tuần vui vẻ và hỏi xem họ có dự định gì thú vị không.',
              targetText: 'Have a wonderful weekend ahead, do you have any fun plans?',
              acceptableAnswers: [
                'Have a great weekend, do you have any plans?',
                'Have a wonderful weekend ahead, any exciting plans?',
                'Have a nice weekend, do you have any plans for the weekend?'
              ],
              requiredKeywords: ['weekend', 'plans'],
              minWords: 6,
              grammarFocus: 'Thì hiện tại đơn kết hợp cấu trúc lời chúc: "Have a wonderful weekend ahead" + câu hỏi "Do you have any plans?"',
              explanation: 'Cách hỏi này vừa tôn trọng không gian riêng tư vừa thể hiện sự quan tâm thân tình.'
            },
            {
              id: 'en-e6',
              type: 'quiz_choice',
              prompt: 'Ai đó nói: "Have a great weekend!" Bạn nên đáp lại tự nhiên nhất như thế nào?',
              options: ['Thanks, you too!', 'Yes, I will have it.', 'No problem.', 'I agree with you.'],
              correctAnswer: 'Thanks, you too!',
              explanation: '"Thanks, you too!" (Cảm ơn bạn, bạn cũng vậy nhé!) là câu phản xạ chuẩn tự nhiên nhất.'
            }
          ]
        },
        {
          id: 'en-l3',
          track: 'daily',
          title: 'Hẹn gặp, Rủ bạn bè đi cà phê & Từ chối khéo léo',
          description: 'Cách đề xuất lịch hẹn, từ chối khéo khi bận (Rain check) mà không làm mất lòng người khác.',
          durationMinutes: 6,
          xpReward: 40,
          exercises: [
            {
              id: 'en-e7',
              type: 'flashcard',
              prompt: 'Mẫu câu hẹn lại dịp khác khi bận',
              targetText: 'Can I take a rain check on that?',
              romanization: '/kæn aɪ teɪk ə reɪn tʃek ɒn ðæt/',
              vietnameseMeaning: 'Để mình hẹn lại bạn vào dịp khác được không? (từ chối cực kỳ khéo léo)',
              audioText: 'Can I take a rain check on that?',
              explanation: '"Take a rain check" bắt nguồn từ vé xem bóng chày bị hoãn do trời mưa, dùng để hẹn lại sau.',
              culturalNote: 'Thay vì nói cụt lủn "No, I am busy", câu này giúp giữ gìn mối quan hệ rất ấm áp.'
            },
            {
              id: 'en-e8',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Chiều thứ Sáu này bạn có rảnh đi cà phê không?"',
              targetText: 'Are you free for coffee this Friday afternoon?',
              wordTokens: ['Are you', 'free', 'for coffee', 'this', 'Friday', 'afternoon?', 'busy', 'morning'],
              explanation: 'Cấu trúc rủ rê thân mật: "Are you free for [activity] + [time]?"'
            },
            {
              id: 'en-e-speak3',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu rủ bạn bè đi cà phê tâm sự dịp cuối tuần:',
              targetText: 'Are you free for a quick coffee this Friday afternoon?',
              targetPhonetic: 'ɑːr juː friː fɔːr ə kwɪk ˈkɒfi ðɪs ˈfraɪdeɪ ˌɑːftəˈnuːn?',
              vietnameseMeaning: 'Chiều thứ Sáu này bạn có rảnh uống ly cà phê nhanh với mình không?',
              audioText: 'Are you free for a quick coffee this Friday afternoon?',
              speakingHints: [
                'Nối âm nhẹ giữa "free for a" -> /friː fər ə/',
                'Nhấn âm vào "quick coffee" và "Friday"',
                'Lên giọng ở cuối câu hỏi Yes/No'
              ]
            },
            {
              id: 'en-e8-catchup',
              type: 'fill_blank',
              prompt: 'Điền cụm từ rủ bạn bè: "It has been ages! We should definitely ______ sometime next week."',
              options: ['catch up', 'bring down', 'take after', 'look out'],
              correctAnswer: 'catch up',
              explanation: '"Catch up" (gặp gỡ hàn huyên tâm sự sau thời gian dài không gặp).'
            },
            {
              id: 'en-e-write3',
              type: 'writing_drill',
              prompt: 'Viết câu từ chối khéo léo lời mời ăn tối và đề xuất gặp vào tuần sau:',
              vietnameseMeaning: 'Tình huống: Bạn nhận được lời rủ đi ăn tối tối nay nhưng đang bận chuẩn bị báo cáo. Hãy dùng cụm "rain check" để từ chối khéo léo và đề xuất gặp vào tuần sau.',
              targetText: 'Can I please take a rain check and catch up sometime next week?',
              acceptableAnswers: [
                'Can I take a rain check and meet up next week?',
                'Could I take a rain check on that and catch up next week?',
                'I have to take a rain check, but let us catch up next week.'
              ],
              requiredKeywords: ['rain check', 'next week'],
              minWords: 6,
              grammarFocus: 'Cụm thành ngữ: "take a rain check" kết hợp cụm rủ rê "catch up next week"',
              explanation: 'Lời từ chối lịch thiệp giúp người mời không cảm thấy bị hắt hủi và mở ra cơ hội gặp lại.'
            }
          ]
        },
        {
          id: 'en-l4-shop',
          track: 'daily',
          title: 'Mua Sắm Tại Trung Tâm Thương Mại & Đổi Trả Hàng (Shopping & Returns)',
          description: 'Hỏi size quần áo, phòng thử đồ, kiểm tra chính sách đổi trả (Refund/Exchange policy) và xin hóa đơn quà tặng.',
          durationMinutes: 6,
          xpReward: 40,
          exercises: [
            {
              id: 'en-e8b',
              type: 'flashcard',
              prompt: 'Hỏi nhân viên cửa hàng xem có cỡ áo khác không',
              targetText: 'Do you happen to have this jacket in a medium size?',
              romanization: '/duː juː ˈhæp.ən tuː hæv ðɪs ˈdʒæk.ɪt ɪn ə ˈmiː.di.əm saɪz/',
              vietnameseMeaning: 'Bạn có chiếc áo khoác này ở kích cỡ M không ạ?',
              audioText: 'Do you happen to have this jacket in a medium size?',
              explanation: '"Do you happen to have..." là cách mở lời lịch sự, nhẹ nhàng hơn so với "Give me size M".',
              culturalNote: 'Ở các nước phương Tây, các cửa hàng bán lẻ thường cho phép đổi trả miễn phí trong 14 đến 30 ngày nếu còn hóa đơn (Receipt).'
            },
            {
              id: 'en-e8c',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi muốn đổi chiếc áo len này lấy một màu khác."',
              targetText: 'I would like to exchange this sweater for a different color.',
              wordTokens: ['I would like', 'to exchange', 'this sweater', 'for a', 'different color.', 'eat', 'tomorrow'],
              explanation: 'Cấu trúc đổi hàng hóa: "Exchange [Item A] for [Item B]".'
            },
            {
              id: 'en-e-speak4',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu hỏi lịch thiệp khi tìm size quần áo:',
              targetText: 'Excuse me, do you happen to have this in a larger size?',
              targetPhonetic: 'ɪkˈskjuːz miː, duː juː ˈhæpən tuː hæv ðɪs ɪn ə ˈlɑːdʒər saɪz?',
              vietnameseMeaning: 'Xin lỗi bạn, mẫu này bạn có kích cỡ lớn hơn không ạ?',
              audioText: 'Excuse me, do you happen to have this in a larger size?',
              speakingHints: [
                'Bắt đầu bằng cụm "Excuse me" mềm mại',
                'Nối âm: "this in a" -> /ðɪs ɪn ə/',
                'Nhấn mạnh vào từ "larger size"'
              ]
            },
            {
              id: 'en-e-write4',
              type: 'writing_drill',
              prompt: 'Viết câu yêu cầu đổi hàng hoặc xin hoàn tiền tại quầy dịch vụ khách hàng:',
              vietnameseMeaning: 'Tình huống: Chiếc áo bạn mua bị rách đường chỉ. Hãy viết một câu lịch thiệp xin đổi sang chiếc áo mới hoặc hoàn tiền và cho biết bạn vẫn giữ hóa đơn mua hàng.',
              targetText: 'I would like to exchange this item or get a refund with my receipt.',
              acceptableAnswers: [
                'Could I please exchange this item or get a full refund with my receipt?',
                'I would like to return this defective item for a refund, here is my receipt.',
                'Can I get a refund or exchange for this item with my receipt?'
              ],
              requiredKeywords: ['exchange', 'refund', 'receipt'],
              minWords: 6,
              grammarFocus: 'Cấu trúc công sở: "would like to exchange... or get a refund with my receipt"',
              explanation: 'Sử dụng từ vựng chính xác như "exchange", "refund" và "receipt" giúp quầy dịch vụ giải quyết nhanh gọn.'
            },
            {
              id: 'en-e8d',
              type: 'quiz_choice',
              prompt: 'Khi muốn được hoàn lại tiền vào thẻ vì hàng bị lỗi, bạn nói với quầy dịch vụ khách hàng như thế nào?',
              options: [
                'Could I please get a full refund for this defective item?',
                'Give me my money back right now.',
                'I do not want this, pay me cash.',
                'Take this and throw away.'
              ],
              correctAnswer: 'Could I please get a full refund for this defective item?',
              explanation: '"Full refund" là hoàn tiền toàn bộ; "defective item" là hàng bị lỗi kỹ thuật hoặc hư hại.'
            }
          ]
        },
        {
          id: 'en-l1-comp',
          track: 'daily',
          title: 'Khen Ngợi, Đáp Lại Lời Khen & Lòng Biết Ơn (Compliments & Gratitude)',
          description: 'Nghệ thuật khen ngợi trang phục, thành tựu của bạn bè và cách đáp lại tự nhiên, khiêm tốn nhưng tự tin.',
          durationMinutes: 6,
          xpReward: 40,
          exercises: [
            {
              id: 'en-e1-comp1',
              type: 'flashcard',
              prompt: 'Khen ngợi phong cách ăn mặc hoặc món đồ của ai đó',
              targetText: 'That color looks stunning on you! Where did you get it?',
              romanization: '/ðæt ˈkʌl.ər lʊks ˈstʌn.ɪŋ ɒn juː weər dɪd juː ɡet ɪt/',
              vietnameseMeaning: 'Màu đó mặc lên người bạn đẹp xuất sắc luôn! Bạn mua ở đâu thế?',
              audioText: 'That color looks stunning on you! Where did you get it?',
              explanation: '"Looks stunning on you" (trông tuyệt đẹp khi bạn mặc lên) là lời khen tự nhiên và ấm áp.',
              culturalNote: 'Người bản xứ thích được khen cụ thể về gu thẩm mỹ thay vì những câu khen chung chung.'
            },
            {
              id: 'en-e-speak-comp',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu khen ngợi đồng nghiệp về bài thuyết trình xuất sắc:',
              targetText: 'You did a fantastic job on the presentation today!',
              targetPhonetic: 'juː dɪd ə fænˈtæstɪk dʒɒb ɒn ðə ˌpreznˈteɪʃn təˈdeɪ!',
              vietnameseMeaning: 'Hôm nay bạn đã làm bài thuyết trình cực kỳ xuất sắc!',
              audioText: 'You did a fantastic job on the presentation today!',
              speakingHints: [
                'Nhấn mạnh vào từ "fantastic job"',
                'Ngữ điệu vui tươi, chân thành'
              ]
            },
            {
              id: 'en-e1-comp3',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi thật sự không thể hoàn thành nó nếu không có sự giúp đỡ quý báu của bạn."',
              targetText: 'I could not have done it without your valuable help.',
              wordTokens: ['I could not', 'have done it', 'without your', 'valuable', 'help.', 'alone', 'problem'],
              explanation: 'Cấu trúc giả định quá khứ "could not have done it without..." thể hiện sự trân trọng sâu sắc.'
            },
            {
              id: 'en-e-write-comp',
              type: 'writing_drill',
              prompt: 'Viết câu cảm ơn sâu sắc gửi tới người đã hỗ trợ bạn trong công việc:',
              vietnameseMeaning: 'Tình huống: Một người đồng nghiệp đã dành thời gian hỗ trợ bạn giải quyết xong dự án gấp. Hãy viết câu cảm ơn chân thành bày tỏ lòng biết ơn của bạn.',
              targetText: 'Thank you so much, I truly appreciate your valuable support and guidance.',
              acceptableAnswers: [
                'Thank you so much, I really appreciate your valuable support.',
                'Thank you very much, I appreciate your wonderful support on this project.',
                'I truly appreciate your kind support and help with this project.'
              ],
              requiredKeywords: ['appreciate', 'support'],
              minWords: 6,
              grammarFocus: 'Cấu trúc tri ân: "I truly appreciate your + [support/help/guidance]"',
              explanation: 'Sử dụng động từ "appreciate" thay cho "thank you" thông thường mang tính lịch thiệp và chuyên nghiệp rất cao.'
            },
            {
              id: 'en-e1-comp2',
              type: 'quiz_choice',
              prompt: 'Khi ai đó khen: "You did a fantastic presentation today!", cách đáp lại tự nhiên và khiêm tốn nhất là gì?',
              options: [
                'Thank you so much! I really appreciate the kind words.',
                'Yes, I know I am the best presenter here.',
                'No no, it was terrible and awful.',
                'Do not look at me.'
              ],
              correctAnswer: 'Thank you so much! I really appreciate the kind words.',
              explanation: '"Thank you so much! I really appreciate the kind words." thể hiện sự tự tin và lòng biết ơn nhã nhặn.'
            }
          ]
        }
      ]
    },
    {
      id: 'en-u2',
      number: 2,
      track: 'daily',
      title: 'Ẩm Thực, Du Lịch Quốc Tế & Xử Lý Tình Huống Khẩn Cấp',
      description: 'Gọi món chuẩn như người bản xứ, yêu cầu chỉnh sửa theo chế độ ăn, văn hóa tiền tip, thuê nhà và xử lý sự cố sân bay.',
      cefrLevel: 'A2 - B1',
      lessons: [
        {
          id: 'en-l4',
          track: 'daily',
          title: 'Gọi món tại Nhà hàng, Chế độ ăn & Văn hóa Tiền Tip',
          description: 'Cách gọi món lịch sự, hỏi món đặc biệt (specials), dị ứng thực phẩm và nắm vững văn hóa tiền tip tại Mỹ và Châu Âu.',
          durationMinutes: 6,
          xpReward: 40,
          exercises: [
            {
              id: 'en-e9',
              type: 'flashcard',
              prompt: 'Cách gọi món nhã nhặn nhất kèm yêu cầu riêng',
              targetText: 'Could I please get the grilled salmon with dressing on the side?',
              romanization: '/kʊd aɪ pliːz ɡet ðə ɡrɪld ˈsæm.ən wɪð ˈdres.ɪŋ ɒn ðə saɪd/',
              vietnameseMeaning: 'Cho tôi xin món cá hồi nướng, để nước sốt riêng ra đĩa nhé.',
              audioText: 'Could I please get the grilled salmon with dressing on the side?',
              explanation: '"Dressing on the side" là cụm từ vàng khi muốn để nước sốt riêng để tự nêm nếm.',
              culturalNote: 'Tại Mỹ/Canada, tiền tip thường dao động từ 18% - 20% trên tổng hóa đơn chưa thuế.'
            },
            {
              id: 'en-e10',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Chúng tôi đã sẵn sàng gọi món rồi."',
              targetText: 'We are ready to order whenever you are.',
              wordTokens: ['We are', 'ready', 'to order', 'whenever', 'you are.', 'food', 'bill'],
              explanation: 'Cách ra hiệu lịch sự cho bồi bàn khi cả bàn đã xem xong thực đơn.'
            },
            {
              id: 'en-e-speak-food',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu gọi món kèm lưu ý nước sốt riêng:',
              targetText: 'Could I please get the grilled salmon with dressing on the side?',
              targetPhonetic: 'kʊd aɪ pliːz ɡet ðə ɡrɪld ˈsæmən wɪð ˈdresɪŋ ɒn ðə saɪd?',
              vietnameseMeaning: 'Cho tôi xin món cá hồi nướng, để nước sốt riêng ra đĩa nhé.',
              audioText: 'Could I please get the grilled salmon with dressing on the side?',
              speakingHints: [
                'Nối âm: "Could I please" -> /kʊd aɪ pliːz/',
                'Lưu ý âm "salmon" chữ "l" là âm câm, đọc là /ˈsæm.ən/',
                'Cụm "on the side" nhấn nhẹ vào "side"'
              ]
            },
            {
              id: 'en-e11b',
              type: 'fill_blank',
              prompt: 'Hỏi độ chín của bít tết: "How would you like your steak done?" - "______ please, with a warm red center."',
              options: ['Medium-rare,', 'Well-done,', 'Burnt,', 'Cold,'],
              correctAnswer: 'Medium-rare,',
              explanation: '"Medium-rare" là độ chín tái vừa, bên ngoài cháy xém nhẹ, bên trong hồng ấm mọng nước.'
            },
            {
              id: 'en-e-write-food',
              type: 'writing_drill',
              prompt: 'Viết câu xin tính tiền và chia đều hóa đơn cho nhóm:',
              vietnameseMeaning: 'Tình huống: Cả nhóm ăn xong tại nhà hàng. Hãy gọi phục vụ để xin hóa đơn thanh toán và đề nghị chia đều tiền ăn cho mọi người.',
              targetText: 'Could we please have the bill and split it evenly?',
              acceptableAnswers: [
                'Could we have the bill and split it please?',
                'Could you please split the bill for us?',
                'Can we please get the bill and split it evenly?'
              ],
              requiredKeywords: ['bill', 'split'],
              minWords: 6,
              grammarFocus: 'Cấu trúc yêu cầu lịch sự: "Could we please have the bill and split it evenly?"',
              explanation: '"Split the bill evenly" nghĩa là chia đều hóa đơn cho mỗi người.'
            },
            {
              id: 'en-e11',
              type: 'quiz_choice',
              prompt: 'Khi muốn chia hóa đơn tiền ăn đều cho mỗi người trong nhóm, bạn nói với phục vụ thế nào?',
              options: ['Could we split the bill, please?', 'Give me two bills now.', 'We pay separated.', 'I want half money.'],
              correctAnswer: 'Could we split the bill, please?',
              explanation: '"Split the bill" (hoặc "separate checks") là cách nói tự nhiên chuẩn xác nhất.'
            }
          ]
        },
        {
          id: 'en-l5',
          track: 'daily',
          title: 'Check-in Khách sạn & Giao thông Công cộng',
          description: 'Nhận phòng khách sạn, yêu cầu đổi phòng khi gặp sự cố máy lạnh/tiếng ồn và hỏi đường đi phương tiện công cộng.',
          durationMinutes: 6,
          xpReward: 40,
          exercises: [
            {
              id: 'en-e12',
              type: 'flashcard',
              prompt: 'Mẫu câu khiếu nại văn minh tại lễ tân khách sạn',
              targetText: 'The air conditioner in my room is not working properly.',
              romanization: '/ðiː eər kənˈdɪʃ.ən.ər ɪn maɪ ruːm ɪz nɒt ˈwɜː.kɪŋ ˈprɒp.əl.i/',
              vietnameseMeaning: 'Máy lạnh trong phòng tôi dường như đang hoạt động không bình thường.',
              audioText: 'The air conditioner in my room is not working properly.',
              explanation: '"Not working properly" diễn đạt sự cố một cách lịch sự, tránh to tiếng gay gắt.',
              culturalNote: 'Nhân viên khách sạn quốc tế sẽ lập tức cử kỹ thuật viên hoặc nâng cấp phòng miễn phí (free upgrade).'
            },
            {
              id: 'en-e13',
              type: 'fill_blank',
              prompt: 'Điền giới từ: "Excuse me, which platform does the express train to the airport depart ______?"',
              options: ['from', 'at', 'to', 'in'],
              correctAnswer: 'from',
              explanation: 'Động từ "depart from [location/platform]" có nghĩa là khởi hành từ ga/sân ga nào.'
            },
            {
              id: 'en-e13-late',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi có thể xin trả phòng muộn vào khoảng 1 giờ chiều được không?"',
              targetText: 'Is it possible to request a late checkout around one PM?',
              wordTokens: ['Is it possible', 'to request', 'a late checkout', 'around', 'one PM?', 'early', 'now'],
              explanation: '"Late checkout" là dịch vụ trả phòng muộn sau giờ quy định (thường là 11h hoặc 12h trưa).'
            },
            {
              id: 'en-e-speak-hotel',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu khiếu nại sự cố phòng nghỉ lịch thiệp:',
              targetText: 'The air conditioner in my room is not working properly.',
              targetPhonetic: 'ðiː eə kənˈdɪʃənər ɪn maɪ ruːm ɪz nɒt ˈwɜːkɪŋ ˈprɒpəli.',
              vietnameseMeaning: 'Hệ thống điều hòa trong phòng tôi đang không hoạt động bình thường.',
              audioText: 'The air conditioner in my room is not working properly.',
              speakingHints: [
                'Trọng âm rơi vào "air conditioner" và "properly"',
                'Giọng điệu nhã nhặn, tôn trọng đối phương'
              ]
            },
            {
              id: 'en-e-write-hotel',
              type: 'writing_drill',
              prompt: 'Viết câu hỏi xin trả phòng trễ tại quầy lễ tân khách sạn:',
              vietnameseMeaning: 'Tình huống: Do chuyến bay của bạn cất cánh vào chiều tối, bạn muốn đề nghị lễ tân cho phép trả phòng trễ (late checkout) vào khoảng 1 giờ chiều.',
              targetText: 'Is it possible to request a late checkout around one PM?',
              acceptableAnswers: [
                'Could I please request a late checkout around one PM?',
                'Is it possible to have a late checkout until one PM?',
                'May I request a late checkout at one PM?'
              ],
              requiredKeywords: ['request', 'checkout'],
              minWords: 6,
              grammarFocus: 'Cấu trúc lễ tân khách sạn: "Is it possible to request a late checkout around [time]?"',
              explanation: '"Late checkout" là thuật ngữ tiêu chuẩn quốc tế trong ngành khách sạn.'
            }
          ]
        },
        {
          id: 'en-l5-med',
          track: 'daily',
          title: 'Khám Sức Khỏe & Mua Thuốc Tại Hiệu Thuốc Nước Ngoài',
          description: 'Cách miêu tả cơn đau, triệu chứng dị ứng phấn hoa/thức ăn, xuất trình bảo hiểm du lịch và mua thuốc không cần toa (OTC).',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'en-e13b',
              type: 'flashcard',
              prompt: 'Mẫu câu miêu tả triệu chứng và dị ứng thuốc',
              targetText: 'I have a throbbing headache and I am allergic to penicillin.',
              romanization: '/aɪ hæv ə ˈθrɒb.ɪŋ ˈhed.eɪk ænd aɪ æm əˈlɜː.dʒɪk tuː ˌpen.ɪˈsɪl.ɪn/',
              vietnameseMeaning: 'Tôi bị đau đầu giật từng cơn và tôi bị dị ứng với penicillin.',
              audioText: 'I have a throbbing headache and I am allergic to penicillin.',
              explanation: '"Throbbing headache" (đau đầu giật buốt); "allergic to [substance]" (dị ứng với chất gì).',
              culturalNote: 'Luôn thông báo tiền sử dị ứng cho bác sĩ hoặc dược sĩ trước khi nhận bất kỳ toa thuốc nào.'
            },
            {
              id: 'en-e13c',
              type: 'quiz_choice',
              prompt: 'Cụm từ viết tắt nào chỉ các loại thuốc thông thường có thể mua tự do không cần đơn bác sĩ?',
              options: ['OTC (Over-The-Counter)', 'VIP (Very Important)', 'ICU (Intensive Care)', 'ER (Emergency Room)'],
              correctAnswer: 'OTC (Over-The-Counter)',
              explanation: '"Over-The-Counter" (thuốc không kê đơn) như thuốc cảm Paracetamol, thuốc chống say xe, xi-rô ho.'
            },
            {
              id: 'en-e13c2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi có bảo hiểm du lịch quốc tế chi trả cho việc điều trị này."',
              targetText: 'I have international travel insurance covering this medical treatment.',
              wordTokens: ['I have', 'international', 'travel insurance', 'covering', 'this medical', 'treatment.', 'passport', 'car'],
              explanation: '"Travel insurance covering..." (bảo hiểm du lịch chi trả cho việc điều trị y tế).'
            },
            {
              id: 'en-e-spk-med',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu thông báo dị ứng thuốc tại hiệu thuốc nước ngoài:',
              targetText: 'I have a severe headache and I am allergic to penicillin.',
              targetPhonetic: 'aɪ hæv ə sɪˈvɪər ˈhed.eɪk ænd aɪ æm əˈlɜː.dʒɪk tuː ˌpen.ɪˈsɪl.ɪn.',
              vietnameseMeaning: 'Tôi bị đau đầu dữ dội và tôi bị dị ứng với thuốc penicillin.',
              audioText: 'I have a severe headache and I am allergic to penicillin.',
              speakingHints: [
                'Trọng âm rơi vào "severe" (/sɪˈvɪər/) và "allergic" (/əˈlɜːdʒɪk/)',
                'Phát âm rõ âm đuôi /k/ của từ "headache"',
                'Giữ giọng điệu bình tĩnh, rõ ràng khi báo dị ứng y khoa'
              ]
            },
            {
              id: 'en-e-med-fill',
              type: 'fill_blank',
              prompt: 'Hỏi liều lượng dùng thuốc: "What is the recommended ______ for this pain relief medication?"',
              options: ['dosage', 'price', 'flavor', 'volume'],
              correctAnswer: 'dosage',
              explanation: '"Dosage" là liều lượng dùng thuốc được bác sĩ hoặc dược sĩ chỉ định.'
            },
            {
              id: 'en-e-wrt-med',
              type: 'writing_drill',
              prompt: 'Viết câu hỏi dược sĩ về liều dùng thuốc và xuất trình bảo hiểm y tế:',
              vietnameseMeaning: 'Tình huống: Bạn vào hiệu thuốc nước ngoài, muốn hỏi liều dùng thuốc giảm đau mỗi ngày và xuất trình bảo hiểm du lịch của bạn.',
              targetText: 'Could you explain the daily dosage and does my insurance cover this?',
              acceptableAnswers: [
                'Could you explain the daily dosage and does my insurance cover this?',
                'What is the dosage and does my travel insurance cover it?',
                'Could you tell me the dosage and accept my insurance?'
              ],
              requiredKeywords: ['dosage', 'insurance'],
              minWords: 6,
              grammarFocus: 'Cấu trúc y tế: "Could you explain the [dosage/usage] and does my insurance cover it?"',
              explanation: '"Dosage" và "insurance coverage" là hai từ khóa vàng khi khám bệnh hoặc mua thuốc tại nước ngoài.'
            }
          ]
        },
        {
          id: 'en-l5-emer',
          track: 'daily',
          title: 'Xử Lý Sự Cố Sân Bay: Chuyến Bay Hoãn & Thất Lạc Hành Lý',
          description: 'Mẫu câu đàm phán tại quầy dịch vụ hàng không khi bị lỡ chuyến bay nối tiếp (Missed connection) hoặc mất vali.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'en-e13d',
              type: 'flashcard',
              prompt: 'Khai báo thất lạc hành lý tại quầy Lost & Found',
              targetText: 'My checked baggage did not appear on the carousel. Here is my claim tag.',
              romanization: '/maɪ tʃekt ˈbæɡ.ɪdʒ dɪd nɒt əˈpɪər ɒn ðə ˌkær.əˈsel hɪər ɪz maɪ kleɪm tæɡ/',
              vietnameseMeaning: 'Hành lý ký gửi của tôi không xuất hiện trên băng chuyền. Đây là thẻ hành lý của tôi.',
              audioText: 'My checked baggage did not appear on the carousel. Here is my claim tag.',
              explanation: '"Baggage carousel" là băng chuyền trả hành lý tại sân bay; "claim tag" là cuống vé hành lý dán vào hộ chiếu.',
              culturalNote: 'Luôn giữ bình tĩnh, nhân viên sẽ lập biên bản PIR (Property Irregularity Report) để theo dõi định vị hành lý.'
            },
            {
              id: 'en-e13e',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Do chuyến bay trước bị trễ, tôi đã lỡ mất chuyến bay nối tiếp sang London."',
              targetText: 'Due to the flight delay, I missed my connecting flight to London.',
              wordTokens: ['Due to', 'the flight delay,', 'I missed', 'my connecting flight', 'to London.', 'baggage', 'passport'],
              explanation: '"Connecting flight" là chuyến bay chuyển tiếp chặng hai.'
            },
            {
              id: 'en-e13f',
              type: 'quiz_choice',
              prompt: 'Khi hãng hàng không làm hoãn chuyến qua đêm do lỗi kỹ thuật, hành khách có quyền yêu cầu gì?',
              options: [
                'Complimentary hotel accommodation and meal vouchers.',
                'Buying the whole airplane.',
                'Demanding the pilot resign immediately.',
                'Nothing at all.'
              ],
              correctAnswer: 'Complimentary hotel accommodation and meal vouchers.',
              explanation: '"Complimentary hotel accommodation and meal vouchers" (chỗ ở khách sạn miễn phí và phiếu ăn uống) là quyền lợi bồi thường tiêu chuẩn quốc tế.'
            },
            {
              id: 'en-e-spk-airport',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu yêu cầu xếp lại chuyến bay tiếp theo do chuyến trước bị hoãn:',
              targetText: 'Could you please rebook me on the next available flight to London?',
              targetPhonetic: 'kʊd juː pliːz ˌriːˈbʊk miː ɒn ðə nekst əˈveɪləbl flaɪt tuː ˈlʌndən?',
              vietnameseMeaning: 'Bạn có thể vui lòng xếp lại cho tôi chuyến bay kế tiếp tới London được không?',
              audioText: 'Could you please rebook me on the next available flight to London?',
              speakingHints: [
                'Nhấn âm vào "rebook" (/ˌriːˈbʊk/) và "available" (/əˈveɪ.lə.bl̩/)',
                'Lên giọng nhẹ ở cuối câu hỏi để giữ phép lịch sự',
                'Nối âm nhẹ: "next available" -> /nekst əˈveɪ.lə.bl̩/'
              ]
            },
            {
              id: 'en-e-emer-fill',
              type: 'fill_blank',
              prompt: 'Hỏi về việc đền bù chậm chuyến: "Am I entitled to meal ______ while waiting for the next connection?"',
              options: ['vouchers', 'passports', 'luggage', 'pilots'],
              correctAnswer: 'vouchers',
              explanation: '"Meal vouchers" là phiếu ăn uống được hãng hàng không phát khi chuyến bay bị hoãn quá 2-3 tiếng.'
            },
            {
              id: 'en-e-wrt-airport',
              type: 'writing_drill',
              prompt: 'Viết câu yêu cầu bồi thường và hỗ trợ khách sạn do hoãn chuyến bay qua đêm:',
              vietnameseMeaning: 'Tình huống: Chuyến bay bị hoãn đến sáng hôm sau. Hãy viết câu đề nghị đại diện hãng hàng không cung cấp phòng khách sạn và phiếu ăn uống miễn phí.',
              targetText: 'Could you please provide complimentary hotel accommodation and meal vouchers for tonight?',
              acceptableAnswers: [
                'Could you please provide complimentary hotel accommodation and meal vouchers for tonight?',
                'Please provide hotel accommodation and meal vouchers for the delay.',
                'Could we have complimentary accommodation and vouchers for tonight?'
              ],
              requiredKeywords: ['accommodation', 'vouchers'],
              minWords: 6,
              grammarFocus: 'Cấu trúc quyền lợi hàng không: "Could you please provide complimentary [hotel accommodation / vouchers]?"',
              explanation: '"Complimentary accommodation" là thuật ngữ tiêu chuẩn khi hãng bay chi trả tiền phòng khách sạn.'
            }
          ]
        },
        {
          id: 'en-l5-rent',
          track: 'daily',
          title: 'Thuê Căn Hộ, Ký Hợp Đồng & Làm Việc Với Chủ Nhà (Apartment Hunting)',
          description: 'Hỏi chi phí tiện ích (utilities), kiểm tra tiền đặt cọc (security deposit) và thông báo sửa chữa thiết bị hỏng.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'en-e5-rent1',
              type: 'flashcard',
              prompt: 'Hỏi xem giá thuê nhà đã bao gồm các chi phí điện nước chưa',
              targetText: 'Are utilities such as water, gas, and high-speed internet included in the monthly rent?',
              romanization: '/ɑːr juːˈtɪl.ə.tiz sʌtʃ æz ˈwɔː.tər ɡæs ænd haɪ spiːd ˈɪn.tə.net ɪnˈkluː.dɪd.../',
              vietnameseMeaning: 'Các chi phí tiện ích như tiền nước, gas và internet tốc độ cao đã được tính trong tiền thuê hàng tháng chưa?',
              audioText: 'Are utilities such as water, gas, and high-speed internet included in the monthly rent?',
              explanation: '"Utilities" là từ bao quát chỉ tiền điện, nước, ga, sưởi và internet.',
              culturalNote: 'Ở Anh/Mỹ, tiền cọc (Security deposit) thường tương đương 1 đến 1.5 tháng tiền thuê và phải được bảo vệ trong quỹ độc lập.'
            },
            {
              id: 'en-e5-rent2',
              type: 'fill_blank',
              prompt: 'Điền thuật ngữ tiền cọc: "Tenants are required to pay a one-month security ______ before moving in."',
              options: ['deposit', 'discount', 'salary', 'charge'],
              correctAnswer: 'deposit',
              explanation: '"Security deposit" là khoản tiền đặt cọc giữ nhà để đảm bảo không có hư hỏng tài sản.'
            },
            {
              id: 'en-e5-rent3',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Vòi nước bồn rửa bát trong bếp đang bị rò rỉ nghiêm trọng."',
              targetText: 'The kitchen sink faucet has been leaking persistently for two days.',
              wordTokens: ['The kitchen', 'sink faucet', 'has been leaking', 'persistently', 'for two days.', 'dry', 'clean'],
              explanation: '"Leak persistently" (rò rỉ nước liên tục) là cụm từ chuẩn xác khi báo chủ nhà sửa chữa gấp.'
            },
            {
              id: 'en-e-spk-rent',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu hỏi chi phí tiện ích khi đi xem nhà thuê:',
              targetText: 'Are utilities included in the monthly rent or billed separately?',
              targetPhonetic: 'ɑːr juːˈtɪl.ə.tiz ɪnˈkluː.dɪd ɪn ðə ˈmʌnθ.li rent ɔː bɪld ˈsep.rət.li?',
              vietnameseMeaning: 'Chi phí điện nước đã bao gồm trong tiền thuê hàng tháng hay tính hóa đơn riêng?',
              audioText: 'Are utilities included in the monthly rent or billed separately?',
              speakingHints: [
                'Trọng âm từ "utilities": /juːˈtɪl.ə.tiz/',
                'Từ "separately": /ˈsep.rət.li/ (3 âm tiết, không đọc là se-pa-rate-ly)',
                'Lên giọng ở "monthly rent" và hạ giọng ở "billed separately"'
              ]
            },
            {
              id: 'en-e-wrt-rent',
              type: 'writing_drill',
              prompt: 'Viết tin nhắn thông báo sự cố hỏng hóc và yêu cầu chủ nhà sửa chữa:',
              vietnameseMeaning: 'Tình huống: Vòi nước bồn rửa trong căn hộ bạn thuê đang bị rò rỉ nước. Hãy viết tin nhắn ngắn gửi chủ nhà yêu cầu cử thợ đến kiểm tra và khắc phục.',
              targetText: 'The faucet is leaking persistently, could you please send a plumber to inspect it?',
              acceptableAnswers: [
                'The faucet is leaking persistently, could you please send a plumber to inspect it?',
                'The faucet is leaking, please send someone to repair it.',
                'The sink faucet is leaking, could you arrange a repair soon?'
              ],
              requiredKeywords: ['leaking', 'plumber'],
              minWords: 6,
              grammarFocus: 'Cấu trúc thuê nhà: "The [appliance] is leaking/broken, could you please send a technician/plumber to inspect it?"',
              explanation: '"Plumber" (thợ sửa ống nước) và "inspect/repair" là những thuật ngữ chuẩn mực khi làm việc với ban quản lý toà nhà.'
            }
          ]
        }
      ]
    },
    {
      id: 'en-u3',
      number: 3,
      track: 'workplace',
      title: 'Email Công Sở Chuyên Nghiệp, Họp Dự Án & Đàm Phán Thương Mại',
      description: 'Quy chuẩn viết Email tiếng Anh thương mại, phản biện xây dựng trong cuộc họp dự án, làm việc từ xa và đàm phán hợp đồng đối tác.',
      cefrLevel: 'B1 - B2',
      lessons: [
        {
          id: 'en-l6',
          track: 'workplace',
          title: 'Viết Business Email Chuẩn Mực & Follow-up',
          description: 'Mở đầu thư, đính kèm tệp, hối thúc tiến độ nhẹ nhàng (gentle reminder) và kết thư chuyên nghiệp.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'en-e14',
              type: 'flashcard',
              prompt: 'Mẫu câu theo dõi công việc (Follow-up) kinh điển',
              targetText: 'I am following up on our discussion regarding the Q4 budget.',
              romanization: '/aɪ æm ˈfɒl.əʊ.ɪŋ ʌp ɒn ˈaʊər dɪˈskʌʃ.ən rɪˈɡɑː.dɪŋ ðə kjuː fɔː ˈbʌdʒ.ɪt/',
              vietnameseMeaning: 'Tôi viết thư này để tiếp nối thảo luận của chúng ta về ngân sách quý 4.',
              audioText: 'I am following up on our discussion regarding the Q4 budget.',
              explanation: '"Follow up on" là cụm từ không thể thiếu trong email thương mại khi muốn nhắc lại vấn đề trước đó.',
              culturalNote: 'Tránh dùng "Why have you not replied?" vì câu đó tạo cảm giác thô lỗ và công kích.'
            },
            {
              id: 'en-e15',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Vui lòng xem báo cáo tóm tắt được đính kèm bên dưới."',
              targetText: 'Please find the executive summary attached for your review.',
              wordTokens: ['Please find', 'the executive', 'summary', 'attached', 'for your', 'review.', 'send', 'paper'],
              explanation: 'Mẫu câu chuẩn mực thông báo tệp đính kèm trong thư điện tử quốc tế.'
            },
            {
              id: 'en-e16',
              type: 'quiz_choice',
              prompt: 'Lời kết thúc thư (sign-off) nào phù hợp nhất cho email gửi đối tác lần đầu?',
              options: ['Best regards,', 'Love,', 'Cheers mate,', 'Later,', 'See ya,'],
              correctAnswer: 'Best regards,',
              explanation: '"Best regards," hoặc "Sincerely," là lựa chọn trang trọng và chuyên nghiệp nhất.'
            },
            {
              id: 'en-e16b',
              type: 'fill_blank',
              prompt: 'Nhắc nhở nhẹ nhàng lịch sự: "Just a gentle ______ that the deliverables are due this Wednesday at 5 PM."',
              options: ['reminder', 'threat', 'shout', 'worry'],
              correctAnswer: 'reminder',
              explanation: '"Just a gentle reminder that..." là cách nhắc nhở deadline thanh lịch và chuyên nghiệp nhất.'
            },
            {
              id: 'en-e-speak-email',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu mở đầu cuộc gọi follow-up công việc chuyên nghiệp:',
              targetText: 'I am following up on our discussion regarding the project budget.',
              targetPhonetic: 'aɪ æm ˈfɒləʊɪŋ ʌp ɒn ˈaʊə dɪˈskʌʃn rɪˈɡɑːdɪŋ ðə ˈprɒdʒekt ˈbʌdʒɪt.',
              vietnameseMeaning: 'Tôi liên hệ để tiếp nối trao đổi của chúng ta về ngân sách dự án.',
              audioText: 'I am following up on our discussion regarding the project budget.',
              speakingHints: [
                'Cụm "following up on" phát âm liên tục',
                'Nhấn mạnh vào "discussion" và "project budget"'
              ]
            },
            {
              id: 'en-e-write-email',
              type: 'writing_drill',
              prompt: 'Viết câu mở đầu email thông báo gửi kèm tài liệu cho đối tác xem xét:',
              vietnameseMeaning: 'Tình huống: Bạn gửi email cho khách hàng hoặc đối tác, thông báo đã đính kèm tài liệu tóm tắt dự án để họ xem xét và góp ý.',
              targetText: 'Please find the summary attached for your review, and let me know your feedback.',
              acceptableAnswers: [
                'Please find the attached document for your review.',
                'Please find the summary attached for your review.',
                'Please find attached the file for your review and feedback.'
              ],
              requiredKeywords: ['attached', 'review'],
              minWords: 6,
              grammarFocus: 'Cấu trúc email công sở: "Please find [item] attached for your review"',
              explanation: 'Đây là quy chuẩn vàng trong thư từ kinh doanh quốc tế.'
            }
          ]
        },
        {
          id: 'en-l7',
          track: 'workplace',
          title: 'Đóng Góp Ý Kiến & Phản Biện Xây Dựng Trong Cuộc Họp',
          description: 'Cách ngắt lời khéo léo, đồng ý một phần và đưa ra phản biện mang tính xây dựng (constructive feedback).',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'en-e17',
              type: 'flashcard',
              prompt: 'Cách phản biện mang tính xây dựng',
              targetText: 'I see your point, but have we considered the scalability issue?',
              romanization: '/aɪ siː jɔːr pɔɪnt bʌt hæv wiː kənˈsɪd.əd ðə ˌskeɪ.ləˈbɪl.ə.ti ˈɪʃ.uː/',
              vietnameseMeaning: 'Tôi hiểu góc nhìn của bạn, nhưng liệu chúng ta đã cân nhắc đến vấn đề khả năng mở rộng chưa?',
              audioText: 'I see your point, but have we considered the scalability issue?',
              explanation: 'Kỹ thuật "Agree then Pivot" (Công nhận rồi chuyển hướng) giúp tranh biện văn minh không gây bất hòa.',
              culturalNote: 'Trong văn hóa doanh nghiệp phương Tây, việc đặt câu hỏi phản biện chứng tỏ bạn đang đóng góp tích cực.'
            },
            {
              id: 'en-e-speak-meeting',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu phản biện xây dựng với ngữ điệu khách quan, lịch thiệp:',
              targetText: 'I see your point, but have we considered the scalability issue?',
              targetPhonetic: 'aɪ siː jɔː pɔɪnt, bʌt hæv wiː kənˈsɪdəd ðə ˌskeɪləˈbɪləti ˈɪʃuː?',
              vietnameseMeaning: 'Tôi hiểu góc nhìn của bạn, nhưng liệu chúng ta đã cân nhắc đến khả năng mở rộng chưa?',
              audioText: 'I see your point, but have we considered the scalability issue?',
              speakingHints: [
                'Hạ giọng nhẹ ở vế đầu "I see your point"',
                'Nhấn mạnh vào từ khóa quan trọng "scalability issue"'
              ]
            },
            {
              id: 'en-e18',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi hoàn toàn đồng tình với đề xuất của David."',
              targetText: 'I am fully aligned with David on this proposal.',
              wordTokens: ['I am', 'fully aligned', 'with David', 'on this', 'proposal.', 'disagree', 'yesterday'],
              explanation: '"Aligned with" là thuật ngữ công sở cao cấp thể hiện sự đồng thuận quan điểm.'
            },
            {
              id: 'en-e-write-meeting',
              type: 'writing_drill',
              prompt: 'Viết câu bày tỏ sự đồng thuận với đề xuất dự án trong buổi họp:',
              vietnameseMeaning: 'Tình huống: Đồng nghiệp vừa trình bày một ý tưởng cải tiến quy trình. Hãy viết một câu khẳng định bạn hoàn toàn ủng hộ đề xuất này vì nó giúp tối ưu hóa hiệu quả.',
              targetText: 'I am fully aligned with this proposal because it enhances our efficiency.',
              acceptableAnswers: [
                'I am fully aligned with this proposal and support it completely.',
                'I am aligned with this proposal because it improves our workflow.',
                'I fully support this proposal and agree with the approach.'
              ],
              requiredKeywords: ['aligned', 'proposal'],
              minWords: 6,
              grammarFocus: 'Cấu trúc tán thành quan điểm: "I am fully aligned with [someone/proposal]"',
              explanation: '"Aligned with" tạo phong thái tự tin, chuyên nghiệp hơn rất nhiều so với "I agree".'
            },
            {
              id: 'en-e18-dev',
              type: 'quiz_choice',
              prompt: 'Khi bạn muốn đưa ra góc nhìn trái ngược để kích thích tư duy phản biện trong phòng họp, bạn nói thế nào?',
              options: [
                'Just to play devil’s advocate, what happens if our key supplier faces a supply crunch?',
                'You are all completely wrong and I am right.',
                'I do not care about this plan at all.',
                'Nobody knows what they are doing.'
              ],
              correctAnswer: 'Just to play devil’s advocate, what happens if our key supplier faces a supply crunch?',
              explanation: '"Play devil\'s advocate" là thành ngữ đóng vai người phản biện để kiểm tra tính vững chắc của kế hoạch.'
            }
          ]
        },
        {
          id: 'en-l7-pres',
          track: 'workplace',
          title: 'Thuyết Trình Báo Cáo Kinh Doanh & Số Liệu KPI',
          description: 'Mẫu câu mở đầu buổi thuyết trình, giải thích biểu đồ cột/đường và chuyển giao slide thuyết phục.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e18b',
              type: 'flashcard',
              prompt: 'Mẫu câu chỉ điểm nút trên biểu đồ kinh doanh',
              targetText: 'As you can clearly see from this graph, our conversion rate peaked in August.',
              romanization: '/æz juː kæn ˈklɪə.li siː frɒm ðɪs ɡrɑːf ˈaʊər kənˈvɜː.ʃən reɪt piːkt ɪn ˈɔː.ɡəst/',
              vietnameseMeaning: 'Như quý vị có thể thấy rõ trên đồ thị này, tỷ lệ chuyển đổi của chúng ta đã đạt đỉnh vào tháng 8.',
              audioText: 'As you can clearly see from this graph, our conversion rate peaked in August.',
              explanation: '"Peak" ở dạng động từ mang nghĩa chạm đỉnh cao nhất.',
              culturalNote: 'Người nghe quốc tế ưa chuộng bài thuyết trình đi kèm biểu đồ trực quan (Data-driven).'
            },
            {
              id: 'en-e18c',
              type: 'fill_blank',
              prompt: 'Điền từ nối chuyển slide: "Now, let’s ______ our attention to the operational challenges."',
              options: ['turn', 'look', 'make', 'give'],
              correctAnswer: 'turn',
              explanation: '"Turn one\'s attention to..." là mẫu câu chuyển đổi chủ đề kinh điển trong các bài thuyết trình chuyên nghiệp.'
            },
            {
              id: 'en-e18c2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tóm lại, thông điệp cốt lõi của bài báo cáo này là tối ưu hóa chi phí."',
              targetText: 'To summarize, the key takeaway from this report is cost optimization.',
              wordTokens: ['To summarize,', 'the key takeaway', 'from this report', 'is cost', 'optimization.', 'spend', 'expensive'],
              explanation: '"Key takeaway" là bài học hay thông điệp cốt lõi quan trọng nhất mà khán giả cần ghi nhớ.'
            },
            {
              id: 'en-e-spk-pres',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu phân tích biểu đồ KPI thuyết phục trước ban giám đốc:',
              targetText: 'As you can see from this chart, our revenue peaked in the third quarter.',
              targetPhonetic: 'æz juː kæn siː frɒm ðɪs tʃɑːt, ˈaʊə ˈrevənjuː piːkt ɪn ðə θɜːd ˈkwɔːtə.',
              vietnameseMeaning: 'Như quý vị thấy trên biểu đồ này, doanh thu của chúng ta đã đạt đỉnh vào quý ba.',
              audioText: 'As you can see from this chart, our revenue peaked in the third quarter.',
              speakingHints: [
                'Nhấn mạnh vào các từ mang dữ liệu: "revenue", "peaked", "third quarter"',
                'Ngắt hơi nhẹ sau dấu phẩy: "...from this chart, [pause] our revenue..."',
                'Giọng điệu đĩnh đạc, tự tin trước hội đồng lãnh đạo'
              ]
            },
            {
              id: 'en-e-wrt-pres',
              type: 'writing_drill',
              prompt: 'Viết câu chuyển tiếp slide và tóm tắt thông điệp quan trọng của báo cáo:',
              vietnameseMeaning: 'Tình huống: Bạn đang thuyết trình slide tài chính. Hãy viết câu hoàn chỉnh chuyển tiếp sự chú ý của người nghe sang thông điệp cốt lõi về việc tối ưu chi phí vận hành.',
              targetText: 'Now let us turn our attention to the key takeaway regarding cost optimization.',
              acceptableAnswers: [
                'Now let us turn our attention to the key takeaway regarding cost optimization.',
                'Let us turn our attention to the main takeaway about cost optimization.',
                'Now let us focus our attention on cost optimization as the key takeaway.'
              ],
              requiredKeywords: ['attention', 'takeaway', 'optimization'],
              minWords: 6,
              grammarFocus: 'Cấu trúc thuyết trình: "Now let us turn our attention to [point / key takeaway]"',
              explanation: '"Key takeaway" là từ khóa đắt giá nhất trong văn hóa thuyết trình báo cáo hiện đại.'
            }
          ]
        },
        {
          id: 'en-l7-nego',
          track: 'workplace',
          title: 'Đàm Phán Thương Mại, Hợp Đồng & Chiết Khấu (Negotiations)',
          description: 'Chiến thuật nhượng bộ có điều kiện, bảo vệ biên lợi nhuận và chốt điều khoản thanh toán LC.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e18d',
              type: 'flashcard',
              prompt: 'Mẫu câu nhượng bộ có điều kiện trong đàm phán',
              targetText: 'We would be willing to offer a 5% discount, provided that you double the order volume.',
              romanization: '/wiː wʊd biː ˈwɪl.ɪŋ tuː ˈɒf.ər ə faɪv pəˈsent ˈdɪs.kaʊnt prəˈvaɪ.dɪd ðæt.../',
              vietnameseMeaning: 'Chúng tôi sẵn lòng chiết khấu 5%, với điều kiện là quý công ty tăng gấp đôi số lượng đơn hàng.',
              audioText: 'We would be willing to offer a five percent discount, provided that you double the order volume.',
              explanation: '"Provided that / Providing that" (với điều kiện là) là cấu trúc pháp lý then chốt trong đàm phán thương mại quốc tế.',
              culturalNote: 'Nguyên tắc vàng của thương lượng: Tuyệt đối không bao giờ nhượng bộ mà không đòi hỏi một quyền lợi đối ứng (Quid pro quo).'
            },
            {
              id: 'en-e18e',
              type: 'quiz_choice',
              prompt: 'Thuật ngữ nào trong hợp đồng thương mại quốc tế chỉ "trường hợp bất khả kháng do thiên tai, chiến tranh"?',
              options: ['Force Majeure', 'Proforma Invoice', 'Letter of Credit', 'Bill of Lading'],
              correctAnswer: 'Force Majeure',
              explanation: '"Force Majeure" (Bất khả kháng) là điều khoản pháp lý miễn trách nhiệm khi có biến cố ngoại cảnh không thể lường trước.'
            },
            {
              id: 'en-e18e2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Chúng tôi đề xuất mức đặt cọc ban đầu là 30% khi ký kết hợp đồng."',
              targetText: 'We propose an initial deposit of thirty percent upon contract signing.',
              wordTokens: ['We propose', 'an initial deposit', 'of thirty percent', 'upon contract', 'signing.', 'cancel', 'free'],
              explanation: '"Initial deposit upon contract signing" là điều khoản thanh toán tiền cọc ngay khi ký kết.'
            },
            {
              id: 'en-e-spk-nego',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu nhượng bộ có điều kiện tại bàn đàm phán thương mại:',
              targetText: 'We are willing to offer a discount, provided that you increase the order volume.',
              targetPhonetic: 'wiː ɑː ˈwɪlɪŋ tuː ˈɒfər ə ˈdɪskaʊnt, prəˈvaɪdɪd ðæt juː ɪnˈkriːs ðə ˈɔːdə ˈvɒljuːm.',
              vietnameseMeaning: 'Chúng tôi sẵn lòng chiết khấu, với điều kiện là quý đối tác tăng khối lượng đơn hàng.',
              audioText: 'We are willing to offer a discount, provided that you increase the order volume.',
              speakingHints: [
                'Cụm liên từ pháp lý "provided that": phát âm dứt khoát',
                'Nhấn mạnh vào cặp điều kiện: "discount" và "increase the order volume"',
                'Giữ phong thái hòa nhã nhưng nguyên tắc, kiên định'
              ]
            },
            {
              id: 'en-e-wrt-nego',
              type: 'writing_drill',
              prompt: 'Viết câu phản hồi điều khoản hợp đồng đề xuất mức đặt cọc và phương thức thanh toán:',
              vietnameseMeaning: 'Tình huống: Bạn đại diện công ty đàm phán hợp đồng cung ứng. Hãy viết câu đề xuất mức đặt cọc 30% khi ký kết hợp đồng và thanh toán phần còn lại khi nhận hàng.',
              targetText: 'We propose an initial deposit of thirty percent upon signing the contract.',
              acceptableAnswers: [
                'We propose an initial deposit of thirty percent upon signing the contract.',
                'We propose a thirty percent initial deposit upon signing the contract.',
                'We propose an initial deposit of thirty percent upon contract signing.'
              ],
              requiredKeywords: ['propose', 'deposit', 'signing'],
              minWords: 6,
              grammarFocus: 'Cấu trúc đàm phán hợp đồng: "We propose an initial deposit of [X]% upon [signing / delivery]"',
              explanation: '"Upon contract signing" là thuật ngữ pháp lý thương mại chuẩn mực.'
            }
          ]
        },
        {
          id: 'en-l7-remote',
          track: 'workplace',
          title: 'Giao Tiếp Làm Việc Từ Xa & Họp Trực Tuyến (Remote Work & Virtual Collaboration)',
          description: 'Các mẫu câu xử lý sự cố mic/màn hình, cập nhật tiến độ bất đồng bộ trên Slack/Teams và văn hóa "Take it offline".',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'en-e7-rem1',
              type: 'flashcard',
              prompt: 'Nhắc đồng nghiệp đang bật mic tắt tiếng trong cuộc họp trực tuyến',
              targetText: 'Sorry Sarah, I think you are on mute. We cannot hear you.',
              romanization: '/ˈsɒr.i ˈseə.rə aɪ θɪŋk juː ɑːr ɒn mjuːt wiː ˈkæn.ɒt hɪər juː/',
              vietnameseMeaning: 'Xin lỗi Sarah, hình như bạn đang tắt mic (on mute). Mọi người không nghe thấy tiếng bạn.',
              audioText: 'Sorry Sarah, I think you are on mute. We cannot hear you.',
              explanation: '"You are on mute" là câu nói phổ biến nhất trong kỷ nguyên làm việc qua Zoom/Google Meet.',
              culturalNote: 'Luôn chủ động mute mic khi người khác đang nói để tránh tiếng ồn nền (background noise).'
            },
            {
              id: 'en-e7-rem2',
              type: 'quiz_choice',
              prompt: 'Khi một vấn đề phát sinh quá chi tiết làm mất thời gian của cả cuộc họp, người chủ trì thường đề xuất gì?',
              options: [
                'Let’s take this discussion offline and sync directly after the call.',
                'Everyone leave the meeting right now.',
                'Stop arguing and never speak again.',
                'We must spend 3 hours solving this now.'
              ],
              correctAnswer: 'Let’s take this discussion offline and sync directly after the call.',
              explanation: '"Take this offline" nghĩa là để lại vấn đề này thảo luận riêng giữa những người liên quan sau cuộc họp, tránh làm ảnh hưởng thời gian của tập thể.'
            },
            {
              id: 'en-e7-rem3',
              type: 'fill_blank',
              prompt: 'Chia sẻ màn hình: "Allow me to ______ my screen so everyone can see the live dashboard."',
              options: ['share', 'show off', 'record', 'delete'],
              correctAnswer: 'share',
              explanation: '"Share one\'s screen" là cụm từ chuẩn mực khi trình chiếu màn hình máy tính trong họp trực tuyến.'
            },
            {
              id: 'en-e-spk-remote',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu đề xuất trao đổi riêng vấn đề kỹ thuật sau cuộc họp trực tuyến:',
              targetText: 'Let us take this discussion offline and sync up after the meeting.',
              targetPhonetic: 'let ʌs teɪk ðɪs dɪˈskʌʃn ˌɒfˈlaɪn ænd sɪŋk ʌp ˈɑːftə ðə ˈmiːtɪŋ.',
              vietnameseMeaning: 'Chúng ta hãy để vấn đề này trao đổi riêng sau cuộc họp nhé.',
              audioText: 'Let us take this discussion offline and sync up after the meeting.',
              speakingHints: [
                'Cụm thành ngữ "take this offline": nhấn vào "offline"',
                'Cụm "sync up": /sɪŋk ʌp/ (đồng bộ/trao đổi trực tiếp)',
                'Ngữ điệu tôn trọng thời gian của tập thể'
              ]
            },
            {
              id: 'en-e-wrt-remote',
              type: 'writing_drill',
              prompt: 'Viết tin nhắn Slack/Teams thông báo cập nhật tiến độ công việc bất đồng bộ:',
              vietnameseMeaning: 'Tình huống: Bạn làm việc từ xa, muốn thông báo với nhóm rằng bạn đã hoàn thành tài liệu kiến trúc và chia sẻ đường dẫn để mọi người cho ý kiến phản hồi.',
              targetText: 'I have shared the document link, please review and provide your feedback.',
              acceptableAnswers: [
                'I have shared the document link, please review and provide your feedback.',
                'I have shared the link, please review it and give feedback.',
                'Please find the shared link and let me know your feedback.'
              ],
              requiredKeywords: ['shared', 'feedback'],
              minWords: 6,
              grammarFocus: 'Giao tiếp bất đồng bộ (Asynchronous): "I have shared the [link/document], please review and provide your feedback."',
              explanation: 'Đây là phong cách giao tiếp chuẩn mực của các kỹ sư và chuyên viên làm việc tại các công ty công nghệ đa quốc gia (GitLab, Automattic, Google).'
            }
          ]
        }
      ]
    },
    {
      id: 'en-u4',
      number: 4,
      track: 'workplace',
      title: 'Chinh Phục Phỏng Vấn Xin Việc Tập Đoàn Quốc Tế (Job Interview Masterclass)',
      description: 'Chiến thuật trả lời Tell me about yourself, kỹ thuật STAR cho câu hỏi tình huống khó, hóa giải câu hỏi điểm yếu, đàm phán lương và phỏng vấn quản lý.',
      cefrLevel: 'B2 - C1',
      lessons: [
        {
          id: 'en-l8',
          track: 'workplace',
          title: 'Mở Đầu Ấn Tượng: "Tell me about yourself"',
          description: 'Kỹ thuật Present - Past - Future để gây ấn tượng mạnh với HR trong 90 giây đầu tiên.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e19',
              type: 'flashcard',
              prompt: 'Mẫu câu mở đầu phỏng vấn ấn tượng',
              targetText: 'I have over 4 years of experience specializing in cross-border e-commerce operations.',
              romanization: '/aɪ hæv ˈoʊ.vɚ fɔːr jɪrz əv ɪkˈspɪr.i.əns ˈspeʃ.ə.laɪ.zɪŋ ɪn.../',
              vietnameseMeaning: 'Tôi có hơn 4 năm kinh nghiệm chuyên sâu về vận hành thương mại điện tử xuyên biên giới.',
              audioText: 'I have over four years of experience specializing in cross-border e-commerce operations.',
              explanation: 'Dùng cụm "specializing in [lĩnh vực]" thể hiện chuyên môn sâu và định vị năng lực rõ ràng.',
              culturalNote: 'Đừng kể lại toàn bộ tiểu sử gia đình; chỉ tập trung vào thành tựu liên quan đến vị trí ứng tuyển.'
            },
            {
              id: 'en-e20',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu phỏng vấn: "Điểm mạnh lớn nhất của tôi là giải quyết vấn đề phức tạp dưới áp lực cao."',
              targetText: 'My greatest strength is solving complex problems under tight deadlines.',
              wordTokens: ['My greatest', 'strength', 'is solving', 'complex', 'problems', 'under tight', 'deadlines.', 'weakness', 'never'],
              explanation: '"Tight deadlines" (thời hạn gắt gao) tạo ấn tượng về khả năng chịu áp lực dự án cao.'
            },
            {
              id: 'en-e21',
              type: 'quiz_choice',
              prompt: 'Khi nhà tuyển dụng hỏi về điểm yếu (weakness), cách trả lời nào chứng minh sự trưởng thành nhất?',
              options: [
                'Nêu một điểm bạn từng chưa giỏi, kèm theo hành động cụ thể bạn đã và đang rèn luyện để khắc phục nó.',
                'Nói rằng "Tôi không có điểm yếu nào cả, tôi là người hoàn hảo".',
                'Nói rằng "Điểm yếu của tôi là tôi làm việc quá chăm chỉ và không biết mệt".',
                'Kể ra tất cả những tật xấu như hay đi trễ và quên việc.'
              ],
              correctAnswer: 'Nêu một điểm bạn từng chưa giỏi, kèm theo hành động cụ thể bạn đã và đang rèn luyện để khắc phục nó.',
              explanation: 'Nhà tuyển dụng đánh giá cao Self-awareness (khả năng tự nhận thức) và tinh thần cải tiến liên tục (growth mindset).'
            },
            {
              id: 'en-e-spk-l8',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu định vị kinh nghiệm chuyên môn trong 90 giây mở đầu:',
              targetText: 'I have over four years of experience specializing in software product development.',
              targetPhonetic: 'aɪ hæv ˈəʊvə fɔː jɪəz əv ɪkˈspɪəriəns ˈspeʃəlaɪzɪŋ ɪn ˈsɒftweə ˈprɒdʌkt dɪˈveləpmənt.',
              vietnameseMeaning: 'Tôi có hơn 4 năm kinh nghiệm chuyên sâu về phát triển sản phẩm phần mềm.',
              audioText: 'I have over four years of experience specializing in software product development.',
              speakingHints: [
                'Nhấn rõ cụm từ năng lực cốt lõi: "specializing in software product development"',
                'Giữ tốc độ vừa phải, giọng nói ấm áp và tự tin',
                'Ngắt hơi nhẹ sau cụm "four years of experience"'
              ]
            },
            {
              id: 'en-e-wrt-l8',
              type: 'writing_drill',
              prompt: 'Viết câu mở đầu giới thiệu bản thân nêu bật chuyên môn và mục tiêu cống hiến:',
              vietnameseMeaning: 'Tình huống: Bạn bước vào vòng phỏng vấn cho vị trí chuyên viên cấp cao. Hãy viết câu hoàn chỉnh nêu bật kinh nghiệm chuyên sâu và sự sẵn sàng tạo ra giá trị cho công ty.',
              targetText: 'I specialize in digital transformation and look forward to delivering measurable value to your team.',
              acceptableAnswers: [
                'I specialize in digital transformation and look forward to delivering measurable value to your team.',
                'I specialize in product development and aim to deliver great value to your company.',
                'I have deep experience and look forward to delivering value to your team.'
              ],
              requiredKeywords: ['specialize', 'delivering', 'value'],
              minWords: 6,
              grammarFocus: 'Cấu trúc phỏng vấn: "I specialize in [field] and look forward to delivering [measurable value / impact] to your team."',
              explanation: '"Measurable value" (giá trị đo lường được) là từ khóa mà các giám đốc tuyển dụng luôn muốn nghe.'
            }
          ]
        },
        {
          id: 'en-l9',
          track: 'workplace',
          title: 'Trả Lời Câu Hỏi Hành Vi Bằng Phương Pháp STAR',
          description: 'Cấu trúc Situation - Task - Action - Result giúp bài nói mạch lạc, có số liệu minh chứng thuyết phục.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e22',
              type: 'flashcard',
              prompt: 'Cụm từ then chốt nêu kết quả (Result) trong STAR',
              targetText: 'As a direct result of our initiative, customer retention surged by 25%.',
              romanization: '/æz ə daɪˈrekt rɪˈzʌlt əv ˈaʊər ɪˈnɪʃ.ə.tɪv ˈkʌs.tə.mər rɪˈten.ʃən sɜːdʒd baɪ.../',
              vietnameseMeaning: 'Kết quả trực tiếp từ sáng kiến của chúng tôi, tỷ lệ giữ chân khách hàng đã tăng vọt 25%.',
              audioText: 'As a direct result of our initiative, customer retention surged by twenty-five percent.',
              explanation: 'Luôn đưa số liệu định lượng (quantifiable metrics) để chứng minh giá trị bạn tạo ra.',
              culturalNote: 'Các công ty đa quốc gia (FAANG, Big 4) luôn chấm điểm ứng viên dựa trên phương pháp STAR.'
            },
            {
              id: 'en-e23',
              type: 'fill_blank',
              prompt: 'Điền từ nối: "When faced with a sudden system outage, I immediately took ______ to mitigate the impact."',
              options: ['action', 'time', 'money', 'rest'],
              correctAnswer: 'action',
              explanation: 'Colocation chuẩn: "take action to mitigate [risk/impact]" (hành động ngay để giảm thiểu rủi ro).'
            },
            {
              id: 'en-e23-sit',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu nêu bối cảnh (Situation): "Vào thời điểm đó, nhóm chúng tôi đang thiếu hụt nguồn lực kỹ thuật."',
              targetText: 'At that critical juncture, our team was severely understaffed.',
              wordTokens: ['At that critical juncture,', 'our team', 'was severely', 'understaffed.', 'happy', 'rich'],
              explanation: '"At that critical juncture" (Tại thời khắc then chốt đó) tạo bối cảnh kịch tính làm nổi bật hành động giải cứu của bạn.'
            },
            {
              id: 'en-e-spk-l9',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu nêu kết quả thành công với số liệu định lượng (STAR Result):',
              targetText: 'As a direct result of our initiative, customer retention surged by twenty-five percent.',
              targetPhonetic: 'æz ə daɪˈrekt rɪˈzʌlt əv ˈaʊər ɪˈnɪʃ.ə.tɪv, ˈkʌs.tə.mər rɪˈten.ʃən sɜːdʒd baɪ ˈtwen.ti faɪv pəˈsent.',
              vietnameseMeaning: 'Nhờ sáng kiến của chúng tôi, tỷ lệ giữ chân khách hàng đã tăng vọt 25%.',
              audioText: 'As a direct result of our initiative, customer retention surged by twenty-five percent.',
              speakingHints: [
                'Trọng âm từ "initiative": /ɪˈnɪʃ.ə.tɪv/ (nhấn âm 2)',
                'Động từ "surged": phát âm đuôi /dʒd/ dứt khoát',
                'Nhấn mạnh vào con số "twenty-five percent" để làm nổi bật thành tựu'
              ]
            },
            {
              id: 'en-e-wrt-l9',
              type: 'writing_drill',
              prompt: 'Viết câu trình bày hành động và kết quả đo lường được theo kỹ thuật STAR:',
              vietnameseMeaning: 'Tình huống: Nhà tuyển dụng yêu cầu bạn nêu một thành tựu nổi bật. Hãy viết câu mô tả bạn đã chủ động hành động và giúp tăng năng suất làm việc của nhóm thêm 30%.',
              targetText: 'I took immediate action to streamline the workflow, which boosted team productivity by thirty percent.',
              acceptableAnswers: [
                'I took immediate action to streamline the workflow, which boosted team productivity by thirty percent.',
                'I took action to streamline the process, boosting team productivity by thirty percent.',
                'I initiated a new workflow, which improved productivity by thirty percent.'
              ],
              requiredKeywords: ['action', 'productivity', 'percent'],
              minWords: 6,
              grammarFocus: 'Cấu trúc STAR kết quả: "I took action to [verb], which boosted/increased [metric] by [X] percent."',
              explanation: 'Kết hợp mệnh đề quan hệ không xác định ", which boosted..." là cách viết báo cáo thành tích cao cấp.'
            }
          ]
        },
        {
          id: 'en-l9-weak',
          track: 'workplace',
          title: 'Xử Lý Câu Hỏi Hóc Búa: Lý Do Nghỉ Việc Cũ (Handling Red Flags)',
          description: 'Cách giải thích lý do rời công ty cũ văn minh, chuyên nghiệp và chuyển hướng tích cực sang cơ hội tương lai.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e23b',
              type: 'flashcard',
              prompt: 'Mẫu câu giải thích lý do tìm kiếm cơ hội mới chuẩn mực',
              targetText: 'While I deeply valued my time at my previous company, I am looking for a new challenge where I can broaden my leadership scope.',
              romanization: '/waɪl aɪ ˈdiːp.li ˈvæl.juːd maɪ taɪm æt maɪ ˈpriː.vi.əs ˈkʌm.pə.ni.../',
              vietnameseMeaning: 'Mặc dù tôi rất trân trọng thời gian làm việc tại công ty trước, tôi đang tìm kiếm một thử thách mới nơi tôi có thể mở rộng phạm vi năng lực lãnh đạo.',
              audioText: 'While I deeply valued my time at my previous company, I am looking for a new challenge where I can broaden my leadership scope.',
              explanation: 'Quy tắc vàng: Tuyệt đối không phàn nàn về sếp cũ hay đồng nghiệp cũ. Tập trung hoàn toàn vào sự phát triển cá nhân.',
              culturalNote: 'Thái độ tích cực, tôn trọng nơi làm việc cũ là minh chứng cho nhân cách và độ tin cậy của ứng viên.'
            },
            {
              id: 'en-e23c',
              type: 'quiz_choice',
              prompt: 'Khi được hỏi về một lần bạn thất bại trong công việc ("Tell me about a time you failed"), câu trả lời nào ghi điểm cao nhất?',
              options: [
                'Thừa nhận sai lầm một cách thẳng thắn, phân tích nguyên nhân gốc rễ và chia sẻ quy trình bạn đã thiết lập lại để sự cố đó không bao giờ lặp lại.',
                'Đổ lỗi cho đồng nghiệp làm việc tắc trách khiến dự án thất bại.',
                'Khẳng định tôi chưa bao giờ thất bại vì tôi luôn làm việc hoàn hảo.',
                'Nói rằng tôi không nhớ sự việc nào như vậy.'
              ],
              correctAnswer: 'Thừa nhận sai lầm một cách thẳng thắn, phân tích nguyên nhân gốc rễ và chia sẻ quy trình bạn đã thiết lập lại để sự cố đó không bao giờ lặp lại.',
              explanation: 'Khả năng chịu trách nhiệm (Accountability) và học hỏi từ thất bại (Learning from failure) là những phẩm chất lãnh đạo cốt lõi.'
            },
            {
              id: 'en-e-weak-bld',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi xem sai sót đó là một cơ hội học hỏi quý giá giúp tôi hoàn thiện bản thân."',
              targetText: 'I viewed that mistake as a valuable learning opportunity to refine my approach.',
              wordTokens: ['I viewed', 'that mistake', 'as a valuable', 'learning opportunity', 'to refine', 'my approach.', 'blame', 'angry'],
              explanation: '"View as a learning opportunity to refine my approach" thể hiện tư duy cầu tiến (growth mindset).'
            },
            {
              id: 'en-e-spk-weak',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu giải thích lý do chuyển việc văn minh và hướng tới tương lai:',
              targetText: 'I am looking for a new challenge where I can broaden my technical skills and leadership scope.',
              targetPhonetic: 'aɪ æm ˈlʊkɪŋ fɔːr ə njuː ˈtʃælɪndʒ weər aɪ kæn ˈbrɔːdn maɪ ˈteknɪkl skɪlz ænd ˈliːdəʃɪp skəʊp.',
              vietnameseMeaning: 'Tôi đang tìm kiếm một thử thách mới nơi tôi có thể mở rộng kỹ năng kỹ thuật và phạm vi lãnh đạo.',
              audioText: 'I am looking for a new challenge where I can broaden my technical skills and leadership scope.',
              speakingHints: [
                'Động từ "broaden": /ˈbrɔː.dən/ (mở rộng)',
                'Cụm "leadership scope": nhấn vào "leadership"',
                'Giọng điệu tích cực, toát lên tinh thần khao khát phát triển'
              ]
            },
            {
              id: 'en-e-wrt-weak',
              type: 'writing_drill',
              prompt: 'Viết câu trả lời về lý do bạn ứng tuyển vào vị trí mới tại công ty này:',
              vietnameseMeaning: 'Tình huống: Người phỏng vấn hỏi tại sao bạn muốn thay đổi công việc. Hãy viết câu thể hiện lòng biết ơn công ty cũ nhưng mong muốn tìm kiếm một môi trường đột phá để nâng tầm năng lực.',
              targetText: 'While I appreciated my previous role, I am ready for a new challenge to broaden my professional scope.',
              acceptableAnswers: [
                'While I appreciated my previous role, I am ready for a new challenge to broaden my professional scope.',
                'I am looking for a new challenge where I can broaden my skills and experience.',
                'While I valued my past experience, I am seeking a new challenge to grow professionally.'
              ],
              requiredKeywords: ['challenge', 'broaden', 'scope'],
              minWords: 6,
              grammarFocus: 'Cấu trúc chuyển hướng tích cực: "While I [valued/appreciated] my previous role, I am looking for a new challenge to broaden my [scope/skills]."',
              explanation: 'Cách diễn đạt này hoàn toàn loại bỏ rủi ro bị coi là "nói xấu công ty cũ", thể hiện tầm vóc chuyên nghiệp.'
            }
          ]
        },
        {
          id: 'en-l10',
          track: 'workplace',
          title: 'Đàm Phán Lương Thưởng & Đặt Câu Hỏi Chiến Lược Cho HR',
          description: 'Cách hỏi ngược lại HR thông minh ở cuối buổi phỏng vấn và trao đổi mức lương kỳ vọng đầy tự tin.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e24',
              type: 'flashcard',
              prompt: 'Câu hỏi thông minh hỏi ngược lại giám khảo ở cuối buổi phỏng vấn',
              targetText: 'What does success look like in this role over the first 90 days?',
              romanization: '/wɒt dʌz səkˈses lʊk laɪk ɪn ðɪs rəʊl ˈəʊ.vər ðə fɜːst ˈnaɪn.ti deɪz/',
              vietnameseMeaning: 'Thành công ở vị trí này trong 90 ngày đầu tiên sẽ được đo lường như thế nào?',
              audioText: 'What does success look like in this role over the first ninety days?',
              explanation: 'Câu hỏi này thể hiện tinh thần chủ động, định hướng mục tiêu rõ ràng và sự sẵn sàng cống hiến.',
              culturalNote: 'Nếu không hỏi câu nào khi được hỏi "Do you have any questions for us?", nhà tuyển dụng có thể nghĩ bạn thiếu nhiệt huyết.'
            },
            {
              id: 'en-e25',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Mức lương kỳ vọng của tôi hoàn toàn có thể thương lượng dựa trên gói đãi ngộ tổng thể."',
              targetText: 'My salary expectations are flexible depending on the overall benefits package.',
              wordTokens: ['My salary', 'expectations', 'are flexible', 'depending on', 'the overall', 'benefits package.', 'fixed', 'cheap'],
              explanation: 'Cách trả lời khôn ngoan khi đàm phán lương mà không bị tự trói mình vào một con số cố định quá sớm.'
            },
            {
              id: 'en-e25b',
              type: 'fill_blank',
              prompt: 'Hỏi về lộ trình thăng tiến: "Could you shed light on the career ______ paths within this department?"',
              options: ['progression', 'resignation', 'punishment', 'isolation'],
              correctAnswer: 'progression',
              explanation: '"Career progression paths" (lộ trình thăng tiến sự nghiệp) thể hiện tầm nhìn gắn bó lâu dài.'
            },
            {
              id: 'en-e-spk-l10',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu hỏi ngược lại nhà tuyển dụng về thước đo thành công trong 90 ngày đầu:',
              targetText: 'What does success look like in this role over the first ninety days?',
              targetPhonetic: 'wɒt dʌz səkˈses lʊk laɪk ɪn ðɪs rəʊl ˈəʊvə ðə fɜːst ˈnaɪnti deɪz?',
              vietnameseMeaning: 'Thành công ở vị trí này trong 90 ngày đầu tiên sẽ được định nghĩa như thế nào?',
              audioText: 'What does success look like in this role over the first ninety days?',
              speakingHints: [
                'Trọng âm từ "success": /səkˈses/ (nhấn âm 2)',
                'Cụm "first ninety days": nhấn vào "ninety days"',
                'Giữ ánh mắt tự tin, ngữ điệu cầu thị và chuyên nghiệp'
              ]
            },
            {
              id: 'en-e-wrt-l10',
              type: 'writing_drill',
              prompt: 'Viết câu trả lời về mức lương kỳ vọng linh hoạt dựa trên toàn bộ gói đãi ngộ:',
              vietnameseMeaning: 'Tình huống: HR hỏi về mức lương mong muốn của bạn. Hãy viết câu phản hồi khéo léo rằng mức đãi ngộ có thể linh hoạt điều chỉnh tùy thuộc vào các chế độ thưởng, bảo hiểm và cơ hội thăng tiến.',
              targetText: 'My salary expectations are flexible depending on the overall benefits and growth opportunities.',
              acceptableAnswers: [
                'My salary expectations are flexible depending on the overall benefits and growth opportunities.',
                'My salary expectations are flexible based on the total benefits package.',
                'My expectations are flexible depending on the overall compensation package.'
              ],
              requiredKeywords: ['salary', 'flexible', 'benefits'],
              minWords: 6,
              grammarFocus: 'Cấu trúc đàm phán lương: "My salary expectations are flexible depending on [benefits / total package / growth opportunities]."',
              explanation: 'Đây là câu nói kinh điển của các chuyên gia tư vấn nghề nghiệp quốc tế khi bảo vệ vị thế thương lượng.'
            }
          ]
        },
        {
          id: 'en-l10-lead',
          track: 'workplace',
          title: 'Phỏng Vấn Quản Lý: Kỹ Năng Lãnh Đạo & Quản Trị Xung Đột (Leadership & Conflict Resolution)',
          description: 'Mô hình lãnh đạo Servant Leadership, giải quyết bất đồng quan điểm giữa các kỹ sư và thúc đẩy văn hóa an toàn tâm lý (Psychological Safety).',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e10-lead1',
              type: 'flashcard',
              prompt: 'Triết lý lãnh đạo hiện đại tại các tập đoàn công nghệ',
              targetText: 'I lead by empowering my team, fostering psychological safety where candid debate is encouraged.',
              romanization: '/aɪ liːd baɪ ɪmˈpaʊər.ɪŋ maɪ tiːm ˈfɒs.tər.ɪŋ ˌsaɪ.kəˈlɒdʒ.ɪ.kəl ˈseɪf.ti.../',
              vietnameseMeaning: 'Tôi lãnh đạo bằng cách trao quyền cho đội ngũ, nuôi dưỡng môi trường an toàn tâm lý nơi những tranh luận thẳng thắn luôn được khuyến khích.',
              audioText: 'I lead by empowering my team, fostering psychological safety where candid debate is encouraged.',
              explanation: '"Empowering" (trao quyền); "fostering psychological safety" (nuôi dưỡng an toàn tâm lý); "candid debate" (tranh luận chân thành thẳng thắn).',
              culturalNote: 'Các tập đoàn toàn cầu tìm kiếm nhà lãnh đạo biết lắng nghe và tạo động lực thay vì quản lý vi mô (Micromanagement).'
            },
            {
              id: 'en-e10-lead2',
              type: 'quiz_choice',
              prompt: 'Khi hai thành viên cấp cao trong nhóm xảy ra mâu thuẫn gay gắt về kiến trúc kỹ thuật dự án, người quản lý nên làm gì?',
              options: [
                'Tổ chức buổi họp 1-1 riêng với từng người để lắng nghe quan điểm kỹ thuật, sau đó cùng ngồi lại phân tích ưu nhược điểm dựa trên dữ liệu khách quan.',
                'Đuổi việc ngay lập tức người phản đối ý kiến của sếp.',
                'Bỏ mặc cho hai người tự cãi nhau đến khi có người chịu thua.',
                'Bắt cả hai phải đồng ý mà không cho nêu ý kiến.'
              ],
              correctAnswer: 'Tổ chức buổi họp 1-1 riêng với từng người để lắng nghe quan điểm kỹ thuật, sau đó cùng ngồi lại phân tích ưu nhược điểm dựa trên dữ liệu khách quan.',
              explanation: 'Data-driven and empathetic conflict resolution (giải quyết xung đột dựa trên dữ liệu và sự thấu cảm) là tiêu chuẩn vàng của quản lý cấp cao.'
            },
            {
              id: 'en-e10-lead3',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Một nhà lãnh đạo xuất sắc luôn ghi nhận công lao của nhóm và nhận trách nhiệm về mình khi có lỗi."',
              targetText: 'A great leader attributes success to the team and shoulders responsibility for setbacks.',
              wordTokens: ['A great leader', 'attributes success', 'to the team', 'and shoulders', 'responsibility', 'for setbacks.', 'blame', 'money'],
              explanation: '"Attributes success to... and shoulders responsibility for..." (ghi nhận thành công cho nhóm và gánh vác trách nhiệm khi gặp nghịch cảnh).'
            },
            {
              id: 'en-e-spk-lead',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu tuyên ngôn triết lý lãnh đạo hiện đại:',
              targetText: 'I lead by empowering my team and fostering an environment of psychological safety.',
              targetPhonetic: 'aɪ liːd baɪ ɪmˈpaʊərɪŋ maɪ tiːm ænd ˈfɒstərɪŋ ən ɪnˈvaɪrənmənt əv ˌsaɪkəˈlɒdʒɪkl ˈseɪfti.',
              vietnameseMeaning: 'Tôi lãnh đạo bằng cách trao quyền cho đội ngũ và nuôi dưỡng môi trường an toàn tâm lý.',
              audioText: 'I lead by empowering my team and fostering an environment of psychological safety.',
              speakingHints: [
                'Thuật ngữ quan trọng "psychological safety": /ˌsaɪkəˈlɒdʒɪkl ˈseɪfti/',
                'Động từ "empowering": nhấn âm 2 /ɪmˈpaʊərɪŋ/',
                'Giọng điệu truyền cảm hứng, điềm đạm và thấu cảm'
              ]
            },
            {
              id: 'en-e-wrt-lead',
              type: 'writing_drill',
              prompt: 'Viết câu trả lời về phương pháp giải quyết xung đột ý kiến giữa các kỹ sư trong nhóm:',
              vietnameseMeaning: 'Tình huống: Người phỏng vấn hỏi bạn xử lý xung đột trong nhóm như thế nào. Hãy viết câu khẳng định bạn luôn lắng nghe hai chiều và thúc đẩy quyết định dựa trên dữ liệu khách quan.',
              targetText: 'I resolve conflicts by listening empathetically and guiding the team toward data-driven decisions.',
              acceptableAnswers: [
                'I resolve conflicts by listening empathetically and guiding the team toward data-driven decisions.',
                'I resolve conflicts by listening to both sides and making data-driven decisions.',
                'I handle team disagreements by focusing on empathy and data-driven solutions.'
              ],
              requiredKeywords: ['conflicts', 'data-driven', 'decisions'],
              minWords: 6,
              grammarFocus: 'Cấu trúc quản lý: "I resolve conflicts by [listening empathetically] and guiding the team toward [data-driven decisions]."',
              explanation: '"Data-driven decisions" kết hợp "empathy" là công thức vàng của các nhà lãnh đạo công nghệ thế kỷ 21.'
            }
          ]
        }
      ]
    },
    {
      id: 'en-u5',
      number: 5,
      track: 'academic',
      title: 'Tiếng Anh Học Thuật Chuyên Sâu & Kỹ Năng Thi Chứng Chỉ (Academic Mastery)',
      description: 'Làm chủ các cấu trúc học thuật nâng cao cho kỳ thi IELTS Band 7.5+ và TOEIC 900+: mô tả biểu đồ, nghị luận xã hội PEEL, thi nói và ngữ pháp C1/C2.',
      cefrLevel: 'C1 - C2 Advanced',
      lessons: [
        {
          id: 'en-l11-ielts1',
          track: 'academic',
          title: 'IELTS Writing Task 1: Ngôn Ngữ Mô Tả Xu Hướng Biểu Đồ',
          description: 'Các động từ và trạng từ mô tả biến động mạnh/nhẹ, chạm đỉnh, chạm đáy và ổn định (Fluctuate, Peak, Plateau, Plummet).',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e26',
              type: 'flashcard',
              prompt: 'Colocation học thuật mô tả sự giảm sâu đột ngột',
              targetText: 'After a brief period of stability, global oil exports plummeted drastically.',
              romanization: '/ˈɑːf.tər ə briːf ˈpɪə.ri.əd əv stəˈbɪl.ə.ti ˈɡləʊ.bəl ɔɪl ˈek.spɔːts ˈplʌm.ɪt.ɪd ˈdræs.tɪ.kəl.i/',
              vietnameseMeaning: 'Sau một giai đoạn ổn định ngắn ngủi, lượng dầu xuất khẩu toàn cầu đã lao dốc không phanh.',
              audioText: 'After a brief period of stability, global oil exports plummeted drastically.',
              explanation: '"Plummet drastically" là cụm từ nâng cấp xuất sắc thay cho "decreased quickly".',
              culturalNote: 'Trong IELTS Task 1, việc kết hợp đa dạng giữa Động từ + Trạng từ (rose slightly) và Tính từ + Danh từ (saw a slight rise) là chìa khóa đạt band 7.0+ Tiêu chí Lexical Resource.'
            },
            {
              id: 'en-e27',
              type: 'fill_blank',
              prompt: 'Điền từ học thuật: "Sales figures ______ between 40,000 and 60,000 units throughout the entire year."',
              options: ['fluctuated', 'stayed same', 'climbed off', 'walked by'],
              correctAnswer: 'fluctuated',
              explanation: '"Fluctuated between X and Y" (dao động lên xuống giữa 2 mốc) là thuật ngữ mô tả dữ liệu chuẩn mực.'
            },
            {
              id: 'en-e27b',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Mức tiêu thụ năng lượng mặt trời đạt đỉnh điểm vào năm 2022 trước khi giữ mức ổn định."',
              targetText: 'Solar energy consumption reached a peak in 2022 before plateauing.',
              wordTokens: ['Solar energy consumption', 'reached a peak', 'in 2022', 'before', 'plateauing.', 'dropping', 'cold'],
              explanation: '"Reach a peak" (chạm đỉnh) và "plateau" (đi ngang ổn định sau khi tăng) là cặp từ vựng Task 1 đắt giá.'
            },
            {
              id: 'en-e-spk-ielts1',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu phân tích xu hướng số liệu biểu đồ Task 1:',
              targetText: 'After a brief period of stability, global exports plummeted drastically before plateauing.',
              targetPhonetic: 'ˈɑːftər ə briːf ˈpɪəriəd əv stəˈbɪləti, ˈɡləʊbl ˈekspɔːts ˈplʌmɪtɪd ˈdræstɪkli bɪˈfɔː ˈplætəʊɪŋ.',
              vietnameseMeaning: 'Sau một giai đoạn ổn định ngắn ngủi, lượng hàng xuất khẩu toàn cầu đã lao dốc mạnh trước khi đi ngang.',
              audioText: 'After a brief period of stability, global exports plummeted drastically before plateauing.',
              speakingHints: [
                'Trọng âm từ "stability": /stəˈbɪl.ə.ti/ (nhấn âm 2)',
                'Động từ "plummeted": /ˈplʌm.ɪ.tɪd/ (nhấn âm 1)',
                'Động từ "plateauing": /ˈplæt.əʊ.ɪŋ/'
              ]
            },
            {
              id: 'en-e-wrt-ielts1',
              type: 'writing_drill',
              prompt: 'Viết câu miêu tả xu hướng biến động dữ liệu cho bài thi IELTS Writing Task 1:',
              vietnameseMeaning: 'Tình huống: Đề bài yêu cầu miêu tả biểu đồ năng lượng tái tạo. Hãy viết câu nêu rõ lượng tiêu thụ đã chạm đỉnh vào năm 2022 trước khi duy trì ổn định.',
              targetText: 'Renewable energy consumption reached a peak in 2022 before plateauing for the rest of the period.',
              acceptableAnswers: [
                'Renewable energy consumption reached a peak in 2022 before plateauing for the rest of the period.',
                'Energy consumption reached a peak in 2022 before plateauing.',
                'Solar energy reached a peak in 2022 before remaining stable.'
              ],
              requiredKeywords: ['reached', 'peak', 'plateauing'],
              minWords: 6,
              grammarFocus: 'Cấu trúc Task 1 đỉnh cao: "Subject + reached a peak in [year] before plateauing / stabilizing"',
              explanation: 'Sử dụng cấu trúc "reached a peak... before plateauing" giúp thí sinh đạt điểm tối đa tiêu chí Lexical Resource và Grammatical Range.'
            }
          ]
        },
        {
          id: 'en-l12-ielts2',
          track: 'academic',
          title: 'IELTS Writing Task 2: Cấu Trúc Đoạn Văn PEEL',
          description: 'Quy tắc vàng xây dựng thân bài lập luận chặt chẽ: Point (Luận điểm) - Explain (Giải thích) - Evidence (Dẫn chứng) - Link (Liên kết).',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e28',
              type: 'flashcard',
              prompt: 'Câu dẫn chứng (Evidence) học thuật mẫu mực',
              targetText: 'A pertinent example of this is Finland’s educational curriculum, which prioritizes holistic development over standardized testing.',
              romanization: '/ə ˈpɜː.tɪ.nənt ɪɡˈzɑːm.pəl əv ðɪs ɪz ˈfɪn.ləndz ˌedʒ.ʊˈkeɪ.ʃən.əl kəˈrɪk.jʊ.ləm.../',
              vietnameseMeaning: 'Một ví dụ thích đáng cho điều này là chương trình giáo dục của Phần Lan, nơi ưu tiên phát triển toàn diện hơn là thi cử rập khuôn.',
              audioText: 'A pertinent example of this is Finland’s educational curriculum, which prioritizes holistic development over standardized testing.',
              explanation: '"Pertinent example" (ví dụ thích đáng, đắt giá); "holistic development" (phát triển toàn diện).',
              culturalNote: 'Giám khảo IELTS đánh giá cao các ví dụ thực tế có tính học thuật thay vì tự sáng tác chuyện của bản thân hay bạn bè.'
            },
            {
              id: 'en-e29',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu kết luận đoạn (Link): "Do đó, có thể thấy rõ rằng việc đầu tư vào năng lượng tái tạo mang lại lợi ích lâu dài vượt trội."',
              targetText: 'Therefore, it is evident that investing in renewable energy yields superior long-term benefits.',
              wordTokens: ['Therefore,', 'it is evident', 'that investing in', 'renewable energy', 'yields superior', 'long-term benefits.', 'bad', 'money'],
              explanation: '"Yields superior benefits" (mang lại những lợi ích vượt trội) là lối hành văn học thuật band 8.0+.'
            },
            {
              id: 'en-e29b',
              type: 'fill_blank',
              prompt: 'Điền liên từ học thuật tương phản: "Some argue that AI diminishes creativity; ______, empirical studies indicate that it augments human capability."',
              options: ['conversely', 'because', 'so that', 'although'],
              correctAnswer: 'conversely',
              explanation: '"Conversely" (ngược lại hoàn toàn) là trạng từ liên kết học thuật trang trọng nối hai mệnh đề đối lập sâu sắc.'
            },
            {
              id: 'en-e-spk-ielts2',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu dẫn chứng học thuật Band 8.0+ cho bài thi:',
              targetText: 'A pertinent example of this is Finland, which prioritizes holistic development over standardized testing.',
              targetPhonetic: 'ə ˈpɜːtɪnənt ɪɡˈzɑːmpl əv ðɪs ɪz ˈfɪnlənd, wɪtʃ praɪˈɒrətaɪzɪz həʊˈlɪstɪk dɪˈveləpmənt.',
              vietnameseMeaning: 'Một ví dụ thích đáng cho điều này là Phần Lan, nơi ưu tiên phát triển toàn diện thay vì thi cử rập khuôn.',
              audioText: 'A pertinent example of this is Finland, which prioritizes holistic development over standardized testing.',
              speakingHints: [
                'Từ học thuật "pertinent": /ˈpɜː.tɪ.nənt/ (thích đáng, chuẩn xác)',
                'Động từ "prioritizes": /praɪˈɒr.ə.taɪ.zɪz/',
                'Cụm "holistic development": phát âm tròn vành rõ chữ'
              ]
            },
            {
              id: 'en-e-wrt-ielts2',
              type: 'writing_drill',
              prompt: 'Viết câu kết luận đoạn (Link sentence) trong mô hình PEEL cho bài luận Task 2:',
              vietnameseMeaning: 'Tình huống: Bạn vừa phân tích xong các luận cứ về chuyển đổi xanh. Hãy viết câu kết nối chốt lại rằng đầu tư vào năng lượng tái tạo sẽ mang lại lợi ích dài hạn vượt trội.',
              targetText: 'Therefore, it is evident that investing in clean energy yields superior long-term benefits.',
              acceptableAnswers: [
                'Therefore, it is evident that investing in clean energy yields superior long-term benefits.',
                'Therefore, it is evident that investing in renewable energy yields superior long-term benefits.',
                'Thus, it is clear that investing in green energy yields superior long-term benefits.'
              ],
              requiredKeywords: ['evident', 'yields', 'benefits'],
              minWords: 6,
              grammarFocus: 'Cấu trúc Link trong PEEL: "Therefore, it is evident that [action/policy] yields superior [adjective] benefits."',
              explanation: '"It is evident that... yields superior benefits" là lối hành văn học thuật chuẩn mực của Cambridge Band 8.5.'
            }
          ]
        },
        {
          id: 'en-l13-ielts-spk',
          track: 'academic',
          title: 'IELTS Speaking Part 2 & 3: Công Thức A.R.E.A & Từ Vựng Band 8.0+',
          description: 'Kỹ thuật mở rộng câu trả lời trừu tượng theo mô hình Answer - Reason - Example - Alternative và làm chủ các cụm từ Idiomatic tự nhiên.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e13-spk1',
              type: 'flashcard',
              prompt: 'Mở đầu câu trả lời Speaking Part 3 thể hiện tư duy đa chiều',
              targetText: 'From my perspective, this issue is a double-edged sword with both profound benefits and tangible drawbacks.',
              romanization: '/frɒm maɪ pəˈspek.tɪv ðɪs ˈɪʃ.uː ɪz ə ˈdʌb.əl edʒd sɔːd wɪð bəʊθ prəˈfaʊnd ˈben.ɪ.fɪts.../',
              vietnameseMeaning: 'Theo góc nhìn của tôi, vấn đề này là một con dao hai lưỡi với cả những lợi ích sâu sắc lẫn những mặt hạn chế rõ rệt.',
              audioText: 'From my perspective, this issue is a double-edged sword with both profound benefits and tangible drawbacks.',
              explanation: '"Double-edged sword" (con dao hai lưỡi); "profound benefits" (lợi ích sâu sắc); "tangible drawbacks" (bất lợi hữu hình).',
              culturalNote: 'Trong Part 3, giám khảo không tìm câu trả lời đúng sai mà đánh giá khả năng phân tích vấn đề xã hội một cách chín chắn.'
            },
            {
              id: 'en-e13-spk2',
              type: 'quiz_choice',
              prompt: 'Khi muốn có thêm 2-3 giây suy nghĩ trước câu hỏi trừu tượng mà không bị im lặng ngắt quãng, bạn nên nói gì?',
              options: [
                'That is an intriguing question. To be completely honest, I have never looked at it from that angle before, but I would venture to say...',
                'Wait a minute, my brain is empty right now.',
                'Teacher, please skip this question.',
                'I do not know English for this.'
              ],
              correctAnswer: 'That is an intriguing question. To be completely honest, I have never looked at it from that angle before, but I would venture to say...',
              explanation: 'Filler phrases học thuật giúp bạn duy trì điểm Fluency & Coherence trong khi não bộ sắp xếp ý tưởng.'
            },
            {
              id: 'en-e13-spk3',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Nếu không có sự can thiệp của chính phủ, vấn đề ô nhiễm đô thị sẽ tiếp tục trầm trọng hơn."',
              targetText: 'Without timely governmental intervention, urban pollution will inevitably exacerbate.',
              wordTokens: ['Without timely', 'governmental intervention,', 'urban pollution', 'will inevitably', 'exacerbate.', 'stop', 'clean'],
              explanation: '"Inevitably exacerbate" (chắc chắn sẽ trở nên trầm trọng hơn) là colocation Band 8.5+.'
            },
            {
              id: 'en-e-spk-area',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu phân tích đa chiều mở đầu IELTS Speaking Part 3:',
              targetText: 'From my perspective, artificial intelligence is a double-edged sword with profound benefits and tangible drawbacks.',
              targetPhonetic: 'frɒm maɪ pəˈspektɪv, ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns ɪz ə ˈdʌbld edʒd sɔːd wɪð prəˈfaʊnd ˈbenɪfɪts.',
              vietnameseMeaning: 'Theo góc nhìn của tôi, trí tuệ nhân tạo là một con dao hai lưỡi với cả những lợi ích sâu sắc lẫn những mặt hạn chế rõ rệt.',
              audioText: 'From my perspective, artificial intelligence is a double-edged sword with profound benefits and tangible drawbacks.',
              speakingHints: [
                'Cụm thành ngữ "double-edged sword": /ˈdʌb.l̩.edʒd sɔːd/',
                'Tính từ "profound": /prəˈfaʊnd/ (sâu sắc)',
                'Giữ nhịp điệu mượt mà, tránh ngắt quãng giữa các cụm ý'
              ]
            },
            {
              id: 'en-e-wrt-area',
              type: 'writing_drill',
              prompt: 'Viết câu mở đầu phân tích vấn đề xã hội đa chiều cho IELTS Speaking Part 3 hoặc Task 2:',
              vietnameseMeaning: 'Tình huống: Giám khảo hỏi về tác động của công nghệ hiện đại. Hãy viết câu nêu rõ đây là vấn đề hai mặt với cả những lợi ích sâu sắc lẫn những rủi ro hiện hữu.',
              targetText: 'From my perspective, this trend is a double-edged sword with profound benefits and tangible risks.',
              acceptableAnswers: [
                'From my perspective, this trend is a double-edged sword with profound benefits and tangible risks.',
                'From my perspective, this is a double-edged sword with profound benefits and drawbacks.',
                'In my opinion, this issue is a double-edged sword with profound benefits and tangible risks.'
              ],
              requiredKeywords: ['perspective', 'double-edged', 'benefits'],
              minWords: 6,
              grammarFocus: 'Cấu trúc đa chiều A.R.E.A: "From my perspective, [subject] is a double-edged sword with profound benefits and tangible [risks/drawbacks]."',
              explanation: 'Thể hiện tư duy phản biện cao cấp, được giám khảo IELTS chấm điểm cao ở tiêu chí Lexical Resource.'
            }
          ]
        },
        {
          id: 'en-l13b-ielts-read',
          track: 'academic',
          title: 'IELTS Reading: Kỹ Thuật Đọc Quét Skim & Scan, Bẫy True/False/Not Given & Headings',
          description: 'Làm chủ quy trình đọc lướt nắm mạch ý (Skimming) và quét từ khóa (Scanning), giải mã bẫy Not Given và nối tiêu đề đoạn văn chuẩn xác.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e13b-read1',
              type: 'flashcard',
              prompt: 'Nguyên tắc vàng phân biệt False và Not Given trong IELTS Reading',
              targetText: 'A statement is False only when the passage directly refutes it; if the text neither affirms nor contradicts the claim, it must be Not Given.',
              romanization: '/ə ˈsteɪt.mənt ɪz fɔːls ˈəʊn.li wen ðə ˈpæs.ɪdʒ daɪˈrekt.li rɪˈfjuːts ɪt.../',
              vietnameseMeaning: 'Một nhận định chỉ là False khi bài đọc trực tiếp bác bỏ nó; nếu bài đọc không khẳng định cũng không phủ định thì bắt buộc phải là Not Given.',
              audioText: 'A statement is False only when the passage directly refutes it; if the text neither affirms nor contradicts the claim, it must be Not Given.',
              explanation: 'Sai lầm lớn nhất của thí sinh là tự suy diễn kiến thức cá nhân (assumptions) vào bài thi. Quy tắc là: "Nếu bài không viết, coi như không biết".',
              culturalNote: 'Bài thi IELTS Reading kiểm tra năng lực xử lý dữ liệu khách quan, không kiểm tra kiến thức nền của bạn.'
            },
            {
              id: 'en-e13b-read2',
              type: 'quiz_choice',
              prompt: 'Khi làm dạng bài Matching Headings (Nối tiêu đề đoạn văn), chiến thuật nào hiệu quả và tránh bẫy tốt nhất?',
              options: [
                'Đọc toàn bộ đoạn để xác định luận điểm cốt lõi (thematic thesis), tránh bẫy những câu ví dụ chi tiết chứa từ vựng giống y hệt tiêu đề.',
                'Chỉ đọc câu đầu và câu cuối của mỗi đoạn vì đáp án luôn nằm ở đó.',
                'Chọn tiêu đề có chứa từ dài và khó hiểu nhất.',
                'Nối ngẫu nhiên theo thứ tự xuất hiện của các đoạn văn.'
              ],
              correctAnswer: 'Đọc toàn bộ đoạn để xác định luận điểm cốt lõi (thematic thesis), tránh bẫy những câu ví dụ chi tiết chứa từ vựng giống y hệt tiêu đề.',
              explanation: 'Đề thi IELTS thường gài bẫy bằng cách đưa từ khóa trong tiêu đề sai vào một ví dụ phụ hoặc câu phản đề trong đoạn văn.'
            },
            {
              id: 'en-e13b-read3',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Kỹ thuật Skimming giúp nắm bắt ý đồ tác giả, trong khi Scanning giúp định vị tên riêng và số liệu."',
              targetText: 'Skimming enables readers to grasp the overarching narrative while scanning pinpoints specific nomenclature.',
              wordTokens: ['Skimming enables', 'readers to grasp', 'the overarching narrative', 'while scanning', 'pinpoints specific', 'nomenclature.', 'slow', 'word'],
              explanation: '"Overarching narrative" (mạch truyện/ý đồ bao quát) và "specific nomenclature" (thuật ngữ/danh pháp chuyên môn cụ thể).'
            },
            {
              id: 'en-e-spk-read',
              type: 'speaking_drill',
              prompt: 'Luyện nói quy tắc phân định True, False và Not Given trong IELTS Reading:',
              targetText: 'A statement is False only when the passage directly refutes it, otherwise it is Not Given.',
              targetPhonetic: 'ə ˈsteɪtmənt ɪz fɔːls ˈəʊnli wen ðə ˈpæsɪdʒ daɪˈrektli rɪˈfjuːts ɪt, ˈʌðəwaɪz ɪt ɪz nɒt ˈɡɪvn.',
              vietnameseMeaning: 'Một nhận định chỉ là False khi bài đọc trực tiếp bác bỏ nó, ngược lại nó phải là Not Given.',
              audioText: 'A statement is False only when the passage directly refutes it, otherwise it is Not Given.',
              speakingHints: [
                'Động từ "refutes": /rɪˈfjuːts/ (bác bỏ hoàn toàn)',
                'Nhấn mạnh vào cặp đối lập: "directly refutes" và "Not Given"',
                'Ngắt nhịp rõ ràng sau dấu phẩy'
              ]
            },
            {
              id: 'en-e-wrt-read',
              type: 'writing_drill',
              prompt: 'Viết câu ghi chú chiến thuật làm bài đọc hiểu học thuật đối với bẫy thông tin:',
              vietnameseMeaning: 'Tình huống: Bạn ghi chép sổ tay luyện thi IELTS Reading. Hãy viết quy tắc: Kỹ thuật skimming giúp nắm bắt chủ đề chính còn scanning định vị nhanh số liệu cụ thể.',
              targetText: 'Skimming helps identify the overarching topic while scanning pinpoints specific dates and figures.',
              acceptableAnswers: [
                'Skimming helps identify the overarching topic while scanning pinpoints specific dates and figures.',
                'Skimming grasps the main idea while scanning locates specific numbers and dates.',
                'Skimming identifies the main theme while scanning pinpoints specific facts.'
              ],
              requiredKeywords: ['skimming', 'scanning', 'specific'],
              minWords: 6,
              grammarFocus: 'Cấu trúc so sánh song song: "Skimming [verb phrase] while scanning [verb phrase]."',
              explanation: 'Làm chủ sự khác biệt giữa hai kỹ năng đọc quét là nền tảng để hoàn thành 3 bài đọc dài 700-900 từ trong đúng 60 phút.'
            }
          ]
        },
        {
          id: 'en-l13c-ielts-list',
          track: 'academic',
          title: 'IELTS Listening: Bẫy Đổi Hướng (Signpost Words) & Điền Từ Chính Xác 40/40',
          description: 'Nhận diện các từ báo hiệu chuyển hướng (However, In fact, Actually), kỹ thuật dự đoán dạng từ trước khi nghe và tránh bẫy phát âm chữ cái/chữ số.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e13c-list1',
              type: 'flashcard',
              prompt: 'Mẹo phát hiện bẫy tự sửa lỗi (Correction Trap) trong Listening Section 1 & 2',
              targetText: 'Whenever a speaker utters "Wait, actually...", the immediately preceding information is a deliberate distractor.',
              romanization: '/wenˈev.ər ə ˈspiː.kər ˈʌt.ərz weɪt ˈæk.tʃu.ə.li ðə ɪˈmiː.di.ət.li prɪˈsiː.dɪŋ.../',
              vietnameseMeaning: 'Bất cứ khi nào người nói thốt lên "Khoan đã, thực ra là...", thông tin ngay trước đó chính là bẫy đánh lạc hướng có chủ ý.',
              audioText: 'Whenever a speaker utters "Wait, actually...", the immediately preceding information is a deliberate distractor.',
              explanation: 'Trong Listening Section 1, người nói thường đưa ra một số điện thoại hoặc ngày tháng sai, sau đó giả vờ nhớ ra và sửa lại thông tin đúng.',
              culturalNote: 'Bài thi IELTS mô phỏng các cuộc đàm thoại đời thực nơi con người thường xuyên đính chính thông tin.'
            },
            {
              id: 'en-e13c-list2',
              type: 'fill_blank',
              prompt: 'Dự đoán dạng từ trước khi nghe: "The university library will be ______ for renovations throughout August."',
              options: ['closed', 'closing down', 'close', 'closure'],
              correctAnswer: 'closed',
              explanation: 'Cấu trúc bị động "will be + Past Participle (V3/ed)": "closed for renovations" (bị đóng cửa để cải tạo).'
            },
            {
              id: 'en-e13c-list3',
              type: 'quiz_choice',
              prompt: 'Trong bài nghe điền từ (Form completion), nếu đề bài quy định "NO MORE THAN TWO WORDS AND/OR A NUMBER", câu trả lời nào sau đây sẽ bị coi là sai phạm quy chế?',
              options: [
                'three expensive computers (3 từ)',
                'two computers (2 từ)',
                '15 computers (1 số và 1 từ)',
                'computers (1 từ)'
              ],
              correctAnswer: 'three expensive computers (3 từ)',
              explanation: '"three expensive computers" gồm 3 từ, vượt quá giới hạn "NO MORE THAN TWO WORDS" nên bị tính 0 điểm dù đúng nghĩa.'
            },
            {
              id: 'en-e-spk-list',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu nhận diện từ báo hiệu chuyển hướng (Signpost words) trong bài thi nghe:',
              targetText: 'Whenever a speaker utters actually, the preceding information is usually a distractor.',
              targetPhonetic: 'wenˈevər ə ˈspiːkər ˈʌtəz ˈæktʃuəli, ðə prɪˈsiːdɪŋ ˌɪnfəˈmeɪʃn ɪz ˈjuːʒʊəli ə dɪˈstræktə.',
              vietnameseMeaning: 'Bất cứ khi nào người nói thốt ra từ actually, thông tin phía trước thường là bẫy đánh lạc hướng.',
              audioText: 'Whenever a speaker utters actually, the preceding information is usually a distractor.',
              speakingHints: [
                'Từ chuyên môn "distractor": /dɪˈstræk.tər/ (yếu tố gây nhiễu)',
                'Động từ "utters": /ˈʌt.ərz/ (thốt ra, nói ra)',
                'Trọng âm từ "preceding": /prɪˈsiː.dɪŋ/'
              ]
            },
            {
              id: 'en-e-wrt-list',
              type: 'writing_drill',
              prompt: 'Viết câu lưu ý về việc kiểm tra quy tắc giới hạn từ trong bài nghe IELTS:',
              vietnameseMeaning: 'Tình huống: Bạn ghi chú lưu ý trước khi làm bài thi Listening. Hãy viết câu cảnh báo luôn kiểm tra giới hạn từ cẩn thận để tránh mất điểm đáng tiếc.',
              targetText: 'Always check the word limit instruction carefully to avoid losing unnecessary marks in listening.',
              acceptableAnswers: [
                'Always check the word limit instruction carefully to avoid losing unnecessary marks in listening.',
                'Always read the word count instructions carefully to avoid unnecessary mistakes.',
                'Make sure to check the word limit carefully to avoid losing marks.'
              ],
              requiredKeywords: ['check', 'limit', 'avoid'],
              minWords: 6,
              grammarFocus: 'Cấu trúc mệnh lệnh khuyên bảo: "Always [check / inspect] the word limit carefully to avoid [V-ing / losing marks]."',
              explanation: 'Lỗi vượt quá số từ (Over word limit) là nguyên nhân hàng đầu khiến thí sinh mất điểm oan uổng trong phần thi IELTS Listening.'
            }
          ]
        },
        {
          id: 'en-l14-toeic',
          track: 'academic',
          title: 'TOEIC Masterclass: Bẫy Ngữ Pháp Part 5 & Đọc Nhanh Đoạn Kép Part 7',
          description: 'Xử lý các bẫy liên từ/giới từ, câu giả định thức (Subjunctive) và kỹ thuật quét nhanh đối chiếu email - hóa đơn trong 45 giây.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e14-toeic1',
              type: 'flashcard',
              prompt: 'Cấu trúc giả định thức TOEIC thường gặp nhất',
              targetText: 'The CEO mandated that all regional directors attend the annual summit in person.',
              romanization: '/ðə ˌsiː.iːˈəʊ ˈmæn.deɪ.tɪd ðæt ɔːl ˈriː.dʒən.əl daɪˈrek.tərz əˈtend ðə ˈæn.ju.əl ˈsʌm.ɪt.../',
              vietnameseMeaning: 'Tổng Giám đốc đã ra chỉ thị bắt buộc rằng tất cả các giám đốc khu vực phải đích thân tham dự hội nghị thượng đỉnh thường niên.',
              audioText: 'The CEO mandated that all regional directors attend the annual summit in person.',
              explanation: 'Sau động từ mandate/demand/insist/require + that + S + V-bare: "attend" giữ nguyên thể không chia số nhiều hay quá khứ.',
              culturalNote: 'Đây là câu hỏi phân loại điểm 850 - 990 trong bài thi TOEIC Part 5.'
            },
            {
              id: 'en-e14-toeic2',
              type: 'fill_blank',
              prompt: 'Phân biệt giới từ chỉ sự nhượng bộ: "______ substantial budget cutbacks, the R&D division managed to deliver the prototype ahead of schedule."',
              options: ['Despite', 'Although', 'Even though', 'Because'],
              correctAnswer: 'Despite',
              explanation: '"Despite / In spite of + Noun phrase" (mặc dù có sự cắt giảm ngân sách đáng kể). "Although" phải đi kèm một mệnh đề đầy đủ (S + V).'
            },
            {
              id: 'en-e14-toeic3',
              type: 'quiz_choice',
              prompt: 'Cụm từ nào hay xuất hiện trong email thông báo nghỉ phép tự động của đối tác?',
              options: [
                'I am currently out of the office with limited access to email.',
                'Do not write to me anymore, I am sleeping.',
                'I quit this company forever.',
                'Email broken today.'
              ],
              correctAnswer: 'I am currently out of the office with limited access to email.',
              explanation: '"Out of office (OOO)" là thông điệp tự động tiêu chuẩn của tất cả các hệ thống email công sở toàn cầu.'
            },
            {
              id: 'en-e-spk-toeic',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu chứa cấu trúc giả định thức thương mại TOEIC:',
              targetText: 'The committee recommended that every manager submit their departmental budget by Friday.',
              targetPhonetic: 'ðə kəˈmɪti ˌrekəˈmendɪd ðæt ˈevri ˈmænɪdʒə səbˈmɪt ðeə ˌdiːpɑːtˈmentl ˈbʌdʒɪt baɪ ˈfraɪdeɪ.',
              vietnameseMeaning: 'Ủy ban khuyến nghị rằng mọi nhà quản lý phải nộp ngân sách phòng ban trước thứ Sáu.',
              audioText: 'The committee recommended that every manager submit their departmental budget by Friday.',
              speakingHints: [
                'Động từ sau giả định thức: "submit" giữ nguyên thể, không chia thêm "s"',
                'Trọng âm từ "committee": /kəˈmɪt.i/ (nhấn âm 2)',
                'Ngữ điệu trang trọng, dứt khoát'
              ]
            },
            {
              id: 'en-e-wrt-toeic',
              type: 'writing_drill',
              prompt: 'Viết câu thông báo thương mại sử dụng cấu trúc giả định thức (Subjunctive mood):',
              vietnameseMeaning: 'Tình huống: Bạn soạn thảo thông báo cho toàn công ty. Hãy viết câu quy định rằng ban giám đốc yêu cầu mọi nhân viên hoàn thành khóa đào tạo an ninh mạng trước hạn chót.',
              targetText: 'Management requested that all employees complete the security training before the deadline.',
              acceptableAnswers: [
                'Management requested that all employees complete the security training before the deadline.',
                'The director required that all staff complete the security training by Friday.',
                'Management mandated that each employee complete the training on time.'
              ],
              requiredKeywords: ['requested', 'complete', 'deadline'],
              minWords: 6,
              grammarFocus: 'Cấu trúc giả định thức: "Management requested that all employees complete [V-bare] the training before the deadline."',
              explanation: 'Động từ "complete" ở dạng nguyên thể không "s" là điểm ngữ pháp phân loại điểm cao nhất trong đề thi TOEIC.'
            }
          ]
        },
        {
          id: 'en-l15-c1-inversion',
          track: 'academic',
          title: 'C1/C2 Advanced Mastery: Cấu Trúc Đảo Ngữ & Collocations Học Thuật Đỉnh Cao',
          description: 'Sử dụng điêu luyện các cấu trúc Inversion (Under no circumstances, Seldom, Not only), câu chẻ Cleft sentence và sắc thái từ vựng tinh tế.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'en-e15-inv1',
              type: 'flashcard',
              prompt: 'Cấu trúc đảo ngữ phủ định nhấn mạnh tuyệt đối',
              targetText: 'Under no circumstances should confidential customer data be disclosed to unauthorized third parties.',
              romanization: '/ˈʌn.dər nəʊ ˈsɜː.kəm.stæn.sɪz ʃʊd ˌkɒn.fɪˈden.ʃəl ˈkʌs.tə.mər ˈdeɪ.tə biː dɪsˈkləʊzd.../',
              vietnameseMeaning: 'Trong bất kỳ hoàn cảnh nào, dữ liệu mật của khách hàng cũng tuyệt đối không được phép tiết lộ cho các bên thứ ba không có thẩm quyền.',
              audioText: 'Under no circumstances should confidential customer data be disclosed to unauthorized third parties.',
              explanation: 'Đảo ngữ: "Under no circumstances + Trợ động từ (should) + S + V". Dùng trong văn bản quy chuẩn pháp lý và an ninh bảo mật cao cấp.',
              culturalNote: 'Thể hiện năng lực ngôn ngữ mức độ C1 - C2 theo khung tham chiếu châu Âu CEFR.'
            },
            {
              id: 'en-e15-inv2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu chẻ (Cleft sentence) nhấn mạnh hành động: "Chính sự kiên trì bền bỉ đã đưa cô ấy đến thành công vang dội."',
              targetText: 'It was her sheer perseverance that propelled her to monumental success.',
              wordTokens: ['It was', 'her sheer', 'perseverance', 'that propelled her', 'to monumental', 'success.', 'luck', 'money'],
              explanation: '"It is/was [Yếu tố nhấn mạnh] that..." kết hợp với "sheer perseverance" (sự kiên trì thuần túy) và "propelled" (thúc đẩy mạnh mẽ).'
            },
            {
              id: 'en-e15-inv3',
              type: 'fill_blank',
              prompt: 'Đảo ngữ với trạng từ tần suất hiếm: "Rarely ______ such an overwhelming consensus among international economic experts."',
              options: ['have we witnessed', 'we have witnessed', 'we witnessed', 'we did witness'],
              correctAnswer: 'have we witnessed',
              explanation: 'Đứng đầu câu là "Rarely / Seldom / Scarcely" thì mệnh đề chính phải đảo trợ động từ lên trước chủ ngữ: "Rarely have we witnessed...".'
            },
            {
              id: 'en-e-spk-inv',
              type: 'speaking_drill',
              prompt: 'Luyện nói câu đảo ngữ phủ định nhấn mạnh C1/C2:',
              targetText: 'Under no circumstances should confidential credentials be shared with unauthorized parties.',
              targetPhonetic: 'ˈʌndə nəʊ ˈsɜːkəmstənsɪz ʃʊd ˌkɒnfɪˈdenʃl krəˈdenʃlz biː ʃeəd wɪð ʌnˈɔːθəraɪzd ˈpɑːtiz.',
              vietnameseMeaning: 'Trong bất kỳ hoàn cảnh nào, thông tin xác thực bảo mật cũng không được phép chia sẻ cho các bên không có thẩm quyền.',
              audioText: 'Under no circumstances should confidential credentials be shared with unauthorized parties.',
              speakingHints: [
                'Cụm đảo ngữ "Under no circumstances should...": phát âm liền mạch',
                'Từ "confidential": /ˌkɒn.fɪˈden.ʃəl/',
                'Từ "unauthorized": /ʌnˈɔː.θər.aɪzd/',
                'Ngữ điệu dứt khoát, mang tính mệnh lệnh pháp lý'
              ]
            },
            {
              id: 'en-e-wrt-inv',
              type: 'writing_drill',
              prompt: 'Viết câu tiếng Anh học thuật C1/C2 sử dụng cấu trúc đảo ngữ với "Not only" hoặc "Under no circumstances":',
              vietnameseMeaning: 'Tình huống: Bạn viết bài luận phản biện chính sách. Hãy viết câu đảo ngữ nhấn mạnh: Không những chính sách này giúp cắt giảm chi phí mà nó còn thúc đẩy đổi mới sáng tạo.',
              targetText: 'Not only does this strategic initiative reduce operating costs, but it also stimulates sustainable innovation.',
              acceptableAnswers: [
                'Not only does this strategic initiative reduce operating costs, but it also stimulates sustainable innovation.',
                'Not only does this policy reduce operating costs, but it also fosters long-term innovation.',
                'Not only does this solution reduce operational costs, but it also drives innovation.'
              ],
              requiredKeywords: ['Not only does', 'reduce', 'innovation'],
              minWords: 6,
              grammarFocus: 'Cấu trúc đảo ngữ C1/C2: "Not only + [does/did/can] + S + V, but it also + V..."',
              explanation: 'Cấu trúc đảo ngữ kết hợp cặp từ "stimulates sustainable innovation" là đỉnh cao của văn phong học thuật Cambridge Band 8.5 - 9.0.'
            }
          ]
        }
      ]
    }
  ],
  scenarios: [
    {
      id: 'en-interview',
      track: 'workplace',
      title: 'Phỏng vấn Tuyển dụng Giám đốc Sản phẩm Tập đoàn Công nghệ Đa quốc gia',
      context: 'Bạn đang tham gia vòng phỏng vấn chuyên sâu cuối cùng với Giám đốc Nhân sự Cấp cao khu vực Châu Á - Thái Bình Dương.',
      location: 'Trụ sở Marina Bay Financial Centre, Singapore / Trực tuyến',
      characterName: 'Sarah Jenkins',
      characterRole: 'VP of Global Talent Acquisition',
      characterAvatar: '💼',
      starterMessage: {
        text: 'Good morning! Thank you for joining us today. We are genuinely impressed by your portfolio and leadership background. To begin, could you walk me through a complex cross-functional challenge you solved and how you measured its success?',
        romanization: '/ɡʊd ˈmɔː.nɪŋ θæŋk juː fɔːr ˈdʒɔɪ.nɪŋ ʌs təˈdeɪ.../',
        vietnameseTranslation: 'Chào buổi sáng! Cảm ơn bạn đã tham gia cùng chúng tôi hôm nay. Chúng tôi thật sự rất ấn tượng với hồ sơ năng lực và lý lịch lãnh đạo của bạn. Để bắt đầu, bạn có thể chia sẻ về một bài toán phức tạp mang tính liên phòng ban mà bạn từng giải quyết và cách bạn đo lường thành công của nó không?'
      },
      objectives: [
        'Áp dụng công thức STAR (Tình huống - Nhiệm vụ - Hành động - Kết quả)',
        'Đưa ra các chỉ số định lượng cụ thể (ROI, thời gian tinh gọn, doanh thu tăng trưởng)',
        'Khẳng định kỹ năng điều phối nhân sự đa quốc gia và tinh thần đổi mới sáng tạo'
      ]
    },
    {
      id: 'en-negotiation',
      track: 'workplace',
      title: 'Đàm phán Hợp đồng Phân phối Độc quyền 50.000 Sản phẩm',
      context: 'Cuộc họp cấp cao với Giám đốc Thu mua của chuỗi bán lẻ hàng đầu Vương Quốc Anh tại London.',
      location: 'Phòng họp Canary Wharf, London',
      characterName: 'Arthur Pendelton',
      characterRole: 'Chief Procurement Officer',
      characterAvatar: '🤝',
      starterMessage: {
        text: 'Welcome to London. We have reviewed your initial proposal with great interest. However, your proposed unit price is approximately 8% above our current fiscal ceiling. What adjustments can we explore regarding volume commitments or deferred payment terms?',
        romanization: '/ˈwel.kəm tuː ˈlʌn.dən.../',
        vietnameseTranslation: 'Chào mừng bạn đến London. Chúng tôi đã xem xét đề xuất ban đầu với sự quan tâm lớn. Tuy nhiên, đơn giá đề xuất của bạn đang cao hơn khoảng 8% so với trần ngân sách tài khóa của chúng tôi. Chúng ta có thể xem xét những điều chỉnh nào về cam kết số lượng hoặc điều khoản thanh toán chậm?'
      },
      objectives: [
        'Bảo vệ biên lợi nhuận và giá trị cốt lõi vượt trội của sản phẩm',
        'Đưa ra phương án giảm giá theo nấc số lượng đặt hàng lớn (Tiered volume discount)',
        'Đề xuất phương thức thanh toán an toàn Thư tín dụng LC (Letter of Credit)'
      ]
    },
    {
      id: 'en-heathrow',
      track: 'daily',
      title: 'Xử lý Sự cố Chuyến bay Hoãn & Mất Hành lý tại Sân bay Heathrow',
      context: 'Bạn vừa đáp xuống sân bay London Heathrow nhưng phát hiện vali ký gửi không có trên băng chuyền và chuyến bay nối chuyến tiếp theo đã cất cánh do chuyến bay trước bị hoãn.',
      location: 'Quầy Hỗ trợ Khách hàng Nhà ga T2, Sân bay Heathrow London',
      characterName: 'David Vance',
      characterRole: 'Senior Passenger Service Supervisor',
      characterAvatar: '✈️',
      starterMessage: {
        text: 'Good afternoon. I understand you have arrived on flight BA 118 from Singapore. How may I assist you with your baggage and connecting itinerary today?',
        romanization: '/ɡʊd ˌɑːf.təˈnuːn aɪ ˌʌn.dəˈstænd juː hæv əˈraɪvd.../',
        vietnameseTranslation: 'Xin chào buổi chiều. Tôi được biết bạn vừa đến trên chuyến bay BA 118 từ Singapore. Tôi có thể hỗ trợ gì cho bạn về hành lý và hành trình nối chuyến hôm nay?'
      },
      objectives: [
        'Trình cuống vé hành lý và yêu cầu lập biên bản PIR (Property Irregularity Report)',
        'Yêu cầu hỗ trợ xếp chỗ trên chuyến bay kế tiếp và voucher khách sạn lưu trú',
        'Cung cấp địa chỉ khách sạn tại London để sân bay giao hành lý tận nơi'
      ]
    },
    {
      id: 'en-coffee',
      track: 'daily',
      title: 'Trò chuyện Bắt chuyện tại Quán Cà phê Specialty Sài Gòn',
      context: 'Bạn tình cờ ngồi cùng bàn với một chuyên gia công nghệ người Mỹ đang làm việc từ xa tại một quán cà phê rang xay đặc sản.',
      location: 'Specialty Coffee Roastery, Quận 1, TP. Hồ Chí Minh',
      characterName: 'Michael Chang',
      characterRole: 'Principal Software Architect & Digital Nomad',
      characterAvatar: '☕',
      starterMessage: {
        text: 'Hey there! Excuse me, do you happen to know if this outlet has fast charging? By the way, is that pour-over Dalat coffee you are having? The aroma is incredible.',
        romanization: '/heɪ ðeər ɪkˈskjuːz miː.../',
        vietnameseTranslation: 'Chào bạn! Xin lỗi, bạn có biết ổ điện này có sạc nhanh không? À nhân tiện, ly cà phê phin pha thủ công Đà Lạt bạn đang uống phải không? Mùi thơm tỏa ra tuyệt vời thật đấy.'
      },
      objectives: [
        'Đáp lại cởi mở và chia sẻ về các vùng trồng hạt cà phê Robusta & Arabica đặc sản Việt Nam',
        'Thảo luận về văn hóa làm việc từ xa và cuộc sống tại TP. Hồ Chí Minh',
        'Gợi ý những địa điểm trải nghiệm văn hóa địa phương đặc sắc'
      ]
    },
    {
      id: 'en-ielts-mock',
      track: 'academic',
      title: 'Thi Thử IELTS Speaking Trực Tiếp cùng Giám Khảo Bản Xứ',
      context: 'Mô phỏng chân thực phòng thi nói IELTS Speaking với giám khảo kỳ cựu của British Council, kiểm tra phản xạ Part 1 & Part 2.',
      location: 'Phòng Thi Độc Lập British Council / Trực tuyến',
      characterName: 'Robert Hughes',
      characterRole: 'Senior Cambridge & IELTS Speaking Examiner',
      characterAvatar: '🎓',
      starterMessage: {
        text: 'Good morning. My name is Robert Hughes, and I will be conducting your Speaking test today. Can you tell me your full name and what you do for work or study?',
        romanization: '/ɡʊd ˈmɔː.nɪŋ maɪ neɪm ɪz ˈrɒb.ət hjuːz.../',
        vietnameseTranslation: 'Chào buổi sáng. Tên tôi là Robert Hughes, và tôi sẽ là giám khảo chấm thi phần thi Nói của bạn hôm nay. Bạn có thể cho tôi biết họ tên đầy đủ và hiện tại bạn đang đi làm hay đi học không?'
      },
      objectives: [
        'Trả lời tự tin theo cấu trúc A.R.E.A mở rộng ý tưởng tự nhiên',
        'Sử dụng đa dạng các thì ngữ pháp và cụm liên từ nối (Cohesive devices)',
        'Giữ tốc độ nói lưu loát, phát âm chuẩn trọng âm từ và ngữ điệu tự nhiên'
      ]
    },
    {
      id: 'en-remote-standup',
      track: 'workplace',
      title: 'Họp Daily Scrum & Báo Cáo Sự Cố Hạ Tầng Kỹ Thuật (Agile Standup)',
      context: 'Cuộc họp nhanh 15 phút hàng ngày cùng đội ngũ kỹ thuật phân tán tại San Francisco, London và TP. Hồ Chí Minh.',
      location: 'Google Meet / San Francisco Engineering Hub',
      characterName: 'Alex Rivera',
      characterRole: 'Staff DevOps & Infrastructure Lead',
      characterAvatar: '💻',
      starterMessage: {
        text: 'Morning team! Let’s do a quick round of standup. Could you share what you shipped yesterday, what your main focus is today, and whether there are any blockers on the production deployment?',
        romanization: '/ˈmɔː.nɪŋ tiːm lets duː ə kwɪk raʊnd əv ˈstænd.ʌp.../',
        vietnameseTranslation: 'Chào buổi sáng cả nhóm! Chúng ta bắt đầu cuộc họp nhanh nhé. Bạn có thể chia sẻ hôm qua bạn đã release tính năng gì, mục tiêu trọng tâm hôm nay là gì, và có điểm nghẽn cản trở nào trên hệ thống triển khai production không?'
      },
      objectives: [
        'Báo cáo súc tích 3 ý: Yesterday - Today - Blockers trong vòng 60 giây',
        'Đề xuất phương án phối hợp kỹ thuật để xử lý điểm nghẽn (Resolve the bottleneck)',
        'Thống nhất hẹn đồng bộ riêng sau buổi họp (Sync offline) để không làm mất thời gian cả nhóm'
      ]
    },
    {
      id: 'en-landlord',
      track: 'daily',
      title: 'Thuê Căn Hộ Dài Hạn & Đàm Phán Tiền Cọc Tại London (Tenancy Agreement)',
      context: 'Bạn đang làm việc với quản lý công ty bất động sản uy tín tại London để ký hợp đồng thuê căn hộ 1 phòng ngủ tại Kensington.',
      location: 'Văn phòng Bất động sản Foxtons, High Street Kensington, London',
      characterName: 'Emma Watson-Clarke',
      characterRole: 'Senior Residential Lettings Director',
      characterAvatar: '🏠',
      starterMessage: {
        text: 'Good afternoon! It is a pleasure to meet you. I am glad you liked the flat on Kensington High Street. The landlord is prepared to offer a 12-month lease at £2,100 per month. Are you satisfied with the inventory condition and the tenancy deposit scheme terms?',
        romanization: '/ɡʊd ˌɑːf.təˈnuːn ɪt ɪz ə ˈpleʒ.ər tuː miːt juː.../',
        vietnameseTranslation: 'Xin chào buổi chiều! Rất vui được gặp bạn. Tôi rất mừng vì bạn thích căn hộ trên đường Kensington High Street. Chủ nhà sẵn sàng ký hợp đồng thuê 12 tháng với giá 2.100 bảng/tháng. Bạn có hài lòng với bảng kiểm kê tình trạng nội thất và các điều khoản bảo đảm tiền cọc không?'
      },
      objectives: [
        'Kiểm tra kỹ lưỡng bảng danh mục tài sản nội thất (Inventory check-in report)',
        'Xác nhận tiền đặt cọc được gửi vào Quỹ Bảo vệ Tiền cọc Quốc gia (TDS - Tenancy Deposit Scheme)',
        'Đàm phán điều khoản hủy hợp đồng trước hạn (Break clause sau 6 tháng) linh hoạt'
      ]
    },
    {
      id: 'en-pitch',
      track: 'workplace',
      title: 'Thuyết Trình Gọi Vốn Khởi Nghiệp Với Quỹ Đầu Tư Mạo Hiểm Thung Lũng Silicon',
      context: 'Bạn có 5 phút để trình bày Elevator Pitch cho dự án công nghệ AI của mình trước Đối tác Quản lý của Quỹ Đầu tư Mạo hiểm tại Thung lũng Silicon.',
      location: 'Sand Hill Road, Menlo Park, California',
      characterName: 'Jonathan Sterling',
      characterRole: 'Managing General Partner, Apex Ventures',
      characterAvatar: '🚀',
      starterMessage: {
        text: 'Welcome to Menlo Park. We see hundreds of AI pitches each month, so let’s cut straight to the chase. What unique moat does your technology possess, what is your current monthly recurring revenue (MRR), and why will you win against incumbent tech giants?',
        romanization: '/ˈwel.kəm tuː ˈmen.ləʊ pɑːk.../',
        vietnameseTranslation: 'Chào mừng bạn đến Menlo Park. Mỗi tháng chúng tôi xem xét hàng trăm dự án AI, vì vậy hãy đi thẳng vào trọng tâm nhé. Công nghệ của bạn sở hữu con hào kinh tế độc nhất nào, doanh thu định kỳ hàng tháng (MRR) hiện tại ra sao, và tại sao bạn sẽ đánh bại các gã khổng lồ công nghệ hiện hữu?'
      },
      objectives: [
        'Trình bày mạch lạc giá trị độc nhất (Unique Value Proposition & Competitive Moat)',
        'Chứng minh tốc độ tăng trưởng kinh doanh bằng các con số thực tế (MRR growth, CAC, LTV)',
        'Khẳng định tầm nhìn mở rộng quy mô toàn cầu và bản lĩnh của đội ngũ sáng lập'
      ]
    }
  ],
  vocabCards: [
    {
      id: 'en-v1',
      track: 'workplace',
      word: 'Initiative',
      romanization: '/ɪˈnɪʃ.ə.tɪv/',
      meaning: 'Sáng kiến, tinh thần chủ động tự giác trong công việc',
      partOfSpeech: 'noun',
      exampleSentence: 'She took the initiative to streamline the client onboarding pipeline.',
      exampleTranslation: 'Cô ấy đã chủ động đưa ra sáng kiến để tinh gọn quy trình hội nhập khách hàng mới.',
      category: 'Công việc & Phỏng vấn',
      easeFactor: 2.5,
      repetitions: 3,
      intervalDays: 6,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v2',
      track: 'workplace',
      word: 'Deliverable',
      romanization: '/dɪˈlɪv.ər.ə.bəl/',
      meaning: 'Hạng mục bàn giao, sản phẩm đầu ra chính thức của dự án',
      partOfSpeech: 'noun',
      exampleSentence: 'All project deliverables must be signed off by the steering committee before launch.',
      exampleTranslation: 'Tất cả các sản phẩm bàn giao của dự án phải được ủy ban chỉ đạo ký duyệt trước khi phát hành.',
      category: 'Quản lý Dự án',
      easeFactor: 2.4,
      repetitions: 2,
      intervalDays: 3,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'en-v3',
      track: 'daily',
      word: 'Spontaneous',
      romanization: '/spɒnˈteɪ.ni.əs/',
      meaning: 'Ngẫu hứng, tự nhiên thoải mái không cần chuẩn bị trước',
      partOfSpeech: 'adjective',
      exampleSentence: 'We took a spontaneous weekend road trip along the coastal highway.',
      exampleTranslation: 'Chúng tôi đã có một chuyến phượt ngẫu hứng cuối tuần dọc theo con đường cao tốc ven biển.',
      category: 'Đời sống & Du lịch',
      easeFactor: 2.6,
      repetitions: 4,
      intervalDays: 10,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    },
    {
      id: 'en-v4',
      track: 'academic',
      word: 'Discrepancy',
      romanization: '/dɪˈskrep.ən.si/',
      meaning: 'Sự sai lệch, bất nhất giữa các số liệu hoặc tài liệu đối chiếu',
      partOfSpeech: 'noun',
      exampleSentence: 'The independent audit revealed a noticeable discrepancy between physical inventory and accounting ledgers.',
      exampleTranslation: 'Cuộc kiểm toán độc lập đã phát hiện ra sự sai lệch đáng chú ý giữa hàng tồn kho thực tế và sổ sách kế toán.',
      category: 'Học thuật & IELTS',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 3,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'en-v5',
      track: 'workplace',
      word: 'Feasible',
      romanization: '/ˈfiː.zə.bəl/',
      meaning: 'Khả thi, có thể thực hiện được trong điều kiện thực tế',
      partOfSpeech: 'adjective',
      exampleSentence: 'After evaluating our budget constraints, the proposed cloud migration is completely feasible.',
      exampleTranslation: 'Sau khi đánh giá các giới hạn ngân sách, kế hoạch chuyển dịch lên đám mây được đề xuất là hoàn toàn khả thi.',
      category: 'Kinh doanh & Chiến lược',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 7,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v6',
      track: 'workplace',
      word: 'Synergize',
      romanization: '/ˈsɪn.ə.dʒaɪz/',
      meaning: 'Phối hợp cộng hưởng, gia tăng sức mạnh tổng hợp',
      partOfSpeech: 'verb',
      exampleSentence: 'By integrating our engineering and marketing teams, we can synergize our launch efforts.',
      exampleTranslation: 'Bằng cách kết nối đội ngũ kỹ thuật và tiếp thị, chúng ta có thể cộng hưởng các nỗ lực ra mắt sản phẩm.',
      category: 'Lãnh đạo & Đội ngũ',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'en-v7',
      track: 'academic',
      word: 'Mitigate',
      romanization: '/ˈmɪt.ɪ.ɡeɪt/',
      meaning: 'Làm dịu bớt, giảm nhẹ mức độ nghiêm trọng hay rủi ro',
      partOfSpeech: 'verb',
      exampleSentence: 'Rigorous automated testing helps mitigate the risk of critical software failures in production.',
      exampleTranslation: 'Kiểm thử tự động nghiêm ngặt giúp giảm thiểu tối đa rủi ro xảy ra lỗi phần mềm nghiêm trọng trên môi trường vận hành.',
      category: 'Học thuật & Công nghệ',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 14,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    },
    {
      id: 'en-v8',
      track: 'workplace',
      word: 'Resilient',
      romanization: '/rɪˈzɪl.jənt/',
      meaning: 'Kiên cường, có khả năng phục hồi nhanh chóng sau biến cố',
      partOfSpeech: 'adjective',
      exampleSentence: 'A resilient supply chain is vital to surviving macroeconomic disruptions.',
      exampleTranslation: 'Một chuỗi cung ứng kiên cường là yếu tố sống còn để vượt qua những xáo trộn kinh tế vĩ mô.',
      category: 'Kỹ năng & Phỏng vấn',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 8,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v9',
      track: 'academic',
      word: 'Nuance',
      romanization: '/ˈnjuː.ɑːns/',
      meaning: 'Sắc thái tinh tế, sự khác biệt nhỏ nhưng quan trọng',
      partOfSpeech: 'noun',
      exampleSentence: 'Understanding the cultural nuances of business communication prevents costly misunderstandings.',
      exampleTranslation: 'Hiểu được những sắc thái văn hóa tinh tế trong giao tiếp kinh doanh sẽ giúp ngăn ngừa những hiểu lầm đắt giá.',
      category: 'Học thuật & Ngôn ngữ',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'en-v10',
      track: 'workplace',
      word: 'Benchmark',
      romanization: '/ˈbentʃ.mɑːk/',
      meaning: 'Tiêu chuẩn đối sánh chuẩn mực để đo lường và đánh giá',
      partOfSpeech: 'noun / verb',
      exampleSentence: 'We benchmark our operational efficiency against the top performers in the sector.',
      exampleTranslation: 'Chúng tôi lấy hiệu quả vận hành của những đơn vị xuất sắc nhất ngành làm tiêu chuẩn đối sánh.',
      category: 'Quản trị Doanh nghiệp',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 14,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    },
    {
      id: 'en-v11',
      track: 'workplace',
      word: 'Bandwidth',
      romanization: '/ˈbænd.wɪtθ/',
      meaning: 'Quỹ thời gian / năng lực tâm trí để đảm nhận thêm công việc',
      partOfSpeech: 'noun (corporate jargon)',
      exampleSentence: 'I would love to help with the new audit, but I currently do not have the bandwidth this week.',
      exampleTranslation: 'Tôi rất muốn giúp bạn phần kiểm toán mới, nhưng tuần này tôi thực sự không còn quỹ thời gian/tâm trí trống.',
      category: 'Công việc & Giao tiếp',
      easeFactor: 2.5,
      repetitions: 3,
      intervalDays: 6,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v12',
      track: 'workplace',
      word: 'Bottleneck',
      romanization: '/ˈbɒt.əl.nek/',
      meaning: 'Nút thắt cổ chai, điểm nghẽn làm chậm toàn bộ quy trình',
      partOfSpeech: 'noun',
      exampleSentence: 'Manual code reviews became the primary bottleneck in our release cycle.',
      exampleTranslation: 'Khâu xét duyệt mã nguồn thủ công đã trở thành điểm nghẽn chính trong chu kỳ phát hành sản phẩm của chúng tôi.',
      category: 'Quản lý Dự án',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 7,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v13',
      track: 'workplace',
      word: 'Leverage',
      romanization: '/ˈlev.ər.ɪdʒ/',
      meaning: 'Tận dụng tối đa đòn bẩy, khai thác sức mạnh sẵn có',
      partOfSpeech: 'verb / noun',
      exampleSentence: 'We must leverage existing customer relationships to accelerate market expansion.',
      exampleTranslation: 'Chúng ta phải tận dụng tối đa mối quan hệ khách hàng hiện có để đẩy nhanh việc mở rộng thị trường.',
      category: 'Kinh doanh & Chiến lược',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 12,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    },
    {
      id: 'en-v14',
      track: 'workplace',
      word: 'Touch base',
      romanization: '/tʌtʃ beɪs/',
      meaning: 'Liên lạc ngắn gọn để cập nhật thông tin nhanh',
      partOfSpeech: 'idiom / phrasal verb',
      exampleSentence: 'Let’s touch base on Friday afternoon to see how the pilot launch went.',
      exampleTranslation: 'Hãy liên lạc nhanh với nhau vào chiều thứ Sáu để xem đợt chạy thử nghiệm diễn ra thế nào nhé.',
      category: 'Giao tiếp Công sở',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'en-v15',
      track: 'workplace',
      word: 'Hit the nail on the head',
      romanization: '/hɪt ðə neɪl ɒn ðə hed/',
      meaning: 'Nói trúng phóc trọng tâm, nhận định hoàn toàn chính xác',
      partOfSpeech: 'idiom',
      exampleSentence: 'Your analysis of the customer drop-off rate really hit the nail on the head.',
      exampleTranslation: 'Phân tích của bạn về tỷ lệ khách hàng rời bỏ dịch vụ thực sự đã đánh trúng phóc trọng tâm vấn đề.',
      category: 'Thành ngữ Thông dụng',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 8,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v16',
      track: 'academic',
      word: 'Ubiquitous',
      romanization: '/juːˈbɪk.wɪ.təs/',
      meaning: 'Phổ biến khắp nơi, có mặt ở mọi ngóc ngách xã hội',
      partOfSpeech: 'adjective',
      exampleSentence: 'Smartphones have become truly ubiquitous in both developed and emerging economies.',
      exampleTranslation: 'Điện thoại thông minh đã thực sự trở nên phổ biến ở khắp mọi nơi tại cả các nền kinh tế phát triển và mới nổi.',
      category: 'Học thuật & IELTS C1',
      easeFactor: 2.4,
      repetitions: 2,
      intervalDays: 3,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'en-v17',
      track: 'academic',
      word: 'Exacerbate',
      romanization: '/ɪɡˈzæs.ə.beɪt/',
      meaning: 'Làm trầm trọng thêm, khiến tình hình thêm tồi tệ',
      partOfSpeech: 'verb',
      exampleSentence: 'Prolonged droughts will exacerbate food scarcity in arid regions.',
      exampleTranslation: 'Hạn hán kéo dài sẽ làm trầm trọng thêm tình trạng khan hiếm lương thực tại các khu vực khô cằn.',
      category: 'Học thuật & IELTS C1',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'en-v18',
      track: 'academic',
      word: 'Pragmatic',
      romanization: '/præɡˈmæt.ɪk/',
      meaning: 'Thực tế, thực dụng dựa trên kết quả hành động thay vì lý thuyết',
      partOfSpeech: 'adjective',
      exampleSentence: 'Policymakers need to adopt a pragmatic approach to renewable energy transition.',
      exampleTranslation: 'Các nhà hoạch định chính sách cần áp dụng một cách tiếp cận thực tế đối với quá trình chuyển dịch năng lượng tái tạo.',
      category: 'Học thuật & Chính sách',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 14,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    },
    {
      id: 'en-v19',
      track: 'academic',
      word: 'Paradigm',
      romanization: '/ˈpær.ə.daɪm/',
      meaning: 'Mô hình mẫu mực, hệ hình tư duy chuẩn mực',
      partOfSpeech: 'noun',
      exampleSentence: 'The rise of remote work has created a paradigm shift in urban employment.',
      exampleTranslation: 'Sự trỗi dậy của xu hướng làm việc từ xa đã tạo ra một sự chuyển dịch hệ hình tư duy trong thị trường lao động đô thị.',
      category: 'Học thuật & Nghiên cứu',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 9,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v20',
      track: 'daily',
      word: 'Ballpark figure',
      romanization: '/ˈbɔːl.pɑːk ˈfɪɡ.ər/',
      meaning: 'Con số ước tính sơ bộ gần đúng',
      partOfSpeech: 'noun phrase / idiom',
      exampleSentence: 'Can you give me a ballpark figure of how much the apartment renovation will cost?',
      exampleTranslation: 'Bạn có thể cho tôi một con số ước tính sơ bộ xem việc sửa sang căn hộ sẽ tốn khoảng bao nhiêu không?',
      category: 'Đời sống & Chi phí',
      easeFactor: 2.5,
      repetitions: 3,
      intervalDays: 6,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v21',
      track: 'daily',
      word: 'Over the counter',
      romanization: '/ˌəʊ.və ðə ˈkaʊn.tər/',
      meaning: 'Thuốc không kê đơn (có thể mua trực tiếp ở hiệu thuốc mà không cần toa bác sĩ)',
      partOfSpeech: 'adjective / adverb phrase',
      exampleSentence: 'You do not need a doctor’s prescription; it is available over the counter.',
      exampleTranslation: 'Bạn không cần đơn thuốc của bác sĩ; thuốc này được bán tự do không cần toa ở quầy thuốc.',
      category: 'Y tế & Sức khỏe',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 12,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    },
    {
      id: 'en-v22',
      track: 'workplace',
      word: 'Pivotal',
      romanization: '/ˈpɪv.ə.təl/',
      meaning: 'Mang tính then chốt, xoay chuyển cục diện',
      partOfSpeech: 'adjective',
      exampleSentence: 'Securing the European distribution rights was a pivotal moment for our startup.',
      exampleTranslation: 'Giành được quyền phân phối tại châu Âu là một khoảnh khắc mang tính then chốt đối với công ty khởi nghiệp của chúng tôi.',
      category: 'Kinh doanh & Phát triển',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 8,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v23',
      track: 'academic',
      word: 'Corroborate',
      romanization: '/kəˈrɒb.ə.reɪt/',
      meaning: 'Chứng thực, củng cố thêm bằng chứng xác thực',
      partOfSpeech: 'verb',
      exampleSentence: 'Recent satellite imagery corroborates the ground reports of deforestation.',
      exampleTranslation: 'Hình ảnh vệ tinh gần đây đã chứng thực các báo cáo thực địa về tình trạng phá rừng.',
      category: 'Học thuật & Nghiên cứu',
      easeFactor: 2.4,
      repetitions: 2,
      intervalDays: 3,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'en-v24',
      track: 'daily',
      word: 'Bite the bullet',
      romanization: '/baɪt ðə ˈbʊl.ɪt/',
      meaning: 'Cắn răng chịu đựng để làm một việc khó khăn nhưng tất yếu',
      partOfSpeech: 'idiom',
      exampleSentence: 'I finally bit the bullet and hired a professional tax consultant.',
      exampleTranslation: 'Cuối cùng tôi đã quyết định cắn răng chi tiền thuê một chuyên gia tư vấn thuế chuyên nghiệp.',
      category: 'Thành ngữ Thông dụng',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 7,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'en-v25',
      track: 'workplace',
      word: 'Actionable',
      romanization: '/ˈæk.ʃən.ə.bəl/',
      meaning: 'Có tính ứng dụng hành động thực tế ngay được',
      partOfSpeech: 'adjective',
      exampleSentence: 'The consultant provided ten actionable insights rather than abstract theories.',
      exampleTranslation: 'Chuyên gia tư vấn đã cung cấp 10 giải pháp có thể hành động thực thi ngay được thay vì những lý thuyết trừu tượng.',
      category: 'Kỹ năng Quản lý',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 14,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    }
  ],
  culturalTips: [
    {
      id: 'ct-en-1',
      topic: 'Văn hóa Small Talk & Không gian Cá nhân (Personal Space)',
      rule: 'Người phương Tây rất coi trọng không gian cá nhân (khoảng cách 1 cánh tay khi đứng trò chuyện). Trong các cuộc trò chuyện xã giao, hãy chọn các chủ đề an toàn và tránh tuyệt đối hỏi về tuổi tác, tiền lương, tôn giáo và tình trạng hôn nhân trừ khi đối phương tự mở lời chia sẻ.',
      doText: 'Nói về thời tiết, thể thao, sở thích cá nhân, phim ảnh, âm nhạc và kế hoạch cuối tuần.',
      dontText: 'Đừng hỏi: "How old are you?" hay "How much do you earn?" ngay buổi đầu gặp gỡ.',
      essentialPhrase: 'What do you enjoy doing in your free time?',
      phraseTranslation: 'Bạn thường thích làm gì vào những lúc rảnh rỗi?'
    },
    {
      id: 'ct-en-2',
      topic: 'Văn hóa Email Công sở: Trực diện và Lịch sự (Direct yet Polite)',
      rule: 'Người Anh và Mỹ đánh giá cao việc đi thẳng vào trọng tâm công việc (get straight to the point) thay vì rào đón dài dòng, nhưng luôn kèm các từ ngữ biểu thị sự tôn trọng (Could you, Please, Would you mind, Much appreciated).',
      doText: 'Nêu rõ mục đích email và hành động mong đợi (Action items) ngay trong 2 câu đầu tiên.',
      dontText: 'Đừng viết một đoạn văn dài 10 dòng chỉ để chào hỏi xã giao trước khi vào việc chính.',
      essentialPhrase: 'I am writing to inquire about the timeline for the contract renewal.',
      phraseTranslation: 'Tôi viết thư này để xin hỏi thông tin về tiến độ gia hạn hợp đồng.'
    },
    {
      id: 'ct-en-3',
      topic: 'Nghệ thuật Góp ý Phản hồi "The Feedback Sandwich"',
      rule: 'Trong quản lý và làm việc nhóm tại các công ty Âu-Mỹ, khi cần phê bình hoặc góp ý cho đồng nghiệp, người ta luôn áp dụng kỹ thuật "Bánh mì kẹp": Khen ngợi điểm tốt trước -> Đưa ra góp ý chỉnh sửa cụ thể -> Kết thúc bằng sự động viên, khích lệ và niềm tin tưởng.',
      doText: 'Bắt đầu bằng sự ghi nhận nỗ lực tích cực trước khi chỉ ra điểm cần cải thiện.',
      dontText: 'Đừng chỉ trích gay gắt gay gắt trước mặt toàn thể đồng nghiệp trong phòng họp.',
      essentialPhrase: 'You did a fantastic job on the deck, and with some minor tweaks to the data section, it will be flawless.',
      phraseTranslation: 'Bạn đã làm bài thuyết trình rất tuyệt vời, và chỉ cần vài chỉnh sửa nhỏ ở phần số liệu nữa là sẽ hoàn hảo.'
    },
    {
      id: 'ct-en-4',
      topic: 'Ngôn ngữ Cơ thể & Văn hóa Giao lưu Xã giao (Networking & Body Language)',
      rule: 'Trong phỏng vấn xin việc và giao lưu đối tác phương Tây, giao tiếp bằng mắt (Eye contact) thể hiện sự trung thực và tự tin. Cái bắt tay (Handshake) cần dứt khoát, chắc chắn nhưng vừa phải (firm handshake), không quá yếu ớt (dead fish) cũng không bóp quá chặt.',
      doText: 'Duy trì ánh mắt tự nhiên khoảng 60-70% thời gian trò chuyện và mỉm cười tự tin.',
      dontText: 'Đừng nhìn lơ đễnh xuống sàn nhà hoặc đảo mắt liên tục khi đang trả lời phỏng vấn.',
      essentialPhrase: 'It was a real pleasure speaking with you today. Let’s stay in touch on LinkedIn.',
      phraseTranslation: 'Thật sự rất vinh hạnh được trò chuyện cùng bạn hôm nay. Chúng ta hãy giữ liên lạc qua LinkedIn nhé.'
    },
    {
      id: 'ct-en-5',
      topic: 'Văn hóa Tiền Tip tại Bắc Mỹ vs Anh Quốc (Tipping Etiquette)',
      rule: 'Tại Mỹ và Canada, tiền tip cho nhân viên phục vụ bàn là một phần thu nhập sinh kế chính của họ do mức lương tối thiểu trong ngành dịch vụ rất thấp. Mức tip chuẩn khi ăn tại chỗ là 18% - 20% (dịch vụ tốt) hoặc 22%+ (dịch vụ xuất sắc). Tại Anh, phí dịch vụ (Service Charge 12.5%) thường đã được cộng sẵn vào hóa đơn.',
      doText: 'Kiểm tra kỹ hóa đơn xem đã có "Gratuity included" hay chưa trước khi tính tiền tip bổ sung.',
      dontText: 'Không bao giờ rời bàn ăn tại nhà hàng Mỹ mà không để lại tiền tip trừ khi phục vụ có hành vi quá tệ.',
      essentialPhrase: 'Could we get the bill, please? We would like to add a 20% gratuity.',
      phraseTranslation: 'Cho chúng tôi xin hóa đơn nhé, chúng tôi muốn để lại 20% tiền tip cho phục vụ.'
    },
    {
      id: 'ct-en-6',
      topic: 'Văn hóa Nói Giảm Nói Tránh Của Người Anh (British Understatement)',
      rule: 'Người Anh nổi tiếng thế giới về nghệ thuật "Understatement" (nói giảm nói tránh). Khi một người Anh nói "Not bad at all", họ thực sự có ý khen ngợi "Rất xuất sắc". Ngược lại, khi họ nói "With all due respect..." hoặc "That is quite an interesting idea", điều đó thường có nghĩa là "Tôi hoàn toàn không đồng tình với bạn".',
      doText: 'Lắng nghe ngữ điệu và bối cảnh thay vì chỉ hiểu nghĩa đen từng từ của đối tác người Anh.',
      dontText: 'Đừng nhầm tưởng "Quite good" có nghĩa là tuyệt đối hoàn hảo.',
      essentialPhrase: 'I hear what you are saying, but perhaps we could also examine an alternative approach.',
      phraseTranslation: 'Tôi hiểu ý bạn, nhưng có lẽ chúng ta cũng nên xem xét thêm một cách tiếp cận khác.'
    },
    {
      id: 'ct-en-7',
      topic: 'Văn hóa Xưng Hô Tên Riêng & Bình Đẳng Công Sở (First-name Culture)',
      rule: 'Tại các tập đoàn công nghệ và công ty hiện đại của Mỹ và Anh, văn hóa tổ chức rất phẳng (flat hierarchy). Hầu như tất cả mọi người, từ thực tập sinh đến Giám đốc Điều hành (CEO), đều xưng hô với nhau bằng Tên Riêng (First Name), ví dụ "Hi Mark", "Thanks Tim", thay vì dùng kính cẩn "Mr. Mark" hay "Boss".',
      doText: 'Gọi đồng nghiệp và cấp trên bằng tên riêng một cách lịch thiệp và tự nhiên.',
      dontText: 'Tránh gọi sếp người nước ngoài là "Boss", "Sir" hay "Mr. [Tên]" trong môi trường công nghệ.',
      essentialPhrase: 'Hi David, great to meet you! Please feel free to call me Linh.',
      phraseTranslation: 'Chào David, rất vui được gặp anh! Cứ gọi tôi là Linh nhé.'
    },
    {
      id: 'ct-en-8',
      topic: 'Văn hóa Đúng Giờ & Quy Tắc 5 Phút (Punctuality & The 5-Minute Rule)',
      rule: 'Trong văn hóa kinh doanh phương Tây, đúng giờ là biểu hiện tối cao của sự tôn trọng thời gian và tính chuyên nghiệp. "To be on time is to be late; to be early is to be on time." Tham gia cuộc họp trước 3-5 phút là chuẩn mực vàng. Nếu bạn nhận thấy mình sẽ trễ dù chỉ 5 phút, hãy nhắn tin báo trước ngay lập tức.',
      doText: 'Vào phòng họp Zoom hoặc có mặt trước 3-5 phút để kiểm tra micro và đường truyền.',
      dontText: 'Đừng xuất hiện muộn 10 phút mà không có lời giải thích hoặc thông báo trước cho đối tác.',
      essentialPhrase: 'Apologies for the slight delay; traffic was unexpectedly congested. Thank you for your patience.',
      phraseTranslation: 'Xin thứ lỗi vì sự chậm trễ nhỏ này, đường sá bất ngờ kẹt xe. Cảm ơn sự kiên nhẫn của quý vị.'
    }
  ]
};
