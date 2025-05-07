// api/helpers/request.ts
import api from './config';
import axios, { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
  success: boolean;
  response?: T;
  error?: string;
}

export async function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await api(config);
    return {
      success: response.data.success,
      response: response.data.data,
      error: response.data.error
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        error: `${error.response.status} - ${error.response.data.error || 'Erro na resposta'}`
      };
    }
    return { success: false, error: String(error) };
  }
}
