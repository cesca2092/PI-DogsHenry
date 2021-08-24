export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';

export function getTemperaments(){
    return function(dispatch){
        return fetch(`http://localhost:3001/temperament`)
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: GET_TEMPERAMENTS,
                    payload: result
                })
            })
    }
}