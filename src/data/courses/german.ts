import { LanguageCourse } from '../curriculum';

export const germanCourse: LanguageCourse = {
  id: 'german',
  name: 'German',
  nativeName: 'Deutsch',
  vietnameseName: 'Tiếng Đức',
  flagEmoji: '🇩🇪',
  flagColor: '#ea580c',
  voiceLangCode: 'de-DE',
  scriptType: 'Bảng chữ cái Latinh với các nguyên âm biến âm (ä, ö, ü) và chữ ß (Eszett)',
  examInfo: [
    {
      examName: 'Goethe-Zertifikat / telc Deutsch',
      targetLevel: 'B1 - B2 (Khung Châu Âu CEFR)',
      overview: 'Chứng chỉ chuẩn mực quốc tế do Viện Goethe (Goethe-Institut) cấp, là điều kiện tiên quyết bắt buộc để xin visa du học nghề (Ausbildung điều dưỡng, cơ khí, nhà hàng), học đại học tại Đức và xin thẻ cư trú vĩnh viễn (Niederlassungserlaubnis).',
      formatSections: [
        'Lesen (Đọc hiểu): 65 phút (5 phần: đọc lướt, đọc chi tiết, chọn thông báo khớp nhu cầu, chọn ý kiến độc giả, quy định pháp lý)',
        'Hören (Nghe hiểu): 40 phút (4 phần: thông báo nơi công cộng, hội thoại hàng ngày, phỏng vấn chuyên gia)',
        'Schreiben (Viết): 60 phút (3 phần: email thân mật, bài bày tỏ quan điểm diễn đàn mạng, email khiếu nại/xin lỗi trang trọng)',
        'Sprechen (Nói): 15 phút (2 phần: thuyết trình một chủ đề đời sống và thảo luận giải quyết vấn đề cùng bạn thi)'
      ],
      strategyTips: [
        'Vị trí của động từ trong câu phụ (Nebensatz): Ghi nhớ quy tắc vàng: Khi dùng liên từ "weil" (bởi vì), "obwohl" (mặc dù), "dass" (rằng), động từ chia LUÔN BỊ ĐẨY XUỐNG CUỐI CÙNG của mệnh đề!',
        'Quy tắc 3 Giống (Der - Die - Das): Học danh từ luôn đi kèm mạo từ xác định và dạng số nhiều (Ví dụ: das Auto, die Autos; der Tisch, die Tische), vì ngữ pháp Đức biến đổi đuôi theo 4 Cách (Nominativ, Akkusativ, Dativ, Genitiv).',
        'Phần thi Nói (Sprechen): Chuẩn bị sẵn các mẫu câu đưa ra ý kiến như "Meiner Meinung nach...", "Ich bin der Ansicht, dass...", "Einerseits... andererseits..." để bài nói trôi chảy và đạt điểm cao.'
      ],
      sampleQuestions: [
        {
          question: 'Goethe B2 Grammatik: Chọn vị trí động từ đúng sau liên từ "obwohl":',
          options: [
            'Er kam pünktlich zur Konferenz, obwohl sein Flug zwei Stunden Verspätung hatte.',
            'Er kam pünktlich zur Konferenz, obwohl hatte sein Flug zwei Stunden Verspätung.',
            'Er kam pünktlich zur Konferenz, obwohl sein Flug hatte zwei Stunden Verspätung.',
            'Er kam pünktlich zur Konferenz, obwohl zwei Stunden Verspätung sein Flug hatte.'
          ],
          correctAnswer: 'Er kam pünktlich zur Konferenz, obwohl sein Flug zwei Stunden Verspätung hatte.',
          explanationInVietnamese: 'Sau liên từ phụ thuộc "obwohl" (mặc dù), động từ chia (hatte) bắt buộc phải nằm ở vị trí CUỐI CÙNG của mệnh đề phụ.'
        },
        {
          question: 'Goethe B1 Schreiben: Điền giới từ thích hợp chỉ sự quan tâm: "Ich interessiere mich sehr ______ diese Stelle als Krankenpfleger."',
          options: ['für', 'über', 'an', 'mit'],
          correctAnswer: 'für',
          explanationInVietnamese: 'Cấu trúc động từ phản thân đi với giới từ cố định: "sich interessieren für + Akkusativ" (rất quan tâm / hứng thú với điều gì).'
        },
        {
          question: 'Goethe B2 Wortschatz: "Wir müssen alle relevanten Faktoren sorgfältig in Betracht ______."',
          options: ['ziehen', 'nehmen', 'bringen', 'machen'],
          correctAnswer: 'ziehen',
          explanationInVietnamese: 'Cụm diễn đạt cố định cấp cao (Nomen-Verb-Verbindung): "etwas in Betracht ziehen" = cân nhắc, xem xét kỹ lưỡng điều gì.'
        }
      ]
    }
  ],
  units: [
    {
      id: 'de-u1',
      number: 1,
      track: 'daily',
      title: 'Chào Hỏi & Văn Hóa Xưng Hô "Sie" vs "Du"',
      description: 'Làm quen với cách phát âm tiếng Đức chuẩn, xưng hô trang trọng (Sie) với người ngoài và thân mật (du) với bạn bè.',
      cefrLevel: 'A1',
      lessons: [
        {
          id: 'de-l1',
          track: 'daily',
          title: 'Chào hỏi Chuẩn Mực & Giới Thiệu Bản Thân',
          description: 'Cách mở lời chào Guten Tag, xưng danh tính, nghề nghiệp và quê hương bằng tiếng Đức.',
          durationMinutes: 4,
          xpReward: 30,
          exercises: [
            {
              id: 'de-e1',
              type: 'flashcard',
              prompt: 'Mẫu câu chào trang trọng và giới thiệu nguồn gốc',
              targetText: 'Guten Tag! Ich heiße Minh und ich komme aus Vietnam.',
              romanization: '/ˈɡuːtn̩ taːk ɪç ˈhaɪsə mɪn ʊnt ɪç ˈkɔmə aʊs vi̯ɛtˈnam/',
              vietnameseMeaning: 'Kính chào ngài! Tôi tên là Minh và tôi đến từ Việt Nam.',
              audioText: 'Guten Tag! Ich heiße Minh und ich komme aus Vietnam.',
              explanation: '"Guten Tag" dùng phổ biến nhất từ 10:00 sáng đến 18:00 chiều.',
              culturalNote: 'Ở Đức, khi chào hỏi luôn bắt tay dứt khoát (fester Händedruck) và nhìn thẳng vào mắt đối phương.'
            },
            {
              id: 'de-e2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Rất vui được làm quen với ngài."',
              targetText: 'Sehr freut mich, Sie kennenzulernen.',
              wordTokens: ['Sehr freut', 'mich,', 'Sie', 'kennenzulernen.', 'Tschüss', 'gestern'],
              explanation: '"Sie kennenzulernen" là mẫu câu trang trọng bày tỏ niềm hân hạnh được làm quen.'
            },
            {
              id: 'de-e3',
              type: 'quiz_choice',
              prompt: 'Khi muốn chào tạm biệt một cách trang trọng qua điện thoại, người Đức dùng câu nào?',
              options: [
                'Auf Wiederhören! (Hẹn nghe lại máy sau)',
                'Auf Wiedersehen! (Hẹn gặp lại trực tiếp)',
                'Tschüss! (Tạm biệt thân mật)',
                'Bis gleich! (Lát gặp lại nhé)'
              ],
              correctAnswer: 'Auf Wiederhören! (Hẹn nghe lại máy sau)',
              explanation: 'Khi nói chuyện qua điện thoại không nhìn thấy mặt nhau, người Đức chuẩn mực luôn nói "Auf Wiederhören" thay vì "Auf Wiedersehen".'
            }
          ]
        },
        {
          id: 'de-l2',
          track: 'daily',
          title: 'Ẩm Thực Quán Ăn Đức & Đi Siêu Thị',
          description: 'Gọi xúc xích Currywurst, bánh mì Pretzel, bia tươi và tự mang túi khi đi siêu thị (Aldi, Lidl).',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'de-e4',
              type: 'flashcard',
              prompt: 'Mẫu câu xin tính tiền tại nhà hàng',
              targetText: 'Entschuldigung, wir möchten bitte zahlen. Zusammen oder getrennt?',
              romanization: '/ɛntˈʃʊldɪɡʊŋ viːɐ̯ ˈmœçtn̩ ˈbɪtə ˈtsaːlən/',
              vietnameseMeaning: 'Xin lỗi làm ơn, chúng tôi muốn tính tiền. Trả chung hay trả riêng từng người ạ?',
              audioText: 'Entschuldigung, wir möchten bitte zahlen.',
              explanation: '"Getrennt zahlen" (trả riêng phần ai nấy trả) là văn hóa cực kỳ phổ biến và tự nhiên tại Đức.',
              culturalNote: 'Tiền tip (Trinkgeld) ở Đức thường được làm tròn lên (Ví dụ hóa đơn 27 Euro thì đưa 30 Euro và nói "Stimmt so!").'
            },
            {
              id: 'de-e5',
              type: 'fill_blank',
              prompt: 'Điền mạo từ: "Ich hätte gerne ______ Tasse Kaffee mit Milch, bitte."',
              options: ['eine', 'ein', 'einen', 'einem'],
              correctAnswer: 'eine',
              explanation: '"Tasse" (tách/cốc) là danh từ giống cái (die Tasse), ở dạng bổ ngữ trực tiếp Akkusativ là "eine Tasse".'
            }
          ]
        }
      ]
    },
    {
      id: 'de-u2',
      number: 2,
      track: 'daily',
      title: 'Đi Lại Bằng Phương Tiện Công Cộng (S-Bahn / U-Bahn)',
      description: 'Mua vé tàu DB (Deutsche Bahn), dập vé (Entwerten) và hỏi ga tàu khi đi lại tại Berlin, München hay Frankfurt.',
      cefrLevel: 'A2',
      lessons: [
        {
          id: 'de-l3',
          track: 'daily',
          title: 'Hỏi Đường & Mua Vé Tàu Điện Đức',
          description: 'Cách hỏi chuyến tàu nào đi tới sân bay, thời gian khởi hành và hỏi sân ga (Gleis).',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'de-e6',
              type: 'flashcard',
              prompt: 'Mẫu câu hỏi ga khởi hành của tàu hỏa',
              targetText: 'Von welchem Gleis fährt der Zug nach Frankfurt ab?',
              romanization: '/fɔn ˈvɛlçəm ɡlaɪs fɛːɐ̯t deːɐ̯ tsuːk naːx ˈfʁaŋkfʊʁt ap/',
              vietnameseMeaning: 'Chuyến tàu đi Frankfurt sẽ khởi hành từ đường ray (sân ga) số mấy vậy ạ?',
              audioText: 'Von welchem Gleis fährt der Zug nach Frankfurt ab?',
              explanation: '"Abfahren" là động từ tách chỉ việc xe/tàu khởi hành. "Gleis" là đường ray tại nhà ga.',
              culturalNote: 'Tại Đức, hệ thống tàu không có cửa soát vé tự động nhưng kiểm tra vé đột xuất (Ticket-Kontrolleur) rất nghiêm ngặt, đi không vé (Schwarzfahren) bị phạt 60 Euro!'
            },
            {
              id: 'de-e7',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Làm ơn cho tôi hỏi ga tàu điện ngầm gần nhất ở đâu?"',
              targetText: 'Können Sie mir sagen, wo die nächste U-Bahn-Station ist?',
              wordTokens: ['Können Sie', 'mir sagen,', 'wo die', 'nächste', 'U-Bahn-Station', 'ist?', 'Bus', 'Ticket'],
              explanation: 'Mẫu câu hỏi gián tiếp lịch sự: "Können Sie mir sagen, wo... ist?"'
            }
          ]
        },
        {
          id: 'de-l3b',
          track: 'daily',
          title: 'Khám Bệnh Tại Phòng Khám & Bảo Hiểm Y Tế (Arztbesuch)',
          description: 'Cách đặt lịch hẹn Termin với bác sĩ gia đình (Hausarzt), trình thẻ bảo hiểm y tế và miêu tả triệu chứng.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'de-e7b',
              type: 'flashcard',
              prompt: 'Mẫu câu đặt hẹn khám bệnh tại Đức',
              targetText: 'Guten Tag, ich möchte gerne einen Termin beim Hausarzt vereinbaren.',
              romanization: '/ˈɡuːtn̩ taːk ɪç ˈmœçtə ˈɡɛʁnə ˈaɪ̯nən tɛʁˈmiːn baɪ̯m ˈhaʊ̯sˌʔaːɐ̯tst fɛɐ̯ˈʔaɪ̯nbaːʁən/',
              vietnameseMeaning: 'Kính chào phòng khám, tôi muốn xin đặt một lịch hẹn khám với bác sĩ gia đình ạ.',
              audioText: 'Guten Tag, ich möchte gerne einen Termin beim Hausarzt vereinbaren.',
              explanation: '"Einen Termin vereinbaren" là hành động bắt buộc tại Đức trước khi đến bất kỳ phòng khám hay cơ quan công quyền nào.',
              culturalNote: 'Ở Đức không thể đến khám ngay lập tức trừ trường hợp cấp cứu (Notaufnahme); luôn phải gọi điện đặt Termin trước.'
            },
            {
              id: 'de-e7c',
              type: 'fill_blank',
              prompt: 'Điền giới từ: "Ich habe seit drei Tagen starke Schmerzen ______ Rücken."',
              options: ['im', 'am', 'zum', 'beim'],
              correctAnswer: 'im',
              explanation: '"Schmerzen im Rücken" (đau ở lưng) dùng "in + Dativ" (in dem Rücken -> im Rücken).'
            }
          ]
        },
        {
          id: 'de-l3c',
          track: 'daily',
          title: 'Tìm Thuê Nhà & Cuộc Sống Tại Đức (Wohnungssuche)',
          description: 'Hỏi xem căn hộ (Besichtigung), hỏi tiền thuê ấm/lạnh (Kaltmiete / Warmmiete) và tiền cọc Kaution.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'de-e7d',
              type: 'flashcard',
              prompt: 'Phân biệt tiền thuê nhà Kaltmiete và Warmmiete',
              targetText: 'Die Kaltmiete beträgt 650 Euro, die Warmmiete inklusive Nebenkosten 800 Euro.',
              romanization: '/diː ˈkaltˌmiːtə bəˈtʁɛːkt.../',
              vietnameseMeaning: 'Tiền thuê nhà gốc là 650 Euro, tiền thuê ấm trọn gói gồm chi phí sưởi và tiện ích là 800 Euro.',
              audioText: 'Die Kaltmiete beträgt 650 Euro, die Warmmiete inklusive Nebenkosten 800 Euro.',
              explanation: '"Warmmiete" đã bao gồm "Nebenkosten" (sưởi, nước nóng, rác thải); "Kaltmiete" chỉ là tiền thuê vỏ phòng.',
              culturalNote: 'Chủ nhà Đức thường yêu cầu tiền đặt cọc 2-3 tháng (Kaution) và bản xác minh tín dụng Schufa.'
            },
            {
              id: 'de-e7e',
              type: 'quiz_choice',
              prompt: 'Từ nào chỉ mô hình "ở ghép chung một căn hộ để chia tiền phòng" cực kỳ phổ biến của sinh viên và người trẻ tại Đức?',
              options: ['die WG (Wohngemeinschaft)', 'das Hotel', 'das Büro', 'die Schule'],
              correctAnswer: 'die WG (Wohngemeinschaft)',
              explanation: '"Wohngemeinschaft" (viết tắt là WG) là hình thức thuê căn hộ nhiều phòng ngủ và dùng chung bếp, phòng khách, phòng tắm.'
            }
          ]
        }
      ]
    },
    {
      id: 'de-u3',
      number: 3,
      track: 'workplace',
      title: 'Môi Trường Làm Việc Tại Đức & Văn Hóa Đúng Giờ (Pünktlichkeit)',
      description: 'Nắm vững quy tắc giờ giấc bất di bất dịch, cách viết email công việc chính xác và giao tiếp với đồng nghiệp.',
      cefrLevel: 'B1 - B2',
      lessons: [
        {
          id: 'de-l4',
          track: 'workplace',
          title: 'Viết Business Mail Chuẩn Phong Cách Đức',
          description: 'Mở đầu trang trọng bằng Sehr geehrte Damen und Herren, viết câu ngắn gọn, súc tích và kết thư chuẩn.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'de-e8',
              type: 'flashcard',
              prompt: 'Công thức mở đầu và kết thư trang trọng kinh điển của Đức',
              targetText: 'Sehr geehrte Damen und Herren, ... Mit freundlichen Grüßen',
              romanization: '/zeːɐ̯ ɡəˈʔeːɐ̯tə ˈdaːmən ʊnt ˈhɛʁən ... mɪt ˈfʁɔʏntlɪçn̩ ˈɡʁyːsn̩/',
              vietnameseMeaning: 'Kính thưa Quý bà và Quý ông, ... Trân trọng kính chào.',
              audioText: 'Sehr geehrte Damen und Herren, ... Mit freundlichen Grüßen',
              explanation: '"Sehr geehrte(r)..." là lời mở đầu bắt buộc trong mọi giao dịch thư từ chính thức tại Đức.',
              culturalNote: 'Người Đức chuộng sự rành mạch, đi thẳng vào trọng tâm công việc, tránh hoa mỹ rườm rà.'
            },
            {
              id: 'de-e9',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi gửi đính kèm bản cập nhật tiến độ dự án mới nhất."',
              targetText: 'Anbei sende ich Ihnen den aktuellen Statusbericht des Projekts.',
              wordTokens: ['Anbei sende', 'ich Ihnen', 'den aktuellen', 'Statusbericht', 'des Projekts.', 'kaufen', 'gestern'],
              explanation: '"Anbei sende ich Ihnen" (Gửi kèm theo đây tôi xin gửi ngài...) là mẫu câu mở đầu chuẩn khi đính kèm tài liệu.'
            }
          ]
        },
        {
          id: 'de-l4b',
          track: 'workplace',
          title: 'Điều Hành Cuộc Họp & Lập Biên Bản (Meetings & Protokoll)',
          description: 'Cách mở đầu cuộc họp đúng giờ, thảo luận các điểm trong chương trình nghị sự (Tagesordnung) và lập biên bản.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'de-e9b',
              type: 'flashcard',
              prompt: 'Mẫu câu mở đầu cuộc họp đúng giờ',
              targetText: 'Ich begrüße Sie alle herzlich und eröffne hiermit unsere heutige Projektsitzung.',
              romanization: '/ɪç bəˈɡʁyːsə ziː ˈʔalə ˈhɛʁtslɪç ʊnt ɛɐ̯ˈʔœfnə.../',
              vietnameseMeaning: 'Tôi xin nhiệt liệt chào đón quý vị và xin tuyên bố khai mạc cuộc họp dự án ngày hôm nay.',
              audioText: 'Ich begrüße Sie alle herzlich und eröffne hiermit unsere heutige Projektsitzung.',
              explanation: 'Cuộc họp tại Đức luôn bắt đầu đúng từng phút theo lịch trên Outlook.',
              culturalNote: 'Luôn có một người được phân công ghi chép "Protokoll" (biên bản cuộc họp) và gửi cho mọi người sau cuộc họp.'
            },
            {
              id: 'de-e9c',
              type: 'quiz_choice',
              prompt: 'Từ nào chỉ danh sách các mục nội dung cần thảo luận trong một cuộc họp tại Đức?',
              options: ['die Tagesordnung', 'die Speisekarte', 'der Fahrplan', 'das Telefonbuch'],
              correctAnswer: 'die Tagesordnung',
              explanation: '"Tagesordnung" (Agenda) là chương trình nghị sự được gửi trước ít nhất 24 giờ để các bên chuẩn bị.'
            }
          ]
        }
      ]
    },
    {
      id: 'de-u4',
      number: 4,
      track: 'workplace',
      title: 'Phỏng Vấn Xin Việc & Du Học Nghề Tại Đức (Vorstellungsgespräch)',
      description: 'Luyện tập phỏng vấn nghề điều dưỡng, cơ khí ô tô, IT tại Đức, thể hiện tính kỷ luật và sự tỉ mỉ.',
      cefrLevel: 'B2',
      lessons: [
        {
          id: 'de-l5',
          track: 'workplace',
          title: 'Tự Giới Thiệu Bản Thân & Động Lực Làm Việc Tại Đức',
          description: 'Cách chứng minh sự chuẩn bị chu đáo, tinh thần trách nhiệm cao và khả năng học hỏi nhanh.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'de-e10',
              type: 'flashcard',
              prompt: 'Mẫu câu nêu bật động lực và tính kỷ luật',
              targetText: 'Zuverlässigkeit und hohe Lernbereitschaft zeichnen meine Arbeitsweise besonders aus.',
              romanization: '/tsuːfɛɐ̯ˈlɛsɪçkaɪt ʊnt ˈhoːə ˈlɛʁn.bə.ʁaɪt.ʃaft ˈtsaɪç.nən.../',
              vietnameseMeaning: 'Sự đáng tin cậy và tinh thần sẵn sàng học hỏi cao là những phẩm chất nổi bật nhất trong phong cách làm việc của tôi.',
              audioText: 'Zuverlässigkeit und hohe Lernbereitschaft zeichnen meine Arbeitsweise besonders aus.',
              explanation: '"Zuverlässigkeit" (sự đáng tin cậy) là phẩm chất được các nhà tuyển dụng Đức đánh giá cao nhất trên đời.',
              culturalNote: 'Hãy chuẩn bị các ví dụ thực tế chứng minh bạn là người luôn giữ đúng lời hứa và hoàn thành cam kết.'
            },
            {
              id: 'de-e11',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu phỏng vấn: "Tôi đã tích lũy được nhiều kinh nghiệm thực tế quý báu trong quá trình thực tập."',
              targetText: 'Während meines Praktikums konnte ich wertvolle praktische Erfahrungen sammeln.',
              wordTokens: ['Während meines', 'Praktikums', 'konnte ich', 'wertvolle praktische', 'Erfahrungen', 'sammeln.', 'faul', 'niemals'],
              explanation: '"Erfahrungen sammeln" là colocation chuẩn trong tiếng Đức chỉ việc tích lũy kinh nghiệm làm việc.'
            },
            {
              id: 'de-e12',
              type: 'quiz_choice',
              prompt: 'Khi nhà tuyển dụng Đức hỏi: "Warum sollten wir uns für Sie entscheiden? (Tại sao chúng tôi nên chọn bạn?)", bạn nên nhấn mạnh điều gì?',
              options: [
                'Sự kết hợp giữa kiến thức chuyên môn vững, thái độ kỷ luật chuẩn Đức và khả năng thích ứng linh hoạt trong môi trường mới.',
                'Vì tôi đang rất cần visa để sang Đức du lịch.',
                'Vì quý công ty trả nhiều tiền hơn công ty khác.',
                'Tùy quý công ty quyết định, tôi không biết.'
              ],
              correctAnswer: 'Sự kết hợp giữa kiến thức chuyên môn vững, thái độ kỷ luật chuẩn Đức và khả năng thích ứng linh hoạt trong môi trường mới.',
              explanation: 'Nhà tuyển dụng Đức đánh giá rất cao sự thực tế (Sachlichkeit), tinh thần trách nhiệm và lòng quyết tâm hòa nhập văn hóa.'
            }
          ]
        }
      ]
    }
  ],
  scenarios: [
    {
      id: 'de-interview',
      track: 'workplace',
      title: 'Phỏng Vấn Tuyển Dụng Tập Đoàn Kỹ Thuật Frankfurt',
      context: 'Bạn đang ứng tuyển vị trí Kỹ sư Điều khiển Tự động hóa / Kỹ thuật viên với Giám đốc Nhân sự Đức.',
      location: 'Trụ sở Frankfurt am Main / Teams',
      characterName: 'Herr Schmidt',
      characterRole: 'Leiter der Personalabteilung',
      characterAvatar: '⚙️',
      starterMessage: {
        text: 'Guten Tag! Schön, dass Sie da sind. Nehmen Sie bitte Platz. Wir haben Ihre Bewerbungsunterlagen sorgfältig geprüft. Erzählen Sie uns doch bitte etwas über Ihren bisherigen Werdegang.',
        romanization: '/ˈɡuːtn̩ taːk ʃøːn das ziː daː zɪnt.../',
        vietnameseTranslation: 'Kính chào bạn! Rất vui vì bạn đã có mặt. Xin mời ngồi. Chúng tôi đã xem xét hồ sơ ứng tuyển của bạn rất kỹ lưỡng. Xin hãy chia sẻ đôi nét về quá trình học tập và công tác của bạn từ trước đến nay.'
      },
      objectives: [
        'Chào hỏi trang trọng: "Guten Tag, Herr Schmidt. Vielen Dank für die Einladung."',
        'Trình bày mạch lạc, tự tin về quá trình đào tạo và kinh nghiệm chuyên môn',
        'Khẳng định tinh thần kỷ luật và sự tỉ mỉ đúng phong cách Đức'
      ]
    },
    {
      id: 'de-tavern',
      track: 'daily',
      title: 'Thưởng Thức Ẩm Thực Quán Ăn Truyền Thống Bayern',
      context: 'Bạn bước vào quán ăn ấm cúng tại München, thưởng thức món giò heo nướng giòn rụm và bánh mì Pretzel.',
      location: 'Brauhaus München',
      characterName: 'Hans',
      characterRole: 'Bồi bàn truyền thống (Kellner)',
      characterAvatar: '🥨',
      starterMessage: {
        text: 'Grüß Gott! Haben Sie schon gewählt oder darf ich Ihnen eine Empfehlung des Hauses bringen?',
        romanization: '/ɡʁyːs ɡɔt ˈhaːbn̩ ziː ʃoːn ɡəˈvɛːlt.../',
        vietnameseTranslation: 'Xin chào (lời chào vùng Bayern)! Quý khách đã chọn được món chưa hay để tôi giới thiệu món đặc sản của quán ạ?'
      },
      objectives: [
        'Hỏi về món đặc sản nướng giòn Schweinshaxe',
        'Gọi nước táo ép có ga Apfelschorle',
        'Xin tính tiền và làm tròn tiền tip'
      ]
    }
  ],
  vocabCards: [
    {
      id: 'de-v1',
      track: 'workplace',
      word: 'Pünktlichkeit',
      romanization: '/Pünkt-likh-kayt/',
      meaning: 'Tính đúng giờ, sự chuẩn xác tuyệt đối về thời gian',
      partOfSpeech: 'noun (die)',
      exampleSentence: 'Pünktlichkeit ist eine der wichtigsten Tugenden im deutschen Arbeitsleben.',
      exampleTranslation: 'Đúng giờ là một trong những đức tính quan trọng bậc nhất trong đời sống làm việc tại Đức.',
      category: 'Văn hóa Làm việc Đức',
      easeFactor: 2.7,
      repetitions: 3,
      intervalDays: 7,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'de-v2',
      track: 'workplace',
      word: 'Feierabend',
      romanization: '/Fai-er-ah-bent/',
      meaning: 'Thời khắc kết thúc ngày làm việc, nghỉ ngơi xả hơi',
      partOfSpeech: 'noun (der)',
      exampleSentence: 'Nach einem langen Arbeitstag freuen sich alle auf den wohlverdienten Feierabend.',
      exampleTranslation: 'Sau một ngày dài làm việc, ai cũng háo hức đón chờ giờ tan sở xứng đáng được nghỉ ngơi.',
      category: 'Đời sống Công sở',
      easeFactor: 2.6,
      repetitions: 4,
      intervalDays: 12,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    },
    {
      id: 'de-v3',
      track: 'daily',
      word: 'Gemütlichkeit',
      romanization: '/Ge-müt-likh-kayt/',
      meaning: 'Cảm giác ấm cúng, thư thái, an yên không chút vội vã',
      partOfSpeech: 'noun (die)',
      exampleSentence: 'Die gemütliche Atmosphäre in diesem Café lädt zum langen Verweilen ein.',
      exampleTranslation: 'Không khí ấm cúng, dễ chịu trong quán cà phê này khiến ai cũng muốn nán lại thật lâu.',
      category: 'Đời sống Thường nhật',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    }
  ],
  culturalTips: [
    {
      id: 'ct-de-1',
      topic: 'Văn hóa Giờ giấc & Sự Thẳng thắn (Direktheit)',
      rule: 'Người Đức nổi tiếng với sự đúng giờ tuyệt đối (Pünktlichkeit). Đến trễ dù chỉ 5 phút mà không báo trước bị coi là cực kỳ thiếu tôn trọng. Ngoài ra, người Đức rất thẳng thắn trong công việc; nếu bạn làm sai, họ sẽ chỉ thẳng vấn đề mà không vòng vo.',
      doText: 'Luôn có mặt trước giờ hẹn 5 phút. Đón nhận góp ý thẳng thắn như một cơ hội cải tiến nghiệp vụ.',
      dontText: 'Đừng tự ái cá nhân khi người Đức phê bình công việc trực diện.',
      essentialPhrase: 'Ich schätze Ihre ehrliche Rückmeldung sehr.',
      phraseTranslation: 'Tôi vô cùng trân trọng phản hồi chân thành và thẳng thắn của ngài.'
    },
    {
      id: 'ct-de-2',
      topic: 'Quy tắc Tách biệt Công việc và Đời tư (Feierabend)',
      rule: 'Ở Đức, ranh giới giữa giờ làm việc và thời gian cá nhân (Work-Life-Balance) được bảo vệ rất nghiêm ngặt. Khi đã "Feierabend" (hết giờ làm), không ai kỳ vọng bạn phải trả lời email hay điện thoại công việc cho đến sáng hôm sau.',
      doText: 'Tận dụng trọn vẹn thời gian Feierabend để tái tạo năng lượng cho ngày mới.',
      dontText: 'Đừng nhắn tin công việc không khẩn cấp cho đồng nghiệp vào tối muộn hay ngày Chủ Nhật.',
      essentialPhrase: 'Schönen Feierabend allerseits!',
      phraseTranslation: 'Chúc mọi người tan ca về nhà nghỉ ngơi vui vẻ nhé!'
    }
  ]
};
