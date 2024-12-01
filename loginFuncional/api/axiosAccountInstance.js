import axios from 'axios';

const axiosAccountInstance = axios.create({
  baseURL: 'http://10.116.28.1:8083',
  headers: {
    'Content-Type': 'application/json',
    //'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
  },
});

// Agregar un interceptor para incluir el Bearer token
/*axiosAccountInstance.interceptors.request.use(
    (config) => {
      const state = store.getState(); // Obtén el estado actual del store
      const token = state.auth.jwtToken; // Accede al token desde auth slice
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Agrega el token al header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
*/
  axiosAccountInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Token expirado o inválido');
      }
      if (error.response && error.response.status === 500) {
        console.error('Error del servidor:', error.response.data);
      }
      return Promise.reject(error);
    }
  );
  
  
export default axiosAccountInstance;
