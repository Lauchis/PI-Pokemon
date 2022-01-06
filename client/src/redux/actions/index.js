import axios from 'axios';

export function getAllPokemons() {
    return async function (dispatch){
        var resp = await axios.get ('http://localhost:3001/pokemon');
        // var resp = await axios.get ('/api/pokemon');
        return dispatch({
            type: 'GET_ALL_POKEMONS',
            payload: resp.data
        })
    }
}

export function getByName(name) {
    return async function (dispatch){
        try {
            var resp = await axios.get (`http://localhost:3001/pokemon?name=${name}`);
            //var resp = await axios.get (`http://api/pokemons?name=${name}`);
            return dispatch({
                type: 'GET_BY_NAME',
                payload: resp.data
            })
        } catch (e) {
            console.log(e);
        }

    }
}

export function order(order) {
    return function (dispatch) {
        dispatch({
            type: 'ORDER',
            payload: order
        })
    }
}
