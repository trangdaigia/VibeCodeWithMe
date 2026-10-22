import React, { useState } from 'react';
import { Play, Check, BookOpen, ArrowRight, MessageSquare, Compass, GraduationCap, Briefcase, Coffee } from 'lucide-react';
import { LanguageCourse, Unit, Lesson, LearningTrack } from '../data/curriculum';

interface PathViewProps {
  course: LanguageCourse;
  completedLessonIds: string[];
  onStartLesson: (lesson: Lesson) => void;
  onNavigateToTab: (tab: 'academic' | 'roleplay' | 'grammar' | 'vault' | 'culture') => void;
  streak: number;
  xp: number;
}

export const PathView: React.FC<PathViewProps> = ({
  course,
  completedLessonIds,
  onStartLesson,
  onNavigateToTab,
  streak,
  xp,
}) => {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('all');

  const totalLessons = course.units.reduce((acc, u) => acc + u.lessons.length, 0);
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const filteredUnits = course.units.filter(unit => {
    if (selectedTrackFilter === 'all') return true;
    return unit.track === selectedTrackFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Overview Banner */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Zero-Pill unboxed metadata */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-indigo-600 font-semibold">{course.vietnameseName}</span>
              <span aria-hidden="true">·</span>
              <span>{course.scriptType}</span>
              <span aria-hidden="true">·</span>
              <span>Từ cơ bản đến chuyên sâu & Phỏng vấn</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              Chinh Phục {course.vietnameseName} Toàn Diện Dành Cho Người Việt
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              Lộ trình chuyên biệt từ giao tiếp đời sống hàng ngày, tiếng nước ngoài phục vụ đi làm & phỏng vấn xin việc, đến ôn luyện các chứng chỉ quốc tế uy tín.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
              <div>
                <span className="font-bold text-slate-900 tabular-nums">{completedCount}</span> / {totalLessons} Bài đã hoàn thành
              </div>
              <span aria-hidden="true" className="text-slate-300">|</span>
              <div>
                <span className="font-bold text-slate-900 tabular-nums">{course.vocabCards.length}</span> Từ vựng cốt lõi
              </div>
              <span aria-hidden="true" className="text-slate-300">|</span>
              <div>
                <span className="font-bold text-slate-900 tabular-nums">{course.scenarios.length}</span> Tình huống nhập vai AI
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-72 shrink-0">
            <button
              onClick={() => onNavigateToTab('academic')}
              className="p-3.5 bg-indigo-50/50 hover:bg-indigo-50 rounded-xl border border-indigo-100 text-left transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Luyện thi chứng chỉ</div>
                  <div className="text-[11px] text-slate-500">{course.examInfo[0]?.examName || 'IELTS / HSK / JLPT'}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 transition-colors" />
            </button>

            <button
              onClick={() => onNavigateToTab('roleplay')}
              className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 text-left transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900">Phỏng vấn xin việc AI</div>
                  <div className="text-[11px] text-slate-500">Mô phỏng HR tuyển dụng</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>Tiến độ toàn khóa</span>
            <span className="font-semibold text-indigo-600 tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Filter by Focus Track */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Các Chặng Học Tập</h2>
          <p className="text-xs text-slate-500">Lựa chọn chuyên đề phù hợp với mục tiêu của bạn</p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setSelectedTrackFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedTrackFilter === 'all'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSelectedTrackFilter('daily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedTrackFilter === 'daily'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Đời sống</span>
          </button>
          <button
            onClick={() => setSelectedTrackFilter('workplace')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedTrackFilter === 'workplace'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Đi làm & Phỏng vấn</span>
          </button>
          <button
            onClick={() => setSelectedTrackFilter('academic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedTrackFilter === 'academic'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Học thuật & Chứng chỉ</span>
          </button>
        </div>
      </div>

      {/* Units & Learning Nodes */}
      <div className="space-y-6">
        {filteredUnits.map((unit: Unit) => (
          <div 
            key={unit.id}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
          >
            {/* Unit Header */}
            <div className="p-5 sm:p-6 bg-slate-50/60 border-b border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
                  <span>Chương {unit.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{unit.track === 'workplace' ? '💼 Công việc & Phỏng vấn' : '☕ Đời sống hàng ngày'}</span>
                  <span aria-hidden="true">·</span>
                  <span>Cấp độ: {unit.cefrLevel}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {unit.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {unit.description}
                </p>
              </div>

              <div className="text-xs font-medium text-slate-500 shrink-0">
                {unit.lessons.length} Bài học
              </div>
            </div>

            {/* Lesson Cards Grid */}
            <div className="divide-y divide-slate-100">
              {unit.lessons.map((lesson: Lesson) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isCompleted 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      }`}>
                        {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : <BookOpen className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{lesson.title}</h4>
                          {isCompleted && (
                            <span className="text-[11px] font-semibold text-emerald-600">Đã hoàn thành</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-0.5">
                          <span>{lesson.durationMinutes} phút</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-indigo-600 font-medium">+{lesson.xpReward} XP</span>
                          <span aria-hidden="true">·</span>
                          <span>{lesson.exercises.length} phần luyện tập thực chiến</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => onStartLesson(lesson)}
                        className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isCompleted ? 'Ôn tập lại' : 'Bắt đầu học'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
