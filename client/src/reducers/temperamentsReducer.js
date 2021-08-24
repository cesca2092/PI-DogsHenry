import { GET_TEMPERAMENTS } from '../actions';

const initialState = {
    temperaments: []
}

export default function temperamentsReducer(state = initialState, action){
    switch (action.type) {
        case GET_TEMPERAMENTS:
            return {
                temperaments: action.payload
            }
    
        default:
            return state;
    }
}