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
    if (input.hp < 0 || input.hp > 999) {
        error.hp = 'The prop HP must be a number between 0 and 999'
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
        <div>
            <Link to= '/home'>Back</Link>
            <h1>Create your own Pokemon</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input onChange={(e) => handleChange(e)} type='text' value={input.name} name="name" placeholder="Name of Pokemon..." />
                    {error.name && (
                        <p>{error.name}</p>
                    )}
                </div>
                <div>
                    <label>HP:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.hp} name="hp" placeholder="Points..." />
                </div>
                <div>
                    <label>Attack:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.attack} name="attack" placeholder="Points..." />
                </div>
                <div>
                    <label>Defense:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.defense} name="defense" placeholder="Points..." />
                </div>
                <div>
                    <label>Speed:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.speed} name="speed" placeholder="Points..." />
                </div>
                <div>
                    <label>Height:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.height} name="height" placeholder="Height..." />
                </div>
                <div>
                    <label>Weight:</label>
                    <input onChange={(e) => handleChange(e)} type='number' min='0' max='999' value={input.weight} name="weight" placeholder="Weight..." />
                </div>
                <div>
                    <label>Image:</label>
                    <input onChange={(e) => handleChange(e)} type='text' value={input.image} name="image" placeholder="Url Pokemon image..." />
                </div>
                <div>
                    <label>Type:</label>
                    <select onChange={(e) =>handleSelect(e)}>
                        {options?.map((t) => (
                            <option value={t.id} key={t.id}>{t.name} - Num:{t.id}</option>
                        ))}
                    </select>
                    {/* <ul>
                        <li>
                            {input.type.map(t => t + ' - ')}
                        </li>
                    </ul> */}
                     {input.type.map((t) => (
                        <div key={t}>
                            <p>Num: {t}</p>
                            <button onClick={() => handleDelete(t)}>X</button>
                        </div>
                    ))}
                </div>
                <button type="submit">Create the Pokemon!</button>
            </form>
        </div>
    )
}
