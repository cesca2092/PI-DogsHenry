import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Dogs.module.css';

import { searchDogs, setDogsPerPage, getTemperaments } from '../actions';

import Busqueda from './Busqueda';
import Pager from './Pager';
import Dog from './Dog';
import Filters from './Filters';
import Order from './Order';

const Dogs = () => {

    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogsReducer.dogs);
    const dogsLoaded = useSelector(state => state.dogsReducer.dogsLoaded);
    const dogsCurrentPage = useSelector(state => state.dogsReducer.dogsCurrentPage);


    useEffect(() => {

        if(dogsLoaded.length === 0) {
            dispatch(searchDogs(''));
            dispatch(getTemperaments());
        }

        if(dogs.length > 0 && dogsLoaded.length > 0){
            dispatch(setDogsPerPage(dogs));
        }

    }, [dispatch,dogs,dogsLoaded]);




    return (
        <>
        <div>
            <Busqueda />
            <Filters />
        </div>

        <Order />

        <Pager />

        
        

            {

                dogs.length === 0 ? <h1>Cant find dogs</h1>:
                <div className={styles.list}>
                    {
                        dogsCurrentPage.map(dog =>
                            <Dog
                                key={dog.id}
                                dog={dog}
                            />)
                    }
                </div>
            }
        </>
     );
}

export default Dogs;