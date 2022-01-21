import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import personalReducer from './personalReducer';

const reducers = combineReducers({
    user: userReducer,
    personal: personalReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

