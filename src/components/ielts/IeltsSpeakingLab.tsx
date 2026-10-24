import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Check,
  Radio
} from 'lucide-react';
import { SpeakingCueCard } from '../../data/curriculum';
import { speakText } from '../../utils/speech';
import { IeltsLiveExaminer } from './IeltsLiveExaminer';

interface IeltsSpeakingLabProps {
  cueCards: SpeakingCueCard[];
  voiceLangCode: string;
  onGainXp: (amount: number) => void;
}

export const IeltsSpeakingLab: React.FC<IeltsSpeakingLabProps> = ({
  cueCards,
  voiceLangCode,
  onGainXp
}) => {
  const [speakingMode, setSpeakingMode] = useState<'live-examiner' | 'solo-cue-card'>('live-examiner');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [prepSeconds, setPrepSeconds] = useState(60);
  const [isPrepRunning, setIsPrepRunning] = useState(false);
  const [speakSeconds, setSpeakSeconds] = useState(120);
  const [isSpeakRunning, setIsSpeakRunning] = useState(false);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [prepNotes, setPrepNotes] = useState('');
  const [checkedBullets, setCheckedBullets] = useState<Record<number, boolean>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeCard: SpeakingCueCard | undefined = cueCards[selectedCardIndex] || cueCards[0];

  // Prep Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPrepRunning && prepSeconds > 0) {
      interval = setInterval(() => {
        setPrepSeconds(prev => {
          if (prev <= 1) {
            setIsPrepRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPrepRunning, prepSeconds]);

  // Speak Timer Countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSpeakRunning && speakSeconds > 0) {
      interval = setInterval(() => {
        setSpeakSeconds(prev => {
          if (prev <= 1) {
            setIsSpeakRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSpeakRunning, speakSeconds]);

  // Start Voice Recording
  const handleStartRecording = async () => {
    try {
      setMicError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicError('Trình duyệt của bạn không hỗ trợ tính năng thu âm qua Web API.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start(100);
      setIsRecording(true);
      setRecordedDuration(0);
      setIsSpeakRunning(true);

      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = setInterval(() => {
        setRecordedDuration(prev => {
          if (prev >= 120) {
            handleStopRecording();
            return 120;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone error:', err);
      setMicError('Không thể truy cập Micro. Vui lòng kiểm tra quyền cấp phép Micro (Allow Microphone) trên trình duyệt của bạn.');
      setIsRecording(false);
    }
  };

  // Stop Voice Recording
  const handleStopRecording = () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setIsSpeakRunning(false);
    onGainXp(30);
  };

  const handleResetTimers = () => {
    setIsPrepRunning(false);
    setPrepSeconds(60);
    setIsSpeakRunning(false);
    setSpeakSeconds(120);
    if (isRecording) {
      handleStopRecording();
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  if (!activeCard) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-sm text-slate-500">Chưa có đề thi Speaking Cue Card nào.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mode Switcher Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSpeakingMode('live-examiner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              speakingMode === 'live-examiner'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Phỏng Vấn Với Giám Khảo (Live Examiner - Có người đàm thoại)</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono uppercase tracking-wide">
              Official
            </span>
          </button>

          <button
            onClick={() => setSpeakingMode('solo-cue-card')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              speakingMode === 'solo-cue-card'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Phòng Thu Độc Thoại Part 2 (Cue Card Solo Lab)</span>
          </button>
        </div>

        <div className="text-[11px] font-semibold text-slate-500 hidden sm:block px-2">
          {speakingMode === 'live-examiner'
            ? '🎙️ Trực tiếp 3 phần với Giám khảo bản xứ Dr. Vance'
            : '⏱️ Bấm giờ 1 phút chuẩn bị & 2 phút thu âm độc thoại'}
        </div>
      </div>

      {/* Render Selected Speaking Mode */}
      {speakingMode === 'live-examiner' ? (
        <IeltsLiveExaminer onGainXp={onGainXp} />
      ) : (
        <>
          {/* Header Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Phòng Thu Âm Nói IELTS Thực Tế (Speaking Audio Lab)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Mô phỏng chuẩn phòng thi: 1 phút ghi chú dàn ý + 2 phút độc thoại thu âm trực tiếp
                    </p>
                  </div>
                </div>
              </div>

              {/* Cue Card Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0">
            {cueCards.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCardIndex(idx);
                  handleResetTimers();
                  setRecordedAudioUrl(null);
                  setCheckedBullets({});
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  selectedCardIndex === idx
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Part {c.part}: {c.topic.slice(0, 16)}...
              </button>
            ))}
          </div>
        </div>

        {/* Timers Bar */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Timer 1: 60s Prep */}
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-900">1 Phút Ghi Chú (Prep Time)</div>
              <div className="text-[11px] text-amber-700 mt-0.5">Suy nghĩ dàn ý và từ khóa</div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xl font-extrabold text-amber-950 tabular-nums">
                {formatTimer(prepSeconds)}
              </span>
              <button
                onClick={() => setIsPrepRunning(!isPrepRunning)}
                className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors cursor-pointer"
                title={isPrepRunning ? 'Tạm dừng' : 'Bắt đầu đếm 1 phút'}
              >
                {isPrepRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Timer 2: 120s Speak */}
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-900">2 Phút Nói Độc Thoại (Speech)</div>
              <div className="text-[11px] text-emerald-700 mt-0.5">Duy trì độ lưu loát tự nhiên</div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xl font-extrabold text-emerald-950 tabular-nums">
                {formatTimer(speakSeconds)}
              </span>
              <button
                onClick={() => setIsSpeakRunning(!isSpeakRunning)}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
                title={isSpeakRunning ? 'Tạm dừng' : 'Bắt đầu đếm 2 phút'}
              >
                {isSpeakRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Controls: Reset */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800">Đặt Lại Đồng Hồ</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Làm lại bài thi từ đầu</div>
            </div>
            <button
              onClick={handleResetTimers}
              className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Left Column (Cue Card & Scratchpad) + Right Column (Recording & Model) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Candidate Task Card & Prep Scratchpad */}
        <div className="lg:col-span-5 space-y-4">
          {/* Cue Card Prompt Box */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Candidate Task Card ({activeCard.topic})
              </span>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {activeCard.bandScore}
              </span>
            </div>

            <div className="text-xs sm:text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {activeCard.cueCardPrompt}
            </div>

            {/* Bullet Prompts Checklist */}
            {activeCard.bulletPoints && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-xs font-bold text-slate-700">
                  Các ý chính cần trả lời đầy đủ (Tích chọn khi đã nói xong):
                </div>
                <div className="space-y-1.5">
                  {activeCard.bulletPoints.map((bp, bpIdx) => {
                    const isChecked = !!checkedBullets[bpIdx];
                    return (
                      <button
                        key={bpIdx}
                        onClick={() => setCheckedBullets(prev => ({ ...prev, [bpIdx]: !isChecked }))}
                        className={`w-full text-left p-2 rounded-lg border text-xs transition-colors flex items-start gap-2 cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </span>
                        <span className={isChecked ? 'line-through text-emerald-800' : ''}>{bp}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 1-Minute Prep Notes Scratchpad */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Giấy Nháp 1 Phút Của Thí Sinh (Prep Notes)</span>
              </div>
              <button
                onClick={() => setPrepNotes('')}
                className="text-[11px] text-slate-400 hover:text-rose-600 cursor-pointer"
              >
                Xóa nháp
              </button>
            </div>
            <textarea
              value={prepNotes}
              onChange={e => setPrepNotes(e.target.value)}
              placeholder="Ghi nhanh từ khóa trong 1 phút chuẩn bị (ví dụ: Who, When, Why important, Best feeling)..."
              rows={4}
              className="w-full p-3 text-xs font-mono bg-amber-50/40 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-hidden leading-relaxed placeholder:text-amber-700/50 text-slate-900"
            />
          </div>

          {/* A.R.E.A Strategy Box */}
          {activeCard.areaBreakdown && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Khung Nói A.R.E.A Ăn Điểm Độ Mở Rộng
              </h4>
              <div className="space-y-2">
                {activeCard.areaBreakdown.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <span className="font-bold text-emerald-800">{item.step}: </span>
                    <span className="text-slate-600 leading-relaxed">{item.content}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Real Audio Recording & Band 8.5+ Sample */}
        <div className="lg:col-span-7 space-y-4">
          {/* Audio Recording Console */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}`} />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  {isRecording ? 'Đang Thu Âm Trực Tiếp...' : 'Bảng Thu Âm Giọng Nói'}
                </span>
              </div>
              {isRecording && (
                <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {formatTimer(recordedDuration)} / 02:00
                </span>
              )}
            </div>

            {/* Mic Error Notice */}
            {micError && (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{micError}</span>
              </div>
            )}

            {/* Big Record Button */}
            <div className="flex flex-col items-center justify-center py-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="w-16 h-16 rounded-full bg-linear-to-tr from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  title="Nhấn để bắt đầu thu âm bài nói"
                >
                  <Mic className="w-8 h-8" />
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="w-16 h-16 rounded-full bg-linear-to-tr from-slate-800 to-slate-900 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer animate-pulse"
                  title="Nhấn để dừng thu âm"
                >
                  <MicOff className="w-8 h-8 text-rose-400" />
                </button>
              )}

              <div className="text-center">
                <div className="text-xs font-bold text-slate-800">
                  {isRecording ? 'Đang ghi âm bài nói của bạn' : 'Bấm vào Micro để bắt đầu thu âm'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {isRecording
                    ? 'Hãy nói to rõ ràng, trình bày theo dàn ý A.R.E.A'
                    : 'Hệ thống sử dụng Micro trình duyệt để bạn tự nghe lại và đánh giá độ trôi chảy'}
                </div>
              </div>
            </div>

            {/* Playback Box if recorded */}
            {recordedAudioUrl && (
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-950">
                      Bản Thu Âm Của Bạn ({formatTimer(recordedDuration)})
                    </span>
                  </div>
                  <a
                    href={recordedAudioUrl}
                    download={`ielts-speaking-${activeCard.topic.toLowerCase().replace(/\s+/g, '-')}.webm`}
                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs"
                  >
                    <Download className="w-3 h-3" />
                    <span>Tải file ghi âm</span>
                  </a>
                </div>

                <audio src={recordedAudioUrl} controls className="w-full h-10 rounded-lg" />
              </div>
            )}
          </div>

          {/* Model Answer Band 8.5+ with Audio Pronunciation */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Bài Nói Mẫu Band 8.5+ Chuẩn Bản Xứ
                </h4>
              </div>
              <button
                onClick={() => speakText(activeCard.modelAnswer, voiceLangCode)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe Phát Âm Mẫu</span>
              </button>
            </div>

            <div className="p-4 bg-emerald-50/30 rounded-xl border border-emerald-100 text-xs sm:text-sm leading-relaxed text-slate-800 font-sans whitespace-pre-line">
              {activeCard.modelAnswer}
            </div>

            {/* Idiomatic Expressions Bank */}
            {activeCard.idiomaticExpressions && (
              <div className="pt-2 space-y-2">
                <div className="text-xs font-bold text-slate-800">
                  Cụm Từ Idiomatic & Collocation Band 8.5+ Nên Học Thuộc:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeCard.idiomaticExpressions.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                      <div className="font-bold text-emerald-950">{item.phrase}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">{item.meaning}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
      )}
    </div>
  );
};
