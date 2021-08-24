export const SET_ORDER = 'SET_ORDER';

export function setOrder(ordertype, orderflow){
    return {
        type: SET_ORDER,
        payload:{ordertype,orderflow}
    }
}