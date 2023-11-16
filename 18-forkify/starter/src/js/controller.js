import icons from 'url:../img/icons.svg'; // Importing icons from dist (parcel folder)
import 'core-js/stable'; // Pollifilling everything else
import 'regenerator-runtime/runtime'; // Pollifilling async await
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Getting the id from the hash
    const id = window.location.hash.slice(1);
    console.log(id);

    // If no id found, return the function for no error throw
    if (!id) return;
    // Render spinner while loading async
    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    console.log(recipe);

    // 2. Rendering recipel
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError(); // Don't pass argument for the rendering of the error cause the view has its own private property specifing the error message
  }
};

const controSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.error(`${err}`);
  }
};
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );

// This event hanlder is transported to the view where it belongs
const init = function () {
  recipeView.addHanlderRender(controlRecipes);
  searchView.addHandlerSearch(controSearchResults);
  // controSearchResults();
};
init();
