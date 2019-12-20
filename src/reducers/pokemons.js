const { SAVE_POKEMONS, SAVE_POKEMONS_HASH_BY_ID } = require("../constants");

export const pokemons = (state=[], action) => {
  if (action.type === SAVE_POKEMONS) {
    return action.payload;
  }
  return state;
};

export const pokemonsHashById = (state={}, action) => {
  if (action.type=== SAVE_POKEMONS_HASH_BY_ID) {
    return action.payload;
  }
  return state;
};