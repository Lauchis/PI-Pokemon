const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

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

module.exports = {
    getPApiId,
    getPDbId
}


// {
//     "name": "laura",
//     "hp": "32", 
//     "attack": "39",
//     "defense": "66",
//     "speed": "47",
//     "height": "93",
//     "weight": "38",
//     "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/217.png",
//     "type":["6","2"]
// }

