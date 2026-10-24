import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Users,
  MessageSquare,
  Heart,
  Send,
  Sparkles,
  Crown,
  Megaphone,
  Award,
  Globe,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { UserProfileDoc } from '../firebase';
import { LANGUAGE_COURSES } from '../data/curriculum';
import { MASTER_ADMIN_EMAIL, isMasterAdminEmail } from '../utils/accessControlLogic';

interface CommunityPost {
  id: string;
  authorName: string;
  authorEmail: string;
  languageId: string;
  title: string;
  content: string;
  likes: number;
  likedByMe?: boolean;
  createdAt: string;
  tag: string;
}

interface PublicAnnouncement {
  id: string;
  title: string;
  body: string;
  date: string;
}

const INITIAL_ANNOUNCEMENTS: PublicAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Chính sách Phân quyền & Cấp phép Truy cập LinguaFlow Public',
    body: `Chào mừng toàn thể học viên! Trên hệ thống LinguaFlow Public, chỉ duy nhất tài khoản Quản trị viên tối cao (${MASTER_ADMIN_EMAIL}) giữ quyền Admin. Mọi tài khoản đăng ký mới đều là User (mặc định mở mục Lộ trình 7 ngôn ngữ) và sẽ được Admin cấp phép mở khóa các hạng mục nâng cao (Video AI, Phòng Lab AI, Luyện thi, Hội thoại AI, Ngữ pháp, Từ vựng, Văn hóa).`,
    date: 'Hôm nay',
  },
  {
    id: 'ann-2',
    title: 'Ra mắt Chuỗi Bài Giảng Video AI Giảng Viên Ảo (A1 → C2) cho 7 Ngôn Ngữ',
    body: 'Hệ thống đã cập nhật trọn bộ bài giảng Video AI từ Cơ bản tới Nâng cao với giọng đọc bản xứ và bài tập kiểm tra tương tác trực tiếp ngay sau mỗi clip.',
    date: 'Tuần này',
  },
];

const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Quản trị viên (Admin)',
    authorEmail: MASTER_ADMIN_EMAIL,
    languageId: 'english',
    title: 'Bí quyết đạt IELTS Academic Overall 8.0+ nhờ kết hợp Video AI và Phòng Lab Shadowing',
    content:
      'Hãy xem kỹ từng phân đoạn bảng điện tử trong mục Video AI, sau đó chuyển sang Phòng Lab AI để đọc nhại (Shadowing) từng câu. Hệ thống sẽ chấm điểm phát âm chi tiết tới từng âm vị!',
    likes: 48,
    createdAt: '2 giờ trước',
    tag: 'Kinh nghiệm IELTS 8.5',
  },
  {
    id: 'post-2',
    authorName: 'Nguyễn Hoàng Nam',
    authorEmail: 'hoangnam.nguyen@gmail.com',
    languageId: 'japanese',
    title: 'Cách nhớ nhanh hệ thống Kính ngữ (Keigo) JLPT N2 không bị nhầm lẫn',
    content:
      'Sau khi được Admin cấp phép mở mục Soi Ngữ pháp và Video AI Tiếng Nhật, mình đã tổng hợp bảng phân biệt Sonkeigo và Kenjougo cực dễ nhớ cho các bạn thi JLPT.',
    likes: 29,
    createdAt: '5 giờ trước',
    tag: 'Góc học JLPT',
  },
  {
    id: 'post-3',
    authorName: 'Trần Thu Hà',
    authorEmail: 'thuha.tran2004@gmail.com',
    languageId: 'chinese',
    title: 'Tổng hợp 50 cấu trúc câu chữ 把 (bǎ) và 被 (bèi) hay gặp nhất trong đề HSK 4 - HSK 5',
    content:
      'Mình vừa hoàn thành Lộ trình Tiếng Trung A1-B2 và đạt chuỗi 10 ngày liên tiếp. Chia sẻ cùng mọi người mẹo đặt câu đạt điểm tối đa phần viết HSK!',
    likes: 21,
    createdAt: '1 ngày trước',
    tag: 'Chinh phục HSK',
  },
];

interface PublicCommunityHubViewProps {
  managedUsers: UserProfileDoc[];
  currentUserEmail: string | null;
  currentUserDisplayName: string;
  selectedLanguageId: string;
  onGainXp: (amount: number) => void;
}

export const PublicCommunityHubView: React.FC<PublicCommunityHubViewProps> = ({
  managedUsers,
  currentUserEmail,
  currentUserDisplayName,
  selectedLanguageId,
  onGainXp,
}) => {
  const [leaderboardLangFilter, setLeaderboardLangFilter] = useState<string>('all');
  const [announcements, setAnnouncements] = useState<PublicAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnBody, setNewAnnBody] = useState('');

  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postLang, setPostLang] = useState(selectedLanguageId || 'english');
  const [claimedChallengeIds, setClaimedChallengeIds] = useState<string[]>([]);

  const isCurrentAdmin = isMasterAdminEmail(currentUserEmail);

  const sortedLeaderboard = [...managedUsers]
    .filter((u) => leaderboardLangFilter === 'all' || u.selectedLanguageId === leaderboardLangFilter)
    .sort((a, b) => b.xp - a.xp);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCurrentAdmin || !newAnnTitle.trim() || !newAnnBody.trim()) return;
    const created: PublicAnnouncement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      body: newAnnBody.trim(),
      date: 'Vừa đăng',
    };
    setAnnouncements((prev) => [created, ...prev]);
    setNewAnnTitle('');
    setNewAnnBody('');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: currentUserDisplayName || 'Học viên LinguaFlow',
      authorEmail: currentUserEmail || 'user@linguaflow.app',
      languageId: postLang,
      title: postTitle.trim(),
      content: postContent.trim(),
      likes: 1,
      likedByMe: true,
      createdAt: 'Vừa xong',
      tag: isCurrentAdmin ? 'Thông báo Admin' : 'Chia sẻ Học viên',
    };
    setPosts((prev) => [newPost, ...prev]);
    setPostTitle('');
    setPostContent('');
    onGainXp(20);
  };

  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const nextLiked = !p.likedByMe;
        return {
          ...p,
          likedByMe: nextLiked,
          likes: nextLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      })
    );
  };

  const handleJoinChallenge = (challengeId: string, xpReward: number) => {
    if (claimedChallengeIds.includes(challengeId)) return;
    setClaimedChallengeIds((prev) => [...prev, challengeId]);
    onGainXp(xpReward);
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Hero Banner */}
      <section className="bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500 text-white">
                <Globe className="w-3.5 h-3.5" /> Cộng Đồng Học Tập Đa Ngôn Ngữ Public
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Crown className="w-3.5 h-3.5" /> Quản trị bởi Admin: {MASTER_ADMIN_EMAIL}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Diễn Đàn Học Viên &amp; Bảng Vinh Danh Toàn Cầu
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nơi kết nối các thành viên đã được Admin (<strong className="text-amber-300">{MASTER_ADMIN_EMAIL}</strong>) cấp phép truy cập, cùng nhau đua Top XP 7 ngôn ngữ và chia sẻ kinh nghiệm chinh phục chứng chỉ quốc tế.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] font-bold text-slate-300 uppercase">Thành viên</div>
              <div className="text-2xl font-black text-white mt-0.5 tabular-nums">{managedUsers.length}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] font-bold text-amber-300 uppercase">Bài thảo luận</div>
              <div className="text-2xl font-black text-amber-300 mt-0.5 tabular-nums">{posts.length}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] font-bold text-emerald-300 uppercase">Ngôn ngữ</div>
              <div className="text-2xl font-black text-emerald-300 mt-0.5 tabular-nums">7</div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Announcements from Master Admin */}
      <section className="rounded-3xl border border-amber-200 bg-amber-50/50 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Thông Báo Chính Thức Từ Quản Trị Viên ({MASTER_ADMIN_EMAIL})
              </h2>
              <p className="text-xs text-slate-600">
                Cập nhật quy định cấp phép, lịch thi thử và sự kiện học tập toàn hệ thống
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-4 rounded-2xl bg-white border border-amber-200/90 shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                  Admin: {MASTER_ADMIN_EMAIL}
                </span>
                <span className="text-[11px] text-slate-400">{ann.date}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{ann.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ann.body}</p>
            </div>
          ))}
        </div>

        {/* Admin-only Announcement Publisher */}
        {isCurrentAdmin && (
          <form
            onSubmit={handleCreateAnnouncement}
            className="p-4 rounded-2xl bg-white border-2 border-amber-300 space-y-3"
          >
            <div className="text-xs font-black text-amber-950 uppercase flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>Đăng thông báo mới (Chỉ hiển thị cho Admin {MASTER_ADMIN_EMAIL})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <input
                type="text"
                value={newAnnTitle}
                onChange={(e) => setNewAnnTitle(e.target.value)}
                placeholder="Tiêu đề thông báo toàn hệ thống..."
                className="sm:col-span-4 px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                value={newAnnBody}
                onChange={(e) => setNewAnnBody(e.target.value)}
                placeholder="Nội dung chi tiết gửi tới toàn bộ User..."
                className="sm:col-span-6 px-3 py-2 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="sm:col-span-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-amber-300 hover:text-white font-bold text-xs cursor-pointer"
              >
                Đăng thông báo
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Main 2-Column Layout: Discussion Forum + Global Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Community Study Feed & Post Composer */}
        <div className="lg:col-span-7 space-y-5">
          {/* Post Composer */}
          <form
            onSubmit={handleCreatePost}
            className="p-5 rounded-3xl border border-slate-200 bg-white shadow-2xs space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900">
                  Chia sẻ Kinh nghiệm hoặc Đặt câu hỏi (+20 XP)
                </h2>
              </div>
              <select
                value={postLang}
                onChange={(e) => setPostLang(e.target.value)}
                className="px-2.5 py-1 text-xs font-bold bg-slate-100 border border-slate-200 rounded-lg"
                aria-label="Chọn ngôn ngữ bài viết"
              >
                {Object.values(LANGUAGE_COURSES).map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.flagEmoji} {lang.vietnameseName}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Tiêu đề bài viết hoặc câu hỏi ngữ pháp/luyện thi..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />

            <textarea
              rows={2}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Chia sẻ mẹo học tập, cấu trúc hay hoặc câu hỏi của bạn cho cộng đồng..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Đăng bởi: <strong>{currentUserDisplayName}</strong> ({isCurrentAdmin ? 'Admin Tối Cao' : 'User Đã Cấp Phép'})
              </span>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Đăng bài viết (+20 XP)</span>
              </button>
            </div>
          </form>

          {/* Feed List */}
          <div className="space-y-3.5">
            {posts.map((post) => {
              const langMeta = LANGUAGE_COURSES[post.languageId] || LANGUAGE_COURSES.english;
              const isPostByAdmin = isMasterAdminEmail(post.authorEmail);

              return (
                <article
                  key={post.id}
                  className="p-5 rounded-3xl border border-slate-200 bg-white shadow-2xs space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{langMeta.flagEmoji}</span>
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {post.authorName}
                      </span>
                      {isPostByAdmin ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950 flex items-center gap-1">
                          <Crown className="w-3 h-3" /> Admin ({MASTER_ADMIN_EMAIL})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                          User Đã Cấp Phép
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                        {post.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">{post.createdAt}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{post.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{post.content}</p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        post.likedByMe
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${post.likedByMe ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{post.likes} hữu ích</span>
                    </button>

                    <span className="text-[11px] text-slate-400">
                      Chuyên mục: {langMeta.vietnameseName}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Global Public Leaderboard & Weekly Challenges */}
        <div className="lg:col-span-5 space-y-5">
          {/* Leaderboard Card */}
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <div className="p-5 bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <h2 className="text-base font-black">Bảng Xếp Hạng Học Viên Public</h2>
                </div>
                <span className="text-[11px] text-amber-300 font-bold">Cập nhật Realtime</span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setLeaderboardLangFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap cursor-pointer ${
                    leaderboardLangFilter === 'all'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  Tất cả ({managedUsers.length})
                </button>
                {Object.values(LANGUAGE_COURSES).map((lang) => (
                  <button
                    key={lang.id}
                    type="button"
                    onClick={() => setLeaderboardLangFilter(lang.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap cursor-pointer ${
                      leaderboardLangFilter === lang.id
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    {lang.flagEmoji} {lang.vietnameseName}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {sortedLeaderboard.map((member, index) => {
                const isOwner = isMasterAdminEmail(member.email);
                const langMeta = LANGUAGE_COURSES[member.selectedLanguageId] || LANGUAGE_COURSES.english;

                return (
                  <div
                    key={member.uid}
                    className={`px-5 py-3.5 flex items-center justify-between gap-3 ${
                      isOwner ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                          index === 0
                            ? 'bg-amber-400 text-slate-950'
                            : index === 1
                            ? 'bg-slate-200 text-slate-800'
                            : index === 2
                            ? 'bg-orange-200 text-orange-950'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        #{index + 1}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {member.displayName}
                          </span>
                          {isOwner ? (
                            <span className="px-1.5 py-0.2 rounded-md bg-amber-400 text-slate-950 text-[9px] font-black uppercase">
                              Admin
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 text-[9px] font-bold uppercase">
                              User
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{langMeta.flagEmoji} {langMeta.vietnameseName}</span>
                          <span>·</span>
                          <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                            <Flame className="w-3 h-3 fill-amber-500" /> {member.streak} ngày
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-sm font-black text-indigo-600 tabular-nums">
                        {member.xp} XP
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">{member.targetBand}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Public Weekly Challenges */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                Thử Thách Cộng Đồng Tuần Này
              </h3>
            </div>

            {[
              {
                id: 'ch-video-ai',
                title: 'Hoàn thành 1 Bài Giảng Video AI Giảng Viên Ảo',
                reward: 40,
                participants: 142,
              },
              {
                id: 'ch-shadowing',
                title: 'Đạt 85%+ Điểm Phát Âm tại Phòng Lab AI',
                reward: 50,
                participants: 98,
              },
            ].map((ch) => {
              const claimed = claimedChallengeIds.includes(ch.id);
              return (
                <div
                  key={ch.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{ch.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {ch.participants} học viên đang tham gia · Thưởng <strong>+{ch.reward} XP</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={claimed}
                    onClick={() => handleJoinChallenge(ch.id, ch.reward)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer ${
                      claimed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {claimed ? 'Đã nhận thưởng' : `Tham gia (+${ch.reward} XP)`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
