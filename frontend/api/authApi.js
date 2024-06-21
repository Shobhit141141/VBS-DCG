import axios from 'axios';

export const server_uri = import.meta.env.VITE_APP_SERVER_URL;

export const registerUser = async (credentials) => {
  const res = await axios.post(`${server_uri}/auth/signup`, {
    name: credentials.name,
    email: credentials.email,
    password: credentials.password,
  });
  return res;
};

export const loginUser = async (credentials) => {
  const res = await axios.post(`${server_uri}/auth/login`, {
    email: credentials.email,
    password: credentials.password,
  });
  return res;
};

export const verifyJWT = async () => {
  const res = await axios.get(`${server_uri}/auth/verify-jwt`, {
    headers: { Authorization: localStorage.getItem('token') },
  });
  return res;
};
