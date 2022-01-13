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
            alert('This Pokemon does not exist');
            return console.log(e);
        }

    }
}

export function orderAz(payload) {
    return {
        type: 'ORDER_AZ',
        payload // 'a-z' o 'z-a'
    }
}

export function orderAttack(payload) {
    return {
        type: 'ORDER_ATTACK',
        payload
    }
}

export function getTypes() {
    return async function (dispatch) {
        try{
            var resp = await axios.get('http://localhost:3001/type');
            return dispatch({
                type: 'GET_TYPES',
                payload: resp.data
            })
        } catch(e) {
            console.log(e);
        }
    }
}

export function filterType(type) {
    return function (dispatch) {
        dispatch({
            type: 'FILTER_TYPE',
            payload: type
        })
    }
}

export function filterDb(payload) {
    return {
        type: 'GET_DB',
        payload
    }
}

export function postPokemon(payload) {
    return async function (dispatch) {
        const resp = await axios.post('http://localhost:3001/pokemon', payload);
        console.log(payload);
        console.log(resp);
        return dispatch({
            type: 'POST_POKEMON',
            payload: resp // nose si es resp o {}
        });
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var resp = await axios.get(`http://localhost:3001/pokemon/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: resp.data
            })
        } catch(e) {
            console.log(e)
        }
    }
}