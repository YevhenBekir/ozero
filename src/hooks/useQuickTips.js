// src/hooks/useQuickTips.js
import { useState, useEffect } from "react";
import { tipsService } from "../services/tips";

export const useQuickTips = (story, sentiment, currentField = null) => {
  const [tips, setTips] = useState([]);
  const [fieldTips, setFieldTips] = useState([]);

  // Оновлюємо загальні поради
  useEffect(() => {
    const relevantTips = tipsService.getTips(story, sentiment);
    setTips(relevantTips);
  }, [story, sentiment]);

  // Оновлюємо поради для конкретного поля
  useEffect(() => {
    if (currentField) {
      const relevantFieldTips = tipsService.getFieldTips(
        currentField,
        story,
        sentiment
      );
      setFieldTips(relevantFieldTips);
    } else {
      setFieldTips([]);
    }
  }, [currentField, story, sentiment]);

  return { tips, fieldTips };
};
