import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://10.116.28.1:8082', // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
  },
});


export default axiosInstance;

