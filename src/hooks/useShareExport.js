// src/hooks/useShareExport.js
import { useState } from "react";
import { exportService, shareService } from "../services/export";

export const useShareExport = (story) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState(null);

  const exportStory = async (format) => {
    setIsExporting(true);
    setError(null);

    try {
      let content;
      switch (format) {
        case "txt":
          content = exportService.toText(story);
          break;
        case "html":
          content = exportService.toHTML(story);
          break;
        case "md":
          content = exportService.toMarkdown(story);
          break;
        default:
          throw new Error("Невідомий формат експорту");
      }

      const filename = exportService.generateFileName(story, format);
      exportService.downloadFile(content, filename);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  const shareStory = async () => {
    setIsSharing(true);
    setError(null);

    try {
      const shared = await shareService.shareStory(story);
      if (!shared) {
        await shareService.copyToClipboard(story);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  return {
    exportStory,
    shareStory,
    isExporting,
    isSharing,
    error,
  };
};
