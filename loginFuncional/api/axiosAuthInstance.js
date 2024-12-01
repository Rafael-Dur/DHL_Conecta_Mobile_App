import axios from 'axios';


const axiosAuthInstance = axios.create({
  baseURL: 'http://10.116.28.1:8082',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosAuthInstance;

