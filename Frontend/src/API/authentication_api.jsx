import { axios } from "../import/all_import.jsx";

const BASE_URL = 'http://localhost:8000/api';

export const registerClient = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, formData);
    const { token, id } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('clientId', id);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering client:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const loginClient = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formData);
    const { token, client_id } = response.data;
    
    localStorage.setItem('token', token); 
    localStorage.setItem('clientId', client_id);

    console.log('Stored token:', localStorage.getItem('token'));
    console.log('Stored clientId:', localStorage.getItem('clientId'));

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Login failed' };
  }
};
