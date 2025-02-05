// src/components/SuccessfulMircha.jsx

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Crown, Save } from 'lucide-react';

// Components
import { StoriesModal } from './modals/StoriesModal';
import { AchievementsModal } from './modals/AchievementsModal';
import { ExportModal } from './modals/ExportModal';
import { ProgressBar } from './common/ProgressBar';
import { ProgressStats } from './common/ProgressStats';
import { AiSuggestions } from './features/AiSuggestions';
import { Analytics } from './features/Analytics';
import { FloatingActions } from './common/FloatingActions';
import { Notifications } from './common/Notifications';
import { KeyboardHelp } from './common/KeyboardHelp';

// Hooks
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSentimentAnalysis } from '@/hooks/useSentimentAnalysis';
import { useProgress } from '@/hooks/useProgress';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAchievements } from '@/hooks/useAchievements';
import { useAiSuggestions } from '@/hooks/useAiSuggestions';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useNotifications } from '@/hooks/useNotifications';
import { useExport } from '@/hooks/useExport';
import AchievementNotification from './features/AchievementNotification';

// Field configuration
const FORM_FIELDS = {
  situation: {
    id: 'situation',
    title: 'Що зараз коїться?',
    icon: '🎯',
    placeholder: 'Розкажи, друже, що там у тебе відбувається...',
  },
  task: {
    id: 'task',
    title: 'Яка задача?',
    icon: '✅',
    placeholder: 'Що потрібно було зробити...',
  },
  action: {
    id: 'action',
    title: 'Що ти зробив?',
    icon: '⚡',
    placeholder: 'Які дії ти виконав...',
  },
  result: {
    id: 'result',
    title: 'Який результат?',
    icon: '🎉',
    placeholder: 'Чого вдалося досягти...',
  },
};

const SuccessfulMircha = () => {
  // Base states
  const [currentField, setCurrentField] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showStoriesModal, setShowStoriesModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState(null);

  // Hooks
  const {
    story,
    updateStory,
    savedStories,
    saveStory,
    deleteStory,
    loadStory,
  } = useLocalStorage();

  const { notifications, addNotification, removeNotification } =
    useNotifications();
  const { exportStory, isExporting, error: exportError } = useExport(story);
  const progress = useProgress(story);
  const { sentiment } = useSentimentAnalysis(story[currentField]);
  const { metrics, patterns } = useAnalytics(story, savedStories);

  // Achievements
  const {
    unlockedAchievements,
    totalPoints,
    allAchievements,
    progress: achievementsProgress,
    newAchievement: latestAchievement,
  } = useAchievements(savedStories, patterns);

  // AI suggestions
  const suggestionContext = useMemo(
    () => ({
      sentiment,
      progress: progress?.steps?.find((s) => s.field === currentField)
        ?.percentage,
    }),
    [sentiment, progress, currentField]
  );

  const { suggestions } = useAiSuggestions(
    currentField,
    story[currentField],
    suggestionContext
  );

  // Handlers
  const handleFieldChange = (field, value) => {
    updateStory({ [field]: value });
  };

  const handleFieldFocus = (field) => {
    setCurrentField(field);
  };

  const handleSave = async () => {
    await saveStory();
    addNotification({
      type: 'success',
      title: 'Збережено',
      message: 'Ваша історія успішно збережена',
    });
  };

  const handleExport = async (format, options) => {
    const success = await exportStory(format, options);
    if (success) {
      addNotification({
        type: 'success',
        title: 'Експортовано',
        message: `Історію успішно експортовано у форматі ${format.toUpperCase()}`,
      });
    } else if (exportError) {
      addNotification({
        type: 'error',
        title: 'Помилка експорту',
        message: exportError,
      });
    }
    return success;
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSave: handleSave,
    onHelp: () => setIsHelpOpen(true),
    onEscape: () => {
      setIsHelpOpen(false);
      setShowStoriesModal(false);
      setShowAchievementsModal(false);
      setShowExportModal(false);
    },
  });

  // Effect for handling new achievements
  useEffect(() => {
    if (latestAchievement && !newAchievement) {
      setNewAchievement(latestAchievement);
      // Автоматично закриваємо сповіщення через 5 секунд
      const timer = setTimeout(() => {
        setNewAchievement(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [latestAchievement]);

  const handleCloseAchievementNotification = useCallback(() => {
    setNewAchievement(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Crown className="w-8 h-8 text-yellow-500" />
              Твій Шлях до Перемог
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExportModal(true)}
                className="btn-secondary flex items-center gap-2 px-4 py-2"
              >
                Експорт
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center gap-2 px-4 py-2"
              >
                <Save className="w-5 h-5" />
                Зберегти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress */}
        {progress && (
          <div className="mb-8">
            <ProgressStats progress={progress} />
            <ProgressBar progress={progress} />
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {Object.values(FORM_FIELDS).map((field) => (
              <div
                key={field.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{field.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {field.title}
                  </h2>
                </div>

                <textarea
                  value={story[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  onFocus={() => handleFieldFocus(field.id)}
                  className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  rows="4"
                  placeholder={field.placeholder}
                />

                {currentField === field.id && suggestions?.length > 0 && (
                  <AiSuggestions suggestions={suggestions} />
                )}
              </div>
            ))}
          </div>

          {/* Analytics */}
          <div className="space-y-6">
            {metrics && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Аналітика
                </h3>
                <Analytics metrics={metrics} patterns={patterns} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Actions */}
      <FloatingActions
        onSave={handleSave}
        onHelp={() => setIsHelpOpen(true)}
        onShowStories={() => setShowStoriesModal(true)}
        onShowAchievements={() => setShowAchievementsModal(true)}
        stories={savedStories}
        achievements={allAchievements}
        unlockedAchievements={unlockedAchievements}
        totalPoints={totalPoints}
        progress={achievementsProgress}
        onDeleteStory={deleteStory}
        onLoadStory={loadStory}
      />

      {/* Modals */}
      <StoriesModal
        isOpen={showStoriesModal}
        onClose={() => setShowStoriesModal(false)}
        stories={savedStories}
        onDelete={deleteStory}
        onLoad={loadStory}
      />

      <AchievementsModal
        isOpen={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
        achievements={allAchievements}
        unlockedAchievements={unlockedAchievements}
        totalPoints={totalPoints}
        progress={achievementsProgress}
      />

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        isExporting={isExporting}
      />

      <KeyboardHelp isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Notifications */}
      <Notifications
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Achievement Notification */}
      <AchievementNotification
        achievement={newAchievement}
        onClose={handleCloseAchievementNotification}
      />
    </div>
  );
};

export default SuccessfulMircha;
