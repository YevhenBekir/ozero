// src/services/tips.js
const TIPS_CATEGORIES = {
  SITUATION: "situation",
  TASK: "task",
  ACTION: "action",
  RESULT: "result",
  EMOTION: "emotion",
  GENERAL: "general",
};

const TIPS_DATABASE = {
  [TIPS_CATEGORIES.SITUATION]: [
    {
      id: "sit_1",
      text: "Описуйте ситуацію конкретно - де, коли, з ким це сталось",
      condition: (story) => story.situation.length < 50,
    },
    {
      id: "sit_2",
      text: "Додайте контексту - що передувало ситуації?",
      condition: (story) =>
        !story.situation.includes("коли") && !story.situation.includes("після"),
    },
    {
      id: "sit_3",
      text: "Поясніть важливість ситуації - чому вона значуща для вас?",
      condition: (story) =>
        !story.situation.includes("важлив") &&
        !story.situation.includes("значу"),
    },
  ],
  [TIPS_CATEGORIES.TASK]: [
    {
      id: "task_1",
      text: "Опишіть конкретні цілі, яких ви хотіли досягти",
      condition: (story) => story.task.length < 40,
    },
    {
      id: "task_2",
      text: "Вкажіть обмеження та дедлайни, якщо вони були",
      condition: (story) =>
        !story.task.includes("термін") && !story.task.includes("дедлайн"),
    },
  ],
  [TIPS_CATEGORIES.ACTION]: [
    {
      id: "act_1",
      text: "Опишіть свої дії покроково - що ви зробили спочатку, що потім",
      condition: (story) =>
        !story.action.includes("спочатку") && !story.action.includes("потім"),
    },
    {
      id: "act_2",
      text: "Поясніть, чому ви обрали саме такі дії",
      condition: (story) =>
        !story.action.includes("тому що") && !story.action.includes("оскільки"),
    },
  ],
  [TIPS_CATEGORIES.RESULT]: [
    {
      id: "res_1",
      text: "Опишіть як конкретний, так і загальний результат",
      condition: (story) => story.result.length < 50,
    },
    {
      id: "res_2",
      text: "Що ви винесли з цієї ситуації? Чому навчились?",
      condition: (story) =>
        !story.result.includes("навч") && !story.result.includes("винес"),
    },
  ],
  [TIPS_CATEGORIES.EMOTION]: [
    {
      id: "emo_1",
      text: "Як ви почувались під час ситуації?",
      condition: (story, sentiment) =>
        sentiment && sentiment.energyLevel === "low",
    },
    {
      id: "emo_2",
      text: "Як змінились ваші емоції після вирішення ситуації?",
      condition: (story, sentiment) =>
        sentiment && sentiment.sentiment === "negative",
    },
  ],
  [TIPS_CATEGORIES.GENERAL]: [
    {
      id: "gen_1",
      text: "Спробуйте використати більше деталей у описі",
      condition: (story) =>
        Object.values(story).some((text) => text.length < 30),
    },
    {
      id: "gen_2",
      text: "Додайте часові маркери до вашої історії",
      condition: (story) =>
        !Object.values(story).some(
          (text) =>
            text.includes("коли") ||
            text.includes("після") ||
            text.includes("перед")
        ),
    },
  ],
};

export const tipsService = {
  // Отримання релевантних порад
  getTips(story, sentiment) {
    const relevantTips = [];

    Object.values(TIPS_CATEGORIES).forEach((category) => {
      const categoryTips = TIPS_DATABASE[category];
      const applicableTips = categoryTips.filter((tip) =>
        tip.condition(story, sentiment)
      );
      relevantTips.push(...applicableTips);
    });

    return relevantTips;
  },

  // Отримання специфічних порад для поля
  getFieldTips(field, story, sentiment) {
    const fieldCategory = field.toUpperCase();
    if (!TIPS_DATABASE[fieldCategory]) return [];

    return TIPS_DATABASE[fieldCategory].filter((tip) =>
      tip.condition(story, sentiment)
    );
  },

  // Отримання емоційних порад
  getEmotionalTips(sentiment) {
    if (!sentiment) return [];

    const emotionalTips = TIPS_DATABASE[TIPS_CATEGORIES.EMOTION];
    return emotionalTips.filter((tip) =>
      tip.condition(
        { situation: "", task: "", action: "", result: "" },
        sentiment
      )
    );
  },
};
