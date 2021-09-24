import React from 'react'
import { Pokemon, PokemonDreamWorld, PokemonOther } from '../App'

function capitalizeFirstLetter(string:string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



const PokemonThumbnails = ({ id, name, types, sprites}: Pokemon) => {
  const typeStyle = `thumb-container ${types[0].type.name}`;
    return (
      
      <div className={typeStyle} >
        <div className="number" >
          <small> <strong> #0{id}</strong></small>
        </div>
        <img src={sprites.other.dream_world.front_default} alt={name} />
        <div className="">
          <h3>{capitalizeFirstLetter(name)}</h3>
          <small>{capitalizeFirstLetter(types[0].type.name)}</small>
        </div>
      </div>
    )
  
  }
export default PokemonThumbnails
