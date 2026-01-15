import axios, { AxiosInstance } from "axios";


const API_BASE_URL = 'http://localhost:3000/api';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});