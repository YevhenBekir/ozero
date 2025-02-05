// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from 'react';
import { storageService } from '@/services/storage';

const INITIAL_STORY = {
  situation: '',
  task: '',
  action: '',
  result: '',
};

export const useLocalStorage = () => {
  const [story, setStory] = useState(() => {
    return storageService.getCurrentStory() || INITIAL_STORY;
  });

  const [savedStories, setSavedStories] = useState(() => {
    return storageService.getAllStories() || [];
  });

  const [settings] = useState(storageService.getSettings());

  // Автозбереження
  useEffect(() => {
    if (!settings.autoSave) return;

    const timer = setInterval(() => {
      if (Object.values(story).some((value) => value.trim() !== '')) {
        storageService.saveCurrentStory(story);
      }
    }, settings.autoSaveInterval || 30000);

    return () => clearInterval(timer);
  }, [story, settings.autoSave, settings.autoSaveInterval]);

  // Методи для роботи з поточною історією
  const updateStory = useCallback((updates) => {
    setStory((prev) => {
      const newStory = { ...prev, ...updates };
      storageService.saveCurrentStory(newStory);
      return newStory;
    });
  }, []);

  // Методи для роботи зі збереженими історіями
  const saveStory = useCallback(() => {
    // Перевіряємо, чи історія не пуста
    if (Object.values(story).some((value) => value.trim() !== '')) {
      const timestamp = new Date().toISOString();
      const newStory = {
        ...story,
        id: Date.now().toString(),
        savedAt: timestamp,
        timestamp: timestamp, // для сумісності зі старою версією
      };

      // Зберігаємо історію
      storageService.saveStory(newStory);

      // Оновлюємо список історій
      setSavedStories(storageService.getAllStories());

      // Очищаємо поточну історію
      setStory(INITIAL_STORY);

      return true;
    }
    return false;
  }, [story]);

  const deleteStory = useCallback((id) => {
    storageService.deleteStory(id);
    setSavedStories(storageService.getAllStories());
  }, []);

  const loadStory = useCallback((id) => {
    const stories = storageService.getAllStories();
    const storyToLoad = stories.find((s) => s.id === id);
    if (storyToLoad) {
      // Видаляємо службові поля перед завантаженням
      const { id: _, savedAt: __, timestamp: ___, ...cleanStory } = storyToLoad;
      setStory(cleanStory);
      storageService.saveCurrentStory(cleanStory);
    }
  }, []);

  // Функція для перевірки валідності історії
  const isStoryValid = useCallback((storyToCheck) => {
    return Object.values(storyToCheck).every(
      (value) => typeof value === 'string' && value.trim().length > 0
    );
  }, []);

  return {
    story,
    updateStory,
    savedStories,
    saveStory,
    deleteStory,
    loadStory,
    settings,
    isStoryValid,
  };
};

export default useLocalStorage;
