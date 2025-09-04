import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  // A lógica do formulário de login virá aqui
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input type="email" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Senha:</label>
          <input type="password" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Entrar
        </button>
      </form>
      <p className="mt-4 text-center">
        Não tem uma conta? <Link to="/cadastro" className="text-blue-500 hover:underline">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default LoginPage;
