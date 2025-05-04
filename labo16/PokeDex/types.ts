import {ObjectId} from "mongodb";

export interface Player {
  _id?: ObjectId;
  name: string;
  pokemon: Pokemon[];
}

export interface PokeApiPokemon {
  id: number;
  name: string;
  types: {
    type: {name: string};
  }[];
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {name: string};
  }[];
}

export interface Pokemon {
  _id?: ObjectId;
  id: number;
  name: string;
  types: string[];
  image: string;
  height: number;
  weight: number;
  maxHP: number;
  currentHP?: number;
}

export interface Generation {
  pokemon_species: {
    name: string;
    url: string;
  }[];
}
