import { START_CATALOG_LOADING, END_CATALOG_LOADING, FETCH_ALL_CATALOG, CATALOG_ERROR } from "../Constants/actionTypes";
import * as API from '../API/index';

export const getCatalogItems = (page, collection) => async (dispatch) => {
    try {
        dispatch({ type: START_CATALOG_LOADING });
        const { data } = await API.fetchUsers(collection, page);

        dispatch({ type: FETCH_ALL_CATALOG, payload: data });
        dispatch({ type: END_CATALOG_LOADING });
    } catch (err) {
        console.log(err);
        dispatch({ type: CATALOG_ERROR, payload: 'Ошибка. Попробуйте обновить страницу или зайдите позже'})
    }
};