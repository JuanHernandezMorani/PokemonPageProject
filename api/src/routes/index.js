const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemons = require('./pokemons.js');
const types = require('./types.js');
const abilities = require('./abilities.js');
const moves = require('./moves.js');
const deleted = require('./deleted.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemons);
router.use('/types', types);
router.use('/abilities', abilities);
router.use('/moves', moves);
router.use('/deleted', deleted);


module.exports = router;