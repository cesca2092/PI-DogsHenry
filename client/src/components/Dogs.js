import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchDogs } from '../actions';
import styles from './Dogs.module.css';



const Dogs = () => {

    const dispatch = useDispatch();

    const dogsLoaded = useSelector(state => state.dogsReducer.dogsLoaded)

    useEffect(() => {
        dispatch(searchDogs(''));
    }, [dispatch])



    return ( 
        <>
            <h1>Dogs List</h1>
            <div className={styles.list}>
                {dogsLoaded.map(dog => {
                    let temp = dog.temperament && dog.temperament.join(', ');
                    
                    return (
                        <div className={styles.container} key={dog.id}>
                            <img className={styles.dogImages} src={dog.image} alt="Dog" />
                            <p>Breed: <span>{dog.name}</span></p>
                            <p>Temperaments: <span>{temp}</span> </p>
                        </div> 
                    )
                })}
            </div>
            
        </>
     );
}
 
export default Dogs;