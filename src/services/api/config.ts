/**********************************************/
/******CONFIGURAÇÕES DE DESENVOLVIMENTO********/

import axios from "axios";

//  URL BACKEND
const configURL = true
//  true: usando o Koeyb como backend
//  false: usando localhost como backend
/**********************************************/

export const config = {
    url: configURL ? "https://wasteful-rochell-fatec-aa30349c.koyeb.app" : "http://localhost:8080",
}

const api = axios.create({
    baseURL: `${config.url}`,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') ?? sessionStorage.getItem('token'); // pega o token salvo no login

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // adiciona o token no header
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api