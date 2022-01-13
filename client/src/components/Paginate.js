import React from "react";
import styles from './css/Paginate.module.css';

export default function Paginate({qty, allPokemons, paginate}) {
    const page = [];
    for(var i = 1; i <= Math.ceil(allPokemons / qty); i++) {
        page.push(i);
    }
    return (
        <div>
            <ul className={styles.paginate}>
                {page && page.map((number) => (
                    <li className={styles.number} key={number}>
                        <button onClick={() => paginate(number)} key={number}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}


// export default function Paginate () { 
//     let pokemons = useSelector((store) => store.pokemon);

//     let [page, setPage] = useState(0);
//     let prox = 0;
//     const pagination = () => {
//         if ((prox === 0 ) && (page === 0)){
//             if (pokemons.length){
//                 prox = prox + 12;
//                 return pokemons.slice(page, page + 12);    
//             }
//             if (pokemons.info) return pokemons;
//             return [];
      
//         }
//         if (page >= 12){
//             if (pokemons.length) return pokemons.slice(page, page + 12);
//             if (pokemons.info) return pokemons;
//             return []; 
//         }
//     };
//     const array = pagination();
//     const nextPage = () => {
//         if (pokemons.length > page + 12) {
//             if (prox === 12){
//                 page = page + 12;
//                 setPage(page);
//             }else{
//                 setPage(page + 12);
//             }
//         }
//     }
//     const previusPage = () => {
//         if (page > 12) {
//             setPage(page - 12);      
//         }if (page === 12) {
//             setPage(page - 9);
//         }
//     }
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
// };




//loading image={"https://i.kym-cdn.com/photos/images/original/000/891/176/b6f.gif"}