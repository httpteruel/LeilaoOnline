import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Bem-vindo(a) à Plataforma de Leilões!</h1>
      <p className="mb-4">
        Descubra leilões incríveis ou cadastre-se para começar a dar lances.
      </p>
      <div className="flex space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Entrar
        </Link>
        <Link to="/cadastro" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
