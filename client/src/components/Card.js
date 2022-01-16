import React from "react";
import styles from './css/Card.module.css';

export default function Card ({name, image, type}) {
    return (
        <div className={styles.container} key={name}>
            <h2 className={styles.name} data-testid='name'>{name.toUpperCase()}</h2>
            <div className={styles.img}>
                <img src={image} alt="img" key='img' data-testid='image' />
                <div key={name}>
                    <ul>
                        <li>
                            <h3 className={styles.type} key={type}>{type}</h3>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}