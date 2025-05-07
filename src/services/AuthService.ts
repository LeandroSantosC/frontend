import { UserData, UserLogin, UserRegister } from '../context/AuthContext'
import { request } from './api/request'

export const createAuthService = () => {
    return {
        login: (data: UserLogin) => request<string>({ method: 'POST', url: '/auth/login', data}),
        register: (data: UserRegister) => request<string>({ method: 'POST', url: '/auth/register', data}),
        getUser: () => request<UserData>({ method: 'GET', url: '/auth/user'}),
        updateUser: (data: UserRegister) => request<UserData>({ method: 'PATCH', url: '/auth/user', data}),
        deleteUser: (id: string) => request<UserData>({ method: 'DELETE', url: `/auth/user/${id}`}),
    }
}

