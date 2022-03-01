import axios from 'axios';
import { useHistory } from 'react-router-dom'; 

const API = axios.create({
    withCredentials: true, 
    baseURL: 'http://localhost:5001' 
});

/*API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        //req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`; 
    }

    return req;
});*/

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

API.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            console.log(window.location.href);
            const response = await API.get('/admin/refresh', {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return API.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }
    return Promise.reject(error);
    //throw error;
})



export const fetchUsers = (typeUser, page) => API.get(`/${typeUser}?page=${page}`);
export const fetchUsersBySearch = (typeUser, searchQuery) => API.get(`/${typeUser}/search?searchQuery=${searchQuery.search}`);
export const createUser = (typeUser, newUser) => API.post(`/${typeUser}`, newUser);
export const deleteUser = (typeUser, id) => API.delete(`/${typeUser}/${id}`);

export const signIn = (formData) => API.post('/admin/login', formData);
export const logout = () => API.post('/admin/logout', {withCredentials: true});
export const refresh = () => API.get('/admin/refresh', {withCredentials: true});