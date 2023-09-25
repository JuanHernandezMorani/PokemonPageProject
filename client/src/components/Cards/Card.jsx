import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

export const Card = ({ name, image, attack, weight, id, Types }) => {
  
  return (
    <div className="container" >
      <Link to={`/pokedex/${id}`} key={name}>
        <figure className={Types[1] ? Types[1] : Types[0]}>
        <div className="cardImageContainer">
          <img src={image} alt="" className="CardImage" />
        </div>
      <figcaption className="cardCaption">
        <h1 className="cardName">#{id} - {name}</h1>
        <br/><br/><br/><br/>
          {Types.length >= 2 ? (
              <div className="types">
                <h3 className="cardType">{Types[0]}</h3>
                <h3 className="cardType">{Types[1]}</h3>
              </div>
            ) : (
                  <div className="types">
                    <h3 className="cardType">{Types[0]}</h3>
                  </div>
                )
          }
      <div>
        <h3 className="cardName">Attack: {attack}</h3> 
        <h3 className="cardName">Weight: {weight}</h3>
      </div>
      </figcaption>
      </figure>
      </Link>
    </div>
  );
};