import dogsReducer from '../reducers/dogsReducer.js';
import temperamentsReducer from './temperamentsReducer.js';
import dogDetailReducer from './dogDetailReducer.js';
import newDogReducer from './newDogReducer.js';
import positionsReducer from './positionsReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers(
    {
        dogsReducer,
        temperamentsReducer,
        dogDetailReducer,
        newDogReducer,
        positionsReducer
    });

export default rootReducer;