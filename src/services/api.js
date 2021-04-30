import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.142.16.89:3333',
  // baseURL: 'http://localhost:3333',
})

export default api;
