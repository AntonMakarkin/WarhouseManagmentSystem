import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_ID, CREATE, DELETE, 
         FETCH_BY_SEARCH, CLEAR_STATE, ERROR, START_LOADING_AVATAR, LOAD_AVATAR,
         END_LOADING_AVATAR, FETCH_INFO_FOR_GOODS, UPDATE } from "../Constants/actionTypes";
import * as API from '../API/index';

export const getItemById = (collection, id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await API.fetchUserById(collection, id);
        console.log(data)

        dispatch({ type: FETCH_BY_ID, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
        dispatch({ type: ERROR, payload: 'Ошибка. Попробуйте обновить страницу или зайдите позже'})
    }
}

export const getInfoForAddingGoods = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await API.getInfoForAddingGoods();

        dispatch({ type: FETCH_INFO_FOR_GOODS, payload: data });
        dispatch({ type: END_LOADING })
    } catch (err) {
        console.log(err);
        dispatch({ type: ERROR, payload: 'Ошибка. Попробуйте обновить страницу или зайдите позже'})
    }
}

export const getItems = (page, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await API.fetchUsers(collection, page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
        dispatch({ type: ERROR, payload: 'Ошибка. Попробуйте обновить страницу или зайдите позже'})
    }
};

export const getItemsBySearch = (searchQuery, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { items } } = await API.fetchUsersBySearch(collection, searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { items } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const createItem = (post, history, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        console.log(post);
        console.log(collection);
        const { data } = await API.createUser(collection, post);

        dispatch({ type: CREATE, payload: data });

        history.goBack();
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err.message);
        dispatch({ type: ERROR, payload: 'Ошибка. Попробуйте еще раз и проверьте соединение'})
    }
}

export const updateItem = (post, id, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        console.log(id);
        console.log(collection);
        console.log(post);
        const { data } = await API.updateUser(collection, post, id);

        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}

export const deleteItem = (collection, id) => async (dispatch) => {
    try {
        await API.deleteItem(collection, id);

        dispatch({ type: DELETE, payload: id })
    } catch (err) {
        console.log(err);
    }
}

export const uploadPersonalAvatar = (avatar, collection, id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING_AVATAR });

        let formDataAvatar = new FormData();
        formDataAvatar.append('avatar', avatar);

        const { data } = await API.uploadAvatar(collection, id, formDataAvatar);
        console.log(data);

        dispatch({ type: LOAD_AVATAR, payload: data });
        dispatch({ type: END_LOADING_AVATAR });
    } catch (err) {
        console.log(err);
        dispatch({ type: ERROR, payload: 'Ошибка загрузки'})
    }
}

export const clearData = () => (dispatch) => {
    dispatch({ type: CLEAR_STATE });
}
