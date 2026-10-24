import React, { useState, useEffect } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Shield,
  Crown,
  Lock,
  Unlock,
  Mail,
  KeyRound,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  Globe,
  BookOpen,
  Cloud,
} from 'lucide-react';
import {
  MASTER_ADMIN_EMAIL,
  validatePublicRegistration,
  isMasterAdminEmail,
} from '../utils/accessControlLogic';
import { UserProfileDoc } from '../firebase';

interface PublicAuthModalProps {
  isOpen: boolean;
  initialTab?: 'login' | 'register';
  onClose: () => void;
  activeAccountEmail: string | null;
  activeAccountName: string;
  isCurrentAccountAdmin: boolean;
  isCurrentAccountApproved: boolean;
  managedUsers: UserProfileDoc[];
  onRegisterPublicUser: (params: {
    displayName: string;
    email: string;
    password: string;
    selectedLanguageId: string;
  }) => Promise<void>;
  onLoginPublicUser: (params: {
    email: string;
    password: string;
  }) => Promise<void>;
  onSignInGoogle: () => Promise<void>;
  onQuickSwitchAccount: (targetEmail: string) => void;
  onLogoutAccount: () => void;
}

export const PublicAuthModal: React.FC<PublicAuthModalProps> = ({
  isOpen,
  initialTab = 'login',
  onClose,
  activeAccountEmail,
  activeAccountName,
  isCurrentAccountAdmin,
  isCurrentAccountApproved,
  managedUsers,
  onRegisterPublicUser,
  onLoginPublicUser,
  onSignInGoogle,
  onQuickSwitchAccount,
  onLogoutAccount,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialTab);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLang, setRegLang] = useState('english');

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialTab);
      setFormError(null);
      setFormSuccess(null);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    const cleanEmail = loginEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setFormError('Vui lòng nhập địa chỉ Email hợp lệ.');
      return;
    }
    if (!loginPassword || loginPassword.length < 4) {
      setFormError('Vui lòng nhập mật khẩu đăng nhập.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onLoginPublicUser({ email: cleanEmail, password: loginPassword });
      setFormSuccess(
        isMasterAdminEmail(cleanEmail)
          ? `Chào mừng Quản trị viên tối cao (${MASTER_ADMIN_EMAIL})! Toàn bộ hạng mục và Trung tâm Cấp phép đã mở.`
          : `Đăng nhập thành công với tài khoản User (${cleanEmail})!`
      );
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const validation = validatePublicRegistration({
      displayName: regName,
      email: regEmail,
      password: regPassword,
      confirmPassword: regConfirmPassword,
    });

    if (!validation.valid) {
      setFormError(validation.error || 'Thông tin đăng ký chưa hợp lệ.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onRegisterPublicUser({
        displayName: regName.trim(),
        email: regEmail.trim().toLowerCase(),
        password: regPassword,
        selectedLanguageId: regLang,
      });
      setFormSuccess(
        `Đăng ký tài khoản thành công! Bạn đang là User (mặc định mở mục Lộ trình). Hãy xin Admin (${MASTER_ADMIN_EMAIL}) cấp phép để mở khóa các mục khác!`
      );
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="public-auth-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-5 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500 text-white">
                Cổng Thành Viên Public LinguaFlow
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Admin duy nhất: {MASTER_ADMIN_EMAIL}
              </span>
            </div>
            <h2 id="public-auth-modal-title" className="text-lg sm:text-xl font-bold mt-1">
              {mode === 'login' ? 'Đăng nhập Tài khoản' : 'Đăng ký Tài khoản Học viên Mới'}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Mọi người dùng mới đăng ký đều là <strong>User</strong> (chỉ học mục <strong>Lộ trình</strong> cho tới khi được Admin <strong>{MASTER_ADMIN_EMAIL}</strong> cấp phép).
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Đóng cửa sổ đăng nhập"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setFormError(null);
            }}
            className={`py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              mode === 'login'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập Tài khoản</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('register');
              setFormError(null);
            }}
            className={`py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              mode === 'register'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Đăng ký Tài khoản Mới (User)</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {formError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {formSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="public-login-email" className="block text-xs font-bold text-slate-700 mb-1">
                  Địa chỉ Email đăng nhập
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="public-login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={`Nhập email của bạn (hoặc ${MASTER_ADMIN_EMAIL} nếu là Admin)`}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="public-login-password" className="block text-xs font-bold text-slate-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="public-login-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Nhập mật khẩu..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang xử lý...' : 'Đăng nhập bằng Email'}</span>
                </button>

                <button
                  type="button"
                  onClick={onSignInGoogle}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Cloud className="w-4 h-4 text-sky-400" />
                  <span>Đăng nhập bằng Google</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Lưu ý phân quyền:</strong> Tài khoản đăng ký mới có vai trò <strong>User</strong> và mặc định chỉ truy cập được mục <strong>Lộ trình</strong>. Sau khi đăng ký, bạn có thể gửi yêu cầu để Admin (<strong>{MASTER_ADMIN_EMAIL}</strong>) cấp phép mở khóa các mục khác.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="public-reg-name" className="block text-xs font-bold text-slate-700 mb-1">
                    Họ và tên hiển thị *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="public-reg-name"
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="VD: Lê Minh Khôi"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="public-reg-email" className="block text-xs font-bold text-slate-700 mb-1">
                    Email đăng ký *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="public-reg-email"
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="VD: minhkhoi@gmail.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label htmlFor="public-reg-password" className="block text-xs font-bold text-slate-700 mb-1">
                    Mật khẩu (&ge; 6 ký tự) *
                  </label>
                  <input
                    id="public-reg-password"
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="public-reg-confirm" className="block text-xs font-bold text-slate-700 mb-1">
                    Xác nhận mật khẩu *
                  </label>
                  <input
                    id="public-reg-confirm"
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="public-reg-lang" className="block text-xs font-bold text-slate-700 mb-1">
                    Ngôn ngữ ưu tiên
                  </label>
                  <select
                    id="public-reg-lang"
                    value={regLang}
                    onChange={(e) => setRegLang(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm font-bold bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="english">🇬🇧 Tiếng Anh</option>
                    <option value="chinese">🇨🇳 Tiếng Trung</option>
                    <option value="japanese">🇯🇵 Tiếng Nhật</option>
                    <option value="korean">🇰🇷 Tiếng Hàn</option>
                    <option value="french">🇫🇷 Tiếng Pháp</option>
                    <option value="german">🇩🇪 Tiếng Đức</option>
                    <option value="spanish">🇪🇸 Tiếng Tây Ban Nha</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang tạo tài khoản...' : 'Hoàn tất Đăng ký Tài khoản User'}</span>
              </button>
            </form>
          )}

          {/* Fast Demo / Role Switcher Section for Testing Public User vs Owner Admin */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Chuyển nhanh tài khoản để kiểm tra phân quyền (1-Click):
              </span>
              <span className="text-[11px] text-slate-500">
                Đang dùng: <strong className="text-indigo-700">{activeAccountName}</strong> ({activeAccountEmail || 'Khách'})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1. Master Admin Account */}
              <button
                type="button"
                onClick={() => {
                  onQuickSwitchAccount(MASTER_ADMIN_EMAIL);
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isCurrentAccountAdmin
                    ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400'
                    : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Admin Duy Nhất
                  </span>
                  {isCurrentAccountAdmin && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1.5 truncate">
                  {MASTER_ADMIN_EMAIL}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Toàn quyền mở mọi tab + Duyệt cấp phép cho các User
                </div>
              </button>

              {/* 2. Unapproved Standard User (Roadmap Only) */}
              <button
                type="button"
                onClick={() => {
                  onQuickSwitchAccount('thuha.tran2004@gmail.com');
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  !isCurrentAccountAdmin && !isCurrentAccountApproved
                    ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[10px] font-black uppercase flex items-center gap-1">
                    <Lock className="w-3 h-3" /> User (Chưa cấp phép)
                  </span>
                  {!isCurrentAccountAdmin && !isCurrentAccountApproved && (
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1.5 truncate">
                  thuha.tran2004@gmail.com
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Chỉ mở mục <strong>Lộ trình</strong>, các mục khác bị khóa 🔒
                </div>
              </button>

              {/* 3. Approved User */}
              <button
                type="button"
                onClick={() => {
                  onQuickSwitchAccount('hoangnam.nguyen@gmail.com');
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  !isCurrentAccountAdmin && isCurrentAccountApproved
                    ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase flex items-center gap-1">
                    <Unlock className="w-3 h-3" /> User (Đã cấp phép)
                  </span>
                  {!isCurrentAccountAdmin && isCurrentAccountApproved && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-1.5 truncate">
                  hoangnam.nguyen@gmail.com
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Đã được Admin cấp phép mở khóa các hạng mục
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
