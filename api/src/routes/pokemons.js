const { Router } = require("express");
const { Pokemon, Type, Ability, Move } = require("../db.js");
const { getPokemons } = require("../middlewares/PokeMiddleware.js");

const router = Router();

router.get('/', async(req, res) =>{
  const { name } = req.query;

let exist = await Pokemon.findOne({where:{id: 1}})

if(!exist){await getPokemons()}

  if(name){
    let allPoke = await Pokemon.findAll({
      where:{name: name},
      include:[
        {
        model: Move,
        attributes:['name'],
        through: {
            attributes: [],
        }},
        {
        model: Ability,
        attributes:['name'],
        through: {
            attributes: [],
        }},
        {
      model: Type,
      attributes:['name'],
      through:{
        attributes: [],
      }}
    ]})
    return res.send(allPoke)
  }

return res.send(await Pokemon.findAll({
  order: ['id'],
  include:[
    {
    model: Move,
    attributes:['name'],
    through: {
        attributes: [],
    }},
    {
    model: Ability,
    attributes:['name'],
    through: {
        attributes: [],
    }},
    {
  model: Type,
  attributes:['name'],
  through:{
    attributes: [],
  }}
],
}))
})

router.get('/:param', async (req,res) => {
const { param } = req.params;
if(Number(param)){
  let pokemon = await Pokemon.findOne({where:{id: param},include:[
    {
    model: Move,
    attributes:['name'],
    through: {
        attributes: [],
    }},
    {
    model: Ability,
    attributes:['name'],
    through: {
        attributes: [],
    }},
    {
  model: Type,
  attributes:['name'],
  through:{
    attributes: [],
  }}
]})
  return res.send(pokemon)
}
let pokemon = await Pokemon.findOne({where:{name: param},include:[
  {
  model: Move,
  attributes:['name'],
  through: {
      attributes: [],
  }},
  {
  model: Ability,
  attributes:['name'],
  through: {
      attributes: [],
  }},
  {
model: Type,
attributes:['name'],
through:{
  attributes: [],
}}
]})
return res.send(pokemon)
});

router.post("/", async (req, res) => {
  let {
    name,
    hp,
    attack,
    defense,
    spAtk,
    spDef,
    speed,
    height,
    weight,
    img,
    Types,
    Moves,
    Abilities,
  } = req.body;

  if(!name){return res.status(409).send('Name is require')}
  if(
  isNaN(hp) ||
  isNaN(attack) ||
  isNaN(defense) ||
  isNaN(spAtk) ||
  isNaN(spDef) ||
  isNaN(speed) ||
  isNaN(height) ||
  isNaN(weight)
  ){return res.status().send('One or more arguments are not a number')}

  const existe = await Pokemon.findOne({ where: { name: name }})
  if (existe) return res.status(412).send("Pokemon already exist");

  let newPokemon = await Pokemon.create({
    name: name,
    hp: hp,
    attack: attack,
    defense: defense,
    spAtk: spAtk,
    spDef: spDef,
    speed: speed,
    height: height,
    weight: weight,
    img: img ? img : 'https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif',
    oficial: false,
  })


  let associatedTypes = await Type.findAll({where: {name: Types}, order:['name']})


  let associatedMoves = await Move.findAll({where: {name: Moves}, order:['name']})


  let associatedAbilities = await Ability.findAll({where: {name: Abilities}, order:['name']})

 await newPokemon.addTypes(associatedTypes)
 await newPokemon.addAbilities(associatedAbilities)
 await newPokemon.addMoves(associatedMoves)

 res.send('Pokemon created successfully')
});

module.exports = router;

/*

Model.create({
  name: 'pikachu',
  atk: 3,
  def: 5,
  spd: 8,
})
1 vez

Model.findOrCreate({
  where:{
  name: 'pikachu',
  atk: 3,
  def: 5,
  spd: 8,
  }
})






*/