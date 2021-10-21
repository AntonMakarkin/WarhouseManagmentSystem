import { combineReducers } from "redux";

import employees from './employees';
import auth from './auth';

export const reducers = combineReducers({ employees, auth });