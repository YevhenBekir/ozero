// src/components/features/ShareExportPanel.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  Download,
  Copy,
  Check,
  FileText,
  FileCode,
  FileJson,
  Globe,
  ChevronDown,
} from 'lucide-react';

export const ShareExportPanel = ({ story, onExport, onShare }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const exportFormats = [
    {
      id: 'txt',
      icon: FileText,
      label: 'Текстовий файл',
      description: 'Простий текстовий формат (.txt)',
    },
    {
      id: 'html',
      icon: Globe,
      label: 'Веб-сторінка',
      description: 'HTML документ з стилями (.html)',
    },
    {
      id: 'md',
      icon: FileCode,
      label: 'Markdown',
      description: 'Розмітка Markdown (.md)',
    },
    {
      id: 'json',
      icon: FileJson,
      label: 'JSON',
      description: 'Структуровані дані (.json)',
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(story, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleExport = (format) => {
    setSelectedFormat(format);
    onExport(format);
    setTimeout(() => setSelectedFormat(null), 1000);
    setShowExportMenu(false);
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Кнопка експорту */}
      <motion.div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="btn-secondary flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          <span>Експорт</span>
          <ChevronDown
            className={`w-4 h-4 transform transition-transform duration-200 
            ${showExportMenu ? 'rotate-180' : ''}`}
          />
        </motion.button>

        <AnimatePresence>
          {showExportMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg 
                       shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
            >
              {exportFormats.map((format) => (
                <motion.button
                  key={format.id}
                  whileHover={{ x: 5 }}
                  onClick={() => handleExport(format.id)}
                  className={`w-full px-4 py-2 flex items-start gap-3 text-left hover:bg-gray-50 
                    dark:hover:bg-gray-700 transition-colors duration-200
                    ${selectedFormat === format.id ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                >
                  <format.icon className="w-5 h-5 mt-0.5 text-gray-500 dark:text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {format.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {format.description}
                    </p>
                  </div>
                  {selectedFormat === format.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 text-green-500"
                    >
                      <Check className="w-full h-full" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Кнопка поділитися */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShare}
        className="btn-secondary flex items-center gap-2"
      >
        <Share2 className="w-5 h-5" />
        <span>Поділитися</span>
      </motion.button>

      {/* Кнопка копіювати */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCopy}
        className="btn-secondary relative"
      >
        {copied ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Check className="w-5 h-5 text-green-500" />
          </motion.div>
        ) : (
          <Copy className="w-5 h-5" />
        )}

        {/* Спливаюча підказка при копіюванні */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1
                       bg-black text-white text-xs rounded whitespace-nowrap"
            >
              Скопійовано !
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
