// src/services/sentiment.js

// Простий аналіз настрою тексту на основі ключових слів
const POSITIVE_WORDS = [
  "радість",
  "щастя",
  "успіх",
  "перемога",
  "досягнення",
  "чудово",
  "прекрасно",
  "добре",
  "позитивно",
  "вдало",
  "енергійно",
];

const NEGATIVE_WORDS = [
  "сум",
  "невдача",
  "поразка",
  "погано",
  "важко",
  "складно",
  "проблема",
  "негативно",
  "втома",
  "розчарування",
];

const ENERGY_WORDS = [
  "енергія",
  "сила",
  "міць",
  "активність",
  "бадьорість",
  "наснага",
  "драйв",
  "запал",
  "ентузіазм",
];

export const analyzeSentiment = (text) => {
  const words = text.toLowerCase().split(/\s+/);

  let positiveCount = 0;
  let negativeCount = 0;
  let energyCount = 0;

  words.forEach((word) => {
    if (POSITIVE_WORDS.includes(word)) positiveCount++;
    if (NEGATIVE_WORDS.includes(word)) negativeCount++;
    if (ENERGY_WORDS.includes(word)) energyCount++;
  });

  // Визначаємо загальний настрій
  const sentiment =
    positiveCount > negativeCount
      ? "positive"
      : positiveCount < negativeCount
      ? "negative"
      : "neutral";

  // Визначаємо рівень енергії
  const energyLevel =
    energyCount > 2 ? "high" : energyCount > 0 ? "medium" : "low";

  return {
    sentiment,
    energyLevel,
    stats: {
      positive: positiveCount,
      negative: negativeCount,
      energy: energyCount,
    },
  };
};

export const getSuggestions = (sentiment, energyLevel) => {
  const suggestions = {
    high_energy: {
      positive:
        "Чудовий настрій! Використайте цю енергію для важливих завдань.",
      negative: "Спробуйте направити цю енергію в конструктивне русло.",
      neutral:
        "У вас багато енергії - визначте пріоритети для її використання.",
    },
    low_energy: {
      positive:
        "Хороший настрій, але потрібно відновити енергію. Зробіть паузу.",
      negative: "Варто відпочити та відновити сили. Все налагодиться.",
      neutral: "Знайдіть час для відновлення енергії.",
    },
    medium_energy: {
      positive: "Збалансований стан - відмінно для планування.",
      negative: "Спробуйте змінити діяльність для підняття настрою.",
      neutral: "Звичайний робочий настрій - продовжуйте в тому ж дусі.",
    },
  };

  return suggestions[`${energyLevel}_energy`][sentiment];
};
