// src/services/auth.js
const USERS_KEY = 'ozero_users';
const CURRENT_USER_KEY = 'ozero_current_user';

export const authService = {
  // Отримання користувачів
  getUsers() {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  },

  // Реєстрація
  register({ username, password, email }) {
    const users = this.getUsers();

    // Перевірка чи користувач існує
    if (users.find((u) => u.username === username || u.email === email)) {
      throw new Error('Користувач вже існує');
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      password, // В реальному проекті тут має бути хешування
      email,
      createdAt: new Date().toISOString(),
      profile: {
        achievements: [],
        totalPoints: 0,
        level: 1,
        streak: 0,
        lastActive: new Date().toISOString(),
      },
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  },

  // Вхід
  login({ username, password }) {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error('Неправильний логін або пароль');
    }

    // Оновлюємо lastActive
    const updatedUser = {
      ...user,
      profile: {
        ...user.profile,
        lastActive: new Date().toISOString(),
      },
    };

    // Оновлюємо користувача в базі
    this.updateUser(updatedUser);

    const { password: _, ...userWithoutPassword } = updatedUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  },

  // Вихід
  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Отримання поточного користувача
  getCurrentUser() {
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error reading current user:', error);
      return null;
    }
  },

  // Оновлення профілю
  updateUser(updatedUser) {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === updatedUser.id);

    if (index === -1) {
      throw new Error('Користувача не знайдено');
    }

    users[index] = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    if (this.getCurrentUser()?.id === updatedUser.id) {
      const { password: _, ...userWithoutPassword } = updatedUser;
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(userWithoutPassword)
      );
    }

    return updatedUser;
  },

  // Оновлення досягнень
  updateAchievements(userId, achievements) {
    const users = this.getUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) {
      throw new Error('Користувача не знайдено');
    }

    user.profile.achievements = achievements;
    user.profile.totalPoints = achievements.reduce(
      (total, ach) => total + ach.points,
      0
    );

    return this.updateUser(user);
  },
};
