import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, FETCH_INFO_FOR_GOODS, FETCH_BY_ID, 
        CLEAR_STATE, CREATE, UPDATE, DELETE, ERROR, START_LOADING_AVATAR, LOAD_AVATAR, END_LOADING_AVATAR } from "../Constants/actionTypes";

const initialState = {
    isLoading: true,
    isLoadingAvatar: false,
    isError: false,
    errorMessage: '', 
    items: [],
    item: [],
    brandsForAddingGoods: [],
    categoriesForAddingGoods: [],
}

const dataReducer = (state = initialState, action) => {
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
                items: action.payload.items,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_INFO_FOR_GOODS:
            return { ...state, brandsForAddingGoods: action.payload.brands, categoriesForAddingGoods: action.payload.categories }
        case FETCH_BY_SEARCH:
            return { ...state, items: action.payload.items }
        case FETCH_BY_ID:
            return { ...state, item: action.payload.item }
        case LOAD_AVATAR:
            return { ...state, item: action.payload.item }
        case CLEAR_STATE:
            return initialState
        case CREATE:
            return { ...state, items: [...state.items, action.payload] }
        case UPDATE:
            return { ...state, items: state.items.map(item => (item._id === action.payload._id ? action.payload : item))}
        case DELETE:
            return { ...state, items: state.items.filter(item => item._id !== action.payload)}
        case ERROR:
            return { ...state, isLoading: false, isError: true, errorMessage: action.payload }
        default:
            return state
    }
};

export default dataReducer;