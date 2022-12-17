import * as  model from "./model.js";
//import recipView from "./views/recipeView.js";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from "./views/recipeView.js";
import { async } from "regenerator-runtime";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

/*
if(module.hot){
  module.hot.accept();
}
*/


const recipeContainer = document.querySelector('.recipe');


const controlRecipe= async function(){
  try{

const id=window.location.hash.slice(1);

if(!id)return;
recipeView.renderingSpinner();

resultsView.update(model.getSearchResultsPage());

bookmarksView.update(model.state.bookmarks);


   
    await model.laodRecipe(id);
    

    recipeView.render(model.state.recipe);
    
    
    
  }
  catch(err){
    alert(err);
    recipeView.renderError(`${err}`);

  }
}

const controlSearchResults=async function(){


  try{
    resultsView.renderingSpinner();

    resultsView.update(model.getSearchResultsPage())

    const query = searchView.getQuery();
    if(!query)return;
    await model.loadSearchResult(query);

    resultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
          
  }
  catch(err){
    console.error(err)
  }
}

const controlPagination =function(goToPage){
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

const controlServings= function(newServings){
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark= function(){
  if(!model.state.recipe.bookmarked)model.addBookmark(model.state.recipe);
  else{model.deleteBookmark(model.state.recipe.id);}


  
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks)
}
const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe){
 try{
  addRecipeView.renderingSpinner();
  await model.uploadRecipe(newRecipe);
  console.log(model.state.recipe);

  recipeView.render(model.state.recipe);

  addRecipeView.renderMessage();
  bookmarksView.render(model.state.bookmarks);

  window.history.pushState(null,"",`#${model.state.recipe.id}`);
 // window.history.back();

  setTimeout(function(){
    addRecipeView.toggleWindow()
  },MODAL_CLOSE_SEC*1000);

 }
 catch(err){
  console.error(err);
  addRecipeView.renderError(err.message)
 }
 
}

const init= function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerRenderUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  //addRecipeView.addHandlerUpload(controlAddRecipe);
  addRecipeView.addHandlerUpload(controlAddRecipe);

  
  
}
init();



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
