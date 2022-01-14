import React, { useState } from "react";
import Card from "./Card";
import styles from './css/Cards.module.css';
import Detail from "./Detail";



export default function Cards({actualPok}) {
    const [detail, setDetail] = useState(false);
    // console.log(detail)
    const [id, setId] = useState('');
    const [pokemon, setPokemon] = useState('');

    return (
        <div className={styles.container}>
            {actualPok && actualPok.map((e) => {
                //mapeo los 12 de la pagina que se muestra con actualPok
                return (
                    <div className={styles.inside} key={id}>
                        <button className={styles.btn} onClick={() => {
                            setDetail(!detail);
                            setPokemon(e)
                        }}>
                            <Card
                                key={e.id}
                                name = {e.name ? e.name : 'Name not found'}
                                image = {e.image ? e.image : 'Image not found'} //aca le puedo pasar una imagen por default
                                type = {e.type?.map((t) => t + ' √   ')}
                            />
                        </button>
                    </div>
                )
            })}
            {detail && <Detail key={id} pokemon={pokemon} id={setId} display={setDetail} />}
            
        </div>
    )
}
