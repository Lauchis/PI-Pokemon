import React from "react";
import styles from './css/Paginate.module.css';

export default function Paginate({qty, allPokemons, paginate}) {
    const page = [];
    for(var i = 1; i <= Math.ceil(allPokemons / qty); i++) {
        page.push(i);
    }
    return (
        <div>
            <ul>
                {page && page.map((number) => (
                    <li className={styles.number} key={number}>
                        <button onClick={() => paginate(number)} key={number + 1} className={styles.btn}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

//este return lo probe con las flechitas y Previos y Next en ligar de los numeros
//     return (
//         <div className="containerhome">

//             <div className="botones">
//                 <button onClick={previusPage} className="pages">
//                     &laquo; Previous
//                 </button>
//                 <button onClick={nextPage} className="pages">
//                     Next &raquo;
//                 </button>
//             </div>

//         </div>
//     );





//loading image={"https://i.kym-cdn.com/photos/images/original/000/891/176/b6f.gif"}