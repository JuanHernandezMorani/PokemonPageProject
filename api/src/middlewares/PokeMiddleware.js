const { Pokemon, Type, Ability, Move} = require("../db.js");
const axios = require('axios');
const { getTypes } = require('./TypeMiddleware.js');
const { getMoves } = require('./MoveMiddleware.js');
const { getAbilities } = require('./AbilitiesMiddleware.js');

const getPokemons = async () => {
  const init = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=905');
  const urls = await init.data.results.map(u => u.url);
  for(let i = 0; i < urls.length; i++){
    await axios.get(urls[i])
    .then(async info => {
      try{
      const pokemon = await info.data
     const exist = await Pokemon.findOne({where:{
      name: pokemon.name
     }})
     if(!exist){
      const typesExist = await Type.findOne({where:{name: 'normal'}})
      if(!typesExist){
        await getTypes()
      }
      const movesExist = await Move.findOne({where:{id: 1}})
      if(!movesExist){
        await getMoves()
      }
      const abilitiesExist = await Ability.findOne({where:{id: 1}})
      if(!abilitiesExist){
        await getAbilities()
      }

        let idsT = [];
        for(let i = 0; i < pokemon.types.length; i++){
          let types = await Type.findOne({where:{name: [pokemon.types[i].type.name]}})
          let id = types.id
          idsT.push(id)
        }

        let idsA = [];
        for(let i = 0; i < pokemon.abilities.length; i++){
          let abilities = await Ability.findOne({where:{name: [pokemon.abilities[i].ability.name]}})
          let id = abilities.id
          idsA.push(id)
        }

        let idsM = [];
        if(pokemon.moves.length > 4){
                  for(let i = 0; i < 4; i++){
          let moves = await Move.findOne({where:{name: [pokemon.moves[i].move.name]}})
          let id = moves.id
          idsM.push(id)
        }
        } else {
          for(let i = 0; i < pokemon.moves.length; i++){
            let moves = await Move.findOne({where:{name: [pokemon.moves[i].move.name]}})
            let id = moves.id
            idsM.push(id)
          }
        }

        let pokeCreated = await Pokemon.create({
          name: pokemon.name,
          hp: pokemon.stats[0].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          spAtk: pokemon.stats[3].base_stat,
          spDef: pokemon.stats[4].base_stat,
          speed: pokemon.stats[5].base_stat,
          height: Number(pokemon.height),
          weight: Number(pokemon.weight),
          img: pokemon.sprites.other["official-artwork"]?.front_default ? pokemon.sprites.other["official-artwork"].front_default : "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
          imgGIF: pokemon.sprites.versions["generation-v"]? pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default : null,  
          oficial: true,
    })

    if(idsT.length === 0){idsM.push(1)}
    if(idsM.length === 0){idsM.push(165)}
    if(idsA.length === 0){idsM.push(133)}
   await pokeCreated.addTypes(idsT)
   await pokeCreated.addMoves(idsM)
   await pokeCreated.addAbilities(idsA)
      }
      }
      catch(err){console.log(err)}
    })
  }
  };
  
  module.exports = {
  getPokemons,
  };