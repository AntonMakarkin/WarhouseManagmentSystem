import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_ID, CREATE, DELETE, FETCH_BY_SEARCH, CLEAR_STATE, ERROR } from "../Constants/actionTypes";
import * as API from '../API/index';

export const getPersonalById = (collection, id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await API.fetchUserById(collection, id);

        dispatch({ type: FETCH_BY_ID, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
}

export const getPersonal = (page, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { users, currentPage, numberOfPages } } = await API.fetchUsers(collection, page);

        dispatch({ type: FETCH_ALL, payload: { users, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
        if (err.message.includes('401')) {
            dispatch({ type: ERROR, payload: 'Ошибка авторизации. Попробуйте обновить страницу или заново авторизоваться'})
        }
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
        console.log(collection);
        const { data } = await API.createUser(collection, post);

        dispatch({ type: CREATE, payload: data });

        history.push('/');
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err.message);
    }
}

export const deletePersonal = (collection, id) => async (dispatch) => {
    try {
        await API.deleteUser(collection, id);

        dispatch({ type: DELETE, payload: id })
    } catch (err) {
        console.log(err);
    }
}

export const uploadPersonalAvatar = (collection, id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await API.uploadAvatar(collection, id);
    } catch (err) {
        console.log(err);
    }
}

export const clearData = () => (dispatch) => {
    dispatch({ type: CLEAR_STATE });
}
