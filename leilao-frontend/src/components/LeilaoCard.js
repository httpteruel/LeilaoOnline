import React from 'react';

const LeilaoCard = ({ leilao, onClick }) => {
    const data = new Date(leilao.dataFechamento).toLocaleDateString();
    const hora = new Date(leilao.dataFechamento).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="leilao-card" onClick={() => onClick(leilao)}>
            <div className="leilao-card-info">
                <p className="date-time">{data} às {hora}</p>
            </div>
            <img src={leilao.imagemUrl || 'https://via.placeholder.com/280x180.png?text=Leilao'} alt={leilao.titulo} className="leilao-card-image" />
            <div className="leilao-card-info">
                <h4>{leilao.titulo}</h4>
            </div>
        </div>
    );
};

export default LeilaoCard;