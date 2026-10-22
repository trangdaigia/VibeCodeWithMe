import React from 'react';
import { X, Check, Globe } from 'lucide-react';
import { LANGUAGE_COURSES, LanguageCourse } from '../data/curriculum';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguageId: string;
  onSelectLanguage: (id: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isOpen,
  onClose,
  selectedLanguageId,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-label="Chọn ngôn ngữ muốn học"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Chọn Ngôn Ngữ Học Tập</h2>
              <p className="text-xs text-slate-500">Từ cơ bản đến nâng cao: đời sống, công việc, phỏng vấn và luyện thi chứng chỉ</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng bảng chọn ngôn ngữ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 max-h-[60vh] overflow-y-auto pr-1">
          {Object.values(LANGUAGE_COURSES).map((course: LanguageCourse) => {
            const isSelected = course.id === selectedLanguageId;
            const primaryExam = course.examInfo[0]?.examName.split(' ')[0] || 'Chứng chỉ';

            return (
              <button
                key={course.id}
                onClick={() => {
                  onSelectLanguage(course.id);
                  onClose();
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-1 ring-indigo-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{course.flagEmoji}</span>
                  <div>
                    <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{course.vietnameseName}</span>
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      {course.id === 'chinese' ? '中文 (Zhōngwén · Mandarin)'
                        : course.id === 'japanese' ? '日本語 (Nihongo)'
                        : course.id === 'korean' ? '한국어 (Hangugeo)'
                        : course.id === 'french' ? 'Français (French)'
                        : course.id === 'german' ? 'Deutsch (German)'
                        : course.id === 'spanish' ? 'Español (Spanish)'
                        : course.nativeName}
                    </div>
                    <div className="text-[11px] text-indigo-600 font-medium mt-0.5">
                      Thi chứng chỉ: {primaryExam}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>7 Ngôn ngữ phổ biến chuẩn quốc tế</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Xong
          </button>
        </div>
      </div>
    </div>
  );
};
