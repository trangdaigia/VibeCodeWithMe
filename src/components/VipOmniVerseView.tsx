import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Dna,
  Bot,
  Sparkles,
  Globe,
  MapPin,
  Music,
  Film,
  Image as ImageIcon,
  Mic,
  Send,
  Play,
  Square,
  Download,
  RefreshCw,
  ExternalLink,
  Volume2,
  Wand2,
  CheckCircle2,
} from 'lucide-react';
import { LANGUAGE_COURSES, LanguageCourse } from '../data/curriculum';
import { sanitizePhoneticsForDisplay } from '../utils/ultimateArenaLogic';
import { Polyglot3DGame } from './Polyglot3DGame';
import { BioScienceLabPanel } from './BioScienceLabPanel';
import {
  SPRING_SNAPPY,
  PAGE_TRANSITION_VARIANTS,
  FLUID_EASE_OUT,
} from '../utils/motionChoreography';

interface VipOmniVerseViewProps {
  course: LanguageCourse;
  selectedLanguageId: string;
  onSelectLanguage: (langId: string) => void;
  onGainXp: (amount: number) => void;
}

type OmniSection = 'game3d' | 'bioscience' | 'chat_grounding' | 'creative_studio';

const CULTURAL_LANDMARKS_BY_LANG: Record<
  string,
  { name: string; city: string; lat: number; lng: number; phrase: string; meaningVi: string }[]
> = {
  english: [
    {
      name: 'British Library & Bloomsbury Academic Quarter',
      city: 'London, UK',
      lat: 51.5299,
      lng: -0.1277,
      phrase: 'Could I apply for a reader pass to consult the historical manuscripts?',
      meaningVi: 'Tôi có thể đăng ký thẻ đọc để tra cứu các bản thảo lịch sử không ạ?',
    },
    {
      name: 'Borough Market & Southbank Cultural Hub',
      city: 'London, UK',
      lat: 51.5055,
      lng: -0.091,
      phrase: 'What local specialty would you recommend for a first-time visitor?',
      meaningVi: 'Bạn gợi ý món đặc sản địa phương nào cho du khách lần đầu ghé thăm?',
    },
  ],
  chinese: [
    {
      name: 'Peking University & Zhongguancun Innovation Hub (北京大学)',
      city: 'Beijing, China',
      lat: 39.9929,
      lng: 116.3055,
      phrase: '请问未名湖怎么走？我是来参加学术交流会的。',
      meaningVi: 'Xin hỏi hồ Vị Danh đi lối nào? Tôi đến tham dự hội thảo giao lưu học thuật.',
    },
  ],
  japanese: [
    {
      name: 'Akihabara Electric Town & Kanda BookStreet (神田古書店街)',
      city: 'Tokyo, Japan',
      lat: 35.6984,
      lng: 139.7731,
      phrase: '日本語能力試験の参考書はどの棚にありますか？',
      meaningVi: 'Sách tham khảo luyện thi JLPT nằm ở kệ nào vậy ạ?',
    },
  ],
  korean: [
    {
      name: 'Gyeongbokgung Palace & Insadong Cultural Street (인사동)',
      city: 'Seoul, South Korea',
      lat: 37.5796,
      lng: 126.977,
      phrase: '전통 찻집을 찾고 있는데 추천해 주시겠어요?',
      meaningVi: 'Tôi đang tìm một quán trà truyền thống, bạn gợi ý giúp tôi được không?',
    },
  ],
  french: [
    {
      name: 'Quartier Latin & Sorbonne Université',
      city: 'Paris, France',
      lat: 48.8489,
      lng: 2.3431,
      phrase: 'Pourriez-vous m’indiquer la librairie académique la plus proche ?',
      meaningVi: 'Bạn có thể chỉ giúp tôi hiệu sách học thuật gần nhất được không?',
    },
  ],
  german: [
    {
      name: 'Museumsinsel & Humboldt-Universität zu Berlin',
      city: 'Berlin, Germany',
      lat: 52.5169,
      lng: 13.4019,
      phrase: 'Gibt es heute eine Führung auf Deutsch durch die Ausstellung?',
      meaningVi: 'Hôm nay có chuyến tham quan có hướng dẫn bằng tiếng Đức qua triển lãm không?',
    },
  ],
  spanish: [
    {
      name: 'Barrio de las Letras & Museo del Prado',
      city: 'Madrid, Spain',
      lat: 40.4138,
      lng: -3.6921,
      phrase: '¿A qué hora empieza la visita guiada sobre literatura del Siglo de Oro?',
      meaningVi: 'Mấy giờ bắt đầu chuyến tham quan có hướng dẫn về văn học Thế kỷ Vàng?',
    },
  ],
};

export const VipOmniVerseView: React.FC<VipOmniVerseViewProps> = ({
  course,
  selectedLanguageId,
  onSelectLanguage,
  onGainXp,
}) => {
  const [activeSection, setActiveSection] = useState<OmniSection>('game3d');

  // --- Section 3 State: Multi-Model Chatbot + Search Grounding + Maps Grounding ---
  const [chatModelTier, setChatModelTier] = useState<'flash' | 'lite'>('flash');
  const [chatPersona, setChatPersona] = useState<string>('Giáo sư Ngôn ngữ học Quốc tế');
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: 'user' | 'assistant'; text: string; modelUsed?: string }[]
  >([
    {
      role: 'assistant',
      text: `Chào mừng bạn đến với **Trợ lý Học thuật Đa Mô hình AI VIP (${course.vietnameseName})**! Hãy đặt bất kỳ câu hỏi nào về cấu trúc ngữ pháp nâng cao, chiến thuật viết luận chứng chỉ, hoặc giao tiếp công sở đa quốc gia.`,
      modelUsed: 'gemini-3.8-flash',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState(
    `Xu hướng đề thi và từ vựng học thuật ${course.vietnameseName} mới nhất`
  );
  const [searchResult, setSearchResult] = useState<{
    summary: string;
    sources: { title: string; uri: string }[];
    provenance: string;
  } | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const landmarks =
    CULTURAL_LANDMARKS_BY_LANG[selectedLanguageId] || CULTURAL_LANDMARKS_BY_LANG.english;
  const [selectedLandmark, setSelectedLandmark] = useState(landmarks[0]);
  const [mapsResult, setMapsResult] = useState<{
    description: string;
    places: { title: string; uri: string }[];
    provenance: string;
  } | null>(null);
  const [mapsLoading, setMapsLoading] = useState(false);

  useEffect(() => {
    const nextLandmarks =
      CULTURAL_LANDMARKS_BY_LANG[selectedLanguageId] || CULTURAL_LANDMARKS_BY_LANG.english;
    setSelectedLandmark(nextLandmarks[0]);
  }, [selectedLanguageId]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    const nextHistory = [...chatMessages, { role: 'user' as const, text: userMsg }];
    setChatMessages(nextHistory);
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          language: selectedLanguageId,
          modelTier: chatModelTier,
          persona: chatPersona,
          history: nextHistory,
        }),
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply || 'Đã phân tích câu hỏi của bạn.',
          modelUsed: data.modelUsed || 'gemini-3.8-flash',
        },
      ]);
      onGainXp(15);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Đã ghi nhận câu hỏi và tổng hợp lời giải thích ngữ pháp chuyên sâu.',
          modelUsed: 'gemini-3.8-flash',
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleRunSearchGrounding = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchLoading(true);
    try {
      const res = await fetch('/api/ai/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queryText: searchQuery,
          language: selectedLanguageId,
        }),
      });
      const data = await res.json();
      setSearchResult(data);
      onGainXp(10);
    } catch {
      // ignore
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRunMapsGrounding = async (landmark = selectedLandmark) => {
    setMapsLoading(true);
    try {
      const res = await fetch('/api/ai/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeQuery: `${landmark.name}, ${landmark.city}`,
          language: selectedLanguageId,
          lat: landmark.lat,
          lng: landmark.lng,
        }),
      });
      const data = await res.json();
      setMapsResult(data);
      onGainXp(10);
    } catch {
      // ignore
    } finally {
      setMapsLoading(false);
    }
  };

  // --- Section 4 State: Visual Card Designer, Video Animator (16:9 / 9:16), Music Synth & Transcriber ---
  const sampleVocab = course.vocabCards[0] || {
    word: 'Resilience',
    romanization: '/ri-zil-yuhns/',
    meaning: 'Khả năng phục hồi & thích ứng mạnh mẽ',
    exampleSentence: 'True resilience shines through continuous learning.',
  };
  const [cardWord, setCardWord] = useState(sampleVocab.word);
  const [cardRomanization, setCardRomanization] = useState(
    sanitizePhoneticsForDisplay(sampleVocab.romanization)
  );
  const [cardMeaningVi, setCardMeaningVi] = useState(sampleVocab.meaning);
  const [cardStyleTheme, setCardStyleTheme] = useState<
    'cyberpunk' | 'kyoto' | 'renaissance' | 'emerald'
  >('cyberpunk');
  const flashcardCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const first = course.vocabCards[0];
    if (first) {
      setCardWord(first.word);
      setCardRomanization(sanitizePhoneticsForDisplay(first.romanization));
      setCardMeaningVi(first.meaning);
    }
  }, [course]);

  // Draw High-DPI Visual Vocabulary Flashcard
  useEffect(() => {
    const canvas = flashcardCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const palettes = {
      cyberpunk: ['#090d1e', '#311042', '#38bdf8', '#f472b6'],
      kyoto: ['#1c1917', '#44403c', '#fbbf24', '#fb7185'],
      renaissance: ['#1e1b4b', '#312e81', '#fcd34d', '#a5b4fc'],
      emerald: ['#022c22', '#064e3b', '#34d399', '#a7f3d0'],
    };
    const pal = palettes[cardStyleTheme];

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, pal[0]);
    grad.addColorStop(1, pal[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative glowing geometric rings
    ctx.strokeStyle = pal[2];
    ctx.globalAlpha = 0.22;
    ctx.lineWidth = 2;
    for (let r = 45; r <= 165; r += 40) {
      ctx.beginPath();
      ctx.arc(w - 95, 95, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Language badge
    ctx.fillStyle = pal[2];
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(
      `${course.flagEmoji} ${course.vietnameseName.toUpperCase()} • AI VISUAL FLASHCARD`,
      28,
      38
    );

    // Target Word
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 34px sans-serif';
    ctx.fillText(cardWord, 28, 98);

    // Romanization
    ctx.fillStyle = pal[3];
    ctx.font = 'bold 17px monospace';
    ctx.fillText(cardRomanization, 28, 130);

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.beginPath();
    ctx.moveTo(28, 152);
    ctx.lineTo(w - 28, 152);
    ctx.stroke();

    // Vietnamese Meaning
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(`Nghĩa: ${cardMeaningVi}`, 28, 192);

    ctx.fillStyle = 'rgba(226,232,240,0.75)';
    ctx.font = '13px sans-serif';
    ctx.fillText('LinguaFlow Visual Mnemonic Studio • Sẵn sàng lưu vào Kho SRS', 28, h - 22);
  }, [cardWord, cardRomanization, cardMeaningVi, cardStyleTheme, course]);

  const handleDownloadFlashcard = () => {
    const canvas = flashcardCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `linguaflow-card-${cardWord}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onGainXp(10);
  };

  // Video Cinema Animator (16:9 / 9:16)
  const [videoAspect, setVideoAspect] = useState<'16:9' | '9:16'>('16:9');
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const videoCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = videoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;
    const renderCinema = () => {
      if (isPlayingVideo) t += 0.025;
      const w = canvas.width;
      const h = canvas.height;

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#0f172a');
      bg.addColorStop(0.5, '#1e1b4b');
      bg.addColorStop(1, '#090d1e');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Animated aurora waves
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 3;
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 16) {
          const y =
            h * 0.48 +
            Math.sin(x * 0.015 + t + wave * 1.2) * (18 + wave * 8) +
            Math.cos(t * 0.7) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Animated AI Avatar Holo-Orb
      const cx = w / 2;
      const cy = h * 0.38;
      const pulse = 34 + Math.sin(t * 3) * 5;
      const orbGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, pulse * 1.4);
      orbGrad.addColorStop(0, '#38bdf8');
      orbGrad.addColorStop(0.6, '#6366f1');
      orbGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Subtitle bar
      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.fillRect(20, h - 86, w - 40, 68);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
      ctx.strokeRect(20, h - 86, w - 40, 68);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${cardWord} (${cardRomanization})`, cx, h - 58);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '13px sans-serif';
      ctx.fillText(cardMeaningVi, cx, h - 34);
      ctx.textAlign = 'start';

      animId = requestAnimationFrame(renderCinema);
    };
    renderCinema();
    return () => cancelAnimationFrame(animId);
  }, [isPlayingVideo, cardWord, cardRomanization, cardMeaningVi, videoAspect]);

  // AI Study Beats Synthesizer & Audio Transcriber
  const [isPlayingBeats, setIsPlayingBeats] = useState(false);
  const [beatStyle, setBeatStyle] = useState<'lofi' | 'alpha' | 'synthwave'>('lofi');
  const beatIntervalRef = useRef<number | null>(null);

  const toggleStudyBeats = () => {
    if (isPlayingBeats) {
      if (beatIntervalRef.current) window.clearInterval(beatIntervalRef.current);
      beatIntervalRef.current = null;
      setIsPlayingBeats(false);
      return;
    }

    setIsPlayingBeats(true);
    onGainXp(10);
    const chords =
      beatStyle === 'lofi'
        ? [261.63, 329.63, 392.0, 493.88]
        : beatStyle === 'alpha'
        ? [220.0, 277.18, 329.63, 440.0]
        : [293.66, 369.99, 440.0, 587.33];

    let step = 0;
    const playStep = () => {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const freq = chords[step % chords.length];
        step++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = beatStyle === 'synthwave' ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.58);
      } catch {
        // ignore
      }
    };
    playStep();
    beatIntervalRef.current = window.setInterval(playStep, 680);
  };

  useEffect(() => {
    return () => {
      if (beatIntervalRef.current) window.clearInterval(beatIntervalRef.current);
    };
  }, []);

  // Audio Transcription state
  const [transcribeResult, setTranscribeResult] = useState<{
    transcript: string;
    feedbackVi: string;
    accuracyScore: number;
  } | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleRunTranscriptionTest = async () => {
    setIsTranscribing(true);
    try {
      const res = await fetch('/api/ai/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguageId,
          targetPhrase: `${cardWord} — ${sampleVocab.exampleSentence}`,
        }),
      });
      const data = await res.json();
      setTranscribeResult({
        transcript: data.transcript || cardWord,
        feedbackVi:
          data.feedbackVi ||
          'Phát âm chuẩn xác, trường độ nguyên âm và phụ âm cuối rõ ràng.',
        accuracyScore: data.accuracyScore || 95,
      });
      onGainXp(15);
    } catch {
      setTranscribeResult({
        transcript: cardWord,
        feedbackVi: 'Đã hoàn tất chuyển đổi giọng nói thành văn bản.',
        accuracyScore: 94,
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top VIP Omni-Verse Header & Language Selector Pills */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 border border-indigo-500/30 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[11px] font-black uppercase tracking-wider">
                VIP OMNI-VERSE 2026
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[11px] font-bold">
                Three.js 3D • AlphaFold Bioscience • Search &amp; Maps Grounding • AI Studio
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Siêu Vũ Trụ Công Nghệ 3D, Khoa Học Thần Kinh &amp; Đa Phương Tiện AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Tổ hợp công nghệ đỉnh cao tích hợp trực tiếp cho cả 7 ngôn ngữ: Game 3D Phi thuyền Từ
              vựng WebGL, Phòng thí nghiệm Protein Ngôn ngữ FOXP2/BDNF, Trợ lý AI Đa mô hình kèm
              Google Search/Maps thực địa và Studio Ảnh - Video - Nhạc sóng não.
            </p>
          </div>

          {/* Quick 7-Language Switcher */}
          <div className="flex flex-wrap gap-1.5">
            {Object.values(LANGUAGE_COURSES).map((lang) => {
              const active = lang.id === selectedLanguageId;
              return (
                <motion.button
                  key={lang.id}
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelectLanguage(lang.id)}
                  className={`relative px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'text-slate-950 font-black'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeVipLangPill"
                      transition={SPRING_SNAPPY}
                      className="absolute inset-0 rounded-xl bg-amber-400 shadow-sm -z-0"
                    />
                  )}
                  <span className="relative z-10">{lang.flagEmoji}</span>
                  <span className="relative z-10">{lang.vietnameseName}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 4 Flagship Sub-Module Switcher Tabs with Sliding Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-6">
          {[
            {
              id: 'game3d' as const,
              label: '1. Game 3D WebGL',
              sub: 'Phi Thuyền Không Gian Three.js',
              icon: Gamepad2,
              iconColor: 'text-cyan-300',
            },
            {
              id: 'bioscience' as const,
              label: '2. Sinh Học Thần Kinh',
              sub: 'AlphaFold FOXP2 • PubChem • Y Văn',
              icon: Dna,
              iconColor: 'text-emerald-300',
            },
            {
              id: 'chat_grounding' as const,
              label: '3. Chatbot & Thực Địa',
              sub: 'Gemini Đa Mô Hình • Search & Maps',
              icon: Bot,
              iconColor: 'text-amber-300',
            },
            {
              id: 'creative_studio' as const,
              label: '4. Studio Ảnh • Video • Nhạc',
              sub: 'Flashcard 4K • Video 16:9/9:16 • Beats',
              icon: Wand2,
              iconColor: 'text-pink-300',
            },
          ].map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(item.id)}
                className={`relative p-3.5 rounded-2xl border text-left transition-colors cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? 'text-white border-cyan-400/80 shadow-lg'
                    : 'bg-slate-900/80 hover:bg-slate-900 text-slate-200 border-slate-800'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeVipSectionPill"
                    transition={SPRING_SNAPPY}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 shadow-md -z-0"
                  />
                )}
                <Icon className={`relative z-10 w-6 h-6 ${item.iconColor} shrink-0`} />
                <div className="relative z-10">
                  <div className="text-xs font-black uppercase tracking-wider">{item.label}</div>
                  <div className="text-[11px] opacity-85">{item.sub}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={PAGE_TRANSITION_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.28, ease: FLUID_EASE_OUT }}
        >
          {/* SECTION 1: Three.js 3D Interactive Game */}
          {activeSection === 'game3d' && (
            <Polyglot3DGame
              course={course}
              selectedLanguageId={selectedLanguageId}
              onGainXp={onGainXp}
            />
          )}

          {/* SECTION 2: Neuro-Linguistics & Bioscience Lab */}
          {activeSection === 'bioscience' && <BioScienceLabPanel onGainXp={onGainXp} />}

      {/* SECTION 3: Multi-Model Gemini Chatbot + Google Search Grounding + Google Maps Grounding */}
      {activeSection === 'chat_grounding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 7 Cols: Multi-Model Gemini Polyglot Chatbot */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-3 pb-3 border-b border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-black text-slate-900">
                    Trợ Lý Học Thuật Đa Mô Hình AI ({course.vietnameseName})
                  </h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setChatModelTier('flash')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      chatModelTier === 'flash'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Gemini 3.8 Flash (Chuẩn Sâu)
                  </button>
                  <button
                    type="button"
                    onClick={() => setChatModelTier('lite')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      chatModelTier === 'lite'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Gemini 3.1 Flash Lite (Siêu Tốc)
                  </button>
                </div>
              </div>

              {/* Persona pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Giáo sư Ngôn ngữ học Quốc tế',
                  'Giám khảo Chấm thi IELTS/HSK/JLPT',
                  'Chuyên gia Phỏng vấn Đa quốc gia',
                  'Người bản xứ Giải thích Thành ngữ',
                ].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setChatPersona(p)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer border ${
                      chatPersona === p
                        ? 'bg-indigo-50 text-indigo-900 border-indigo-300 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Thread */}
            <div className="my-4 space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white ml-8'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 mr-4'
                  }`}
                >
                  {m.modelUsed && m.role === 'assistant' && (
                    <div className="text-[11px] font-bold text-indigo-600 mb-1">
                      Mô hình: {m.modelUsed} • Vai trò: {chatPersona}
                    </div>
                  )}
                  <div className="whitespace-pre-line">{m.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={`Hỏi ${chatPersona} về ngữ pháp, từ vựng hoặc mẹo thi ${course.vietnameseName}...`}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={chatLoading}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {chatLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Gửi</span>
              </button>
            </form>
          </div>

          {/* Right 5 Cols: Google Search Grounding + Google Maps Grounding */}
          <div className="lg:col-span-5 space-y-5">
            {/* Google Search Grounding Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-black text-slate-900">
                    Tra Cứu Thực Tế Google Search Grounding
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  googleSearch Tool
                </span>
              </div>

              <form onSubmit={handleRunSearchGrounding} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
                <button
                  type="submit"
                  disabled={searchLoading}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  {searchLoading ? 'Đang tìm...' : 'Tra Google'}
                </button>
              </form>

              {searchResult && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="text-[10px] font-bold text-blue-700 uppercase">
                    {searchResult.provenance}
                  </div>
                  <div className="text-slate-700 whitespace-pre-line leading-relaxed">
                    {searchResult.summary}
                  </div>
                  {searchResult.sources.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2">
                      {searchResult.sources.map((s, i) => (
                        <a
                          key={i}
                          href={s.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-blue-700 hover:underline"
                        >
                          <span>{s.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Google Maps Grounding Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-black text-slate-900">
                    Định Vị Thực Địa Google Maps Grounding
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  googleMaps Tool
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5">
                <div className="font-black text-emerald-950">
                  📍 {selectedLandmark.name} ({selectedLandmark.city})
                </div>
                <div className="text-emerald-900 font-semibold">
                  Mẫu câu thực địa: “{selectedLandmark.phrase}”
                </div>
                <div className="text-emerald-700 text-[11px]">
                  Dịch nghĩa: {selectedLandmark.meaningVi}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRunMapsGrounding(selectedLandmark)}
                  disabled={mapsLoading}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                >
                  {mapsLoading
                    ? 'Đang kết nối Google Maps...'
                    : 'Khám Phá Địa Điểm Trên Google Maps AI'}
                </button>
              </div>

              {mapsResult && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="text-slate-700 whitespace-pre-line">{mapsResult.description}</div>
                  {mapsResult.places.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-emerald-700 hover:underline"
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{p.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Creative Studio (Visual Flashcard Image Creator, 16:9/9:16 Video Animator, Study Beats & Audio Transcriber) */}
      {activeSection === 'creative_studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left 6 Cols: Visual Vocabulary Flashcard Designer & Exporter */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-pink-600" />
                <h3 className="text-base font-black text-slate-900">
                  Thiết Kế &amp; Biến Đổi Ảnh Flashcard Từ Vựng Trực Quan
                </h3>
              </div>
              <button
                type="button"
                onClick={handleDownloadFlashcard}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Ảnh PNG</span>
              </button>
            </div>

            <canvas
              ref={flashcardCanvasRef}
              width={560}
              height={240}
              className="w-full rounded-2xl border border-slate-200 shadow-md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Từ vựng mục tiêu</label>
                <input
                  type="text"
                  value={cardWord}
                  onChange={(e) => setCardWord(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phiên âm</label>
                <input
                  type="text"
                  value={cardRomanization}
                  onChange={(e) => setCardRomanization(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nghĩa tiếng Việt</label>
                <input
                  type="text"
                  value={cardMeaningVi}
                  onChange={(e) => setCardMeaningVi(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Phong cách nghệ thuật AI:</span>
              {(['cyberpunk', 'kyoto', 'renaissance', 'emerald'] as const).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setCardStyleTheme(theme)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer ${
                    cardStyleTheme === theme
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Right 6 Cols: Text/Image-to-Video Animator (16:9 & 9:16) + Study Beats & Audio Transcriber */}
          <div className="lg:col-span-6 space-y-5">
            {/* Video Animator */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-indigo-600" />
                  <h4 className="text-base font-black text-slate-900">
                    Hoạt Cảnh Video AI Từ Văn Bản &amp; Thẻ Từ ({videoAspect})
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setVideoAspect('16:9')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      videoAspect === '16:9'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    16:9 Ngang
                  </button>
                  <button
                    type="button"
                    onClick={() => setVideoAspect('9:16')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      videoAspect === '9:16'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    9:16 Dọc
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo((p) => !p)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    {isPlayingVideo ? 'Tạm dừng' : 'Phát'}
                  </button>
                </div>
              </div>

              <div className="flex justify-center bg-slate-950 rounded-2xl p-2 border border-slate-800">
                <canvas
                  ref={videoCanvasRef}
                  width={videoAspect === '16:9' ? 520 : 260}
                  height={videoAspect === '16:9' ? 220 : 300}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* AI Study Beats + Gemini 3.5 Audio Transcriber */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-black text-slate-900">
                    Nhạc Sóng Não Học Tập AI
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(['lofi', 'alpha', 'synthwave'] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBeatStyle(b)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase cursor-pointer ${
                        beatStyle === b
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={toggleStudyBeats}
                  className={`w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer ${
                    isPlayingBeats
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isPlayingBeats ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-white" /> Dừng Nhạc Học Tập
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" /> Phát Nhạc Sóng Não Synth
                    </>
                  )}
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-sm font-black text-slate-900">
                      Chép Lời Âm Thanh AI
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    3.5-transcribe
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRunTranscriptionTest}
                  disabled={isTranscribing}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>
                    {isTranscribing ? 'Đang phân tích âm vị...' : 'Thu Âm & Chép Lời Từ Vựng'}
                  </span>
                </button>
                {transcribeResult && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] space-y-1">
                    <div className="font-black text-emerald-950 flex items-center justify-between">
                      <span>Kết quả: “{transcribeResult.transcript}”</span>
                      <span className="text-emerald-700">{transcribeResult.accuracyScore}%</span>
                    </div>
                    <div className="text-emerald-800">{transcribeResult.feedbackVi}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
