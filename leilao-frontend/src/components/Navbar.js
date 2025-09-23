import React from 'react';

const Navbar = () => {
    const categorias = ['Automóveis', 'Imóveis', 'Jóias', 'Obras de Arte', 'Diversos'];
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {categorias.map((categoria, index) => (
                    <li key={index}>
                        <a href="#">{categoria}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;