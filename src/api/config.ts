import axios from 'axios';

export const API_CONFIG = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://www.omdbapi.com/',
});
