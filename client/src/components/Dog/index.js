import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Dog.module.css';
import { setIdDetail, setDogDetail } from '../../actions';

const Dog = ({dog}) => {

    const dispatch = useDispatch();

    const {id, name, image, temperament} = dog;


 

    const nameArray = name.split(' ').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')



    return (

        <div className={styles.container}>
            <NavLink
                to='/home/detail'
                onClick={()=>{
                    dispatch(setIdDetail(id));
                    dispatch(setDogDetail({}));
                }}
                style={ {textDecoration:'none'}}
            >
                <div>
                    <img className={styles.dogImages} src={image} alt="Dog" />
                </div>
                <div className={styles.breed}>
                    <p>{nameArray}</p>
                </div>
                <div className={styles.tempe}>
                    <p className={styles.temptitle}>Temperaments: </p>
                    <ul>{temperament && temperament.slice(0,3).map(dog => <li key={dog}>{dog.charAt(0).toUpperCase() + dog.slice(1)}</li>)}</ul>
                    {/* <ul>{prueba && prueba.map(e => <li>{e}</li>)}</ul> */}
                </div>
            </NavLink>
        </div>

     );
}

export default Dog;