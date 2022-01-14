import * as actionType from '../Constants/actionTypes';

const defaultState = {
    currentUser: null,
    isAuth: false
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionType.LOGIN:
            localStorage.setItem('token', action?.data?.accessToken);
            localStorage.setItem('profile', JSON.stringify({ ...action?.data?.user }));
            return { ...state, currentUser: action.data.user, loading: false, errors: null, isAuth: true};
        case actionType.LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            return { ...state, currentUser: null, loading: false, errors: null, isAuth: false};
        case actionType.REFRESH:
            localStorage.setItem('token', action?.data?.accessToken);
            return { ...state, currentUser: action.data.user, loading: false, errors: null, isAuth: true};
        default:
            return state;
    }
};

export default userReducer;