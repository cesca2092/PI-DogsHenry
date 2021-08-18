import dogsReducer from '../reducers/dogsReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers(
    {
        dogsReducer
    });

export default rootReducer;