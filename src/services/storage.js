// src/services/storage.js
const STORAGE_KEYS = {
  CURRENT_STORY: 'ozero_current_story',
  SAVED_STORIES: 'ozero_saved_stories',
  SETTINGS: 'ozero_settings'
};

export const storageService = {
  // Базові операції з localStorage
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  },

  // Специфічні операції для історій
  getCurrentStory: () => {
    return storageService.get(STORAGE_KEYS.CURRENT_STORY);
  },

  saveCurrentStory: (story) => {
    return storageService.set(STORAGE_KEYS.CURRENT_STORY, {
      ...story,
      lastUpdated: new Date().toISOString()
    });
  },

  getAllStories: () => {
    return storageService.get(STORAGE_KEYS.SAVED_STORIES) || [];
  },

  saveStory: (story) => {
    const stories = storageService.getAllStories();
    const newStory = {
      ...story,
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    stories.push(newStory);
    return storageService.set(STORAGE_KEYS.SAVED_STORIES, stories);
  },

  updateStory: (id, updatedStory) => {
    const stories = storageService.getAllStories();
    const index = stories.findIndex(s => s.id === id);
    
    if (index !== -1) {
      stories[index] = {
        ...stories[index],
        ...updatedStory,
        lastUpdated: new Date().toISOString()
      };
      return storageService.set(STORAGE_KEYS.SAVED_STORIES, stories);
    }
    return false;
  },

  deleteStory: (id) => {
    const stories = storageService.getAllStories();
    const filteredStories = stories.filter(s => s.id !== id);
    return storageService.set(STORAGE_KEYS.SAVED_STORIES, filteredStories);
  },

  // Налаштування
  getSettings: () => {
    return storageService.get(STORAGE_KEYS.SETTINGS) || {
      autoSave: true,
      autoSaveInterval: 30000, // 30 секунд
      maxStories: 50
    };
  },

  updateSettings: (settings) => {
    return storageService.set(STORAGE_KEYS.SETTINGS, settings);
  },

  // Очищення сховища
  clearStorage: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }
};