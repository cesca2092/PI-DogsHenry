export const SEARCH_DOGS = 'SEARCH_DOGS';

export function searchDogs(name){
    return function(dispatch){
        return fetch(` http://localhost:3001/dogs/?name=${name}`)
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: SEARCH_DOGS,
                    payload: result
                })
            })
    }
}