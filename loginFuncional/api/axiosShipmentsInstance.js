// api/axiosShipmentsInstance.js
import axios from "axios";
import store from "../store/store";  // Asegúrate de importar el store desde el archivo correcto

const axiosShipmentInstance = axios.create({
  baseURL: 'https://dhlconecta-qa-be.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las solicitudes
axiosShipmentInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();  // Obtener el estado de Redux
    const token = state.auth.jwtToken;  // Recuperar el token desde Redux
    console.log('Token:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosShipmentInstance;
