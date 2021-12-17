import { FETCH_ALL } from '../../Constants/actionTypes';
import * as API from '../../API/index';

export const getCouriers = () => async (dispatch) => {
    try {
        const { data: { users, currentPage, numberOfPages } } = await API.fetchUsers('couriers');
        dispatch({ type: FETCH_ALL, payload: { users, currentPage, numberOfPages } });
    } catch (err) {
        console.log(err);
    }
};