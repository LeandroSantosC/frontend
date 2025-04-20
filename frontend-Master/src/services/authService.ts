import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Ajuste para a URL do seu backend

export interface RegisterData {
  username: string;
  email: string;
  password: string;
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