import React, { useState, useEffect } from 'react';
import {
  Lock,
  Shield,
  Crown,
  CheckCircle2,
  BookOpen,
  Send,
  X,
  LogIn,
  UserPlus,
  Sparkles,
  Clock,
  ArrowRight,
  Check,
} from 'lucide-react';
import {
  GatedModuleTab,
  ALL_GATED_TABS,
  MODULE_PERMISSION_REGISTRY,
  MASTER_ADMIN_EMAIL,
  AccessRequestStatus,
} from '../utils/accessControlLogic';

interface AccessGateModalProps {
  isOpen: boolean;
  lockedTab: GatedModuleTab | null;
  onClose: () => void;
  onBackToRoadmap: () => void;
  currentUserEmail: string | null;
  currentUserDisplayName: string;
  accessRequestStatus: AccessRequestStatus;
  unlockedTabs: GatedModuleTab[];
  onSubmitAccessRequest: (requestedTabs: GatedModuleTab[], note: string) => void;
  onOpenAuthModal: (defaultMode: 'login' | 'register') => void;
  onSwitchToOwnerAdmin: () => void;
}

export const AccessGateModal: React.FC<AccessGateModalProps> = ({
  isOpen,
  lockedTab,
  onClose,
  onBackToRoadmap,
  currentUserEmail,
  currentUserDisplayName,
  accessRequestStatus,
  unlockedTabs,
  onSubmitAccessRequest,
  onOpenAuthModal,
  onSwitchToOwnerAdmin,
}) => {
  const [selectedTabs, setSelectedTabs] = useState<GatedModuleTab[]>(ALL_GATED_TABS);
  const [requestNote, setRequestNote] = useState<string>(
    'Chào Admin daigia170904@gmail.com, mình đã đăng ký tài khoản học viên và mong được Admin cấp phép mở khóa các hạng mục nâng cao để luyện tập!'
  );
  const [justSubmitted, setJustSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setJustSubmitted(false);
      if (lockedTab) {
        setSelectedTabs((prev) =>
          prev.includes(lockedTab) ? prev : [lockedTab, ...prev]
        );
      } else {
        setSelectedTabs([...ALL_GATED_TABS]);
      }
    }
  }, [isOpen, lockedTab]);

  if (!isOpen) return null;

  const targetMeta = lockedTab
    ? MODULE_PERMISSION_REGISTRY[lockedTab]
    : MODULE_PERMISSION_REGISTRY.video;

  const toggleTabChoice = (tab: GatedModuleTab) => {
    setSelectedTabs((prev) =>
      prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
    );
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tabsToRequest = selectedTabs.length > 0 ? selectedTabs : [...ALL_GATED_TABS];
    onSubmitAccessRequest(tabsToRequest, requestNote);
    setJustSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="access-gate-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Locked Banner */}
        <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-5 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 shrink-0 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  Yêu cầu Admin cấp phép
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-200">
                  Tài khoản hiện tại: User (Chỉ mở mục Lộ trình)
                </span>
              </div>
              <h2 id="access-gate-title" className="text-lg sm:text-xl font-bold mt-1.5">
                Hạng mục &ldquo;{targetMeta.shortTitle}&rdquo; đang bị khóa
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Chỉ riêng tài khoản Quản trị viên tối cao (<strong className="text-amber-300">{MASTER_ADMIN_EMAIL}</strong>) mới có quyền cấp phép mở khóa hạng mục này cho tài khoản User.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Đóng thông báo cấp phép"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Status Explanation Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-white border border-emerald-200">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Quyền Mặc Định Của User</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Tất cả người dùng đăng ký hoặc khách truy cập mặc định là <strong>User</strong> và được học tại mục <strong>Lộ trình (A1 → C2)</strong> của cả 7 ngôn ngữ.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>Quyền Khi Được Admin Cấp Phép</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Khi được Admin (<strong>{MASTER_ADMIN_EMAIL}</strong>) phê duyệt, bạn mới có quyền truy cập <strong>Video AI, Phòng Lab AI, Luyện thi, Hội thoại AI, Ngữ pháp, Từ vựng, Văn hóa & Cộng đồng</strong>.
              </p>
            </div>
          </div>

          {/* If not logged in / registered yet */}
          {!currentUserEmail && (
            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-indigo-950">
                  Bạn đang xem với tư cách Khách / User chưa đăng nhập
                </h3>
                <p className="text-xs text-indigo-800 mt-0.5">
                  Hãy đăng ký tài khoản hoặc đăng nhập để gửi yêu cầu xin Admin <strong>{MASTER_ADMIN_EMAIL}</strong> cấp phép!
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuthModal('register');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Đăng ký ngay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAuthModal('login');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Đăng nhập</span>
                </button>
              </div>
            </div>
          )}

          {/* Request Approval Form */}
          {justSubmitted || accessRequestStatus === 'pending' ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-950 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-600 text-white">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold">
                    Đã gửi yêu cầu xin cấp phép tới Admin ({MASTER_ADMIN_EMAIL})!
                  </h3>
                  <p className="text-xs text-emerald-800 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      Trạng thái hồ sơ của <strong>{currentUserDisplayName}</strong> ({currentUserEmail || 'user@linguaflow.app'}): <strong>Đang chờ Admin phê duyệt</strong>
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                Ngay khi Admin (<strong>{MASTER_ADMIN_EMAIL}</strong>) nhấn nút <strong>&ldquo;Cấp phép&rdquo;</strong> trong Trung tâm Quản trị, các hạng mục bạn yêu cầu sẽ tự động mở khóa tức thì! Trong lúc chờ đợi, bạn có thể tiếp tục học tại mục <strong>Lộ trình</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Chọn các hạng mục bạn muốn xin Admin mở khóa:
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedTabs(
                        selectedTabs.length === ALL_GATED_TABS.length ? [lockedTab || 'video'] : [...ALL_GATED_TABS]
                      )
                    }
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    {selectedTabs.length === ALL_GATED_TABS.length ? 'Chỉ chọn mục hiện tại' : 'Chọn tất cả 8 hạng mục'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ALL_GATED_TABS.map((tabKey) => {
                    const meta = MODULE_PERMISSION_REGISTRY[tabKey];
                    const isChecked = selectedTabs.includes(tabKey);
                    const isAlreadyUnlocked = unlockedTabs.includes(tabKey);
                    return (
                      <button
                        key={tabKey}
                        type="button"
                        onClick={() => toggleTabChoice(tabKey)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                          isAlreadyUnlocked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : isChecked
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-1 ring-indigo-600'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{meta.shortTitle}</div>
                          <div className="text-[10px] opacity-75 truncate">
                            {isAlreadyUnlocked ? 'Đã mở khóa' : isChecked ? 'Xin cấp phép' : 'Đang khóa'}
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-indigo-600 text-white' : 'border border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="access-request-note" className="block text-xs font-bold text-slate-800 mb-1.5">
                  Lời nhắn gửi tới Admin ({MASTER_ADMIN_EMAIL}):
                </label>
                <textarea
                  id="access-request-note"
                  rows={2}
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  placeholder="Nhập lý do xin cấp phép truy cập..."
                  className="w-full px-3.5 py-2.5 text-xs font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Yêu Cầu Xin Admin ({MASTER_ADMIN_EMAIL}) Cấp Phép Mở Khóa</span>
              </button>
            </form>
          )}

          {/* Owner Quick Admin Switch Card */}
          <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
                <Shield className="w-4 h-4 text-amber-600" />
                <span>Bạn là Chủ sở hữu ({MASTER_ADMIN_EMAIL})?</span>
              </div>
              <p className="text-[11px] text-amber-900">
                Nhấn vào đây để đăng nhập quyền <strong>Admin Tối Cao ({MASTER_ADMIN_EMAIL})</strong> và phê duyệt mở khóa cho các User.
              </p>
            </div>
            <button
              type="button"
              onClick={onSwitchToOwnerAdmin}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shrink-0 cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Vào quyền Admin ({MASTER_ADMIN_EMAIL})</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onBackToRoadmap();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Quay về học mục Lộ trình (Đang mở)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
