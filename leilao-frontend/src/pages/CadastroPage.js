import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarPessoa } from '../api';
import '../App.css';

const CadastroPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const response = await cadastrarPessoa({ nome, email, senha });
      console.log('Cadastro bem-sucedido:', response.data);
      setSucesso('Cadastro realizado com sucesso! Você já pode fazer login.');
      // Opcionalmente, redirecionar após um tempo
      // setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErro(error.response.data.message || 'Erro ao cadastrar. Tente novamente.');
      } else {
        setErro('Erro de rede ou servidor. Tente novamente mais tarde.');
      }
      console.error('Erro de cadastro:', error);
    }
  };

  return (
    <div className="container"> {/* Usa a classe container */}
      <h1>Cadastre-se</h1>
      <form onSubmit={handleCadastro}>
        <div className="form-group">
          <label htmlFor="nomeCadastro">Nome</label>
          <input
            id="nomeCadastro"
            type="text"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailCadastro">E-mail</label>
          <input
            id="emailCadastro"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senhaCadastro">Senha</label>
          <input
            id="senhaCadastro"
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmarSenhaCadastro">Confirmar Senha</label>
          <input
            id="confirmarSenhaCadastro"
            type="password"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      
      {erro && <p className="error-message">{erro}</p>}
      {sucesso && <p className="success-message">{sucesso}</p>}

      <div className="button-group">
        <button onClick={() => navigate('/')} className="secondary-button">Voltar para o Login</button>
      </div>
    </div>
  );
};

export default CadastroPage;