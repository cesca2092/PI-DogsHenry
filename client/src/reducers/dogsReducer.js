import {SEARCH_DOGS,            SET_NEXT_OFFSET,    
        SET_PREV_OFFSET,        SET_DOGS_PER_PAGE,  
        RESTART_OFFSET_LIMIT,   SET_FILTER_DOGS,
        SET_ORDER               } from '../actions';


const initialState = {
    dogs: [],
    dogsLoaded: [],
    dogsCurrentPage: [],
    limit: 8,
    offset: 0,
    test:[]
}

export default function dogsReducer(state = initialState, action){
    const { offset, limit, dogsLoaded } = state;
    const { type, payload } = action;
    
    switch (type) {
        case SEARCH_DOGS:
            return  {
                ...state,
                dogsLoaded: payload,
                dogs: payload
            }
        case SET_NEXT_OFFSET:
            return  {
                ...state,
                offset: offset + payload,
                limit: limit + payload
            }

        case SET_PREV_OFFSET:
            return  {
                ...state,
                offset: offset - payload,
                limit: limit - payload
            }
            
        case SET_DOGS_PER_PAGE:
            return  {
                ...state,
                dogsCurrentPage: payload.slice(offset, limit)
            }

        case RESTART_OFFSET_LIMIT:
            return  {
                ...state,
                offset: 0,
                limit: 8
            }
        
        case SET_FILTER_DOGS:
            const { temperament, filter } = payload;

            if(temperament === 'all' && filter === 'all'){
                return  {
                    ...state,
                    dogs: dogsLoaded
                }
            }

            if(temperament || filter){

                const array = temperament && temperament !== 'all' ? dogsLoaded.filter(dog =>dog.temperament && dog.temperament.includes(temperament)) : dogsLoaded
                const arrayLocal = filter === 'localBreeds' ? array.filter(dog => !dog.localDB) : array;
                const arrayCreated = filter === 'createdBreeds' ? array.filter(dog => dog.localDB) : arrayLocal;

                return  {
                    ...state,
                    dogs: arrayCreated
                }
            }

            return  {
                ...state,
                dogs: dogsLoaded
            }
        
        case SET_ORDER:
            const {ordertype, orderflow} = payload
            if(ordertype==='alphabet'){
                if(orderflow === 'asc'){
                    return {
                        ...state,
                        dogs: state.dogs.sort( (a,b) => {
                            if(a.name > b.name) return 1;
                            if(a.name < b.name)return -1;
                            return 0;
                        })
                    }
                } else {
                    return {
                        ...state,
                        dogs: state.dogs.sort( (a,b) => {
                            if(a.name > b.name) return -1;
                            if(a.name < b.name)return 1;
                            return 0;
                        })
                    }
                }
            } else {
                if(orderflow==='asc'){
                    return {
                        ...state,
                        dogs: state.dogs.sort( (a,b) => {
                            let weighta = a.weight.split('-').map(e=>e.trim());
                            let weightb = b.weight.split('-').map(e=>e.trim());
                            let wa = weighta.length > 1 ? weighta[1] : weighta[0];
                            let wb = weightb.length > 1 ? weightb[1] : weightb[0];

                            return wa - wb;
                        })
                    }
                } else {
                    return {
                        ...state,
                        dogs: state.dogs.sort( (a,b) => {
                            let weighta = a.weight.split('-').map(e=>e.trim());
                            let weightb = b.weight.split('-').map(e=>e.trim());
                            let wa = weighta.length > 1 ? weighta[1] : weighta[0];
                            let wb = weightb.length > 1 ? weightb[1] : weightb[0];

                            return wb - wa;
                        })
                    }
                }
            }
        
        default:
            return state;
    }
}