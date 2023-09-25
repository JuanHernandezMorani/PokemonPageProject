import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card } from '../Cards/Card.jsx';
import { PostPokemon, getTypes, getAbilities, getMoves } from "../../actions";
import style from "./form.module.css";
import Swal from 'sweetalert2';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';


const regex = /^[a-zA-Z]+$/

function validate(pokemon){

  const errors = {};
  
  if(!pokemon.name){
    errors.name = 'Name is required'
  }
  if(pokemon.name.length < 3){
    errors.name = 'Name must contain at least four letters'
  }
  if(!regex.test(pokemon.name)){
    errors.name = 'Name must be letters only'
}
  if(
    Number(pokemon.hp) <= 0 || Number(pokemon.attack) <= 0 || Number(pokemon.defense)<= 0 || 
    Number(pokemon.spAtk) <=0 || Number(pokemon.spDef) <= 0 || Number(pokemon.speed) <= 0 || 
    Number(pokemon.height) <= 0 || Number(pokemon.weight) <= 0
  ){
    errors.stats = 'Stats can be under or equal to 0'
  }
  if(
    !pokemon.hp || !pokemon.attack|| !pokemon.defense || 
    !pokemon.spAtk || !pokemon.spDef || !pokemon.speed || 
    !pokemon.height || !pokemon.weight
  ){
    errors.stats = 'Stats are required'
  }

  return errors;
}

export default function PokemonsCreate(){
  const dispatch = useDispatch();
  const types = useSelector(state => state.Types);
  const abilities = useSelector(state => state.Abilities);
  const moves = useSelector(state => state.Moves);
  const history = useHistory ();
  const [data, setData] = useState({
    name: "",
    hp: '',
    attack: '',
    defense: '',
    spAtk: '',
    spDef: '',
    speed: '',
    height: '',
    weight: '',
    img: "",
    Types: [],
    Moves: [],
    Abilities: [],
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAbilities());
    dispatch(getMoves());
}, [dispatch]);

  function handleChange(e){
    setData({
      ...data,
      [e.target.name]: e.target.value
  })
  setErrors(validate({
    ...data,
    [e.target.name]: e.target.value
}))
  }
  function handleUpChage(e){
    let urlImg = URL.createObjectURL(e.target.files[0])
    setData({
        ...data,
        [e.target.name]: urlImg
    })
}
  function handleSelect(e){
    const type = e.target.value;
    if(data.Types.length >= 2){return Swal.fire('Pokemon can have a maximum of two types')}
    if(!data.Types.includes(type)){
      setData({
        ...data,
        Types: [...data.Types, type]
      })}}

  function handleSelectMoves(e){
    const move = e.target.value;
    if(data.Moves.length >= 4){return Swal.fire('Pokemon can have a maximum of four moves')}
    if(!data.Moves.includes(move)){
      setData({
        ...data,
        Moves: [...data.Moves, move]
  })}}

  function handleSelectAbilities(e){
    const ability = e.target.value;
      if(data.Abilities.length >= 2){return Swal.fire('Pokemon can have a maximum of two abilities')}
      if(!data.Abilities.includes(ability)){
        setData({
          ...data,
          Abilities: [...data.Abilities, ability]
  })}}

  function handleSubmit(e){
    try{
    e.preventDefault();
    setErrors(validate(data));
    if(Object.keys(errors).length === 0){
    Swal.fire({
      title: 'Do you want to create that pokemon?',
      text: "You won't be able to edit this pokemon after created!",
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        if(!data.name || !data.height || !data.attack || !data.spDef || !data.hp || !data.defense || !data.spAtk || !data.speed || !data.weight ){return Swal.fire({
          icon: 'error',
          title: 'Error 412',
          text: 'Missing data',
        })};
        if(!data.Moves){data.Moves = ['struggle']};
        if(!data.Types){ data.Types = ['normal']};
        if(!data.Abilities){data.Abilities = ['weak-armor']};
        dispatch(PostPokemon(data));
        Swal.fire({
          title: 'Pokemon created successfully',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      history.push(`/pokedex/${data.name}`);
      }
    })}
  }
    catch(e){
      console.log(e)
    }
  }
function handleClick(){
  Swal.fire({
  title: 'Are you sure?',
  text: 'You will lose this pokemon for ever',
  footer: 'that is too much time',
  icon: 'question',
  iconHtml: '¿?',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes',
  cancelButtonText: 'No',
  showCancelButton: true,
  showConfirmButton: true
}).then((result) => {
  if (result.isConfirmed) {
    history.push('/home')
  }
})
 
}
function handleDelete(type){
  setData({
    ...data,
    Types: data.Types.filter(t => t !== type)
  })
}
function handleDeleteAbility(ability){
  setData({
    ...data,
    Abilities: data.Abilities.filter(a => a !== ability)
  })
}
function handleDeleteMove(move){
  setData({
    ...data,
    Moves: data.Moves.filter(m => m !== move)
  })
}
  return (
    <div className={style.containerCreate}>
      <div className={style.form}>
        <br/>
      <button className= {style.backHome} onClick={() => handleClick()}>Back to pokedex</button>
      <br/>
        <div className={style.tittle}>
          <h1>Create your pokemon</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={style.innerForm}>
          <div>
            <h3 className= {style.tittle2}>Name</h3>
            <input type="text" value= {data.name} name= "name" placeholder="Insert Name" onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.name && <p className={style.errors}>{errors.name}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>HP</h3>
            <input type="number" min='0' max='9999' placeholder='Use numbers from 1 to 9999' value= {data.hp} name= "hp"  onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.stats && <p className= {style.errors}>{errors.stats}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>Attack</h3>
            <input type="number" min='0' max='9999' placeholder='Use numbers from 1 to 9999' value= {data.attack} name= "attack" onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.stats && <p className= {style.errors}>{errors.stats}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>Defense</h3>
            <input type="number" min='0' max='9999' placeholder='Use numbers from 1 to 9999' value= {data.defense} name= "defense" onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.stats && <p className= {style.errors}>{errors.stats}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>Special Attack</h3>
            <input type="number" min='0' max='9999' placeholder='Use numbers from 1 to 9999' value= {data.spAtk} name= "spAtk" onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.stats && <p className= {style.errors}>{errors.stats}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>Special Defense</h3>
            <input type="number" min='0' max='9999' placeholder='Use numbers from 1 to 9999' value= {data.spDef} name= "spDef" onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.stats && <p className= {style.errors}>{errors.stats}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>Speed</h3>
            <input type="number" min='0' max='9999' placeholder='Use numbers from 1 to 9999' value= {data.speed} name= "speed" onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.stats && <p className= {style.errors}>{errors.stats}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>Height</h3>
            <input type="number" min='0' max='9999' placeholder='Use numbers from 1 to 9999' value= {data.height} name= "height" onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.stats && <p className= {style.errors}>{errors.stats}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>Weight</h3>
            <input type="number" min='0' max='9999' placeholder='Use numbers from 1 to 9999' value= {data.weight} name= "weight" onChange={(e) => handleChange(e)} className= {style.input}/>
            {errors.stats && <p className= {style.errors}>{errors.stats}</p>}
          </div>
          <div>
            <h3 className= {style.tittle2}>Image</h3>
            <input type="text" value= {data.img} name= "img" placeholder="Insert Image" onChange={(e) => handleChange(e)} className= {style.input}/>
            <input type="file" accept="image/*" style={{ display: 'none' }} id="contained-button-file"  name= "img" onChange={(e) => handleUpChage(e)}/>
            <label htmlFor="contained-button-file"><IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton></label>
          </div>
          <select onChange={(e) => handleSelect(e)} className= {style.select}>
            <option value= "Select" hidden>Select Type</option>
              {
                types.map(t => (
                  <option key={t.id} value={t.name}>{t.name}</option>
                ))
              }
            </select>
            <select onChange={(e) => handleSelectAbilities(e)} className= {style.select}>
            <option value= "Select" hidden>Select Ability</option>
              {
                abilities.map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))
              }
            </select>
            <select onChange={(e) => handleSelectMoves(e)} className= {style.select}>
            <option value= "Select" hidden>Select Move</option>
              {
                moves.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))
              }
            </select>
            {Object.keys(errors).length === 0 ? (<div><button type="submit" className= {style.buttonCreate2}>Create Pokemon</button></div>) : (<div><button type="submit" disabled = {true} className= {style.buttonCreate}>Create Pokemon </button></div>)}
        </form>
      </div>
      <div className= {style.card}>
        <Card key={data.id}
          name= {data.name}
          image={data.img}
          Types={data.Types}
          attack= {data.attack}
          weight= {data.weight}
           />
        </div>

        <div className= {style.types}>
          <h3>Types:</h3> <br/>
        {data.Types.map(el => <div key= {el+Math.random()+2} className= {style.divtypes}><p>{el}</p><button onClick={() => handleDelete(el)} className= {style.buttonDelete}>Delete</button><br/><br/></div>)}
        </div>
        
        <div className= {style.types}>
          <h3>Abilities:</h3> <br/>
        {data.Abilities.map(el => <div key= {el+Math.random()+3} className= {style.divtypes}><p>{el}</p><button onClick={() => handleDeleteAbility(el)} className= {style.buttonDelete}>Delete</button><br/><br/></div>)}
        </div>

        <div className= {style.types}>
          <h3>Moves:</h3> <br/>
        {data.Moves.map(el => <div key= {el+Math.random()+4} className= {style.divtypes}><p>{el}</p><button onClick={() => handleDeleteMove(el)} className= {style.buttonDelete}>Delete</button><br/><br/></div>)}

        </div>
    </div>
  );
};