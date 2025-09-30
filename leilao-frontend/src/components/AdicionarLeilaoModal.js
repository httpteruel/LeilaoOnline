import React, { useState } from 'react';
import '../App.css'; // Importe seu arquivo CSS para estilização

const AdicionarLeilaoModal = ({ onClose, onAdicionarLeilao }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imageUrl, setImageUrl] = useState(''); // Estado para a URL da Imagem
    const [valorInicial, setValorInicial] = useState('');
    const [dataFim, setDataFim] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Formata a dataFim para o backend (ISO String)
        const dataFimFormatada = dataFim
            ? new Date(dataFim).toISOString()
            : null;

        const novoLeilaoData = {
            titulo,
            descricao,
            imageUrl, // Envia a URL da Imagem
            valorInicial: parseFloat(valorInicial),
            dataFim: dataFimFormatada,
        };

        // Chama a função passada pelo componente pai
        onAdicionarLeilao(novoLeilaoData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Adicionar Novo Leilão</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                    <input
                        type="url"
                        placeholder="URL da Imagem (Ex: https://site.com/foto.jpg)"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Valor Inicial (R$)"
                        value={valorInicial}
                        onChange={(e) => setValorInicial(e.target.value)}
                        required
                        min="0.01"
                        step="0.01"
                    />
                    <label>Data e Hora de Fim:</label>
                    <input
                        type="datetime-local"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                        required
                    />

                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">Adicionar</button>
                        {/* Botão para fechar o modal */}
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdicionarLeilaoModal;