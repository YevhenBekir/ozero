// src/services/achievements.js

// Ключові досягнення
export const ACHIEVEMENTS = {
  FIRST_STORY: {
    id: 'first_story',
    title: 'Перший крок',
    description: 'Заповніть свою першу історію',
    icon: '🎯',
    condition: (stats) => stats.totalStories >= 1,
    points: 10,
  },
  STORY_MASTER: {
    id: 'story_master',
    title: 'Майстер історій',
    description: 'Заповніть 10 історій',
    icon: '📚',
    condition: (stats) => stats.totalStories >= 10,
    points: 50,
  },
  DETAILED_WRITER: {
    id: 'detailed_writer',
    title: 'Уважний до деталей',
    description: 'Напишіть історію з більш ніж 100 словами в кожному розділі',
    icon: '✍️',
    condition: (stats) => stats.hasDetailedStory,
    points: 30,
  },
  CONSISTENT_USER: {
    id: 'consistent_user',
    title: 'Постійний користувач',
    description: 'Заповнюйте історії 5 днів поспіль',
    icon: '📅',
    condition: (stats) => stats.consecutiveDays >= 5,
    points: 40,
  },
  EMOTION_MASTER: {
    id: 'emotion_master',
    title: 'Емоційний інтелект',
    description: 'Опишіть свої емоції в 5 різних історіях',
    icon: '❤️',
    condition: (stats) => stats.emotionalStories >= 5,
    points: 35,
  },
  MINDFUL_WRITER: {
    id: 'mindful_writer',
    title: 'Уважний письменник',
    description: 'Створіть історію, де кожен розділ має щонайменше 50 слів',
    icon: '🧘',
    condition: (stats) => stats.hasBalancedStory,
    points: 25,
  },
  QUICK_LEARNER: {
    id: 'quick_learner',
    title: 'Швидкий учень',
    description: 'Покращіть свій результат на 25% порівняно з першою історією',
    icon: '🚀',
    condition: (stats) => stats.improvementRate >= 25,
    points: 30,
  },
};

export const achievementsService = {
  calculateStats(stories, analytics) {
    if (!stories || stories.length === 0) {
      return {
        totalStories: 0,
        consecutiveDays: 0,
        hasDetailedStory: false,
        emotionalStories: 0,
        hasBalancedStory: false,
        improvementRate: 0,
      };
    }

    // Розраховуємо базову статистику
    const stats = {
      totalStories: stories.length,
      consecutiveDays: this.calculateConsecutiveDays(stories),
      hasDetailedStory: this.hasDetailedStory(stories),
      emotionalStories: this.countEmotionalStories(stories),
      hasBalancedStory: this.hasBalancedStory(stories),
      improvementRate: analytics?.improvementRate || 0,
    };

    return stats;
  },

  calculateConsecutiveDays(stories) {
    const dates = stories
      .map((story) => new Date(story.timestamp || story.savedAt).toDateString())
      .sort();
    const uniqueDates = [...new Set(dates)];

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

  countWords(text) {
    return text.trim().split(/\s+/).length;
  },

  hasDetailedStory(stories) {
    return stories.some((story) => {
      return Object.values(story).every(
        (text) => typeof text === 'string' && this.countWords(text) >= 100
      );
    });
  },

  hasBalancedStory(stories) {
    return stories.some((story) => {
      return Object.values(story).every(
        (text) => typeof text === 'string' && this.countWords(text) >= 50
      );
    });
  },

  countEmotionalStories(stories) {
    const emotionalWords = [
      'відчув',
      'почува',
      'емоці',
      'настрій',
      'радість',
      'сум',
      'страх',
      'злість',
      'щаст',
      'любов',
      'ненавис',
      'тривог',
      'спокій',
      'збуджен',
      'натхнен',
    ];

    return stories.filter((story) => {
      const storyText = Object.values(story).join(' ').toLowerCase();
      return emotionalWords.some((word) => storyText.includes(word));
    }).length;
  },

  getUnlockedAchievements(stats) {
    const unlockedAchievements = [];

    // Перевіряємо кожне досягнення
    Object.values(ACHIEVEMENTS).forEach((achievement) => {
      if (achievement.condition(stats)) {
        unlockedAchievements.push(achievement);
      }
    });

    return unlockedAchievements;
  },

  calculateTotalPoints(unlockedAchievements) {
    return unlockedAchievements.reduce(
      (total, achievement) => total + achievement.points,
      0
    );
  },
};
