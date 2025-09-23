import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarLeiloes } from '../api';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import LeilaoCard from '../components/LeilaoCard';
import LeilaoModal from '../components/LeilaoModal.js';
import Footer from '../components/Footer.js';
import '../App.css';

const Dashboard = () => {
    const [leiloes, setLeiloes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const [selectedLeilao, setSelectedLeilao] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeiloes = async () => {
            try {
                const response = await listarLeiloes();
                const leiloesOrdenados = response.data.sort((a, b) => new Date(a.dataFechamento) - new Date(b.dataFechamento));
                setLeiloes(leiloesOrdenados);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    localStorage.removeItem('leilaoToken');
                    setErro('Sua sessão expirou. Por favor, faça login novamente.');
                    setTimeout(() => navigate('/'), 2000);
                } else {
                    setErro('Erro ao carregar a lista de leilões.');
                }
                console.error('Erro ao buscar leilões:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeiloes();
    }, [navigate]);

    const handleCardClick = (leilao) => {
        setSelectedLeilao(leilao);
    };

    const handleCloseModal = () => {
        setSelectedLeilao(null);
    };

    const handleDarLance = (leilaoId, valor) => {
        console.log(`Dando lance de R$${valor} no leilão ${leilaoId}`);
        // Implemente a chamada POST para /api/lances aqui
    };

    if (loading) {
        return (
            <div className="container" style={{ textAlign: 'center' }}>
                <p>Carregando leilões...</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Navbar />

            <div className="container">
                {erro && <p className="error-message" style={{ textAlign: 'center' }}>{erro}</p>}

                <h2 className="section-title">Leilões em Destaque</h2>
                <div className="leilao-card-container">
                    {leiloes.slice(0, 5).map(leilao => (
                        <LeilaoCard key={leilao.id} leilao={leilao} onClick={handleCardClick} />
                    ))}
                </div>

                <h2 className="section-title">Próximos Leilões</h2>
                <div className="leilao-card-container" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                    {leiloes.map(leilao => (
                        <LeilaoCard key={leilao.id} leilao={leilao} onClick={handleCardClick} />
                    ))}
                </div>
            </div>

            <LeilaoModal leilao={selectedLeilao} onClose={handleCloseModal} onDarLance={handleDarLance} />

            <Footer />
        </div>
    );
};

export default Dashboard;