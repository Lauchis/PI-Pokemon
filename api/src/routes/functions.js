const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

const getPApi = async() => {
    try {
        let array = [];
        let pApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
        
        let pokApi = pApi.data;
        if(pokApi) {
            array.push({
                id: pokApi.id,
                name: pokApi.name,
                hp: pokApi.stats[0].base_stat,
                attack: pokApi.stats[1].base_stat,
                defense: pokApi.stats[2].base_stat,
                speed: pokApi.stats[5].base_stat,
                height: pokApi.heigtht,
                weight: pokApi.weight,
                image: pokApi.sprites.front_default,
                type: pokApi.types.map((t) => {return {name: t.type.name}})
            })
        } return array;
    } catch(e){
        console.log(e);
    }
}

const getPDb = async() => {
    try {
        let pDb = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['id','name'],
            },
            attributes: ['id','name','hp','attack','defense','speed','height','weight','image']
        })
        return pDb;
    }catch(e) {
        console.log(e);
    }    
}

const getPApiName = async(name) => {
    try {
        let pokApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let pokApiData = pokApi.data;
        console.log(pokeApiData)
        let pokeApi = {
            id: pokApiData.id,
            name: pokApiData.name,
            hp: pokApiData.stats[0].base_stat,
            attack: pokApiData.stats[1].base_stat,
            defense: pokApiData.stats[2].base_stat,
            speed: pokApiData.stats[5].base_stat,
            height: pokApiData.heigtht,
            weight: pokApiData.weight,
            image: pokApiData.sprites.front_default,
            type: pokApiData.types.map((t) => {return {name: t.type.name}})
        }
        return pokeApi;
    } catch(e) {
        console.log('That Pokemon does not exist');
    }
}

const getPDbName = async(name) => {
    try {
        let pokDb = await Pokemon.findAll({
            where: {
                name: name,
            },
            attributes: ['id','name','hp','attack','defense','speed','height','weight','image'],
            include: {
                model: Type,
                attributes: ['id','name']
            }
        })
        return pokDb;
    } catch(e) {
        console.log('That Pokemon does not exist');
    }
}

const getPApiId = async(id) => {
    try{ 
        let pokeApiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let pApiIdData = pokeApiId.data;
        return {
            id: pApiIdData.id,
            name: pApiIdData.name,
            hp: pApiIdData.stats[0].base_stat,
            attack: pApiIdData.stats[1].base_stat,
            defense: pApiIdData.stats[2].base_stat,
            speed: pApiIdData.stats[5].base_stat,
            height: pApiIdData.heigtht,
            weight: pApiIdData.weight,
            image: pApiIdData.sprites.front_default,
            type: pApiIdData.types.map((t) => t.type.name)    
        }
    }catch(e) {
        console.log(e);
    }
}

const getPDbId = async(id) => {
    try {
        let pokeDbId = await Pokemon.findByPk(id, {
            include: {
                model: Type,
                attributes: ['id', 'name'],
            }
        })
        return pokeDbId;
    } catch(e) {
        console.log(e);
    }
}

const createP = async({name, hp, attack, defense, speed, height, weight, type, image}) => {
    try {
        let newP = await Pokemon.create({
            id, name, hp, attack, defense, speed, height, weight, type, image
        });
        await newP.addType(type);
    }catch(e) {
        console.log(e);
        console.log('Your Pokemon can not be create')
    }
}

module.exports = {
    getPApi, 
    getPDb, 
    getPApiName, 
    getPDbName,
    getPApiId,
    getPDbId,
    createP
}
