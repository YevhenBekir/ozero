// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storage';

const INITIAL_STORY = {
  situation: '',
  task: '',
  action: '',
  result: ''
};

export const useLocalStorage = () => {
  const [story, setStory] = useState(() => {
    // Спочатку перевіряємо localStorage
    const savedStory = storageService.getCurrentStory();
    return savedStory || INITIAL_STORY; // Повертаємо початковий стан, якщо нічого не збережено
  });

  const [savedStories, setSavedStories] = useState(() => {
    return storageService.getAllStories() || [];
  });

  const [settings] = useState(storageService.getSettings());

  // Автозбереження
  useEffect(() => {
    if (!settings.autoSave) return;

    const timer = setInterval(() => {
      if (Object.values(story).some(value => value !== '')) {
        storageService.saveCurrentStory(story);
      }
    }, settings.autoSaveInterval || 30000);

    return () => clearInterval(timer);
  }, [story, settings.autoSave, settings.autoSaveInterval]);

  // Методи для роботи з поточною історією
  const updateStory = useCallback((updates) => {
    setStory(prev => {
      const newStory = { ...prev, ...updates };
      storageService.saveCurrentStory(newStory);
      return newStory;
    });
  }, []);

  // Методи для роботи зі збереженими історіями
  const saveStory = useCallback(() => {
    if (Object.values(story).some(value => value !== '')) {
      storageService.saveStory(story);
      setSavedStories(storageService.getAllStories());
      setStory(INITIAL_STORY); // Очищаємо поточну історію після збереження
    }
  }, [story]);

  const deleteStory = useCallback((id) => {
    storageService.deleteStory(id);
    setSavedStories(storageService.getAllStories());
  }, []);

  const loadStory = useCallback((id) => {
    const stories = storageService.getAllStories();
    const storyToLoad = stories.find(s => s.id === id);
    if (storyToLoad) {
      setStory(storyToLoad);
      storageService.saveCurrentStory(storyToLoad);
    }
  }, []);

  return {
    story,
    updateStory,
    savedStories,
    saveStory,
    deleteStory,
    loadStory,
    settings
  };
};