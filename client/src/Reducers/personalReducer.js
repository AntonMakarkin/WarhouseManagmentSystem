import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, CLEAR_STATE, CREATE, UPDATE, DELETE } from "../Constants/actionTypes";

const initialState = {
    isLoading: true, 
    users: []
}

const courierReducer = (state = initialState, action) => {
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
        case FETCH_BY_SEARCH:
            return { ...state, users: action.payload.items }
        case CLEAR_STATE:
            return initialState
        case CREATE:
            return { ...state, users: [...state.users, action.payload] }
        case UPDATE:
            return { ...state, users: state.users.map(user => (user._id === action.payload._id ? action.payload : user))}
        case DELETE:
            return { ...state, users: state.users.filter(user => user._id !== action.payload)}
        default:
            return state
    }
};

export default courierReducer;