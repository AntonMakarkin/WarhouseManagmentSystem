import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer';

const reducers = combineReducers({
    user: userReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

