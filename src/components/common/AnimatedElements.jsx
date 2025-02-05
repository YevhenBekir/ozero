// src/components/common/AnimatedElements.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  buttonAnimations,
  hoverEffects,
  specialEffects,
} from '@/utils/animations';

// Анімована кнопка з ефектом натискання та світіння
export const AnimatedButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    outline: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50',
    ghost: 'hover:bg-yellow-50 text-yellow-500',
  };

  return (
    <motion.button
      whileHover={buttonAnimations.hover}
      whileTap={buttonAnimations.tap}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        relative rounded-lg font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {Icon && !loading && <Icon className="w-5 h-5" />}
        {loading ? (
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          />
        ) : (
          children
        )}
      </div>

      {/* Ефект натискання */}
      <motion.div
        initial={false}
        animate={props.pressed ? 'pressed' : 'idle'}
        variants={{
          pressed: { opacity: 0.4 },
          idle: { opacity: 0 },
        }}
        className="absolute inset-0 bg-black rounded-lg"
      />
    </motion.button>
  );
};

// Анімована картка з ефектами наведення
export const AnimatedCard = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      whileHover={hoverEffects.lift}
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-sm 
        border border-gray-200 dark:border-gray-700
        transition-colors duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Анімований бейдж з пульсацією
export const AnimatedBadge = ({
  children,
  variant = 'default',
  pulse = false,
}) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <motion.span
      animate={
        pulse
          ? {
              scale: [1, 1.1, 1],
              opacity: [1, 0.8, 1],
            }
          : undefined
      }
      transition={{
        duration: 1.5,
        repeat: pulse ? Infinity : 0,
        repeatType: 'reverse',
      }}
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variantClasses[variant]}
      `}
    >
      {children}
    </motion.span>
  );
};

// Анімований індикатор прогресу
export const AnimatedProgress = ({ value, max = 100 }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute top-0 left-0 h-full bg-yellow-500"
      />
      <motion.div
        animate={{
          x: ['0%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
      />
    </div>
  );
};

// Анімований перемикач (toggle)
export const AnimatedToggle = ({ checked, onChange }) => {
  return (
    <motion.button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative w-12 h-6 rounded-full transition-colors duration-200
        ${checked ? 'bg-yellow-500' : 'bg-gray-200 dark:bg-gray-700'}
      `}
    >
      <motion.div
        initial={false}
        animate={{
          x: checked ? 24 : 0,
        }}
        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full"
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
};

// Анімований чекбокс
export const AnimatedCheckbox = ({ checked, onChange }) => {
  return (
    <motion.button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`
        w-5 h-5 rounded border-2 transition-colors duration-200
        ${
          checked
            ? 'bg-yellow-500 border-yellow-500'
            : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600'
        }
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: checked ? 1 : 0,
          opacity: checked ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        viewBox="0 0 24 24"
        className="w-full h-full text-white stroke-current"
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path d="M20 6L9 17L4 12" />
      </motion.svg>
    </motion.button>
  );
};

// Анімований радіо-кнопка
export const AnimatedRadio = ({ checked, onChange }) => {
  return (
    <motion.button
      role="radio"
      aria-checked={checked}
      onClick={() => onChange()}
      className={`
        w-5 h-5 rounded-full border-2 transition-colors duration-200
        ${
          checked ? 'border-yellow-500' : 'border-gray-300 dark:border-gray-600'
        }
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: checked ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-2 h-2 mx-auto mt-1 bg-yellow-500 rounded-full"
      />
    </motion.button>
  );
};

// Анімований спінер завантаження
export const AnimatedSpinner = ({ size = 'md', color = 'yellow' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClasses = {
    yellow: 'border-yellow-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={`
        border-2 border-t-transparent rounded-full
        ${sizeClasses[size]}
        ${colorClasses[color]}
      `}
    />
  );
};

// Анімований скелетон для завантаження
export const AnimatedSkeleton = ({ width, height, className = '' }) => {
  return (
    <motion.div
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className={`
        bg-gray-200 dark:bg-gray-700 rounded
        ${className}
      `}
      style={{ width, height }}
    />
  );
};

export const AnimatedTooltip = ({ children, content }) => {
  return (
    <motion.div className="relative group">
      {children}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1
                 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0
                 group-hover:opacity-100 pointer-events-none"
      >
        {content}
        <div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                      border-4 border-transparent border-t-gray-900"
        />
      </motion.div>
    </motion.div>
  );
};

export default {
  AnimatedButton,
  AnimatedCard,
  AnimatedBadge,
  AnimatedProgress,
  AnimatedToggle,
  AnimatedCheckbox,
  AnimatedRadio,
  AnimatedSpinner,
  AnimatedSkeleton,
  AnimatedTooltip,
};
