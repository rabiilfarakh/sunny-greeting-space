
import axios from 'axios';

// Définition de l'URL de base de l'API
// Puisque nous sommes probablement en développement et utilisons des données fictives,
// nous pouvons utiliser une URL de base qui pointe vers un serveur de développement local
// ou une API de test
const API_URL = 'https://jsonplaceholder.typicode.com';

// Configuration d'Axios avec l'URL de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
