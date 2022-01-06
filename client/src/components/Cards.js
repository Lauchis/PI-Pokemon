import React, { useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import styles from './css/Cards.module.css';


export default function Cards({pokemon}) {
    return (
        <div>
            {pokemon && pokemon.map((e) => {
                return (
                    <div>
                        <Card
                            name = {e.name ? e.name : 'Name not found'}
                            image = {e.image ? e.image : 'Image not found'}
                            type = {e.type?.map((t) => t.name)} 
                        />
                    </div>
                )
            })}
        </div>
    )
}

// export default function Cards ({array, img}) {
//     return (
//         <>
//           <div>
//             {array.length ? (
//               array.map((p) => (
//                 <Link to={`/pokemons/${p.id}`} key={p.name}>
//                   <figure className={p.type[0]}>
//                     <div>
//                       <img src={p.img} alt="" className="CardImage" />
//                     </div>
//                     <figcaption>
//                     <h2>{p.name}</h2>
//                       {p.type.length === 2 ? (
//                         <div>
//                           <h3>{p.type[0]}</h3>
//                           <h3>{p.type[1]}</h3>
//                         </div>
//                       ) : (
//                         <div>
//                           <h3>{p.type[0]}</h3>
//                         </div>
//                       )}  
//                     <h4>ATTACK: {p.attack}</h4>
                    
//                     </figcaption>
//                   </figure>
//                 </Link>
//               ))
//             ) : (
//               <img
//                 src={
//                   array.info
//                     ? "https://media.giphy.com/media/UHAYP0FxJOmFBuOiC2/giphy.gif"
//                     : img
//                 }
//                 alt="Not found"
//               />
//             )}
             
//           </div>
//         </>
//       );
// }