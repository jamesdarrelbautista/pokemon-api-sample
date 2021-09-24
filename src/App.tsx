import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './App.css'
// import './components/PokemonThumbnails'
import PokemonThumbnails from './components/PokemonThumbnails';


/**
 * 1. Fetch the following from Poke API:
 *  1.1 Pokemon name
 *  1.2 Pokemon Picture
 *  1.3 Pokemon Type
 * 2. Add styling: Make each pokemon a card that has a hover effect ~ 
 *  study how to style in React CSS
 * 
 */

/** Watch tutorial on fetching api using axios */

// type PokemonResource = {
//   count: number;
//   next: string;
//   previous: string;
//   results: Pokemon[];
// }

export type Pokemon = {
  name: string;
  // url: string;
  id: string;
  types: PokemonTypes[];
  sprites: PokemonSprite;
}

export type PokemonTypes = {
  slot: number;
  type: PokemonTypeName;
}
export type PokemonTypeName = {
  name: string;
  url: string;
}

export type PokemonSprite = {
  other: PokemonOther;
}
export type PokemonOther = {
  dream_world: PokemonDreamWorld;
}
export type PokemonDreamWorld = {
  front_default: string;
}



function App() {

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10")

  const getPokemon = async () => {
    const response = await axios.get(loadMore);

    setLoadMore(response.data.next);
    
    async function createPokemonObject (result: Pokemon[]) {
      result.map( async (pokemon) => {
        const urlResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);

        setPokemonList(currentArray => [...currentArray, urlResponse.data]);
      }).sort()
    }
     createPokemonObject(response.data.results);
    // console.log(pokemonList);

  }

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <div className="app-container">
      <h1>Hello, Pokemon World!</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {pokemonList.map((pokemon, index) => {
            return <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.name}
              sprites={pokemon.sprites}
              types={pokemon.types}
              key={index}
            />
          })}
        </div>
      </div>
      <button className="load-more" onClick={() =>getPokemon()}>More Pokemon</button>
    </div>
  )
}

export default App;

