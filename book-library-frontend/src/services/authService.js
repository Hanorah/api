import axios from 'axios';

export const register = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/register', {
            username,
            password
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:3000/auth/login', {
            username,
            password
        });
        return response.data.token; // Return the token
    } catch (error) {
        throw error;
    }
};
