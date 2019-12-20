import { FETCH_POKEMONS, SAVE_POKEMONS} from '../constants';
import axios from 'axios';
import { apiEndpoint } from '../config';
import { throwError } from '../actions/index';
import { savePokemons, savePokemonsHashById} from "../actions/pokemons";

const pokemonsMiddleware = store => next => action => {
  const {  dispatch } = store;
  switch(action.type) {
    case FETCH_POKEMONS:
      return Promise.resolve(next(action))
      .then(()=>{
        axios.get(`${apiEndpoint["pokemons"]}`)
        .then((resp)=> {
          dispatch(savePokemons(resp.data));
        })
        .catch(console.log);
      });
    case SAVE_POKEMONS: 
      return Promise.resolve(next(action))
        .then(()=>{
          dispatch(savePokemonsHashById(getPokemonsHash(action.payload)));
        });
    default:
      return next(action);
  }
}

const getPokemonsHash = (pokemons) => {
  let result = {};
  pokemons.forEach(pokemon => {
    result[pokemon._id] = pokemon;
  });
  return result;
}

export default pokemonsMiddleware;