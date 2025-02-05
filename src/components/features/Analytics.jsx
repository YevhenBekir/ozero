// src/components/features/Analytics.jsx

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Award, Book, Target } from 'lucide-react';

const metricCards = [
  {
    id: 'improvement',
    icon: TrendingUp,
    title: 'Прогрес',
    getValue: (patterns) => `${patterns.improvementRate}%`,
    getSubtext: () => 'покращення',
  },
  {
    id: 'completion',
    icon: Award,
    title: 'Завершено',
    getValue: (patterns) => `${patterns.completionRate}%`,
    getSubtext: () => 'історій',
  },
  {
    id: 'average',
    icon: Book,
    title: 'Середній обсяг',
    getValue: (patterns) => patterns.averageWordCount,
    getSubtext: () => 'слів',
  },
  {
    id: 'detailed',
    icon: Target,
    title: 'Найдетальніше',
    getValue: (patterns) => patterns.mostDetailedSection,
    getSubtext: () => 'розділ',
  },
];

export const Analytics = ({ metrics, patterns }) => {
  if (!metrics || !patterns) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-center py-4">
        Завантаження аналітики...
      </div>
    );
  }

  const chartData = Object.entries(metrics.wordCount).map(
    ([section, count]) => ({
      name:
        section === 'situation'
          ? 'Ситуація'
          : section === 'task'
            ? 'Задача'
            : section === 'action'
              ? 'Дії'
              : section === 'result'
                ? 'Результат'
                : section,
      words: count,
    })
  );

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metricCards.map(({ id, icon: Icon, title, getValue, getSubtext }) => (
          <div
            key={id}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm 
                     border border-gray-100 dark:border-gray-600"
          >
            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 mb-2">
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {title}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {getValue(patterns)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getSubtext(patterns)}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm
                    border border-gray-100 dark:border-gray-600"
      >
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
          Розподіл слів по розділах
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }} />
              <YAxis tick={{ fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Bar dataKey="words" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
