import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetail, homePosition, createPosition } from '../../actions';
import styles from './DogDetail.module.css'

const DogDetail = () => {

    const dispatch = useDispatch();

    const id = useSelector(state => state.dogDetailReducer.id);
    const detail = useSelector(state => state.dogDetailReducer.detail);
    const home = useSelector(state => state.positionsReducer.home);
    const createDog = useSelector(state => state.positionsReducer.createDog);

    const { image, name, temperament, height, weight, life_span } = detail;
    const temp = Object.keys(detail).length > 0 && temperament.msg === undefined ? temperament.map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(', ') 
            : Object.keys(detail).length > 0 && temperament.msg;

    const nameArray = name && name.split(' ').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ')

    useEffect(() => {
        if(!home && !createDog){
            dispatch(getDogDetail(id));
            dispatch(createPosition(false));
        }else{
            dispatch(homePosition(false));
        }
        
    }, [dispatch,id,home,createDog])


    return ( 
        <>

            { Object.keys(detail).length > 1 ?
                <div className={styles.container}>
                    <div className={styles.details}>
                        <h1>Dog Detail</h1>
                        <p>Breed Name: <span>{nameArray}</span></p>

                        <p>Temperaments: </p> 
                        <span>{temp}</span>
                        
                        <p>Height(Min-Max): <span>{height} cm</span></p>

                        <p>Weight(Min-Max): <span>{weight} kg</span></p>

                        <p>Life Span(Average): <span>{life_span} Years</span></p>

                    </div>
                
                    <div className={styles.dogImage}>
                        <img className={styles.image} src={image} alt='dog' />
                    </div>

                    

                </div>

                : null
        
            }

        </>
        
        
     );
}
 
export default DogDetail;