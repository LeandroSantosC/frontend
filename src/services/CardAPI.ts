import axios from 'axios'
import config from './config'

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