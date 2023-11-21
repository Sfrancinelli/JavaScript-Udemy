import View from './View.js';

import icons from 'url:../../img/icons.svg'; // Importing icons from dist
import { Fraction } from 'fractional';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for that query!. Please try another one!';
  _message = '';

  // render(data) {
  //   console.log(data);
  //   this._data = data;
  //   this._clear();
  //   this._data.forEach(result => {
  //     const markup = this._generateMarkupResults(result);
  //     this._parentEl.insertAdjacentHTML('afterbegin', markup);
  //   });
  // }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
    <li class="preview">
      <a class="preview__link" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.imageUrl}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          </div>
        </div>
      </a>
    </li>
  `;
  }
}

export default new ResultView();
