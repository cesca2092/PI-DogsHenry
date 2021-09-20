import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder, restartOffsetLimit, setDogsPerPage } from '../../actions';
import styles from './Order.module.css'

const Order = () => {

    const dispatch = useDispatch();

    const dogs = useSelector(state => state.dogsReducer.dogs);

    const [ordertype, setOrderType] = useState('');
    const [orderflow, setOrderFlow] = useState('asc')

    return ( 
        <div className={styles.container}>
            {/* <h2>Order here</h2> */}
            <form
                onSubmit={e => {
                    e.preventDefault();
                    dispatch(setOrder(ordertype,orderflow));
                    dispatch(restartOffsetLimit());
                    dispatch(setDogsPerPage(dogs));
                    // setOrderType('');
                }}
            >
                <select
                    onChange={e => setOrderType(e.target.value)}
                >
                    <option value=''> -- Order Type --</option>
                    <option value='alphabet'>Alphabetical</option>
                    <option value='weight'>By Weight</option>
                </select>

                {ordertype ? 
                    <select
                    onChange={e => setOrderFlow(e.target.value)}
                    >
                        <option value='asc'>ASC</option>
                        <option value='desc'>DESC</option>
                    </select>
                :null}
                {ordertype ?
                    <input
                        type='submit'
                        value='Order!'
                        className={styles.order}
                    />           
                :null}

                
            </form>
        </div>
     );
}
 
export default Order;