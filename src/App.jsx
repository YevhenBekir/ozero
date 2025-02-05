// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, RequireAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import NotFound from './components/layout/NotFound';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import SuccessfulMircha from './components/SuccessfulMircha';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Публічні маршрути */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Приватні маршрути */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout>
                  <SuccessfulMircha />
                </Layout>
              </RequireAuth>
            }
          />

          {/* Маршрут 404 */}
          <Route path="*" element={<NotFound />} />

          {/* Перенаправлення на логін */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
