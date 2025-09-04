import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const login = (email, senha) => {
  return api.post('/auth/login', { email, senha });
};

export const cadastrarPessoa = (dadosPessoa) => {
  return api.post('/pessoas/cadastro', dadosPessoa);
};

export const recuperarSenha = (email) => {
  return api.post('/auth/recuperar-senha', { email });
};

export const listarLeiloes = (token) => {
  return api.get('/leiloes', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;