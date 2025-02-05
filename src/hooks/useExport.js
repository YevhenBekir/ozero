// src/hooks/useExport.js

import { useState } from 'react';
import { exportService } from '@/services/export';

export const useExport = (story) => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  const exportToMarkdown = async (options = {}) => {
    try {
      setIsExporting(true);
      setError(null);

      const content = exportService.toMarkdown(story, options);
      const filename = exportService.generateFileName(story, 'md');
      exportService.downloadFile(content, filename);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJson = async (options = {}) => {
    try {
      setIsExporting(true);
      setError(null);

      const content = exportService.toJSON(story, options);
      const filename = exportService.generateFileName(story, 'json');
      exportService.downloadFile(content, filename);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  const exportStory = async (format = 'md', options = {}) => {
    switch (format) {
      case 'md':
        return exportToMarkdown(options);
      case 'json':
        return exportToJson(options);
      default:
        throw new Error(`Непідтримуваний формат: ${format}`);
    }
  };

  return {
    exportStory,
    isExporting,
    error,
  };
};
