export const HOME_POSITION = 'HOME_POSITION';

export function homePosition(position){
    return {
        type: HOME_POSITION,
        payload: position
    }
}
