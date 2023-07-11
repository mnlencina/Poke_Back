const {Pokemon} = require('../db')

const postPokemon = async(req,res)=>{
    try {      
        let {name, life, stroke, defending, speed, height, weight, imageDefault} = req;
        //carga pokemon creado a la DB 
        let pokCreated = await Pokemon.create({
            name,
            life,
            stroke,
            defending,
            speed,
            height,
            weight,
            imageDefault,
        }); 
        return {pokCreated}        
    } catch (error) {
        res.status(404).json({error: error.messaje})
        console.log(error);
    }
}

module.exports = postPokemon;