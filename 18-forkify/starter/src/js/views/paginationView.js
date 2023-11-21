import View from './View.js';

import icons from 'url:../../img/icons.svg'; // Importing icons from dist
import { Fraction } from 'fractional';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages =
      Math.trunc(this._data.results.length / this._data.resultsPerPage) + 1;
    console.log(numPages);

    // Page 1, and there are other pages
    // Page 1, and there are NO other pages
    // Last page
    // Other page (prev and next btns)
  }
}

export default new PaginationView();
