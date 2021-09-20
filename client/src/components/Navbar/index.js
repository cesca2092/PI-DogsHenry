import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Filters from '../Filters';
import Order from '../Order';
import Busqueda from '../Busqueda';
import styles from './Navbar.module.css'

const Navbar = () => {
    
    const dogs = useSelector(state => state.dogsReducer.dogs);
    const dogsLoaded = useSelector(state => state.dogsReducer.dogsLoaded);
    const home = useSelector(state => state.positionsReducer.home);
    const createDog = useSelector(state => state.positionsReducer.createDog);

    return ( 
        <nav className={styles.container}>
            {
                !home ? null :
                    <div>
                        <Busqueda />
                    </div>
            }
            
            {
                dogsLoaded.length === 0 || dogsLoaded.msg !== undefined || !home ? null :
                <div>
                    <Filters />
                </div>
            }
            {
                dogs.length === 0 || dogsLoaded.msg !== undefined || !home ? null :
                <div>
                    <Order />
                </div>
            }   

            {
                home ? null :
                <div>
                    <NavLink
                        to = '/home'
                        style={ {textDecoration:'none'}}
                    >
                        <button className={styles.buttons}>Back to Home</button>
                    </NavLink>
                </div>
            }
                    
            {
                createDog ? null :
                <div>
                    <NavLink 
                        to = '/home/newdog'
                        style={ {textDecoration:'none'}}
                    >
                        <button className={styles.buttons}>Create New Dog Breed</button>
                    </NavLink>
                </div>
            }

        </nav>
     );
}
 
export default Navbar;