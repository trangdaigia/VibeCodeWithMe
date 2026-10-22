import { LanguageCourse } from '../curriculum';

export const japaneseCourse: LanguageCourse = {
  id: 'japanese',
  name: 'Japanese',
  nativeName: '日本語 (Nihongo)',
  vietnameseName: 'Tiếng Nhật',
  flagEmoji: '🇯🇵',
  flagColor: '#e11d48',
  voiceLangCode: 'ja-JP',
  scriptType: 'Kanji, Hiragana & Katakana kèm Romaji',
  examInfo: [
    {
      examName: 'JLPT (Japanese-Language Proficiency Test - 日本語能力試験)',
      targetLevel: 'N3 - N2 - N1',
      overview: 'Chứng chỉ năng lực tiếng Nhật danh giá nhất thế giới do Quỹ Giao lưu Quốc tế Nhật Bản (Japan Foundation) cấp, là tiêu chuẩn bắt buộc cho visa kỹ sư, kỹ năng đặc định và du học đại học.',
      formatSections: [
        'Kiến thức ngôn ngữ (Từ vựng, Chữ Hán, Ngữ pháp) - 60 phút',
        'Đọc hiểu (Đoạn văn ngắn, trung bình, dài, tìm kiếm thông tin) - 50 phút',
        'Nghe hiểu (Nghe hiểu nhiệm vụ, hiểu điểm cốt lõi, phản xạ nhanh) - 50 phút'
      ],
      strategyTips: [
        'Phần Đọc N2/N1: Để ý các liên từ đảo ngược ý kiến như "しかし" (Shikashi - Tuy nhiên), "ところが" (Tokoroga), ý chính của tác giả thường nằm ngay phía sau.',
        'Phần Nghe: Luôn chú ý thì của động từ và các đuôi câu từ chối tế nhị (～ちょっと... / Chotto...) để không bị bẫy phương án ngược lại.',
        'Kỹ thuật phân biệt Kính ngữ (Keigo): Nhớ quy tắc bất biến: Tôn kính ngữ (Sonkeigo) nâng hành động của đối phương/khách hàng lên; Khiêm nhường ngữ (Kenjougo) hạ hành động của bản thân/công ty mình xuống.'
      ],
      sampleQuestions: [
        {
          question: 'JLPT N2 Ngữ pháp: "いくら忙しくても、健康管理を怠る______。"',
          passage: 'いくら忙しくても、健康管理を怠る______。(Ikura isogashikute mo, kenkou kanri o okotaru ______.)',
          options: [
            'わけにはいかない (wake ni wa ikanai - không thể vì lý do đạo đức/trách nhiệm)',
            'わけがない (wake ga nai - tuyệt đối không có lý nào)',
            'はずがない (hazu ga nai - chắc chắn không thể)',
            'にすぎない (ni suginai - chỉ là/chẳng qua là)'
          ],
          correctAnswer: 'わけにはいかない (wake ni wa ikanai - không thể vì lý do đạo đức/trách nhiệm)',
          explanationInVietnamese: 'Mẫu câu "V-ru + わけにはいかない" biểu thị: Dù có lý do gì thì vì lương tâm, trách nhiệm xã hội hoặc chuẩn mực đạo đức cũng KHÔNG THỂ làm việc đó. "Dù bận rộn đến mấy cũng không thể lơ là việc giữ gìn sức khỏe".'
        },
        {
          question: 'JLPT N2 Kính ngữ: Trả lời khách hàng hỏi Giám đốc Tanaka có ở đó không: "Tanaka wa tadaima, gaishutsu ______."',
          options: [
            'しております (shite orimasu - Khiêm nhường ngữ)',
            'なさっています (nasatte imasu - Tôn kính ngữ)',
            'されています (sarete imasu)',
            'おられます (oraremasu)'
          ],
          correctAnswer: 'しております (shite orimasu - Khiêm nhường ngữ)',
          explanationInVietnamese: 'Khi nói về người trong công ty mình (Tanaka) với khách hàng bên ngoài (soto), phải dùng Khiêm nhường ngữ (Kenjougo: しております) để hạ thấp bên mình, tôn trọng đối tác bên ngoài.'
        },
        {
          question: 'JLPT N3 Từ vựng: "このプロジェクトは、関係者全員の協力の______成り立っている。"',
          options: [
            'もとで (moto de - dưới sự)',
            'かわりに (kawari ni - thay vì)',
            'せいで (sei de - tại vì mang nghĩa tiêu cực)',
            'うちに (uchi ni - trong khi)'
          ],
          correctAnswer: 'もとで (moto de - dưới sự)',
          explanationInVietnamese: 'Cấu trúc "N + のもとで" mang ý nghĩa "dưới sự... / dựa trên sự...": Dự án này thành công là dưới sự chung tay hợp tác của tất cả các bên liên quan.'
        }
      ]
    }
  ],
  units: [
    {
      id: 'ja-u1',
      number: 1,
      track: 'daily',
      title: 'Giao tiếp Đời sống & Văn hóa Cúi chào (Ojigi)',
      description: 'Chào hỏi hàng ngày, xưng hô lịch sự bằng thể Lịch sự Teinei (Desu/Masu) và các câu cảm ơn xin lỗi chuẩn phong cách Nhật.',
      cefrLevel: 'A1 - A2 (N5 - N4)',
      lessons: [
        {
          id: 'ja-l1',
          track: 'daily',
          title: 'Chào hỏi Hàng ngày & Lời chào Cửa miệng',
          description: 'Phân biệt Ohayou gozaimasu, Konnichiwa, Konbanwa và cách đáp lễ cúi đầu Ojigi.',
          durationMinutes: 4,
          xpReward: 30,
          exercises: [
            {
              id: 'ja-e1',
              type: 'flashcard',
              prompt: 'Mẫu câu chào lần đầu gặp gỡ và nhờ vả giúp đỡ',
              targetText: '初めまして、どうぞよろしくお願いいたします。(Hajimemashite, douzo yoroshiku onegai itashimasu.)',
              romanization: 'Hajimemashite, douzo yoroshiku onegai itashimasu.',
              vietnameseMeaning: 'Lần đầu tiên được gặp bạn, rất mong nhận được sự chỉ giáo và giúp đỡ từ bạn.',
              audioText: '初めまして、どうぞよろしくお願いいたします。',
              explanation: '"Hajimemashite" bắt nguồn từ chữ "Sơ" (bắt đầu). Đuôi "onegai itashimasu" là khiêm nhường ngữ lịch sự bậc cao.',
              culturalNote: 'Khi nói câu này, hãy nghiêng người cúi chào góc 30 độ (Eshaku / Keirei), giữ lưng thẳng.'
            },
            {
              id: 'ja-e2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi là kỹ sư phần mềm đến từ Việt Nam."',
              targetText: 'ベトナムから参りましたソフトウェアエンジニアです。(Betonamu kara mairimashita sofutowea enjinia desu.)',
              wordTokens: ['ベトナムから', '参りました', 'ソフトウェア', 'エンジニアです。', '日本人', '明日'],
              explanation: '"参りました" (mairimashita) là khiêm nhường ngữ của "kimasu" (đến), thể hiện sự khiêm tốn chuẩn mực.'
            },
            {
              id: 'ja-e3',
              type: 'quiz_choice',
              prompt: 'Khi muốn xin phép đi ngang qua, gọi bồi bàn hoặc xin lỗi nhẹ nhàng, người Nhật dùng từ nào nhiều nhất?',
              options: [
                'すみません (Sumimasen)',
                'さようなら (Sayounara)',
                'どういたしまして (Douitashimashite)',
                'じゃあね (Jaa ne)'
              ],
              correctAnswer: 'すみません (Sumimasen)',
              explanation: '"Sumimasen" là từ đa năng bậc nhất trong tiếng Nhật: vừa là "Xin lỗi", vừa là "Cảm ơn vì đã nhọc công", vừa là "Xin phép bồi bàn".'
            }
          ]
        },
        {
          id: 'ja-l2',
          track: 'daily',
          title: 'Ẩm thực Quán ăn & Mua đồ tại Cửa hàng Tiện lợi (Konbini)',
          description: 'Cách gọi món tại quán Teishoku/Ramen, nói Itadakimasu, xin nước lọc và mua đồ ở 7-Eleven/Lawson.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'ja-e4',
              type: 'flashcard',
              prompt: 'Câu nói trước và sau khi ăn trong văn hóa ẩm thực Nhật Bản',
              targetText: 'いただきます / ごちそうさまでした (Itadakimasu / Gochisousama deshita)',
              romanization: 'Itadakimasu / Gochisousama deshita',
              vietnameseMeaning: 'Tôi xin phép dùng bữa (trước khi ăn) / Cảm ơn vì bữa ăn thịnh soạn (sau khi ăn).',
              audioText: 'いただきます。ごちそうさまでした。',
              explanation: '"Itadakimasu" mang ý nghĩa biết ơn sinh mệnh của các nguyên liệu và công lao người nấu.',
              culturalNote: 'Trước khi ăn, người Nhật chắp hai tay trước ngực và nói Itadakimasu với lòng biết ơn.'
            },
            {
              id: 'ja-e5',
              type: 'fill_blank',
              prompt: 'Điền trợ từ thích hợp: "お水______一杯いただけますか。(Cho tôi xin một cốc nước lọc được không?)"',
              options: ['を (o)', 'に (ni)', 'で (de)', 'へ (e)'],
              correctAnswer: 'を (o)',
              explanation: 'Trợ từ "を" đứng sau danh từ tân ngữ chịu tác động của hành động xin/nhận (お水をいただけますか).'
            }
          ]
        }
      ]
    },
    {
      id: 'ja-u2',
      number: 2,
      track: 'daily',
      title: 'Đi Tàu Điện & Hỏi Đường Tại Tokyo',
      description: 'Nắm vững cách đi tuyến Yamanote, chuyển ga (Norikae), nạp thẻ Suica/Pasmo và hỏi đường khi lạc.',
      cefrLevel: 'A2 - B1 (N4)',
      lessons: [
        {
          id: 'ja-l3',
          track: 'daily',
          title: 'Hỏi Đường & Chuyển Ga Tàu Điện Ngầm',
          description: 'Mẫu câu hỏi đường cảnh sát bốt Kouban, hỏi tàu chạy về hướng nào và ga đến.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'ja-e6',
              type: 'flashcard',
              prompt: 'Mẫu câu hỏi đường lịch sự',
              targetText: 'すみません、東京駅へはどう行けばいいですか。(Sumimasen, Toukyou-eki e wa dou ikeba ii desu ka?)',
              romanization: 'Sumimasen, Toukyou-eki e wa dou ikeba ii desu ka?',
              vietnameseMeaning: 'Xin lỗi, làm ơn cho tôi hỏi làm thế nào để đi đến ga Tokyo ạ?',
              audioText: 'すみません、東京駅へはどう行けばいいですか。',
              explanation: '"～へはどう行けばいいですか" là mẫu câu tiêu chuẩn để hỏi phương tiện và lộ trình di chuyển.',
              culturalNote: 'Nếu bị lạc ở Nhật, hãy tìm bốt cảnh sát "交番 (Kouban)" gần nhất để được chỉ bản đồ tận tình.'
            },
            {
              id: 'ja-e7',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Chuyến tàu này có dừng ở ga Shinjuku không?"',
              targetText: 'この電車は新宿駅に止まりますか。(Kono densha wa Shinjuku-eki ni tomarimasu ka?)',
              wordTokens: ['この電車は', '新宿駅に', '止まりますか。', '新幹線', '飛行機'],
              explanation: '"止まります" (tomarimasu) có nghĩa là dừng lại (ở ga/trạm).'
            }
          ]
        },
        {
          id: 'ja-l3b',
          track: 'daily',
          title: 'Khám Bệnh Tại Phòng Khám & Mua Thuốc (病院と薬局)',
          description: 'Cách miêu tả triệu chứng sốt, đau họng, trình thẻ bảo hiểm y tế Hokenshou và mua thuốc theo toa.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'ja-e7b',
              type: 'flashcard',
              prompt: 'Mẫu câu miêu tả triệu chứng tại phòng khám Nhật',
              targetText: '昨日の夜から熱があって、喉も痛みます。(Kinou no yoru kara netsu ga atte, nodo mo itamimasu.)',
              romanization: 'Kinou no yoru kara netsu ga atte, nodo mo itamimasu.',
              vietnameseMeaning: 'Từ tối hôm qua tôi bị sốt và cổ họng cũng rất đau nữa.',
              audioText: '昨日の夜から熱があって、喉も痛みます。',
              explanation: '"熱がある" (có sốt) và "喉が痛む" (đau họng) là cách diễn đạt tự nhiên khi khai phiếu hỏi bệnh (Monshinhyou).',
              culturalNote: 'Ở Nhật, khi đi khám bệnh luôn cần mang theo Thẻ bảo hiểm sức khỏe quốc dân (Hokenshou / My Number Card).'
            },
            {
              id: 'ja-e7c',
              type: 'fill_blank',
              prompt: 'Điền trợ từ: "この薬は食後______飲んでください。(Thuốc này hãy uống sau bữa ăn nhé.)"',
              options: ['に (ni)', 'で (de)', 'を (o)', 'へ (e)'],
              correctAnswer: 'に (ni)',
              explanation: 'Chỉ thời điểm thực hiện hành động: "食後に" (sau bữa ăn).'
            }
          ]
        }
      ]
    },
    {
      id: 'ja-u3',
      number: 3,
      track: 'workplace',
      title: 'Môi Trường Công Sở Nhật & Kính Ngữ Keigo Thực Chiến',
      description: 'Làm chủ Kính ngữ (Keigo), viết Business Email chuẩn quy tắc Nhật Bản và thực hiện văn hóa Hō-Ren-Sō.',
      cefrLevel: 'B1 - B2 (N3 - N2)',
      lessons: [
        {
          id: 'ja-l4',
          track: 'workplace',
          title: 'Kính Ngữ Keigo trong Giao tiếp Công việc',
          description: 'Phân biệt Tôn kính ngữ (Sonkeigo) cho khách hàng và Khiêm nhường ngữ (Kenjougo) cho bản thân.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'ja-e8',
              type: 'flashcard',
              prompt: 'Mẫu câu Khiêm nhường ngữ khi tiếp nhận yêu cầu từ đối tác',
              targetText: 'かしこまりました。承知いたしました。(Kashikomarimashita. Shouchi itashimashita.)',
              romanization: 'Kashikomarimashita. Shouchi itashimashita.',
              vietnameseMeaning: 'Tôi đã hiểu rõ và xin tuân mệnh thực hiện ngay ạ.',
              audioText: 'かしこまりました。承知いたしました。',
              explanation: 'Tuyệt đối không dùng "了解しました (Ryoukai shimashita)" với cấp trên hoặc khách hàng vì mang sắc thái ngang hàng.',
              culturalNote: 'Trong môi trường công sở Nhật Bản, đây là thước đo độ trưởng thành nghiệp vụ của nhân viên.'
            },
            {
              id: 'ja-e9',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Xin cảm ơn quý công ty vì luôn luôn chiếu cố giúp đỡ."',
              targetText: 'いつも大変お世話になっております。(Itsumo taihen osewa ni natte orimasu.)',
              wordTokens: ['いつも', '大変', 'お世話に', 'なっております。', 'ごめんなさい', '明日'],
              explanation: 'Câu chào đầu thư và đầu cuộc điện thoại bất hủ không thể thiếu trong thương trường Nhật.'
            }
          ]
        },
        {
          id: 'ja-l5',
          track: 'workplace',
          title: 'Viết Business Mail chuẩn phong cách Nhật',
          description: 'Cấu trúc thư điện tử công việc: Tiêu đề rõ ràng, lời chào đối tác, nội dung cô đọng và lời kết lịch thiệp.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'ja-e10',
              type: 'flashcard',
              prompt: 'Mẫu câu kết thư công việc trang trọng nhất',
              targetText: '何卒よろしくお願い申し上げます。(Nanitozo yoroshiku onegai moushiagemasu.)',
              romanization: 'Nanitozo yoroshiku onegai moushiagemasu.',
              vietnameseMeaning: 'Kính mong nhận được sự hợp tác và giúp đỡ quý báu từ quý ngài.',
              audioText: '何卒よろしくお願い申し上げます。',
              explanation: '"何卒 (Nanitozo)" nhấn mạnh sự tha thiết, lịch thiệp ở mức độ cao nhất.',
              culturalNote: 'Là dòng kết thúc tiêu chuẩn trước khi ký tên trong mọi email gửi khách hàng Nhật.'
            },
            {
              id: 'ja-e11',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "添付資料を______の上、ご確認いただけますでしょうか。(Kính mong quý ngài xem xét tài liệu đính kèm.)"',
              options: ['ご査収 (gosashuu)', '見る (miru)', '読む (yomu)', '買う (kau)'],
              correctAnswer: 'ご査収 (gosashuu)',
              explanation: '"ご査収の上" (gosashuu no ue) là thuật ngữ Hán Nhật chuyên ngành thương mại, nghĩa là kiểm tra kỹ tài liệu gửi kèm.'
            }
          ]
        },
        {
          id: 'ja-l5b',
          track: 'workplace',
          title: 'Nghe & Gọi Điện Thoại Doanh Nghiệp (電話対応)',
          description: 'Quy tắc nhấc máy trong 3 hồi chuông, xác nhận tên đối tác và chuyển máy lịch sự.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'ja-e11b',
              type: 'flashcard',
              prompt: 'Mẫu câu nhấc máy điện thoại công ty chuẩn mực',
              targetText: 'お電話ありがとうございます。ABC株式会社のグエンでございます。(Odenwa arigatou gozaimasu. ABC kabushikigaisha no Guen de gozaimasu.)',
              romanization: 'Odenwa arigatou gozaimasu. ABC kabushikigaisha no Guen de gozaimasu.',
              vietnameseMeaning: 'Cảm ơn quý khách đã gọi điện. Tôi là Nguyễn, thuộc Công ty Cổ phần ABC xin nghe ạ.',
              audioText: 'お電話ありがとうございます。ABC株式会社のグエンでございます。',
              explanation: 'Dùng "～でございます" (Khiêm nhường ngữ của Desu) khi xưng danh qua điện thoại công sở.',
              culturalNote: 'Người Nhật luôn để đối tác hoặc khách hàng cúp máy trước rồi mới nhẹ nhàng đặt ống nghe xuống.'
            },
            {
              id: 'ja-e11c',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Xin ngài vui lòng chờ trong giây lát."',
              targetText: '少々お待ちいただけますでしょうか。(Shoushou omachi itadakemasu deshou ka?)',
              wordTokens: ['少々', 'お待ちいただけます', 'でしょうか。', '早い', '帰る'],
              explanation: '"少々お待ちください" hoặc mức cao hơn là "少々お待ちいただけますでしょうか" là câu xin phép chờ chuẩn kính ngữ.'
            }
          ]
        }
      ]
    },
    {
      id: 'ja-u4',
      number: 4,
      track: 'workplace',
      title: 'Bí Quyết Phỏng Vấn Tuyển Dụng Công Ty Nhật (Mensetsu)',
      description: 'Luyện tập quy trình gõ cửa, câu chào Shitsurei shimasu, bài nói Jikoshoukai và PR bản thân thuyết phục.',
      cefrLevel: 'B2 (N2 - N1)',
      lessons: [
        {
          id: 'ja-l6',
          track: 'workplace',
          title: 'Quy trình Vào phòng & Mở đầu Phỏng vấn',
          description: 'Quy tắc gõ cửa 3 tiếng, nói "Shitsurei shimasu" và tự giới thiệu bản thân trong 1 phút.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'ja-e12',
              type: 'flashcard',
              prompt: 'Câu nói khi bước vào phòng phỏng vấn',
              targetText: '失礼いたします。本日は貴重なお時間をいただき、誠にありがとうございます。(Shitsurei itashimasu. Honjitsu wa kichou na ojikan o itadaki, makoto ni arigatou gozaimasu.)',
              romanization: 'Shitsurei itashimasu. Honjitsu wa kichou na ojikan o itadaki, makoto ni arigatou gozaimasu.',
              vietnameseMeaning: 'Xin phép được vào phòng. Thật lòng cảm ơn quý vị hôm nay đã dành thời gian quý báu cho tôi.',
              audioText: '失礼いたします。本日は貴重なお時間をいただき、誠にありがとうございます。',
              explanation: 'Gõ cửa đúng 3 tiếng (gõ 2 tiếng là gõ cửa nhà vệ sinh). Bước vào, đóng cửa nhẹ nhàng không quay lưng hoàn toàn vào giám khảo.',
              culturalNote: 'Chỉ ngồi xuống ghế sau khi giám khảo nói "どうぞお掛けください (Douzo okake kudasai)".'
            },
            {
              id: 'ja-e13',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu phỏng vấn: "Điểm mạnh của tôi là tinh thần trách nhiệm và khả năng làm việc nhóm."',
              targetText: '私の強みは責任感とチームワークの良さです。(Watashi no tsuyomi wa sekininkan to chiimuwāku no yosa desu.)',
              wordTokens: ['私の強みは', '責任感と', 'チームワークの', '良さです。', '欠点', '嫌い'],
              explanation: '"強み" (tsuyomi) là điểm mạnh; "責任感" (sekininkan) là tinh thần trách nhiệm.'
            }
          ]
        },
        {
          id: 'ja-l7',
          track: 'workplace',
          title: 'Trả Lời Động Lực Ứng Tuyển (Shibou Douki) & Hỏi Ngược Lại',
          description: 'Cách giải thích lý do tại sao chọn công ty này mà không phải công ty khác, và đặt câu hỏi ngược lại (Gyakushitsumon).',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'ja-e14',
              type: 'flashcard',
              prompt: 'Mẫu câu nêu động lực ứng tuyển sắc bén',
              targetText: '御社の革新的な技術力と企業理念に深く共感し、志望いたしました。(Onsha no kakushinteki na gijutsuryoku to kigyou rinen ni fukaku kyoukan shi, shibou itashimashita.)',
              romanization: 'Onsha no kakushinteki na gijutsuryoku to kigyou rinen ni fukaku kyoukan shi, shibou itashimashita.',
              vietnameseMeaning: 'Tôi vô cùng đồng cảm với năng lực công nghệ đổi mới sáng tạo và triết lý kinh doanh của Quý công ty, vì thế tôi tha thiết ứng tuyển.',
              audioText: '御社の革新的な技術力と企業理念に深く共感し、志望いたしました。',
              explanation: 'Khi nói về công ty đang phỏng vấn: Dùng "御社 (Onsha)" khi nói phỏng vấn trực tiếp, dùng "貴社 (Kisha)" khi viết CV/Email.',
              culturalNote: 'Người Nhật cực kỳ coi trọng "企業理念" (Kigyou rinen - triết lý doanh nghiệp).'
            },
            {
              id: 'ja-e15',
              type: 'quiz_choice',
              prompt: 'Cuối buổi phỏng vấn khi người phỏng vấn hỏi: "何か質問はありますか？ (Bạn có câu hỏi nào cho chúng tôi không?)", câu trả lời nào tạo ấn tượng chuyên nghiệp nhất?',
              options: [
                '入社までにさらに勉強しておくべき専門知識や技術はありますか。(Tôi nên trau dồi thêm kiến thức chuyên môn hay công nghệ nào trước ngày vào làm ạ?)',
                '特にありません。(Dạ tôi không có câu hỏi nào hết).',
                '残業は毎日何時間ありますか。(Mỗi ngày phải làm thêm OT mấy tiếng ạ?)',
                '有給休暇はすぐ取れますか。(Tôi có được nghỉ phép năm có lương ngay không?)'
              ],
              correctAnswer: '入社までにさらに勉強しておくべき専門知識や技術はありますか。(Tôi nên trau dồi thêm kiến thức chuyên môn hay công nghệ nào trước ngày vào làm ạ?)',
              explanation: 'Câu hỏi này thể hiện tinh thần cầu tiến, sẵn sàng chuẩn bị ngay từ bây giờ để đóng góp cho công ty.'
            }
          ]
        }
      ]
    }
  ],
  scenarios: [
    {
      id: 'ja-interview',
      track: 'workplace',
      title: 'Phỏng Vấn Công Ty Công Nghệ Thông Tin Tokyo',
      context: 'Bạn đang ứng tuyển vị trí Kỹ sư cầu nối (BrSE / Software Engineer) với Trưởng phòng Kỹ thuật người Nhật.',
      location: 'Trụ sở Roppongi Hills, Tokyo',
      characterName: 'Sato Kenji (佐藤 健司)',
      characterRole: 'Kỹ sư trưởng & Trưởng ban Tuyển dụng (技術部長)',
      characterAvatar: '👔',
      starterMessage: {
        text: '本日はお越しいただきありがとうございます。どうぞお掛けください。まずは自己紹介を1分程度でお願いできますでしょうか。',
        romanization: 'Honjitsu wa okoshi itadaki arigatou gozaimasu. Douzo okake kudasai. Mazu wa jikoshoukai o...',
        vietnameseTranslation: 'Cảm ơn bạn đã đến hôm nay. Xin mời ngồi. Trước tiên, bạn có thể tự giới thiệu bản thân trong khoảng 1 phút được không?'
      },
      objectives: [
        'Cúi chào và nói "失礼いたします (Shitsurei itashimasu)" trước khi ngồi',
        'Tự giới thiệu bản thân rõ ràng kèm kinh nghiệm dự án IT',
        'Sử dụng kính ngữ chuẩn mực xuyên suốt buổi phỏng vấn'
      ]
    },
    {
      id: 'ja-ramen',
      track: 'daily',
      title: 'Gọi Món tại Quán Ramen Ichiran Shinjuku',
      context: 'Bạn bước vào quán mì Ramen nổi tiếng tại Shinjuku, chọn độ cứng của sợi mì và xin thêm nước dùng.',
      location: 'Quán Ramen Shinjuku, Tokyo',
      characterName: 'Takahashi',
      characterRole: 'Bếp trưởng quán Ramen',
      characterAvatar: '🍜',
      starterMessage: {
        text: 'いらっしゃいませ！食券をお預かりします。麺のかたさはどうなさいますか？',
        romanization: 'Irasshaimase! Shokken o oazukari shimasu. Men no katasa wa dou nasaimasu ka?',
        vietnameseTranslation: 'Kính chào quý khách! Tôi xin phép nhận phiếu ăn. Độ cứng của sợi mì quý khách muốn thế nào ạ?'
      },
      objectives: [
        'Chọn độ cứng của sợi mì (かため / Katame - sợi mì dai cứng hoặc ふつう / Futsuu - vừa)',
        'Yêu cầu độ cay thích hợp (辛さなし / Karasa nashi hoặc 少なめ / Sukuname)',
        'Gọi thêm vắt mì gọi là Kaedama (替え玉をお願いします)'
      ]
    }
  ],
  vocabCards: [
    {
      id: 'ja-v1',
      track: 'workplace',
      word: '報連相 (Hō-Ren-Sō)',
      romanization: 'Hō-Ren-Sō (Houkoku - Renraku - Soudan)',
      meaning: 'Nguyên tắc vàng công sở Nhật: Báo cáo - Liên lạc - Thảo luận',
      partOfSpeech: 'noun',
      exampleSentence: '新入社員にとって、徹底した報連相が最も重要です。',
      exampleTranslation: 'Đối với nhân viên mới, việc thực hiện triệt để nguyên tắc Hō-Ren-Sō là điều quan trọng nhất.',
      category: 'Văn hóa Doanh nghiệp Nhật',
      easeFactor: 2.7,
      repetitions: 3,
      intervalDays: 7,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'ja-v2',
      track: 'workplace',
      word: '納期 (Nouki)',
      romanization: 'Nouki',
      meaning: 'Thời hạn bàn giao hàng hóa hoặc dự án (Deadline)',
      partOfSpeech: 'noun',
      exampleSentence: '何があっても納期を厳守しなければなりません。',
      exampleTranslation: 'Dù có bất kỳ chuyện gì xảy ra cũng phải tuân thủ nghiêm ngặt thời hạn bàn giao dự án.',
      category: 'Quản lý Công việc',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'ja-v3',
      track: 'daily',
      word: '遠慮 (Enryo)',
      romanization: 'Enryo',
      meaning: 'Khách khí, ngại ngùng, giữ kẽ để ý người khác',
      partOfSpeech: 'noun / suru-verb',
      exampleSentence: 'どうぞご遠慮なくお召し上がりください。',
      exampleTranslation: 'Xin mời quý khách dùng bữa tự nhiên, đừng khách khí ngần ngại.',
      category: 'Đời sống & Xã giao',
      easeFactor: 2.6,
      repetitions: 4,
      intervalDays: 14,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    }
  ],
  culturalTips: [
    {
      id: 'ct-ja-1',
      topic: 'Văn hóa Giờ giấc: Quy tắc 5 phút trước (5分前行動)',
      rule: 'Ở Nhật Bản, đến "đúng giờ" (ví dụ hẹn 9:00 đến lúc 9:00) thực chất bị coi là muộn. Chuẩn mực xã hội là luôn có mặt trước 5 đến 10 phút để chuẩn bị tinh thần và trang phục chỉn chu.',
      doText: 'Đến trước giờ hẹn 5 - 10 phút. Nếu dự kiến muộn dù chỉ 1 phút, lập tức gọi điện báo trước.',
      dontText: 'Đừng bao giờ đến trễ mà không báo trước hoặc xem nhẹ việc trễ 2-3 phút.',
      essentialPhrase: '電車が遅延しており、10分ほど遅れそうです。申し訳ございません。',
      phraseTranslation: 'Do tàu điện bị trễ chuyến nên tôi có thể sẽ đến muộn khoảng 10 phút. Thật lòng xin thứ lỗi.'
    },
    {
      id: 'ct-ja-2',
      topic: 'Quy tắc Trao Danh thiếp Meishi Koukan (名刺交換)',
      rule: 'Trao danh thiếp bằng hai tay, hướng chữ về phía đối phương đọc được, nhận danh thiếp bằng hai tay và đặt cẩn thận trên hộp danh thiếp trong suốt cuộc họp, tuyệt đối không nhét ngay vào túi quần sau.',
      doText: 'Dùng hai tay cầm hai góc danh thiếp, cúi đầu nhẹ và nói tên công ty.',
      dontText: 'Không bao giờ viết chữ hay ghi chú trực tiếp lên danh thiếp của đối tác.',
      essentialPhrase: '頂戴いたします。(Choudai itashimasu.)',
      phraseTranslation: 'Tôi xin phép được nhận danh thiếp của ngài.'
    }
  ]
};
