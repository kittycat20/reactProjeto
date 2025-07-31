import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClienteFormPage from './pages/ClienteFormPage';
import ClienteListPage from './pages/ClienteListPage';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/cadastro" element={<ClienteFormPage />} />
          <Route path="/consulta" element={<ClienteListPage />} />
          <Route path="*" element={<ClienteFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;