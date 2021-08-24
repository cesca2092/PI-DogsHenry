export const SET_DOGS_PER_PAGE = 'SET_DOGS_PER_PAGE';

export function setDogsPerPage(array){
    return {
        type: SET_DOGS_PER_PAGE,
        payload:array
    }
}