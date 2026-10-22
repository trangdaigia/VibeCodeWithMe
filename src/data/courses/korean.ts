import { LanguageCourse } from '../curriculum';

export const koreanCourse: LanguageCourse = {
  id: 'korean',
  name: 'Korean',
  nativeName: '한국어 (Hangugeo)',
  vietnameseName: 'Tiếng Hàn',
  flagEmoji: '🇰🇷',
  flagColor: '#0284c7',
  voiceLangCode: 'ko-KR',
  scriptType: 'Bảng chữ cái Hangeul & Phiên âm Latinh',
  examInfo: [
    {
      examName: 'TOPIK (Test of Proficiency in Korean - 한국어능력시험)',
      targetLevel: 'TOPIK II (Cấp 3 - Cấp 5)',
      overview: 'Kỳ thi đánh giá năng lực tiếng Hàn tiêu chuẩn do Viện Giáo dục Quốc tế Quốc gia Hàn Quốc (NIIED) tổ chức, là tấm vé bắt buộc để du học học bổng chính phủ GKS và vào làm tại các tập đoàn lớn (Chaebol như Samsung, LG, Hyundai).',
      formatSections: [
        'Nghe hiểu (듣기 - Deutgi): 50 câu hỏi trắc nghiệm (60 phút)',
        'Đọc hiểu (읽기 - Ilgi): 50 câu hỏi trắc nghiệm ngữ pháp, bài báo, biểu đồ (70 phút)',
        'Viết (쓰기 - Sseugi): 4 câu (2 câu điền từ ngữ cảnh, 1 bài văn ngắn 200-300 từ mô tả biểu đồ, 1 bài luận nghị luận 600-700 từ) - 50 phút'
      ],
      strategyTips: [
        'Phần Viết Câu 53 (Mô tả biểu đồ): Học thuộc lòng các mẫu câu tăng giảm cố định: "~에 비해 크게 증가했다" (tăng mạnh so với...), "~(으)로 나타났다" (được ghi nhận là...). Tuyệt đối không đưa ý kiến cá nhân vào câu 53.',
        'Kỹ thuật làm Đọc TOPIK II: Đọc nhanh tiêu đề bài báo (câu 25-27), nhận diện phép ẩn dụ và thái độ tác giả thay vì dịch từng chữ Hán Hàn.',
        'Ngữ pháp liên kết câu: Nắm chắc sự khác biệt giữa các ngữ pháp nhượng bộ như -더라도, -아/어도, -든지 để không bị sập bẫy trắc nghiệm.'
      ],
      sampleQuestions: [
        {
          question: 'TOPIK II Ngữ pháp: "아무리 피곤해도 운동을 ______."',
          passage: '아무리 피곤해도 운동을 ______。(Amuri pigonhaedo undong-eul ______.)',
          options: [
            '거르지 않으려고 한다 (georeuji anheuryeogo handa - cố gắng không bỏ dở)',
            '거를 수밖에 없다 (georeul subakke eopda - buộc phải bỏ)',
            '거를 리가 없다 (georeul riga eopda - lẽ nào lại bỏ)',
            '거르는 편이다 (georeuneun pyeon-ida - thuộc diện hay bỏ)'
          ],
          correctAnswer: '거르지 않으려고 한다 (georeuji anheuryeogo handa - cố gắng không bỏ dở)',
          explanationInVietnamese: 'Cấu trúc "아무리 A/V-아/어도 + -(으)려고 하다" diễn tả quyết tâm: "Dù có mệt mỏi đến đâu thì tôi cũng cố gắng không bỏ tập thể dục".'
        },
        {
          question: 'TOPIK II Từ vựng: "신제품 출시를 앞두고 마케팅 팀에서는 대대적인 홍보 활동에 ______."',
          options: [
            '착수했다 (chaksuhaetda - bắt tay vào thực hiện)',
            '포기했다 (pogihaetda - từ bỏ)',
            '거절했다 (geojeolhaetda - từ chối)',
            '지연되었다 (jiyeon-doeeotda - bị trì hoãn)'
          ],
          correctAnswer: '착수했다 (chaksuhaetda - bắt tay vào thực hiện)',
          explanationInVietnamese: '"착수하다" (Chaksu-hada - Trứ thủ / Bắt tay vào làm việc) là động từ cao cấp chuyên dùng trong bối cảnh kế hoạch, dự án kinh doanh.'
        },
        {
          question: 'TOPIK II Quán ngữ: Điền quán ngữ thích hợp: "그는 어떤 어려운 일을 맡아도 ______ 해결해 낸다."',
          options: [
            '눈 깜짝할 사이에 (trong chớp mắt)',
            '발을 빼고 (rút chân ra ngoài)',
            '귀가 얇아서 (nhẹ dạ cả tin)',
            '배가 아파서 (ghen tị)'
          ],
          correctAnswer: '눈 깜짝할 사이에 (trong chớp mắt)',
          explanationInVietnamese: '"눈 깜짝할 사이에" (Nun kkamjjakhak saie - trong một cái chớp mắt) là quán ngữ phổ biến chỉ tốc độ giải quyết công việc cực kỳ nhanh nhẹn và quyết đoán.'
        }
      ]
    }
  ],
  units: [
    {
      id: 'ko-u1',
      number: 1,
      track: 'daily',
      title: 'Giao tiếp Đời sống & Kính ngữ Đuôi câu Cơ bản',
      description: 'Làm quen với hệ chữ Hangeul khoa học, chào hỏi tự nhiên với đuôi câu kính ngữ lịch sự -yo (-아요/어요) và trang trọng -nida (-습니다).',
      cefrLevel: 'A1 (TOPIK I)',
      lessons: [
        {
          id: 'ko-l1',
          track: 'daily',
          title: 'Chào hỏi & Giới thiệu Tên, Quốc tịch',
          description: 'Cách xưng hô và tự giới thiệu bản thân lịch thiệp với người Hàn Quốc.',
          durationMinutes: 4,
          xpReward: 30,
          exercises: [
            {
              id: 'ko-e1',
              type: 'flashcard',
              prompt: 'Mẫu câu chào hỏi kinh điển và lịch sự nhất',
              targetText: '안녕하세요? 처음 뵙겠습니다.(Annyeonghaseyo? Cheoeum boepgetseumnida.)',
              romanization: 'Annyeonghaseyo? Cheoeum boepgetseumnida.',
              vietnameseMeaning: 'Xin chào! Rất hân hạnh được diện kiến bạn lần đầu tiên.',
              audioText: '안녕하세요? 처음 뵙겠습니다.',
              explanation: '"처음 뵙겠습니다" dùng khi gặp mặt ai đó lần đầu trong đời, mang sắc thái kính trọng trang nhã.',
              culturalNote: 'Khi nói câu này, người Hàn hơi cúi đầu gập người khoảng 30 độ để chào.'
            },
            {
              id: 'ko-e2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi là người Việt Nam, rất vui được gặp bạn."',
              targetText: '저는 베트남 사람입니다. 만나서 반갑습니다.(Jeoneun Beteunam saram-imnida. Mannaseo bangapseumnida.)',
              wordTokens: ['저는', '베트남 사람입니다.', '만나서', '반갑습니다.', '한국', '친구'],
              explanation: '"-입니다" là đuôi câu định nghĩa khẳng định trang trọng; "만나서 반갑습니다" là rất vui được gặp.'
            },
            {
              id: 'ko-e3',
              type: 'quiz_choice',
              prompt: 'Khi muốn nói lời tạm biệt với người đang ở lại (bạn là người ra về), bạn nói câu nào?',
              options: [
                '안녕히 계세요 (Annyeonghi gyeseyo)',
                '안녕히 가세요 (Annyeonghi gaseyo)',
                '또 만나요 (Tto mannayo)',
                '잘 자요 (Jal jayo)'
              ],
              correctAnswer: '안녕히 계세요 (Annyeonghi gyeseyo)',
              explanation: 'Gyeseyo (ở lại bình an - nói với người ở lại); Gaseyo (đi bình an - nói với người ra về).'
            }
          ]
        },
        {
          id: 'ko-l2',
          track: 'daily',
          title: 'Ẩm thực Quán Ăn Hàn & Xin thêm Món Phụ (Banchan)',
          description: 'Đi ăn thịt nướng Samgyeopsal, gọi canh kim chi, xin thêm món phụ miễn phí và xin hóa đơn.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'ko-e4',
              type: 'flashcard',
              prompt: 'Mẫu câu gọi phục vụ thân mật và xin thêm đồ ăn kèm',
              targetText: '이모님, 여기 반찬 좀 더 주세요!(Imo-nim, yeogi banchan jom deo juseyo!)',
              romanization: 'Imo-nim, yeogi banchan jom deo juseyo!',
              vietnameseMeaning: 'Cô ơi (dì ơi), cho cháu xin thêm một ít món ăn phụ với ạ!',
              audioText: '이모님, 여기 반찬 좀 더 주세요!',
              explanation: '"이모님 (Imo-nim)" là cách gọi các cô chủ quán/phục vụ đứng tuổi cực kỳ thân thiết và dễ thương tại Hàn.',
              culturalNote: 'Ở các quán ăn Hàn Quốc, tất cả các loại đồ ăn phụ (kim chi, củ cải, trứng hấp) đều được châm thêm hoàn toàn miễn phí (Refill)!'
            },
            {
              id: 'ko-e5',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "삼겹살 2인분______ 소주 한 병 주세요.(Cho tôi 2 phần thịt ba chỉ nướng và một chai rượu soju.)"',
              options: ['하고 (hago)', '에서 (eseo)', '부터 (buteo)', '까지 (kkaji)'],
              correctAnswer: '하고 (hago)',
              explanation: 'Từ nối "하고" mang nghĩa là "và / cùng với", dùng để liệt kê danh từ gọi món ăn.'
            }
          ]
        }
      ]
    },
    {
      id: 'ko-u2',
      number: 2,
      track: 'daily',
      title: 'Mua Sắm Tại Seoul & Đi Tàu Điện Ngầm',
      description: 'Hỏi giá tiền tại chợ Dongdaemun/Myeongdong, hỏi thử size quần áo và nạp thẻ giao thông T-Money.',
      cefrLevel: 'A2 (TOPIK I)',
      lessons: [
        {
          id: 'ko-l3',
          track: 'daily',
          title: 'Mua Sắm Quần Áo & Hỏi Giá Tiền',
          description: 'Hỏi giá, xin thử đồ vào phòng thay đồ và hỏi xem có được hoàn thuế (Tax Refund) không.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'ko-e6',
              type: 'flashcard',
              prompt: 'Mẫu câu hỏi thử đồ trong cửa hàng thời trang',
              targetText: '이거 한번 입어봐도 돼요?(Igeo hanbeon ibeobwado dwaeyo?)',
              romanization: 'Igeo hanbeon ibeobwado dwaeyo?',
              vietnameseMeaning: 'Cái này tôi mặc thử một chút có được không ạ?',
              audioText: '이거 한번 입어봐도 돼요?',
              explanation: 'Cấu trúc "V-아/어 봐도 되다" nghĩa là "làm thử hành động gì có được phép không".',
              culturalNote: 'Ở Hàn Quốc, các quầy áo thun trắng thường có quy định che mặt bằng mặt nạ giấy tránh dính son phấn.'
            },
            {
              id: 'ko-e7',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Cái này đắt quá, có thể giảm giá cho tôi một chút được không?"',
              targetText: '너무 비싸요, 조금만 깎아 주세요.(Neomu bissayo, jogeumman kkakka juseyo.)',
              wordTokens: ['너무 비싸요,', '조금만', '깎아 주세요.', '맛있어요', '감사합니다'],
              explanation: '"깎아 주세요" (kkakka juseyo) là câu mặc cả kinh điển ở các chợ truyền thống Hàn Quốc.'
            }
          ]
        },
        {
          id: 'ko-l3b',
          track: 'daily',
          title: 'Khám Bệnh Tại Phòng Khám Nội Khoa & Mua Thuốc (내과와 약국)',
          description: 'Cách miêu tả triệu chứng sốt, cảm cúm, đau bụng và mua thuốc theo toa tại Hàn Quốc.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'ko-e7b',
              type: 'flashcard',
              prompt: 'Mẫu câu miêu tả triệu chứng tại phòng khám',
              targetText: '어젯밤부터 열이 나고 목이 따가워요.(Eojetbam-buteo yeori nago mogi ttagawoyo.)',
              romanization: 'Eojetbam-buteo yeori nago mogi ttagawoyo.',
              vietnameseMeaning: 'Từ đêm hôm qua tôi bị phát sốt và cổ họng đau rát.',
              audioText: '어젯밤부터 열이 나고 목이 따가워요.',
              explanation: '"열이 나다" (bị sốt) và "목이 따갑다" (họng rát đau) là các diễn đạt chuẩn khi gặp bác sĩ.',
              culturalNote: 'Ở Hàn Quốc, sau khi khám bác sĩ sẽ nhận được đơn thuốc (처방전) để ra hiệu thuốc (약국) ngay bên cạnh mua.'
            },
            {
              id: 'ko-e7c',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "이 약은 식사 30분 ______ 드세요.(Thuốc này hãy uống sau bữa ăn 30 phút nhé.)"',
              options: ['후에 (hue)', '전에 (jeone)', '동안 (dongan)', '부터 (buteo)'],
              correctAnswer: '후에 (hue)',
              explanation: '"식사 30분 후에" (sik-sa sam-sip-bun hu-e) có nghĩa là sau khi ăn 30 phút.'
            }
          ]
        }
      ]
    },
    {
      id: 'ko-u3',
      number: 3,
      track: 'workplace',
      title: 'Văn Hóa Doanh Nghiệp Hàn Quốc & Giao Tiếp Công Sở',
      description: 'Học cách xưng hô theo chức danh kèm chữ Nim, văn hóa liên hoan Hoesik và viết email công việc chuẩn mực.',
      cefrLevel: 'B1 - B2 (TOPIK II)',
      lessons: [
        {
          id: 'ko-l4',
          track: 'workplace',
          title: 'Xưng hô Chức danh & Quy tắc Giao tiếp Văn phòng',
          description: 'Cách gọi Trưởng phòng (Bujang-nim), Trưởng ban (Teamjang-nim), Giám đốc (Daepyo-nim) và văn hóa chào hỏi.',
          durationMinutes: 5,
          xpReward: 40,
          exercises: [
            {
              id: 'ko-e8',
              type: 'flashcard',
              prompt: 'Mẫu câu chào khi tan làm ở văn phòng Hàn Quốc',
              targetText: '먼저 퇴근하겠습니다. 오늘 수고 많으셨습니다!(Meonjeo toegeun-hagetseumnida. Oneul sugo maneusyeotseumnida!)',
              romanization: 'Meonjeo toegeun-hagetseumnida. Oneul sugo maneusyeotseumnida!',
              vietnameseMeaning: 'Tôi xin phép tan làm trước ạ. Hôm nay mọi người đã vất vả nhiều rồi!',
              audioText: '먼저 퇴근하겠습니다. 오늘 수고 많으셨습니다!',
              explanation: '"수고하셨습니다" là câu nói thể hiện sự trân trọng công sức lao động của đồng nghiệp trong ngày.',
              culturalNote: 'Khi về trước sếp hoặc tiền bối, luôn chào câu này kèm cái cúi đầu nhẹ.'
            },
            {
              id: 'ko-e9',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Trưởng phòng ơi, tôi đã gửi tài liệu cuộc họp qua email cho ngài rồi."',
              targetText: '부장님, 회의 자료를 이메일로 송부해 드렸습니다.(Bujang-nim, hoeui jaryoreul imeillo songbuhae deuryeotseumnida.)',
              wordTokens: ['부장님,', '회의 자료를', '이메일로', '송부해 드렸습니다.', '식사', '내일'],
              explanation: '"송부해 드렸습니다" (songbuhae deuryeotseumnida) là kính ngữ trang trọng của việc gửi tài liệu.'
            }
          ]
        },
        {
          id: 'ko-l5',
          track: 'workplace',
          title: 'Văn Hóa Liên Hoan Công Ty (Hoesik) & Quy Tắc Rót Rượu',
          description: 'Quy tắc dùng 2 tay đỡ chai rượu, quay đầu sang một bên khi uống cùng sếp và những câu chúc mừng nâng ly.',
          durationMinutes: 5,
          xpReward: 40,
          exercises: [
            {
              id: 'ko-e10',
              type: 'flashcard',
              prompt: 'Khẩu hiệu hô vang khi nâng ly liên hoan công ty',
              targetText: '팀의 발전을 위하여, 건배!(Tim-ui baljeon-eul wihayeo, geonbae!)',
              romanization: 'Tim-ui baljeon-eul wihayeo, geonbae!',
              vietnameseMeaning: 'Vì sự phát triển lớn mạnh của đội ngũ chúng ta, cạn ly!',
              audioText: '팀의 발전을 위하여, 건배!',
              explanation: '"~을/를 위하여" mang nghĩa "vì... / hướng tới...".',
              culturalNote: 'Khi uống rượu với người lớn tuổi hoặc cấp trên ở Hàn, hãy quay mặt sang một bên và lấy tay che miệng khi uống.'
            },
            {
              id: 'ko-e11',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "한 잔 더 ______?(Cho phép tôi rót mời ngài thêm một ly nữa nhé?)"',
              options: ['올려도 될까요 (ollyeodo doelkkayo)', '먹을까요 (meogeulkkayo)', '갈까요 (galkkayo)', '볼까요 (bolkkayo)'],
              correctAnswer: '올려도 될까요 (ollyeodo doelkkayo)',
              explanation: '"올리다" là kính ngữ của từ rót/mời đồ uống lên cho người lớn tuổi hơn.'
            }
          ]
        },
        {
          id: 'ko-l5b',
          track: 'workplace',
          title: 'Thuyết Trình Báo Cáo Dự Án Trước Toàn Công Ty (발표)',
          description: 'Mẫu câu mở đầu bài báo cáo PPT, chuyển slide và trả lời phần hỏi đáp (Q&A) dứt khoát.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'ko-e11b',
              type: 'flashcard',
              prompt: 'Mẫu câu mở đầu buổi thuyết trình dự án',
              targetText: '지금부터 2026년 상반기 사업 성과에 대해 발표를 시작하겠습니다.(Jigeum-buteo icheon-isipyuknyeon sangbangi sa-eop seong-gwa-e daehae balpyoreul sijakhagetseumnida.)',
              romanization: 'Jigeum-buteo icheon-isipyuknyeon sangbangi sa-eop seong-gwa-e daehae balpyoreul sijakhagetseumnida.',
              vietnameseMeaning: 'Sau đây tôi xin phép được bắt đầu bài báo cáo về kết quả kinh doanh nửa đầu năm 2026.',
              audioText: '지금부터 사업 성과에 대해 발표를 시작하겠습니다.',
              explanation: '"~에 대해 발표를 시작하겠습니다" là mẫu câu chuẩn mực mở màn mọi buổi thuyết trình doanh nghiệp.',
              culturalNote: 'Luôn chào người nghe bằng "안녕하십니까" và kết thúc bằng "경청해 주셔서 대단히 감사합니다" (Cảm ơn quý vị đã chú ý lắng nghe).'
            },
            {
              id: 'ko-e11c',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Xin chân thành cảm ơn quý vị đã chú ý lắng nghe bài trình bày."',
              targetText: '경청해 주셔서 대단히 감사합니다.(Gyeongcheonghae jusyeoseo daedanhi gamsahamnida.)',
              wordTokens: ['경청해 주셔서', '대단히', '감사합니다.', '안녕', '싫어요'],
              explanation: '"경청" (Kính thính) là từ Hán Hàn mang sắc thái tôn trọng cao nhất khi cảm ơn người nghe.'
            }
          ]
        }
      ]
    },
    {
      id: 'ko-u4',
      number: 4,
      track: 'workplace',
      title: 'Chinh Phục Phỏng Vấn Doanh Nghiệp Hàn Quốc (Myeonjeop)',
      description: 'Luyện tập tự giới thiệu bản thân 1 phút, trả lời lý do ứng tuyển, giải quyết mâu thuẫn đồng nghiệp và đàm phán lương.',
      cefrLevel: 'B2 (TOPIK II Cấp 4-5)',
      lessons: [
        {
          id: 'ko-l6',
          track: 'workplace',
          title: 'Bài Nói Tự Giới Thiệu (Jagi Sogae) Đầy Năng Lượng',
          description: 'Phong thái tự tin, giọng nói dứt khoát đuôi câu -nida, nêu bật thế mạnh chuyên môn và sự hiểu biết văn hóa.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'ko-e12',
              type: 'flashcard',
              prompt: 'Mẫu câu mở đầu phỏng vấn tràn đầy nhiệt huyết',
              targetText: '안녕하십니까? 끊임없이 도전하고 배우는 인재, 지원자 응우옌입니다.(Annyeonghasimnikka? Kkeunimeopsi dojeonhago baeuneun injae, jiwonja Eung-u-yen-imnida.)',
              romanization: 'Annyeonghasimnikka? Kkeunimeopsi dojeonhago baeuneun injae, jiwonja Eung-u-yen-imnida.',
              vietnameseMeaning: 'Kính chào quý vị ban giám khảo! Tôi là ứng viên Nguyễn, một nhân tài luôn không ngừng thử thách và học hỏi mỗi ngày.',
              audioText: '안녕하십니까? 끊임없이 도전하고 배우는 인재, 지원자 응우옌입니다.',
              explanation: 'Doanh nghiệp Hàn rất coi trọng sự nhiệt huyết (열정 - yeoljeong) và tinh thần thử thách (도전정신 - dojeon jeongsin).',
              culturalNote: 'Ngồi thẳng lưng, hai tay đặt ngay ngắn trên đầu gối, ánh mắt nhìn thẳng vào người phỏng vấn với nụ cười tự tin.'
            },
            {
              id: 'ko-e13',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu phỏng vấn: "Tôi tự tin có thể đóng vai trò là cầu nối vững chắc giữa công ty mẹ tại Hàn Quốc và chi nhánh Việt Nam."',
              targetText: '한국 본사와 베트남 법인 간의 탄탄한 가교 역할을 할 자신이 있습니다.(Hanguk bonsawa Beteunam beobin gan-ui tantanhan gagyo yeokhwal-eul hal jasini itseumnida.)',
              wordTokens: ['한국 본사와', '베트남 법인 간의', '탄탄한 가교 역할을', '할 자신이 있습니다.', '포기하다', '어렵다'],
              explanation: '"가교 역할" (vai trò cầu nối - Giá kiều dịch cát) là thuật ngữ vàng chứng minh giá trị độc nhất của nhân sự Việt Nam biết tiếng Hàn.'
            }
          ]
        },
        {
          id: 'ko-l7',
          track: 'workplace',
          title: 'Xử lý Câu hỏi Khó & Thể Hiện Lòng Trung Thành',
          description: 'Cách trả lời về khả năng làm thêm giờ (Yageun), giải quyết áp lực công việc và mong muốn gắn bó lâu dài.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'ko-e14',
              type: 'flashcard',
              prompt: 'Cách trả lời khi được hỏi về việc làm thêm giờ (야근 - Yageun)',
              targetText: '프로젝트의 성공적인 완수를 위해서라면 언제든지 기꺼이 야근에 동참하겠습니다.(Peurojekteu-ui seong-gongjeogin wansureul wihaeseoramyeon eonjedeunji gikkeoi yageun-e dongchamhagetseumnida.)',
              romanization: 'Peurojekteu-ui seong-gongjeogin wansureul wihaeseoramyeon eonjedeunji gikkeoi yageun-e dongchamhagetseumnida.',
              vietnameseMeaning: 'Nếu là vì sự hoàn thành thắng lợi của dự án, tôi luôn sẵn lòng cùng đội ngũ dốc sức làm thêm giờ.',
              audioText: '프로젝트의 성공적인 완수를 위해서라면 언제든지 기꺼이 야근에 동참하겠습니다.',
              explanation: 'Thể hiện tinh thần đồng cam cộng khổ với tập thể (공동체 의식), yếu tố then chốt trong văn hóa Chaebol Hàn Quốc.',
              culturalNote: 'Câu trả lời dứt khoát, dùng đuôi câu trang trọng -gêt-xưm-ni-đa.'
            },
            {
              id: 'ko-e15',
              type: 'quiz_choice',
              prompt: 'Khi được hỏi về kế hoạch 5 năm tới tại công ty, bạn nên trả lời theo hướng nào?',
              options: [
                'Trở thành một chuyên gia nòng cốt trong lĩnh vực chuyên môn, dẫn dắt đội ngũ dự án và đóng góp vào doanh thu tăng trưởng của chi nhánh.',
                'Tôi sẽ tích lũy kinh nghiệm rồi mở công ty riêng cạnh tranh với quý vị.',
                'Tôi chỉ muốn làm đúng giờ về sớm không muốn thăng chức.',
                'Tôi chưa nghĩ tới tương lai, tới đâu hay tới đó.'
              ],
              correctAnswer: 'Trở thành một chuyên gia nòng cốt trong lĩnh vực chuyên môn, dẫn dắt đội ngũ dự án và đóng góp vào doanh thu tăng trưởng của chi nhánh.',
              explanation: 'Nhà tuyển dụng Hàn Quốc tìm kiếm những nhân sự có tầm nhìn phát triển sự nghiệp gắn liền với sự hưng thịnh của công ty.'
            }
          ]
        }
      ]
    }
  ],
  scenarios: [
    {
      id: 'ko-interview',
      track: 'workplace',
      title: 'Phỏng Vấn Tập Đoàn Điện Tử Hàn Quốc',
      context: 'Bạn đang tham gia buổi phỏng vấn trực tiếp với Giám đốc Nhân sự người Hàn của nhà máy sản xuất tại Bắc Ninh.',
      location: 'Phòng Phỏng vấn Trụ sở Bắc Ninh / Trực tuyến',
      characterName: 'Park Min-ho (박민호)',
      characterRole: 'Trưởng ban Nhân sự cấp cao (인사팀장)',
      characterAvatar: '👔',
      starterMessage: {
        text: '안녕하십니까? 지원자님의 서류를 인상 깊게 보았습니다. 우리 법인에 지원하게 된 특별한 동기가 무엇인지 말씀해 주시겠습니까?',
        romanization: 'Annyeonghasimnikka? Jiwonja-nim-ui seoryureul insang gipge boasseumnida...',
        vietnameseTranslation: 'Kính chào bạn! Tôi đã xem hồ sơ của bạn và rất có ấn tượng. Bạn có thể chia sẻ động lực đặc biệt nào đã thôi thúc bạn ứng tuyển vào pháp nhân của chúng tôi không?'
      },
      objectives: [
        'Chào hỏi dứt khoát bằng "안녕하십니까! 지원자 [Tên]입니다."',
        'Nêu bật lý do chọn doanh nghiệp Hàn Quốc và thế mạnh ngôn ngữ',
        'Khẳng định sự hiểu biết về văn hóa công sở nhanh nhạy "Ppallli-ppalli" của Hàn Quốc'
      ]
    },
    {
      id: 'ko-bbq',
      track: 'daily',
      title: 'Đi Ăn Thịt Nướng K-BBQ Cùng Đồng Nghiệp Seoul',
      context: 'Buổi tối cùng các đồng nghiệp Hàn Quốc ghé một quán thịt nướng than hoa nổi tiếng tại khu Hongdae.',
      location: 'Quán Nướng Hongdae, Seoul',
      characterName: 'Kim Ji-woo (김지우)',
      characterRole: 'Đồng nghiệp tiền bối (선배)',
      characterAvatar: '🥓',
      starterMessage: {
        text: '여기 삼겹살이랑 돼지갈비 진짜 맛있어요! 소맥(소주+맥주) 한잔 말아 드릴까요?',
        romanization: 'Yeogi samgyeopsal-irang dwaejigalbi jinjja masisseoyo! Somaek hanjan mara deurilkkayo?',
        vietnameseTranslation: 'Ở đây món ba chỉ nướng và sườn heo ngon đỉnh lắm! Để chị pha cho em một ly Somaek (Soju + Bia) nhé?'
      },
      objectives: [
        'Dùng 2 tay đỡ ly rượu và cảm ơn tiền bối',
        'Gọi thêm tỏi nướng và kim chi nướng (마늘이랑 김치 더 구워 먹어요)',
        'Khen ngợi đồ ăn ngon chuẩn vị Hàn'
      ]
    }
  ],
  vocabCards: [
    {
      id: 'ko-v1',
      track: 'workplace',
      word: '책임감 (Chaegim-gam)',
      romanization: 'Chaegim-gam',
      meaning: 'Tinh thần trách nhiệm với công việc',
      partOfSpeech: 'noun',
      exampleSentence: '그는 맡은 일에 대해 남다른 책임감을 보여준다.',
      exampleTranslation: 'Anh ấy thể hiện tinh thần trách nhiệm xuất chúng đối với công việc được giao phó.',
      category: 'Phẩm chất Công sở',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 7,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'ko-v2',
      track: 'workplace',
      word: '추진력 (Chujin-ryeok)',
      romanization: 'Chujin-ryeok',
      meaning: 'Khả năng thúc đẩy dự án quyết liệt, sức bật hành động',
      partOfSpeech: 'noun',
      exampleSentence: '리더에게는 팀을 이끌 강력한 추진력이 필수적이다.',
      exampleTranslation: 'Đối với một người lãnh đạo, sức bật thúc đẩy mạnh mẽ để dẫn dắt đội ngũ là điều tối quan trọng.',
      category: 'Kỹ năng Quản lý',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'ko-v3',
      track: 'daily',
      word: '가성비 (Gaseong-bi)',
      romanization: 'Gaseong-bi (Gagyeok daebi seongneung)',
      meaning: 'Tỷ lệ hiệu năng trên giá thành (P/P - Ngon bổ rẻ)',
      partOfSpeech: 'noun',
      exampleSentence: '이 식당은 음식 맛도 좋고 가성비가 최고예요.',
      exampleTranslation: 'Quán ăn này món ăn vừa ngon mà giá cả lại cực kỳ hợp lý, chuẩn ngon bổ rẻ.',
      category: 'Đời sống Tiêu dùng',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 14,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    }
  ],
  culturalTips: [
    {
      id: 'ct-ko-1',
      topic: 'Văn hóa Bàn rượu: Quy tắc 2 tay & Quay mặt đi',
      rule: 'Ở Hàn Quốc, khi người lớn tuổi hoặc cấp trên rót rượu cho bạn, bạn phải dùng hai tay để nâng ly. Khi uống, tuyệt đối không nhìn thẳng vào mắt người lớn mà hãy hơi nghiêng người sang một bên và lấy tay che nhẹ khi uống cạn.',
      doText: 'Dùng tay phải cầm ly, tay trái đỡ dưới cổ tay phải hoặc đặt nhẹ trước ngực.',
      dontText: 'Đừng bao giờ cầm ly bằng một tay hoặc nhìn chằm chằm vào mặt sếp khi uống rượu.',
      essentialPhrase: '감사히 마시겠습니다!(Gamsahi masigetseumnida!)',
      phraseTranslation: 'Cháu/em xin phép nhận và uống rượu với lòng biết ơn ạ!'
    },
    {
      id: 'ct-ko-2',
      topic: 'Văn hóa "Ppalli-Ppalli" (빨리빨리 - Nhanh lên, Khẩn trương)',
      rule: 'Xã hội Hàn Quốc vận hành với tốc độ cực nhanh. Trong công việc, các yêu cầu phản hồi email, tiến độ công việc được kỳ vọng xử lý ngay lập tức (Speed is everything).',
      doText: 'Phản hồi tin nhắn/email công việc trong vòng 15-30 phút kể cả khi chưa có kết quả cuối cùng.',
      dontText: 'Đừng im lặng không hồi âm khiến cấp trên Hàn Quốc lo lắng hoặc bực mình.',
      essentialPhrase: '지금 바로 확인하고 신속히 처리하겠습니다.',
      phraseTranslation: 'Em đang kiểm tra ngay đây và sẽ xử lý thật nhanh chóng ạ.'
    }
  ]
};
