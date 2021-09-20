import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPrevtOffset, setNextOffset, setDogsPerPage} from '../../actions';
import styles from './Pager.module.css'

const Pager = () => {
    const dispatch = useDispatch();
    const offset = useSelector(state => state.dogsReducer.offset);
    const limit = useSelector(state => state.dogsReducer.limit);
    const dogs = useSelector(state => state.dogsReducer.dogs);
    
    return ( 

        <div className={styles.container}>
            { offset < 1 ? null :
                <button
                    onClick={()=>{
                        dispatch(setPrevtOffset());
                        dispatch(setDogsPerPage(dogs));
                    }}
                    className={styles.buttons}
                >Prev</button>
            }

            { dogs.length < 1 || limit >= dogs.length? null :
                <button
                    onClick={()=>{
                        dispatch(setNextOffset());
                        dispatch(setDogsPerPage(dogs));
                    }}
                    className={styles.buttons}
                >Next</button>
            }
        </div>

     );
}
 
export default Pager;