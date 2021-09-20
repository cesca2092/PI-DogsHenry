import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Dogs.module.css';

import {    searchDogs,     setDogsPerPage, getTemperaments, 
            homePosition,   createPosition, setNewDog   } from '../../actions';

import Pager from '../Pager';
import Dog from '../Dog';
import Error from '../Error';

const Dogs = () => {

    const dispatch = useDispatch();
    const dogs = useSelector(state => state.dogsReducer.dogs);
    const dogsLoaded = useSelector(state => state.dogsReducer.dogsLoaded);
    const dogsCurrentPage = useSelector(state => state.dogsReducer.dogsCurrentPage);
    const home = useSelector(state => state.positionsReducer.home);
    const createDog = useSelector(state => state.positionsReducer.createDog);
    const response = useSelector(state => state.newDogReducer.response);

    useEffect(() => {
        if(dogsLoaded.length === 0 && home && !createDog) {
            dispatch(searchDogs(''));
            dispatch(getTemperaments());
        }

        if(dogs.length > 0 && dogsLoaded.length > 0 && home && !createDog){
            dispatch(setDogsPerPage(dogs));
        }

        if(!home)dispatch(homePosition(true));
        if(createDog){
            dispatch(createPosition(false));
            Object.keys(response).length > 0 && dispatch(setNewDog())
        }
    }, [dispatch,dogs,dogsLoaded,home,createDog,response]);




    return (
        <div className={styles.container}>
            {
                dogs.length === 0 || dogsLoaded.msg !== undefined ? null :
                
                    <Pager />
                
            }
            
            {
                dogs.length === 0 || dogsLoaded.msg !== undefined ? null :
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
                
            {
                dogsLoaded.msg !== undefined ? <Error error={dogsLoaded.msg && dogsLoaded.msg}/> : null
            }

            {
                dogsLoaded.length>1 && dogs.length < 1 ? <Error error='There are not Dogs with this temperament' />: null
            }
        </div>
     );
}

export default Dogs;