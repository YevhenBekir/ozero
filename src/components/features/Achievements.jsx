import React from 'react';
import { Trophy, Star, AlertCircle } from 'lucide-react';

export const Achievements = ({
  unlockedAchievements = [],
  allAchievements = {},
  totalPoints = 0,
  newAchievement,
  onNewAchievementClose,
}) => {
  return (
    <div className="space-y-6">
      {/* Показуємо нове досягнення, якщо є */}
      {newAchievement && (
        <div className="fixed top-4 right-4 w-80 bg-yellow-100 border border-yellow-200 rounded-lg p-4 shadow-lg animate-slide-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <h4 className="font-medium text-yellow-800">Нове досягнення!</h4>
            </div>
            <button
              onClick={onNewAchievementClose}
              className="text-yellow-800 hover:text-yellow-900"
            >
              <AlertCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{newAchievement.icon}</span>
            <div>
              <p className="font-medium text-yellow-800">
                {newAchievement.title}
              </p>
              <p className="text-sm text-yellow-700">
                +{newAchievement.points} очків
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Загальний прогрес */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-medium text-gray-800">Досягнення</h3>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-medium text-gray-800">
              {totalPoints} очків
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {unlockedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 rounded-lg bg-yellow-50 border border-yellow-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-medium text-yellow-800">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-yellow-700">
                    {achievement.points} очків
                  </p>
                </div>
              </div>
              <p className="text-sm text-yellow-700">
                {achievement.description}
              </p>
            </div>
          ))}

          {unlockedAchievements.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>У вас поки немає досягнень</p>
              <p className="text-sm">
                Продовжуйте працювати над своїми історіями!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
