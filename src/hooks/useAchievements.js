// src/hooks/useAchievements.js
import { useState, useEffect } from "react";
import { achievementsService, ACHIEVEMENTS } from "../services/achievements";

export const useAchievements = (stories, analytics) => {
  const [stats, setStats] = useState(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [newAchievement, setNewAchievement] = useState(null);

  useEffect(() => {
    if (!stories) return;

    const currentStats = achievementsService.calculateStats(stories, analytics);
    setStats(currentStats);

    const currentUnlocked =
      achievementsService.getUnlockedAchievements(currentStats);

    // Перевіряємо нові досягнення
    if (unlockedAchievements.length < currentUnlocked.length) {
      const newOnes = currentUnlocked.filter(
        (achievement) =>
          !unlockedAchievements.find((a) => a.id === achievement.id)
      );
      if (newOnes.length > 0) {
        setNewAchievement(newOnes[0]);
        // Зберігаємо в localStorage, щоб не показувати повторно
        const shownAchievements = JSON.parse(
          localStorage.getItem("shownAchievements") || "[]"
        );
        localStorage.setItem(
          "shownAchievements",
          JSON.stringify([...shownAchievements, newOnes[0].id])
        );
      }
    }

    setUnlockedAchievements(currentUnlocked);
    setTotalPoints(achievementsService.calculateTotalPoints(currentUnlocked));
  }, [stories, analytics]);

  return {
    stats,
    unlockedAchievements,
    totalPoints,
    newAchievement,
    clearNewAchievement: () => setNewAchievement(null),
    allAchievements: ACHIEVEMENTS,
    progress: stats
      ? {
          storiesProgress: (stats.totalStories / 10) * 100, // Для STORY_MASTER
          emotionalProgress: (stats.emotionalStories / 5) * 100, // Для EMOTION_MASTER
          streakProgress: (stats.consecutiveDays / 5) * 100, // Для CONSISTENT_USER
        }
      : null,
  };
};
