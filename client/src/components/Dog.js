import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Dog.module.css';
import { setIdDetail, setDogDetail } from '../actions';

const Dog = ({dog}) => {

    const dispatch = useDispatch();

    const {id, name, image, temperament} = dog;
    const temp = temperament && temperament.join(', ');


    return ( 
        <div className={styles.container}>
            <div>
                <img className={styles.dogImages} src={image} alt="Dog" />
            </div>
            <div>
                <p>Breed: <span>{name}</span></p>
            </div>
            <div>
                <p>Temperaments: <span>{temp}</span> </p>
            </div>

            <NavLink 
                to='/home/detail'
                onClick={()=>{
                    dispatch(setIdDetail(id));
                    dispatch(setDogDetail({}));
                }}
            >
                <span>Details</span>
            </NavLink>
        </div> 
     );
}
 
export default Dog;