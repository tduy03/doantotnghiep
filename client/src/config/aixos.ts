import axios from 'axios';

export const configAxios = () => {
    axios.defaults.baseURL = "http://127.0.0.1:8000";
    const token = localStorage.getItem('token');

    axios.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = ` Bearer ${token}`;
        }
        return config;
    })
};