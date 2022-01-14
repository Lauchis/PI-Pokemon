import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetail } from "../redux/actions";
import styles from './css/Detail.module.css';

export default function Detail({pokemon, display}) {
    const dispatch = useDispatch();
    console.log(pokemon)
    const [id] = useState('')
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    function handleClose(e) {
        e.preventDefault();
        display(false);
    }

    return (
        <div className={styles.container}>
            {pokemon?
                <div className={styles.card}>
                    <h1>{pokemon.name.toUpperCase()}</h1>
                    <div className={styles.img}>
                        <img src={pokemon.image} alt="Pokemon" />
                    </div>
                    <div className={styles.title}>
                        <h2>Number ID: {pokemon.id} </h2>
                        <h2>Life: {pokemon.hp}</h2>
                        <h2>Attack Points: {pokemon.attack}</h2>
                        <h2>Defense Points: {pokemon.defense}</h2>
                        <h2>Speed: {pokemon.speed}</h2>
                        <h2>Height: {pokemon.height / 10} meters</h2>
                        <h2>Weight: {pokemon.weight /10} kg</h2>
                        <h2>Type: {pokemon.type?.map((t) => t + '- ')}</h2>
                    </div>
                </div>
            : <p>Loading...</p>}
            <div>
                <button onClick={(e) => handleClose(e)} className={styles.btn}>CLOSE</button>
            </div>
        </div>
    )
}