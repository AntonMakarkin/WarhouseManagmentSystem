import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_ID, CLEAR_STATE, 
         CREATE, UPDATE, DELETE, ERROR, START_LOADING_AVATAR, LOAD_AVATAR, END_LOADING_AVATAR } from "../Constants/actionTypes";

const initialState = {
    isLoading: true,
    isLoadingAvatar: false,
    isError: false,
    errorMessage: '', 
    users: [],
    user: []
}

const courierReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case START_LOADING_AVATAR:
            return { ...state, isLoadingAvatar: true, errorMessage: '' }
        case END_LOADING:
            return { ...state, isLoading: false }
        case END_LOADING_AVATAR:
            return { ...state, isLoadingAvatar: false }
        case FETCH_ALL:
            return {
                ...state,
                users: action.payload.users,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_BY_SEARCH:
            return { ...state, users: action.payload.items }
        case FETCH_BY_ID:
            return { ...state, user: action.payload.user }
        case LOAD_AVATAR:
            return { ...state, user: action.payload.user }
        case CLEAR_STATE:
            return initialState
        case CREATE:
            return { ...state, users: [...state.users, action.payload] }
        case UPDATE:
            return { ...state, users: state.users.map(user => (user._id === action.payload._id ? action.payload : user))}
        case DELETE:
            return { ...state, users: state.users.filter(user => user._id !== action.payload)}
        case ERROR:
            return { ...state, isError: true, errorMessage: action.payload }
        default:
            return state
    }
};

export default courierReducer;