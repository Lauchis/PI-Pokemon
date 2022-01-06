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



//con las funciones en la otra carpeta
// router.get('/', async(req, res, next) => {
//     try{
//         let {name} = req.query;
//         if(!name){
//             // let pApi = await getPApi();
//             // let pDb = await getPDb();
//             let [pApi, pDb] = await Promise.all([getPApi(), getPDb()]);
//             console.log(pApi)
//             let allP = [pApi, pDb]
//             return allP;
//         } else {
//             let [pApiN, pDbN] = await Promise.all([getPApiName(), getPDbName()]);
//             console.log(pApiN)
//             let allPN = [pApiN, pDbN]
//             return allPN;
//         }
//     } catch(e) {
//         next(e);
//     }
// })

router.get('/', async (req, res, next) => {
    const {name} = req.query;
    if (name) {
        try {
            const pDb = await Pokemon.findAll({
                where: {
                    name: name
                },
                include: {
                    model: Type,
                    attributes: ['id','name']
                }
            })
            if (pDb != 0) {          
                let resp = pDb.map(p => {
                    return ({
                        id: p.id,
                        name: p.name,
                        hp: p.hp,
                        attack: p.attack,
                        defense: p.defense,
                        speed: p.speed,
                        weight: p.weight,
                        height: p.height,
                        image: p.image,
                        type: p.types.map((p)=>p.name),
                    })
                })
                res.send(resp);
            }else{
                const pApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                let respApi = [
                {
                    id: pApi.data.id,
                    name: pApi.data.name,
                    hp: pApi.data.stats[0].base_stat,
                    attack: pApi.data.stats[1].base_stat,
                    defense: pApi.data.stats[2].base_stat,
                    speed: pApi.data.stats[5].base_stat,
                    weight: pApi.data.weight,
                    height: pApi.data.height,
                    image: pApi.data.sprites.other.dream_world.front_default,
                    type: pApi.data.types.map(e => e.type.name),
                } ]
                    res.status(200).send(respApi)
            }        
        } catch (e) {
            return e.message.includes('404') 
                ? res.status(404).send('Can not find the Pokemon')
                : res.status(500).send(`Server error: ${error}`)
        }
    } else {
        //si no envian nada por query traigo todos los Pokemons
            try {
                let pDb = await Pokemon.findAll( {include :Type } )
                if (pDb) {
                    pDb = pDb.map(p => {
                        return {
                            id: p.id,
                            name: p.name,
                            hp: p.hp,
                            type: p.dataValues.types.map((p)=>p.dataValues.name),
                            image: p.image,
                            attack: p.attack,
                            defense: p.defense,
                            height: p.height,
                            weight: p.weight,
                        }
                    })
                }
                const pApi =  (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results;
                let pData = []
                    for (let p of pApi) {  
                        pData.push(axios.get(p.url))
                    }
                    let rApi = (await Promise.all(pData)).map(pok => {
                        return ({
                            id: pok.data.id,
                            name: pok.data.name,
                            hp: pok.data.stats[0].base_stat,
                            attack: pok.data.stats[1].base_stat,
                            defense: pok.data.stats[2].base_stat,
                            height: pok.data.height,
                            weight: pok.data.weight,
                            image: pok.data.sprites.other.dream_world.front_default,
                            type: pok.data.types.map(e => e.type.name),
                        })
                    })
                res.send(pDb.concat(rApi))
            } catch (e) {
                next(e);
            }
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

// router.post('/', async(req, res, next) => {
//     let {name, hp, attack, defense, speed, height, weight, type, image} = req.body;
//     try {
//         let newPokemon = await createP(name, hp, attack, defense, speed, height, weight, type, image);
//         res.send(newPokemon)
//     } catch(e) {
//         next(e);
//     }
// })



router.post("/", async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, image, type } = req.body;
    try {
        const newPoke = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
        })
        await newPoke.addTypes(type); 
        const typeFind = await Type.findAll({
            where: {
                name: type
            },
        })
        newPoke.addType(typeFind);
        console.log(newPoke);
        console.log(typeFind)//algo aca esta mal, me da []
        return res.send(newPoke);
    } catch (error) {
        next(error)
    }
})


module.exports = router;
