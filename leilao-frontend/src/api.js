import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const login = async (email, senha) => {
  return await api.post('/auth/login', { email, senha });
};

export const cadastrarPessoa = async (pessoaData) => {
  // Altere 'auth/cadastro' para 'pessoas/cadastro'
  return await api.post('/pessoas/cadastro', pessoaData);
};

export const recuperarSenha = async (email) => {
  return await api.post('/auth/recuperar-senha', { email });
};

export const listarLeiloes = async () => {
  const token = localStorage.getItem('leilaoToken');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return await api.get('/leiloes', { headers });
};

export const criarLeilao = async (leilaoData) => {
  const token = localStorage.getItem('leilaoToken');
  if (!token) {
    throw new Error('Usuário não autenticado.');
  }
  return await api.post('/leiloes', leilaoData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

};

export const darLance = (lanceData) => {
  // Note que 'lanceData' já é o objeto DTO (valor, pessoaId, leilaoId)
  const token = localStorage.getItem('leilaoToken');
  return api.post('/lances', lanceData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const buscarLeilaoPorId = (leilaoId) => {
  return api.get(`/leiloes/${leilaoId}`);
};

