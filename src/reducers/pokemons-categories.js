import { SAVE_POKEMONS_CATEGORIES_HASH, SAVE_POKEMONS_CATEGORIES, SAVE_POKEMONS_CATEGORIES_TAB } from "../constants";


export const  pokemonsCategories = (state=[], action) => {
  if(action.type === SAVE_POKEMONS_CATEGORIES) {
    return action.payload;
  }
  return state;
}

export const pokemonsCategoriesHash = (state = {}, action) => {
  if (action.type === SAVE_POKEMONS_CATEGORIES_HASH) {
    return action.payload;
  }
  return state;
}

export const pokemonsCategoriesTab = (state =[], action) => {
  if (action.type === SAVE_POKEMONS_CATEGORIES_TAB) {
    return state.concat(action.payload);
  }
  return state;
}