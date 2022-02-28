import { LOGIN, LOGOUT, REFRESH, LOGIN_ERROR } from '../Constants/actionTypes';
import * as API from '../API/index';

export const login = (formData, router) => async (dispatch) => {
    try {
        const { data } = await API.signIn(formData);

        dispatch({ type: LOGIN, data });

        router.push('/');
    } catch (err) {
        console.log(err);
        dispatch({ type: LOGIN_ERROR });
    }
};

export const logout = (router) => async (dispatch) => {
    try {
        await API.logout();

        dispatch({ type: LOGOUT });

        router.push('/');
    } catch (err) {
        dispatch({ type: LOGOUT });

        router.push('/login');
    }
};

export const refresh = (router) => async (dispatch) => {
    try {
        const { data } = await API.refresh();

        dispatch({ type: REFRESH, data });

    } catch (err) {
        console.log(err);
        
        dispatch({ type: LOGOUT });

        router.push('/login');
    }
}

