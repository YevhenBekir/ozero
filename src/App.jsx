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
  // Визначаємо базовий шлях для GitHub Pages
  const basePath = '/ozero';

  return (
    <Router basename={basePath}>
      <AuthProvider>
        <Routes>
          {/* Публічні маршрути */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Головний маршрут */}
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
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
