// src/components/features/AchievementsProgress.jsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const AchievementsProgress = ({ progress }) => {
  if (!progress) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="relative">
        <div className="w-20 h-20 mx-auto">
          <CircularProgressbar
            value={progress.storiesProgress}
            text={`${Math.round(progress.storiesProgress)}%`}
            styles={buildStyles({
              pathColor: "#F59E0B",
              textColor: "#F59E0B",
              trailColor: "#FEF3C7",
            })}
          />
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">Історії</p>
      </div>

      <div className="relative">
        <div className="w-20 h-20 mx-auto">
          <CircularProgressbar
            value={progress.emotionalProgress}
            text={`${Math.round(progress.emotionalProgress)}%`}
            styles={buildStyles({
              pathColor: "#F59E0B",
              textColor: "#F59E0B",
              trailColor: "#FEF3C7",
            })}
          />
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">Емоції</p>
      </div>

      <div className="relative">
        <div className="w-20 h-20 mx-auto">
          <CircularProgressbar
            value={progress.streakProgress}
            text={`${Math.round(progress.streakProgress)}%`}
            styles={buildStyles({
              pathColor: "#F59E0B",
              textColor: "#F59E0B",
              trailColor: "#FEF3C7",
            })}
          />
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">Серія</p>
      </div>
    </div>
  );
};
