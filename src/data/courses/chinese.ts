import { LanguageCourse } from '../curriculum';

export const chineseCourse: LanguageCourse = {
  id: 'chinese',
  name: 'Chinese (Mandarin)',
  nativeName: '中文 (Zhōngwén)',
  vietnameseName: 'Tiếng Trung (Quan Thoại)',
  flagEmoji: '🇨🇳',
  flagColor: '#dc2626',
  voiceLangCode: 'zh-CN',
  scriptType: 'Chữ Hán giản thể & Pinyin',
  examInfo: [
    {
      examName: 'HSK (Hànyǔ Shuǐpíng Kǎoshì - 汉语水平考试)',
      targetLevel: 'HSK 3 - HSK 5 / HSKK',
      overview: 'Hệ thống kỳ thi năng lực tiếng Hán tiêu chuẩn quốc tế do Bộ Giáo dục Trung Quốc tổ chức, là điều kiện tiên quyết xin học bổng du học CSC và ứng tuyển các tập đoàn FDI Trung Quốc.',
      formatSections: [
        'HSK 4: Nghe hiểu (45 câu - 30 phút), Đọc hiểu (40 câu - 40 phút), Viết (15 câu - 25 phút)',
        'HSK 5: Nghe hiểu (45 câu - 30 phút), Đọc hiểu (45 câu - 45 phút), Viết bài luận (10 câu - 40 phút)',
        'HSKK Trung/Cao cấp: Thi nói thu âm máy tính đánh giá phát âm, phản xạ và thuyết trình theo chủ đề'
      ],
      strategyTips: [
        'Kỹ thuật phân biệt Âm Hán Việt: Rất nhiều từ tiếng Trung có âm tương đồng với Hán Việt (Ví dụ: 国家 Guójiā = Quốc gia, 发展 Fāzhǎn = Phát triển, 经济 Jīngjì = Kinh tế). Tận dụng lợi thế này giúp người Việt nhớ từ nhanh gấp 3 lần!',
        'Phần Đọc HSK 4-5: Đọc câu hỏi và các phương án trước để khoanh vùng từ khóa trong đoạn văn, không cố dịch từng chữ Hán chưa học.',
        'Phần Viết HSK: Nắm chắc ngữ pháp câu chữ "把" (Bǎ) và câu chữ "被" (Bèi), vì đây là cấu trúc xuất hiện trong 80% đề thi sắp xếp câu.'
      ],
      sampleQuestions: [
        {
          question: 'HSK 4 Đọc hiểu: "虽然这次比赛我们没有拿到第一名，但是大家学到了很多宝贵的经验。"',
          passage: '虽然这次比赛我们没有拿到第一名，但是大家学到了很多宝贵的经验。(Suīrán zhè cì bǐsài wǒmen méiyǒu nádào dì-yī míng, dànshì dàjiā xuédàole hěnduō bǎoguì de jīngyàn.)',
          options: [
            'Tuy không đạt giải nhất nhưng cả đội đã tích lũy được nhiều kinh nghiệm quý báu.',
            'Cả đội đã giành giải nhất và rất tự hào.',
            'Trận đấu bị hoãn do thời tiết xấu.',
            'Mọi người đều thất vọng và không học được gì.'
          ],
          correctAnswer: 'Tuy không đạt giải nhất nhưng cả đội đã tích lũy được nhiều kinh nghiệm quý báu.',
          explanationInVietnamese: 'Cặp liên từ chỉ sự nhượng bộ kinh điển trong HSK: "虽然...但是..." (Tuy... nhưng...). "宝贵的经验" (Bǎoguì de jīngyàn) nghĩa là "kinh nghiệm quý báu".'
        },
        {
          question: 'HSK 4 Sắp xếp câu: Chọn thứ tự đúng cho cấu trúc chữ "把": [我已经] [把这份合同] [仔细检查了] [一遍]',
          options: [
            '我已经把这份合同仔细检查了一遍。',
            '我把已经仔细检查了一遍这份合同。',
            '仔细检查了一遍我已经把这份合同。',
            '合同我已经把仔细检查了一遍。'
          ],
          correctAnswer: '我已经把这份合同仔细检查了一遍。',
          explanationInVietnamese: 'Công thức câu chữ 把 chuẩn mực: Chủ ngữ (我) + Trạng từ/Phó từ (已经) + 把 + Tân ngữ chịu tác động (这份合同) + Động từ (仔细检查) + Bổ ngữ (了一遍).'
        },
        {
          question: 'HSK 5 Từ vựng: "经过双方的友好协商，我们终于______了合作意向书。"',
          options: ['签署 (qiānshǔ)', '签字 (qiānzì)', '写作 (xiězuò)', '登记 (dēngjì)'],
          correctAnswer: '签署 (qiānshǔ)',
          explanationInVietnamese: '"签署" (qiānshǔ - Ký kết) là từ trang trọng chuyên dùng với văn bản pháp lý, hợp đồng, thỏa thuận (签署合同/协议/意向书). Trong khi "签字" mang tính khẩu ngữ thông thường hơn.'
        }
      ]
    }
  ],
  units: [
    {
      id: 'zh-u1',
      number: 1,
      track: 'daily',
      title: 'Giao tiếp Đời sống & Làm quen Cơ bản',
      description: 'Học cách xưng hô chuẩn, chào hỏi tự nhiên, giới thiệu bản thân bằng tiếng Hán giản thể và hệ phiên âm Pinyin chuẩn.',
      cefrLevel: 'HSK 1 - HSK 2',
      lessons: [
        {
          id: 'zh-l1',
          track: 'daily',
          title: 'Chào hỏi & Giới thiệu bản thân cơ bản',
          description: 'Cách mở đầu trò chuyện bằng tiếng Trung, xưng hô lịch sự với người lớn tuổi và bạn bè.',
          durationMinutes: 4,
          xpReward: 30,
          exercises: [
            {
              id: 'zh-e1',
              type: 'flashcard',
              prompt: 'Cách chào hỏi lịch sự và tôn trọng người đối diện',
              targetText: '您好！很高兴认识您。(Nín hǎo! Hěn gāoxìng rènshí nín.)',
              romanization: 'Nín hǎo! Hěn gāoxìng rènshí nín.',
              vietnameseMeaning: 'Chào ngài/bác! Rất vui được quen biết ngài.',
              audioText: '您好！很高兴认识您。',
              explanation: '"您" (Nín) là đại từ nhân xưng ngôi thứ hai số ít mang tính kính trọng cao hơn "你" (Nǐ).',
              culturalNote: 'Trong văn hóa Trung Hoa, dùng "您" khi gặp người lớn tuổi, thầy cô, đối tác kinh doanh hoặc cấp trên.'
            },
            {
              id: 'zh-e2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi là người Việt Nam, tôi đến từ Hà Nội."',
              targetText: '我是越南人，我来自河内。(Wǒ shì Yuènán rén, wǒ láizì Hénèi.)',
              wordTokens: ['我是', '越南人，', '我来自', '河内。', '北京', '喜欢'],
              explanation: '"来自" (láizì) có nghĩa là đến từ (nguồn gốc, quê quán).'
            },
            {
              id: 'zh-e3',
              type: 'quiz_choice',
              prompt: 'Khi muốn hỏi người khác họ gì một cách lịch thiệp và tôn trọng nhất, bạn dùng câu nào?',
              options: [
                '请问您贵姓？(Qǐngwèn nín guìxìng?)',
                '你叫什么名字？(Nǐ jiào shénme míngzì?)',
                '你是谁？(Nǐ shì shéi?)',
                '喂，叫什么？(Wèi, jiào shénme?)'
              ],
              correctAnswer: '请问您贵姓？(Qǐngwèn nín guìxìng?)',
              explanation: '"贵姓" (Quý tính - Họ quý giá) là câu hỏi họ lịch thiệp bậc nhất trong văn hóa giao tiếp Trung Quốc.'
            }
          ]
        },
        {
          id: 'zh-l2',
          track: 'daily',
          title: 'Hỏi thăm Sức khỏe, Gia đình & Công việc',
          description: 'Mở rộng câu chuyện thường ngày, hỏi thăm tình hình gần đây của bạn bè và đồng nghiệp.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'zh-e4',
              type: 'flashcard',
              prompt: 'Cách hỏi thăm tình hình gần đây',
              targetText: '你最近工作忙不忙？(Nǐ zuìjìn gōngzuò máng bù máng?)',
              romanization: 'Nǐ zuìjìn gōngzuò máng bù máng?',
              vietnameseMeaning: 'Dạo này công việc của bạn có bận rộn không?',
              audioText: '你最近工作忙不忙？',
              explanation: 'Cấu trúc câu hỏi chính phản: Tính từ + 不 + Tính từ (忙不忙 = có bận không).',
              culturalNote: 'Người Trung Quốc hay mở đầu bằng "你吃了吗?" (Bạn đã ăn cơm chưa?) hoặc "最近忙什么呢?"'
            },
            {
              id: 'zh-e5',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "我还好，______挺顺利的。 (Tôi vẫn ổn, mọi thứ đều khá thuận lợi.)"',
              options: ['一切 (yíqiè)', '什么 (shénme)', '怎样 (zěnyàng)', '哪儿 (nǎr)'],
              correctAnswer: '一切 (yíqiè)',
              explanation: '"一切" (Yíqiè - Nhất thiết) nghĩa là toàn bộ, tất cả mọi việc (一切挺顺利的 = mọi sự đều thuận buồm xuôi gió).'
            }
          ]
        }
      ]
    },
    {
      id: 'zh-u2',
      number: 2,
      track: 'daily',
      title: 'Ẩm thực, Đi Nhà hàng & Thanh toán Điện tử',
      description: 'Gọi món lẩu Tứ Xuyên, vịt quay Bắc Kinh, xin hóa đơn và quét mã QR WeChat Pay / Alipay.',
      cefrLevel: 'HSK 2 - HSK 3',
      lessons: [
        {
          id: 'zh-l3',
          track: 'daily',
          title: 'Gọi món ăn & Hương vị tại Nhà hàng Trung',
          description: 'Cách gọi món, yêu cầu giảm độ cay (微辣), không bỏ rau mùi (不要香菜) và xin trà nóng.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'zh-e6',
              type: 'flashcard',
              prompt: 'Mẫu câu cứu cánh khi không ăn được quá cay',
              targetText: '服务员，我们要微辣，不要香菜。(Fúwùyuán, wǒmen yào wēilà, búyào xiāngcài.)',
              romanization: 'Fúwùyuán, wǒmen yào wēilà, búyào xiāngcài.',
              vietnameseMeaning: 'Phục vụ ơi, chúng tôi lấy vị ít cay thôi, và không cho rau mùi (ngò rí) nhé.',
              audioText: '服务员，我们要微辣，不要香菜。',
              explanation: '"微辣" (wēilà - vi lạt) = cay nhẹ; "香菜" (xiāngcài) = rau ngò/mùi.',
              culturalNote: 'Đồ ăn vùng Tứ Xuyên và Hồ Nam rất cay nồng hạt tiêu hoa tiêu tê lưỡi (麻辣 málà).'
            },
            {
              id: 'zh-e7',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Cho chúng tôi xem thực đơn một chút."',
              targetText: '请给我们看一下菜单。(Qǐng gěi wǒmen kàn yíxià càidān.)',
              wordTokens: ['请给', '我们', '看一下', '菜单。', '结账', '米饭'],
              explanation: '"看一下" (kàn yíxià) biểu thị hành động diễn ra trong chốc lát, mang ngữ khí nhẹ nhàng lịch sự.'
            }
          ]
        },
        {
          id: 'zh-l4',
          track: 'daily',
          title: 'Thanh toán Quét mã & Mua sắm Mặc cả',
          description: 'Thanh toán qua mã QR (扫码支付), hỏi có chiết khấu hay giảm giá không khi mua sắm.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'zh-e8',
              type: 'flashcard',
              prompt: 'Hỏi thanh toán bằng ví điện tử',
              targetText: '可以微信或者支付宝扫码付款吗？(Kěyǐ Wēixìn huòzhě Zhīfùbǎo sǎomǎ fùkuǎn ma?)',
              romanization: 'Kěyǐ Wēixìn huòzhě Zhīfùbǎo sǎomǎ fùkuǎn ma?',
              vietnameseMeaning: 'Có thể quét mã thanh toán bằng WeChat hoặc Alipay được không ạ?',
              audioText: '可以微信或者支付宝扫码付款吗？',
              explanation: '"扫码付款" (sǎomǎ fùkuǎn) = quét mã thanh toán, là phương thức phổ biến 99% tại Trung Quốc hiện đại.',
              culturalNote: 'Trung Quốc gần như là xã hội không tiền mặt, từ taxi đến hàng rong đều dùng mã QR.'
            },
            {
              id: 'zh-e9',
              type: 'quiz_choice',
              prompt: 'Khi mua sắm muốn hỏi: "Cái này có thể giảm giá thêm chút nữa không?", bạn nói gì?',
              options: [
                '这个可以便宜一点儿吗？(Zhège kěyǐ piányi yìdiǎnr ma?)',
                '这个太便宜了！(Zhège tài piányi le!)',
                '我没有钱。(Wǒ méiyǒu qián.)',
                '你不要骗我。(Nǐ búyào piàn wǒ.)'
              ],
              correctAnswer: '这个可以便宜一点儿吗？(Zhège kěyǐ piányi yìdiǎnr ma?)',
              explanation: '"便宜一点儿" (piányi yìdiǎnr) là cụm từ mặc cả quen thuộc và tự nhiên nhất khi đi mua sắm.'
            }
          ]
        },
        {
          id: 'zh-l4b',
          track: 'daily',
          title: 'Thuê Nhà & Mở Tài Khoản Ngân Hàng (租房与银行开户)',
          description: 'Hỏi tiền cọc một đóng ba (押一付三), xem căn hộ qua môi giới (中介) và thủ tục ngân hàng.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'zh-e9b',
              type: 'flashcard',
              prompt: 'Mẫu câu hỏi phương thức thanh toán tiền thuê nhà',
              targetText: '房租是押一付三吗？水电费怎么算？(Fángzū shì yā yī fù sān ma? Shuǐdiànfèi zěnme suàn?)',
              romanization: 'Fángzū shì yā yī fù sān ma? Shuǐdiànfèi zěnme suàn?',
              vietnameseMeaning: 'Tiền thuê nhà là cọc 1 tháng đóng 3 tháng đúng không ạ? Tiền điện nước tính thế nào?',
              audioText: '房租是押一付三吗？水电费怎么算？',
              explanation: '"押一付三" (yā yī fù sān) là phương thức thanh toán thuê nhà tiêu chuẩn tại các thành phố lớn Trung Quốc.',
              culturalNote: 'Khi thuê nhà, hãy kiểm tra kỹ hợp đồng thuê (租赁合同) và thông tin chủ nhà (房东).'
            },
            {
              id: 'zh-e9c',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "我想办一张借记卡，需要填写哪份______？(Tôi muốn làm thẻ ghi nợ, cần điền vào mẫu biểu nào?)"',
              options: ['表格 (biǎogé)', '照片 (zhàopiàn)', '护照 (hùzhào)', '手机 (shǒujī)'],
              correctAnswer: '表格 (biǎogé)',
              explanation: '"表格" (biǎogé) là mẫu biểu, đơn từ cần điền khi làm thủ tục hành chính ngân hàng.'
            }
          ]
        }
      ]
    },
    {
      id: 'zh-u3',
      number: 3,
      track: 'workplace',
      title: 'Môi Trường Công Sở & Email Thương Mại',
      description: 'Giao tiếp với sếp và đồng nghiệp người Trung, viết báo cáo tiến độ và email hợp tác đối ngoại.',
      cefrLevel: 'HSK 3 - HSK 4',
      lessons: [
        {
          id: 'zh-l5',
          track: 'workplace',
          title: 'Báo cáo Tiến độ & Trao đổi Công việc',
          description: 'Cách báo cáo công việc cho sếp (汇报工作), xin ý kiến chỉ đạo và thông báo hoàn thành nhiệm vụ.',
          durationMinutes: 5,
          xpReward: 40,
          exercises: [
            {
              id: 'zh-e10',
              type: 'flashcard',
              prompt: 'Mẫu câu báo cáo tiến độ chuẩn công sở',
              targetText: '李总，这个项目的进度报告我已经发到您的邮箱了。(Lǐ zǒng, zhège xiàngmù de jìndù bàogào wǒ yǐjīng fā dào nín de yóuxiāng le.)',
              romanization: 'Lǐ zǒng, zhège xiàngmù de jìndù bàogào wǒ yǐjīng fā dào nín de yóuxiāng le.',
              vietnameseMeaning: 'Tổng Giám đốc Lý ơi, báo cáo tiến độ của dự án này em đã gửi vào hòm thư của anh/sếp rồi ạ.',
              audioText: '李总，这个项目的进度报告我已经发到您的邮箱了。',
              explanation: 'Trong công ty Trung Quốc, gọi sếp bằng: Họ + Chức vụ (Ví dụ: 李总 Lǐ zǒng, 王经理 Wáng jīnglǐ).',
              culturalNote: 'Luôn kèm theo chữ "您" khi trao đổi với cấp trên để thể hiện sự tôn trọng.'
            },
            {
              id: 'zh-e11',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Chúng tôi sẽ nỗ lực hết mình để đảm bảo dự án hoàn thành đúng hạn."',
              targetText: '我们会尽全力确保项目按时完成。(Wǒmen huì jìn quánlì quèbǎo xiàngmù ànshí wánchéng.)',
              wordTokens: ['我们会', '尽全力', '确保项目', '按时完成。', '迟到', '放弃'],
              explanation: '"尽全力" (jìn quánlì - tận toàn lực) và "按时完成" (ànshí wánchéng - hoàn thành đúng hạn) là các cụm từ công sở đắt giá.'
            }
          ]
        },
        {
          id: 'zh-l6',
          track: 'workplace',
          title: 'Viết Thư Điện Tử Thương Mại Chuyên Nghiệp',
          description: 'Mở đầu thư trang trọng, trình bày mục đích hợp tác và dùng câu chúc chuẩn văn phong kinh doanh.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'zh-e12',
              type: 'flashcard',
              prompt: 'Lời chúc kết thúc email thương mại kinh điển',
              targetText: '顺祝商祺！(Shùn zhù shāng qí!)',
              romanization: 'Shùn zhù shāng qí!',
              vietnameseMeaning: 'Kính chúc quý công ty kinh doanh phát đạt và thuận lợi!',
              audioText: '顺祝商祺！',
              explanation: '"顺祝商祺" là lời chúc trang trọng chuẩn mực nhất ở cuối thư điện tử thương mại Trung Quốc.',
              culturalNote: 'Thường viết tách dòng riêng ở cuối email kinh doanh đối tác.'
            },
            {
              id: 'zh-e13',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "请查收随信______的报价单。(Xin vui lòng kiểm tra bảng báo giá được đính kèm theo thư.)"',
              options: ['附上 (fùshàng)', '拿来 (nálái)', '放进 (fàngjìn)', '送给 (sònggěi)'],
              correctAnswer: '附上 (fùshàng)',
              explanation: '"随信附上" (suíxìn fùshàng) là mẫu câu chuẩn thông báo tệp đính kèm trong thư thương mại.'
            }
          ]
        },
        {
          id: 'zh-l6b',
          track: 'workplace',
          title: 'Đi Công Tác Xưởng Sản Xuất & Nghiệm Thu Hàng Hóa (验货)',
          description: 'Quy trình kiểm tra mẫu (打样), tỷ lệ lỗi (不良率) và thông số kỹ thuật với kỹ sư xưởng.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'zh-e13b',
              type: 'flashcard',
              prompt: 'Mẫu câu kiểm tra tỷ lệ lỗi sản phẩm xưởng',
              targetText: '这批货的不良率必须控制在千分之二以内。(Zhè pī huò de bùliánglǜ bìxū kòngzhì zài qiān fēn zhī èr yǐnèi.)',
              romanization: 'Zhè pī huò de bùliánglǜ bìxū kòngzhì zài qiān fēn zhī èr yǐnèi.',
              vietnameseMeaning: 'Tỷ lệ hàng lỗi của lô hàng này bắt buộc phải kiểm soát trong phạm vi dưới 2 phần nghìn.',
              audioText: '这批货的不良率必须控制在千分之二以内。',
              explanation: '"不良率" (bùliánglǜ) là thuật ngữ quản lý chất lượng (QA/QC) trong các nhà máy sản xuất.',
              culturalNote: 'Khi làm việc tại nhà máy Trung Quốc, việc nắm vững các thuật ngữ kỹ thuật giúp tăng uy tín rất nhanh.'
            },
            {
              id: 'zh-e13c',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Ngày mai chúng ta sẽ đến xưởng kiểm tra dây chuyền sản xuất."',
              targetText: '明天我们要去车间检查生产线。(Míngtiān wǒmen yào qù chējiān jiǎnchá shēngchǎnxiàn.)',
              wordTokens: ['明天我们要', '去车间', '检查', '生产线。', '睡觉', '昨天'],
              explanation: '"车间" (chējiān) = phân xưởng sản xuất; "生产线" (shēngchǎnxiàn) = dây chuyền sản xuất.'
            }
          ]
        }
      ]
    },
    {
      id: 'zh-u4',
      number: 4,
      track: 'workplace',
      title: 'Phỏng Vấn Xin Việc Doanh Nghiệp Trung Quốc (FDI)',
      description: 'Giới thiệu kinh nghiệm, nêu bật ưu thế biết tiếng Trung tại thị trường Việt Nam và đàm phán đãi ngộ.',
      cefrLevel: 'HSK 4 - HSK 5',
      lessons: [
        {
          id: 'zh-l7',
          track: 'workplace',
          title: 'Tự Giới Thiệu Bản Thân & Kinh Nghiệm Nghề Nghiệp',
          description: 'Mẫu câu mở đầu phỏng vấn mượt mà, gây ấn tượng với nhà tuyển dụng trong 2 phút đầu.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'zh-e14',
              type: 'flashcard',
              prompt: 'Mẫu câu giới thiệu chuyên môn sắc sảo',
              targetText: '我有三年的供应链管理经验，能够用中文与供应商无缝沟通。(Wǒ yǒu sān nián de gōngyìngliàn guǎnlǐ jīngyàn, nénggòu yòng zhōngwén yǔ gōngyìngshāng wúfèng gōutōng.)',
              romanization: 'Wǒ yǒu sān nián de gōngyìngliàn guǎnlǐ jīngyàn, nénggòu yòng zhōngwén yǔ gōngyìngshāng wúfèng gōutōng.',
              vietnameseMeaning: 'Tôi có 3 năm kinh nghiệm quản lý chuỗi cung ứng, có khả năng giao tiếp liền mạch bằng tiếng Trung với các nhà cung cấp.',
              audioText: '我有三年的供应链管理经验，能够用中文与供应商无缝沟通。',
              explanation: '"无缝沟通" (wúfèng gōutōng - giao tiếp không rào cản/liền mạch) là từ band cao cực kỳ đắt giá.',
              culturalNote: 'Các sếp xưởng và giám đốc nhà máy Trung Quốc tại Bình Dương, Bắc Ninh cực kỳ thích nhân sự bản địa thông thạo kỹ năng này.'
            },
            {
              id: 'zh-e15',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi tin rằng tinh thần trách nhiệm và khả năng thích ứng của tôi rất phù hợp với vị trí này."',
              targetText: '我相信我的责任心和适应能力非常适合这个岗位。(Wǒ xiāngxìn wǒ de zérènxīn hé shìyìng nénglì fēicháng shìhé zhège gǎngwèi.)',
              wordTokens: ['我相信', '我的责任心', '和适应能力', '非常适合', '这个岗位。', '害怕', '放弃'],
              explanation: '"责任心" (tinh thần trách nhiệm) và "适应能力" (khả năng thích ứng) là 2 phẩm chất hàng đầu được săn đón.'
            }
          ]
        },
        {
          id: 'zh-l8',
          track: 'workplace',
          title: 'Xử lý Câu hỏi Khó & Trao đổi Chế độ Đãi ngộ',
          description: 'Cách trả lời về lý do chuyển việc, kỳ vọng thăng tiến và đề xuất mức lương hợp lý.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'zh-e16',
              type: 'flashcard',
              prompt: 'Cách trả lời thông minh khi được hỏi tại sao nghỉ việc cũ',
              targetText: '我想寻求更大的发展平台，迎接新的职业挑战。(Wǒ xiǎng xúnqiú gèng dà de fāzhǎn píngtái, yíngjiē xīn de zhíyè tiǎozhàn.)',
              romanization: 'Wǒ xiǎng xúnqiú gèng dà de fāzhǎn píngtái, yíngjiē xīn de zhíyè tiǎozhàn.',
              vietnameseMeaning: 'Tôi muốn tìm kiếm một nền tảng phát triển lớn hơn để đón nhận những thử thách nghề nghiệp mới.',
              audioText: '我想寻求更大的发展平台，迎接新的职业挑战。',
              explanation: 'Tuyệt đối không nói xấu sếp cũ hay công ty cũ; tập trung vào sự phát triển bản thân (寻求更大的平台).',
              culturalNote: 'Nhà tuyển dụng Trung Quốc rất tôn trọng ứng viên có chí tiến thủ và mong muốn gắn bó lâu dài.'
            },
            {
              id: 'zh-e17',
              type: 'quiz_choice',
              prompt: 'Khi HR hỏi mức lương mong muốn: "你期望的薪资是多少？", câu trả lời nào là khéo léo nhất?',
              options: [
                '根据我的经验和市场行情，我期望税后月薪在两千五百万越南盾左右，但也愿意结合公司的福利体系进行协商。(Căn cứ kinh nghiệm và thị trường, kỳ vọng khoảng 25 triệu VND sau thuế, nhưng sẵn sàng thương lượng dựa trên gói phúc lợi).',
                '给多少都行，我不挑。(Bao nhiêu cũng được, tôi không kén chọn).',
                '必须给我五千万，少一分都不干。(Bắt buộc phải 50 triệu, thiếu 1 đồng cũng không làm).',
                '我不知道现在行情是多少。(Tôi không biết mặt bằng chung là bao nhiêu).'
              ],
              correctAnswer: '根据我的经验和市场行情，我期望税后月薪在两千五百万越南盾左右，但也愿意结合公司的福利体系进行协商。(Căn cứ kinh nghiệm và thị trường, kỳ vọng khoảng 25 triệu VND sau thuế, nhưng sẵn sàng thương lượng dựa trên gói phúc lợi).',
              explanation: 'Câu trả lời vừa rõ ràng về con số (税后 - sau thuế), vừa thể hiện sự tôn trọng và linh hoạt đối với chính sách đãi ngộ của công ty.'
            }
          ]
        }
      ]
    }
  ],
  scenarios: [
    {
      id: 'zh-interview',
      track: 'workplace',
      title: 'Phỏng vấn Trưởng đại diện Nhà máy FDI Trung Quốc',
      context: 'Bạn đang ứng tuyển vị trí Trợ lý Giám đốc Vận hành cho một tập đoàn sản xuất linh kiện điện tử lớn tại KCN VSIP.',
      location: 'Văn phòng Tổng Giám đốc KCN VSIP',
      characterName: 'Trương Cương (张刚 - Zhāng Gāng)',
      characterRole: 'Tổng Giám đốc Nhà máy (厂长)',
      characterAvatar: '🏭',
      starterMessage: {
        text: '你好！请坐。我们公司最近正在扩建越南生产基地，急需一位懂中文并且熟悉本地法规的运营主管。你能简单介绍一下自己的相关经验吗？',
        romanization: 'Nǐ hǎo! Qǐng zuò. Wǒmen gōngsī zuìjìn zhèngzài kuòjiàn Yuènán shēngchǎn jīdì...',
        vietnameseTranslation: 'Chào bạn! Mời ngồi. Công ty chúng tôi gần đây đang mở rộng cơ sở sản xuất tại Việt Nam, rất cần một chủ quản vận hành biết tiếng Trung và am hiểu pháp luật địa phương. Bạn có thể giới thiệu sơ lược về kinh nghiệm liên quan của mình không?'
      },
      objectives: [
        'Chào hỏi lịch sự dùng "张厂长，您好！"',
        'Trình bày kinh nghiệm điều phối nhà xưởng hoặc làm việc với chuyên gia Trung Quốc',
        'Khẳng định khả năng làm cầu nối văn hóa giữa lao động Việt Nam và ban quản lý Trung Quốc'
      ]
    },
    {
      id: 'zh-hotpot',
      track: 'daily',
      title: 'Ăn Lẩu Tứ Xuyên cùng Bạn bè Thượng Hải',
      context: 'Bạn cùng các bạn học người Trung Quốc đi ăn lẩu Haidilao tại trung tâm Thượng Hải vào một tối mùa đông.',
      location: 'Nhà hàng Lẩu Haidilao Thượng Hải',
      characterName: 'Vương Hiểu Lộ (王晓露 - Wáng Xiǎolù)',
      characterRole: 'Bạn học đại học',
      characterAvatar: '🍲',
      starterMessage: {
        text: '这家火锅店味道特别正宗！我们点一个鸳鸯锅吧，一半番茄一半麻辣，你吃得惯辣吗？',
        romanization: 'Zhè jiā huǒguō diàn wèidào tèbié zhèngzōng! Wǒmen diǎn yí gè yuānyāng guō ba...',
        vietnameseTranslation: 'Quán lẩu này hương vị chuẩn lắm đấy! Tụi mình gọi nồi lẩu uyên ương nhé, một nửa cà chua một nửa cay tê, bạn có ăn quen đồ cay không?'
      },
      objectives: [
        'Chọn độ cay thích hợp (微辣 hoặc 中辣)',
        'Gợi ý một vài món nhúng ưa thích (bò lát, nấm, đậu phụ)',
        'Hỏi về cách pha nước chấm ngon tại quầy gia vị'
      ]
    }
  ],
  vocabCards: [
    {
      id: 'zh-v1',
      track: 'workplace',
      word: '效益 (xiàoyì)',
      romanization: 'xiàoyì',
      meaning: 'Hiệu quả kinh tế, lợi ích sinh lời',
      partOfSpeech: 'noun',
      exampleSentence: '优化生产流程能显著提高企业的经济效益。',
      exampleTranslation: 'Tối ưu hóa quy trình sản xuất có thể nâng cao rõ rệt hiệu quả kinh tế của doanh nghiệp.',
      category: 'Kinh doanh & Quản lý',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'zh-v2',
      track: 'workplace',
      word: '沟通 (gōutōng)',
      romanization: 'gōutōng',
      meaning: 'Giao tiếp, kết nối, trao đổi thấu hiểu',
      partOfSpeech: 'verb / noun',
      exampleSentence: '良好的人际沟通是团队成功的关键。',
      exampleTranslation: 'Giao tiếp tốt giữa các cá nhân là chìa khóa thành công của một đội ngũ.',
      category: 'Kỹ năng Công sở',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 6,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'zh-v3',
      track: 'daily',
      word: '地道 (dìdào)',
      romanization: 'dìdào',
      meaning: 'Chính gốc, chuẩn vị bản xứ, thuần thục',
      partOfSpeech: 'adjective',
      exampleSentence: '他的中文说得非常地道，听起来就像北京本地人一样。',
      exampleTranslation: 'Tiếng Trung của anh ấy nói cực kỳ chuẩn bản xứ, nghe y như người Bắc Kinh gốc vậy.',
      category: 'Đời sống Hàng ngày',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 12,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    }
  ],
  culturalTips: [
    {
      id: 'ct-zh-1',
      topic: 'Văn hóa Xưng hô theo Chức vụ trong Doanh nghiệp',
      rule: 'Trong môi trường doanh nghiệp Trung Quốc hoặc Đài Loan, việc gọi thẳng tên của cấp trên bị coi là thiếu tôn trọng. Luôn xưng hô theo công thức: Họ + Chức vụ (Ví dụ: Trương Tổng, Vương Giám đốc, Lý Chủ quản).',
      doText: 'Gọi "张总" (Zhāng zǒng) hoặc "王经理" (Wáng jīnglǐ).',
      dontText: 'Đừng bao giờ gọi thẳng tên húy của sếp như "刚!" (Gāng!).',
      essentialPhrase: '张总，您好！这是今天的生产报表。',
      phraseTranslation: 'Chào sếp Trương ạ! Đây là báo cáo sản xuất hôm nay.'
    },
    {
      id: 'ct-zh-2',
      topic: 'Văn hóa Tiệc rượu Thương gia & Quy tắc Cụng ly',
      rule: 'Khi cụng ly với cấp trên hoặc đối tác quan trọng, hãy luôn để mép ly của mình thấp hơn mép ly của đối phương một chút để biểu thị sự khiêm tốn và tôn trọng (chữ Lễ).',
      doText: 'Dùng hai tay nâng ly, chúc sức khỏe và hạ thấp mép ly khi chạm.',
      dontText: 'Đừng cầm ly một tay cụng cao hơn ly của sếp lớn.',
      essentialPhrase: '祝我们合作愉快，我敬您一杯！',
      phraseTranslation: 'Chúc cho sự hợp tác của chúng ta tốt đẹp, tôi xin kính ngài một ly!'
    }
  ]
};
