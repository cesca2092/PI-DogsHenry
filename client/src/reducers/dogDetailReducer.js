import { GET_DOG_DETAIL, SET_ID_DETAIL, SET_DOG_DETAIL } from '../actions';


const initialState = {
    id: null,
    detail: {}
}

const dogDetailReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_DOG_DETAIL:
            return {
                ...state,
                detail: payload
            }
        case SET_ID_DETAIL:
            return {
                ...state,
                id: payload
            }
        case SET_DOG_DETAIL:
            return {
                ...state,
                detail: payload
            }
    
        default:
            return state;
    }
}
 
export default dogDetailReducer;