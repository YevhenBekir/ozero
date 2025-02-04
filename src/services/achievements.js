// src/services/achievements.js
export const ACHIEVEMENTS = {
  FIRST_STORY: {
    id: "first_story",
    title: "Перший крок",
    description: "Заповніть свою першу історію",
    icon: "🎯",
    condition: (stats) => stats.totalStories >= 1,
    points: 10,
  },
  STORY_MASTER: {
    id: "story_master",
    title: "Майстер історій",
    description: "Заповніть 10 історій",
    icon: "📚",
    condition: (stats) => stats.totalStories >= 10,
    points: 50,
  },
  DETAILED_WRITER: {
    id: "detailed_writer",
    title: "Уважний до деталей",
    description: "Напишіть історію з більш ніж 100 словами в кожному розділі",
    icon: "✍️",
    condition: (stats) => stats.hasDetailedStory,
    points: 30,
  },
  CONSISTENT_USER: {
    id: "consistent_user",
    title: "Постійний користувач",
    description: "Заповнюйте історії 5 днів поспіль",
    icon: "📅",
    condition: (stats) => stats.consecutiveDays >= 5,
    points: 40,
  },
  EMOTION_MASTER: {
    id: "emotion_master",
    title: "Емоційний інтелект",
    description: "Опишіть свої емоції в 5 різних історіях",
    icon: "❤️",
    condition: (stats) => stats.emotionalStories >= 5,
    points: 35,
  },
  IMPROVEMENT_STAR: {
    id: "improvement_star",
    title: "Зірка прогресу",
    description: "Покращіть свій результат на 50%",
    icon: "⭐",
    condition: (stats) => stats.improvementRate >= 50,
    points: 45,
  },
};

export const achievementsService = {
  calculateStats(stories, analytics) {
    return {
      totalStories: stories.length,
      consecutiveDays: this.calculateConsecutiveDays(stories),
      hasDetailedStory: this.hasDetailedStory(stories),
      emotionalStories: this.countEmotionalStories(stories),
      improvementRate: analytics?.improvementRate || 0,
    };
  },

  calculateConsecutiveDays(stories) {
    if (!stories.length) return 0;

    const dates = stories.map((story) =>
      new Date(story.timestamp).toDateString()
    );
    const uniqueDates = [...new Set(dates)].sort();

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]);
      const currDate = new Date(uniqueDates[i]);
      const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  },

  hasDetailedStory(stories) {
    return stories.some((story) => {
      const wordCounts = Object.values(story).map(
        (text) => text.split(/\s+/).length
      );
      return wordCounts.every((count) => count >= 100);
    });
  },

  countEmotionalStories(stories) {
    const emotionalWords = ["відчував", "почувався", "емоції", "настрій"];
    return stories.filter((story) =>
      emotionalWords.some((word) =>
        Object.values(story).some((text) => text.toLowerCase().includes(word))
      )
    ).length;
  },

  getUnlockedAchievements(stats) {
    return Object.values(ACHIEVEMENTS).filter((achievement) =>
      achievement.condition(stats)
    );
  },

  calculateTotalPoints(unlockedAchievements) {
    return unlockedAchievements.reduce(
      (total, achievement) => total + achievement.points,
      0
    );
  },

  // Додаткові утиліти для роботи з досягненнями
  getProgress(stats) {
    const progress = {};

    Object.entries(ACHIEVEMENTS).forEach(([key, achievement]) => {
      switch (key) {
        case "STORY_MASTER":
          progress[key] = (stats.totalStories / 10) * 100;
          break;
        case "EMOTION_MASTER":
          progress[key] = (stats.emotionalStories / 5) * 100;
          break;
        case "CONSISTENT_USER":
          progress[key] = (stats.consecutiveDays / 5) * 100;
          break;
        case "IMPROVEMENT_STAR":
          progress[key] = (stats.improvementRate / 50) * 100;
          break;
        default:
          progress[key] = achievement.condition(stats) ? 100 : 0;
      }
    });

    return progress;
  },

  getUserLevel(points) {
    const levels = [
      { name: "Початківець", threshold: 0 },
      { name: "Дослідник", threshold: 50 },
      { name: "Знавець", threshold: 100 },
      { name: "Експерт", threshold: 200 },
      { name: "Майстер", threshold: 300 },
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (points >= levels[i].threshold) {
        return {
          ...levels[i],
          next: levels[i + 1],
          progress:
            i < levels.length - 1
              ? ((points - levels[i].threshold) /
                  (levels[i + 1].threshold - levels[i].threshold)) *
                100
              : 100,
        };
      }
    }

    return levels[0];
  },
};
