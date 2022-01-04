const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRouter = require('./pokemon.js');
const typeRouter = require('./type.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', pokemonRouter);
router.use('/type', typeRouter);

module.exports = router;
