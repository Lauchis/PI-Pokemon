//import axios from "axios"

const initialState = {
    pokemon: [],
    allPokemons: [],
    type: [],
    order: [],
}

function rootReducer (state = initialState, action) {
    const allPokemons = state.allPokemons;

    switch(action.type) {

        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemon: action.payload,
                allPokemons: action.payload
            }

        case 'GET_BY_NAME':
            return {
                ...state,
                pokemon: action.payload
            }


        case 'ORDER_AZ':
            let arrSort = action.payload === 'a-z'
                    ? state.pokemon.sort(function(x, y) {
                        if(x.name.toLowerCase() > y.name.toLowerCase()) return 1;
                        if(y.name.toLowerCase() > x.name.toLowerCase()) return -1;
                        return 0;
                    })
                    : state.pokemon.sort(function(x, y) {
                        if(x.name.toLowerCase() > y.name.toLowerCase()) return -1;
                        if(y.name.toLowerCase() > x.name.toLowerCase()) return 1;
                        return 0;
                    })
                return {
                    ...state,
                    pokemon: arrSort
                }

        case 'ORDER_ATTACK':
            let arraySort = action.payload === '+attack'
                ? state.pokemon.sort(function(x,y) {
                    if(x.attack > y.attack) return -1;
                    if(y.attack > x.attack) return 1;
                    return 0;
                })
                : state.pokemon.sort(function(x,y) {
                    if(x.attack > y.attack) return 1;
                    if(y.attack > x.attack) return -1;
                    return 0;
                })
            return {
                ...state,
                pokemon: arraySort
            }

        case 'GET_TYPES':
            return {
                ...state,
                type: action.payload
            }

        case 'FILTER_TYPE':
            let typeFilter = 
                action.payload === 'all'
                    ? allPokemons
                    : allPokemons.filter((e) => e.type.includes(action.payload)) 
            return {
                ...state,
                pokemon: typeFilter
            }

        case 'GET_DB':
            let resp = 
                action.payload === 'created'
                    ? allPokemons.filter((e) => e.id.toString().length > 5)
                    : allPokemons.filter((e) => e.id.toString().length <= 5)
            // let from = state.pokemon.map((e) => 
            //     e.id.length
            // )
            // let resp = action.payload === 'created' 
            //     ? from > 5 : from <= 5
                return {
                    ...state,
                    pokemon: resp
                }

        case 'POST_POKEMON':
            return {
                ...state
            }

        case 'GET_DETAIL' :
            return {
                ...state,
                detail: action.payload
            }

        default: 
            return state;
    }

}

export default rootReducer;