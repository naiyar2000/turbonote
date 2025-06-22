"use client"
import axios from "axios";


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
    },
})

const fetchWrapper = async (url: string) => {
    if (localStorage) {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
    return api.get(url)
        .then(response => response.data)
        .catch(error => {
            if( error.response && error.response.status === 404) {
                console.log('Resource not found:', error.response.data);
            } else {
                console.error('API Error:', error);
            }
            return error;
        });
}

const postWrapper = async (url: string, data: object) => {
    if (localStorage) {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
    return api.post(url, data)
        .then(response => response.data)
        .catch(error => {
            console.error('API Error:', error);
            throw error;
        });
}

const putWrapper = async (url: string, data: object) => {
    if (localStorage) {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
    return api.put(url, data)
        .then(response => response.data)
        .catch(error => {
            console.error('API Error:', error);
            throw error;
        });
}

const deleteWrapper = async (url: string) => {
    if (localStorage) {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
    return api.delete(url)
        .then(response => response.data)
        .catch(error => {
            console.error('API Error:', error);
            throw error;
        });
}


export { api, fetchWrapper, postWrapper, putWrapper, deleteWrapper };
