const axios = require('axios');
const { Type } = require('../db.js');

const getTypeApi = async () => {
    try{
        const {data} = await axios.get("https://pokeapi.co/api/v2/type");
        const typesAll = await Promise.all(data.results.map(async(data)=> {
            let resp = await axios.get(data.url);
            const typeAdd= {
                id: resp.data.id,
                name: resp.data.name,
              };
              Type.findOrCreate({
                where: { name: resp.data.name },
              });
              return typeAdd           
        }));          
        return typesAll;
          
    }catch(error){
        res.status(400)({error: error.message})
    }
}        
  
module.exports = getTypeApi
  
  