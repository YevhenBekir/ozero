// src/hooks/useKeyboardShortcuts.js
import { useEffect } from "react";

export const useKeyboardShortcuts = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + S для збереження
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handlers.onSave?.();
      }

      // Ctrl/Cmd + E для експорту
      if ((event.ctrlKey || event.metaKey) && event.key === "e") {
        event.preventDefault();
        handlers.onExport?.();
      }

      // Ctrl/Cmd + H для показу допомоги
      if ((event.ctrlKey || event.metaKey) && event.key === "h") {
        event.preventDefault();
        handlers.onHelp?.();
      }

      // Esc для закриття модальних вікон
      if (event.key === "Escape") {
        handlers.onEscape?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
};
