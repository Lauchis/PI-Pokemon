import React from "react";
import styles from './css/Card.module.css';

export default function Card ({name, image, type}) {
    return (
        <div>
            <h3>{name}</h3>
            <div>
                <img src={image} alt="img" />
                <div>
                    <ul>
                        <li>
                            <h4>{type}</h4>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}