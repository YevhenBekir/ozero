// src/services/analytics.js
import { storageService } from "./storage";

export const analyticsService = {
  // Збір даних
  collectStoryMetrics(story) {
    return {
      wordCount: {
        situation: story.situation.split(/\s+/).length,
        task: story.task.split(/\s+/).length,
        action: story.action.split(/\s+/).length,
        result: story.result.split(/\s+/).length,
      },
      characterCount: {
        situation: story.situation.length,
        task: story.task.length,
        action: story.action.length,
        result: story.result.length,
      },
      timestamp: new Date().toISOString(),
    };
  },

  // Аналіз трендів
  analyzePatterns(stories) {
    const patterns = {
      averageWordCount: 0,
      mostDetailedSection: "",
      completionRate: 0,
      improvementRate: 0,
    };

    if (!stories.length) return patterns;

    // Рахуємо середню кількість слів
    const totalWords = stories.reduce((acc, story) => {
      const metrics = this.collectStoryMetrics(story);
      return (
        acc +
        Object.values(metrics.wordCount).reduce((sum, count) => sum + count, 0)
      );
    }, 0);
    patterns.averageWordCount = Math.round(totalWords / stories.length);

    // Знаходимо найдетальніший розділ
    const sectionTotals = stories.reduce((acc, story) => {
      const metrics = this.collectStoryMetrics(story);
      Object.entries(metrics.wordCount).forEach(([section, count]) => {
        acc[section] = (acc[section] || 0) + count;
      });
      return acc;
    }, {});
    patterns.mostDetailedSection = Object.entries(sectionTotals).sort(
      ([, a], [, b]) => b - a
    )[0][0];

    // Рахуємо відсоток завершення
    const completedStories = stories.filter((story) =>
      Object.values(story).every((section) => section.length > 50)
    ).length;
    patterns.completionRate = Math.round(
      (completedStories / stories.length) * 100
    );

    // Аналізуємо прогрес
    if (stories.length >= 2) {
      const firstStory = this.collectStoryMetrics(stories[0]);
      const lastStory = this.collectStoryMetrics(stories[stories.length - 1]);

      const firstTotal = Object.values(firstStory.wordCount).reduce(
        (sum, count) => sum + count,
        0
      );
      const lastTotal = Object.values(lastStory.wordCount).reduce(
        (sum, count) => sum + count,
        0
      );

      patterns.improvementRate = Math.round(
        ((lastTotal - firstTotal) / firstTotal) * 100
      );
    }

    return patterns;
  },

  // Збереження та отримання аналітики
  saveAnalytics(metrics) {
    const currentAnalytics = this.getAnalytics();
    currentAnalytics.push(metrics);
    storageService.set("ozero_analytics", currentAnalytics);
  },

  getAnalytics() {
    return storageService.get("ozero_analytics") || [];
  },
};
