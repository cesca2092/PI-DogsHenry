export const SET_FILTER_DOGS = 'SET_FILTER_DOGS';

export function setFilterDogs(temperament, filter){
    // console.log('filter dogs')
    return {
        type: SET_FILTER_DOGS,
        payload:{temperament, filter}
    }
}