import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {    getTemperaments, createNewDog, homePosition,
            createPosition } from '../../actions';
import  styles  from './NewDog.module.css'

const NewDog = () => {

    const dispatch = useDispatch();
    const temps = useSelector(state => state.temperamentsReducer.temperaments );
    const home = useSelector(state => state.positionsReducer.home);
    const createDog = useSelector(state => state.positionsReducer.createDog);
    const response = useSelector(state => state.newDogReducer.response);

    const [newdog, setNewDog] = useState({
        name:'',
        minheight: '',
        maxheight: '',
        minweight: '',
        maxweight: '',
        life_span:'',
        temperaments: []
    });
    const { name, minheight, maxheight, minweight, maxweight, life_span, temperaments } = newdog;

    const [errors, setErrors] = useState({
        nameError: false,
        minheightError: false,
        maxheightError: false,
        minweightError: false,
        maxweightError: false,
        lifespanError: false
    })
    const { nameError, minheightError, maxheightError, minweightError, maxweightError,lifespanError } = errors;

    useEffect(() => {
        if(temps.length < 1){
            dispatch(getTemperaments());
        }
        if(!createDog)dispatch(createPosition(true));
        if(home)dispatch(homePosition(false));
    }, [dispatch,temps,home,createDog]);

    //control form
    useEffect(() => {
        //validate name
        const validateName = /^[A-Za-z]+$/;
        if((name.match(validateName) || name === '') && nameError){
            setErrors({...errors, nameError:false})
        }else if(!name.match(validateName) && name !=='' && !nameError){
            setErrors({...errors, nameError:true})
        }
        //validate numbers
        const validateNumbers = /^[0-9]+$/;
        //minheight
        if((minheight.match(validateNumbers) || minheight==='') && minheightError){
            setErrors({...errors, minheightError:false})
        } else if (!minheight.match(validateNumbers) && minheight !=='' && !minheightError){
            setErrors({...errors, minheightError:true})
        }
        //maxheight
        if((maxheight.match(validateNumbers) || maxheight==='') && maxheightError){
            setErrors({...errors, maxheightError:false})
        } else if (!maxheight.match(validateNumbers) && maxheight !=='' && !maxheightError){
            setErrors({...errors, maxheightError:true})
        }
    }, [name,errors,nameError,minheight,minheightError,maxheight,maxheightError]);

    //validate numbers 
    useEffect(() => {
        const validateNumbers = /^[0-9]+$/;
        //minweight
        if((minweight.match(validateNumbers) || minweight==='') && minweightError){
            setErrors({...errors, minweightError:false})
        } else if (!minweight.match(validateNumbers) && minweight !=='' && !minweightError){
            setErrors({...errors, minweightError:true})
        }
        //maxweight
        if((maxweight.match(validateNumbers) || maxweight==='') && maxweightError){
            setErrors({...errors, maxweightError:false})
        } else if (!maxweight.match(validateNumbers) && maxweight !=='' && !maxweightError){
            setErrors({...errors, maxweightError:true})
        }
    }, [errors, minweight, maxweight, minweightError, maxweightError]);

    useEffect(() => {
        const validateSpan = /^[0-9]+(-)[0-9]+$/;

        if((life_span.match(validateSpan) || life_span==='') && lifespanError){
            setErrors({...errors, lifespanError:false})
        } else if(!life_span.match(validateSpan) && life_span !== '' && !lifespanError){
            setErrors({...errors, lifespanError:true})
        }
    }, [errors,life_span,lifespanError]);

    const handleChange = (e) => {
        setNewDog({
            ...newdog,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        if(temperaments.includes(e.target.value)){
            return
        } else if(e.target.value){
            setNewDog({
                ...newdog,
                temperaments:[...temperaments, e.target.value]
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dog = {
            name: name.trim().toLocaleLowerCase(),
            height: `${minheight.trim()} - ${maxheight.trim()}`,
            weight: `${minweight.trim()} - ${maxweight.trim()}`,
            life_span: life_span.trim(),
            temperaments
        }
        dispatch(createNewDog(dog));
    }

    return ( 
        <div className={styles.bigContainer}>
        { response.msg ? <h2 className={styles.success}>{response.msg}</h2> : 
        
            <div className={styles.container}>
                <h2>New Dog</h2>

                <form
                    onSubmit={handleSubmit}
                >
                    {/* ----------------- Name -----------------*/}
                    <p>
                        <span>Breed Name:</span>    
                        <span>
                            <input type='text' name='name' value={name} onChange={handleChange}/>
                        </span>
                    </p>
                    {nameError ? <span className={styles.error}>Use only letters for the Breed Name</span> : null}

                    {/* ----------------- Heights -----------------*/}
                    <p>
                        <span>Min Height(cm):</span> 
                        <span>
                            <input type='text' name='minheight' value={minheight} onChange={handleChange}/>
                        </span>
                    </p>
                    { minheightError && minheight ? <span className={styles.error}>Use only numbers!</span> : null}
                    
                    <p>
                        <span>Max Height(cm):</span> 
                        <span>
                            <input type='text' name='maxheight' value={maxheight} onChange={handleChange}/>
                        </span>
                    </p>
                    { maxheightError && maxheight ? <span className={styles.error}>Use only numbers!</span> : null}
                    { parseInt(maxheight) < parseInt(minheight) && minheight !=='' && maxheight !== '' ? <span className={styles.error}>Min Heigh must be lower than Max Height!</span> : null}

                    {/*----------------- Weights -----------------*/}
                    <p>
                        <span>Min Weight(kg):</span> 
                        <span>
                            <input type='text' name='minweight' value={minweight} onChange={handleChange}/>
                        </span>
                    </p>
                    { minweightError && minweight ? <span className={styles.error}>Use only numbers!</span> : null}

                    <p>
                        <span>Max Weight(kg):</span> 
                        <span>
                            <input type='text' name='maxweight' value={maxweight} onChange={handleChange}/>
                        </span>
                    </p>
                    { maxweightError && maxweight ? <span className={styles.error}>Use only numbers!</span> : null}
                    { parseInt(maxweight) < parseInt(minweight) && minweight !=='' && maxweight !== '' ? <span className={styles.error}>Min Weigh must be lower than Max Weight!</span> : null}

                    {/*----------------- Life Span -----------------*/}
                    <p>
                        <span>Life Span(years):</span>  
                        <span>
                            <input type='text' name='life_span' value={life_span} onChange={handleChange}/>
                        </span>
                    </p>
                    { lifespanError && life_span ? <span className={styles.error}>Use only numbers with the format: Min Years-Max Years (No spaces between)</span> : null}

                    {/*----------------- Temperamenst -----------------*/}
                    <div>
                        <select
                            onChange={handleSelect}
                        >
                            <option value=''>--Select as many Temperaments as Necesary--</option>
                            {
                                temps.map( temp =>
                                    <option
                                        key={temp.id}
                                        value={temp.name}
                                    >{temp.name}</option>
                                )
                            }
                        </select>
                        <p>Temperaments:</p>
                        <p>
                            <textarea 
                                name='temperaments'
                                value={temperaments.join(', ')}
                                readOnly
                            ></textarea>
                        </p>
                    </div>
                    {
                        (name && minheight && maxheight && minweight && maxweight && life_span && temperaments.length > 0) &&
                        (!nameError && !minheightError && !maxheightError && !minweightError && !maxweightError && !lifespanError)  ?
                        <input 
                            type='submit'
                            value='Create New Breed'
                        />
                        : <footer>* All fields are Mandatory</footer>
                    }
                </form>
            </div>
        }
        </div>
     );
}
 
export default NewDog;