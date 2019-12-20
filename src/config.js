const apiBaseUrl = "localhost:5000"
// const apiBaseUrl = process.env.BACKEND;

// console.log(process.env);

export const apiEndpoint = {
  "pokemons": `http://${apiBaseUrl}/pokemons`,
  "pokemons-categories": `http://${apiBaseUrl}/pokemons/categories`
};

