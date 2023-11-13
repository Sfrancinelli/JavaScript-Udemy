import icons from 'url:../img/icons.svg'; // Importing icons from dist (parcel folder)
import 'core-js/stable'; // Pollifilling everything else
import 'regenerator-runtime/runtime'; // Pollifilling async await
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

console.log('TEST');

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
  }
};

controlRecipes();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );

// This event hanlder is transported to the view where it belongs
const init = function () {
  recipeView.addHanlderRender(controlRecipes);
};
init();
