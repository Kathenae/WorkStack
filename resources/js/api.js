import axios from "axios";

const api = axios.create({
    baseURL: '/api/',
    headers: {
        'authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
})

export default api;
