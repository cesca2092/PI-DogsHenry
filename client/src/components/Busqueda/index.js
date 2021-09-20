import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDogs, restartOffsetLimit } from '../../actions';
import styles from './Busqueda.module.css';

const Busqueda = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    return ( 
        <form
            onSubmit={e => {
                e.preventDefault();
                dispatch(searchDogs(name.toLocaleLowerCase()));
                dispatch(restartOffsetLimit());
                
            }}
            className={styles.form}
        >
            <div>
                <span>Search by Breed </span>
                <input 
                    type="text"
                    value={name}
                    placeholder="Breed..."
                    onChange={e => setName(e.target.value)}
                    className={styles.input}
                />
                <input 
                    type="submit"
                    value="Search"
                    className={styles.search}
                />
            </div>
        </form>
     );
}
 
export default Busqueda;