import React from "react";
import style from "./team.module.css";
import { Card } from "../../components/Cards/Card";
import { useHistory } from "react-router-dom";


export const Team = () => {

const history = useHistory();

  const removeTeam = (e) => {
    var id = Number(e.target.value)
    let array = [];
      array = localStorage.getItem("Team");
      array = JSON.parse(array);
      let filtered = array?.filter( (obj) => {return obj.id !== id})
      localStorage.setItem("Team", JSON.stringify(filtered));
    history.push("/team");
  };

  const team = () => {
    if( localStorage.getItem("Team")) {
      let array = localStorage.getItem("Team");
      array = JSON.parse(array);
      return array;
    }
    return []
  }
  const array = team();

  function handleClick(){ 
  history.push('/home')
  }
 


  return (
    <div className={style.container}>
      <button className= {style.backHome} onClick={() => handleClick()}>Back to pokedex</button>
      {
        array.length !== 0 ?
        array.map(pokemon =>
      <div className={style.team} key={pokemon.id+(Math.random()*5)}>
        <button onClick={(e) => removeTeam(e)} className={style.button} value={pokemon.id}>Delete</button>
        <Card id={pokemon.id} name={pokemon.name} attack={pokemon.attack} weight={pokemon.weight} Types={pokemon.Types} image={pokemon.img}/>
      </div>
      )
    :
    <div className={style.noTeam}>
      <br/>
      <h2>You dont have any pokemon in your team</h2>
      <br/>
    <img 
    src='https://c.tenor.com/Ir5eG_TuMPYAAAAC/pokemon-confused.gif'
    alt='No-Team'
    />
    </div>
    }
    </div>
  );
};
