// src/components/modals/ExportModal.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileJson, X, Download, Check, Settings } from 'lucide-react';

const exportFormats = [
  {
    id: 'md',
    icon: FileText,
    label: 'Markdown',
    description: 'Текстовий формат з розміткою',
    options: {
      includeDate: true,
      includeMetadata: true,
      includeToc: true,
      includeStats: true,
    },
  },
  {
    id: 'json',
    icon: FileJson,
    label: 'JSON',
    description: 'Структурований формат даних',
    options: {
      includeMetadata: true,
      includeStats: true,
      pretty: true,
    },
  },
];

export const ExportModal = ({ isOpen, onClose, onExport, isExporting }) => {
  const [selectedFormat, setSelectedFormat] = useState('md');
  const [options, setOptions] = useState(
    exportFormats.find((f) => f.id === 'md').options
  );

  const handleFormatChange = (formatId) => {
    setSelectedFormat(formatId);
    setOptions(exportFormats.find((f) => f.id === formatId).options);
  };

  const handleOptionChange = (key) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExport = async () => {
    const success = await onExport(selectedFormat, options);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Експорт історії
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                     dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Format Selection */}
          <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Формат експорту
            </label>
            <div className="grid grid-cols-2 gap-4">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => handleFormatChange(format.id)}
                  className={`p-4 rounded-lg border text-left transition-colors duration-200
                    ${
                      format.id === selectedFormat
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <format.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format.label}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Налаштування
              </span>
            </div>
            {Object.entries(options).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleOptionChange(key)}
                  className="w-4 h-4 text-yellow-500 border-gray-300 rounded
                         focus:ring-yellow-500 dark:border-gray-600
                         dark:bg-gray-700"
                />
                <span className="select-none">
                  {key === 'includeDate' && 'Додати дату'}
                  {key === 'includeMetadata' && 'Додати метадані'}
                  {key === 'includeToc' && 'Додати зміст'}
                  {key === 'includeStats' && 'Додати статистику'}
                  {key === 'pretty' && 'Форматований JSON'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-6 border-t border-gray-200 dark:border-gray-700 
                     bg-gray-50 dark:bg-gray-800/50 rounded-b-lg"
        >
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 
                     hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg
                     transition-colors duration-200"
            >
              Скасувати
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg 
                     hover:bg-yellow-600 transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-2"
            >
              {isExporting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                  />
                  Експортую...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Експортувати
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExportModal;
