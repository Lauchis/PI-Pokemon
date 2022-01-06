import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName, order } from "../redux/actions";
import styles from './css/SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleButtonSubmit(e) {
        e.preventDefault();
        dispatch(getByName(name));
        setName('');
    }

    function orderBy(e) {
        dispatch(order(e.target.value));
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Name of Pokemon..."
                onChange={(e) => handleInputChange(e)}
            />
            <button
                type="submit"
                onClick={(e) => handleButtonSubmit(e)}
            >Search</button>
            <select name="Order by" onChange={orderBy}>
                <option value="a-z">Order By:</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="fuerza+">Most Strong</option>
                <option value="fuerza-">Less Strong</option>
            </select>
        </div>
    )
}
