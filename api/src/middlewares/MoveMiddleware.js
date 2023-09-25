const { Move } = require('../db.js');
const axios = require('axios')

const getMoves = async () => {
    try{
        await axios.get('https://pokeapi.co/api/v2/move/?offset=0&limit=826')
    .then(json => json.data.results.map(async (move)=>{
        Move.findOrCreate({
            where:{
                name: move.name
            }
        })
    }))
    }
    catch(e){
        console.log(e)
    }
}

module.exports = {
    getMoves,
}