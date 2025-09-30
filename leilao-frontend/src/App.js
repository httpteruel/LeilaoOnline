// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Nova HomePage (Listagem)
import LoginPage from './pages/LoginPage'; // Novo nome
import Dashboard from './pages/Dashboard';
import CadastroPage from './pages/CadastroPage';
import RecuperarSenhaPage from './pages/RecuperarSenhaPage';
import GerenciarLeiloes from './pages/GerenciarLeiloes';
import DetalhesLeilao from './pages/DetalhesLeilao';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Agora lista os leilões */}
          <Route path="/login" element={<LoginPage />} /> {/* Rota dedicada ao Login */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
          <Route path="/gerenciar-leiloes" element={<GerenciarLeiloes />} />
          <Route path="/leiloes/:id" element={<DetalhesLeilao />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;