import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import dataReducer from './dataReducer';

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

