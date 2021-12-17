import axios from 'axios';

const API = axios.create({
    withCredentials: true, 
    baseURL: 'http://localhost:5001' 
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        //req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; 
    }

    return req;
});

export const fetchUsers = (typeUser) => API.get(`/${typeUser}`);

export const signIn = (formData) => API.post('/admin/login', formData);
export const logout = () => API.post('/admin/logout', {withCredentials: true});
export const refresh = () => API.get('/admin/refresh', {withCredentials: true});