import React from 'react';
import styles from './Error.module.css'

const Error = ({error}) => ( 
        <>
            <h1 className={styles.msg}>{error}</h1>
        </>
        
     );

 
export default Error;