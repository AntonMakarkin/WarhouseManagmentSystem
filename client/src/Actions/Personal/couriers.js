import { START_LOADING, END_LOADING, FETCH_ALL, CREATE, LOGOUT } from '../../Constants/actionTypes';
import * as API from '../../API/index';

export const getCouriers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { users, currentPage, numberOfPages } } = await API.fetchUsers('couriers');

        dispatch({ type: FETCH_ALL, payload: { users, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const createCourier = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        console.log(post);
        const { data } = await API.createUser('couriers', post);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
}