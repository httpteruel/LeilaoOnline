import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarLeilaoPorId, darLance } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';

// ID de Pessoa hardcoded APENAS PARA TESTE
// Você deve substituir isso pelo ID do usuário logado em uma aplicação real!
const ID_PESSOA_LOGADA = 5; // Use o ID de Pessoa VÁLIDO que você cadastrou

const DetalhesLeilao = () => {
    const { id } = useParams(); // Obtém o ID da URL
    const navigate = useNavigate();

    const [leilao, setLeilao] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const [novoLance, setNovoLance] = useState('');

    // Função para carregar os detalhes do leilão
    const fetchLeilao = async () => {
        try {
            const response = await buscarLeilaoPorId(id);
            setLeilao(response.data);
        } catch (error) {
            setErro('Erro ao carregar os detalhes do leilão.');
            console.error('Erro ao buscar leilão:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Validação básica se o usuário está logado
        const token = localStorage.getItem('leilaoToken');
        if (!token) {
            alert('Você precisa estar logado para ver os detalhes do leilão.');
            navigate('/login');
            return;
        }
        fetchLeilao();
    }, [id, navigate]); // Dependências do useEffect

    // Encontra o maior lance atual
    const getMaiorLance = () => {
        if (!leilao || !leilao.lances || leilao.lances.length === 0) {
            return leilao ? leilao.valorInicial : '0.00';
        }
        // Encontra o valor máximo entre os lances
        const maiorLance = leilao.lances.reduce((max, lance) =>
            lance.valor > max ? lance.valor : max, leilao.valorInicial);
        return maiorLance.toFixed(2);
    };

    // Função para submeter um novo lance
    const handleSubmitLance = async (e) => {
        e.preventDefault();

        if (parseFloat(novoLance) <= parseFloat(getMaiorLance())) {
            alert(`O lance deve ser maior que o lance atual de R$ ${getMaiorLance()}`);
            return;
        }

        try {
            const lanceParaEnviar = {
                valor: parseFloat(novoLance),
                pessoaId: ID_PESSOA_LOGADA, // ID do usuário logado (Ajuste o valor aqui!)
                leilaoId: leilao.id,
            };

            await darLance(lanceParaEnviar);

            alert('Lance realizado com sucesso!');
            setNovoLance(''); // Limpa o campo
            fetchLeilao(); // Recarrega os dados para mostrar o novo lance

        } catch (error) {
            console.error('Erro ao dar lance:', error.response ? error.response.data : error.message);
            alert(`Falha ao dar lance: ${error.response && error.response.data ? error.response.data : 'Erro desconhecido.'}`);
        }
    };

    if (loading) return <div className="container"><p>Carregando detalhes do leilão...</p></div>;
    if (erro) return <div className="container"><p className="error-message">{erro}</p></div>;
    if (!leilao) return <div className="container"><p>Leilão não encontrado.</p></div>;

    return (
        <div>
            <Header />
            <div className="container leilao-detalhes">
                <h1>{leilao.titulo}</h1>
                <p className="descricao">{leilao.descricao}</p>
                <p>Criador: **{leilao.criador ? leilao.criador.nome : 'Desconhecido'}**</p>
                <p>Categoria: **{leilao.categoria ? leilao.categoria.nome : 'N/A'}**</p>
                <p>Valor Inicial: R$ **{leilao.valorInicial.toFixed(2)}**</p>

                <hr />

                <div className="status-lance">
                    <h2>Lance Atual: <span className="lance-valor">R$ {getMaiorLance()}</span></h2>
                    <p>Fim do Leilão: **{new Date(leilao.dataFim).toLocaleString()}**</p>
                </div>

                {/* --- Formulário de Lance --- */}
                <form onSubmit={handleSubmitLance} className="lance-form">
                    <h3>Dar seu lance</h3>
                    <input
                        type="number"
                        placeholder={`Mínimo: R$ ${getMaiorLance()}`}
                        value={novoLance}
                        onChange={(e) => setNovoLance(e.target.value)}
                        min={parseFloat(getMaiorLance()) + 0.01}
                        step="0.01"
                        required
                    />
                    <button type="submit" className="btn-primary">
                        Enviar Lance
                    </button>
                </form>

                <hr />

                {/* --- Lista de Lances (simples) --- */}
                <h3>Histórico de Lances ({leilao.lances ? leilao.lances.length : 0})</h3>
                <ul className="lances-list">
                    {leilao.lances && leilao.lances.slice().reverse().map((lance) => ( // Reverse para mostrar o mais novo primeiro
                        <li key={lance.id}>
                            R$ **{lance.valor.toFixed(2)}** por {lance.pessoa ? lance.pessoa.nome : 'Usuário Anônimo'} em {new Date(lance.dataLance).toLocaleString()}
                        </li>
                    ))}
                </ul>

            </div>
            <Footer />
        </div>
    );
};

export default DetalhesLeilao;