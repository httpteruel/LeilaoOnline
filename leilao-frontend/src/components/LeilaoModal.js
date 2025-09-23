import React from 'react';

const LeilaoModal = ({ leilao, onClose, onDarLance }) => {
    if (!leilao) return null;

    const handleDarLance = () => {
        const valorLance = prompt("Digite o valor do seu lance:");
        if (valorLance) {
            onDarLance(leilao.id, parseFloat(valorLance));
        }
    };

    const dataInicio = new Date(leilao.dataCriacao).toLocaleString();
    const dataFim = new Date(leilao.dataFechamento).toLocaleString();

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <div className="modal-header">
                    <h2>{leilao.titulo}</h2>
                </div>
                <div className="modal-body">
                    <img src={leilao.imagemUrl || 'https://via.placeholder.com/400x300.png?text=Leilao'} alt={leilao.titulo} className="modal-image" />
                    <p><strong>Descrição:</strong> {leilao.descricao}</p>
                    <p><strong>Valor Inicial:</strong> R$ {leilao.lanceInicial}</p>
                    <p><strong>Data de Criação:</strong> {dataInicio}</p>
                    <p><strong>Data de Encerramento:</strong> {dataFim}</p>
                    <p><strong>Número de Lances:</strong> {leilao.lances.length}</p>
                    <div className="modal-actions">
                        <button onClick={handleDarLance}>Dar Lance</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeilaoModal;