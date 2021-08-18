import {SEARCH_DOGS, GET_DOG_DETAIL} from '../actions';

const initialState = {
    dogsLoaded: []
}

export default function dogsReducer(state = initialState, action){
    switch (action.type) {
        case SEARCH_DOGS:
            return  {
                dogsLoaded: action.payload
            }
        
        // case GET_DOG_DETAIL:
        //     return  {
        //         ...state,
        //         dogDetail: action.payload
        //     }
        default:
            return state;
    }
}