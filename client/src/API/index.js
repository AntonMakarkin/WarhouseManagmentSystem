import axios from 'axios';

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
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get('/admin/refresh', {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return API.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }
    throw error;
})



export const fetchUsers = (typeUser) => API.get(`/${typeUser}`);

export const signIn = (formData) => API.post('/admin/login', formData);
export const logout = () => API.post('/admin/logout', {withCredentials: true});
export const refresh = () => API.get('/admin/refresh', {withCredentials: true});