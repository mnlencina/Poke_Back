const { Router } = require('express');
const RouterType = require('./RouterType.js');
const RouterPokemon = require('./RouterPokemon.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', RouterPokemon)
router.use('/tipo', RouterType);

module.exports = router;
