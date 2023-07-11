const axios = require('axios')
const { Pokemon, Type} = require("../db");

const getPokNameOrId = async (req, res)=>{
 let {id, name} = req
 let urlGet;
 try {
     if (id){
        if(id.length > 6){
            console.log("entra a BUSCARLO en DB");
            const pokDb = await getPokDbId(id);
            return pokDb
        }        
        urlGet = `https://pokeapi.co/api/v2/pokemon/${id}`
    }else {
        urlGet = `https://pokeapi.co/api/v2/pokemon/${name}`
    };   
    
    const {data} = await axios.get(urlGet)
    
    const pokemon = {
        id : data.id,
        name : (data.name).charAt(0).toUpperCase() + (data.name).slice(1),
        life : data.stats[0].base_stat,
        stroke : data.stats[1].base_stat,
        defending : data.stats[2].base_stat,
        speed : data.stats[5].base_stat,
        height : data.height,
        weight : data.weight,
        imageDefault: data.sprites.other.dream_world.front_default,
        imageF : data.sprites.other.home.front_default || data.sprites.other['official-artwork'].front_shiny || data.sprites.other['official-artwork'].front_default,
        types: data.types.map((t) => t.type.name),
    };
    
    console.log(pokemon);
    return pokemon
 } catch (error) {
    res.status(404).json({error: error.messaje})
 }
}

const getPokDbId = async(id, res)=>{
    try {
        console.log("entra a BUSCARLO en DB");
            const {dataValues} = await Pokemon.findByPk(id, {
                include:{
                    model: Type,
                    attributes: ['name'],
                    through: {attributes: []}
                }
            })
            dataValues.name = (dataValues.name).charAt(0).toUpperCase() + (dataValues.name).slice(1);
            dataValues.types = dataValues.types.map(e=> e.name);
            
            console.log(dataValues);
            return dataValues
    } catch (error) {
        res.status(404).json({error: error.messaje})
    }
}

module.exports = getPokNameOrId