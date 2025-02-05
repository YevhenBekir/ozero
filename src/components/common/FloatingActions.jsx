// src/components/common/FloatingActions.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Save, BookOpen, Award, HelpCircle, X } from 'lucide-react';

export const FloatingActions = ({
  onSave,
  onHelp,
  onShowStories,
  onShowAchievements,
  stories,
  achievements,
  unlockedAchievements,
  totalPoints,
  progress,
  onDeleteStory,
  onLoadStory,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Обробники подій
  const handleShowStories = () => {
    onShowStories();
    setIsOpen(false);
  };

  const handleShowAchievements = () => {
    onShowAchievements();
    setIsOpen(false);
  };

  const handleHelp = () => {
    onHelp();
    setIsOpen(false);
  };

  // Анімація для кнопок
  const buttonVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 },
  };

  // Анімація для лівої кнопки збереження
  const quickSaveVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <>
      {/* Кнопка швидкого збереження зліва */}
      <motion.div
        className="fixed bottom-4 left-4 z-40"
        variants={quickSaveVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          variants={quickSaveVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onSave}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 
                   text-white shadow-lg hover:bg-yellow-600 transition-colors duration-200"
        >
          <Save className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Основні плаваючі кнопки справа */}
      <div className="fixed bottom-4 right-4 z-40">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              className="absolute bottom-16 right-0 space-y-2"
            >
              <motion.button
                variants={buttonVariants}
                onClick={handleHelp}
                className="flex items-center justify-center w-12 h-12 rounded-full 
                         bg-blue-500 text-white shadow-lg hover:bg-blue-600 
                         transition-colors duration-200 group relative"
              >
                <HelpCircle className="w-5 h-5" />
                <span
                  className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-sm 
                               rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Допомога
                </span>
              </motion.button>

              <motion.button
                variants={buttonVariants}
                onClick={handleShowStories}
                className="flex items-center justify-center w-12 h-12 rounded-full 
                         bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 
                         transition-colors duration-200 group relative"
              >
                <BookOpen className="w-5 h-5" />
                <span
                  className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-sm 
                               rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Історії
                </span>
              </motion.button>

              <motion.button
                variants={buttonVariants}
                onClick={handleShowAchievements}
                className="flex items-center justify-center w-12 h-12 rounded-full 
                         bg-pink-500 text-white shadow-lg hover:bg-pink-600 
                         transition-colors duration-200 group relative"
              >
                <Award className="w-5 h-5" />
                <span
                  className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-sm 
                               rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Досягнення
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Головна кнопка */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-500 
                   text-white shadow-lg hover:bg-yellow-600 transition-colors duration-200"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>
    </>
  );
};

export default FloatingActions;
