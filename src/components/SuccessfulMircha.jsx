// src/components/SuccessfulMircha.jsx
import React, { useState, useMemo, useCallback } from 'react';
import { Crown, Save, Share2, Download } from 'lucide-react';

// Імпорт компонентів
import { ProgressBar } from '@/components/common/ProgressBar';
import { ProgressStats } from '@/components/common/ProgressStats';
import { AiSuggestions } from '@/components/features/AiSuggestions';
import { StoriesManager } from '@/components/features/StoriesManager';
import { Analytics } from '@/components/features/Analytics';
import { Achievements } from '@/components/features/Achievements';
import { TemplateSelector } from '@/components/features/TemplateSelector';
import { ShareExportPanel } from '@/components/features/ShareExportPanel';
import { FloatingActions } from '@/components/common/FloatingActions';
import { Notifications } from '@/components/common/Notifications';
import { KeyboardHelp } from '@/components/common/KeyboardHelp';

// Імпорт хуків
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSentimentAnalysis } from '@/hooks/useSentimentAnalysis';
import { useProgress } from '@/hooks/useProgress';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useAchievements } from '@/hooks/useAchievements';
import { useTemplates } from '@/hooks/useTemplates';
import { useShareExport } from '@/hooks/useShareExport';
import { useAiSuggestions } from '@/hooks/useAiSuggestions';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useNotifications } from '@/hooks/useNotifications';

// Конфігурація полів форми
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
  // Базові стани
  const [currentField, setCurrentField] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  // Хуки для роботи з даними
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
  const { templates } = useTemplates();
  const { exportStory, shareStory } = useShareExport(story);

  // Аналіз та прогрес
  const progress = useProgress(story);
  const { sentiment } = useSentimentAnalysis(story[currentField]);
  const { metrics, patterns } = useAnalytics(story, savedStories);

  // Досягнення
  const {
    unlockedAchievements,
    totalPoints,
    newAchievement,
    clearNewAchievement,
  } = useAchievements(savedStories, patterns);

  // AI підказки
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

  // Обробники подій
  const handleFieldChange = useCallback(
    (field, value) => {
      updateStory({ [field]: value });
    },
    [updateStory]
  );

  const handleFieldFocus = useCallback((field) => {
    setCurrentField(field);
  }, []);

  const handleSave = useCallback(async () => {
    await saveStory();
    addNotification({
      type: 'success',
      title: 'Збережено',
      message: 'Ваша історія успішно збережена',
    });
  }, [saveStory, addNotification]);

  const handleShare = useCallback(async () => {
    const success = await shareStory();
    if (success) {
      addNotification({
        type: 'success',
        title: 'Поділились',
        message: 'Історію успішно скопійовано до буферу обміну',
      });
    }
  }, [shareStory, addNotification]);

  const handleExport = useCallback(async () => {
    await exportStory('txt');
    addNotification({
      type: 'success',
      title: 'Експортовано',
      message: 'Історію успішно експортовано',
    });
  }, [exportStory, addNotification]);

  // Клавіатурні скорочення
  useKeyboardShortcuts(
    useMemo(
      () => ({
        onSave: handleSave,
        onExport: handleExport,
        onHelp: () => setIsHelpOpen((prev) => !prev),
        onEscape: () => {
          setIsHelpOpen(false);
          setIsTemplateOpen(false);
        },
      }),
      [handleSave, handleExport]
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Crown className="w-8 h-8 text-yellow-500" />
              Твій Шлях до Перемог
            </h1>

            <div className="flex items-center gap-4">
              <ShareExportPanel
                story={story}
                onExport={handleExport}
                onShare={handleShare}
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Зберегти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Прогрес */}
        {progress && (
          <div className="mb-8">
            <ProgressStats progress={progress} />
            <ProgressBar progress={progress} />
          </div>
        )}

        {/* Основний контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ліва колонка - форма */}
          <div className="lg:col-span-2 space-y-6">
            {Object.values(FORM_FIELDS).map((field) => (
              <div key={field.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{field.icon}</span>
                  <h2 className="text-xl font-semibold">{field.title}</h2>
                </div>

                <textarea
                  value={story[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  onFocus={() => handleFieldFocus(field.id)}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  rows="4"
                  placeholder={field.placeholder}
                />

                {currentField === field.id && suggestions?.length > 0 && (
                  <AiSuggestions suggestions={suggestions} />
                )}
              </div>
            ))}
          </div>

          {/* Права колонка */}
          <div className="space-y-6">
            {metrics && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Аналітика</h3>
                <Analytics metrics={metrics} patterns={patterns} />
              </div>
            )}

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Досягнення</h3>
              <Achievements
                unlockedAchievements={unlockedAchievements}
                totalPoints={totalPoints}
                newAchievement={newAchievement}
                onNewAchievementClose={clearNewAchievement}
              />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Збережені історії</h3>
              <StoriesManager
                stories={savedStories}
                onLoad={loadStory}
                onDelete={deleteStory}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Плаваючі елементи */}
      <FloatingActions
        onSave={handleSave}
        onExport={handleExport}
        onShare={handleShare}
        onHelp={() => setIsHelpOpen(true)}
      />

      {/* Модальні вікна */}
      <KeyboardHelp isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {isTemplateOpen && (
        <TemplateSelector
          templates={templates}
          onSelect={(template) => {
            updateStory(template);
            setIsTemplateOpen(false);
          }}
          onClose={() => setIsTemplateOpen(false)}
        />
      )}

      {/* Сповіщення */}
      <Notifications
        notifications={notifications}
        onRemove={removeNotification}
      />
    </div>
  );
};

export default SuccessfulMircha;
