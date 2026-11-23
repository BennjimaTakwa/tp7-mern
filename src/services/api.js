import axios from 'axios';

// QUAND DECLARER ? Une seule fois dans un module dedie src/services/api.js
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default api;
