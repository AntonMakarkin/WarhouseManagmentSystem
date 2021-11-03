import * as actionType from '../Constants/actionTypes';

const defaultState = {
    currentUser: null,
    isAuth: false
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionType.LOGIN:
            return { ...state, currentUser: action.data.user, loading: false, errors: null, isAuth: true};
        case actionType.LOGOUT:
            localStorage.removeItem('token');

            return { ...state, currentUser: null, loading: false, errors: null, isAuth: false};
        case actionType.AUTH:
            return { ...state, currentUser: action.data.user, loading: false, errors: null, isAuth: true};
        default:
            return state;
    }
};

export default userReducer;