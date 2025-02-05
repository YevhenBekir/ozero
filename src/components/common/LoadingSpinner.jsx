// src/components/common/LoadingSpinner.jsx
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 'large', light = false }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-32 w-32',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`
          rounded-full 
          border-2 
          border-t-transparent 
          ${light ? 'border-white' : 'border-yellow-500'} 
          ${sizeClasses[size]}
        `}
      />
    </div>
  );
};

export default LoadingSpinner;
