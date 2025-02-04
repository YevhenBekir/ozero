// src/services/aiSuggestions.js
// Шаблони підказок для кожного поля
const AI_PROMPT_TEMPLATES = {
  situation: {
    empty: [
      'З чого все почалось?',
      'Що привело до цієї ситуації?',
      'Хто був залучений?',
      'Коли це сталось?',
    ],
    short: [
      'Додайте більше контексту про обставини',
      'Опишіть, що передувало ситуації',
      'Вкажіть, чому ця ситуація важлива',
    ],
    improvement: [
      'Спробуйте описати емоції, які ви відчували',
      'Додайте деталі про місце та час',
      'Опишіть реакції інших учасників',
    ],
  },
  task: {
    empty: [
      'Яку мету ви ставили?',
      'Які були обмеження?',
      'Який результат очікувався?',
    ],
    short: [
      'Конкретизуйте свої цілі',
      'Опишіть критерії успіху',
      'Вкажіть часові рамки',
    ],
    improvement: [
      'Розділіть задачу на менші підцілі',
      'Опишіть, чому ці цілі були важливі',
      'Додайте інформацію про ресурси',
    ],
  },
  action: {
    empty: [
      'Які кроки ви зробили?',
      'Як ви почали діяти?',
      'Яку стратегію обрали?',
    ],
    short: [
      'Опишіть свої дії детальніше',
      'Додайте послідовність кроків',
      'Вкажіть, чому обрали саме такі дії',
    ],
    improvement: [
      'Опишіть альтернативи, які розглядали',
      'Додайте деталі про взаємодію з іншими',
      'Вкажіть, як долали перешкоди',
    ],
  },
  result: {
    empty: [
      'Чого вдалося досягти?',
      'Які зміни відбулися?',
      'Який досвід отримали?',
    ],
    short: [
      'Опишіть конкретні результати',
      'Додайте, чому навчились',
      'Порівняйте з очікуваннями',
    ],
    improvement: [
      'Проаналізуйте вплив на майбутнє',
      'Опишіть реакцію оточуючих',
      'Додайте висновки для майбутнього',
    ],
  },
};

const KEYWORDS = {
  time: ['коли', 'тоді', 'після', 'перед', 'під час'],
  emotion: ['відчував', 'почувався', 'емоції', 'настрій'],
  action: ['зробив', 'виконав', 'реалізував', 'організував'],
  result: ['досяг', 'отримав', 'здобув', 'навчився'],
};

export const aiSuggestionsService = {
  // Аналіз тексту та генерація підказок
  analyzeText(text, field, context = {}) {
    if (!field || !AI_PROMPT_TEMPLATES[field]) {
      return {
        type: 'empty',
        suggestions: [],
      };
    }

    // Якщо текст порожній
    if (!text || text.trim().length === 0) {
      return {
        type: 'empty',
        suggestions: this.getRandomSuggestions(field, 'empty'),
      };
    }

    // Якщо текст короткий
    if (text.length < 50) {
      return {
        type: 'short',
        suggestions: this.getRandomSuggestions(field, 'short'),
      };
    }

    // Аналіз для покращення
    const analysis = this.analyzeContent(text, field);
    return {
      type: 'improvement',
      suggestions: this.getImprovementSuggestions(field, analysis),
    };
  },

  // Аналіз контенту
  analyzeContent(text, field) {
    const words = text.toLowerCase().split(/\s+/);
    const analysis = {
      hasTimeMarkers: words.some((word) => KEYWORDS.time.includes(word)),
      hasEmotions: words.some((word) => KEYWORDS.emotion.includes(word)),
      hasActions: words.some((word) => KEYWORDS.action.includes(word)),
      hasResults: words.some((word) => KEYWORDS.result.includes(word)),
      wordCount: words.length,
    };

    return analysis;
  },

  // Отримання випадкових підказок
  getRandomSuggestions(field, type, count = 2) {
    if (!AI_PROMPT_TEMPLATES[field] || !AI_PROMPT_TEMPLATES[field][type]) {
      return [];
    }

    const templates = AI_PROMPT_TEMPLATES[field][type];
    const shuffled = [...templates].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  // Генерація підказок для покращення
  getImprovementSuggestions(field, analysis) {
    const suggestions = [];

    if (!analysis.hasTimeMarkers) {
      suggestions.push('Додайте часові маркери до опису');
    }
    if (!analysis.hasEmotions) {
      suggestions.push('Опишіть свої емоції та відчуття');
    }
    if (!analysis.hasActions && field === 'action') {
      suggestions.push('Додайте більше конкретних дій');
    }
    if (!analysis.hasResults && field === 'result') {
      suggestions.push('Конкретизуйте досягнуті результати');
    }

    if (suggestions.length === 0) {
      return this.getRandomSuggestions(field, 'improvement');
    }

    return suggestions;
  },
};
