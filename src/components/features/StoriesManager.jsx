// src/components/features/StoriesManager.jsx
import React from "react";
import { Trash2, Clock, Edit3 } from "lucide-react";

export const StoriesManager = ({ stories, onLoad, onDelete }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Збережені історії
      </h3>

      {stories.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          У вас поки немає збережених історій
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {stories.map((story) => (
            <div
              key={story.id}
              className="py-3 flex justify-between items-center"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">
                  {story.situation.slice(0, 50)}...
                </h4>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(story.savedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onLoad(story.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(story.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
