import { AUTH } from '../Constants/actionTypes';
import * as API from '../API/index';

export const signin = (formData, router) => async (dispatch) => {
    try {
        const { data } = await API.signIn(formData);

        dispatch({ type: AUTH, data })

        router.push('/');
    } catch (err) {
        console.log(err);
    }
}