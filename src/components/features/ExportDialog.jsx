// src/components/features/ExportDialog.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Settings, X, Check,
  FileJson, Globe, FileCode, Copy, Eye
} from 'lucide-react';
import { modalAnimations } from '@/utils/animations';
import { AnimatedButton, AnimatedCheckbox } from '@/components/common/AnimatedElements';

const exportFormats = [
  {
    id: 'txt',
    icon: FileText,
    label: 'Текстовий файл',
    description: 'Простий текстовий формат для легкого читання',
    preview: (story) => `
ОЗЕРО: Історія успіху

Ситуація:
${story.situation}

Задача:
${story.task}

Дії:
${story.action}

Результат:
${story.result}

Створено: ${new Date().toLocaleDateString('uk-UA')}
    `.trim()
  },
  {
    id: 'html',
    icon: Globe,
    label: 'Веб-сторінка',
    description: 'HTML документ з гарними стилями',
    preview: (story) => `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>ОЗЕРО: Історія успіху</title>
    <style>/* стилі */</style>
</head>
<body>
    <h1>Історія успіху</h1>
    <div class="content">
        <h2>Ситуація</h2>
        <p>${story.situation}</p>
        ...
    </div>
</body>
</html>`
  },
  {
    id: 'md',
    icon: FileCode,
    label: 'Markdown',
    description: 'Формат з розміткою для документації',
    preview: (story) => `# ОЗЕРО: Історія успіху\n\n## Ситуація\n${story.situation}\n\n...`
  },
  {
    id: 'json',
    icon: FileJson,
    label: 'JSON',
    description: 'Структуровані дані для інтеграції',
    preview: (story) => JSON.stringify(story, null, 2)
  }
];

export const ExportDialog = ({ story, isOpen, onClose, onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('txt');
  const [showPreview, setShowPreview] = useState(false);
  const [includeMetadata, setIncludeMetadata] = useState(false);
  const [includeTimestamp, setIncludeTimestamp] = useState(true);

  const handleExport = () => {
    const options = {
      format: selectedFormat,
      metadata: includeMetadata,
      timestamp: includeTimestamp
    };
    onExport(options);
    onClose();
  };

  const selectedFormatData = exportFormats.find(f => f.id === selectedFormat);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalAnimations.overlay}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            variants={modalAnimations.content}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full"
          >
            {/* Заголовок */}
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Експорт історії
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Основний контент */}
            <div className="p-6">
              {/* Формати */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {exportFormats.map((format) => (
                  <motion.button
                    key={format.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`p-4 rounded-lg border text-left transition-colors duration-200
                      ${
                        format.id === selectedFormat
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <format.icon className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {format.label}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {format.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Налаштування */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Налаштування
                </h4>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <AnimatedCheckbox
                      checked={includeMetadata}
                      onChange={setIncludeMetadata}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Додати метадані
                    </span>
                  </label>

                  <label className="flex items-center gap-2">
                    <AnimatedCheckbox
                      checked={includeTimestamp}
                      onChange={setIncludeTimestamp}
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Додати часову мітку
                    </span>
                  </label>
                </div>
              </div>

              {/* Превью */}
              {showPreview && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4" />
                    Превью
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-48">
                    <pre className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedFormatData.preview(story)}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Кнопки */}
            <div className="flex items-center justify-between px-6 py-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {showPreview ? 'Приховати превью' : 'Показати превью'}
              </button>
              <div className="flex items-center gap-3">
                <AnimatedButton variant="secondary" onClick={onClose}>
                  Скасувати
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  onClick={handleExport}
                  icon={Download}
                >
                  Експортувати
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Компонент опцій експорту
const ExportOptions = ({ format, onOptionChange, options }) => {
  const optionsConfig = {
    txt: [
      {
        id: 'includeDate',
        label: 'Додати дату',
        defaultValue: true
      },
      {
        id: 'includeTags',
        label: 'Додати теги',
        defaultValue: false
      }
    ],
    html: [
      {
        id: 'includeStyles',
        label: 'Включити стилі',
        defaultValue: true
      },
      {
        id: 'darkMode',
        label: 'Темна тема',
        defaultValue: false
      }
    ],
    md: [
      {
        id: 'includeMetadata',
        label: 'Додати метадані',
        defaultValue: true
      },
      {
        id: 'includeToc',
        label: 'Зміст',
        defaultValue: false
      }
    ],
    json: [
      {
        id: 'pretty',
        label: 'Форматований JSON',
        defaultValue: true
      },
      {
        id: 'includeStats',
        label: 'Додати статистику',
        defaultValue: false
      }
    ]
  };

  return (
    <div className="space-y-3">
      {optionsConfig[format]?.map(option => (
        <label key={option.id} className="flex items-center gap-2">
          <AnimatedCheckbox
            checked={options[option.id] ?? option.defaultValue}
            onChange={(checked) => onOptionChange(option.id, checked)}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

// Компонент превью експорту
const ExportPreview = ({ format, story, options }) => {
  const [copied, setCopied] = useState(false);

  const getPreviewContent = () => {
    switch (format) {
      case 'txt':
        return `
ОЗЕРО: Історія успіху
${options.includeDate ? `\nДата: ${new Date().toLocaleDateString('uk-UA')}` : ''}
\nСитуація:\n${story.situation}
\nЗадача:\n${story.task}
\nДії:\n${story.action}
\nРезультат:\n${story.result}
${options.includeTags ? '\nТеги: #озеро #успіх #досвід' : ''}
        `.trim();

      case 'html':
        return `<!DOCTYPE html>
<html lang="uk" ${options.darkMode ? 'class="dark"' : ''}>
<head>
    <meta charset="UTF-8">
    <title>ОЗЕРО: Історія успіху</title>
    ${options.includeStyles ? `<style>
        body { font-family: system-ui, sans-serif; line-height: 1.5; }
        .dark { background: #1a1a1a; color: #fff; }
    </style>` : ''}
</head>
<body>
    <h1>Історія успіху</h1>
    <div class="content">
        <h2>Ситуація</h2>
        <p>${story.situation}</p>
        <h2>Задача</h2>
        <p>${story.task}</p>
        <h2>Дії</h2>
        <p>${story.action}</p>
        <h2>Результат</h2>
        <p>${story.result}</p>
    </div>
</body>
</html>`;

      case 'md':
        return `# ОЗЕРО: Історія успіху

${options.includeMetadata ? `> Дата: ${new Date().toLocaleDateString('uk-UA')}
> Автор: ${story.author || 'Анонім'}` : ''}

${options.includeToc ? `## Зміст
- [Ситуація](#ситуація)
- [Задача](#задача)
- [Дії](#дії)
- [Результат](#результат)
` : ''}

## Ситуація
${story.situation}

## Задача
${story.task}

## Дії
${story.action}

## Результат
${story.result}`;

      case 'json':
        const data = {
          ...story,
          ...(options.includeStats && {
            stats: {
              wordCount: Object.values(story).reduce((acc, text) => 
                acc + text.split(/\s+/).length, 0),
              charCount: Object.values(story).reduce((acc, text) => 
                acc + text.length, 0),
              createdAt: new Date().toISOString()
            }
          })
        };
        return options.pretty 
          ? JSON.stringify(data, null, 2)
          : JSON.stringify(data);

      default:
        return 'Формат не підтримується';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getPreviewContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2">
        <AnimatedButton
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          icon={copied ? Check : Copy}
        >
          {copied ? 'Скопійовано' : 'Копіювати'}
        </AnimatedButton>
      </div>
      <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96 text-sm">
        {getPreviewContent()}
      </pre>
    </div>
  );
};

export default ExportDialog;