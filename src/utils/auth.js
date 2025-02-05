// src/utils/auth.js

// Токени і безпека
export const TOKEN_KEY = 'ozero_token';
export const USER_KEY = 'ozero_user';

// Функції роботи з токеном
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Функції роботи з даними користувача
export const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

// Перевірка автентифікації
export const isAuthenticated = () => {
  return !!getToken() && !!getUser();
};

// Перевірка чи токен дійсний
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expirationTime;
  } catch (error) {
    return false;
  }
};

// Отримання часу до закінчення токену
export const getTokenExpiration = (token) => {
  if (!token) return 0;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 - Date.now();
  } catch (error) {
    return 0;
  }
};