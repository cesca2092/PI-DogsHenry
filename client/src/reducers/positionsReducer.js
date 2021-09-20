import { HOME_POSITION, CREATE_POSITION } from "../actions";

const initialState = {
    home: false,
    createDog: false
}
const positionsReducer = (state=initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case HOME_POSITION:
            
            return {
                ...state,
                home: payload
            }
        case CREATE_POSITION:
        
            return {
                ...state,
                createDog: payload
            }

        
        default:
            return state;
    }
}
 
export default positionsReducer;