import View from './View.js';
import previewView from './previewView.js';

import { Fraction } from 'fractional';
class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for that query!. Please try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
