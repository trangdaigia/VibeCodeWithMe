import React, { useState } from 'react';
import {
  Crown,
  Shield,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  UserPlus,
  Users,
  BookOpen,
  Sparkles,
  Check,
  Trash2,
  Eye,
  Bell,
} from 'lucide-react';
import { UserProfileDoc } from '../firebase';
import {
  MASTER_ADMIN_EMAIL,
  ALL_GATED_TABS,
  GatedModuleTab,
  MODULE_PERMISSION_REGISTRY,
  isMasterAdminEmail,
  getUnlockedGatedTabs,
  decodePermissionsFromUserDoc,
} from '../utils/accessControlLogic';

interface AdminPermissionCenterViewProps {
  currentAdminEmail: string | null;
  managedUsers: UserProfileDoc[];
  onApproveUserFullAccess: (targetUid: string) => void;
  onRevokeUserToRoadmapOnly: (targetUid: string) => void;
  onToggleUserTabPermission: (targetUid: string, tabId: GatedModuleTab) => void;
  onCreateNewUserByAdmin: (params: {
    email: string;
    displayName: string;
    grantFullAccessInitially: boolean;
  }) => Promise<void>;
  onDeleteUserByAdmin: (targetUid: string) => void;
  onPreviewAsUser: (email: string) => void;
}

export const AdminPermissionCenterView: React.FC<AdminPermissionCenterViewProps> = ({
  currentAdminEmail,
  managedUsers,
  onApproveUserFullAccess,
  onRevokeUserToRoadmapOnly,
  onToggleUserTabPermission,
  onCreateNewUserByAdmin,
  onDeleteUserByAdmin,
  onPreviewAsUser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'restricted'>('all');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newGrantFull, setNewGrantFull] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Enrich users with decoded permission state
  const enrichedUsers = managedUsers.map((u) => {
    const decoded = decodePermissionsFromUserDoc(u);
    const unlockedGated = getUnlockedGatedTabs({
      email: u.email,
      accessApproved: decoded.accessApproved,
      allowedTabs: decoded.allowedTabs,
    });
    const isOwner = isMasterAdminEmail(u.email);
    const hasAnyGatedPermission = isOwner || decoded.accessApproved || unlockedGated.length > 0;
    return {
      ...u,
      isOwner,
      decodedApproved: decoded.accessApproved,
      decodedAllowedTabs: decoded.allowedTabs,
      decodedRequestStatus: u.accessRequestStatus || decoded.accessRequestStatus,
      unlockedGated,
      hasAnyGatedPermission,
    };
  });

  const standardUsers = enrichedUsers.filter((u) => !u.isOwner);
  const pendingUsers = standardUsers.filter((u) => u.decodedRequestStatus === 'pending');
  const approvedUsers = standardUsers.filter((u) => u.hasAnyGatedPermission);
  const restrictedUsers = standardUsers.filter((u) => !u.hasAnyGatedPermission);

  const filteredUsers = enrichedUsers.filter((u) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      u.displayName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (statusFilter === 'pending') return !u.isOwner && u.decodedRequestStatus === 'pending';
    if (statusFilter === 'approved') return !u.isOwner && u.hasAnyGatedPermission;
    if (statusFilter === 'restricted') return !u.isOwner && !u.hasAnyGatedPermission;
    return true;
  });

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;
    if (isMasterAdminEmail(cleanEmail)) {
      triggerToast(`Email ${MASTER_ADMIN_EMAIL} đã là tài khoản Quản trị viên tối cao duy nhất!`);
      return;
    }
    const cleanName = newName.trim() || cleanEmail.split('@')[0];
    await onCreateNewUserByAdmin({
      email: cleanEmail,
      displayName: cleanName,
      grantFullAccessInitially: newGrantFull,
    });
    setNewEmail('');
    setNewName('');
    triggerToast(
      newGrantFull
        ? `Đã thêm User "${cleanName}" (${cleanEmail}) và cấp phép mở khóa toàn bộ hạng mục!`
        : `Đã thêm User "${cleanName}" (${cleanEmail}) ở chế độ mặc định (Chỉ học mục Lộ trình).`
    );
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Master Admin Command Banner */}
      <section className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-xs">
                <Crown className="w-3.5 h-3.5" /> Quyền Admin Duy Nhất ({MASTER_ADMIN_EMAIL})
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Shield className="w-3.5 h-3.5" /> Kiểm soát truy cập toàn hệ thống Public
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Trung Tâm Quản Trị &amp; Cấp Phép Truy Cập Người Dùng
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Chỉ riêng tài khoản của bạn (<strong className="text-amber-300">{MASTER_ADMIN_EMAIL}</strong>) có quyền <strong>Admin</strong>. Tất cả tài khoản khác đăng ký trên website đều là <strong>User</strong> và mặc định <strong>chỉ được ở mục Lộ trình</strong> cho đến khi được bạn cấp phép mở khóa các hạng mục khác.
            </p>
          </div>

          {/* Live Summary Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] font-bold text-slate-300 uppercase">Tổng số User</div>
              <div className="text-2xl font-black text-white mt-0.5 tabular-nums">{standardUsers.length}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-center">
              <div className="text-[11px] font-bold text-amber-300 uppercase">Chờ duyệt</div>
              <div className="text-2xl font-black text-amber-300 mt-0.5 tabular-nums">{pendingUsers.length}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-center">
              <div className="text-[11px] font-bold text-emerald-300 uppercase">Đã cấp phép</div>
              <div className="text-2xl font-black text-emerald-300 mt-0.5 tabular-nums">{approvedUsers.length}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-center">
              <div className="text-[11px] font-bold text-rose-300 uppercase">Chỉ Lộ trình 🔒</div>
              <div className="text-2xl font-black text-rose-200 mt-0.5 tabular-nums">{restrictedUsers.length}</div>
            </div>
          </div>
        </div>
      </section>

      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-sm animate-in fade-in duration-150">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Pending Approval Requests Queue */}
      {pendingUsers.length > 0 && (
        <section className="rounded-3xl border-2 border-amber-300 bg-amber-50/70 p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Yêu Cầu Xin Cấp Phép Đang Chờ Bạn Phê Duyệt ({pendingUsers.length})
                </h2>
                <p className="text-xs text-slate-600">
                  Những User dưới đây hiện chỉ xem được mục <strong>Lộ trình</strong> và đang xin bạn mở khóa các hạng mục khác.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {pendingUsers.map((reqUser) => (
              <div
                key={reqUser.uid}
                className="p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{reqUser.displayName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-900">
                        Đang chờ Admin duyệt
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {reqUser.accessRequestedAt || 'Vừa gửi'}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-indigo-700">{reqUser.email}</div>
                  {reqUser.accessRequestNote && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 italic">
                      &ldquo;{reqUser.accessRequestNote}&rdquo;
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onApproveUserFullAccess(reqUser.uid);
                      triggerToast(
                        `Đã cấp phép mở khóa toàn bộ 8 hạng mục cho User ${reqUser.displayName} (${reqUser.email})!`
                      );
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Duyệt Cấp Phép Toàn Bộ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onRevokeUserToRoadmapOnly(reqUser.uid);
                      triggerToast(
                        `Đã từ chối yêu cầu: giữ ${reqUser.displayName} ở chế độ Chỉ học Lộ trình.`
                      );
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-xs font-bold cursor-pointer"
                  >
                    Giữ ở Lộ trình
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Add / Pre-Authorize New User Form */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs">
        <form onSubmit={handleAddUserSubmit} className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Thêm Tài Khoản User Mới &amp; Thiết Lập Quyền Truy Cập Ban Đầu
              </h2>
              <p className="text-xs text-slate-500">
                Mọi tài khoản thêm mới đều có vai trò <strong>User</strong> (chỉ mình <strong>{MASTER_ADMIN_EMAIL}</strong> là Admin).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-4">
              <label htmlFor="admin-add-user-email" className="block text-xs font-bold text-slate-700 mb-1">
                Email của User *
              </label>
              <input
                id="admin-add-user-email"
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="VD: hocvien.vip@gmail.com"
                className="w-full px-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="admin-add-user-name" className="block text-xs font-bold text-slate-700 mb-1">
                Họ tên hiển thị
              </label>
              <input
                id="admin-add-user-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="VD: Phạm Gia Huy"
                className="w-full px-3.5 py-2.5 text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="admin-add-user-perm" className="block text-xs font-bold text-slate-700 mb-1">
                Chế độ cấp phép ban đầu
              </label>
              <select
                id="admin-add-user-perm"
                value={newGrantFull ? 'approved' : 'roadmap_only'}
                onChange={(e) => setNewGrantFull(e.target.value === 'approved')}
                className="w-full px-3 py-2.5 text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="approved">✅ Cấp phép Mở khóa Toàn bộ</option>
                <option value="roadmap_only">🔒 Mặc định (Chỉ mở mục Lộ trình)</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Thêm User</span>
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Granular Permission Matrix Table */}
      <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-black text-slate-900">
              Bảng Điều Khiển Cấp Phép Từng Hạng Mục Cho Mọi Tài Khoản ({filteredUsers.length})
            </h2>
            <p className="text-xs text-slate-500">
              Bấm vào từng hạng mục để <strong>Mở khóa (Xanh)</strong> hoặc <strong>Khóa lại (Xám)</strong> cho từng User cụ thể.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên hoặc email..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {(['all', 'pending', 'approved', 'restricted'] as const).map((fKey) => (
              <button
                key={fKey}
                type="button"
                onClick={() => setStatusFilter(fKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  statusFilter === fKey
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {fKey === 'all'
                  ? `Tất cả (${enrichedUsers.length})`
                  : fKey === 'pending'
                  ? `Chờ duyệt (${pendingUsers.length})`
                  : fKey === 'approved'
                  ? `Đã cấp phép (${approvedUsers.length})`
                  : `Chỉ Lộ trình (${restrictedUsers.length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredUsers.map((member) => {
            const isOwner = member.isOwner;
            const unlockedCount = isOwner ? ALL_GATED_TABS.length : member.unlockedGated.length;

            return (
              <div
                key={member.uid}
                className={`p-5 space-y-4 transition-colors ${
                  isOwner ? 'bg-amber-50/40' : 'hover:bg-slate-50/60'
                }`}
              >
                {/* Top Row: User Info + Master Action Buttons */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                        isOwner
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : member.hasAnyGatedPermission
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-slate-200 text-slate-700 border border-slate-300'
                      }`}
                    >
                      {member.displayName.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-slate-900">
                          {member.displayName}
                        </span>

                        {isOwner ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950 flex items-center gap-1">
                            <Crown className="w-3 h-3" /> ADMIN TỐI CAO DUY NHẤT (BẠN)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-200 text-slate-800">
                            Vai trò: USER
                          </span>
                        )}

                        {!isOwner && (
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                              member.decodedApproved
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : unlockedCount > 0
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}
                          >
                            {member.decodedApproved ? (
                              <>
                                <Unlock className="w-3 h-3" /> Đã cấp phép Toàn bộ (8/8 mục)
                              </>
                            ) : unlockedCount > 0 ? (
                              <>
                                <Unlock className="w-3 h-3" /> Đã cấp phép {unlockedCount}/8 mục nâng cao
                              </>
                            ) : (
                              <>
                                <Lock className="w-3 h-3" /> Chưa cấp phép (Chỉ mở mục Lộ trình)
                              </>
                            )}
                          </span>
                        )}

                        {!isOwner && member.decodedRequestStatus === 'pending' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                            ⚡ Đang gửi yêu cầu xin mở khóa
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2.5">
                        <span className="font-semibold text-slate-700">{member.email}</span>
                        <span>·</span>
                        <span>XP: <strong>{member.xp} XP</strong></span>
                        <span>·</span>
                        <span>Chuỗi: <strong>{member.streak} ngày</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Approval / Revocation Controls */}
                  {!isOwner ? (
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          onApproveUserFullAccess(member.uid);
                          triggerToast(
                            `Đã cấp phép mở khóa Toàn bộ hạng mục cho User ${member.displayName} (${member.email})!`
                          );
                        }}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Cấp phép Toàn bộ</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onRevokeUserToRoadmapOnly(member.uid);
                          triggerToast(
                            `Đã thu hồi quyền của ${member.displayName}: chỉ được truy cập mục Lộ trình!`
                          );
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Thu hồi (Chỉ Lộ trình)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onPreviewAsUser(member.email)}
                        className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                        title="Đóng vai User này để kiểm tra trực tiếp các tab bị khóa / mở"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem dưới góc độ User này</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onDeleteUserByAdmin(member.uid);
                          triggerToast(`Đã xóa tài khoản ${member.email} khỏi hệ thống.`);
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Xóa User này"
                        aria-label={`Xóa tài khoản ${member.displayName}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-amber-800 bg-amber-100/80 border border-amber-300 px-3.5 py-2 rounded-xl">
                      Tài khoản Chủ sở hữu — Toàn quyền vĩnh viễn
                    </div>
                  )}
                </div>

                {/* Bottom Row: Per-Tab Granular Permission Toggles */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">
                    Quyền từng hạng mục:
                  </span>

                  {/* Roadmap is always unlocked */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white">
                    <BookOpen className="w-3 h-3 text-emerald-400" />
                    <span>Lộ trình (Mặc định mở)</span>
                  </span>

                  {/* 8 Gated Modules */}
                  {ALL_GATED_TABS.map((tabKey) => {
                    const meta = MODULE_PERMISSION_REGISTRY[tabKey];
                    const isUnlocked = isOwner || member.unlockedGated.includes(tabKey);
                    return (
                      <button
                        key={tabKey}
                        type="button"
                        disabled={isOwner}
                        onClick={() => {
                          onToggleUserTabPermission(member.uid, tabKey);
                          triggerToast(
                            `${isUnlocked ? 'Đã khóa' : 'Đã cấp phép mở khóa'} mục "${meta.shortTitle}" cho ${member.displayName}!`
                          );
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                          isOwner
                            ? 'bg-amber-100/70 border-amber-300 text-amber-950 cursor-default'
                            : isUnlocked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 cursor-pointer'
                            : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200 cursor-pointer'
                        }`}
                      >
                        {isUnlocked ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Lock className="w-3 h-3 text-slate-400" />
                        )}
                        <span>{meta.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
