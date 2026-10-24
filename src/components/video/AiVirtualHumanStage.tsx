import React from 'react';
import { Volume2, Sparkles, Mic, Radio, Subtitles } from 'lucide-react';
import {
  AiVideoSegment,
  AiVirtualInstructor,
  VoicePersonaId
} from '../../data/aiVideoCurriculum';

interface AiVirtualHumanStageProps {
  instructor: AiVirtualInstructor;
  activeSegment: AiVideoSegment;
  segmentIndex: number;
  totalSegments: number;
  isPlaying: boolean;
  mouthPhase: number; // 0, 1, 2, 3 for viseme animation
  blinkState: boolean;
  voicePersona: VoicePersonaId;
  voiceRate: number;
  showSubtitles: boolean;
  languageFlag: string;
  languageName: string;
  levelBadge: string;
  onSpeakTerm: (term: string) => void;
  onTogglePlay: () => void;
}

const VOICE_PERSONA_LABELS: Record<VoicePersonaId, string> = {
  'female-warm': 'Giọng Nữ AI Tự Nhiên',
  'male-deep': 'Giọng Nam AI Trầm Ấm',
  'academic-clear': 'Giọng Học Thuật Chuẩn',
  'energetic-native': 'Giọng Bản Xứ Truyền Cảm'
};

export const AiVirtualHumanStage: React.FC<AiVirtualHumanStageProps> = ({
  instructor,
  activeSegment,
  segmentIndex,
  totalSegments,
  isPlaying,
  mouthPhase,
  blinkState,
  voicePersona,
  voiceRate,
  showSubtitles,
  languageFlag,
  languageName,
  levelBadge,
  onSpeakTerm,
  onTogglePlay
}) => {
  const { avatarStyle } = instructor;
  const gesture = activeSegment.gesture;

  // Compute dynamic mouth shape based on speaking state & viseme phase
  const renderMouthViseme = () => {
    if (!isPlaying) {
      // Gentle confident smile when paused/idle
      return (
        <path
          d="M 88 126 Q 100 133 112 126"
          fill="none"
          stroke="#9F1239"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    }

    switch (mouthPhase % 4) {
      case 0: // Open 'A / O' vowel
        return (
          <g>
            <ellipse cx="100" cy="127" rx="10" ry="6.5" fill="#7F1D1D" stroke="#9F1239" strokeWidth="2" />
            <path d="M 93 123 L 107 123" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="100" cy="130" rx="6" ry="2.5" fill="#F43F5E" />
          </g>
        );
      case 1: // Wide 'E / I' vowel
        return (
          <g>
            <rect x="89" y="123" width="22" height="7" rx="3.5" fill="#7F1D1D" stroke="#9F1239" strokeWidth="2" />
            <line x1="92" y1="125" x2="108" y2="125" stroke="#FFFFFF" strokeWidth="1.8" />
          </g>
        );
      case 2: // Rounded 'U / W' sound
        return (
          <g>
            <ellipse cx="100" cy="127" rx="6.5" ry="5.5" fill="#7F1D1D" stroke="#9F1239" strokeWidth="2" />
            <ellipse cx="100" cy="129" rx="3.5" ry="2" fill="#FB7185" />
          </g>
        );
      default: // Soft consonant closure
        return (
          <path
            d="M 89 126 Q 100 130 111 126"
            fill="none"
            stroke="#9F1239"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        );
    }
  };

  // Compute right arm gesture path (pointing to smartboard vs welcoming vs explaining)
  const renderRightArmGesture = () => {
    if (gesture === 'pointing') {
      // Pointing toward the right smartboard
      return (
        <g className="transition-all duration-500">
          <path
            d="M 146 188 Q 175 175 194 148"
            fill="none"
            stroke={avatarStyle.blazerColor}
            strokeWidth="22"
            strokeLinecap="round"
          />
          <circle cx="197" cy="144" r="9" fill={avatarStyle.skinTone} />
          <path
            d="M 197 144 L 210 136"
            stroke={avatarStyle.skinTone}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </g>
      );
    }

    if (gesture === 'welcoming') {
      return (
        <g className="transition-all duration-500">
          <path
            d="M 146 190 Q 172 195 186 168"
            fill="none"
            stroke={avatarStyle.blazerColor}
            strokeWidth="22"
            strokeLinecap="round"
          />
          <ellipse cx="189" cy="164" rx="10" ry="7" fill={avatarStyle.skinTone} />
        </g>
      );
    }

    if (gesture === 'emphasizing') {
      return (
        <g className="transition-all duration-500">
          <path
            d="M 145 190 Q 165 182 172 162"
            fill="none"
            stroke={avatarStyle.blazerColor}
            strokeWidth="22"
            strokeLinecap="round"
          />
          <circle cx="174" cy="157" r="9.5" fill={avatarStyle.skinTone} />
        </g>
      );
    }

    // Default 'explaining' open hand gesture
    return (
      <g className="transition-all duration-500">
        <path
          d="M 145 192 Q 168 202 180 180"
          fill="none"
          stroke={avatarStyle.blazerColor}
          strokeWidth="22"
          strokeLinecap="round"
        />
        <ellipse cx="183" cy="176" rx="9.5" ry="7" fill={avatarStyle.skinTone} />
      </g>
    );
  };

  return (
    <div
      data-testid="ai-video-stage"
      data-speaking={isPlaying ? 'true' : 'false'}
      data-gesture={gesture}
      className={`relative w-full rounded-2xl overflow-hidden bg-linear-to-br ${avatarStyle.studioBackdrop} text-white shadow-xl border border-slate-800`}
    >
      {/* Top Broadcast HUD Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 py-3 bg-slate-950/60 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase whitespace-nowrap ${
              isPlaying
                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
            {isPlaying ? 'AI ĐANG GIẢNG BÀI' : 'STUDIO SẴN SÀNG'}
          </span>

          <span className="text-xs font-semibold text-slate-200 whitespace-nowrap">
            {languageFlag} {languageName} <span aria-hidden="true">·</span> {levelBadge}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-indigo-200 font-medium whitespace-nowrap">
            <Mic className="w-3.5 h-3.5 text-indigo-400" />
            {VOICE_PERSONA_LABELS[voicePersona]} ({voiceRate}x)
          </span>
          <span className="text-xs font-semibold text-slate-400 tabular-nums whitespace-nowrap">
            Phần {segmentIndex + 1}/{totalSegments}
          </span>
        </div>
      </div>

      {/* Main Split Broadcast Stage: Left = AI Virtual Human Avatar | Right = Synchronized Smartboard */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[360px] sm:min-h-[410px]">
        {/* Ambient Studio Spotlights */}
        <div className="pointer-events-none absolute -top-24 left-1/4 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />

        {/* Left Column (5 cols on desktop): Animated AI Virtual Human Presenter */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-end pt-4 px-4 border-b lg:border-b-0 lg:border-r border-white/10 bg-linear-to-t from-slate-950/70 via-transparent to-transparent">
          {/* AI Avatar SVG Canvas */}
          <div
            onClick={onTogglePlay}
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? 'Tạm dừng Giảng viên AI' : 'Phát bài giảng của Giảng viên AI'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTogglePlay();
              }
            }}
            className="relative w-56 sm:w-64 h-64 sm:h-72 flex items-end justify-center cursor-pointer group select-none"
          >
            {/* Glowing Halo behind AI Instructor when speaking */}
            <div
              className={`absolute top-8 w-40 h-40 rounded-full transition-all duration-500 ${
                isPlaying
                  ? 'bg-indigo-500/25 ring-2 ring-indigo-400/40 scale-105'
                  : 'bg-white/5 scale-95'
              } blur-md`}
            />

            <svg
              viewBox="0 0 220 260"
              className={`w-full h-full drop-shadow-2xl transition-transform duration-500 ${
                isPlaying ? 'scale-[1.02]' : 'group-hover:scale-[1.01]'
              }`}
              aria-hidden="true"
            >
              {/* Back Hair for Long Hair Style */}
              {avatarStyle.hairStyle === 'long-wave' && (
                <path
                  d="M 58 75 Q 48 135 55 180 L 145 180 Q 152 135 142 75 Z"
                  fill={avatarStyle.hairColor}
                />
              )}
              {avatarStyle.hairStyle === 'bob-cut' && (
                <path
                  d="M 58 72 Q 50 115 62 142 L 138 142 Q 150 115 142 72 Z"
                  fill={avatarStyle.hairColor}
                />
              )}

              {/* Neck & Shoulders / Blazer */}
              <rect x="88" y="138" width="24" height="30" rx="8" fill={avatarStyle.skinTone} />

              {/* Left Arm (Resting / Holding Presenter Tablet) */}
              <path
                d="M 55 190 Q 38 215 48 248"
                fill="none"
                stroke={avatarStyle.blazerColor}
                strokeWidth="22"
                strokeLinecap="round"
              />

              {/* Torso / Blazer Suit */}
              <path
                d="M 45 178 Q 52 158 84 156 L 116 156 Q 148 158 155 178 L 166 260 L 34 260 Z"
                fill={avatarStyle.blazerColor}
              />

              {/* Inner Shirt & Tie/Scarf Accent */}
              <polygon points="84,156 116,156 100,218" fill={avatarStyle.shirtColor} />
              {instructor.gender === 'male' ? (
                <polygon points="96,162 104,162 106,212 100,222 94,212" fill={avatarStyle.tieOrScarfColor} />
              ) : (
                <path
                  d="M 83 160 Q 100 176 117 160 Q 112 182 100 186 Q 88 182 83 160 Z"
                  fill={avatarStyle.tieOrScarfColor}
                />
              )}

              {/* Blazer Lapels */}
              <polygon points="75,157 86,156 100,218 70,202" fill="#0F172A" opacity="0.35" />
              <polygon points="125,157 114,156 100,218 130,202" fill="#0F172A" opacity="0.35" />

              {/* AI Lapel Microphone Badge */}
              <circle cx="122" cy="188" r="4.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
              {isPlaying && (
                <circle cx="122" cy="188" r="7" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.7" />
              )}

              {/* Head & Ears */}
              <circle cx="62" cy="98" r="8" fill={avatarStyle.skinTone} />
              <circle cx="138" cy="98" r="8" fill={avatarStyle.skinTone} />
              <rect
                x="64"
                y="46"
                width="72"
                height="98"
                rx="35"
                fill={avatarStyle.skinTone}
              />

              {/* Soft Cheek Blush */}
              <ellipse cx="78" cy="108" rx="7" ry="4" fill="#F43F5E" opacity="0.16" />
              <ellipse cx="122" cy="108" rx="7" ry="4" fill="#F43F5E" opacity="0.16" />

              {/* Eyebrows (Animated subtly when speaking/emphasizing) */}
              <path
                d={
                  gesture === 'emphasizing' || (isPlaying && mouthPhase % 2 === 0)
                    ? 'M 75 79 Q 84 74 92 78'
                    : 'M 75 81 Q 84 77 92 80'
                }
                fill="none"
                stroke={avatarStyle.hairColor}
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d={
                  gesture === 'emphasizing' || (isPlaying && mouthPhase % 2 === 0)
                    ? 'M 108 78 Q 116 74 125 79'
                    : 'M 108 80 Q 116 77 125 81'
                }
                fill="none"
                stroke={avatarStyle.hairColor}
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Eyes (With natural blinking and pupil direction) */}
              {blinkState ? (
                <g>
                  <path d="M 76 93 Q 84 96 92 93" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 108 93 Q 116 96 124 93" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              ) : (
                <g>
                  <ellipse cx="84" cy="92" rx="7" ry="5" fill="#FFFFFF" />
                  <ellipse cx="116" cy="92" rx="7" ry="5" fill="#FFFFFF" />
                  <circle
                    cx={gesture === 'pointing' ? 86 : 84}
                    cy="92"
                    r="3.5"
                    fill="#1E1B4B"
                  />
                  <circle
                    cx={gesture === 'pointing' ? 118 : 116}
                    cy="92"
                    r="3.5"
                    fill="#1E1B4B"
                  />
                  <circle cx={gesture === 'pointing' ? 87 : 85} cy="90.5" r="1.2" fill="#FFFFFF" />
                  <circle cx={gesture === 'pointing' ? 119 : 117} cy="90.5" r="1.2" fill="#FFFFFF" />
                </g>
              )}

              {/* Optional Glasses for Professor Personas */}
              {avatarStyle.glasses && (
                <g stroke="#334155" strokeWidth="2" fill="rgba(255,255,255,0.08)">
                  <rect x="73" y="84" width="22" height="15" rx="4" />
                  <rect x="105" y="84" width="22" height="15" rx="4" />
                  <line x1="95" y1="91" x2="105" y2="91" />
                </g>
              )}

              {/* Nose */}
              <path
                d="M 100 95 L 98 110 Q 100 112 103 110"
                fill="none"
                stroke="#C89D84"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Lip-Synced Mouth */}
              {renderMouthViseme()}

              {/* Front Hair Crown */}
              <path
                d="M 62 82 Q 62 40 100 40 Q 138 40 138 82 Q 124 58 102 62 Q 78 58 62 82 Z"
                fill={avatarStyle.hairColor}
              />

              {/* Right Arm Gesture (Dynamic) */}
              {renderRightArmGesture()}
            </svg>
          </div>

          {/* Lower-Third Instructor Broadcast Nameplate & Live Voice Waveform */}
          <div className="w-full max-w-xs mb-3 px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/15 backdrop-blur-md flex items-center justify-between gap-2 shadow-lg">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <p className="text-xs font-bold text-white truncate">{instructor.name}</p>
              </div>
              <p className="text-[11px] text-indigo-300 truncate">{instructor.title}</p>
            </div>

            {/* Animated Audio Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-5 shrink-0 px-1" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((bar) => {
                const activeHeight = isPlaying
                  ? ((mouthPhase + bar) % 3 === 0 ? 'h-5' : (mouthPhase + bar) % 2 === 0 ? 'h-3.5' : 'h-2')
                  : 'h-1.5';
                return (
                  <span
                    key={bar}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPlaying ? 'bg-indigo-400' : 'bg-slate-600'
                    } ${activeHeight}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols on desktop): Synchronized Virtual Smartboard Slide */}
        <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between bg-slate-900/45">
          <div>
            {/* Slide Header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                {activeSegment.chapterTitle}
              </span>
              <span className="text-[11px] text-slate-400">
                Bảng tương tác thông minh AI
              </span>
            </div>

            {/* Key Grammar / Pronunciation Formula Box */}
            <div className="p-3.5 rounded-xl bg-indigo-950/70 border border-indigo-400/30 mb-4">
              <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wide mb-1">
                Công thức & Quy tắc Trọng tâm
              </div>
              <div className="text-sm sm:text-base font-bold text-white leading-snug">
                {activeSegment.boardFormula}
              </div>
            </div>

            {/* Interactive Vocabulary / Phrase Callout Cards on the Board */}
            <div className="space-y-2.5 mb-4">
              <div className="text-xs font-semibold text-slate-300">
                Từ vựng & Cụm từ trên bảng (Nhấn để nghe Giọng Ảo AI phát âm mẫu):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeSegment.boardExamples.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSpeakTerm(item.term)}
                    className="flex items-start justify-between gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/50 text-left transition-all cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {item.term}
                      </div>
                      <div className="text-xs text-indigo-300 mt-0.5">
                        {item.phonetic}
                      </div>
                      <div className="text-xs text-slate-300 mt-1">
                        {item.meaning}
                      </div>
                    </div>
                    <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500 group-hover:text-white transition-colors shrink-0">
                      <Volume2 className="w-4 h-4" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Instructor Pronunciation Tip Callout */}
          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-emerald-100">
              <span className="font-bold text-emerald-300">Mẹo khẩu hình từ Giảng viên AI: </span>
              {activeSegment.pronunciationTip}
            </div>
          </div>
        </div>
      </div>

      {/* Cinema Dual-Subtitle Overlay Bar */}
      {showSubtitles && (
        <div
          data-testid="ai-video-subtitles"
          className="relative z-10 px-4 sm:px-6 py-3.5 bg-slate-950/90 border-t border-white/10 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-bold text-white leading-snug">
            <Subtitles className="w-4 h-4 text-indigo-400 shrink-0 hidden sm:inline" />
            <span>{activeSegment.targetScript}</span>
          </div>
          <div className="text-xs sm:text-sm font-medium text-indigo-300 mt-1">
            {activeSegment.phoneticScript}
          </div>
          <div className="text-xs sm:text-sm text-slate-300 mt-1">
            {activeSegment.vietnameseSub}
          </div>
        </div>
      )}
    </div>
  );
};
