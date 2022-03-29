import { LOGIN, LOGOUT, REFRESH, LOGIN_ERROR } from '../Constants/actionTypes';

const defaultState = {
    //currentUser: localStorage.getItem('profile'),
    currentUser: JSON.parse(localStorage.getItem('profile')),
    authError: false,
    isAuth: false
};

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('token', action?.data?.accessToken);
            localStorage.setItem('profile', JSON.stringify({ ...action?.data?.user }));
            return { ...state, currentUser: action.data.user, authError: false};
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            return { ...state, currentUser: null};
        case REFRESH:
            localStorage.setItem('token', action?.data?.accessToken);
            return { ...state, currentUser: action.data.user, loading: false };
        case LOGIN_ERROR:
            return { ...state, authError: true }
        default:
            return state;
    }
};

export default userReducer;