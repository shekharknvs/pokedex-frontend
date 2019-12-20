import { FETCH_POKEMONS_CATEGORIES , SAVE_POKEMONS_CATEGORIES, UPDATE_POKEMONS_CATEGORIES, CREATE_POKEMONS_CATEGORIES, RESTORE_POKEMONS_CATEGORIES, DELETE_POKEMONS_CATEGORIES} from '../constants';
import axios from 'axios';
import { apiEndpoint } from '../config';
// import { throwError } from '../actions/index';
import { savePokemonsCategories, savePokemonsCategoriesHash} from "../actions/pokemons-categories";

const pokemonsCategoriesMiddleware = store => next => action => {
  const {  dispatch } = store;
  let { pokemonsCategories} = store.getState();
  switch(action.type) {
    case FETCH_POKEMONS_CATEGORIES:
      return Promise.resolve(next(action))
      .then(()=>{
        return axios.get(`${apiEndpoint["pokemons-categories"]}`)
        .then((resp)=> {
          dispatch(savePokemonsCategories([{name: "ALL"}].concat(resp.data)));
        })
      })
      .catch(console.log);

      case CREATE_POKEMONS_CATEGORIES:
          return Promise.resolve(next(action))
          .then(()=> {
            if (action.payload && action.payload.name) {
            return axios.post(`${apiEndpoint["pokemons-categories"]}`, action.payload)
            .then((resp) => {
              dispatch(savePokemonsCategories( [...pokemonsCategories, resp.data]));
            })
            }
          })
          .catch(console.log);

    case UPDATE_POKEMONS_CATEGORIES:
      return Promise.resolve(next(action))
      .then(()=> {
        if (action.payload && action.payload.name) {
          let name = action.payload.name;          
        return axios.put(`${apiEndpoint["pokemons-categories"]}/${name}`, action.payload)
        .then((resp) => {
          pokemonsCategories = pokemonsCategories.filter(category=>category.name !==name);
          dispatch(savePokemonsCategories( [...pokemonsCategories, resp.data]));
        })
        }
      })
      .catch(console.log);
    
    case RESTORE_POKEMONS_CATEGORIES: 
    return Promise.resolve(next(action))
    .then(()=> {
      if (action.payload && action.payload.name) {
        let name = action.payload.name;          
      return axios.put(`${apiEndpoint["pokemons-categories"]}/${name}/restore`, action.payload)
      .then((resp) => {
        pokemonsCategories = pokemonsCategories.filter(category=>category.name !==name);
        dispatch(savePokemonsCategories( [...pokemonsCategories, resp.data]));
      })
      }
    })
    .catch(console.log);

    case DELETE_POKEMONS_CATEGORIES:
        return Promise.resolve(next(action))
        .then(()=> {
          if (action.payload && action.payload.name) {
            let name = action.payload.name;          
          return axios.delete(`${apiEndpoint["pokemons-categories"]}/${name}`, action.payload)
          .then((resp) => {
            pokemonsCategories = pokemonsCategories.filter(category=>category.name !==name);
            dispatch(savePokemonsCategories( [...pokemonsCategories]));
          })
          .catch(err => {
            console.log(err);
          })
          }
        })
        .catch(console.log);


    case SAVE_POKEMONS_CATEGORIES: 
      return Promise.resolve(next(action))
        .then(()=>dispatch(savePokemonsCategoriesHash(getPokemonsCategoryHash(action.payload))));
    default:
      return next(action);
  }
}

const getPokemonsCategoryHash = (categories) => {
  let result ={};
  categories.forEach(category => {
    result[category.name] = category;
  });
  return result;
}

export default pokemonsCategoriesMiddleware;