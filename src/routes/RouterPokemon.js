const { Router } = require('express');
const getPokemonAll = require('../controllers/getPokemonAll')
const getPokNameOrId = require('../controllers/getPokNameOrId');
const postPokemon = require('../controllers/postPokemon')
const {Type} = require('../db');
const getAllNamePok = require('../controllers/getAllNamePok');

const router = Router();

router.get('/', async (req, res) => { 
    const {name} = req.query    
    try {
        if(name){
            const poke = await getPokNameOrId({name})
            return res.json(poke)
        } else {
            console.log('paso por ALL');
            const pokemones = await getPokemonAll()
            return res.json(pokemones)
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});


router.get('/:id', async (req, res) => {
    const {id} = req.params    
    try {
        if(id === 'allNames'){
            const pokNames = await getAllNamePok()
            return res.json(pokNames)
        }
        const pokeID = await getPokNameOrId({id})
        res.json(pokeID)        
    } catch (error) {
        res.status(500).json({error: error.message})
    }  
});

router.post('/', async (req, res) => {
    console.log(req.body);
    try {      
        let newPok = req.body;        
        let {pokCreated} = await postPokemon(newPok)
        console.log(pokCreated);
        //busco tipo de pokemon de la DB..
        let typesDb = await Type.findAll({ where: { name: newPok.type } });
        //asocio el pokemon a la DB
        pokCreated.addType(typesDb);
        res.status(201).send('Pokemon Creado');
        
    } catch (error) {
        res.status(500).json({error: error.messaje})
        console.log(error);
    }
});

module.exports = router;