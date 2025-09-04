import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recuperarSenha } from '../api';
import '../App.css';

const RecuperarSenhaPage = () => {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      const response = await recuperarSenha(email);
      setMensagem(response.data.message || 'Se o e-mail estiver cadastrado, um link de recuperação será enviado para ele.');
    } catch (error) {
      if (error.response && error.response.data) {
        setErro(error.response.data || 'Erro ao tentar recuperar a senha.');
      } else {
        setErro('Erro de rede ou servidor. Tente novamente mais tarde.');
      }
      console.error('Erro de recuperação de senha:', error);
    }
  };

  return (
    <div className="container"> {/* Usa a classe container */}
      <h1>Recuperar Senha</h1>
      <p>Informe o e-mail cadastrado para receber o link de recuperação de senha.</p>
      <form onSubmit={handleRecuperarSenha}>
        <div className="form-group">
          <label htmlFor="emailRecuperacao">E-mail</label>
          <input
            id="emailRecuperacao"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar Link de Recuperação</button>
      </form>
      
      {mensagem && <p className="success-message">{mensagem}</p>}
      {erro && <p className="error-message">{erro}</p>}

      <div className="button-group">
        <button onClick={() => navigate('/')} className="secondary-button">Voltar para o Login</button>
      </div>
    </div>
  );
};

export default RecuperarSenhaPage;