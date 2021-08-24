import dogsReducer from '../reducers/dogsReducer.js';
import temperamentsReducer from './temperamentsReducer.js';
import dogDetailReducer from './dogDetailReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers(
    {
        dogsReducer,
        temperamentsReducer,
        dogDetailReducer
    });

export default rootReducer;