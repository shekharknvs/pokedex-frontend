const { getActionsWithPayload } = require("./index");
const { FETCH_POKEMONS, SAVE_POKEMONS, SAVE_POKEMONS_HASH_BY_ID } = require("../constants");

export const fetchPokemons = getActionsWithPayload(FETCH_POKEMONS);

export const savePokemons = getActionsWithPayload(SAVE_POKEMONS);

export const savePokemonsHashById = getActionsWithPayload(SAVE_POKEMONS_HASH_BY_ID);