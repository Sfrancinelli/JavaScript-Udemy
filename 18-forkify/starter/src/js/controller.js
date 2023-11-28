import icons from 'url:../img/icons.svg'; // Importing icons from dist (parcel folder)
import 'core-js/stable'; // Pollifilling everything else
import 'regenerator-runtime/runtime'; // Pollifilling async await
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
// Page 1, and there are other pages
import resultView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Getting the id from the hash
    const id = window.location.hash.slice(1);

    // If no id found, return the function for no error throw
    if (!id) return;
    // Render spinner while loading async
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1. Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2. Rendering recipel
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError(); // Don't pass argument for the rendering of the error cause the view has its own private property specifing the error message
  }
};

const controSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // This will render the whole results wihtout pagination
    // resultView.render(model.state.search.results);
    // console.log(model.state.search.results);

    // To render with pages, we use the function that calculates it
    resultView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError();
  }
};
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove a bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view to see changes
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Succes message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
};

// This event hanlder is transported to the view where it belongs
const init = function () {
  bookmarksView.addHanlderRender(controlBookmarks);
  recipeView.addHanlderRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHanlderBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controSearchResults);
  // controSearchResults();
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
