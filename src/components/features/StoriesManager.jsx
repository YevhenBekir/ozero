// src/components/features/StoriesManager.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  Clock,
  Edit3,
  BookOpen,
  Search,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export const StoriesManager = ({ stories, onLoad, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Фільтрація історій
  const filteredStories = stories.filter((story) =>
    story.situation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Форматування дати
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Обробка видалення
  const handleDelete = (id) => {
    setShowDeleteConfirm(true);
    setSelectedStory(id);
  };

  const confirmDelete = () => {
    onDelete(selectedStory);
    setShowDeleteConfirm(false);
    setSelectedStory(null);
  };

  return (
    <div className="space-y-4">
      {/* Заголовок та пошук */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Збережені історії
          </h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Пошук історій..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 w-48 rounded-lg border border-gray-200 dark:border-gray-700 
                     bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-yellow-500
                     focus:border-yellow-500 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Список історій */}
      <div className="space-y-2">
        <AnimatePresence>
          {filteredStories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
              <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? 'Історій не знайдено'
                  : 'У вас поки немає збережених історій'}
              </p>
            </motion.div>
          ) : (
            filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 
                         dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200
                         hover:border-yellow-500 dark:hover:border-yellow-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {story.situation}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDate(story.savedAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onLoad(story.id)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 
                               dark:hover:bg-blue-900/20 rounded-full transition-colors duration-200"
                      title="Редагувати"
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(story.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 
                               dark:hover:bg-red-900/20 rounded-full transition-colors duration-200"
                      title="Видалити"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Превью контенту */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="mt-2 overflow-hidden"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {story.result}
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Модальне вікно підтвердження видалення */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4"
            >
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 mb-4">
                <AlertTriangle className="w-6 h-6" />
                <h4 className="text-lg font-medium">Підтвердження видалення</h4>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ви впевнені, що хочете видалити цю історію? Це дію неможливо
                відмінити.
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                           dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Скасувати
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                           transition-colors duration-200"
                >
                  Видалити
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
