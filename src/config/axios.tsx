// Libraries
import axios from 'axios';
const token = localStorage.getItem('auth_token');

// axios instance with added authorization for the user to communicate with the api after login
const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
    },
});

export default instance;
