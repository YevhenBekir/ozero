// src/components/layout/NotFound.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  // Автоматично перенаправляємо на головну
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[70vh] flex items-center justify-center"
    >
      <div className="text-center">
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-6xl font-bold text-yellow-500 mb-4"
        >
          404
        </motion.h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Перенаправлення на головну...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Зачекайте, будь ласка, або натисніть кнопку нижче.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          <Home className="w-5 h-5 mr-2" />
          На головну
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NotFound;
