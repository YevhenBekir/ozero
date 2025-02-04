// src/components/features/TemplateSelector.jsx
import React, { useState } from "react";
import { Search, Plus } from "lucide-react";

export const TemplateSelector = ({ templates, onSelect, onAdd }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredTemplates = selectedCategory
    ? { [selectedCategory]: templates[selectedCategory] }
    : templates;

  return (
    <div className="space-y-6">
      {/* Пошук та фільтри */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Пошук шаблонів..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full p-2 border border-gray-200 rounded-lg"
          />
        </div>
        <button
          onClick={onAdd}
          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Створити
        </button>
      </div>

      {/* Категорії */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full ${
            !selectedCategory
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Всі
        </button>
        {Object.values(templates).map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 ${
              selectedCategory === category.id
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <span>{category.icon}</span>
            {category.title}
          </button>
        ))}
      </div>

      {/* Список шаблонів */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(filteredTemplates).map((category) => (
          <React.Fragment key={category.id}>
            {category.templates
              .filter(
                (template) =>
                  template.title.toLowerCase().includes(search.toLowerCase()) ||
                  template.description
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((template) => (
                <div
                  key={template.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-yellow-500 cursor-pointer"
                  onClick={() => onSelect(template)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span>{category.icon}</span>
                    <h3 className="font-medium text-gray-800">
                      {template.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
