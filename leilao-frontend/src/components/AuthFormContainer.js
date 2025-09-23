// src/components/AuthFormContainer.js

import React from 'react';
import '../App.css'; // Importa o CSS global para estilização

const AuthFormContainer = ({ children, title }) => {
    return (
        <div className="elegant-container">
            <h1>{title}</h1>
            {children}
        </div>
    );
};

export default AuthFormContainer;