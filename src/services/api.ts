import axios from 'axios';
import { parseCookies } from 'nookies';



const Api = axios.create({ baseURL: 'http://localhost:8000' });


Api.interceptors.request.use(
    config => {
        const { 'algorif-token': token } = parseCookies();
        config.headers['authorization'] = token;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export { Api };