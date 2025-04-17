import axios from 'axios'
import config from './config'
import { CardData } from '../components/Content/Card/Card'

export const getCards = async () => {
    try {
        const response = await axios.get(`${config.url}/api/card`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteCard = async (id: string) => {
    try {
        const response = await axios.delete(`${config.url}/api/card/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const createCard = async (data: CardData) => {
    try {
        const response = await axios.post(`${config.url}/api/card`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const updateCard = async (id: string, data: CardData) => {
    try {
        const response = await axios.patch(`${config.url}/api/card/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}

export const updateManyCards = async (data: CardData[]) => {
    try {
        const response = await axios.patch(`${config.url}/api/card`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}