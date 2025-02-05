// src/components/layout/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Сторінку не знайдено
        </h2>
        <p className="text-gray-500 mb-8">
          Вибачте, але сторінка, яку ви шукаєте, не існує.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          <Home className="w-5 h-5 mr-2" />
          На головну
        </button>
      </div>
    </div>
  );
};

export default NotFound;
