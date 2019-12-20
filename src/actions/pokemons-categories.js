const { getActionsWithPayload } = require("./index");
const { FETCH_POKEMONS_CATEGORIES, SAVE_POKEMONS_CATEGORIES, RESTORE_POKEMONS_CATEGORIES, UPDATE_POKEMONS_CATEGORIES, SAVE_POKEMONS_CATEGORIES_HASH, SAVE_POKEMONS_CATEGORIES_TAB, CREATE_POKEMONS_CATEGORIES, DELETE_POKEMONS_CATEGORIES} = require("../constants");

export const fetchPokemonsCategories = getActionsWithPayload(FETCH_POKEMONS_CATEGORIES);

export const savePokemonsCategories = getActionsWithPayload(SAVE_POKEMONS_CATEGORIES);

export const updatePokemonsCategories = getActionsWithPayload(UPDATE_POKEMONS_CATEGORIES);

export const restorePokemonsCategories = getActionsWithPayload(RESTORE_POKEMONS_CATEGORIES);

export const deletePokemonsCategories = getActionsWithPayload(DELETE_POKEMONS_CATEGORIES);

export const savePokemonsCategoriesHash = getActionsWithPayload(SAVE_POKEMONS_CATEGORIES_HASH);

export const savePokemonsCategoriesTabs = getActionsWithPayload(SAVE_POKEMONS_CATEGORIES_TAB);

export const createPokemonsCategories = getActionsWithPayload(CREATE_POKEMONS_CATEGORIES);