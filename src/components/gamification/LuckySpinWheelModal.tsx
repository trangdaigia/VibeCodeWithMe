import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, X, RefreshCw, Zap, CheckCircle2 } from 'lucide-react';

interface LuckySpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGainXp: (amount: number) => void;
  currentStreak: number;
}

interface WheelSlice {
  id: string;
  label: string;
  sub: string;
  xpValue: number;
  color: string;
  textColor: string;
  icon: string;
}

const WHEEL_SLICES: WheelSlice[] = [
  { id: '1', label: '+30 XP', sub: 'Thưởng Chăm Chỉ', xpValue: 30, color: '#4F46E5', textColor: '#FFFFFF', icon: '⚡' },
  { id: '2', label: 'Khiên Streak', sub: 'Bảo vệ chuỗi', xpValue: 20, color: '#059669', textColor: '#FFFFFF', icon: '🛡️' },
  { id: '3', label: '+50 XP', sub: 'Siêu Cấp Bứt Phá', xpValue: 50, color: '#D97706', textColor: '#FFFFFF', icon: '🔥' },
  { id: '4', label: 'Double XP', sub: 'X2 XP Bài Học', xpValue: 40, color: '#E11D48', textColor: '#FFFFFF', icon: '🚀' },
  { id: '5', label: '+100 XP', sub: 'HŨ VÀNG JACKPOT', xpValue: 100, color: '#7C3AED', textColor: '#FFFFFF', icon: '👑' },
  { id: '6', label: '+25 XP', sub: 'Thưởng May Mắn', xpValue: 25, color: '#0284C7', textColor: '#FFFFFF', icon: '✨' },
  { id: '7', label: '+75 XP', sub: 'Cao Thủ Ngôn Ngữ', xpValue: 75, color: '#EA580C', textColor: '#FFFFFF', icon: '🏆' },
  { id: '8', label: '+35 XP', sub: 'Trôi Chảy Combo', xpValue: 35, color: '#10B981', textColor: '#FFFFFF', icon: '⭐' },
];

export const LuckySpinWheelModal: React.FC<LuckySpinWheelModalProps> = ({
  isOpen,
  onClose,
  onGainXp,
  currentStreak,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [wonPrize, setWonPrize] = useState<WheelSlice | null>(null);
  const [hasSpunToday, setHasSpunToday] = useState(false);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning || hasSpunToday) return;

    setIsSpinning(true);
    setWonPrize(null);

    // Random index from 0 to 7
    const prizeIndex = Math.floor(Math.random() * WHEEL_SLICES.length);
    const sliceAngle = 360 / WHEEL_SLICES.length;
    // Calculate rotation: 5 full turns (1800deg) + slice alignment
    const targetSliceRotation = 360 - (prizeIndex * sliceAngle + sliceAngle / 2);
    const totalNewRotation = rotationDegree + 1800 + targetSliceRotation;

    setRotationDegree(totalNewRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setHasSpunToday(true);
      const prize = WHEEL_SLICES[prizeIndex];
      setWonPrize(prize);

      if (prize.xpValue > 0) {
        onGainXp(prize.xpValue);
      }

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    }, 4200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full p-5 shadow-2xl border border-slate-200 flex flex-col items-center text-center relative max-h-[92vh] overflow-y-auto my-auto">
        {/* Prominent Visible Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer z-20 shadow-2xs"
          aria-label="Đóng vòng quay"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-600 uppercase tracking-wider mb-1 pt-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Vòng Quay Thưởng Học Tập</span>
        </div>
        <h2 className="text-lg font-extrabold text-slate-900">Vòng Quay Tăng Tốc XP</h2>
        <p className="text-xs text-slate-500 max-w-xs mt-0.5">
          Chuỗi {currentStreak} ngày học · Nhận thưởng ngẫu nhiên mỗi ngày
        </p>

        {/* Compact Wheel Container */}
        <div className="relative my-4 w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center shrink-0">
          {/* Top Pointer Arrow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-amber-500 filter drop-shadow-md" />

          {/* SVG Rotating Wheel */}
          <div
            className="w-full h-full rounded-full shadow-xl border-4 border-amber-400 overflow-hidden relative"
            style={{
              transform: `rotate(${rotationDegree}deg)`,
              transition: isSpinning ? 'transform 4.2s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {WHEEL_SLICES.map((slice, index) => {
                const angle = 360 / WHEEL_SLICES.length;
                const startAngle = index * angle;
                const endAngle = (index + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                const textAngle = startAngle + angle / 2;
                const textX = 50 + 32 * Math.cos((Math.PI * textAngle) / 180);
                const textY = 50 + 32 * Math.sin((Math.PI * textAngle) / 180);

                return (
                  <g key={slice.id}>
                    <path d={pathData} fill={slice.color} stroke="#FFFFFF" strokeWidth="0.8" />
                    <text
                      x={textX}
                      y={textY}
                      fill="#FFFFFF"
                      fontSize="4.2"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                    >
                      {slice.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Spin Button */}
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning || hasSpunToday}
            className={`absolute z-20 w-14 h-14 rounded-full bg-slate-900 border-3 border-amber-400 text-white font-black text-xs shadow-lg flex items-center justify-center transition-all cursor-pointer ${
              isSpinning ? 'opacity-80 scale-95' : 'hover:scale-105 active:scale-95'
            }`}
          >
            {isSpinning ? (
              <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
            ) : hasSpunToday ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <div className="flex flex-col items-center">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[8px] uppercase font-bold text-amber-300">QUAY</span>
              </div>
            )}
          </button>
        </div>

        {/* Won Prize Banner */}
        {wonPrize && (
          <div className="w-full p-2.5 bg-amber-50 rounded-2xl border border-amber-200 text-slate-900 animate-in zoom-in-95 duration-200 mb-3">
            <div className="text-xs font-extrabold text-amber-800 flex items-center justify-center gap-1.5">
              <span>{wonPrize.icon}</span>
              <span>Chúc mừng! Bạn quay trúng {wonPrize.label}</span>
            </div>
            <p className="text-[11px] text-amber-700 mt-0.5">
              Đã tự động cộng <strong>+{wonPrize.xpValue} XP</strong> vào tài khoản!
            </p>
          </div>
        )}

        {/* Dynamic Action Button: Spin or Close */}
        {hasSpunToday ? (
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer"
            data-testid="close-lucky-wheel-btn"
          >
            Hoàn Thành &amp; Đóng
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all cursor-pointer"
            data-testid="spin-lucky-wheel-btn"
          >
            {isSpinning ? 'Đang Quay...' : 'Quay Ngay Nhận Thưởng'}
          </button>
        )}
      </div>
    </div>
  );
};
