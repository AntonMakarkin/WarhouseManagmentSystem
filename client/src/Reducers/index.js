import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import courierReducer from './courierReducer';

const reducers = combineReducers({
    user: userReducer,
    courier: courierReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

