import View from "./view.js"
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

class ResultsView extends View{
    _parentElement=document.querySelector(".results");
    _errorMessage= "No Recipes found for your query Please try again"
    _Message="";


    _generateMarkup(){
      console.log(this._data);
      return this._data.map(result => previewView.render(result,false)).join("");
  }
  }
export default new ResultsView();