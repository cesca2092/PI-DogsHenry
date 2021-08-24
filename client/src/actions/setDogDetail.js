export const SET_DOG_DETAIL = 'SET_DOG_DETAIL';

export function setDogDetail(obj){
    return {
        type: SET_DOG_DETAIL,
        payload:obj
    }
}