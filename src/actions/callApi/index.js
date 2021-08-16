import axios from 'axios'
import { API_ROOT } from 'utilities/const'

export const fetchBoardDetails = async (id) => {
    const request = await axios.get(`${API_ROOT}/boards/${id}`)

    return request.data
}