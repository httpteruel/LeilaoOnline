import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarLeiloes, criarLeilao } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdicionarLeilaoModal from '../components/AdicionarLeilaoModal';
import '../App.css';

const GerenciarLeiloes = () => {
    const [leiloes, setLeiloes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const [showAdicionarModal, setShowAdicionarModal] = useState(false);
    const navigate = useNavigate();

    const fetchLeiloes = async () => {
        try {
            const response = await listarLeiloes();
            // Apenas lista os leilões do usuário logado (opcional, pode listar todos)
            const leiloesDoUsuario = response.data.filter(leilao => leilao.emailCriador === 'admin@leilao.com');
            setLeiloes(leiloesDoUsuario);
        } catch (error) {
            setErro('Erro ao carregar a lista de leilões.');
            console.error('Erro ao buscar leilões:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('leilaoToken');
        if (!token) {
            alert('Você precisa estar logado para acessar esta página.');
            navigate('/');
        }
        fetchLeiloes();
    }, [navigate]);

    const handleAbrirAdicionarModal = () => {
        setShowAdicionarModal(true);
    };

    const handleFecharAdicionarModal = () => {
        setShowAdicionarModal(false);
    };

    const handleAdicionarNovoLeilao = async (novoLeilaoData) => {
        try {
            await criarLeilao(novoLeilaoData);
            alert('Leilão adicionado com sucesso!');
            fetchLeiloes(); // Recarrega a lista de leilões
        } catch (error) {
            alert('Erro ao adicionar o leilão.');
            console.error('Erro ao adicionar novo leilão:', error);
        }
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

            <div className="container">
                <h1 className="section-title">Gerenciar Leilões</h1>
                {erro && <p className="error-message" style={{ textAlign: 'center' }}>{erro}</p>}

                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                    <button className="add-leilao-btn" onClick={handleAbrirAdicionarModal}>Adicionar Novo Leilão</button>
                </div>
            </div>

            {showAdicionarModal && (
                <AdicionarLeilaoModal
                    onClose={handleFecharAdicionarModal}
                    onAdicionarLeilao={handleAdicionarNovoLeilao}
                />
            )}

            <Footer />
        </div>
    );
};

export default GerenciarLeiloes;