import Axios, { AxiosError } from 'axios';

export const url = `https://api-mailrion.herokuapp.com/api/v1/`

const httpService = Axios.create({
    baseURL: url
});

httpService.interceptors.request.use(async(config) => {
    const token = localStorage.getItem('token');
    //config.headers!['content-type'] = 'application/json';
    if (token === null) {
        return config;
    }
    config.headers!['authorization'] = `Bearer ${token}`;
    return config;
},  error => {
    return Promise.reject(error)
}); 

httpService.interceptors.response.use(function(data) {
    return data;
}, async function(error: AxiosError<any, any>) {
    
    if (!error.response) {
        return Promise.reject(error.message);
    }
    if (error.response?.data.message instanceof Array) {
        const msg = error.response?.data.message as Array<any>;        
        return Promise.reject(JSON.stringify(msg));
    } 
    if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.setItem('token', '')
    }
    return Promise.reject(error.response.data.message);
});

export default httpService;