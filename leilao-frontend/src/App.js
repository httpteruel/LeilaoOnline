// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import CadastroPage from './pages/CadastroPage';
import RecuperarSenhaPage from './pages/RecuperarSenhaPage';
import GerenciarLeiloes from './pages/GerenciarLeiloes'; // Importe a nova página

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
          <Route path="/gerenciar-leiloes" element={<GerenciarLeiloes />} /> {/* Nova rota */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;