import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './LandingPage.module.css';

const LandingPage = () => {

    
    return ( 
        <div className={styles.container}>
            <NavLink to="home">
                <div className={styles.image}></div>
            </NavLink>
            
        </div>
     );
}
 
export default LandingPage;