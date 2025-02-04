// src/hooks/useAnalytics.js
import { useState, useEffect, useMemo } from 'react';
import { analyticsService } from '../services/analytics';

export const useAnalytics = (story, savedStories) => {
  const [metrics, setMetrics] = useState(null);

  // Використовуємо useMemo для обчислення патернів
  const patterns = useMemo(() => {
    if (!savedStories?.length) return null;
    return analyticsService.analyzePatterns(savedStories);
  }, [savedStories]);

  // Оновлюємо метрики тільки коли змінюється історія
  useEffect(() => {
    if (story) {
      const newMetrics = analyticsService.collectStoryMetrics(story);
      setMetrics(newMetrics);
    }
  }, [story?.situation, story?.task, story?.action, story?.result]); // Залежимо від конкретних полів

  return { metrics, patterns };
};
