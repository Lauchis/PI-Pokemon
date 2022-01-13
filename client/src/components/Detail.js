import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getDetail } from "../redux/actions";
import styles from './css/Detail.module.css';

export default function Detail({pokemon, display}) {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    //const pokeDetail = useSelector((state) => state.pokemon);
    console.log(pokemon)
    console.log(pokemon.speed)
    console.log(pokemon.attack)
    const [id, setId] = useState('')
    //console.log(id)
    //console.log(id.id)
    useEffect(() => {
        dispatch(getDetail(id));
    }, [id]);

    function handleClose(e) {
        e.preventDefault();
        display(false);
        // navigate ('/home');
    }

    return (
        <div>
            {pokemon?
                <div>
                    <h1>{pokemon.name}</h1>
                    <div>
                        <img src={pokemon.image} alt="Pokemon image" />
                    </div>
                    <div>
                        <h2>Number ID: {pokemon.id} </h2>
                        <h2>Life: {pokemon.hp}</h2>
                        <h2>Attack Points: {pokemon.id}</h2>
                        <h2>Defense Points: {pokemon.defense}</h2>
                        <h2>Speed: {pokemon.speed}</h2>
                        <h2>Height: {pokemon.height / 10} meters</h2>
                        <h2>Weight: {pokemon.weight /10} kg</h2>
                        <h2>Type: {pokemon.type?.map((t) => t + '- ')}</h2>
                    </div>
                </div>
            : <p>Loading...</p>}
            <div>
                <button onClick={(e) => handleClose(e)}>Close</button>
            </div>
        </div>
    )
}