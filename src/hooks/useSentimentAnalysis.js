// src/hooks/useSentimentAnalysis.js
import { useState, useEffect } from "react";
import { analyzeSentiment, getSuggestions } from "../services/sentiment";

export const useSentimentAnalysis = (text) => {
  const [analysis, setAnalysis] = useState({
    sentiment: "neutral",
    energyLevel: "medium",
    suggestions: "",
    stats: {
      positive: 0,
      negative: 0,
      energy: 0,
    },
  });

  useEffect(() => {
    if (!text) return;

    const result = analyzeSentiment(text);
    const suggestion = getSuggestions(result.sentiment, result.energyLevel);

    setAnalysis({
      ...result,
      suggestions: suggestion,
    });
  }, [text]);

  return analysis;
};
