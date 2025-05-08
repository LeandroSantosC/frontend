import axios from 'axios'
import config from './api/config'

export const getBoards = async () => {
    try {
        const response = await axios.get(`${config}/api/board`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return { success: true, response }
    } catch (error) {
        return { success: false, error }
    }
}