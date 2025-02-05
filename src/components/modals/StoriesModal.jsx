// src/components/modals/StoriesModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Clock,
  Edit3,
  Trash2,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';

export const StoriesModal = ({ isOpen, onClose, stories = [], onLoad, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedStory(null);
      setShowDeleteConfirm(false);
    }
  }, [isOpen]);

  const handleDelete = (storyId) => {
    setSelectedStory(storyId);
    setShowDeleteConfirm(true);
  };

  const handleClose = () => {
    setShowDeleteConfirm(false);
    setSelectedStory(null);
    onClose();
  };

  const confirmDelete = async () => {
    if (selectedStory) {
      await onDelete(selectedStory);
      setSelectedStory(null);
      setShowDeleteConfirm(false);
    }
  };

  if (!isOpen) return null;

  const renderMainModal = () => (
    <motion.div
      key="main-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl m-4 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal content */}
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Мої історії
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Пошук історій..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {stories.filter(story => 
            story.situation.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? 'Історій не знайдено'
                  : 'У вас поки немає збережених історій'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {stories
                .filter(story =>
                  story.situation.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((story) => (
                  <motion.div
                    key={story.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                             hover:border-yellow-500 dark:hover:border-yellow-500
                             bg-white dark:bg-gray-700 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {story.situation}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(story.savedAt).toLocaleDateString('uk-UA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            onLoad(story.id);
                            handleClose();
                          }}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 
                                   dark:hover:bg-blue-900/20 rounded-full"
                        >
                          <Edit3 className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(story.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 
                                   dark:hover:bg-red-900/20 rounded-full"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderDeleteConfirmModal = () => (
    <motion.div
      key="delete-confirm-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110]"
      onClick={() => setShowDeleteConfirm(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 p-6"
        onClick={e => e.stopPropagation()}
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
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && renderMainModal()}
      {showDeleteConfirm && renderDeleteConfirmModal()}
    </AnimatePresence>
  );
};

export default StoriesModal;