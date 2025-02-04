// src/utils/constants.js
export const DEFAULT_TEMPLATES = {
  work: {
    id: "work",
    title: "Робочі ситуації",
    icon: "💼",
    templates: [
      {
        id: "work_challenge",
        title: "Складне завдання",
        description: "Для опису складних робочих ситуацій та їх вирішення",
        prompts: {
          situation:
            "Опишіть складне завдання, яке перед вами постало. Що зробило його складним?",
          task: "Які цілі ви мали досягти? Які обмеження існували?",
          action:
            "Які кроки ви зробили для вирішення завдання? Яку стратегію обрали?",
          result: "Якого результату досягли? Чому навчились?",
        },
      },
      {
        id: "work_conflict",
        title: "Конфліктна ситуація",
        description: "Для опису та аналізу конфліктних ситуацій",
        prompts: {
          situation: "Опишіть конфліктну ситуацію. Хто був залучений?",
          task: "Яке вирішення конфлікту було потрібно? Які були ваші цілі?",
          action:
            "Як ви діяли для вирішення конфлікту? Які техніки використовували?",
          result: "Як вирішився конфлікт? Які уроки ви винесли?",
        },
      },
    ],
  },
  personal: {
    id: "personal",
    title: "Особисті досягнення",
    icon: "🌟",
    templates: [
      {
        id: "personal_goal",
        title: "Досягнення мети",
        description: "Для аналізу шляху до особистих цілей",
        prompts: {
          situation:
            "Яку особисту мету ви перед собою поставили? Чому вона важлива?",
          task: "Які конкретні завдання потрібно було виконати? Які були перешкоди?",
          action: "Що ви робили для досягнення мети? Як долали перешкоди?",
          result: "Чого ви досягли? Як це вплинуло на ваше життя?",
        },
      },
      {
        id: "personal_change",
        title: "Особисті зміни",
        description: "Для аналізу процесу особистих змін",
        prompts: {
          situation: "Які зміни ви хотіли впровадити у своє життя? Чому?",
          task: "Які конкретні цілі ви поставили? Який був дедлайн?",
          action: "Як ви впроваджували зміни? Які методи використовували?",
          result: "Яких змін досягли? Як це вплинуло на ваше життя?",
        },
      },
    ],
  },
  learning: {
    id: "learning",
    title: "Навчання",
    icon: "📚",
    templates: [
      {
        id: "learning_skill",
        title: "Нова навичка",
        description: "Для аналізу процесу освоєння нових навичок",
        prompts: {
          situation: "Яку нову навичку ви вирішили опанувати? Чому?",
          task: "Якого рівня хотіли досягти? За який час?",
          action: "Як ви вчились? Які ресурси використовували?",
          result: "Чого навчились? Як це допомогло вам?",
        },
      },
    ],
  },
};
