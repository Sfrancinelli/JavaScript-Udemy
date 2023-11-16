import icons from 'url:../../img/icons.svg'; // Importing icons from dist
import { Fraction } from 'fractional';

class ResultView {
  #parentEl = document.querySelector('.results');
  #data;
  #errorMessage = 'We could not find that recipe. Please try another one!';
  #message = '';

  render(data) {
    console.log(data);
    this.#data = data;
    this.#clear();
    this.#data.forEach(result => {
      const markup = this.#generateMarkupResults(result);
      this.#parentEl.insertAdjacentHTML('afterbegin', markup);
    });
  }

  #generateMarkupResults(result) {
    console.log(result);
    return `
    <li class="preview">
    <a class="preview__link preview__link--active" href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.imageUrl}" alt="Preview image of the recipe" />
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

  #clear() {
    this.#parentEl.innerHTML = '';
  }
}

export default new ResultView();
