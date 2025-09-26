import api from '../api';

export const login = async (email, password) => {
  await api.get('/sanctum/csrf-cookie');
  const response = await api.post('/api/login', { email, password });
  console.log(response.data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/api/logout');
  return response.data;
};

export const getUser = async () => {
  const response = await api.get('/api/me');
  return response.data;
};


export const register = async (name, email, password, password_confirmation) => {
  await api.get('/sanctum/csrf-cookie');

  const response = await api.post('/api/register', { 
    name, 
    email, 
    password, 
    password_confirmation 
  });

  return response.data;
};
