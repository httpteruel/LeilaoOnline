import React from 'react';
import { FaSearch, FaBars, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="header">
            <div className="header-brand">Leilão Online</div>
            <div className="header-search">
                <input type="text" placeholder="Pesquisar leilões..." />
            </div>
            <div className="header-icons">
                <FaBars className="icon" />
                <FaUserCircle className="icon" />
            </div>
        </header>
    );
};

export default Header;