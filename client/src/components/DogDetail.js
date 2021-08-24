import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetail } from '../actions';

const DogDetail = () => {

    const dispatch = useDispatch();

    const id = useSelector(state => state.dogDetailReducer.id);
    const detail = useSelector(state => state.dogDetailReducer.detail);

    const { image, name, temperament, height, weight, life_span } = detail;
    const temp = temperament && temperament.join(', ');
   

    useEffect(() => {
        dispatch(getDogDetail(id))
    }, [dispatch,id])


    return ( 
        <div>
            <h1>Dog Detail</h1>
            <p>Breed Name: {name}</p>

            <p>Temperaments: <span>{temp}</span></p> 
            
            <p>Height(Min-Max): {height} cm</p>

            <p>Weight(Min-Max): {weight} kg</p>

            <p>Life Span(Average): {life_span} Years</p>

            <img src={image} alt='dog' />

        </div>
     );
}
 
export default DogDetail;