import { START_LOADING, END_LOADING, FETCH_ALL, CREATE } from "../Constants/actionTypes";

const courierReducer = (state = { isLoading: true, users: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return {
                ...state,
                users: action.payload.users,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case CREATE: {
            return { ...state, users: [...state.users, action.payload] }
        }
        default:
            return state
    }
};

export default courierReducer;