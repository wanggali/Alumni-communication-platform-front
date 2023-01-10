import axios, {AxiosInstance} from 'axios';

const myAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:9001/api/',
    timeout: 5000,
});

myAxios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

myAxios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default myAxios;
