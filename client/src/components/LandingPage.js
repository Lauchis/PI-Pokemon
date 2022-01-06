import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/LandingPage.module.css';

export default function LandingPage(){
    return (
        <div className={styles.container}>
            <div className={styles.inside}>
                <h1>Welcome to Pokemons Page</h1>
                <Link to ='/home'>
                    <button className='{styles.btn}'>Start</button>
                </Link>
            </div>
        </div>
    )
}