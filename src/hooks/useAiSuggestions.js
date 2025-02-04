// src/hooks/useAiSuggestions.js
import { useState, useEffect } from 'react';
import { aiSuggestionsService } from '../services/aiSuggestions';

export const useAiSuggestions = (field, content, context = {}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (!field) {
      setSuggestions([]);
      return;
    }

    const result = aiSuggestionsService.analyzeText(content, field, context);
    setSuggestions(result.suggestions);
    setAnalysis(result);
  }, [field, content, context]);

  return { suggestions, analysis };
};
