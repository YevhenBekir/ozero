// src/components/layout/Layout.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  Award,
  BarChart2,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage and system preference
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const { user, logout } = useAuth();

  useEffect(() => {
    // Apply theme on mount and changes
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and navigation */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-yellow-600 dark:text-yellow-500">
                  ОЗЕРО
                </span>
              </Link>
            </div>

            {/* Right menu */}
            <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
              {/* Theme toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                         transition-colors duration-200"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Profile menu */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 
                           dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div
                    className="w-8 h-8 rounded-full bg-yellow-500 flex items-center 
                                justify-center text-white"
                  >
                    {user?.username?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-gray-700 dark:text-gray-200">
                    {user?.username}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 
                                bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                               hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Профіль
                    </Link>
                    <Link
                      to="/achievements"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                               hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Досягнення
                    </Link>
                    <Link
                      to="/statistics"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                               hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <BarChart2 className="w-4 h-4 mr-2" />
                      Статистика
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-700 
                               dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Вийти
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 
                         hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile menu items */}
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
                         dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Профіль
              </Link>
              <Link
                to="/achievements"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
                         dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Досягнення
              </Link>
              <Link
                to="/statistics"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
                         dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Статистика
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium 
                         text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Вийти
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ОЗЕРО. Всі права захищені.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
