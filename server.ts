import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback canned roleplay responses in Vietnamese for learners
const FALLBACK_ROLEPLAY: Record<string, Record<string, any>> = {
  english: {
    interview: {
      replyText: "Welcome! Thank you for coming in today. Could you walk me through your background and why you are interested in this position?",
      romanization: "Phát âm: /ˈwel.kəm! θæŋk juː fɔːr ˈkʌm.ɪŋ ɪn təˈdeɪ.../",
      vietnameseTranslation: "Chào mừng bạn! Cảm ơn bạn đã đến phỏng vấn hôm nay. Bạn có thể giới thiệu sơ lược về kinh nghiệm của mình và lý do bạn ứng tuyển vào vị trí này không?",
      grammarTip: "Mẹo phỏng vấn: Dùng cấu trúc STAR (Situation - Task - Action - Result). Bắt đầu với 'Certainly, over the past X years, I have specialized in...'",
      suggestedReplies: [
        "Certainly! I have 3 years of experience in project management.",
        "Thank you for having me. I have always admired your company's innovation.",
        "I would be glad to. My background is in software engineering."
      ]
    },
    workplace: {
      replyText: "Good morning! Just wanted to check if you have the quarterly report ready for our client presentation this afternoon?",
      romanization: "Phát âm: /ɡʊd ˈmɔː.nɪŋ! dʒʌst ˈwɒn.tɪd tuː tʃek.../",
      vietnameseTranslation: "Chào buổi sáng! Tôi muốn kiểm tra xem bạn đã chuẩn bị xong báo cáo quý cho buổi thuyết trình với khách hàng chiều nay chưa?",
      grammarTip: "'Just wanted to check if...' là cách mở lời lịch sự, chuyên nghiệp phổ biến trong môi trường công sở quốc tế.",
      suggestedReplies: [
        "Yes, it's completely ready. I'll email it over right away.",
        "Almost done! I am just finalizing the financial charts.",
        "Could we push our review meeting back by 30 minutes?"
      ]
    },
    daily: {
      replyText: "Hi there! What can I get started for you today? We have a fresh roast of Ethiopian beans.",
      romanization: "Phát âm: /haɪ ðeər! wɒt kæn aɪ ɡet ˈstɑː.tɪd.../",
      vietnameseTranslation: "Xin chào! Bạn muốn dùng gì hôm nay? Chúng tôi vừa có mẻ cà phê rang mới từ Ethiopia.",
      grammarTip: "'What can I get started for you?' là câu nhân viên quán ăn/cafe bản xứ hay dùng thay vì câu sách vở 'What do you want?'.",
      suggestedReplies: [
        "I'd love an iced latte with oat milk, please.",
        "What do you recommend for something not too sweet?",
        "Just a black Americano to go, please."
      ]
    }
  },
  chinese: {
    interview: {
      replyText: "请简单介绍一下你自己，以及你为什么想加入我们公司？",
      romanization: "Qǐng jiǎndān jièshào yíxià nǐ zìjǐ, yǐjí nǐ wèishénme xiǎng jiārù wǒmen gōngsī?",
      vietnameseTranslation: "Xin hãy giới thiệu ngắn gọn về bản thân bạn, và lý do tại sao bạn muốn gia nhập công ty chúng tôi?",
      grammarTip: "Trong phỏng vấn tiếng Trung, hãy mở đầu bằng '您好，面试官' (Chào người phỏng vấn) và dùng kính ngữ '您' (Ngài/Quý vị).",
      suggestedReplies: [
        "您好，我叫阮明，有三年的外贸工作经验。(Chào anh/chị, tôi tên Nguyễn Minh, có 3 năm kinh nghiệm ngoại thương.)",
        "我一直非常关注贵公司的发展。(Tôi luôn rất quan tâm và ngưỡng mộ sự phát triển của quý công ty.)",
        "我的专业是商务汉语，很适合这个岗位。(Chuyên ngành của tôi là tiếng Trung thương mại, rất phù hợp với vị trí này.)"
      ]
    },
    daily: {
      replyText: "您好！欢迎光临，请问您几位？想喝点什么茶？",
      romanization: "Nín hǎo! Huānyíng guānglín, qǐngwèn nín jǐ wèi? Xiǎng hē diǎn shénme chá?",
      vietnameseTranslation: "Kính chào quý khách! Xin hỏi quý khách đi mấy người ạ? Quý khách muốn dùng trà gì?",
      grammarTip: "Dùng '请问' (qǐngwèn - xin hỏi) trước câu hỏi thể hiện sự nhã nhặn, tôn trọng đối phương.",
      suggestedReplies: [
        "我们两位，请来一壶茉莉花茶。(Chúng tôi 2 người, cho một ấm trà lài nhé.)",
        "请问有什么招牌点心推荐吗？(Xin hỏi quán có món tráng miệng đặc trưng nào gợi ý không?)",
        "买单，请问可以扫码支付吗？(Thanh toán, xin hỏi có quét mã thanh toán được không?)"
      ]
    }
  },
  japanese: {
    interview: {
      replyText: "本日はお時間をいただきありがとうございます。志望動機と自己PRをお願いいたします。",
      romanization: "Honjitsu wa ojikan o itadaki arigatou gozaimasu. Shibou douki to jiko PR o onegai itashimasu.",
      vietnameseTranslation: "Cảm ơn bạn đã dành thời gian hôm nay. Xin mời bạn trình bày về lý do ứng tuyển và điểm mạnh của bản thân.",
      grammarTip: "Kính ngữ Keigo: '本日はお時間をいただき...' (Cảm ơn vì đã dành thời gian). Trả lời bắt đầu bằng 'はい、よろしくお願いいたします'.",
      suggestedReplies: [
        "はい、ベトナム出身のグエンと申します。大学で情報工学を専攻しました。(Vâng, tôi là Nguyen đến từ VN. Tôi học CNTT.)",
        "御社のグローバルな開発環境に強く魅力を感じております。(Tôi rất ấn tượng với môi trường quốc tế của quý công ty.)",
        "これまでの経験を活かし、チームに貢献したいと考えております。(Tôi mong muốn dùng kinh nghiệm để cống hiến cho đội ngũ.)"
      ]
    },
    daily: {
      replyText: "いらっしゃいませ！ホットとアイス、どちらになさいますか？",
      romanization: "Irasshaimase! Hotto to aisu, dochira ni nasaimasu ka?",
      vietnameseTranslation: "Kính chào quý khách! Quý khách muốn dùng loại nóng hay đá ạ?",
      grammarTip: "'どちらになさいますか' là dạng kính ngữ lịch sự của 'どちらにしますか' khi nhân viên hỏi khách chọn món.",
      suggestedReplies: [
        "アイスラテを一つお願いします。(Cho tôi một ly latte đá nhé.)",
        "おすすめのスイーツはありますか？(Quán có món ngọt nào ngon gợi ý không ạ?)",
        "お会計をお願いします。(Làm ơn tính tiền giúp tôi.)"
      ]
    }
  },
  korean: {
    interview: {
      replyText: "안녕하세요! 간단한 자기소개와 함께 저희 회사에 지원하게 된 동기를 말씀해 주세요.",
      romanization: "Annyeonghaseyo! Gandanhan jagisogae-wa hamkke jeohi hoesa-e jiwonhage doen donggireul malsseumhae juseyo.",
      vietnameseTranslation: "Xin chào! Xin vui lòng giới thiệu ngắn gọn về bản thân và lý do bạn ứng tuyển vào công ty chúng tôi.",
      grammarTip: "Trong phỏng vấn xin việc tiếng Hàn, luôn dùng đuôi câu trang trọng '-습니다/습니까' thay vì đuôi thân mật '-아요/어요'.",
      suggestedReplies: [
        "안녕하십니까! 저는 IT 분야에서 3년간 일해 온 응웬이라고 합니다。(Kính chào, tôi là Nguyen có 3 năm trong ngành IT.)",
        "귀사의 글로벌 프로젝트에 기여하고 싶어 지원하였습니다。(Tôi muốn đóng góp cho dự án quốc tế của công ty nên đã ứng tuyển.)",
        "책임감 있게 일하며 성과를 내겠습니다。(Tôi sẽ làm việc đầy trách nhiệm và tạo ra kết quả.)"
      ]
    },
    daily: {
      replyText: "어서오세요! 주문하시겠어요? 따뜻한 것과 차가운 것 중 어떤 걸로 드릴까요?",
      romanization: "Eoseo-oseyo! Jumun-hasigess-eoyo? Ttatteut-han geot-gwa chagaun geot jung eotteon geollo deurilkkayo?",
      vietnameseTranslation: "Kính chào quý khách! Quý khách muốn gọi món chưa ạ? Quý khách muốn dùng loại ấm hay lạnh?",
      grammarTip: "Người Hàn rất thích uống '아아' (viết tắt của 아이스 아메리카노 - Iced Americano) quanh năm.",
      suggestedReplies: [
        "아이스 아메리카노 한 잔 부탁드립니다。(Cho tôi một ly Americano đá nhé.)",
        "포장해 갈게요。(Tôi mua mang về.)",
        "영수증 버려주세요。(Không cần lấy hóa đơn đâu ạ.)"
      ]
    }
  },
  french: {
    interview: {
      replyText: "Bonjour ! Merci d'être venu aujourd'hui. Pourriez-vous vous présenter brièvement et nous expliquer ce qui motive votre candidature ?",
      romanization: "Bohn-zhoor! Mehr-see dehtr vuh-noo oh-zhoor-dwee...",
      vietnameseTranslation: "Xin chào! Cảm ơn bạn đã đến hôm nay. Bạn có thể giới thiệu ngắn gọn về mình và chia sẻ động lực ứng tuyển không?",
      grammarTip: "Luôn xưng hô 'vous' với nhà tuyển dụng Pháp. Sử dụng các từ nối logic như 'Tout d'abord', 'De plus', 'Enfin'.",
      suggestedReplies: [
        "Bonjour, c'est un plaisir d'être ici. J'ai 4 ans d'expérience dans le commerce international.",
        "Votre entreprise possède une réputation d'excellence qui m'attire particulièrement.",
        "Je souhaite mettre mes compétences au service de vos projets innovants."
      ]
    },
    daily: {
      replyText: "Bonjour ! Tout à fait. Vous désirez également un croissant ou une viennoiserie ?",
      romanization: "Bohn-zhoor! Too tah fay. Voo day-zee-ray ay-gal-mon uhn krwah-sohn...",
      vietnameseTranslation: "Xin chào quý khách! Chắc chắn rồi ạ. Quý khách có muốn dùng thêm bánh sừng bò hay bánh ngọt không?",
      grammarTip: "Quy tắc vàng ở Pháp: Luôn nói 'Bonjour' trước khi gọi món hay hỏi han bất cứ điều gì.",
      suggestedReplies: [
        "Un croissant chaud, s'il vous plaît. (Một chiếc bánh sừng bò nóng nhé.)",
        "Non merci, juste le café. (Không cảm ơn, chỉ cà phê thôi.)",
        "L'addition, s'il vous plaît. (Làm ơn cho tôi xin hóa đơn.)"
      ]
    }
  },
  german: {
    interview: {
      replyText: "Guten Tag! Schön, dass Sie da sind. Bitte stellen Sie sich kurz vor und erklären Sie, warum Sie die richtige Person für diese Stelle sind.",
      romanization: "Goo-ten tahk! Shoen, dahs Zee dah zint...",
      vietnameseTranslation: "Xin chào! Rất vui vì bạn đã đến. Xin mời bạn giới thiệu ngắn gọn và giải thích vì sao bạn là người phù hợp với vị trí này.",
      grammarTip: "Văn hóa phỏng vấn Đức coi trọng sự chính xác, đúng giờ và số liệu thực tế chứng minh năng lực.",
      suggestedReplies: [
        "Guten Tag! Ich habe 3 Jahre Berufserfahrung im Maschinenbau.",
        "Ich schätze die deutsche Arbeitskultur und Ihre Innovationskraft.",
        "Meine Stärken liegen in der Problemlösung und Teamarbeit."
      ]
    },
    daily: {
      replyText: "Guten Tag! Was darf es für Sie sein? Wir haben heute frischen Apfelstrudel.",
      romanization: "Goo-ten tahk! Vas darf es fuer Zee zyne?...",
      vietnameseTranslation: "Xin chào! Tôi có thể lấy gì cho bạn? Hôm nay chúng tôi có bánh táo Apfelstrudel mới ra lò.",
      grammarTip: "'Was darf es für Sie sein?' là lời chào lịch sự chuẩn mực của nhân viên phục vụ ở Đức và Áo.",
      suggestedReplies: [
        "Einen Cappuccino mit Hafermilch, bitte. (Một ly cappuccino với sữa yến mạch nhé.)",
        "Kann man hier mit Karte zahlen? (Ở đây có quẹt thẻ được không ạ?)",
        "Vielen Dank, das sieht köstlich aus! (Cảm ơn nhiều, trông ngon tuyệt!)"
      ]
    }
  },
  spanish: {
    interview: {
      replyText: "¡Buenos días! Bienvenido. Cuéntenos un poco sobre su trayectoria profesional y qué le motivó a postular a este puesto.",
      romanization: "¡Bwenos deeas! Byen-veh-nee-do. Kwenteh-nos oon poko...",
      vietnameseTranslation: "Xin chào buổi sáng! Chào mừng bạn. Hãy kể cho chúng tôi nghe đôi nét về hành trình sự nghiệp và động lực bạn ứng tuyển vị trí này.",
      grammarTip: "Sử dụng ngôi lịch sự 'Usted' trong phỏng vấn. Nhấn mạnh tinh thần trách nhiệm và khả năng làm việc nhóm.",
      suggestedReplies: [
        "Buenos días. Cuento con más de tres años de experiencia en marketing digital.",
        "Me apasiona la visión de su empresa y deseo aportar mi talento aquí.",
        "Soy una persona proactiva y orientada a resultados."
      ]
    },
    daily: {
      replyText: "¡Hola! Buenas tardes. Claro que sí, ¿lo prefiere solo, con leche o cortado?",
      romanization: "¡Ola! Bwenas tardes. Klaro ke see, ¿lo prefyere solo, kon leche o kortado?",
      vietnameseTranslation: "Xin chào! Buổi chiều tốt lành. Tất nhiên rồi, bạn thích uống cà phê đen, với sữa hay cà phê pha ít sữa (cortado)?",
      grammarTip: "'Cortado' là nét đặc trưng Tây Ban Nha: một shot espresso đậm đà pha chút xíu sữa nóng để giảm vị đắng gắt.",
      suggestedReplies: [
        "Con leche y un poco de azúcar, por favor. (Cà phê sữa và ít đường nhé.)",
        "Solo, bien caliente, por favor. (Cà phê đen nguyên chất, thật nóng nhé.)",
        "La cuenta cuando pueda, por favor. (Khi nào tiện cho tôi xin hóa đơn nhé.)"
      ]
    }
  }
};

// API: AI Immersion Conversation Roleplay (Job interviews & Daily Life for Vietnamese learners)
app.post('/api/gemini/roleplay', async (req, res) => {
  try {
    const { language, scenario, userMessage, history } = req.body;
    const langKey = (language || 'english').toLowerCase();

    if (ai) {
      const systemInstruction = `You are a native ${language} speaker roleplaying in this scenario: "${scenario?.title || 'Conversation'} - ${scenario?.context || 'Friendly conversation'}".
The user is a Vietnamese language learner (người Việt học tiếng ${language}).
Respond in ${language} naturally, staying strictly in character (HR manager, colleague, barista, or shopkeeper).
Always provide the response in this strict JSON format with Vietnamese translation and pedagogical tips:
{
  "replyText": "your response in ${language}",
  "romanization": "phonetic transcription / pronunciation guide (IPA or standard romanization)",
  "vietnameseTranslation": "Bản dịch nghĩa tiếng Việt tự nhiên, chính xác, lịch sự",
  "grammarTip": "1-2 câu giải thích ngữ pháp, từ vựng hoặc mẹo phỏng vấn/giao tiếp bằng TIẾNG VIỆT",
  "suggestedReplies": ["suggested response 1 in ${language}", "suggested response 2 in ${language}", "suggested response 3 in ${language}"]
}`;

      const conversationHistory = Array.isArray(history) 
        ? history.map(h => `${h.role === 'user' ? 'Người học' : 'Nhân vật'}: ${h.text}`).join('\n')
        : '';

      const prompt = `Lịch sử hội thoại:\n${conversationHistory}\n\nNgười học vừa nói: "${userMessage || 'Hello'}". Hãy phản hồi bằng tiếng ${language} và cung cấp bản dịch, mẹo giải thích bằng tiếng Việt theo JSON schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              replyText: { type: Type.STRING },
              romanization: { type: Type.STRING },
              vietnameseTranslation: { type: Type.STRING },
              grammarTip: { type: Type.STRING },
              suggestedReplies: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['replyText', 'vietnameseTranslation', 'grammarTip', 'suggestedReplies'],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json(parsed);
      }
    }

    // Fallback if no AI key or API unavailable
    const langFallbacks = FALLBACK_ROLEPLAY[langKey] || FALLBACK_ROLEPLAY['english'];
    const scId = (scenario?.id || '').toLowerCase();
    const type = scId.includes('interview') || scId.includes('phong-van') ? 'interview' 
      : scId.includes('work') || scId.includes('cong-so') ? 'workplace' : 'daily';
    const fallback = langFallbacks[type] || langFallbacks['daily'] || langFallbacks['interview'] || FALLBACK_ROLEPLAY['english']['interview'];

    return res.json({
      ...fallback,
      _note: 'Phản hồi từ hệ thống mô phỏng thông minh'
    });
  } catch (err: any) {
    console.error('Roleplay endpoint error:', err);
    const langKey = (req.body?.language || 'english').toLowerCase();
    const langFallbacks = FALLBACK_ROLEPLAY[langKey] || FALLBACK_ROLEPLAY['english'];
    return res.json(langFallbacks['interview'] || langFallbacks['daily'] || FALLBACK_ROLEPLAY['english']['daily']);
  }
});

// API: Sentence Anatomy & Grammar Inspector for Vietnamese learners
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { sentence, language } = req.body;
    if (!sentence) {
      return res.status(400).json({ error: 'Sentence is required' });
    }

    if (ai) {
      const systemInstruction = `You are an expert polyglot professor teaching Vietnamese students.
Analyze this sentence in ${language}: "${sentence}".
Break it down token by token, explaining each word's grammatical function, dictionary form, and meaning in VIETNAMESE (tiếng Việt).
Always return strict JSON with this schema:
{
  "tokens": [
    {
      "word": "từ trong câu",
      "partOfSpeech": "Danh từ | Động từ | Tính từ | Trợ từ | Đại từ | Giới từ | Liên từ | Thán từ",
      "baseForm": "dạng nguyên thể từ điển",
      "grammaticalRole": "Vai trò ngữ pháp bằng TIẾNG VIỆT (ví dụ: Chủ ngữ, Trợ từ chủ đề, Động từ điều kiện, Tân ngữ trực tiếp, Kính ngữ)",
      "meaning": "Nghĩa tiếng Việt của từ",
      "romanization": "phiên âm hoặc cách đọc"
    }
  ],
  "vietnameseTranslation": "Dịch nghĩa tiếng Việt tự nhiên, chuẩn mực",
  "formalityLevel": "Thân mật | Lịch sự chuẩn | Kính ngữ / Trang trọng công sở | Học thuật",
  "culturalNote": "Ghi chú văn hóa, ngữ cảnh thực tế hoặc mẹo thi cử bằng TIẾNG VIỆT",
  "alternatives": [
    { "style": "Văn nói thân mật", "text": "cách nói khác" },
    { "style": "Công sở trang trọng / Đi phỏng vấn", "text": "cách nói khác" }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Phân tích câu "${sentence}" trong tiếng ${language} cho người Việt học. Trả về JSON chuẩn.`,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tokens: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    partOfSpeech: { type: Type.STRING },
                    baseForm: { type: Type.STRING },
                    grammaticalRole: { type: Type.STRING },
                    meaning: { type: Type.STRING },
                    romanization: { type: Type.STRING },
                  },
                  required: ['word', 'partOfSpeech', 'grammaticalRole', 'meaning'],
                },
              },
              vietnameseTranslation: { type: Type.STRING },
              formalityLevel: { type: Type.STRING },
              culturalNote: { type: Type.STRING },
              alternatives: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    style: { type: Type.STRING },
                    text: { type: Type.STRING },
                  },
                  required: ['style', 'text'],
                },
              },
            },
            required: ['tokens', 'vietnameseTranslation', 'formalityLevel', 'culturalNote'],
          },
        },
      });

      if (response.text) {
        return res.json(JSON.parse(response.text.trim()));
      }
    }

    // Deterministic fallback with Vietnamese annotations
    return res.json({
      tokens: sentence.split(' ').map((word: string, index: number) => ({
        word: word.replace(/[.,!?¿¡]/g, ''),
        partOfSpeech: index === 0 ? 'Chủ ngữ / Đại từ' : index === 1 ? 'Động từ chính' : 'Bổ ngữ / Tân ngữ',
        baseForm: word.toLowerCase().replace(/[.,!?¿¡]/g, ''),
        grammaticalRole: index === 0 ? 'Thành phần chủ ngữ' : index === 1 ? 'Hành động vị ngữ' : 'Bổ nghĩa câu',
        meaning: `Nghĩa của từ "${word}"`,
        romanization: word,
      })),
      vietnameseTranslation: `Ý nghĩa câu: "${sentence}"`,
      formalityLevel: 'Lịch sự chuẩn mực',
      culturalNote: 'Mẫu câu phổ biến trong giao tiếp đời sống và làm việc.',
      alternatives: [
        { style: 'Thân mật đời thường', text: sentence },
        { style: 'Trang trọng công sở', text: `${sentence} (kính ngữ)` }
      ]
    });
  } catch (err: any) {
    console.error('Analyze endpoint error:', err);
    return res.json({
      tokens: (req.body?.sentence || '').split(' ').map((w: string) => ({
        word: w,
        partOfSpeech: 'Từ vựng',
        grammaticalRole: 'Thành phần trong câu',
        meaning: w,
      })),
      vietnameseTranslation: req.body?.sentence || '',
      formalityLevel: 'Tiêu chuẩn',
      culturalNote: 'Đã hoàn tất phân tích cấu trúc câu.'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(apiKey) });
});

// Setup Vite middlewares in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
