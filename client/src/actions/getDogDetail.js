export const GET_DOG_DETAIL = 'GET_DOG_DETAIL'

export function getDogDetail(name){
    return {
        type: GET_DOG_DETAIL,
        payload:name
    }
}