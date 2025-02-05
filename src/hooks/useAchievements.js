// src/hooks/useAchievements.js
import { useState, useEffect } from 'react';
import { achievementsService, ACHIEVEMENTS } from '../services/achievements';
import { playAchievementSound } from '../utils/sound';

// Ключ для зберігання показаних досягнень
const SHOWN_ACHIEVEMENTS_KEY = 'ozero_shown_achievements';
const UNLOCKED_ACHIEVEMENTS_KEY = 'ozero_unlocked_achievements';

export const useAchievements = (stories, analytics) => {
  const [stats, setStats] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [newAchievement, setNewAchievement] = useState(null);

  // Отримуємо список показаних досягнень
  const getShownAchievements = () => {
    try {
      return JSON.parse(localStorage.getItem(SHOWN_ACHIEVEMENTS_KEY) || '[]');
    } catch {
      return [];
    }
  };

  // Отримуємо список розблокованих досягнень
  const getUnlockedAchievements = () => {
    try {
      return JSON.parse(
        localStorage.getItem(UNLOCKED_ACHIEVEMENTS_KEY) || '[]'
      );
    } catch {
      return [];
    }
  };

  // Зберігаємо показане досягнення
  const markAchievementAsShown = (achievementId) => {
    const shown = getShownAchievements();
    if (!shown.includes(achievementId)) {
      shown.push(achievementId);
      localStorage.setItem(SHOWN_ACHIEVEMENTS_KEY, JSON.stringify(shown));
      return true;
    }
    return false;
  };

  // Зберігаємо розблоковане досягнення
  const saveUnlockedAchievement = (achievement) => {
    const unlocked = getUnlockedAchievements();
    if (!unlocked.includes(achievement.id)) {
      unlocked.push(achievement.id);
      localStorage.setItem(UNLOCKED_ACHIEVEMENTS_KEY, JSON.stringify(unlocked));
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!stories) return;

    const currentStats = achievementsService.calculateStats(stories, analytics);
    setStats(currentStats);

    const currentUnlocked =
      achievementsService.getUnlockedAchievements(currentStats);
    const shownAchievements = getShownAchievements();

    // Перевіряємо нові досягнення
    const newUnlocked = currentUnlocked.find(
      (achievement) =>
        !shownAchievements.includes(achievement.id) &&
        saveUnlockedAchievement(achievement)
    );

    if (newUnlocked) {
      setNewAchievement(newUnlocked);
      markAchievementAsShown(newUnlocked.id);
      playAchievementSound();
    }

    setUnlockedAchievements(currentUnlocked);
    setTotalPoints(achievementsService.calculateTotalPoints(currentUnlocked));
  }, [stories, analytics]);

  // Effect для очищення нового досягнення
  useEffect(() => {
    if (newAchievement) {
      const timer = setTimeout(() => {
        setNewAchievement(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newAchievement]);

  return {
    stats,
    unlockedAchievements,
    totalPoints,
    newAchievement,
    clearNewAchievement: () => setNewAchievement(null),
    allAchievements: ACHIEVEMENTS,
    progress: stats
      ? {
          storiesProgress: (stats.totalStories / 10) * 100,
          emotionalProgress: (stats.emotionalStories / 5) * 100,
          streakProgress: (stats.consecutiveDays / 5) * 100,
          improvementProgress: (stats.improvementRate / 50) * 100,
        }
      : null,
    hasUnlockedAchievement: (achievementId) => {
      const unlocked = getUnlockedAchievements();
      return unlocked.includes(achievementId);
    },
  };
};

export default useAchievements;
