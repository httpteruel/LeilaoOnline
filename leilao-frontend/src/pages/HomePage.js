// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarLeiloes } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';
// Importa uma imagem placeholder ou crie uma no seu projeto
import placeholderImage from '../assets/placeholder-leilao.jpg'; // Crie esta imagem ou use uma URL externa

const HomePage = () => {
  const [leiloes, setLeiloes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const fetchLeiloes = async () => {
    try {
      const response = await listarLeiloes();
      setLeiloes(response.data);
    } catch (error) {
      setErro('Erro ao carregar a lista de leilões. Verifique se o backend está rodando.');
      console.error('Erro ao buscar leilões:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeiloes();
  }, []);

  const handleVerDetalhes = (id) => {
    navigate(`/leiloes/${id}`);
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <p>Carregando leilões abertos...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="section-title">Leilões Ativos</h1>
        {erro && <p className="error-message" style={{ textAlign: 'center' }}>{erro}</p>}

        <div className="leiloes-list-grid">
          {leiloes.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
              Nenhum leilão ativo encontrado. Adicione um para começar!
            </p>
          ) : (
            leiloes.map((leilao) => (
              <div key={leilao.id} className="leilao-card" onClick={() => handleVerDetalhes(leilao.id)}>
                <img
                  src={leilao.imageUrl || placeholderImage} // Usa a imagem do leilão ou o placeholder
                  alt={leilao.titulo}
                  onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Fallback se a URL da imagem falhar
                />
                <div className="card-content">
                  <h2>{leilao.titulo}</h2>
                  <p>{leilao.descricao.substring(0, 80)}...</p>
                  <div> {/* Para agrupar valor e data no final */}
                    <p className="valor-inicial">
                      Lance Inicial: R$ **{leilao.valorInicial ? leilao.valorInicial.toFixed(2) : '0.00'}**
                    </p>
                    <p className="data-fim">
                      Termina em: **{new Date(leilao.dataFim).toLocaleDateString()}**
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;