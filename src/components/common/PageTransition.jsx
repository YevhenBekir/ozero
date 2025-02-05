// src/components/common/PageTransition.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransitions } from '@/utils/animations';

export const PageTransition = ({ children, location }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransitions}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Компонент для анімації появи елементів при скролі
export const ScrollReveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        type: 'spring',
        damping: 20,
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  );
};

// Компонент для анімації списків
export const AnimatedList = ({ children }) => {
  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.ul>
  );
};

// Компонент для анімації елементів списку
export const AnimatedListItem = ({ children }) => {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 },
      }}
    >
      {children}
    </motion.li>
  );
};

// Компонент для плавних переходів між значеннями
export const AnimatedValue = ({ value, prefix = '', suffix = '' }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {prefix}
      {value}
      {suffix}
    </motion.span>
  );
};

// Компонент для анімованих іконок
export const AnimatedIcon = ({ icon: Icon, animate = true, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={animate ? { rotate: 360 } : undefined}
      transition={{ duration: 0.6 }}
    >
      <Icon {...props} />
    </motion.div>
  );
};

// Компонент для анімованого індикатора завантаження
export const LoadingIndicator = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full"
    />
  );
};
