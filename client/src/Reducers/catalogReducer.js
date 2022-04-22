import { START_CATALOG_LOADING, END_CATALOG_LOADING, FETCH_ALL_CATALOG } from "../Constants/actionTypes";

const initialState = {
    isLoading: true,
    isError: true,
    errorMessage: '',
    catalogItems: [],
    catalogItem: []
}

const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CATALOG_LOADING:
            return { ...state, isLoading: true }
        case END_CATALOG_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL_CATALOG:
            return {
                ...state,
                catalogItems: action.payload.items,
                currentCatalog: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        default:
            return state
    }
}

export default catalogReducer;