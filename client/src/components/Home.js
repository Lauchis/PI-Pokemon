import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getByName } from '../redux/actions';
import { Link } from 'react-router-dom';
import Cards from './Cards';
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import styles from './css/Home.module.css';



export default function Home () {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemon) //traigo todo lo que esta en el estado de pokemons

    const [order, setOrder] = useState('');
    const [actualPage, setActualPage] = useState(1);
    

    useEffect(() => {
        dispatch(getAllPokemons())
    }, []);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllPokemons());
    }

    return (
        <div>
            <header>
                <SearchBar />
            </header>
            <Paginate />
            <Link to = '/pokemon'>Create a Pokemon</Link>
            <button onClick= {e => {handleClick(e)}}>
                Charge all Pokemons
            </button>
            <div>
                <select>
                    <option value= 'all'>All</option>
                    <option value= 'created'>Created</option>
                    <option value= 'api'>Actual</option>
                </select>
            </div>
            <Cards />
        </div>
    )
}