import axios from 'axios';


const axiosAuthInstance = axios.create({
  baseURL: 'https://dhlconecta-qa-be.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosAuthInstance;

