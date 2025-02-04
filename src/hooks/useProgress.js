// src/hooks/useProgress.js
import { useMemo } from 'react';

export const useProgress = (story) => {
  return useMemo(() => {
    if (!story) return null;

    const fields = ['situation', 'task', 'action', 'result'];
    const steps = fields.map(field => {
      const content = story[field] || '';
      return {
        field,
        isStarted: content.length > 0,
        isComplete: content.length >= 50,
        percentage: Math.min(100, (content.length / 50) * 100)
      };
    });

    const totalProgress = steps.reduce((acc, curr) => acc + curr.percentage, 0) / 4;
    const completedSteps = steps.filter(p => p.isComplete).length;

    return {
      steps,
      totalProgress,
      completedSteps,
      totalSteps: fields.length
    };
  }, [story]);
};