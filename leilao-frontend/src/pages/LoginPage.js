// src/pages/HomePage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import AuthFormContainer from '../components/AuthFormContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await login(email, senha);
      const { jwt } = response.data;

      localStorage.setItem('leilaoToken', jwt);

      console.log('Login bem-sucedido. Token:', jwt);

      // Redirecionamento condicional baseado no e-mail
      if (email === 'admin@leilao.com') {
        navigate('/gerenciar-leiloes');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      if (error.response && error.response.data) {
        setErro(error.response.data.message || 'Erro ao fazer login. Verifique suas credenciais.');
      } else {
        setErro('Erro de rede ou servidor. Tente novamente mais tarde.');
      }
      console.error('Erro de login:', error);
    }
  };

  return (
    <AuthFormContainer title="Bem-vindo ao Leilão Online">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="emailLogin">E-mail</label>
          <input
            id="emailLogin"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senhaLogin">Senha</label>
          <input
            id="senhaLogin"
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>

      {erro && <p className="error-message">{erro}</p>}

      <div className="button-group">
        <button onClick={() => navigate('/cadastro')} className="secondary-button">Não tem uma conta? Cadastre-se</button>
        <button onClick={() => navigate('/recuperar-senha')} className="secondary-button">Esqueceu a senha?</button>
      </div>
    </AuthFormContainer>
  );
};

export default LoginPage;