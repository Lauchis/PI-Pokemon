import React, { useState } from "react";
import Card from "./Card";
import { Link , useNavigate } from "react-router-dom";
import styles from './css/Cards.module.css';
import { useSelector } from "react-redux";
import Detail from "./Detail";



export default function Cards({actualPok}) {
    const [detail, setDetail] = useState(false);
    const navigate = useNavigate();
    console.log(detail)
    const [id, setId] = useState('');
    // const [name, setName] = useState('');
    const [pokemon, setPokemon] = useState('')
    console.log(pokemon)
    console.log(actualPok.speed)
    console.log(id)
    // function handleClick(e) {
    //     e.preventDefault();
    //     navigate (`/detail/${id}`)
    // }

    return (
        <div>
            {actualPok && actualPok.map((e) => {
                //mapeo los 12 de la pagina que se muestra con actualPok
                return (
                    <div>
                        {/* <button onClick={(e) => handleClick(e)}> */}
                        {/* <a href="/detail"> */}
                        <button onClick={() => {
                            setDetail(!detail);
                            // setId(e.id);
                            // setName(e.name);
                            setPokemon(e)
                        }}>
                            <Card
                                name = {e.name ? e.name : 'Name not found'}
                                image = {e.image ? e.image : 'Image not found'} //aca le puedo pasar una imagen por default
                                type = {e.type?.map((t) => t + '- ')}
                            />
                        </button>
                        {/* </a> */}
                    </div>
                )
            })}
            {detail && <Detail pokemon={pokemon} id={setId} display={setDetail} />}
            
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