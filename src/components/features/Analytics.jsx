// src/components/features/Analytics.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Award, Book, Target } from "lucide-react";

export const Analytics = ({ metrics, patterns }) => {
  if (!metrics || !patterns) {
    return <div>Завантаження аналітики...</div>;
  }

  // Підготовка даних для графіка
  const chartData = Object.entries(metrics.wordCount).map(
    ([section, count]) => ({
      name: section,
      words: count,
    })
  );

  return (
    <div className="space-y-6">
      {/* Ключові метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-yellow-600 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Прогрес</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {patterns.improvementRate}%
          </p>
          <p className="text-sm text-gray-600">покращення</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-yellow-600 mb-2">
            <Award className="w-5 h-5" />
            <span className="font-medium">Завершено</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {patterns.completionRate}%
          </p>
          <p className="text-sm text-gray-600">історій</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-yellow-600 mb-2">
            <Book className="w-5 h-5" />
            <span className="font-medium">Середній обсяг</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {patterns.averageWordCount}
          </p>
          <p className="text-sm text-gray-600">слів</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 text-yellow-600 mb-2">
            <Target className="w-5 h-5" />
            <span className="font-medium">Найдетальніше</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 capitalize">
            {patterns.mostDetailedSection}
          </p>
          <p className="text-sm text-gray-600">розділ</p>
        </div>
      </div>

      {/* Графік розподілу слів */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Розподіл слів по розділах
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="words" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
