const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { Type } = require('../db')

router.get('/', async(req, res, next) => {
    try{
        const types = await axios.get('https://pokeapi.co/api/v2/type');
        const allTypes = types.data.results; //obtengo un array con name y url
        allTypes.forEach((e) => {
            Type.findOrCreate({
                where: {
                    name: e.name,
                }
            })
        })
        let typeDb = await Type.findAll({
            attributes: ['id','name']
        });
        res.send(typeDb);
    }catch(e){
        next(e);
    }
})

module.exports = router;
