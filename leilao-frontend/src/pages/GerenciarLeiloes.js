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
            // Lógica para filtrar leilões (ajuste se necessário)
            const leiloesDoUsuario = response.data.filter(leilao => leilao.criador.email === 'admin@leilao.com');
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
            // *** PONTO CRÍTICO: USE IDs QUE EXISTEM NO SEU BANCO DE DADOS ***
            const leilaoParaEnviar = {
                ...novoLeilaoData,
                // Altere estes IDs (1 e 1) se eles não existirem no seu DB
                criadorId: 1,
                categoriaId: 1,
            };

            await criarLeilao(leilaoParaEnviar);

            alert('Leilão adicionado com sucesso!');
            fetchLeiloes(); // Recarrega a lista
            handleFecharAdicionarModal(); // Fecha o modal após sucesso
        } catch (error) {
            // Este alerta foi atualizado para indicar a provável causa do 400
            alert('Erro ao adicionar o leilão. Motivo provável: Criador ou Categoria não encontrados (verifique os IDs no DB).');
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

                {/* Adicione a listagem de leilões aqui */}
                <div className="leiloes-list">
                    {leiloes.length === 0 ? (
                        <p style={{ textAlign: 'center' }}>Nenhum leilão seu encontrado.</p>
                    ) : (
                        // Mapear e exibir os leilões
                        <p>Leilões do usuário serão listados aqui.</p>
                    )}
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