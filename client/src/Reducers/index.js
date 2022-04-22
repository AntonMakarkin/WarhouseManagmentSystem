import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import personalReducer from './personalReducer';
import catalogReducer from './catalogReducer';

const reducers = combineReducers({
    user: userReducer,
    personal: personalReducer,
    catalog: catalogReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

