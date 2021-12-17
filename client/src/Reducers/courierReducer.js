import { FETCH_ALL } from "../Constants/actionTypes";

const courierReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                users: action.payload.users,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        default:
            return state
    }
};

export default courierReducer;