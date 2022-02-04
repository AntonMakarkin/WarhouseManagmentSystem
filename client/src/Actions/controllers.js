import { START_LOADING, END_LOADING, FETCH_ALL, CREATE, FETCH_BY_SEARCH, CLEAR_STATE } from "../Constants/actionTypes";
import * as API from '../API/index';

export const getPersonal = (page, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { users, currentPage, numberOfPages } } = await API.fetchUsers(collection, page);

        dispatch({ type: FETCH_ALL, payload: { users, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const getPersonalBySearch = (searchQuery, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { items } } = await API.fetchUsersBySearch(collection, searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { items } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const createPersonal = (post, history, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        console.log(post);
        const { data } = await API.createUser(collection, post);

        dispatch({ type: CREATE, payload: data });

        history.push('/');
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
}

export const clearData = () => (dispatch) => {
    dispatch({ type: CLEAR_STATE });
}
