import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Ajuste para a URL do seu backend

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const register = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    console.log('Response:', response);
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error('Error details:', error.response || error);
    return {
      success: false,
      error: error.response?.data?.message || 'Erro ao cadastrar usuário. Por favor, verifique se todos os campos estão preenchidos corretamente.'
    };
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    const { token, user } = response.data;
    
    // Store token based on remember me preference
    if (data.rememberMe) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    
    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error('Error details:', error.response || error);
    return {
      success: false,
      error: error.response?.data?.message || 'Erro ao fazer login. Por favor, verifique suas credenciais.'
    };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

export const getStoredAuth = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  
  return {
    token,
    user: user ? JSON.parse(user) : null
  };
};

export const isAuthenticated = () => {
  const { token } = getStoredAuth();
  return !!token;
}; 