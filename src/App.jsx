// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuccessfulMircha from './components/SuccessfulMircha';
import { Layout } from './components/layout/Layout';
import { NotFound } from './components/layout/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SuccessfulMircha />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;