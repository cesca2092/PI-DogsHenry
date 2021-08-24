import React from 'react';
import { NavLink } from "react-router-dom";

const LandingPage = () => {

    
    return ( 
        <div>
            <h1>Welcome to the Dog App</h1>
            <NavLink to="home">
                <span>Go</span>
            </NavLink>
        </div>
     );
}
 
export default LandingPage;