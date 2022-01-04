const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
const { getPApi, getPDb, getPApiName, getPDbName, getPApiId, getPDbId, createP } = require('./functions')

const router = Router();

// router.get('/', async(req, res, next) => {
//     let {name} = req.query;
//     //obtener pokemons de api
//     try {
//         let array = [];
//         let pApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
//         let pokApi = pApi.data;
//         if(pokApi) {
//             array.push({
//                 id: pokApi.id,
//                 name: pokApi.name,
//                 hp: pokApi.stats[0].base_stat,
//                 attack: pokApi.stats[1].base_stat,
//                 defense: pokApi.stats[2].base_stat,
//                 speed: pokApi.stats[5].base_stat,
//                 height: pokApi.heigtht,
//                 weight: pokApi.weight,
//                 image: pokApi.sprites.front_default,
//                 type: pokApi.types.map((t) => {return {name: t.type.name}})
//             })
//             console.log(array);
//         } res.send(array);
//     } catch(e){
//         next(e);
//     }

//     //obtener pokemons de DB
//     try {
//         let pDb = await Pokemon.findAll({
//             include: {
//                 model: Type,
//                 attributes: ['id','name','hp','attack','defense','speed','height','weight','image'],
//             },
//         })
//         console.log(pDb);
//         return pDb;
//     }catch(e) {
//         next(e);
//     }

// })

router.get('/', async(req, res, next) => {
    try{
        let {name} = req.query;
        if(!name){
            // let pApi = await getPApi();
            // let pDb = await getPDb();
            let [pApi, pDb] = await Promise.all([getPApi(), getPDb()]);
            console.log(pApi)
            let allP = [pApi, pDb]
            return allP;
        } else {
            let [pApiN, pDbN] = await Promise.all([getPApiName(), getPDbName()]);
            console.log(pApiN)
            let allPN = [pApiN, pDbN]
            return allPN;
        }
    } catch(e) {
        next(e);
    }
})

router.get('/:id', async(req, res, next) => {
    let {id} = req.params;
    //en la Api hay 1119 pokemons.
    try {
        if(id.length < 5) {//significa que es de la api
           let pApiId = await getPApiId(id);
           if(pApiId) return res.json(pApiId);
           return res.status(404).send('The ID does not exist');
        } else {
            let pDbId = await getPDbId(id)
            if(pDbId) return res.json(pDbId);
            return res.status(404).send('The ID does not exist');
        }
    } catch(e){
        next(e);
    }
})

router.post('/', async(req, res, next) => {
    try {
        let {id, name, hp, attack, defense, speed, height, weight, type, image} = req.body;
        let newPokemon = await createP(id, name, hp, attack, defense, speed, height, weight, type, image);
        if(newPokemon){

        }
    } catch(e) {
        next(e);
    }
})

module.exports = router;
