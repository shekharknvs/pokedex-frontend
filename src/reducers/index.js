import { combineReducers }from 'redux';
import * as pokemons from './pokemons';
import * as pokemonsCategories from './pokemons-categories';

export const reducers = combineReducers({
  ...pokemons,
  ...pokemonsCategories
});