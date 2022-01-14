import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTypes, postPokemon } from "../redux/actions";
import styles from './css/Create.module.css';

function validate(input) {
    let error = {};
    const validateName = new RegExp('^[A-Z]+$', 'i');
    if(!input.name || !validateName.test(input.name)) {
        error.name = 'You must set a valid name';
    }
    return error;
}

export default function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = useSelector((state) => state.type);
    console.log(options)
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        type: [],
    });
    const [error, setError] = useState({});

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
            },
        e.target.name
        ))
    }

    function handleSelect(e) {
        setInput({
                ...input,
                type: [...input.type, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postPokemon(input));
        alert('Congratulations!  Your Pokemon was successfully created!');
        setInput({name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', image: '', type: [] });
        navigate('/home');
    }

    function handleDelete(e) {
        setInput({
            ...input,
            type: input.type.filter((t) => t !== e)
        })
    }

    return (
        <div className={styles.container}>
            <Link to= '/home' className={styles.link}>Back</Link>
            <h1>Create your own Pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div className={styles.input}>
                    <label>Name:</label>
                    <input onChange={(e) => handleChange(e)} type='text' value={input.name} name="name" placeholder="Name of Pokemon..." required />
                    {error.name && (
                        <p className={styles.error}>{error.name}</p>
                    )}
                </div>
                <div className={styles.input}>
                    <label>HP:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.hp} name="hp" placeholder="Points..." />
                </div>
                <div className={styles.input}>
                    <label>Attack:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.attack} name="attack" placeholder="Points..." />
                </div>
                <div className={styles.input}>
                    <label>Defense:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.defense} name="defense" placeholder="Points..." />
                </div>
                <div className={styles.input}>
                    <label>Speed:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.speed} name="speed" placeholder="Points..." />
                </div>
                <div className={styles.input}>
                    <label>Height:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.height} name="height" placeholder="Height..." />
                </div>
                <div className={styles.input}>
                    <label>Weight:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.weight} name="weight" placeholder="Weight..." />
                </div>
                <div className={styles.input}>
                    <label>Image:</label>
                    <input onChange={(e) => handleChange(e)} type='text' value={input.image} name="image" placeholder="Url Pokemon image..." />
                </div>
                <div className={styles.input}>
                    <label>Type:</label>
                    <select onChange={(e) =>handleSelect(e)}>
                        {options?.map((t) => (
                            <option value={t.id} key={t.id}>{t.name} - Num:{t.id}</option>
                        ))}
                    </select>
                     {input.type.map((t) => (
                        <div key={t} className={styles.type}>
                            <p>Num: {t}</p>
                            <button onClick={() => handleDelete(t)} className={styles.btnDel}>X</button>
                        </div>
                    ))}
                </div>
                <button type="submit" className={styles.btn}>Create the Pokemon!</button>
            </form>
        </div>
    )
}
