import React from "react";
import { Link } from "react-router-dom";
import style from "./landingpage.module.css";

export const LandingPage = () => {
  return (
    <div className={style.container}>
      <div>
        <h1>
          <span>Find all your <br />
          favorites Pokemons</span>
        </h1>
        <p>
          Here you can see pokemons types, <br />
          their attack,weight, speed <br />
          heal and more!.<br />
          <span>¡you can create your own pokemon!</span>.
        </p>
        <Link to="/home">
          <input type="submit" value="See Pokedex" className={style.myButton} />
        </Link>
      </div>

      <div>
        <img src="img/pikachu.png" alt="" />
      </div>
    </div>
  );
};