import { LanguageCourse } from '../curriculum';

export const frenchCourse: LanguageCourse = {
  id: 'french',
  name: 'French',
  nativeName: 'Français',
  vietnameseName: 'Tiếng Pháp',
  flagEmoji: '🇫🇷',
  flagColor: '#2563eb',
  voiceLangCode: 'fr-FR',
  scriptType: 'Bảng chữ cái Latinh với các dấu phụ (é, è, ê, ç, à)',
  examInfo: [
    {
      examName: 'DELF / DALF (Diplôme d’Études en Langue Française)',
      targetLevel: 'DELF B1 - B2 / DALF C1',
      overview: 'Văn bằng chứng chỉ tiếng Pháp chính thức và duy nhất có giá trị vĩnh viễn do Bộ Giáo dục Quốc gia Pháp cấp, bắt buộc khi du học đại học tại Pháp, định cư Canada (diện Quebec hoặc Express Entry).',
      formatSections: [
        'Compréhension de l’oral (Nghe hiểu): 30 phút (Hội thoại thường ngày, bản tin phát thanh Pháp)',
        'Compréhension des écrits (Đọc hiểu): 1 giờ (Bài báo xã hội, văn bản phân tích)',
        'Production écrite (Viết): 1 giờ (Viết thư bày tỏ quan điểm, bài luận tranh biện - 250 từ)',
        'Production orale (Nói): 20 phút (Trình bày quan điểm cá nhân và tranh luận trực tiếp với giám khảo)'
      ],
      strategyTips: [
        'Production Orale B2: Luôn mở đầu bài nói theo cấu trúc 3 phần rõ ràng: Introduction (nêu vấn đề & dàn ý), Développement (2 luận điểm phản biện và ủng hộ), Conclusion (tổng kết và nêu quan điểm cá nhân).',
        'Sử dụng các từ nối lập luận (Connecteurs logiques): Dùng thường xuyên "D\'une part... d\'autre part...", "En revanche...", "Néanmoins...", "Par conséquent..." để đạt điểm tối đa tiêu chí mạch lạc (Cohérence).',
        'Quy tắc Giống Đực / Giống Cái (Masculin / Féminin): Học từ vựng luôn kèm mạo từ (Un/Une hoặc Le/La) để tránh sai sót hợp giống số trong phần thi viết.'
      ],
      sampleQuestions: [
        {
          question: 'DELF B2 Production Écrite Connecteur: "______ les mesures prises par la mairie, la circulation reste dense aux heures de pointe."',
          options: ['Malgré', 'Parce que', 'Puisque', 'Grâce à'],
          correctAnswer: 'Malgré',
          explanationInVietnamese: 'Cấu trúc chỉ sự nhượng bộ đối lập: "Malgré + Danh từ" (Mặc dù...). "Grâce à" chỉ nguyên nhân tích cực (nhờ có), "Parce que" chỉ nguyên nhân logic.'
        },
        {
          question: 'DELF B2 Grammaire: "Il est indispensable que nous ______ une solution durable avant la fin du trimestre."',
          options: ['trouvions (Subjonctif présent)', 'trouvons (Indicatif présent)', 'trouverons (Futur simple)', 'avons trouvé'],
          correctAnswer: 'trouvions (Subjonctif présent)',
          explanationInVietnamese: 'Cấu trúc biểu thị sự cấp thiết, bắt buộc: "Il est indispensable que + Mệnh đề chia ở Thức giả định (Subjonctif)". Với chủ ngữ "nous", động từ "trouver" chia thành "trouvions".'
        },
        {
          question: 'DELF B1 Vocabulaire: "Après de longues négociations, les deux parties ont finalement trouvé un ______."',
          options: ['compromis', 'désaccord', 'problème', 'combat'],
          correctAnswer: 'compromis',
          explanationInVietnamese: 'Cụm từ cố định trong đàm phán thương mại: "trouver un compromis" có nghĩa là tìm được tiếng nói chung, đạt được sự thỏa hiệp nhượng bộ đôi bên cùng có lợi.'
        }
      ]
    }
  ],
  units: [
    {
      id: 'fr-u1',
      number: 1,
      track: 'daily',
      title: 'Chào Hỏi Lịch Thiệp & Văn Hóa "Vous" vs "Tu"',
      description: 'Nắm vững quy tắc xưng hô trang trọng (Vous) và thân mật (Tu), mở đầu lời chào nhã nhặn của người Pháp.',
      cefrLevel: 'A1 - A2',
      lessons: [
        {
          id: 'fr-l1',
          track: 'daily',
          title: 'Chào hỏi Chuẩn Mực & Giới Thiệu Bản Thân',
          description: 'Cách mở lời chào "Bonjour" bất biến khi bước vào bất kỳ không gian nào tại Pháp.',
          durationMinutes: 4,
          xpReward: 30,
          exercises: [
            {
              id: 'fr-e1',
              type: 'flashcard',
              prompt: 'Mẫu câu chào lịch thiệp và hỏi thăm sức khỏe trang trọng',
              targetText: 'Bonjour madame, comment allez-vous aujourd’hui ?',
              romanization: '/bɔ̃.ʒuʁ ma.dam kɔ.mɑ̃.t‿a.le vu o.ʒuʁ.dɥi/',
              vietnameseMeaning: 'Kính chào bà, hôm nay bà cảm thấy thế nào ạ?',
              audioText: 'Bonjour madame, comment allez-vous aujourd’hui ?',
              explanation: 'Dùng "Comment allez-vous" với người mới gặp, cấp trên hoặc người lớn tuổi để thể hiện sự tôn trọng tuyệt đối.',
              culturalNote: 'Ở Pháp, khi bước vào bất kỳ cửa hàng, quán cà phê hay thang máy nào, việc đầu tiên PHẢI NÓI là "Bonjour"!'
            },
            {
              id: 'fr-e2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Tôi rất vui được làm quen với bạn."',
              targetText: 'Je suis très enchanté de faire votre connaissance.',
              wordTokens: ['Je suis', 'très enchanté', 'de faire', 'votre connaissance.', 'merci', 'au revoir'],
              explanation: '"Faire votre connaissance" là mẫu câu trang trọng để nói việc được làm quen với quý ngài/quý bà.'
            },
            {
              id: 'fr-e3',
              type: 'quiz_choice',
              prompt: 'Khi nào bạn có thể bắt đầu chuyển từ xưng "Vous" sang xưng "Tu" (Tutoyer) với một người bạn Pháp?',
              options: [
                'Khi người đó chủ động đề xuất: "On peut se tutoyer ?" (Chúng ta xưng bạn-tớ nhé?)',
                'Ngay khi vừa nhìn thấy mặt họ lần đầu.',
                'Khi họ là sếp của bạn trong công ty.',
                'Không bao giờ được phép xưng Tu.'
              ],
              correctAnswer: 'Khi người đó chủ động đề xuất: "On peut se tutoyer ?" (Chúng ta xưng bạn-tớ nhé?)',
              explanation: 'Quy tắc xã hội Pháp rất nghiêm ngặt: Hãy luôn xưng "Vous" cho đến khi đối phương (đặc biệt là người lớn tuổi hơn hoặc cấp trên) mở lời đề xuất "On se tutoie ?".'
            }
          ]
        },
        {
          id: 'fr-l2',
          track: 'daily',
          title: 'Tiệm Bánh Mì Boulangerie & Quán Cà Phê Parisien',
          description: 'Gọi bánh sừng bò (croissant), bánh mì baguette giòn tan và tách cà phê espresso thơm lừng.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'fr-e4',
              type: 'flashcard',
              prompt: 'Mẫu câu gọi bánh mì kinh điển tại tiệm bánh Pháp',
              targetText: 'Une baguette tradition bien cuite, s’il vous plaît !',
              romanization: '/yn ba.ɡɛt tʁa.di.sjɔ̃ bjɛ̃ kɥit sil vu plɛ/',
              vietnameseMeaning: 'Làm ơn cho tôi một ổ bánh mì baguette truyền thống nướng kỹ giòn tan nhé!',
              audioText: 'Une baguette tradition bien cuite, s’il vous plaît !',
              explanation: '"Baguette tradition" ngon hơn nhiều so với baguette thường. "Bien cuite" nghĩa là nướng chín tới vỏ giòn rụm.',
              culturalNote: 'Luôn kèm "S’il vous plaît" (Làm ơn) ở cuối câu để giữ đúng phong thái thanh lịch.'
            },
            {
              id: 'fr-e5',
              type: 'fill_blank',
              prompt: 'Điền mạo từ thích hợp: "Je voudrais ______ café au lait avec un croissant, s’il vous plaît."',
              options: ['un', 'une', 'de la', 'des'],
              correctAnswer: 'un',
              explanation: '"Café" là danh từ giống đực số ít (Masculin singulier), vì vậy mạo từ không xác định tương ứng là "un".'
            }
          ]
        }
      ]
    },
    {
      id: 'fr-u2',
      number: 2,
      track: 'daily',
      title: 'Ẩm Thực Nhà Hàng & Đi Lại Tại Paris',
      description: 'Gọi thực đơn trưa (Menu du jour), hỏi món đặc sản vùng miền, xin hóa đơn và đi tàu điện ngầm Métro.',
      cefrLevel: 'A2 - B1',
      lessons: [
        {
          id: 'fr-l3',
          track: 'daily',
          title: 'Dùng Bữa Tại Bistro Pháp & Xin Hóa Đơn',
          description: 'Cách gọi món khai vị (entrée), món chính (plat), tráng miệng (dessert) và xin nước lọc miễn phí (carafe d\'eau).',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'fr-e6',
              type: 'flashcard',
              prompt: 'Xin bình nước lọc miễn phí tại nhà hàng Pháp',
              targetText: 'Pourriez-vous nous apporter une carafe d’eau, s’il vous plaît ?',
              romanization: '/pu.ʁje vu nu.z‿a.pɔʁ.te yn ka.ʁaf do sil vu plɛ/',
              vietnameseMeaning: 'Anh/chị có thể mang cho chúng tôi một bình nước lọc được không ạ?',
              audioText: 'Pourriez-vous nous apporter une carafe d’eau, s’il vous plaît ?',
              explanation: 'Tại Pháp, luật pháp quy định "une carafe d’eau" (bình nước lọc máy) và bánh mì là hoàn toàn miễn phí tại mọi nhà hàng.',
              culturalNote: 'Nếu chỉ nói "de l\'eau", bồi bàn có thể sẽ mang chai nước khoáng đóng chai có tính tiền (Evian/San Pellegrino).'
            },
            {
              id: 'fr-e7',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Xin lỗi, cho chúng tôi xin hóa đơn tính tiền nhé."',
              targetText: 'L’addition, s’il vous plaît, dès que vous avez un moment.',
              wordTokens: ['L’addition,', 's’il vous plaît,', 'dès que', 'vous avez', 'un moment.', 'pain', 'salade'],
              explanation: '"L\'addition" là hóa đơn thanh toán trong nhà hàng.'
            }
          ]
        },
        {
          id: 'fr-l3b',
          track: 'daily',
          title: 'Đi Tàu Điện Ngầm Métro & Hỏi Đường Tại Paris',
          description: 'Mua vé Pass Navigo, chuyển tuyến tại ga Châtelet và hỏi hướng đi trạm xe lửa.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'fr-e7b',
              type: 'flashcard',
              prompt: 'Mẫu câu hỏi hướng tàu điện ngầm',
              targetText: 'Pardon, cette ligne va-t-elle bien en direction de la Gare de Lyon ?',
              romanization: '/paʁ.dɔ̃ sɛt liɲ va t‿ɛl bjɛ̃ ɑ̃ di.ʁɛk.sjɔ̃ də la ɡaʁ də ljɔ̃/',
              vietnameseMeaning: 'Xin lỗi, tuyến tàu này có đúng là đi về hướng ga Lyon không ạ?',
              audioText: 'Pardon, cette ligne va-t-elle bien en direction de la Gare de Lyon ?',
              explanation: '"En direction de" là cụm từ chỉ hướng đi cuối của tuyến tàu trên bản đồ Métro.',
              culturalNote: 'Ga Châtelet - Les Halles là ga tàu điện ngầm ngầm lớn nhất thế giới, hãy luôn để ý bảng chỉ dẫn màu sắc.'
            },
            {
              id: 'fr-e7c',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "Il faut changer de ligne à la station ______ suivante."',
              options: ['correspondance', 'sortie', 'billet', 'voyage'],
              correctAnswer: 'correspondance',
              explanation: '"Correspondance" trong hệ thống giao thông công cộng Pháp có nghĩa là điểm chuyển tiếp giữa các tuyến tàu/xe.'
            }
          ]
        },
        {
          id: 'fr-l3c',
          track: 'daily',
          title: 'Mua Thuốc & Miêu Tả Triệu Chứng Tại Hiệu Thuốc (Pharmacie)',
          description: 'Cách miêu tả đau đầu, cảm sốt, dị ứng và mua thuốc không cần toa (sans ordonnance).',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'fr-e7d',
              type: 'flashcard',
              prompt: 'Mẫu câu miêu tả triệu chứng sức khỏe kinh điển',
              targetText: 'J’ai mal à la tête et j’ai de la fièvre depuis hier soir.',
              romanization: '/ʒe ma.l‿a la tɛt e ʒe də la fjɛvʁ də.pɥi jɛʁ swaʁ/',
              vietnameseMeaning: 'Tôi bị đau đầu và bị sốt từ tối hôm qua.',
              audioText: 'J’ai mal à la tête et j’ai de la fièvre depuis hier soir.',
              explanation: 'Cấu trúc "Avoir mal à + bộ phận cơ thể" (Avoir mal à la tête / au ventre / à la gorge).',
              culturalNote: 'Ở Pháp, các tiệm thuốc tây có biểu tượng chữ thập xanh lá cây phát sáng nhấp nháy trên phố.'
            },
            {
              id: 'fr-e7e',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Bạn có thuốc gì trị cảm lạnh mà không cần toa bác sĩ không?"',
              targetText: 'Avez-vous un médicament contre le rhume sans ordonnance ?',
              wordTokens: ['Avez-vous', 'un médicament', 'contre le rhume', 'sans', 'ordonnance ?', 'manger', 'soir'],
              explanation: '"Sans ordonnance" là thuốc bán tự do không cần đơn thuốc của bác sĩ.'
            }
          ]
        }
      ]
    },
    {
      id: 'fr-u3',
      number: 3,
      track: 'workplace',
      title: 'Tiếng Pháp Thương Mại & Email Chuyên Nghiệp',
      description: 'Quy chuẩn viết email công vụ Pháp, câu mở đầu lịch thiệp và các công thức kết thư trang trọng (Formules de politesse).',
      cefrLevel: 'B1 - B2',
      lessons: [
        {
          id: 'fr-l4',
          track: 'workplace',
          title: 'Viết Email Công Việc Chuẩn Mực',
          description: 'Học các công thức kết thư kinh điển mà mọi người làm việc với đối tác Pháp bắt buộc phải thuộc lòng.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'fr-e8',
              type: 'flashcard',
              prompt: 'Công thức kết thư thương mại trang trọng bậc nhất',
              targetText: 'Veuillez agréer, Madame, Monsieur, l’expression de mes salutations distinguées.',
              romanization: '/vœ.je a.ɡʁe.e ma.dam mə.sjø lɛk.spʁɛ.sjɔ̃ də me sa.ly.ta.sjɔ̃ dis.tɛ̃.ɡe/',
              vietnameseMeaning: 'Kính mong Quý bà, Quý ông tiếp nhận nơi đây sự kính trọng sâu sắc của tôi.',
              audioText: 'Veuillez agréer, Madame, Monsieur, l’expression de mes salutations distinguées.',
              explanation: 'Đây là công thức kết thư ngoại giao và thương mại chuẩn mực nhất nước Pháp cho các thư từ trang trọng.',
              culturalNote: 'Người Pháp rất khắt khe về công thức kết thư; dùng sai công thức có thể bị xem là thiếu học thức hoặc thô thiển.'
            },
            {
              id: 'fr-e9',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Vui lòng xem báo cáo tài chính đính kèm theo thư này."',
              targetText: 'Veuillez trouver ci-joint le rapport financier pour consultation.',
              wordTokens: ['Veuillez trouver', 'ci-joint', 'le rapport', 'financier', 'pour', 'consultation.', 'regarder', 'hier'],
              explanation: '"Veuillez trouver ci-joint" là mẫu câu chuẩn thông báo tệp đính kèm trong thư thương mại Pháp.'
            }
          ]
        },
        {
          id: 'fr-l4b',
          track: 'workplace',
          title: 'Đàm Phán Hợp Đồng & Chiết Khấu Thương Mại',
          description: 'Cách đề xuất mức chiết khấu theo số lượng (remise), thảo luận phương thức thanh toán và thời hạn bàn giao.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'fr-e9b',
              type: 'flashcard',
              prompt: 'Mẫu câu đàm phán chiết khấu lịch sự',
              targetText: 'Pourriez-vous nous accorder une remise de 5 % pour une commande de ce volume ?',
              romanization: '/pu.ʁje vu nu.z‿a.kɔʁ.de yn ʁə.miz də sɛ̃k puʁ sɑ̃.../',
              vietnameseMeaning: 'Quý công ty có thể dành cho chúng tôi mức chiết khấu 5% cho một đơn đặt hàng khối lượng này không?',
              audioText: 'Pourriez-vous nous accorder une remise de cinq pour cent pour une commande de ce volume ?',
              explanation: '"Accorder une remise" (dành mức chiết khấu/giảm giá thương mại).',
              culturalNote: 'Trong kinh doanh với Pháp, việc đàm phán giá cần dựa trên logic chất lượng và số lượng cụ thể chứ không mặc cả cảm tính.'
            },
            {
              id: 'fr-e9c',
              type: 'quiz_choice',
              prompt: 'Thuật ngữ nào trong tiếng Pháp thương mại chỉ "thời hạn bàn giao sản phẩm"?',
              options: ['Le délai de livraison', 'La facture proforma', 'Le bon de commande', 'La lettre de crédit'],
              correctAnswer: 'Le délai de livraison',
              explanation: '"Délai de livraison" là thời hạn giao hàng cam kết trong hợp đồng thương mại.'
            }
          ]
        }
      ]
    },
    {
      id: 'fr-u4',
      number: 4,
      track: 'workplace',
      title: 'Phỏng Vấn Xin Việc Tiếng Pháp (Entretien d’embauche)',
      description: 'Nêu bật kinh nghiệm nghề nghiệp, thể hiện sự am hiểu thị trường Francophone và đàm phán hợp đồng lao động.',
      cefrLevel: 'B2 - C1',
      lessons: [
        {
          id: 'fr-l5',
          track: 'workplace',
          title: 'Giới Thiệu Bản Thân & Động Lực Nghề Nghiệp',
          description: 'Cách mở đầu bài phỏng vấn tuyển dụng, nêu bật thành tích và sự gắn bó với văn hóa doanh nghiệp Pháp.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'fr-e10',
              type: 'flashcard',
              prompt: 'Mẫu câu nêu bật thế mạnh chuyên môn',
              targetText: 'Mon parcours professionnel m’a permis de développer une solide expertise en gestion de projets multiculturels.',
              romanization: '/mɔ̃ paʁ.kuʁ pʁɔ.fɛ.sjɔ.nɛl ma pɛʁ.mi də de.vlɔ.pe yn sɔ.lid ɛk.spɛʁ.tiz.../',
              vietnameseMeaning: 'Quá trình công tác đã giúp tôi xây dựng chuyên môn vững chắc về quản lý các dự án đa văn hóa.',
              audioText: 'Mon parcours professionnel m’a permis de développer une solide expertise en gestion de projets multiculturels.',
              explanation: '"Parcours professionnel" (hành trình sự nghiệp); "solide expertise" (chuyên môn vững chắc).',
              culturalNote: 'Người phỏng vấn Pháp rất thích ứng viên có khả năng lập luận logic và tư duy phản biện sắc bén (Esprit critique).'
            },
            {
              id: 'fr-e11',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu phỏng vấn: "Tôi bị cuốn hút mạnh mẽ bởi những giá trị nhân văn mà tập đoàn theo đuổi."',
              targetText: 'Je suis vivement attiré par les valeurs humaines portées par votre groupe.',
              wordTokens: ['Je suis', 'vivement attiré', 'par les', 'valeurs humaines', 'portées par', 'votre groupe.', 'peur', 'jamais'],
              explanation: '"Valeurs humaines" (các giá trị nhân văn) là cụm từ rất được các tập đoàn Pháp (như L’Oréal, Total, Danone) trân trọng.'
            },
            {
              id: 'fr-e12',
              type: 'quiz_choice',
              prompt: 'Khi được hỏi về mức lương mong muốn: "Quelles sont vos prétentions salariales ?", câu trả lời nào là chuẩn mực nhất?',
              options: [
                'Compte tenu de mon profil et des responsabilités du poste, j’envisage une rémunération annuelle brute comprise entre 42 000 et 45 000 euros.(Dựa trên năng lực và trách nhiệm công việc, tôi kỳ vọng mức lương gộp từ 42.000 đến 45.000 euro/năm).',
                'Donnez-moi n’importe quoi, je m’en fiche.(Cho tôi bao nhiêu cũng được, tôi không quan tâm).',
                'Je veux le maximum d’argent possible.(Tôi muốn càng nhiều tiền càng tốt).',
                'Le salaire ne m’intéresse pas du tout.(Lương không làm tôi bận tâm).'
              ],
              correctAnswer: 'Compte tenu de mon profil et des responsabilités du poste, j’envisage une rémunération annuelle brute comprise entre 42 000 et 45 000 euros.(Dựa trên năng lực và trách nhiệm công việc, tôi kỳ vọng mức lương gộp từ 42.000 đến 45.000 euro/năm).',
              explanation: 'Tại Pháp, đàm phán lương luôn thảo luận theo con số Lương gộp hàng năm (Rémunération annuelle brute) và nêu một khoảng (fourchette) hợp lý.'
            }
          ]
        }
      ]
    }
  ],
  scenarios: [
    {
      id: 'fr-interview',
      track: 'workplace',
      title: 'Phỏng Vấn Trực Tiếp Tại Tập Đoàn Dược Phẩm Pháp',
      context: 'Bạn đang ứng tuyển vị trí Giám đốc Phát triển Kinh doanh Đông Nam Á cho một tập đoàn y tế Pháp tại Paris.',
      location: 'Trụ sở La Défense, Paris / Google Meet',
      characterName: 'Claire Dubois',
      characterRole: 'Directrice des Ressources Humaines',
      characterAvatar: '💼',
      starterMessage: {
        text: 'Bonjour ! Merci de nous rejoindre. Votre candidature a particulièrement retenu notre attention. Pourriez-vous nous présenter les grandes lignes de votre parcours professionnel ?',
        romanization: '/bɔ̃.ʒuʁ mɛʁ.si də nu ʁə.ʒwɛ̃dʁ.../',
        vietnameseTranslation: 'Kính chào bạn! Cảm ơn bạn đã tham gia cùng chúng tôi. Hồ sơ của bạn đặc biệt thu hút sự chú ý của chúng tôi. Bạn có thể trình bày những nét chính trong quá trình công tác của mình không?'
      },
      objectives: [
        'Chào hỏi trang trọng: "Bonjour Madame Dubois, c’est un plaisir."',
        'Trình bày mạch lạc theo mô hình logic: Hiện tại, quá khứ và định hướng tương lai',
        'Nêu bật khả năng kết nối thị trường Việt Nam và Pháp'
      ]
    },
    {
      id: 'fr-bistro',
      track: 'daily',
      title: 'Thưởng Thức Ẩm Thực Tại Quán Bistro Saint-Germain',
      context: 'Bạn bước vào một quán ăn ấm cúng gần nhà thờ Saint-Germain-des-Prés ở trung tâm thủ đô Paris.',
      location: 'Bistro Saint-Germain, Paris',
      characterName: 'Julien',
      characterRole: 'Bồi bàn trưởng (Maître d’hôtel)',
      characterAvatar: '🥖',
      starterMessage: {
        text: 'Bonjour monsieur ! Avez-vous une réservation ? Nous avons une charmante table près de la fenêtre.',
        romanization: '/bɔ̃.ʒuʁ mə.sjø.../',
        vietnameseTranslation: 'Kính chào quý ngài! Quý khách đã đặt bàn trước chưa ạ? Chúng tôi có một bàn rất xinh xắn cạnh cửa sổ.'
      },
      objectives: [
        'Chào lại bằng "Bonjour monsieur"',
        'Hỏi xem thực đơn hôm nay có món gì đặc biệt (Le plat du jour)',
        'Gọi một bình nước lọc miễn phí (Une carafe d’eau)'
      ]
    }
  ],
  vocabCards: [
    {
      id: 'fr-v1',
      track: 'workplace',
      word: 'Polyvalent',
      romanization: '/Pô-li-va-lăng/',
      meaning: 'Đa năng, linh hoạt, đảm nhiệm được nhiều vai trò',
      partOfSpeech: 'adjective',
      exampleSentence: 'Dans une entreprise dynamique, être polyvalent est un atout majeur.',
      exampleTranslation: 'Trong một doanh nghiệp năng động, sự đa năng là một lợi thế cực kỳ lớn.',
      category: 'Kỹ năng Công việc',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 7,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'fr-v2',
      track: 'workplace',
      word: 'Rémunération',
      romanization: '/Rê-my-nê-ra-si-ông/',
      meaning: 'Gói thù lao, tiền lương và phụ cấp tổng thể',
      partOfSpeech: 'noun',
      exampleSentence: 'La rémunération comprend un salaire fixe et une prime sur objectifs.',
      exampleTranslation: 'Gói thù lao bao gồm lương cứng và tiền thưởng theo hiệu quả công việc.',
      category: 'Hợp đồng & Lương thưởng',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'fr-v3',
      track: 'daily',
      word: 'Convivialité',
      romanization: '/Côn-vi-vi-a-li-tê/',
      meaning: 'Không khí ấm cúng, vui vẻ thân tình khi quây quần bên nhau',
      partOfSpeech: 'noun',
      exampleSentence: 'Ce restaurant est réputé pour sa délicieuse cuisine et sa grande convivialité.',
      exampleTranslation: 'Nhà hàng này nổi tiếng với các món ăn ngon và không khí vô cùng ấm áp, thân tình.',
      category: 'Đời sống & Ẩm thực',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 12,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    }
  ],
  culturalTips: [
    {
      id: 'ct-fr-1',
      topic: 'Quy tắc "Bonjour" thiêng liêng trong văn hóa Pháp',
      rule: 'Ở Pháp, bạn KHÔNG THỂ hỏi bất cứ điều gì (dù là hỏi đường hay mua một thanh kẹo cao su) nếu chưa nói "Bonjour". Nếu không nói Bonjour trước, người Pháp sẽ cảm thấy bạn coi họ như một cỗ máy chứ không phải con người.',
      doText: 'Luôn mỉm cười và nói "Bonjour Madame / Monsieur" trước khi hỏi bất cứ điều gì.',
      dontText: 'Đừng bao giờ bước thẳng vào quầy và nói: "Bán cho tôi cái bánh mì" mà không chào.',
      essentialPhrase: 'Bonjour, excusez-moi de vous déranger...',
      phraseTranslation: 'Xin chào, xin thứ lỗi vì đã làm phiền quý vị...'
    },
    {
      id: 'ct-fr-2',
      topic: 'Văn hóa Bữa ăn Trưa công sở & Tranh luận bàn tròn',
      rule: 'Người Pháp không có thói quen vừa ăn trưa vừa cắm đầu vào máy tính ở bàn làm việc. Giờ nghỉ trưa (La pause déjeuner) kéo dài ít nhất 1 tiếng là lúc đồng nghiệp ra quán trò chuyện, tranh luận các vấn đề xã hội để gắn kết.',
      doText: 'Tham gia ăn trưa cùng đồng nghiệp và cởi mở trao đổi các quan điểm xã hội, văn hóa.',
      dontText: 'Đừng cô lập bản thân ăn một mình trước màn hình vi tính mỗi ngày.',
      essentialPhrase: 'On va déjeuner ensemble aujourd’hui ?',
      phraseTranslation: 'Hôm nay tụi mình cùng đi ăn trưa nhé?'
    }
  ]
};
