import { NEW_DOG, SET_NEW_DOG } from "../actions";

const initialState = {
    response:{}
}

const newDogReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case NEW_DOG:
            return {
                response: payload
            }
        case SET_NEW_DOG:
            return {
                response: {}
            }
        default:
            return state;
    }

}
 
export default newDogReducer;