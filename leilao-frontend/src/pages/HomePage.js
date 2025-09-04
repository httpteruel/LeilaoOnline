import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import '../App.css';

const HomePage = () => {
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
      navigate('/dashboard');
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
    <div className="container">
      <h1>Bem-vindo ao Leilão Online</h1>
      
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
      
      <div className="button-group"> {/*-*/}
        <button onClick={() => navigate('/cadastro')} className="secondary-button">Não tem uma conta? Cadastre-se</button>
        <button onClick={() => navigate('/recuperar-senha')} className="secondary-button">Esqueceu a senha?</button>
      </div>
    </div>
  );
};

export default HomePage;