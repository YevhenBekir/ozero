// src/components/layout/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навігація */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Логотип */}
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-yellow-600">ОЗЕРО</span>
              </Link>
            </div>

            {/* Мобільна кнопка меню */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Навігаційні посилання */}
            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
                >
                  Головна
                </Link>
                {/* Додайте інші посилання за потреби */}
              </div>
            </div>
          </div>
        </div>

        {/* Мобільне меню */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                Головна
              </Link>
              {/* Додайте інші мобільні посилання */}
            </div>
          </div>
        )}
      </nav>

      {/* Основний контент */}
      <main>{children}</main>

      {/* Футер */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ОЗЕРО. Всі права захищені.
          </p>
        </div>
      </footer>
    </div>
  );
};
