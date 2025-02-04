// src/hooks/useTemplates.js
import { useState, useEffect } from "react";
import { DEFAULT_TEMPLATES } from "../utils/constants";
import { storageService } from "../services/storage";

export const useTemplates = () => {
  const [templates, setTemplates] = useState(() => {
    const savedTemplates = storageService.get("ozero_templates");
    return savedTemplates || DEFAULT_TEMPLATES;
  });

  const [customTemplates, setCustomTemplates] = useState(() => {
    return storageService.get("ozero_custom_templates") || [];
  });

  // Зберігаємо зміни в localStorage
  useEffect(() => {
    storageService.set("ozero_templates", templates);
  }, [templates]);

  useEffect(() => {
    storageService.set("ozero_custom_templates", customTemplates);
  }, [customTemplates]);

  const addCustomTemplate = (category, template) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      isCustom: true,
    };

    if (templates[category]) {
      setTemplates((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          templates: [...prev[category].templates, newTemplate],
        },
      }));
    } else {
      setTemplates((prev) => ({
        ...prev,
        [category]: {
          id: category,
          title: template.categoryTitle || category,
          icon: "📝",
          templates: [newTemplate],
        },
      }));
    }
  };

  const deleteTemplate = (categoryId, templateId) => {
    setTemplates((prev) => {
      const category = prev[categoryId];
      if (!category) return prev;

      return {
        ...prev,
        [categoryId]: {
          ...category,
          templates: category.templates.filter((t) => t.id !== templateId),
        },
      };
    });
  };

  return {
    templates,
    customTemplates,
    addCustomTemplate,
    deleteTemplate,
  };
};
