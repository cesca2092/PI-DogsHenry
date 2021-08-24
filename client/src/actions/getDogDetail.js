export const GET_DOG_DETAIL = 'GET_DOG_DETAIL'

export function getDogDetail(id){
    return function(dispatch){
        return fetch(` http://localhost:3001/dogs/${id}`)
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: GET_DOG_DETAIL,
                    payload: result[0]
                })
            })
    }
}