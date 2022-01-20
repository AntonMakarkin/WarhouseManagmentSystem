import { START_LOADING, END_LOADING, FETCH_ALL, CREATE, FETCH_BY_SEARCH } from "../../Constants/actionTypes";
import * as API from '../../API/index';

export const getManagers = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { users, currentPage, numberOfPages } } = await API.fetchUsers('managers', page);

        dispatch({ type: FETCH_ALL, payload: { users, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const getManagersBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { items } } = await API.fetchUsersBySearch('managers', searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { items } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const createManager = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        console.log(post);
        const { data } = await API.createUser('couriers', post);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};