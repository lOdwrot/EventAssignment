import axios from 'axios'

export const saveEventAssignment = (data) => {
    return axios.post('/eventAssignment', data)
}