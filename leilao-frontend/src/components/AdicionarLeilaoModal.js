import React, { useState } from 'react';

const AdicionarLeilaoModal = ({ onClose, onAdicionarLeilao }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valorInicial, setValorInicial] = useState('');
    const [dataFechamento, setDataFechamento] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titulo || !descricao || !valorInicial || !dataFechamento) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoLeilao = {
            titulo,
            descricao,
            valorInicial: parseFloat(valorInicial),
            dataFechamento: new Date(dataFechamento).toISOString(),
        };

        onAdicionarLeilao(novoLeilao);
        onClose(); // Fecha o modal após o envio
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <h2>Adicionar Novo Leilão</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ex: Obra de Arte Rara"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Detalhes sobre o item do leilão"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Valor Inicial (R$)</label>
                        <input
                            type="number"
                            value={valorInicial}
                            onChange={(e) => setValorInicial(e.target.value)}
                            placeholder="Ex: 5000.00"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Data de Fechamento</label>
                        <input
                            type="datetime-local"
                            value={dataFechamento}
                            onChange={(e) => setDataFechamento(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Adicionar Leilão</button>
                </form>
            </div>
        </div>
    );
};

export default AdicionarLeilaoModal;