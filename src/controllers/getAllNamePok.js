const axios = require('axios')


const getAllNamePok = async (req, res)=>{     
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1281")
        const {results}= data
        const pokNames = results.map(e => e.name);
        
        return pokNames               
    } catch (error) {
        res.status(400).json({error: error.messaje})
    }                           
} 

module.exports = getAllNamePok;