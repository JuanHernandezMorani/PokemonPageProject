const { Type } = require('../db.js');
const axios = require('axios');

const getTypes = async () => {
    try{
        await axios.get('https://pokeapi.co/api/v2/type/?offset=0&limit=18')
    .then(json => json.data.results.map(async (type)=>{
        Type.findOrCreate({
            where:{
                name: type.name
            },
            order: ['name']
        })
    }))
    }
    catch(e){
        console.log(e)
    }
}

module.exports = {
    getTypes,
}