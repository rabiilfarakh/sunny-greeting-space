
import axios from 'axios';

// Définition de l'URL de base de l'API
const API_URL = '/api';

// Configuration d'Axios avec l'URL de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
