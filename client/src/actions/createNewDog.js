export const NEW_DOG = 'NEW_DOG';

export function createNewDog(info){
    return function(dispatch){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }
        return fetch(` http://localhost:3001/dog`,options)
            .then(response => response.json())
            .then(result => {
                dispatch({
                    type: NEW_DOG,
                    payload: result
                })
            })
    } 
}