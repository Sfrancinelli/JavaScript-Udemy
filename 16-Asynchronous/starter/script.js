'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const flag = data.flags.png;
  const name = data.name.common;
  const region = data.region;
  const population = (+data.population / 1_000_000).toFixed(1);
  const languageValues = Object.values(data.languages);
  const language = languageValues[languageValues.length - 1];
  const currency = Object.keys(data.currencies)[0]; // USD, ARS, etc. Three letter name of the currency
  const curr = Object.entries(data.currencies)[0][1].name; // Whole name of the currency

  console.log(language, currency, curr);

  const html = `
          <article class="country ${className}">
          <img class="country__img" src="${flag}" />
          <div class="country__data">
            <h3 class="country__name">${name}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row"><span>👫</span>${population}M</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${curr}</p>
          </div>
        </article>
          `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/ <-- URL for API

/*
// Old way for request.
const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v3.1/name/portugal');
request.send();

// When the data loads, it fires this 'load' event listener. We listen to the event in order to execute the callback function when the data arrives.
// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText); // this = request

//   console.log(data);

//   const html = `
//   <article class="country">
//   <img class="country__img" src="${data.flags.png}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1_000_000
//     ).toFixed(1)}M</p>
//     <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
//     <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
//   </div>
// </article>
//   `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// });

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // When the data loads, it fires this 'load' event listener. We listen to the event in order to execute the callback function when the data arrives.
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); // this = request

    console.log(data);

    const flag = data.flags.png;
    const name = data.name.common;
    const region = data.region;
    const population = (+data.population / 1_000_000).toFixed(1);
    const languageValues = Object.values(data.languages);
    const language = languageValues[languageValues.length - 1];
    const currency = Object.keys(data.currencies)[0]; // USD, ARS, etc. Three letter name of the currency
    const curr = Object.entries(data.currencies)[0][1].name; // Whole name of the currency

    console.log(language, currency, curr);

    const html = `
  <article class="country">
  <img class="country__img" src="${flag}" />
  <div class="country__data">
    <h3 class="country__name">${name}</h3>
    <h4 class="country__region">${region}</h4>
    <p class="country__row"><span>👫</span>${population}M</p>
    <p class="country__row"><span>🗣️</span>${language}</p>
    <p class="country__row"><span>💰</span>${curr}</p>
  </div>
</article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// getCountryData('uruguay');
// getCountryData('usa');
// getCountryData('argentina');

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // When the data loads, it fires this 'load' event listener. We listen to the event in order to execute the callback function when the data arrives.
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); // this = request

    console.log(data);
    // Render country 1
    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders?.[0];
    console.log(neighbour);
    const neighbourRequest = new XMLHttpRequest();
    neighbourRequest.open(
      'GET',
      `https://restcountries.com/v3.1/alpha/${neighbour}`
    );
    neighbourRequest.send();

    neighbourRequest.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

const renderCountry = function (data, className = '') {
  const flag = data.flags.png;
  const name = data.name.common;
  const region = data.region;
  const population = (+data.population / 1_000_000).toFixed(1);
  const languageValues = Object.values(data.languages);
  const language = languageValues[languageValues.length - 1];
  const currency = Object.keys(data.currencies)[0]; // USD, ARS, etc. Three letter name of the currency
  const curr = Object.entries(data.currencies)[0][1].name; // Whole name of the currency

  console.log(language, currency, curr);

  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${population}M</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${curr}</p>
    </div>
  </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// getCountryAndNeighbour('chile');
getCountryAndNeighbour('usa');
*/

// Promises (modern way to AJAX calls) ES6

// const request = fetch('https://restcountries.com/v3.1/name/argentina');
// console.log(request);
/*
const getCountryData = function (country) {
  // Country 1
  // The second callback function in the then method is for the unsuccesfull fetch of the API
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);

      if (!response.ok) {
        errorFetching(response);
      }

      return response.json();
    })
    .then(function (dataResponse) {
      console.log(dataResponse);
      const [data] = dataResponse;
      console.log(data);
      renderCountry(data);

      const neighbour = data.borders?.[0];
      //   const neighbour = 'errorhandling'; // Handling errors test!

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        errorFetching(response);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(error => {
      console.error(`${error} 💥🧨💣🧨💥`);
      renderError(`Something went wrong 💥💥 ${error.message}. Try again!`);
    })
    .finally(() => {
      // Usually finally method its used for hiding the spinners that starts when the asincronous task begins
      countriesContainer.style.opacity = 1;
    });
  // The catch function will be able to process any error that happens during the whole chain so it inst necessary to catch the errors on every fetch
};
*/
// getCountryData('argentina');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      console.log(data[0]);

      const neighbour = data[0].borders?.[0];
      //   const neighbour = 'errorhandling'; // Handling errors test!

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(error => {
      console.error(`${error} 💥🧨💣🧨💥`);
      renderError(`Something went wrong 💥💥 ${error.message}. Try again!`);
    })
    .finally(() => {
      // Usually finally method its used for hiding the spinners that starts when the asincronous task begins
      countriesContainer.style.opacity = 1;
    });
  // The catch function will be able to process any error that happens during the whole chain so it inst necessary to catch the errors on every fetch
};

btn.addEventListener('click', function () {
  getCountryData('iraq');
});

// getCountryData('ubrubr'); // Error display
