// src/components/features/ShareExportPanel.jsx
import React, { useState } from "react";
import { Share2, Download, Copy, Check, Loader } from "lucide-react";

export const ShareExportPanel = ({ story, onExport, onShare }) => {
  const [showFormats, setShowFormats] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await shareService.copyToClipboard(story);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => setShowFormats(!showFormats)}
          className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
        >
          <Download className="w-5 h-5" />
        </button>

        {showFormats && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            <button
              onClick={() => onExport("txt")}
              className="w-full px-4 py-2 text-left hover:bg-gray-50"
            >
              Текстовий файл (.txt)
            </button>
            <button
              onClick={() => onExport("html")}
              className="w-full px-4 py-2 text-left hover:bg-gray-50"
            >
              Веб-сторінка (.html)
            </button>
            <button
              onClick={() => onExport("md")}
              className="w-full px-4 py-2 text-left hover:bg-gray-50"
            >
              Markdown (.md)
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onShare}
        className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
      >
        <Share2 className="w-5 h-5" />
      </button>

      <button
        onClick={handleCopy}
        className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Copy className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
