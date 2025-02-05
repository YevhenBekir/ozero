// Базові варіанти анімацій для елементів
export const baseVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Анімації для появи контенту
export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

// Ефекти наведення
export const hoverEffects = {
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
  glow: {
    whileHover: {
      boxShadow: '0 0 8px rgba(250, 204, 21, 0.4)',
      transition: { duration: 0.2 },
    },
  },
  lift: {
    whileHover: { y: -4 },
    transition: { type: 'spring', stiffness: 400 },
  },
};

// Анімації для списків
export const listAnimations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  },
};

// Анімації для модальних вікон
export const modalAnimations = {
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
  },
};

// Анімації для сповіщень
export const notificationAnimations = {
  initial: {
    opacity: 0,
    x: 100,
    y: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.2,
    },
  },
};

// Анімації для кнопок
export const buttonAnimations = {
  tap: {
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 400,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
    },
  },
};

// Спеціальні ефекти
export const specialEffects = {
  ripple: {
    initial: { scale: 0, opacity: 0.8 },
    animate: {
      scale: 2,
      opacity: 0,
      transition: { duration: 0.4 },
    },
  },
  bounce: {
    initial: { y: -10 },
    animate: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
  },
  rotate: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 0.6 },
  },
};

// Анімації для виділення елементів
export const highlightAnimations = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
  glow: {
    boxShadow: [
      '0 0 0 rgba(250, 204, 21, 0)',
      '0 0 8px rgba(250, 204, 21, 0.6)',
      '0 0 0 rgba(250, 204, 21, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

// Анімації для переходів між станами
export const stateTransitions = {
  success: {
    scale: [1, 1.2, 1],
    rotate: [0, 360, 360],
    transition: {
      duration: 0.6,
      times: [0, 0.6, 1],
    },
  },
  error: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};
