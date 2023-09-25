import React, { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearDetail, removePokemon } from '../../actions';
import { useHistory } from "react-router-dom";
import style from "./pokemon.module.css";
import Stats from "../Stats";
import Swal from 'sweetalert2';

export default function Pokemon(props){ 
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id))
    return () => {
      dispatch(clearDetail());
    }
} , [ dispatch, props.match.params.id]);

const pokemon = useSelector(state => state.Details);

  const handleDelete = () => {
    try{
      const id = pokemon.id;
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removePokemon(id));
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Pokemon deleted successfully',
            'success'
          )
          history.push("/home");
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Action canceled successfully',
            'error'
          )
        }
      })
    }
   catch(err){console.log(err)}
  };

  const addTeam = (obj) => {
    let array = [];
    if (localStorage.getItem("Team")) {
      array = localStorage.getItem("Team");
      array = JSON.parse(array);
     let exist = array.filter(o => o.name === obj.name)
      if(exist.length !== 0) return Swal.fire({
        icon: 'error',
        title: 'Error 412',
        text: 'Pokemon already in team',
      });
      if (array.length >= 6) return Swal.fire({
        icon: 'error',
        title: 'Error 409',
        text: 'Your team cannot have more than six Pokemons',
      });
      array.push(obj);
      localStorage.setItem("Team", JSON.stringify(array));
    } else {
      array.push(obj);
      localStorage.setItem("Team", JSON.stringify(array));
    }
    history.push("/team");
  };
  function handleClick(){
      history.push('/home')
  }
  return (
      <div className={style.container}>
        <button className= {style.backHome} onClick={() => handleClick()}>Back to pokedex</button>
        {
          pokemon.name ?
          <div className={style.inner}>
        <h1>{pokemon.name}</h1>
        <h2>#{pokemon.id}</h2>
        <br/><br/><br/><br/><br/>
        <div className={style.pokebola}>
          <p>Catch</p>
          <button
            onClick={() => {
              addTeam({
                id: pokemon.id,
                name: pokemon.name,
                Types: pokemon?.Types?.map(t => t.name),
                img: pokemon.img,
                weight: pokemon.weight,
                attack: pokemon.attack,
              });
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
              alt="catch"
            />
          </button>
        </div>

        <div className={style.img}>
          <img src={pokemon.imgGIF ? pokemon.imgGIF : pokemon.img} alt="pokemon" />
          <div className={style.parrafo}>
            <p>Weigth:<br/>{pokemon.weight}&nbsp;&nbsp;kgs</p>
            <br/>
            <p>Heigth:<br/>{pokemon.height}&nbsp;&nbsp;mts</p>
          </div>
        </div>
        <div className={style.type}>
          {pokemon.Types
            ? pokemon?.Types.map((t) => <h3 key={t.name} className={style[`${t.name}`]}>{t.name}</h3> )
            : null}
        </div>
        <div className={style.type}>
        {pokemon.Abilities 
              ? pokemon?.Abilities.map((a) => <h3 key={a.name} className={style.ability}>{a.name}</h3>)
              : null}
        </div>
        <div className={style.meter}>
          <div className={style.meter2}>
            <Stats valor={pokemon.hp} nombre={"Life"} />
            <Stats valor={pokemon.speed} nombre={"Speed"} />
          </div>
          <div className={style.meter2}>
            <Stats valor={pokemon.spDef} nombre={"Special-Defense"} />
            <Stats valor={pokemon.spAtk} nombre={"Special-Attack"} />
          </div>
          <div className={style.meter2}>
            <Stats valor={pokemon.defense} nombre={"Defense"} />
            <Stats valor={pokemon.attack} nombre={"Attack"} />
          </div>
        </div>
        <div className={style.type}>
          {pokemon.Moves
          ? pokemon?.Moves.map((m) => <h2 key={m.name} className={style.move}>{m.name}</h2>)
          : null}
        </div>
        {
          !pokemon.oficial ? <button onClick= {() => handleDelete()} className={style.btDelete}>Remove Pokemon</button> : null
        }
        </div>
        : <div>
            <img src="https://media.giphy.com/media/UHAYP0FxJOmFBuOiC2/giphy.gif" alt="Error404"/>
          </div>
        }
      </div>
  );
};