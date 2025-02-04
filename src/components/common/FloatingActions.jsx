// src/components/common/FloatingActions.jsx
import React, { useState } from "react";
import { Plus, Save, Download, Share2, HelpCircle } from "lucide-react";

export const FloatingActions = ({ onSave, onExport, onShare, onHelp }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Спливаючі кнопки */}
      <div
        className={`space-y-2 mb-2 transition-all duration-200 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <button
          onClick={onHelp}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
          title="Допомога (Ctrl + H)"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <button
          onClick={onShare}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
          title="Поділитися"
        >
          <Share2 className="w-5 h-5" />
        </button>

        <button
          onClick={onExport}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white shadow-lg hover:bg-yellow-600"
          title="Експортувати (Ctrl + E)"
        >
          <Download className="w-5 h-5" />
        </button>

        <button
          onClick={onSave}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white shadow-lg hover:bg-purple-600"
          title="Зберегти (Ctrl + S)"
        >
          <Save className="w-5 h-5" />
        </button>
      </div>

      {/* Головна кнопка */}
      <button
        onClick={toggleOpen}
        className={`flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500 text-white shadow-lg hover:bg-yellow-600 transition-transform duration-200 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
