export type AchievementCategory = 'streak' | 'vocab' | 'exam' | 'lessons' | 'mastery';
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface UserLearningStats {
  streak: number;
  totalMasteredWords: number;
  examsCompleted: number;
  completedLessonsCount: number;
  xp: number;
  speakingSessionsCompleted?: number;
  languagesExplored?: number;
}

export interface Achievement {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  category: AchievementCategory;
  tier: AchievementTier;
  iconName: string;
  targetValue: number;
  unit: string;
  xpReward: number;
}

export interface UnlockedAchievementRecord {
  id: string;
  unlockedAt: string; // ISO date string
}

export const ACHIEVEMENTS_REGISTRY: Achievement[] = [
  // 1. Streak Milestones
  {
    id: 'streak-3',
    title: 'Khởi Đầu Bền Bỉ',
    titleEn: '3-Day Streak',
    description: 'Học tập liên tục trong 3 ngày không gián đoạn.',
    category: 'streak',
    tier: 'bronze',
    iconName: 'Flame',
    targetValue: 3,
    unit: 'ngày',
    xpReward: 30
  },
  {
    id: 'streak-10',
    title: 'Bền Bỉ 10 Ngày',
    titleEn: '10-Day Streak',
    description: 'Duy trì thói quen học tập vững vàng suốt 10 ngày liên tiếp.',
    category: 'streak',
    tier: 'silver',
    iconName: 'Flame',
    targetValue: 10,
    unit: 'ngày',
    xpReward: 100
  },
  {
    id: 'streak-30',
    title: 'Kỷ Luật Thép 30 Ngày',
    titleEn: '30-Day Streak',
    description: 'Chinh phục chuỗi 30 ngày kỷ luật phi thường.',
    category: 'streak',
    tier: 'gold',
    iconName: 'Flame',
    targetValue: 30,
    unit: 'ngày',
    xpReward: 300
  },

  // 2. Vocabulary Mastered Milestones
  {
    id: 'words-50',
    title: 'Túi Từ Vựng Nhỏ',
    titleEn: '50 Words Mastered',
    description: 'Nắm vững và ôn luyện thành thạo 50 từ vựng.',
    category: 'vocab',
    tier: 'bronze',
    iconName: 'BookMarked',
    targetValue: 50,
    unit: 'từ vựng',
    xpReward: 50
  },
  {
    id: 'words-250',
    title: 'Vốn Từ Đầy Đặn',
    titleEn: '250 Words Mastered',
    description: 'Chinh phục 250 từ vựng cốt lõi qua hệ thống Spaced Repetition.',
    category: 'vocab',
    tier: 'silver',
    iconName: 'BookMarked',
    targetValue: 250,
    unit: 'từ vựng',
    xpReward: 150
  },
  {
    id: 'words-1000',
    title: 'Bậc Thầy 1,000 Từ Vựng',
    titleEn: '1,000 Words Mastered',
    description: 'Làm chủ kho 1,000 từ vựng chuyên sâu & học thuật đỉnh cao.',
    category: 'vocab',
    tier: 'diamond',
    iconName: 'Sparkles',
    targetValue: 1000,
    unit: 'từ vựng',
    xpReward: 500
  },

  // 3. IELTS Exam Milestones
  {
    id: 'first-ielts-exam',
    title: 'Chiến Binh Thi Thử',
    titleEn: 'First IELTS Practice Exam Completed',
    description: 'Hoàn thành bài thi thử IELTS thực tế đầu tiên theo tiêu chuẩn Cambridge.',
    category: 'exam',
    tier: 'silver',
    iconName: 'Trophy',
    targetValue: 1,
    unit: 'bài thi',
    xpReward: 150
  },
  {
    id: 'ielts-exam-3',
    title: 'Chuyên Gia Luyện Đề',
    titleEn: '3 IELTS Practice Exams Completed',
    description: 'Hoàn thành 3 bài thi thử IELTS quy mô thực tế.',
    category: 'exam',
    tier: 'gold',
    iconName: 'Award',
    targetValue: 3,
    unit: 'bài thi',
    xpReward: 350
  },

  // 4. Lessons Milestones
  {
    id: 'first-lesson',
    title: 'Bước Chân Đầu Tiên',
    titleEn: 'First Lesson Completed',
    description: 'Hoàn thành trọn vẹn bài học ngôn ngữ đầu tiên.',
    category: 'lessons',
    tier: 'bronze',
    iconName: 'CheckCircle2',
    targetValue: 1,
    unit: 'bài học',
    xpReward: 25
  },
  {
    id: 'lessons-10',
    title: 'Học Trình Tiến Bộ',
    titleEn: '10 Lessons Completed',
    description: 'Chinh phục thành công 10 bài học trong lộ trình học tập.',
    category: 'lessons',
    tier: 'silver',
    iconName: 'GraduationCap',
    targetValue: 10,
    unit: 'bài học',
    xpReward: 100
  },

  // 5. XP & Mastery Milestones
  {
    id: 'xp-500',
    title: 'Học Viên Năng Động',
    titleEn: '500 XP Earned',
    description: 'Tích lũy được tổng cộng 500 điểm kinh nghiệm XP.',
    category: 'mastery',
    tier: 'bronze',
    iconName: 'Star',
    targetValue: 500,
    unit: 'XP',
    xpReward: 50
  },
  {
    id: 'xp-2000',
    title: 'Chiến Binh Ngôn Ngữ',
    titleEn: '2,000 XP Earned',
    description: 'Cán mốc 2,000 XP khẳng định tinh thần học hỏi không ngừng.',
    category: 'mastery',
    tier: 'gold',
    iconName: 'Crown',
    targetValue: 2000,
    unit: 'XP',
    xpReward: 200
  }
];

/**
 * Extracts current metric value from stats for a given achievement
 */
export function getMetricValue(achievement: Achievement, stats: UserLearningStats): number {
  switch (achievement.id) {
    case 'streak-3':
    case 'streak-10':
    case 'streak-30':
      return stats.streak;
    case 'words-50':
    case 'words-250':
    case 'words-1000':
      return stats.totalMasteredWords;
    case 'first-ielts-exam':
    case 'ielts-exam-3':
      return stats.examsCompleted;
    case 'first-lesson':
    case 'lessons-10':
      return stats.completedLessonsCount;
    case 'xp-500':
    case 'xp-2000':
      return stats.xp;
    default:
      return 0;
  }
}

/**
 * Calculates current progress for a given achievement
 */
export function calculateAchievementProgress(
  achievement: Achievement,
  stats: UserLearningStats,
  isUnlocked: boolean
): { current: number; max: number; percentage: number; isUnlocked: boolean } {
  const current = getMetricValue(achievement, stats);
  const max = achievement.targetValue;
  const percentage = isUnlocked ? 100 : Math.min(100, Math.round((current / max) * 100));
  return {
    current: isUnlocked ? max : current,
    max,
    percentage,
    isUnlocked
  };
}

/**
 * Pure evaluation function that checks which achievements qualify for unlock
 * Returns an array of newly unlocked achievement objects
 */
export function evaluatePendingAchievements(
  stats: UserLearningStats,
  alreadyUnlockedIds: string[]
): Achievement[] {
  const unlockedSet = new Set(alreadyUnlockedIds);
  const newlyUnlocked: Achievement[] = [];

  for (const achievement of ACHIEVEMENTS_REGISTRY) {
    if (!unlockedSet.has(achievement.id)) {
      const metric = getMetricValue(achievement, stats);
      if (metric >= achievement.targetValue) {
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
}
