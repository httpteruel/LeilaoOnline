import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Leilão Online</h4>
                    <p>Seu destino para leilões de alta qualidade.</p>
                </div>
                <div className="footer-section">
                    <h4>Contato</h4>
                    <p>Email: contato@leilaoonline.com</p>
                    <p>Whatsapp: (XX) XXXX-XXXX</p>
                    <p>Telefone Fixo: (XX) XXXX-XXXX</p>
                </div>
            </div>
            <div className="footer-copyright">
                <p>&copy; {new Date().getFullYear()} Leilão Online. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;