export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  xpReward: number;
  isCompleted: boolean;
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  role: string;
  xp: number;
  streak: number;
  targetBand: string;
  isCurrentUser: boolean;
  rank: number;
}

export function computeDailyQuests(params: {
  todayXp: number;
  dailyXpGoal: number;
  completedLessonsCount: number;
  dailyWordPracticed: boolean;
}): DailyQuest[] {
  const safeGoal = Math.max(10, params.dailyXpGoal || 50);
  const safeTodayXp = Math.max(0, params.todayXp || 0);
  const safeLessons = Math.max(0, params.completedLessonsCount || 0);

  return [
    {
      id: 'quest-daily-xp',
      title: `Chinh phục mục tiêu ${safeGoal} XP hôm nay`,
      description: 'Tích lũy điểm kinh nghiệm qua bài học, từ vựng hoặc đề thi',
      current: Math.min(safeGoal, safeTodayXp),
      target: safeGoal,
      xpReward: 25,
      isCompleted: safeTodayXp >= safeGoal
    },
    {
      id: 'quest-lesson-mastery',
      title: 'Hoàn thành tối thiểu 2 bài học trong lộ trình',
      description: 'Mở rộng vốn câu giao tiếp và ngữ pháp thực chiến',
      current: Math.min(2, safeLessons),
      target: 2,
      xpReward: 30,
      isCompleted: safeLessons >= 2
    },
    {
      id: 'quest-word-of-day',
      title: 'Luyện nghe & phản xạ Từ vựng tâm điểm hôm nay',
      description: 'Nghe phát âm bản xứ và trả lời nhanh câu hỏi kiểm tra từ vựng',
      current: params.dailyWordPracticed ? 1 : 0,
      target: 1,
      xpReward: 20,
      isCompleted: params.dailyWordPracticed
    }
  ];
}

export function evaluatePlacementLevel(correctCount: number, totalQuestions: number): {
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  title: string;
  recommendedTrack: 'daily' | 'workplace' | 'academic';
  summary: string;
} {
  const ratio = totalQuestions > 0 ? correctCount / totalQuestions : 0;
  if (ratio >= 0.9) {
    return {
      cefrLevel: 'C1',
      title: 'C1 Cao cấp (Advanced Academic)',
      recommendedTrack: 'academic',
      summary: 'Nền tảng xuất sắc! Bạn sẵn sàng bước vào luyện đề IELTS 80 câu và học thuật chuyên sâu.'
    };
  }
  if (ratio >= 0.7) {
    return {
      cefrLevel: 'B2',
      title: 'B2 Trung cao cấp (Upper-Intermediate)',
      recommendedTrack: 'workplace',
      summary: 'Vốn từ và ngữ pháp vững vàng. Hãy tập trung vào giao tiếp công sở, phỏng vấn và luyện đề chuẩn.'
    };
  }
  if (ratio >= 0.5) {
    return {
      cefrLevel: 'B1',
      title: 'B1 Trung cấp (Intermediate)',
      recommendedTrack: 'workplace',
      summary: 'Bạn đã nắm được cấu trúc nền tảng. Phù hợp luyện phản xạ tình huống đi làm & giao tiếp mở rộng.'
    };
  }
  if (ratio >= 0.25) {
    return {
      cefrLevel: 'A2',
      title: 'A2 Sơ trung cấp (Elementary)',
      recommendedTrack: 'daily',
      summary: 'Khởi đầu tốt! Hãy củng cố các mẫu câu giao tiếp đời sống hàng ngày và từ vựng cốt lõi.'
    };
  }
  return {
    cefrLevel: 'A1',
    title: 'A1 Nhập môn (Beginner)',
    recommendedTrack: 'daily',
    summary: 'Hãy bắt đầu từ Chương 1 để xây dựng phát âm chuẩn và phản xạ câu giao tiếp cơ bản nhất.'
  };
}

export function buildSortedLeaderboard(
  members: { uid: string; displayName: string; role: string; xp: number; streak: number; targetBand: string }[],
  currentUserStats: { displayName: string; role: string; xp: number; streak: number; targetBand: string }
): LeaderboardEntry[] {
  const combined = members.map((m, idx) => {
    const isOwner = idx === 0 || m.uid.startsWith('owner_admin');
    if (isOwner) {
      return {
        ...m,
        displayName: currentUserStats.displayName,
        role: currentUserStats.role,
        xp: Math.max(m.xp, currentUserStats.xp),
        streak: Math.max(m.streak, currentUserStats.streak),
        targetBand: currentUserStats.targetBand,
        isCurrentUser: true,
        rank: 0
      };
    }
    return {
      ...m,
      isCurrentUser: false,
      rank: 0
    };
  });

  combined.sort((a, b) => b.xp - a.xp || b.streak - a.streak);
  return combined.map((entry, idx) => ({
    ...entry,
    rank: idx + 1
  }));
}
