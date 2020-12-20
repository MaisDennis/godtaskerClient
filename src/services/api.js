import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://3.130.183.174:3333',
  baseURL: 'http://localhost:3333',
})

export default api;
