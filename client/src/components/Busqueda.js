import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDogs, restartOffsetLimit } from '../actions';

const Busqueda = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    return ( 
        <form
            onSubmit={e => {
                e.preventDefault();
                dispatch(searchDogs(name));
                dispatch(restartOffsetLimit());
                
            }}
        >
            <div>
                <span>Search by Breed </span>
                <input 
                    type="text"
                    value={name}
                    placeholder="Breed..."
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="submit"
                    value="Search"
                />
            </div>
        </form>
     );
}
 
export default Busqueda;