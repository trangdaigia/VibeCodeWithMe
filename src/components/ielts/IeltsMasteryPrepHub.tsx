import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  AlertCircle,
  Volume2,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowRight,
  Check,
  ShieldAlert,
  Layers,
  Award,
  Copy,
  RotateCcw,
} from 'lucide-react';
import {
  CAMBRIDGE_PARAPHRASE_DRILLS,
  SENTENCE_UPGRADE_DRILLS,
  IELTS_STUDY_ROADMAP,
  ParaphraseDrillItem,
} from '../../utils/ieltsMasteryEngine';
import { speakText } from '../../utils/speech';

interface IeltsMasteryPrepHubProps {
  onGainXp: (amount: number) => void;
  onNavigateSubTab: (subTab: string) => void;
  onOpenFullSimulator: () => void;
}

export const IeltsMasteryPrepHub: React.FC<IeltsMasteryPrepHubProps> = ({
  onGainXp,
  onNavigateSubTab,
  onOpenFullSimulator,
}) => {
  const [selectedBandTarget, setSelectedBandTarget] = useState<'all' | '6.5' | '7.5' | '8.5+'>('all');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    'rm-65-1-0': true,
  });

  // Paraphrase & Trap Arena state
  const [selectedDrillAnswers, setSelectedDrillAnswers] = useState<Record<string, string>>({});
  const [submittedDrills, setSubmittedDrills] = useState<Record<string, boolean>>({});
  const [drillFilter, setDrillFilter] = useState<'all' | 'reading' | 'listening'>('all');

  // Sentence Upgrader state
  const [revealedUpgrades, setRevealedUpgrades] = useState<Record<string, boolean>>({
    'upg-1': true,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive TFNG Quick Checker state
  const [tfngPassage] = useState(
    'Although commercial supersonic aviation was halted in 2003 due to excessive sonic boom noise and fuel consumption, aerospace engineers are now testing low-boom laminar airframes powered by sustainable aviation fuel (SAF).'
  );
  const [tfngChecks, setTfngChecks] = useState<Record<number, string>>({});

  const tfngStatements = [
    {
      id: 1,
      statement: 'Supersonic passenger flights were discontinued in 2003 solely because of high ticket prices.',
      correct: 'FALSE',
      reason:
        'Bài đọc nêu nguyên nhân dừng bay là tiếng nổ siêu thanh (sonic boom) và tiêu thụ nhiên liệu, trái ngược với "solely because of high ticket prices".',
    },
    {
      id: 2,
      statement: 'Engineers are developing new aircraft designs aimed at reducing sonic boom intensity.',
      correct: 'TRUE',
      reason:
        'Khớp hoàn toàn với cụm "testing low-boom laminar airframes" (thử nghiệm khung máy bay giảm tiếng nổ siêu thanh).',
    },
    {
      id: 3,
      statement: 'Commercial supersonic flights will resume regular transatlantic service before 2028.',
      correct: 'NOT GIVEN',
      reason:
        'Bài đọc chỉ nói đang thử nghiệm (now testing), hoàn toàn không đề cập mốc năm 2028 hay tuyến bay xuyên Đại Tây Dương.',
    },
  ];

  const handleToggleChecklistTask = (key: string) => {
    const nextState = !completedTasks[key];
    setCompletedTasks((prev) => ({ ...prev, [key]: nextState }));
    if (nextState) {
      onGainXp(15);
    }
  };

  const handleSelectDrillOption = (drillId: string, option: string) => {
    if (submittedDrills[drillId]) return;
    setSelectedDrillAnswers((prev) => ({ ...prev, [drillId]: option }));
  };

  const handleSubmitDrill = (drill: ParaphraseDrillItem) => {
    if (!selectedDrillAnswers[drill.id] || submittedDrills[drill.id]) return;
    setSubmittedDrills((prev) => ({ ...prev, [drill.id]: true }));
    if (selectedDrillAnswers[drill.id] === drill.correctOption) {
      onGainXp(25);
    }
  };

  const handleCopySentence = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    onGainXp(5);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDrills = CAMBRIDGE_PARAPHRASE_DRILLS.filter((d) =>
    drillFilter === 'all' ? true : d.skill === drillFilter
  );

  const filteredRoadmaps = IELTS_STUDY_ROADMAP.filter((r) =>
    selectedBandTarget === 'all' ? true : r.targetBand === selectedBandTarget
  );

  const totalCompletedDrills = Object.keys(submittedDrills).filter(
    (id) =>
      CAMBRIDGE_PARAPHRASE_DRILLS.find((d) => d.id === id)?.correctOption ===
      selectedDrillAnswers[id]
  ).length;

  return (
    <div className="space-y-8" data-testid="ielts-mastery-prep-hub">
      {/* 1. HERO OVERVIEW & QUICK STRATEGY BAR */}
      <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <span>Trung Tâm Ôn Luyện IELTS Chuyên Sâu</span>
              <span aria-hidden="true">·</span>
              <span>Cambridge 17–19 &amp; IDP Official Methodology</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Hệ Thống Rèn Luyện Kỹ Năng, Phản Xạ Paraphrase &amp; Giải Phẫu Bẫy Đề Thi IELTS
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Được thiết kế dành riêng cho học viên muốn bứt phá từ Band 6.0 lên 8.0+: Kết hợp lộ trình ôn tập theo mục tiêu, luyện bắt bẫy Paraphrase thực tế từ Cambridge, chuyên đề phân biệt FALSE / NOT GIVEN và nâng cấp câu C1/C2.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenFullSimulator}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Vào Phòng Thi Thật 80 Câu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigateSubTab('writing-lab')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <PenTool className="w-4 h-4 text-indigo-400" />
              <span>Chấm Viết 4 Tiêu Chí</span>
            </button>
          </div>
        </div>

        {/* 4 Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs text-slate-400">Ngân hàng Bẫy Cambridge</div>
            <div className="text-lg font-bold text-white mt-0.5 tabular-nums">
              {CAMBRIDGE_PARAPHRASE_DRILLS.length} Chuyên đề bẫy
            </div>
            <div className="text-[11px] text-emerald-400 mt-0.5 tabular-nums">
              Đã giải đúng: {totalCompletedDrills}/{CAMBRIDGE_PARAPHRASE_DRILLS.length}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs text-slate-400">Tiêu chuẩn Chấm Writing</div>
            <div className="text-lg font-bold text-white mt-0.5 tabular-nums">4 Tiêu Chí</div>
            <div className="text-[11px] text-indigo-300 mt-0.5">TA · CC · LR · GRA</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs text-slate-400">Biến Đổi Câu C1/C2</div>
            <div className="text-lg font-bold text-white mt-0.5 tabular-nums">
              Band 6.0 → 8.5+
            </div>
            <div className="text-[11px] text-amber-300 mt-0.5">Đảo ngữ &amp; Danh từ hóa</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="text-xs text-slate-400">Phân Biệt Dạng Khó</div>
            <div className="text-lg font-bold text-white mt-0.5">FALSE vs NOT GIVEN</div>
            <div className="text-[11px] text-sky-300 mt-0.5">Thực hành tương tác trực tiếp</div>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE STUDY ROADMAP BY TARGET BAND */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>1. Lộ Trình Ôn Luyện IELTS Theo Band Mục Tiêu (Interactive Checklist)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Đánh dấu từng nhiệm vụ hoàn thành mỗi ngày để nhận +15 XP và đi thẳng tới phòng luyện kỹ năng tương ứng
            </p>
          </div>

          {/* Band Filter Segmented Control */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
            {(['all', '6.5', '7.5', '8.5+'] as const).map((band) => (
              <button
                key={band}
                type="button"
                onClick={() => setSelectedBandTarget(band)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedBandTarget === band
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {band === 'all' ? 'Tất cả chặng' : `Mục tiêu Band ${band}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {filteredRoadmaps.map((milestone) => (
            <div
              key={milestone.id}
              className="rounded-2xl border border-slate-200 p-5 flex flex-col justify-between bg-slate-50/50 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-indigo-700">{milestone.phase}</span>
                  <span className="font-mono tabular-nums">
                    Band {milestone.targetBand} · {milestone.dailyMinutes} phút/ngày
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {milestone.title}
                </h4>

                <div className="space-y-2 pt-1">
                  {milestone.tasks.map((taskText, tIdx) => {
                    const taskKey = `${milestone.id}-${tIdx}`;
                    const isChecked = !!completedTasks[taskKey];
                    return (
                      <button
                        key={taskKey}
                        type="button"
                        onClick={() => handleToggleChecklistTask(taskKey)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-white border-slate-200/90 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 border ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className={isChecked ? 'line-through text-slate-500' : 'leading-relaxed'}>
                          {taskText}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Hoàn thành:{' '}
                  <strong className="text-slate-800 tabular-nums">
                    {milestone.tasks.filter((_, i) => completedTasks[`${milestone.id}-${i}`]).length}/
                    {milestone.tasks.length}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateSubTab(milestone.recommendedTab)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Thực hành ngay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CAMBRIDGE PARAPHRASE & DISTRACTOR TRAP ARENA */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>2. Phòng Luyện Bắt Bẫy Paraphrase &amp; Distractor Chuẩn Cambridge</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              80% điểm số Reading &amp; Listening phụ thuộc vào khả năng nhận diện cụm từ đồng nghĩa (Paraphrase) và né bẫy tự đính chính
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setDrillFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                drillFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Tất cả ({CAMBRIDGE_PARAPHRASE_DRILLS.length})
            </button>
            <button
              type="button"
              onClick={() => setDrillFilter('reading')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                drillFilter === 'reading' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Reading Traps
            </button>
            <button
              type="button"
              onClick={() => setDrillFilter('listening')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                drillFilter === 'listening' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Listening Traps
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredDrills.map((drill, idx) => {
            const chosen = selectedDrillAnswers[drill.id];
            const isDone = !!submittedDrills[drill.id];
            const isCorrect = chosen === drill.correctOption;

            return (
              <div
                key={drill.id}
                className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-white"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-900">Tình huống #{idx + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span>{drill.source}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-amber-700">Loại bẫy: {drill.trapType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-indigo-600 font-semibold">{drill.bandLevel}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => speakText(drill.originalInPassageOrAudio, 'en-GB')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Nghe trích đoạn gốc</span>
                  </button>
                </div>

                {/* Comparison Grid: Original Passage/Audio vs Question */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-500 flex items-center gap-1.5">
                      {drill.skill === 'listening' ? (
                        <Headphones className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      <span>
                        {drill.skill === 'listening'
                          ? 'Lời thoại trong băng nghe (Audio Script):'
                          : 'Câu gốc trong bài đọc (Original Passage):'}
                      </span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-serif italic">
                      "{drill.originalInPassageOrAudio}"
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs space-y-1">
                    <div className="font-bold text-indigo-800">
                      Câu hỏi / Mệnh đề trong đề thi (Exam Statement):
                    </div>
                    <p className="text-slate-900 font-semibold leading-relaxed">
                      "{drill.paraphrasedInQuestion}"
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {drill.options.map((opt, oIdx) => {
                    const isSelected = chosen === opt;
                    let styleClass =
                      'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                    if (isSelected) {
                      styleClass =
                        'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold';
                    }
                    if (isDone) {
                      if (opt === drill.correctOption) {
                        styleClass =
                          'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        styleClass = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectDrillOption(drill.id, opt)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${styleClass}`}
                      >
                        <span>{opt}</span>
                        {isDone && opt === drill.correctOption && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!isDone && chosen && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSubmitDrill(drill)}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Kiểm tra &amp; Xem giải phẫu bẫy (+25 XP)
                    </button>
                  </div>
                )}

                {isDone && (
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      )}
                      <span>
                        {isCorrect
                          ? 'Chính xác! Bạn đã bắt trúng bẫy Cambridge (+25 XP):'
                          : 'Phân tích bẫy để ghi nhớ:'}
                      </span>
                    </div>
                    <p className="leading-relaxed">{drill.vietnameseExplanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. INTERACTIVE TRUE / FALSE / NOT GIVEN LABORATORY */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>3. Chuyên Đề Thực Hành: Tuyệt Chiêu Phân Biệt TRUE / FALSE / NOT GIVEN</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Đọc đoạn trích ngắn bên dưới và định danh chính xác cả 3 mệnh đề để nắm vững ranh giới giữa FALSE (Ngược dữ kiện) và NOT GIVEN (Không đề cập)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setTfngChecks({})}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm font-serif leading-relaxed">
          <span className="text-[11px] font-sans font-bold text-emerald-400 uppercase block mb-1">
            Reading Mini-Passage:
          </span>
          "{tfngPassage}"
        </div>

        <div className="space-y-3">
          {tfngStatements.map((item) => {
            const userAns = tfngChecks[item.id];
            const isCorrect = userAns === item.correct;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    {item.id}. {item.statement}
                  </p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {(['TRUE', 'FALSE', 'NOT GIVEN'] as const).map((choice) => {
                      const active = userAns === choice;
                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => {
                            setTfngChecks((prev) => ({ ...prev, [item.id]: choice }));
                            if (choice === item.correct && !tfngChecks[item.id]) {
                              onGainXp(10);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            active
                              ? choice === item.correct
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-rose-600 text-white border-rose-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {userAns && (
                  <div
                    className={`p-3 rounded-lg text-xs ${
                      isCorrect
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                        : 'bg-rose-50 border border-rose-200 text-rose-950'
                    }`}
                  >
                    <strong>
                      {isCorrect
                        ? `Chính xác (${item.correct}): `
                        : `Chưa đúng — Đáp án chuẩn là ${item.correct}: `}
                    </strong>
                    <span>{item.reason}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. BAND 6.0 -> BAND 8.5+ SENTENCE TRANSFORMATION STUDIO */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <div className="pb-4 border-b border-slate-100">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-indigo-600" />
            <span>4. Phòng Nâng Cấp Câu: Từ Band 6.0 Lên Band 8.5+ (Lexical &amp; Grammatical Upgrade)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            So sánh trực tiếp cách giám khảo biến một câu văn trung bình (Band 6.0) thành câu học thuật C2 (Band 8.5+) cho Writing &amp; Speaking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {SENTENCE_UPGRADE_DRILLS.map((item) => {
            const isRevealed = !!revealedUpgrades[item.id];
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 p-5 flex flex-col justify-between space-y-4 bg-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-indigo-600">{item.topic}</span>
                    <button
                      type="button"
                      onClick={() => speakText(item.band85Sentence, 'en-GB')}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
                      title="Nghe câu mẫu Band 8.5+"
                    >
                      <Volume2 className="w-4 h-4 text-indigo-600" />
                    </button>
                  </div>

                  {/* Band 6.0 Box */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 block">
                      Câu Band 6.0 (Từ vựng phổ thông):
                    </span>
                    <p className="text-slate-700 leading-relaxed">"{item.band6Sentence}"</p>
                  </div>

                  {/* Band 8.5+ Box */}
                  {isRevealed ? (
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-800">
                          Câu Band 8.5+ (Chuẩn học thuật C2):
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopySentence(item.id, item.band85Sentence)}
                          className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Sao chép</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-slate-900 font-semibold leading-relaxed font-serif">
                        "{item.band85Sentence}"
                      </p>
                      <div className="pt-2 border-t border-emerald-200/70 space-y-1 text-[11px] text-slate-700">
                        <div className="font-bold text-emerald-900">
                          Ngữ pháp: {item.grammarStructureUsed}
                        </div>
                        {item.keyUpgrades.map((u, i) => (
                          <div key={i} className="font-mono text-[10px] text-slate-600">
                            • {u}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setRevealedUpgrades((prev) => ({ ...prev, [item.id]: true }));
                        onGainXp(10);
                      }}
                      className="w-full py-6 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/40 hover:bg-indigo-50 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Nhấn để mở khóa Bản Nâng Cấp Band 8.5+ (+10 XP)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
