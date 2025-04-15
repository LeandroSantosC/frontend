import axios from 'axios'
import config from './config'

export const getCards = async () => {
    try {
        console.log('Fetching cards from:', `${config.url}/api/card`)
        const response = await axios.get(`${config.url}/api/card`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log('Cards response:', response.data)
        return { success: true, response }
    } catch (error) {
        console.error('Error fetching cards:', error)
        return { success: false, error }
    }
}

export const deleteCard = async (id: number) => {
    try {
        console.log('Deleting card:', id)
        const response = await axios.delete(`${config.url}/api/card/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log('Delete response:', response.data)
        return { success: true, response }
    } catch (error) {
        console.error('Error deleting card:', error)
        return { success: false, error }
    }
}