import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterDogs, restartOffsetLimit, setDogsPerPage } from '../../actions';
import styles from './Filters.module.css'

const Filters = () => {

    const dispatch = useDispatch();

    const temps = useSelector(state => state.temperamentsReducer.temperaments );
    const dogs = useSelector(state => state.dogsReducer.dogs);

    const [filter, setFilter] = useState('');
    const [temperament, setTemperament] = useState('');


    return (
        <div className={styles.container}>
            {/* <h2>Filters here</h2> */}
            <form
                onSubmit = {e => {
                    e.preventDefault();
                    dispatch(setFilterDogs(temperament,filter));
                    dispatch(restartOffsetLimit());
                    dispatch(setDogsPerPage(dogs));                    
                }}
            >
                <select
                    onChange={e => setTemperament(e.target.value)}
                >
                    <option value=''>-- Filter by Temperament --</option>
                    <option value='all'>All Temperaments</option>
                    {
                        temps.map( temp =>
                            <option
                                key={temp.id}
                                value={temp.name}
                            >{temp.name}</option>
                        )
                    }
                </select>

                <select
                    onChange={e => setFilter(e.target.value)}
                >
                    <option value=''>-- Filter by Local or Created --</option>
                    <option value='all'>All</option>
                    <option value="localBreeds">Local Breeds</option>
                    <option value="createdBreeds">Created Breeds</option>
                </select>

                {filter && temperament ? 
                    <input
                        type="submit"
                        value="Apply"
                        className={styles.apply}
                    /> 
                    : null
                }

                
            </form>
        </div>

     );
}

export default Filters;