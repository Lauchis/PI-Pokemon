const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Type } = require('../db.js');
const { getPApiId, getPDbId } = require('./functions')

const router = Router();

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
                            type: p.dataValues.types.map((p) => p.dataValues.name),
                            image: p.image,
                            attack: p.attack,
                            defense: p.defense,
                            speed: p.speed,
                            height: p.height,
                            weight: p.weight,
                        }
                    })
                }
                //con .next para llegar a la siguiente pagina--pero se me hacia mas lenta la carga
                // const pApi = (await axios.get('https://pokeapi.co/api/v2/pokemon')).data;
                // const pApiR = pApi.results;
                // let pData = [];
                // const pApi2 = (await axios.get(pApi.next)).data.results;
                // const totP = [...pApiR, ...pApi2];
                // for(let i = 0; i < totP.length; i++) {
                //     let pDetail = (await axios.get(totP[i].url)).data;
                //     pData.push({
                //         id:pDetail.id,
                //         name: pDetail.name,
                //         attack: pDetail.stats[1].base_stat,
                //         defense: pDetail.stats[2].base_stat,
                //         height: pDetail.height,
                //         weight: pDetail.weight,
                //         image: pDetail.sprites.other.dream_world.front_default,
                //         type: pDetail.types.map(e => e.type.name),
                //     })
                // }
                // res.send(pDb.concat(pData));

                //con limite de 40 al final de la ruta
                //lo deje asi porque la info tardaba menos en llegar
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
                            speed: pok.data.stats[5].base_stat,
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


//--- en esta ruta modularice las funciones

router.get('/:id', async(req, res, next) => {
    let {id} = req.params;
    //en la Api hay 898 pokemons.
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
        //console.log(newPoke);
        console.log(typeFind);
        return res.send(newPoke);
    } catch (error) {
        next(error)
    }
})


module.exports = router;
