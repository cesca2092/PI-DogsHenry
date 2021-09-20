export const CREATE_POSITION = 'CREATE_POSITION';

export function createPosition(position){
    return {
        type: CREATE_POSITION,
        payload: position
    }
}
