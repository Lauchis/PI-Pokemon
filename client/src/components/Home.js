import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../redux/actions';
import { Link } from 'react-router-dom';
import Cards from './Cards';
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import styles from './css/Home.module.css';

export default function Home () {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemon) //traigo todo lo que esta en el estado de pokemons
    console.log(allPokemons)
    const [order, setOrder] = useState('');
    const [actualPage, setActualPage] = useState(1);
    const [qty] = useState(12);
    const iLastPok = actualPage * qty; //12
    const iFirstPok = iLastPok - qty; 
    const actualPok = allPokemons.slice(iFirstPok, iLastPok);
    console.log(actualPok)
    const paginate = (number) => {
        setActualPage(number);
    }

    useEffect(() => {
        dispatch(getAllPokemons())
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAllPokemons());
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <SearchBar setActualPage={setActualPage} setOrder={setOrder}/>
            </header>
            <Link to = '/pokemon' className={styles.link}>CREATE  A  POKEMON</Link>
            <br/>
                <button onClick= {e => {handleClick(e)}}  className={styles.btn}>
                    Charge all Pokemons
                </button>
            <div className={styles.cards}>
            {actualPok.length ? (
                <Cards actualPok={actualPok} key={actualPok.id}/>
            ) : (
                <img src='https://i.kym-cdn.com/photos/images/original/000/891/176/b6f.gif' alt='' className={styles.img}/>
            )}
            </div>
            <div className={styles.paginate}>
                <Paginate 
                    qty={qty}
                    allPokemons={allPokemons.length}
                    paginate={paginate}
                />   
            </div>       
        </div>

    )
}