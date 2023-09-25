const { Ability } = require('../db.js');
const axios = require('axios')

const getAbilities = async () => {
    try{
        await axios.get('https://pokeapi.co/api/v2/ability/?offset=0&limit=267')
    .then(json => json.data.results.map(async (ability)=>{
        Ability.findOrCreate({
            where:{
                name: ability.name
            }
        })
    }))
    }
    catch(e){
        console.log(e)
    }
}

module.exports = {
    getAbilities,
}