import axios from 'axios';
import Cookies from 'js-cookie';

const Api = axios.create({
    // Use environment variable for baseURL
    baseURL: import.meta.env.VITE_API_BASE_URL,

    // Set header axios
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

// Include Authorization Token if available
Api.interceptors.request.use(config => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Handle unauthenticated or forbidden responses
Api.interceptors.response.use(response => {
    return response;
}, error => {
    if (401 === error.response.status) {
        // Remove token and user data
        Cookies.remove('token');
        Cookies.remove('user');
        Cookies.remove('permissions');

        // Redirect to login page
        window.location = '/';
    } else if (403 === error.response.status) {
        // Redirect to forbidden page
        window.location = '/forbidden';
    } else {
        // Reject promise with error
        return Promise.reject(error);
    }
});

export default Api;
