import axios from 'axios';

const instance = axios.create({
    // Set your base URL here
    baseURL: 'https://hrmstest.neork.io/api',
    // baseURL: 'http://127.0.0.1:8000/api'
});

export default instance;
