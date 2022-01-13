import React from "react";
import styles from './css/Card.module.css';

export default function Card ({name, image, type}) {
    return (
        <div>
            <h2>{name}</h2>
            <div>
                <img src={image} alt="img" />
                <div>
                    <ul>
                        <li>
                            <h3>{type}</h3>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}