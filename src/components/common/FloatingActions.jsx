// src/components/common/FloatingActions.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Save, BookOpen, Award, HelpCircle, X } from 'lucide-react';
import AchievementsModal from '../modals/AchievementsModal';
import StoriesModal from '../modals/StoriesModal';

export const FloatingActions = ({
  onSave,
  onHelp,
  stories,
  achievements,
  unlockedAchievements,
  totalPoints,
  progress,
  onDeleteStory,
  onLoadStory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showStoriesModal, setShowStoriesModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  const actions = [
    {
      icon: HelpCircle,
      label: 'Допомога',
      onClick: onHelp,
      color: 'bg-blue-500 hover:bg-blue-600',
      shortcut: 'Ctrl + H',
    },
    {
      icon: BookOpen,
      label: 'Історії',
      onClick: () => setShowStoriesModal(true),
      color: 'bg-indigo-500 hover:bg-indigo-600',
    },
    {
      icon: Award,
      label: 'Досягнення',
      onClick: () => setShowAchievementsModal(true),
      color: 'bg-pink-500 hover:bg-pink-600',
    },
    {
      icon: Save,
      label: 'Зберегти',
      onClick: onSave,
      color: 'bg-purple-500 hover:bg-purple-600',
      shortcut: 'Ctrl + S',
    },
  ];

  const containerVariants = {
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        {/* Floating Actions */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={containerVariants}
              className="absolute bottom-16 right-0 space-y-2"
            >
              {actions.map((action) => (
                <motion.div
                  key={action.label}
                  variants={itemVariants}
                  className="relative group"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      action.onClick();
                      if (!action.keepOpen) setIsOpen(false);
                    }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg
                             ${action.color} transition-colors duration-200`}
                  >
                    <action.icon className="w-5 h-5" />
                  </motion.button>

                  {/* Tooltip */}
                  <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div
                      className="bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      {action.label}
                      {action.shortcut && (
                        <span className="ml-2 opacity-75 text-xs">
                          ({action.shortcut})
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
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

      {/* Modals */}
      <AnimatePresence>
        {showStoriesModal && (
          <StoriesModal
            isOpen={showStoriesModal}
            onClose={() => setShowStoriesModal(false)}
            stories={stories}
            onDelete={onDeleteStory}
            onLoad={onLoadStory}
          />
        )}

        {showAchievementsModal && (
          <AchievementsModal
            isOpen={showAchievementsModal}
            onClose={() => setShowAchievementsModal(false)}
            achievements={achievements}
            unlockedAchievements={unlockedAchievements}
            totalPoints={totalPoints}
            progress={progress}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingActions;
