const initialState = {
    pokemon: []
}

function rootReducer (state = initialState, action) {
    switch(action.type) {

        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemon: action.payload
            }

        case 'GET_BY_NAME':
            return {
                ...state,
                pokemon: action.payload
            }

        case 'ORDER':
            return {
                ...state,
                order: action.payload
            }
            
        default: 
            return state;
    }

}

export default rootReducer;