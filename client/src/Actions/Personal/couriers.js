import { START_LOADING, END_LOADING, FETCH_ALL, CREATE, FETCH_BY_SEARCH } from '../../Constants/actionTypes';
import * as API from '../../API/index';

export const getCouriers = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { users, currentPage, numberOfPages } } = await API.fetchUsers('couriers', page);

        dispatch({ type: FETCH_ALL, payload: { users, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const getCouriersBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { items } } = await API.fetchUsersBySearch('couriers', searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { items } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const createCourier = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        console.log(post);
        const { data } = await API.createUser('couriers', post);

        dispatch({ type: CREATE, payload: data });

        history.push('/');
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};