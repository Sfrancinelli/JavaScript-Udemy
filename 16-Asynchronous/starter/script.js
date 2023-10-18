'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// https://countries-api-836d.onrender.com/countries/ <-- URL for API

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
