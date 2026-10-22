import { LanguageCourse } from '../curriculum';

export const spanishCourse: LanguageCourse = {
  id: 'spanish',
  name: 'Spanish',
  nativeName: 'Español',
  vietnameseName: 'Tiếng Tây Ban Nha',
  flagEmoji: '🇪🇸',
  flagColor: '#ea580c',
  voiceLangCode: 'es-ES',
  scriptType: 'Bảng chữ cái Latinh với dấu ngã trên chữ ñ và dấu câu đảo ngược (¡ !, ¿ ?)',
  examInfo: [
    {
      examName: 'DELE / SIELE (Diplomas de Español como Lengua Extranjera)',
      targetLevel: 'DELE B1 - B2 (Khung Châu Âu CEFR)',
      overview: 'Văn bằng chính thức công nhận trình độ thành thạo tiếng Tây Ban Nha do Viện Cervantes (Instituto Cervantes) cấp thay mặt Bộ Giáo dục Tây Ban Nha, có giá trị vĩnh viễn trên toàn cầu.',
      formatSections: [
        'Comprensión de lectura (Đọc hiểu): 70 phút (4 bài khóa phân tích văn bản, chọn tiêu đề khớp đoạn, trích dẫn bài báo)',
        'Comprensión auditiva (Nghe hiểu): 40 phút (5 phần nghe độc thoại, tin tức phát thanh, đối thoại thường nhật)',
        'Expresión e interacción escritas (Viết): 80 phút (Viết thư trang trọng và bài luận tổng hợp ý kiến - 180 từ)',
        'Expresión e interacción orales (Nói): 20 phút (Thuyết trình giải pháp và tranh luận với giám khảo)'
      ],
      strategyTips: [
        'Phân biệt Thức giả định (Modo Subjuntivo): Đây là chìa khóa vàng để đạt điểm B1-B2. Khi biểu thị mong muốn (Quiero que...), cảm xúc (Me alegra que...), hoặc nghi ngờ (Dudo que...), động từ phụ bắt buộc phải chia ở thì Subjuntivo.',
        'Phân biệt "Por" và "Para": Ghi nhớ "Por" chỉ nguyên nhân, lý do, phương tiện hoặc khoảng thời gian; trong khi "Para" chỉ mục đích, đích đến cuối cùng hoặc thời hạn chót.',
        'Phân biệt "Ser" và "Estar": "Ser" chỉ bản chất lâu dài, nghề nghiệp, nguồn gốc; "Estar" chỉ trạng thái tạm thời, cảm xúc nhất thời hoặc vị trí địa lý.'
      ],
      sampleQuestions: [
        {
          question: 'DELE B2 Gramática: Chọn thể động từ đúng: "Es imprescindible que los empleados ______ las normas de seguridad."',
          options: [
            'respeten (Subjuntivo presente)',
            'respetan (Indicativo presente)',
            'respetarán (Futuro simple)',
            'han respetado'
          ],
          correctAnswer: 'respeten (Subjuntivo presente)',
          explanationInVietnamese: 'Cấu trúc biểu thị sự cần thiết khách quan: "Es imprescindible que + Mệnh đề chia ở Thức giả định Subjuntivo". Với chủ ngữ số nhiều "los empleados", động từ "respetar" đổi đuôi thành "respeten".'
        },
        {
          question: 'DELE B1 Uso de la Lengua: "Este informe debe estar terminado ______ el próximo viernes."',
          options: ['para', 'por', 'en', 'de'],
          correctAnswer: 'para',
          explanationInVietnamese: 'Khi diễn đạt thời hạn chót (Deadline), tiếng Tây Ban Nha luôn dùng giới từ "para": "para el próximo viernes" (trước/hạn chót là thứ Sáu tuần tới).'
        },
        {
          question: 'DELE B2 Vocabulario: "La empresa ha logrado ______ nuevos mercados en el sudeste asiático."',
          options: ['penetrar en', 'romper con', 'caer de', 'venir a'],
          correctAnswer: 'penetrar en',
          explanationInVietnamese: 'Thuật ngữ kinh doanh thương mại quốc tế: "penetrar en nuevos mercados" có nghĩa là thâm nhập thành công vào các thị trường mới.'
        }
      ]
    }
  ],
  units: [
    {
      id: 'es-u1',
      number: 1,
      track: 'daily',
      title: 'Chào Hỏi & Xưng Hô Lịch Thiệp "Usted" vs "Tú"',
      description: 'Làm quen với ngữ điệu sôi nổi của tiếng Tây Ban Nha, xưng hô trang trọng (Usted) và thân mật (Tú), tự giới thiệu bản thân.',
      cefrLevel: 'A1',
      lessons: [
        {
          id: 'es-l1',
          track: 'daily',
          title: 'Chào hỏi Chuẩn Mực & Giới Thiệu Bản Thân',
          description: 'Cách mở lời chào ¡Hola!, ¡Buenos días!, giới thiệu tên tuổi, quốc tịch và nghề nghiệp.',
          durationMinutes: 4,
          xpReward: 30,
          exercises: [
            {
              id: 'es-e1',
              type: 'flashcard',
              prompt: 'Mẫu câu chào lịch sự và hỏi thăm tên tuổi',
              targetText: '¡Mucho gusto! Me llamo Nam y soy de Vietnam.',
              romanization: 'Moo-choh goos-toh! Meh yah-moh Nahm ee soy deh Vyet-nahm.',
              vietnameseMeaning: 'Rất hân hạnh được gặp bạn! Tôi tên là Nam và tôi đến từ Việt Nam.',
              audioText: '¡Mucho gusto! Me llamo Nam y soy de Vietnam.',
              explanation: '"Mucho gusto" là cách nói tự nhiên và lịch thiệp nhất khi làm quen lần đầu.',
              culturalNote: 'Ở Tây Ban Nha và Mỹ Latinh, phong thái chào hỏi rất nồng ấm, thường kèm theo nụ cười cởi mở và cái bắt tay ấm áp.'
            },
            {
              id: 'es-e2',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Xin lỗi, ngài tên là gì vậy ạ?"',
              targetText: 'Disculpe, ¿cómo se llama usted?',
              wordTokens: ['Disculpe,', '¿cómo', 'se llama', 'usted?', 'amigo', 'mañana'],
              explanation: '"Usted" là đại từ ngôi thứ hai số ít lịch sự trang trọng, động từ chia theo ngôi thứ ba.'
            },
            {
              id: 'es-e3',
              type: 'quiz_choice',
              prompt: 'Lời chào nào phù hợp nhất để chúc một buổi chiều tốt lành sau 14:00 tại Tây Ban Nha?',
              options: [
                '¡Buenas tardes! (Chào buổi chiều)',
                '¡Buenos días! (Chào buổi sáng)',
                '¡Buenas noches! (Chào buổi tối)',
                '¡Hasta pronto! (Hẹn sớm gặp lại)'
              ],
              correctAnswer: '¡Buenas tardes! (Chào buổi chiều)',
              explanation: 'Tại Tây Ban Nha, "Buenas tardes" được dùng từ sau bữa trưa (khoảng 14:00) cho đến khi mặt trời lặn (khoảng 20:30 - 21:00).'
            }
          ]
        },
        {
          id: 'es-l2',
          track: 'daily',
          title: 'Ẩm Thực Quán Bar Tapas & Gọi Món',
          description: 'Gọi các món tapas truyền thống (patatas bravas, jamón ibérico), thức uống và xin hóa đơn.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'es-e4',
              type: 'flashcard',
              prompt: 'Mẫu câu gọi món tại quán ăn Tây Ban Nha',
              targetText: '¿Nos trae una ración de jamón ibérico y dos aguas con gas, por favor?',
              romanization: 'Nohs trah-eh oo-nah rah-syohn deh hah-mohn ee-beh-ree-koh...',
              vietnameseMeaning: 'Làm ơn mang cho chúng tôi một phần đùi heo muối Iberico và hai chai nước có ga nhé?',
              audioText: '¿Nos trae una ración de jamón ibérico y dos aguas con gas, por favor?',
              explanation: '"Ración" là một đĩa phần ăn đầy đặn; "tapa" là đĩa nhỏ nhắm rượu.',
              culturalNote: 'Đi ăn tapas (Ir de tapas) là nét văn hóa cộng đồng đặc sắc, nơi bạn bè chuyển từ quán này sang quán khác cùng thưởng thức.'
            },
            {
              id: 'es-e5',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "Disculpe camarero, ¿nos trae ______ cuenta, por favor?"',
              options: ['la', 'el', 'los', 'las'],
              correctAnswer: 'la',
              explanation: '"Cuenta" (hóa đơn thanh toán) là danh từ giống cái số ít, vì vậy mạo từ xác định đi kèm là "la cuenta".'
            }
          ]
        }
      ]
    },
    {
      id: 'es-u2',
      number: 2,
      track: 'daily',
      title: 'Hỏi Đường & Mua Sắm Tại Thành Phố (Madrid / Barcelona)',
      description: 'Hỏi đường đến ga tàu điện ngầm, hỏi giá cả và hỏi quầy hoàn thuế (Tax Free) tại trung tâm thương mại.',
      cefrLevel: 'A2',
      lessons: [
        {
          id: 'es-l3',
          track: 'daily',
          title: 'Chỉ Đường & Di Chuyển Bằng Phương Tiện Công Cộng',
          description: 'Hỏi khoảng cách, rẽ trái/phải, đi thẳng và trạm tàu điện ngầm Metro gần nhất.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'es-e6',
              type: 'flashcard',
              prompt: 'Mẫu câu hỏi đường lịch sự',
              targetText: 'Perdone, ¿para ir a la estación de metro más cercana?',
              romanization: 'Pehr-doh-neh, pah-rah eer ah lah ehs-tah-syohn deh meh-troh mahs sehr-kah-nah?',
              vietnameseMeaning: 'Xin lỗi, làm ơn cho tôi hỏi đường đi đến ga tàu điện ngầm gần nhất ở đâu ạ?',
              audioText: 'Perdone, ¿para ir a la estación de metro más cercana?',
              explanation: '"¿Para ir a...?" là cách hỏi đường ngắn gọn, tự nhiên và cực kỳ phổ biến của người bản xứ.',
              culturalNote: 'Người Tây Ban Nha rất nhiệt tình, thường sẽ giải thích cặn kẽ và thậm chí dẫn bạn đi một đoạn nếu tiện đường.'
            },
            {
              id: 'es-e7',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Bạn hãy đi thẳng con phố này rồi rẽ sang tay phải nhé."',
              targetText: 'Siga todo recto por esta calle y gire a la derecha.',
              wordTokens: ['Siga todo', 'recto por', 'esta calle', 'y gire', 'a la derecha.', 'izquierda', 'tren'],
              explanation: '"Todo recto" là đi thẳng; "a la derecha" là sang phía bên phải.'
            }
          ]
        },
        {
          id: 'es-l3b',
          track: 'daily',
          title: 'Nhận Phòng Khách Sạn & Thủ Tục Sân Bay (Hotel y Aeropuerto)',
          description: 'Làm thủ tục nhận phòng (Check-in), hỏi mật khẩu Wi-Fi, yêu cầu dọn phòng và gửi hành lý.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'es-e7b',
              type: 'flashcard',
              prompt: 'Mẫu câu nhận phòng khách sạn',
              targetText: 'Buenas tardes, tengo una reserva a nombre de Nguyen por tres noches.',
              romanization: 'Bwenas tar-des, ten-go oo-na reh-ser-va ah nom-bre deh...',
              vietnameseMeaning: 'Chào buổi chiều, tôi có một phòng đặt trước dưới tên Nguyen trong 3 đêm.',
              audioText: 'Buenas tardes, tengo una reserva a nombre de Nguyen por tres noches.',
              explanation: '"Tengo una reserva a nombre de..." là cấu trúc chuẩn để báo tên đặt phòng tại lễ tân.',
              culturalNote: 'Ở Tây Ban Nha, khách sạn luôn yêu cầu xuất trình hộ chiếu (Pasaporte) của tất cả khách lưu trú.'
            },
            {
              id: 'es-e7c',
              type: 'fill_blank',
              prompt: 'Điền từ thích hợp: "¿A qué hora es el ______ de la habitación mañana? (Mấy giờ phải trả phòng ngày mai ạ?)"',
              options: ['check-out', 'desayuno', 'vuelo', 'metro'],
              correctAnswer: 'check-out',
              explanation: '"Check-out" (hoặc "la salida") chỉ giờ trả phòng, thường là 11:00 hoặc 12:00 trưa.'
            }
          ]
        },
        {
          id: 'es-l3c',
          track: 'daily',
          title: 'Khám Bệnh & Mua Thuốc Tại Hiệu Thuốc (En la farmacia)',
          description: 'Hỏi mua thuốc đau họng, thuốc hạ sốt và miêu tả triệu chứng dị ứng thức ăn.',
          durationMinutes: 5,
          xpReward: 35,
          exercises: [
            {
              id: 'es-e7d',
              type: 'flashcard',
              prompt: 'Mẫu câu miêu tả triệu chứng đau đớn',
              targetText: 'Me duele mucho la garganta y tengo tos seca desde ayer.',
              romanization: 'Meh dweh-leh moo-choh lah gar-gan-tah ee ten-goh tohs seh-kah...',
              vietnameseMeaning: 'Tôi bị đau họng rất nhiều và bị ho khan từ ngày hôm qua.',
              audioText: 'Me duele mucho la garganta y tengo tos seca desde ayer.',
              explanation: 'Cấu trúc "Doler" tương tự "Gustar": "Me duele la garganta" (Họng làm tôi đau).',
              culturalNote: 'Các hiệu thuốc ở Tây Ban Nha có biển chữ thập xanh lá cây (Cruz verde) phát sáng trên phố.'
            },
            {
              id: 'es-e7e',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Cho tôi xin một hộp thuốc giảm đau, làm ơn."',
              targetText: '¿Me da una caja de analgésicos, por favor?',
              wordTokens: ['¿Me da', 'una caja de', 'analgésicos,', 'por favor?', 'vino', 'comer'],
              explanation: '"Analgésico" là thuốc giảm đau nói chung (như Paracetamol hoặc Ibuprofeno).'
            }
          ]
        }
      ]
    },
    {
      id: 'es-u3',
      number: 3,
      track: 'workplace',
      title: 'Tiếng Tây Ban Nha Thương Mại & Email Công Sở',
      description: 'Giao dịch thư từ với đối tác Tây Ban Nha và Mỹ Latinh, đàm phán hợp đồng xuất nhập khẩu và thảo luận dự án.',
      cefrLevel: 'B1 - B2',
      lessons: [
        {
          id: 'es-l4',
          track: 'workplace',
          title: 'Viết Thư Điện Tử Thương Mại Chuyên Nghiệp',
          description: 'Mở đầu thư với Estimado señor, trình bày mục tiêu đàm phán và dùng câu kết chuẩn mực.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'es-e8',
              type: 'flashcard',
              prompt: 'Lời kết thư thương mại trang trọng kinh điển',
              targetText: 'Atentamente, quedo a su entera disposición para cualquier aclaración.',
              romanization: 'Ah-tehn-tah-mehn-teh, keh-doh ah soo ehn-teh-rah dees-poh-see-syohn...',
              vietnameseMeaning: 'Trân trọng, tôi luôn sẵn sàng hỗ trợ giải đáp bất kỳ thắc mắc nào của quý ngài.',
              audioText: 'Atentamente, quedo a su entera disposición para cualquier aclaración.',
              explanation: '"Atentamente" là lời chào kết thúc thư tiêu chuẩn trang trọng nhất trong thế giới nói tiếng Tây Ban Nha.',
              culturalNote: 'Được sử dụng trong mọi hợp đồng thương mại, thư báo giá và trao đổi với đối tác kinh doanh.'
            },
            {
              id: 'es-e9',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu: "Chúng tôi xin gửi kèm bảng báo giá chi tiết để quý ngài xem xét."',
              targetText: 'Adjunto enviamos la cotización detallada para su debida revisión.',
              wordTokens: ['Adjunto enviamos', 'la cotización', 'detallada', 'para su', 'debida revisión.', 'gratis', 'ayer'],
              explanation: '"Adjunto enviamos" là mẫu câu chuẩn thông báo tệp đính kèm trong thư thương mại Tây Ban Nha.'
            }
          ]
        },
        {
          id: 'es-l4b',
          track: 'workplace',
          title: 'Thuyết Trình Sản Phẩm & Thuyết Phục Khách Hàng (Pitching)',
          description: 'Cách mở đầu bài thuyết trình, nêu bật lợi thế cạnh tranh của sản phẩm nông sản / cà phê Việt Nam.',
          durationMinutes: 6,
          xpReward: 45,
          exercises: [
            {
              id: 'es-e9b',
              type: 'flashcard',
              prompt: 'Mẫu câu nêu bật ưu thế cạnh tranh vượt trội',
              targetText: 'Nuestro producto destaca por su alta calidad y su precio altamente competitivo en el mercado.',
              romanization: 'Nwes-tro proh-dook-toh des-tah-kah por soo al-tah kah-lee-dahd...',
              vietnameseMeaning: 'Sản phẩm của chúng tôi nổi bật nhờ chất lượng cao và mức giá cực kỳ cạnh tranh trên thị trường.',
              audioText: 'Nuestro producto destaca por su alta calidad y su precio altamente competitivo en el mercado.',
              explanation: '"Destacar por" (nổi bật nhờ...); "altamente competitivo" (cực kỳ cạnh tranh).',
              culturalNote: 'Doanh nhân Mỹ Latinh rất thích phong thái nhiệt huyết, tự tin và truyền cảm hứng.'
            },
            {
              id: 'es-e9c',
              type: 'quiz_choice',
              prompt: 'Cụm từ nào trong tiếng Tây Ban Nha chỉ "giá trị gia tăng" của sản phẩm?',
              options: ['El valor añadido', 'El dinero fácil', 'El gasto inútil', 'La deuda externa'],
              correctAnswer: 'El valor añadido',
              explanation: '"Valor añadido" (hoặc "valor agregado") là thuật ngữ kinh tế chỉ giá trị gia tăng.'
            }
          ]
        }
      ]
    },
    {
      id: 'es-u4',
      number: 4,
      track: 'workplace',
      title: 'Chinh Phục Phỏng Vấn Doanh Nghiệp Quốc Tế (Entrevista de Trabajo)',
      description: 'Luyện tập trả lời phỏng vấn các công ty xuất nhập khẩu, nông sản, logistics và du lịch đa quốc gia.',
      cefrLevel: 'B2',
      lessons: [
        {
          id: 'es-l5',
          track: 'workplace',
          title: 'Tự Giới Thiệu Bản Thân & Kinh Nghiệm Ngoại Thương',
          description: 'Cách gây ấn tượng về năng lực kết nối thị trường Việt Nam - Châu Mỹ Latinh, phong thái tự tin và chuyên nghiệp.',
          durationMinutes: 6,
          xpReward: 50,
          exercises: [
            {
              id: 'es-e10',
              type: 'flashcard',
              prompt: 'Mẫu câu mở đầu phỏng vấn chuyên nghiệp',
              targetText: 'Cuento con una sólida trayectoria en comercio internacional y gestión de cuentas estratégicas.',
              romanization: 'Kwen-toh kon oo-nah soh-lee-dah trah-yek-toh-ryah...',
              vietnameseMeaning: 'Tôi có một quá trình công tác vững chắc trong lĩnh vực ngoại thương quốc tế và quản lý các khách hàng chiến lược.',
              audioText: 'Cuento con una sólida trayectoria en comercio internacional y gestión de cuentas estratégicas.',
              explanation: '"Contar con" (sở hữu/có sẵn) + "trayectoria" (hành trình sự nghiệp).',
              culturalNote: 'Nhà tuyển dụng Tây Ban Nha và Mỹ Latinh rất đánh giá cao sự tự tin, khả năng giao tiếp truyền cảm hứng và sự nhiệt huyết.'
            },
            {
              id: 'es-e11',
              type: 'sentence_build',
              prompt: 'Sắp xếp câu phỏng vấn: "Điểm mạnh của tôi là khả năng đàm phán và giải quyết các tình huống khó khăn."',
              targetText: 'Mi principal fortaleza es la capacidad de negociación y resolución de conflictos.',
              wordTokens: ['Mi principal', 'fortaleza es', 'la capacidad de', 'negociación y', 'resolución de', 'conflictos.', 'malo', 'nunca'],
              explanation: '"Fortaleza" là điểm mạnh; "resolución de conflictos" là kỹ năng giải quyết mâu thuẫn/xung đột.'
            },
            {
              id: 'es-e12',
              type: 'quiz_choice',
              prompt: 'Khi được hỏi về lý do tại sao bạn muốn làm việc cho công ty Tây Ban Nha, câu trả lời nào tạo ấn tượng tốt nhất?',
              options: [
                'Bởi vì tôi nhìn thấy tiềm năng tăng trưởng vượt bậc của công ty tại thị trường Châu Á và tôi muốn đem kinh nghiệm bản địa để giúp công ty mở rộng thị phần.',
                'Vì tôi muốn có cơ hội đi du lịch Tây Ban Nha xem bóng đá miễn phí.',
                'Vì tôi không tìm được công việc nào khác.',
                'Tôi chỉ tò mò nộp thử xem thế nào thôi.'
              ],
              correctAnswer: 'Bởi vì tôi nhìn thấy tiềm năng tăng trưởng vượt bậc của công ty tại thị trường Châu Á và tôi muốn đem kinh nghiệm bản địa để giúp công ty mở rộng thị phần.',
              explanation: 'Câu trả lời chứng tỏ bạn hiểu rõ giá trị chiến lược của mình đối với sự mở rộng kinh doanh của doanh nghiệp.'
            }
          ]
        }
      ]
    }
  ],
  scenarios: [
    {
      id: 'es-interview',
      track: 'workplace',
      title: 'Phỏng Vấn Công Ty Xuất Nhập Khẩu Tây Ban Nha',
      context: 'Phỏng vấn vòng cuối với Giám đốc Điều hành cho vị trí chuyên viên phát triển thị trường Đông Nam Á.',
      location: 'Văn phòng tại Barcelona / Trực tuyến',
      characterName: 'Carlos Mendoza',
      characterRole: 'Director de Recursos Humanos',
      characterAvatar: '🥘',
      starterMessage: {
        text: '¡Buenos días! Bienvenido. Cuéntenos un poco sobre su experiencia previa y qué valor estratégico puede aportar a nuestro equipo.',
        romanization: 'Bwenos deeas! Byen-veh-nee-do. Kwen-teh-nohs oon poh-koh...',
        vietnameseTranslation: 'Chào buổi sáng! Chào mừng bạn. Hãy kể cho chúng tôi đôi nét về kinh nghiệm trước đây và giá trị chiến lược bạn có thể mang lại cho đội ngũ của chúng tôi.'
      },
      objectives: [
        'Chào lịch sự bằng "Buenos días, señor Mendoza"',
        'Nêu điểm mạnh và kinh nghiệm thực tế về xuất nhập khẩu',
        'Sử dụng ngôi lịch sự "Usted" chuẩn mực'
      ]
    },
    {
      id: 'es-tapas',
      track: 'daily',
      title: 'Thưởng Thức Tapas Tại Khu Phố La Latina, Madrid',
      context: 'Bạn cùng các người bạn bản xứ ghé một quán bar tapas cổ điển tại trung tâm thủ đô Madrid.',
      location: 'Quán Bar La Latina, Madrid',
      characterName: 'Lucía',
      characterRole: 'Bạn học người Madrid',
      characterAvatar: '🍷',
      starterMessage: {
        text: '¡Hola! Este bar tiene las mejores croquetas de jamón de todo Madrid. ¿Te apetece pedir una ronda de sangría y unas tapas para compartir?',
        romanization: 'Oh-lah! Ehs-teh bahr tyeh-neh lahs meh-hoh-rehs kroh-keh-tahs...',
        vietnameseTranslation: 'Chào bạn! Quán bar này có món bánh croquetas nhân dăm bông ngon nhất cả thành Madrid đấy. Bạn có hứng thú gọi một bình rượu vang sangria và vài đĩa tapas để chia nhau cùng ăn không?'
      },
      objectives: [
        'Hào hứng đồng ý bằng "¡Claro que sí, me parece una excelente idea!"',
        'Gợi ý gọi thêm món trứng cuộn khoai tây Tortilla española',
        'Nâng ly chúc mừng bằng "¡Salud!"'
      ]
    }
  ],
  vocabCards: [
    {
      id: 'es-v1',
      track: 'workplace',
      word: 'Compromiso',
      romanization: '/kom.pɾoˈmi.so/',
      meaning: 'Sự cam kết, tinh thần trách nhiệm cao độ',
      partOfSpeech: 'noun',
      exampleSentence: 'El compromiso de nuestro equipo garantiza el éxito de este proyecto.',
      exampleTranslation: 'Sự cam kết của đội ngũ chúng tôi đảm bảo cho sự thành công của dự án này.',
      category: 'Công việc & Phỏng vấn',
      easeFactor: 2.6,
      repetitions: 3,
      intervalDays: 7,
      nextReviewDate: new Date().toISOString(),
      status: 'Reviewing'
    },
    {
      id: 'es-v2',
      track: 'workplace',
      word: 'Rentabilidad',
      romanization: '/ren.ta.bi.liˈðað/',
      meaning: 'Khả năng sinh lời, tỷ suất lợi nhuận kinh doanh',
      partOfSpeech: 'noun',
      exampleSentence: 'La nueva estrategia comercial aumentó significativamente la rentabilidad.',
      exampleTranslation: 'Chiến lược thương mại mới đã làm gia tăng đáng kể khả năng sinh lời của doanh nghiệp.',
      category: 'Kinh doanh & Tài chính',
      easeFactor: 2.5,
      repetitions: 2,
      intervalDays: 4,
      nextReviewDate: new Date().toISOString(),
      status: 'Learning'
    },
    {
      id: 'es-v3',
      track: 'daily',
      word: 'Sobremesa',
      romanization: '/so.bɾeˈme.sa/',
      meaning: 'Khoảng thời gian nán lại trò chuyện rôm rả trên bàn ăn sau bữa ăn',
      partOfSpeech: 'noun',
      exampleSentence: 'La sobremesa con los amigos duró más de dos horas después de comer.',
      exampleTranslation: 'Thời gian ngồi nán lại tâm tình trên bàn ăn cùng bạn bè đã kéo dài hơn 2 tiếng đồng hồ sau bữa ăn.',
      category: 'Văn hóa Ẩm thực Tây Ban Nha',
      easeFactor: 2.7,
      repetitions: 4,
      intervalDays: 14,
      nextReviewDate: new Date().toISOString(),
      status: 'Mastered'
    }
  ],
  culturalTips: [
    {
      id: 'ct-es-1',
      topic: 'Giờ giấc Sinh hoạt & Nét Văn hóa "Sobremesa"',
      rule: 'Tại Tây Ban Nha, giờ ăn trưa thường từ 14:00 - 16:00, và bữa tối hiếm khi bắt đầu trước 21:00. Đặc biệt, sau khi ăn xong, người Tây Ban Nha không đứng dậy ngay mà luôn nán lại 1-2 tiếng để trò chuyện rôm rả thưởng trà/cà phê gọi là "Sobremesa".',
      doText: 'Hẹn ăn trưa công việc lúc 14:00 hoặc ăn tối nhẹ sau 20:30, dành thời gian trò chuyện chân tình.',
      dontText: 'Đừng mong đợi phục vụ bữa tối thịnh soạn vào lúc 17:30 - 18:00.',
      essentialPhrase: '¿A qué hora abre la cocina para cenar?',
      phraseTranslation: 'Mấy giờ thì nhà bếp mở cửa phục vụ bữa tối ạ?'
    },
    {
      id: 'ct-es-2',
      topic: 'Văn hóa Chào hỏi Hôn Má (Dos Besos) & Ngôn ngữ Cơ thể',
      rule: 'Ở Tây Ban Nha, khi được giới thiệu với một người bạn mới (đặc biệt là giữa nam và nữ hoặc giữa nữ với nữ), văn hóa chào hỏi thông thường là chạm nhẹ hai má (Dos besos), bắt đầu từ má phải rồi sang má trái.',
      doText: 'Chạm nhẹ hai má phát ra tiếng hôn gió nhẹ khi được bạn bè giới thiệu trong bối cảnh xã giao.',
      dontText: 'Trong phỏng vấn xin việc trang trọng, chỉ bắt tay lịch thiệp chứ không hôn má.',
      essentialPhrase: '¡Mucho gusto! Encantado de conocerte.',
      phraseTranslation: 'Rất hân hạnh! Thật vui được quen biết bạn.'
    }
  ]
};
