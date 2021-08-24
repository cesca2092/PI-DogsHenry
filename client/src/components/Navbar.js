import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav>
            <div>
                <NavLink 
                    to = '/home/newbreed'
                >
                    <span>Create New Dog Breed</span>
                </NavLink>
            </div>
        </nav>
     );
}
 
export default Navbar;