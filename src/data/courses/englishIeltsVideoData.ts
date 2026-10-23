import { IeltsVideoLesson } from '../curriculum';

export const ieltsVideoLessons: IeltsVideoLesson[] = [
  {
    id: 'vid-ielts-reading-tfn',
    title: 'Giải Mã Skim & Scan: Đột Phá Bẫy True / False / Not Given & Matching Headings',
    skill: 'reading',
    durationMinutes: 18,
    durationLabel: '18:24',
    instructorName: 'Dr. Sarah Jenkins',
    instructorTitle: 'Cựu giám khảo chấm thi Cambridge Assessment, 14 năm đào tạo IELTS Masterclass',
    badge: 'Chuyên đề Reading Band 8.5+',
    summary: 'Làm chủ quy trình đọc lướt nắm mạch ý (Skimming) trong 3 phút, quét từ khóa song song (Parallel Keywords) và phân biệt ranh giới mong manh giữa False (mâu thuẫn thông tin) và Not Given (suy đoán chủ quan không có căn cứ).',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Tổng quan cấu trúc bài thi Reading học thuật', content: 'Cấu trúc 3 passage 40 câu hỏi, phân bổ thời gian vàng 17 - 20 - 23 phút.' },
      { time: '03:20', seconds: 200, title: 'Kỹ thuật Skimming 3 câu vàng', content: 'Đọc câu mở đoạn, câu chốt đoạn và câu chuyển ý để vẽ bản đồ ý tưởng bài đọc.' },
      { time: '07:15', seconds: 435, title: 'Kỹ thuật Scanning theo từ khóa không đổi & biến đổi', content: 'Nhận diện tên riêng, con số, thuật ngữ chuyên ngành và từ khóa bị Paraphrase.' },
      { time: '11:30', seconds: 690, title: 'Giải mã bản chất FALSE vs NOT GIVEN', content: 'Quy tắc 100% mâu thuẫn (Direct Contradiction) và bẫy suy luận vượt khỏi giới hạn văn bản.' },
      { time: '15:45', seconds: 945, title: 'Thực hành giải đề Cambridge 19 thực tế', content: 'Phân tích trực tiếp đoạn văn lịch sử công nghệ thủy tinh và phương pháp loại trừ.' }
    ],
    keyTakeaways: [
      'Không bao giờ dịch từng từ một trong bài đọc Reading; chỉ tập trung vào cấu trúc ngữ pháp và mối liên hệ ý nghĩa.',
      'TRUE: Thông tin bài đọc khẳng định chính xác ý câu hỏi (đã qua Paraphrase học thuật).',
      'FALSE: Thông tin bài đọc trực tiếp mâu thuẫn, phủ định hoặc loại trừ thông tin trong câu hỏi.',
      'NOT GIVEN: Thông tin có vẻ hợp lý với thực tế bên ngoài nhưng KHÔNG CÓ BẰNG CHỨNG trong bài để chứng minh đúng hay sai.',
      'Với dạng Matching Headings, luôn đọc đoạn văn trước để rút ra chủ đề cốt lõi, KHÔNG đọc danh sách headings trước để tránh bị nhiễu.'
    ],
    subtitles: [
      { timeSec: 0, en: "Welcome to this IELTS Reading Masterclass. Today, we're dissecting the True/False/Not Given dilemma.", vi: "Chào mừng các bạn đến với Masterclass IELTS Reading. Hôm nay, chúng ta sẽ mổ xẻ dạng bài True/False/Not Given." },
      { timeSec: 5, en: "Candidates frequently lose marks not due to lack of vocabulary, but due to subjective assumptions.", vi: "Thí sinh thường mất điểm không phải vì thiếu từ vựng, mà do tự ý suy đoán chủ quan." },
      { timeSec: 12, en: "Remember the core rule: if the passage does not explicitly confirm or refute it, it is Not Given.", vi: "Hãy nhớ quy tắc cốt lõi: nếu đoạn văn không trực tiếp xác nhận hay bác bỏ, câu đó luôn là Not Given." },
      { timeSec: 20, en: "Let's examine how Cambridge examiners design these traps using subtle qualifying adverbs.", vi: "Bây giờ hãy cùng phân tích cách giám khảo Cambridge cài bẫy qua các phó từ chỉ mức độ tinh tế." }
    ],
    slides: [
      {
        title: 'Quy Tắc Vàng: Skim & Scan Trong Bài Thi IELTS Reading',
        subtitle: 'Phương pháp định vị thông tin không cần hiểu 100% từ mới',
        bulletPoints: [
          'Skimming (30 - 45s mỗi đoạn): Đọc tiêu đề, câu đầu (Topic Sentence) và câu kết để nắm bức tranh tổng thể.',
          'Scanning (10 - 15s mỗi câu hỏi): Rà soát các mốc tọa độ cố định: Con số, năm, tên riêng viết hoa, từ khoa học.',
          'Parallel Keywords Tracking: Dự đoán trước các từ đồng nghĩa (e.g. increase -> surge, accelerate, escalate).'
        ],
        formula: 'IELTS Reading Rule: Speed = (Paragraph Structure Map) × (Parallel Synonyms Detection)',
        highlightTip: '⚠️ Đừng dừng lại quá 90 giây cho một câu hỏi. Đánh dấu và quay lại sau khi đã gom hết các điểm dễ!'
      },
      {
        title: 'Mô Hình Phân Định Ranh Giới: TRUE vs FALSE vs NOT GIVEN',
        subtitle: 'Tiêu chuẩn chấm thi chính thức từ Hội đồng khảo thí Cambridge',
        bulletPoints: [
          'TRUE: Thông tin trong đề bài trùng khớp hoàn toàn về ngữ nghĩa với bài đọc (dù từ ngữ đã thay đổi).',
          'FALSE: Bài đọc có thông tin ĐỐI LẬP trực tiếp hoặc LOẠI TRỪ câu hỏi (Ví dụ: đề nói "tất cả", bài nói "chỉ một số").',
          'NOT GIVEN: Bài đọc không nhắc đến hoặc không đủ cơ sở để kết luận dù câu hỏi nghe có vẻ rất logic ngoài đời.'
        ],
        formula: 'FALSE = Trái ngược 180° | NOT GIVEN = Không đủ bằng chứng để xác minh',
        highlightTip: '💡 Bẫy kinh điển: Nếu câu hỏi dùng các từ tuyệt đối như "always, only, impossible" mà bài đọc dùng "often, occasionally" -> FALSE!'
      },
      {
        title: 'Chiến Lược Hạ Gục Matching Headings (Nối Tiêu Đề)',
        subtitle: 'Cách chọn tiêu đề bao quát thay vì bị lừa bởi từ khóa phụ',
        bulletPoints: [
          'Luôn làm dạng bài Matching Headings ĐẦU TIÊN của mỗi Passage khi trí nhớ về mạch bài còn mới.',
          'Gạch chân từ khóa trung tâm trong từng heading trước khi đọc.',
          'Cẩn thận bẫy "Distractor Heading": Tiêu đề chỉ nhắc tới một ví dụ nhỏ (Detail) trong đoạn chứ không phải đại ý (Main Idea).'
        ],
        highlightTip: '🎯 Bí quyết: Tiêu đề đúng luôn trả lời được câu hỏi "Mục đích tác giả viết cả đoạn này để làm gì?"'
      }
    ],
    miniQuiz: [
      {
        question: 'Khi nào một nhận định trong câu hỏi được kết luận là NOT GIVEN?',
        options: [
          'Khi bài đọc hoàn toàn không có thông tin xác nhận hoặc bác bỏ, dù câu hỏi nghe có vẻ hợp lý ngoài đời.',
          'Khi thông tin trong bài đọc đối lập 180 độ với câu hỏi.',
          'Khi trong câu hỏi có chứa từ "always" hoặc "never".',
          'Khi bài đọc có từ vựng đồng nghĩa với câu hỏi.'
        ],
        correctAnswer: 'Khi bài đọc hoàn toàn không có thông tin xác nhận hoặc bác bỏ, dù câu hỏi nghe có vẻ hợp lý ngoài đời.',
        explanation: 'NOT GIVEN có nghĩa là không có căn cứ trong bài để chứng minh câu đó đúng hay sai, không được tự suy diễn kiến thức ngoài.'
      },
      {
        question: 'Thời gian lý tưởng để đọc lướt (Skimming) toàn bộ một đoạn văn dài 150 từ là bao lâu?',
        options: ['30 - 45 giây', '3 - 4 phút', '10 - 15 giây', '5 phút'],
        correctAnswer: '30 - 45 giây',
        explanation: 'Skimming chỉ đọc câu chủ đề, câu kết và từ nối để nắm ý chính, không dịch chi tiết.'
      }
    ]
  },
  {
    id: 'vid-ielts-listening-traps',
    title: 'Listening 8.5+: Bắt Trọn Từ Báo Hiệu (Signpost Words) & 40/40 Form Completion',
    skill: 'listening',
    durationMinutes: 15,
    durationLabel: '15:40',
    instructorName: 'Michael Vance',
    instructorTitle: 'Chuyên gia ngữ âm học & Giảng viên huấn luyện IELTS Listening chuẩn British Council',
    badge: 'Chuyên đề Listening Tuyệt Đối',
    summary: 'Nhận diện ngay lập tức các từ báo hiệu chuyển hướng tư duy (In fact, Actually, However), kỹ thuật đoán loại từ (Word Form Prediction) trước khi băng chạy, và phương pháp tránh bẫy phát âm số/chữ cái đảo ngược trong Section 1 & 2.',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Tận dụng 30 giây vàng trước mỗi Section', content: 'Quy trình đọc lướt câu hỏi và gạch chân giới hạn từ (Word Limit: NO MORE THAN TWO WORDS).' },
      { time: '02:45', seconds: 165, title: 'Kỹ thuật dự đoán dạng từ (Grammar Prediction)', content: 'Xác định ô trống cần điền danh từ số ít/nhiều, tính từ hay động từ dạng V-ing/V3.' },
      { time: '06:10', seconds: 370, title: 'Bẫy đính chính (Self-Correction Markers)', content: 'Phân tích các từ bẫy kinh điển: "Oh wait", "I meant", "On second thoughts", "Actually".' },
      { time: '09:50', seconds: 590, title: 'Bẫy số điện thoại, mã bưu chính & tên riêng', content: 'Phân biệt phát âm /ei/ (A) vs /i:/ (E), 15 (fifteen) vs 50 (fifty), số 0 (oh vs zero).' },
      { time: '13:10', seconds: 790, title: 'Chiến thuật Section 4: Nghe bài giảng học thuật liên tục', content: 'Duy trì sự tập trung cao độ khi người nói không ngừng nghỉ suốt 10 câu liên tiếp.' }
    ],
    keyTakeaways: [
      'Quy tắc vàng 30 giây: Luôn đọc trước đề bài và dự đoán loại từ cần điền (danh từ, số, ngày tháng, tính từ).',
      'Đặc biệt lưu ý quy định số từ: "NO MORE THAN ONE WORD AND/OR A NUMBER" – nếu viết 2 từ là mất điểm hoàn toàn.',
      'Khi nghe số và tên: Cảnh giác cao độ với các cặp số dễ nhầm lẫn như 13-30, 14-40, 15-50 (chú ý trọng âm: đuôi -teen nhấn âm 2, đuôi -ty nhấn âm 1).',
      'Từ chuyển hướng (Signposts): Khi nghe "However", "Although", "In fact", người nói chuẩn bị đưa ra đáp án thật để bác bỏ thông tin vừa nói.'
    ],
    subtitles: [
      { timeSec: 0, en: "In IELTS Listening, the recording plays only once. There are no second chances.", vi: "Trong bài thi IELTS Listening, băng chỉ phát một lần duy nhất. Không có cơ hội nghe lại." },
      { timeSec: 5, en: "The secret to 40 out of 40 lies in what you do BEFORE the audio starts playing.", vi: "Bí mật đạt 40/40 nằm ở những gì bạn làm TRƯỚC KHI băng bắt đầu chạy." },
      { timeSec: 11, en: "Always underline key anchors and predict the grammatical part of speech for every single blank.", vi: "Hãy luôn gạch chân từ neo và dự đoán từ loại ngữ pháp cho từng chỗ trống." },
      { timeSec: 18, en: "Watch out for self-correction: native speakers love introducing a false answer before clarifying.", vi: "Hãy cẩn trọng với bẫy đính chính: người bản xứ rất thích nêu đáp án sai trước khi sửa lại." }
    ],
    slides: [
      {
        title: 'Ma Trận Từ Báo Hiệu Đổi Hướng (Signpost Traps)',
        subtitle: 'Cách phát hiện người nói đang chuẩn bị lật ngược đáp án',
        bulletPoints: [
          'Bẫy sửa sai (Correction): "I thought it was 2:30, but actually the flight was rescheduled to 3:45." -> Đáp án: 3:45.',
          'Bẫy nhượng bộ (Concession): "Although the deluxe suite has sea views, we decided on the garden villa because of the budget." -> Đáp án: garden villa.',
          'Bẫy phủ định ngầm (Subtle Negation): "Hardly anyone turned up" = Gần như không có ai đến.'
        ],
        formula: 'Đáp Án Thật = Thông Tin Xuất Hiện SAU Cụm Đính Chính (Actually / However / In fact)',
        highlightTip: '🎧 Đừng vội viết ngay khi nghe thấy con số đầu tiên. Đợi người nói dứt câu để xác nhận không có đính chính!'
      },
      {
        title: 'Kỹ Thuật Đọc Đề & Dự Đoán Trong 30 Giây',
        subtitle: 'Quy trình chuẩn hóa phản xạ trước mỗi Section',
        bulletPoints: [
          'Bước 1: Quét nhanh giới hạn từ (Word Count Limit).',
          'Bước 2: Gạch chân từ khóa xung quanh chỗ trống để xác định ngữ cảnh.',
          'Bước 3: Dự đoán loại từ (Noun, Verb, Adjective, Number) và trường ngữ nghĩa (tên người, địa điểm, chi phí).'
        ],
        highlightTip: '⚠️ Danh từ số ít / số nhiều: Nếu bài đọc yêu cầu điền danh từ, hãy lắng nghe thật kỹ âm đuôi /s/ hoặc /z/. Sai số nhiều là mất điểm!'
      }
    ]
  },
  {
    id: 'vid-ielts-writing-peel',
    title: 'Writing Task 2: Cấu Trúc Đoạn Văn PEEL & Tư Duy Nâng Cấp Lexical Resource C1/C2',
    skill: 'writing',
    durationMinutes: 22,
    durationLabel: '22:15',
    instructorName: 'Dr. Edward Sterling',
    instructorTitle: 'Giám đốc chương trình Học thuật Anh ngữ, Thạc sĩ Ngôn ngữ Đại học Cambridge',
    badge: 'Chuyên đề Writing Band 8.5+',
    summary: 'Quy tắc vàng xây dựng thân bài lập luận chặt chẽ không thể phản bác với mô hình PEEL (Point - Explain - Evidence - Link), phương pháp loại bỏ tư duy dịch từng từ (Vietlish) và chuyển đổi ngôn ngữ bình dân sang cấu trúc học thuật đỉnh cao.',
    chapters: [
      { time: '00:00', seconds: 0, title: '4 tiêu chí chấm điểm IELTS Writing chính thức', content: 'Task Achievement (25%), Coherence & Cohesion (25%), Lexical Resource (25%), Grammatical Range (25%).' },
      { time: '04:10', seconds: 250, title: 'Lập dàn ý 5 phút: Chống cạn kiệt ý tưởng', content: 'Kỹ thuật Brainstorming theo 4 góc nhìn: Kinh tế, Xã hội, Giáo dục, Môi trường.' },
      { time: '08:30', seconds: 510, title: 'Mổ xẻ công thức PEEL từng câu một', content: 'Phân tích cách viết từng câu Point, Explain, Evidence và Link trong thân bài Band 9.0.' },
      { time: '14:20', seconds: 860, title: 'Nâng cấp từ vựng Band 6.0 lên Band 8.5', content: 'Thay thế từ ngữ sáo rỗng bằng Collocations học thuật sắc sảo và chính xác.' },
      { time: '18:50', seconds: 1130, title: 'Viết Mở bài Paraphrase & Kết luận tổng hòa', content: 'Viết mở bài 2 câu nhanh gọn trong 3 phút và câu kết đanh thép.' }
    ],
    keyTakeaways: [
      'Luôn dành 5 phút đầu tiên để lập dàn bài; không bao giờ bắt tay vào viết ngay khi chưa có luận điểm rõ ràng.',
      'Cấu trúc PEEL: Point (Luận điểm rõ ràng) -> Explain (Lý giải tại sao và tác động như thế nào) -> Evidence (Dẫn chứng thực tiễn/nghiên cứu) -> Link (Chốt lại mối liên hệ với đề bài).',
      'Đạt Band 8.0+ Lexical Resource: Sử dụng các cụm danh từ hóa (Nominalization) và Collocations học thuật tự nhiên.',
      'Tránh các lỗi Cohesion cơ bản như lạm dụng liên từ ở đầu mỗi câu (Moreover, Furthermore, In addition); hãy dùng mệnh đề quan hệ và từ thay thế để liên kết ý tự nhiên.'
    ],
    subtitles: [
      { timeSec: 0, en: "Many students believe that scoring high in IELTS Writing requires obscure, archaic words.", vi: "Nhiều bạn nghĩ rằng để đạt điểm cao Writing cần dùng những từ cổ, hiếm gặp." },
      { timeSec: 6, en: "In reality, Cambridge examiners look for precision, natural collocations, and watertight logic.", vi: "Thực tế, giám khảo Cambridge tìm kiếm sự chính xác, cách kết hợp từ tự nhiên và logic đanh thép." },
      { timeSec: 13, en: "The PEEL framework guarantees that every paragraph functions as an unassailable argument.", vi: "Khung sườn PEEL đảm bảo mỗi đoạn văn của bạn là một lập luận không thể đánh bại." },
      { timeSec: 21, en: "Let's take a look at how to transform a vague Band 6 sentence into a C2 Academic masterpiece.", vi: "Hãy cùng xem cách nâng cấp một câu Band 6 mơ hồ thành một câu chuẩn học thuật C2." }
    ],
    slides: [
      {
        title: 'Mô Hình PEEL: Cốt Lõi Đoạn Văn Thân Bài Band 8.5+',
        subtitle: '4 câu hoàn hảo để tạo nên một đoạn lập luận thuyết phục tuyệt đối',
        bulletPoints: [
          'P - Point (Luận điểm chính): Nêu rõ luận điểm trọng tâm của đoạn bằng câu chủ đề ngắn gọn.',
          'E - Explain (Giải thích cơ chế): Làm rõ tại sao điều đó xảy ra và tác động lâu dài của nó đến xã hội/cá nhân.',
          'E - Evidence (Dẫn chứng cụ thể): Trích dẫn hiện tượng, xu thế công nghệ hoặc nghiên cứu xã hội thực tiễn.',
          'L - Link (Khẳng định lại): Liên kết luận cứ trở lại câu hỏi đề bài và chuyển tiếp sang luận điểm sau.'
        ],
        formula: 'Paragraph = Topic Claim (P) + Causal Analysis (E) + Concrete Manifestation (E) + Thesis Anchorage (L)',
        highlightTip: '💎 Mẹo nâng Band: Không dùng ví dụ mang tính cá nhân vụn vặt ("Like my friend Nam"). Hãy khái quát hóa: "For instance, empirical studies in developing nations demonstrate that..."'
      },
      {
        title: 'Từ Vựng Band 6.0 vs Cấu Trúc Nâng Cấp C1/C2',
        subtitle: 'Bảng đối chiếu cụm từ học thuật giúp tăng ngay 1.0 Band Lexical',
        bulletPoints: [
          'Band 6.0: "A lot of people think that money is important for happiness."',
          'Band 8.5+: "It is widely contended that financial prosperity constitutes an indispensable prerequisite for subjective well-being."',
          'Band 6.0: "Pollution will get worse if governments do not do something."',
          'Band 8.5+: "Environmental degradation is poised to intensify exponentially in the absence of robust governmental regulatory frameworks."'
        ],
        highlightTip: '🚀 Kỹ thuật Danh từ hóa (Nominalization): Thay vì viết "People consume more energy, which harms the climate", hãy viết "Surging energy consumption exerts severe pressure on global climate systems."'
      }
    ]
  },
  {
    id: 'vid-ielts-speaking-area',
    title: 'Speaking Part 2 & 3: Độc Thoại 2 Phút Không Vấp Với A.R.E.A & Thành Ngữ Band 9.0',
    skill: 'speaking',
    durationMinutes: 16,
    durationLabel: '16:50',
    instructorName: 'Elena Rostova',
    instructorTitle: 'Giám khảo khảo thí quốc tế, Cố vấn cao cấp về phản xạ phát âm và ngữ điệu tự nhiên',
    badge: 'Chuyên đề Speaking Đỉnh Cao',
    summary: 'Chiến thuật tận dụng tối đa 60 giây chuẩn bị Cue Card bằng ma trận ghi chú từ khóa, kỹ năng mở rộng câu trả lời trừu tượng theo mô hình A.R.E.A và kho thành ngữ Idiomatic Expressions tự nhiên giúp duy trì độ trôi chảy tuyệt đối.',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Tâm lý phòng thi và tiêu chí Fluency & Coherence', content: 'Làm thế nào để duy trì sự tự tin, ánh mắt và nhịp nói tự nhiên trước giám khảo bản xứ.' },
      { time: '03:15', seconds: 195, title: '60 giây chuẩn bị Cue Card: Đừng viết thành câu', content: 'Phương pháp ghi chú hình cây (Branching Notes): 4 từ khóa định vị + 2 cụm collocations đắt giá.' },
      { time: '06:40', seconds: 400, title: 'Cấu trúc bài nói 2 phút mượt mà theo mạch thời gian', content: 'Kỹ thuật phân chia 120 giây: 30s Mở đầu & bối cảnh, 45s Diễn biến thách thức, 45s Cảm xúc & bài học.' },
      { time: '10:30', seconds: 630, title: 'Công thức A.R.E.A cho Part 3 học thuật', content: 'Answer trực diện -> Reason phân tích nguyên nhân -> Example dẫn chứng xã hội -> Alternative xét góc nhìn ngược.' },
      { time: '13:50', seconds: 830, title: 'Xử lý khi bị vấp hoặc bí ý tưởng', content: 'Sử dụng các cụm từ nối học thuật (Academic Fillers) để có thêm 3-5 giây tư duy mà không bị trừ điểm.' }
    ],
    keyTakeaways: [
      'Trong 1 phút chuẩn bị Part 2, tuyệt đối KHÔNG viết thành câu hoàn chỉnh; chỉ ghi gạch đầu dòng các từ khóa (Keywords) và Collocations.',
      'Chia thời gian nói 2 phút thành 3 chặng: Mở đầu & hoàn cảnh (30s) -> Thách thức & chi tiết kịch tính (50s) -> Ý nghĩa & tác động lâu dài (40s).',
      'Công thức A.R.E.A cho Part 3: Answer (Trả lời trực diện) - Reason (Lý do cốt lõi) - Example (Ví dụ thực tế) - Alternative (Góc nhìn đối lập hoặc giải pháp thay thế).',
      'Khi bí từ hoặc cần thời gian suy nghĩ: Sử dụng cụm từ kéo dài thời gian học thuật như "That is an intriguing inquiry; if we evaluate this from an economic standpoint..."'
    ],
    subtitles: [
      { timeSec: 0, en: "In the Speaking exam, hesitations and silence are your greatest enemies.", vi: "Trong kỳ thi Nói, sự ấp úng và im lặng là kẻ thù lớn nhất của bạn." },
      { timeSec: 6, en: "Fluency does not mean speaking at bullet speed; it means speaking smoothly with natural pauses.", vi: "Độ lưu loát không có nghĩa là nói nhanh như súng bắn; mà là nói trôi chảy với những nhịp ngắt tự nhiên." },
      { timeSec: 13, en: "With the A.R.E.A technique, you will never run out of ideas, even for the most abstract questions.", vi: "Với công thức A.R.E.A, bạn sẽ không bao giờ cạn kiệt ý tưởng, ngay cả với câu hỏi trừu tượng nhất." }
    ],
    slides: [
      {
        title: 'Kỹ Thuật 60 Giây Chuẩn Bị Cue Card Part 2',
        subtitle: 'Cách biến mảnh giấy nháp thành bệ phóng cho 2 phút nói hoàn hảo',
        bulletPoints: [
          'Dòng 1: Tên sự việc/người/địa điểm + 1 Tính từ C1 mô tả (e.g. "Can Gio Reforestation - transformative").',
          'Dòng 2: Mốc thời gian + Hoàn cảnh quá khứ (Past Continuous: "While I was researching...").',
          'Dòng 3: Thách thức lớn nhất gặp phải (Friction: "tidal mudflats, local skepticism").',
          'Dòng 4: 2 Cụm từ thành ngữ đắt giá muốn dùng (e.g. "spearhead an initiative", "formidable hurdles").'
        ],
        highlightTip: '💡 Đừng nhìn chằm chằm vào tờ giấy nháp khi nói. Hãy nhìn vào mắt giám khảo và chỉ liếc mắt xuống nháp 2-3 giây để bắt ý tiếp theo.'
      },
      {
        title: 'Công Thức A.R.E.A: Thống Trị Vòng Phỏng Vấn Part 3',
        subtitle: 'Phương pháp trả lời câu hỏi trừu tượng đạt Band 8.0 - 9.0',
        bulletPoints: [
          'A - Answer: Khẳng định trực tiếp quan điểm bằng một câu súc tích.',
          'R - Reason: Đưa ra lý do chính dựa trên góc nhìn xã hội, kinh tế hoặc tâm lý.',
          'E - Example: Dẫn chứng một xu hướng chung trong xã hội hiện đại.',
          'A - Alternative: Lật lại vấn đề: Nếu điều này không xảy ra thì hậu quả sẽ là gì?'
        ],
        formula: 'Part 3 Answer = Direct Stance + Socio-economic Driver + Macro Example + Counter-perspective'
      }
    ]
  },
  {
    id: 'vid-ielts-writing-task1-charts',
    title: 'Writing Task 1: Làm Chủ Từ Vựng Xu Hướng & Cấu Trúc Tổng Quan (Overview) Đạt 8.0+',
    skill: 'writing',
    durationMinutes: 14,
    durationLabel: '14:30',
    instructorName: 'Liam Gallagher',
    instructorTitle: 'Chuyên gia phân tích dữ liệu & Giảng viên IELTS Academic Lexis',
    badge: 'Chuyên đề Task 1 Biểu Đồ',
    summary: 'Cách xác định 2 đặc điểm nổi bật nhất (Key Features) để viết câu Overview đắt giá, kỹ thuật biến đổi linh hoạt giữa danh từ và động từ mô tả biến động (Fluctuate vs Experience fluctuations) và làm chủ giới từ số liệu (by, from... to, at).',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Cấu trúc 4 đoạn chuẩn mực của Task 1', content: 'Đoạn 1: Mở bài Paraphrase; Đoạn 2: Overview tổng quan; Đoạn 3: Chi tiết 1; Đoạn 4: Chi tiết 2.' },
      { time: '03:00', seconds: 180, title: 'Cách viết Overview: Trái tim của Task 1', content: 'Không có Overview rõ ràng thì bài viết KHÔNG THỂ vượt quá Band 5.0 tiêu chí Task Achievement.' },
      { time: '06:45', seconds: 405, title: 'Kho từ vựng biến động số liệu C1/C2', content: 'Làm chủ các động từ: plummet, surge, plateau, hover, eclipse, outstrip.' },
      { time: '10:20', seconds: 620, title: 'Bẫy giới từ số liệu kinh điển', content: 'Phân biệt "increased by 20%" (tăng thêm 20%) và "increased to 20%" (tăng đến mốc 20%).' }
    ],
    keyTakeaways: [
      'Task 1 không phải là bài nghị luận; tuyệt đối không đưa ý kiến cá nhân ("In my opinion") hoặc giải thích nguyên nhân vì sao số liệu thay đổi.',
      'Overview là phần quan trọng nhất: Phải chỉ ra xu hướng chung (tăng hay giảm) và đối tượng nổi bật nhất (cao nhất hoặc thấp nhất).',
      'Đa dạng hóa ngữ pháp bằng cách luân chuyển giữa cấu trúc chủ động (X rose significantly) và cấu trúc danh từ (There was a significant rise in X).',
      'Giới từ chính xác: "peaked at 80%", "stood at roughly 45%", "decreased by 15%", "fluctuated between 10% and 25%".'
    ],
    subtitles: [
      { timeSec: 0, en: "Welcome to IELTS Writing Task 1. In just 20 minutes, you must summarize visual data concisely.", vi: "Chào mừng bạn đến với IELTS Writing Task 1. Trong 20 phút, bạn cần tóm tắt số liệu trực quan một cách cô đọng." },
      { timeSec: 6, en: "The Overview paragraph is the single most critical component for securing Band 7 and above.", vi: "Đoạn Tổng quan (Overview) là phần quan trọng nhất để quyết định bài viết có đạt Band 7 trở lên hay không." },
      { timeSec: 13, en: "Never copy the exact prompt; paraphrase the subject, verbs, and timeframe immediately.", vi: "Tuyệt đối không chép lại nguyên văn đề bài; hãy paraphrase chủ ngữ, động từ và khung thời gian ngay lập tức." }
    ],
    slides: [
      {
        title: 'Công Thức Viết Overview Đạt Điểm Tuyệt Đối',
        subtitle: 'Bắt trọn 2 đặc tính vĩ mô của biểu đồ trong 2 câu ngắn',
        bulletPoints: [
          'Đặc điểm 1 (Xu hướng dài hạn): Đối tượng nào tăng trưởng chủ đạo, đối tượng nào sụt giảm hoặc đi ngang.',
          'Đặc điểm 2 (Mốc thống trị): Đối tượng nào chiếm thị phần áp đảo từ đầu đến cuối, hoặc có sự hoán đổi vị trí đáng chú ý.',
          'Dấu hiệu nhận biết câu Overview: Bắt đầu bằng "Overall, it is readily apparent that..." hoặc "In general, what stands out from the chart is that..."'
        ],
        highlightTip: '⚠️ Không bao giờ đưa số liệu chi tiết vào đoạn Overview! Số liệu chỉ dành cho 2 đoạn Body phân tích.'
      },
      {
        title: 'Kho Từ Vựng Miêu Tả Biến Động Số Liệu (Dynamic Trends)',
        subtitle: 'Thay thế các từ đơn giản "go up / go down" bằng ngôn ngữ học thuật',
        bulletPoints: [
          'Tăng vọt / Bùng nổ: Surge, Skyrocket, Escalate, Proliferate (Surged dramatically to 78%).',
          'Giảm sâu / Lao dốc: Plummet, Plunge, Slump, Contract (Plummeted to an all-time low of 12%).',
          'Chạm đỉnh: Peaked at / Reached an apex of 95%.',
          'Chạm đáy: Reached a trough of / Bottomed out at 5%.',
          'Dao động liên tục: Fluctuated wildly between X and Y.'
        ],
        formula: 'Trend = (Degree Adverb) + (Dynamic Verb) + (Precise Preposition)'
      }
    ],
    miniQuiz: [
      {
        question: 'Đoạn văn nào đóng vai trò quan trọng nhất để bài viết Task 1 đạt từ Band 7.0 trở lên?',
        options: ['Đoạn Tổng Quan (Overview)', 'Đoạn Mở bài (Introduction)', 'Đoạn Chi tiết 1', 'Đoạn Kết luận (Conclusion)'],
        correctAnswer: 'Đoạn Tổng Quan (Overview)',
        explanation: 'Tiêu chuẩn chấm thi Cambridge quy định rõ: Nếu không có Overview rõ ràng, bài viết không thể vượt qua Band 5.0 tiêu chí Task Achievement.'
      }
    ]
  },
  {
    id: 'vid-ielts-gt-writing-masterclass',
    title: 'IELTS GT Writing Task 1: Bí Kíp 3 Sắc Thái Thư (Formal, Semi-formal, Informal) Band 9.0',
    skill: 'writing',
    durationMinutes: 20,
    durationLabel: '20:10',
    instructorName: 'Dr. Sarah Jenkins',
    instructorTitle: 'Cựu giám khảo Cambridge Assessment, Chuyên gia huấn luyện IELTS General Training',
    badge: 'Chuyên đề GT Writing Band 9.0',
    summary: 'Phân định dứt khoát 3 phong cách hành văn (Tone) trong bài viết thư: Formal (Khiếu nại, xin việc), Semi-formal (Chủ nhà, đồng nghiệp) và Informal (Bạn thân). Nắm vững nguyên tắc kết hợp lời chào và lời kết chuẩn để không bị trừ điểm Task Achievement.',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Tổng quan tiêu chí chấm thi GT Task 1', content: 'Tối thiểu 150 từ trong 20 phút, 3 bullet points bắt buộc và yêu cầu tính nhất quán về văn phong (Tone Consistency).' },
      { time: '03:40', seconds: 220, title: 'Thư Formal: Nguyên tắc không bao giờ viết tắt', content: 'Cách xưng hô "Dear Sir or Madam", kết thư "Yours faithfully" và kỹ thuật dùng từ ngữ trang trọng khách quan.' },
      { time: '08:15', seconds: 495, title: 'Thư Semi-formal: Ranh giới lịch sự công sở', content: 'Xưng hô "Dear Mr./Ms. [Họ]", kết thư "Yours sincerely" và cấu trúc nêu yêu cầu nhã nhặn nhưng dứt khoát.' },
      { time: '13:00', seconds: 780, title: 'Thư Informal: Ngôn ngữ tự nhiên & ấm áp', content: 'Xưng hô "Dear [Tên riêng]", kết thư "Warm regards", dùng từ nối hội thoại tự nhiên và viết tắt được phép.' },
      { time: '17:30', seconds: 1050, title: 'Phân tích bài mẫu khiếu nại hãng hàng không', content: 'Từng câu một cấu trúc thư Band 9.0 đòi bồi thường hành lý và chuyến bay hoãn.' }
    ],
    keyTakeaways: [
      'Không bao giờ trộn lẫn phong cách: Dùng "Dear Sir or Madam" nhưng lại kết thư bằng "Best regards" sẽ bị trừ điểm Tone & Register ngay lập tức.',
      'Thư Formal: Tuyệt đối không viết tắt (viết "do not", "cannot", "I would appreciate" thay vì "don\'t", "can\'t").',
      'Đảm bảo phát triển đồng đều cả 3 bullet points đề bài giao; bỏ sót 1 ý là mất Band 7.0 Task Achievement.',
      'Độ dài tối ưu của bài viết thư nên nằm trong khoảng 170 - 200 từ.'
    ],
    subtitles: [
      { timeSec: 0, en: "In General Training Task 1, maintaining the correct tone is your ticket to a Band 9.", vi: "Trong GT Task 1, giữ đúng phong cách hành văn chính là chìa khóa đạt Band 9." },
      { timeSec: 6, en: "Examiners penalize any inconsistency between your salutation, body register, and sign-off.", vi: "Giám khảo sẽ trừ điểm nếu có bất kỳ sự không đồng nhất nào giữa lời chào, thân bài và lời kết." },
      { timeSec: 13, en: "Remember: Unknown recipient means Dear Sir or Madam, paired strictly with Yours faithfully.", vi: "Hãy nhớ: Người nhận chưa biết tên phải chào Dear Sir or Madam, và bắt buộc kết bằng Yours faithfully." }
    ],
    slides: [
      {
        title: 'Ma Trận 3 Phong Cách Hành Văn (Tone Matrix)',
        subtitle: 'Bảng đối chiếu chuẩn xác lời chào, thân bài và lời kết',
        bulletPoints: [
          'Formal: Dear Sir or Madam -> Yours faithfully, [Họ và tên đầy đủ]. Không viết tắt.',
          'Semi-formal: Dear Mr./Ms. [Họ] -> Yours sincerely, [Họ và tên đầy đủ]. Lịch sự, chuyên nghiệp.',
          'Informal: Dear [Tên riêng] -> Warm regards / Best wishes, [Tên riêng]. Thân mật, tự nhiên.'
        ],
        formula: 'Task Achievement = (All 3 Bullets Covered) + (Consistent Register) + (Appropriate Pairing)',
        highlightTip: '⚠️ Bẫy trừ điểm: Không dùng "Hello Sir" hoặc "Hi Mr. Smith" trong văn bản thi IELTS!'
      },
      {
        title: 'Cấu Trúc 4 Đoạn Thư Hoàn Hảo',
        subtitle: 'Mô hình phân bổ thời gian 20 phút',
        bulletPoints: [
          'Đoạn 1 (2 phút): Lời chào + Nêu rõ lý do viết thư (Reason for writing).',
          'Đoạn 2 (5 phút): Giải quyết Bullet point 1 với chi tiết xác thực.',
          'Đoạn 3 (5 phút): Giải quyết Bullet point 2 (Tác động/khó khăn gặp phải).',
          'Đoạn 4 (5 phút): Giải quyết Bullet point 3 (Biện pháp mong đợi/thời hạn) + Ký tên.',
          'Kiểm tra lại (3 phút): Rà soát lỗi chia động từ, mạo từ và dấu câu.'
        ],
        highlightTip: '💡 Luôn chia đoạn rõ ràng bằng cách cách một dòng trắng giữa các đoạn để giám khảo dễ theo dõi.'
      }
    ],
    miniQuiz: [
      {
        question: 'Khi viết thư Formal cho người quản lý mà không biết tên, lời kết nào sau đây là chuẩn mực nhất?',
        options: ['Yours faithfully,', 'Yours sincerely,', 'Best regards,', 'Warmest wishes,'],
        correctAnswer: 'Yours faithfully,',
        explanation: 'Quy tắc Cambridge: Bắt đầu bằng "Dear Sir or Madam" thì phải kết bằng "Yours faithfully,".'
      },
      {
        question: 'Trong thư Formal (Trang trọng), câu nào sau đây vi phạm phong cách hành văn?',
        options: [
          'I\'m writing because I can\'t accept this terrible service.',
          'I am writing to register a formal complaint regarding the service received.',
          'I would appreciate it if you could investigate this matter promptly.',
          'Enclosed herewith are copies of the original booking receipts.'
        ],
        correctAnswer: 'I\'m writing because I can\'t accept this terrible service.',
        explanation: 'Thư Formal tuyệt đối không được viết tắt (I\'m, can\'t) và không dùng cảm xúc thiếu chuyên nghiệp.'
      }
    ]
  },
  {
    id: 'vid-ielts-gt-reading-section123',
    title: 'IELTS GT Reading 34/40: Chiến Lược Chinh Phục 3 Section (Social -> Workplace -> General)',
    skill: 'reading',
    durationMinutes: 19,
    durationLabel: '19:45',
    instructorName: 'Michael Vance',
    instructorTitle: 'Chuyên gia khảo thí IELTS General Training, Hội đồng Anh',
    badge: 'Chuyên đề GT Reading 34/40',
    summary: 'Chiến thuật làm bài đọc hiểu General Training: Phân bố thời gian 15 - 18 - 25 phút cho 3 Section, quét nhanh tờ rơi đời sống Section 1, bẫy nội quy lao động Section 2 và bài đọc tạp chí Section 3 để cán mốc 34-35/40 chuẩn Band 7.0+ khắt khe.',
    chapters: [
      { time: '00:00', seconds: 0, title: 'Thang điểm khắt khe của GT Reading', content: 'Tại sao cần đúng 34 câu mới đạt Band 7.0 GT trong khi Academic chỉ cần 30 câu.' },
      { time: '03:30', seconds: 210, title: 'Section 1 (Social Survival): Quét tờ rơi trong 15 phút', content: 'Kỹ thuật định vị số điện thoại, điều kiện giảm giá, giờ chạy tàu xe và quy chế tham gia.' },
      { time: '08:00', seconds: 480, title: 'Section 2 (Workplace Survival): Bẫy hợp đồng & nghỉ ốm', content: 'Xử lý các đoạn văn cẩm nang nhân viên, an toàn lao động, thỏa thuận TOIL và làm thêm giờ.' },
      { time: '13:20', seconds: 800, title: 'Section 3 (General Reading): Bài báo dài chuyên khảo', content: 'Cách đối phó với bài đọc 700 - 900 từ về văn hóa, lịch sử, kỹ thuật truyền thống.' }
    ],
    keyTakeaways: [
      'Không được chủ quan ở Section 1: Vì câu hỏi dễ nên bạn phải làm nhanh và đúng tuyệt đối 100% để dành thời gian cho Section 3.',
      'Phân bổ thời gian: Section 1 tối đa 15 phút, Section 2 tối đa 18 phút, Section 3 tối thiểu 25 phút (dành 2 phút rà soát).',
      'Trong văn bản công sở Section 2: Chú ý các điều kiện ràng buộc như "prior written approval", "exceeding seven consecutive days".',
      'Mỗi câu sai ở GT khiến bạn rớt Band nhanh hơn gấp đôi so với Academic.'
    ],
    subtitles: [
      { timeSec: 0, en: "General Training Reading texts seem simpler, but the grading scale is significantly harsher.", vi: "Bài đọc General Training trông có vẻ đơn giản hơn, nhưng thang điểm chấm lại khắt khe hơn đáng kể." },
      { timeSec: 7, en: "To achieve a Band 7.0, you must score at least 34 out of 40 correct answers.", vi: "Để đạt Band 7.0, bạn phải đạt tối thiểu 34 trên 40 câu trả lời chính xác." },
      { timeSec: 14, en: "Accuracy in Section 1 and 2 is non-negotiable; that is where your foundation is built.", vi: "Sự chính xác tuyệt đối ở Section 1 và 2 là điều kiện tiên quyết xây dựng điểm số của bạn." }
    ],
    slides: [
      {
        title: 'Cấu Trúc 3 Section Bài Thi IELTS GT Reading',
        subtitle: 'Bản đồ phân bổ thời gian và ngữ liệu thực tế',
        bulletPoints: [
          'Section 1 (Social Survival): 2-3 mẩu tin ngắn (tờ rơi sự kiện, biểu phí tàu xe, thông tin khóa học). Thời gian: 15 phút.',
          'Section 2 (Workplace Survival): 2 văn bản công sở (nội quy, chính sách nghỉ ốm, hợp đồng, an toàn lao động). Thời gian: 18 phút.',
          'Section 3 (General Reading): 1 bài văn dài mang tính mô tả/phổ biến kiến thức từ tạp chí. Thời gian: 25 phút.'
        ],
        formula: 'GT Score Formula: (Section 1: 14/14) + (Section 2: 12/13) + (Section 3: 9/13) = 35/40 (Band 7.5)',
        highlightTip: '⚠️ Mục tiêu vàng: Đạt trọn vẹn điểm ở Section 1 và 2 trước khi bước vào bài đọc dài Section 3!'
      }
    ],
    miniQuiz: [
      {
        question: 'Để đạt Band 7.0 trong bài thi IELTS General Training Reading, thí sinh cần làm đúng bao nhiêu câu?',
        options: ['Khoảng 34 – 35 / 40 câu', 'Khoảng 30 – 31 / 40 câu', 'Khoảng 27 – 28 / 40 câu', 'Khoảng 23 – 25 / 40 câu'],
        correctAnswer: 'Khoảng 34 – 35 / 40 câu',
        explanation: 'Vì ngữ liệu GT gần gũi với đời sống hơn Academic, thang điểm khắt khe hơn: Band 7.0 cần 34-35 câu (trong khi Academic chỉ cần 30-31 câu).'
      }
    ]
  }
];
