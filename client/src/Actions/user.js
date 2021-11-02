import { LOGIN, LOGOUT, AUTH } from '../Constants/actionTypes';
import * as API from '../API/index';

export const login = (formData, router) => async (dispatch) => {
    try {
        const { data } = await API.signIn(formData);

        dispatch({ type: LOGIN, data });

        localStorage.setItem('token', data.accessToken);

        router.push('/');
    } catch (err) {
        console.log(err);
    }
};

export const logout = (router) => async (dispatch) => {
    try {
        await API.logout();

        dispatch({ type: LOGOUT });

        localStorage.removeItem('token');

        router.push('/');
        //router.replace('/dashboard');
    } catch (err) {
        dispatch({ type: LOGOUT });

        localStorage.removeItem('token');

        router.push('/login');
    }
};

export const auth = () => async (dispatch) => {
    try {
        const { data } = await API.refresh();

        dispatch({ type: AUTH, data });

        localStorage.setItem('token', data.accessToken);

    } catch (err) {
        dispatch({ type: LOGOUT });

        localStorage.removeItem('token');

        console.log(err);
    }
}