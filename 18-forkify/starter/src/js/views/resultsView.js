import View from './View.js';
import { Fraction } from 'fractional';
class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for that query!. Please try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      }" href="#${result.id}">
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
