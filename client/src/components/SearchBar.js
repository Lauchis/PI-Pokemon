import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName, orderAz, orderAttack, getAllPokemons, filterType, getTypes, filterDb } from "../redux/actions";
import styles from './css/SearchBar.module.css';

export default function SearchBar({setActualPage, setOrder}) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    console.log(name)
    const options = useSelector((state) => state.type);
    console.log(options)//deberia traeme array de types
    
    useEffect(() => {
        //setActualPage(1);
        dispatch(getTypes())
    }, [dispatch]);

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // const validate = pokemon.filter((p) => {
        //     p.name.includes(name)
        // });
        // if (validate.length <= 0) {
        //     setName('');
        //     return alert ('This Pokemon does not exist');
        // } else {
        //     dispatch(getByName(name));
        // }
        dispatch(getByName(name));
        setName('');
    }

    function handleOrderAz(e) {
        e.preventDefault();
        dispatch(orderAz(e.target.value));
        setActualPage(1);
        setOrder(`Order by ${e.target.value}`);
    }

    function handleOrderAttack(e) {
        //e.preventDefault();
        dispatch(orderAttack(e.target.value));
        setActualPage(1);
        setOrder(`Order by ${e.target.value}`);
    }

    function handleFilterDb(e) {
        e.preventDefault();
        dispatch(filterDb(e.target.value));
    }

    function handleFilterType(e) {
        e.preventDefault();
        //dispatch(getAllPokemons());
        dispatch(filterType(e.target.value));
        console.log(e.target.value);
        setActualPage(1);
        setOrder(`Filter by ${e.target.value} type`)
    }

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Name of Pokemon..."
                onChange={(e) => handleInputChange(e)}
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
                className={styles.input}
            />
            <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
              //  key= {name}
                className={styles.btn}
            > ► Search 
            </button>
            <br/>
            <div className={styles.order}>
                <label className={styles.label}>ORDER BY NAME:</label>
                <label className={styles.label}>
                    <input onChange={(e) => handleOrderAz(e)} type='checkbox' name='a-z' value='a-z' className={styles.input}></input>
                    A-Z
                </label>
                <label className={styles.label}>
                    <input onChange={(e) => handleOrderAz(e)} type='checkbox' name="z-a" value='z-a' className={styles.input}></input>
                    Z-A
                </label>
                {/* <select onChange={(e) => handleOrderAz(e)}>
                    <option value="a-z"> A-Z </option>
                    <option value="z-a"> Z-A </option>
                </select> */}
            </div>
            <div className={styles.order}>
                <label className={styles.label}>ORDER BY ATTACK:</label>
                <label className={styles.label}>
                    <input onChange={(e) => handleOrderAttack(e)} type='checkbox' name='+attack' value='+attack' className={styles.input}></input>
                    More Attack
                </label>
                <label className={styles.label}>
                    <input onChange={(e) => handleOrderAttack(e)} type='checkbox' name="-attack" value='-attack' className={styles.input}></input>
                    Less Attack
                </label>
                {/* <select onChange={(e) => handleOrderAttack(e)}>
                    <option value="+attack"> Order by: </option>
                    <option value="+attack"> More Attack </option>
                    <option value="-attack"> Less Attack </option>
                </select> */}
            </div>
            <div className={styles.order}>
                <label className={styles.label}>FILTER BY: </label>
                <select onChange={(e) => handleFilterDb(e)} className={styles.label}>
                    <option value= 'created' className={styles.label}>Created</option>
                    <option value= 'api'className={styles.label}>Actual</option>
                </select>
            </div>
            <div className={styles.order}>
                <label className={styles.label}>TYPES:</label>
                <select onChange={(e) => handleFilterType(e)} name="type" className={styles.label}>
                    <option value='all' className={styles.label}>all</option>
                    {options?.map((t) => (
                        <option value={t.name} key={t.id} className={styles.label}>{t.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
