// src/components/common/ProgressStats.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap } from 'lucide-react';

export const ProgressStats = ({ progress }) => {
  const { completedSteps, totalSteps, totalProgress } = progress;

  const cards = [
    {
      icon: Trophy,
      title: 'Завершено кроків',
      value: `${completedSteps}/${totalSteps}`,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 dark:bg-green-500/20',
    },
    {
      icon: Target,
      title: 'Загальний прогрес',
      value: `${Math.round(totalProgress)}%`,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10 dark:bg-yellow-500/20',
    },
    {
      icon: Zap,
      title: 'Залишилось',
      value: `${Math.round(100 - totalProgress)}%`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          variants={item}
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="card p-6 hover:shadow-lg transition-all duration-200"
        >
          <div
            className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center mb-4`}
          >
            <card.icon className={`w-6 h-6 ${card.color}`} />
          </div>

          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {card.title}
          </h4>

          <motion.p
            key={card.value}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-2xl font-bold mt-1 ${card.color}`}
          >
            {card.value}
          </motion.p>
        </motion.div>
      ))}
    </motion.div>
  );
};
