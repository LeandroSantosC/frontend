import { UserData, UserLogin, UserRegister } from '../context/AuthContext'
import { config } from './api/config'
import { request } from './api/request'

export const createAuthService = () => {
    return {
        login: (data: UserLogin) => request<string>({ method: 'POST', url: '/auth/login', data}),
        loginGoogle: `${config.url}/oauth2/authorization/google`,
        logout: () => request<string>({ method: 'POST', url: '/auth/logout'}),
        register: (data: UserRegister) => request<string>({ method: 'POST', url: '/auth/register', data}),
        getUser: () => request<UserData>({ method: 'GET', url: '/auth/user'}),
        updateUser: (data: UserData) => request<UserData>({ method: 'PATCH', url: '/auth/user', data}),
        deleteUser: (id: string) => request<UserData>({ method: 'DELETE', url: `/auth/user/${id}`}),
        verifyEmail: (token: string) => request<string>({ method: 'GET', url: `/auth/verify-email?token=${token}`}),
    }
}

