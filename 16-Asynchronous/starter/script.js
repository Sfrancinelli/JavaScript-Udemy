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

// btn.addEventListener('click', function () {
//   getCountryData('iraq');
// });

// getCountryData('ubrubr'); // Error display

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

/*
const auth = '148373027319996109767x19451';

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${auth}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      const country = data.country.toLowerCase();
      console.log(country);
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err =>
      renderError(`Something went wrong!:\n${err.message}. \nTry again!`)
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
whereAmI(50.933, 0.474);
*/

// // Event loop practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   // Simulate that the callback function takes a long time with a for loop
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

/////////////////////////////////////////////////////////
// Creating promises
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // The value that this promise will return.
      resolve('You WIN 💰');
    } else {
      // The error string that will be displayed.
      reject(new Error('You lost your money 💩'));
    }
  }, 3000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000, 'done waiting');
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 3 second'));

// Static method to resolve and rejectthe promise inmediatly
Promise.resolve('abc').then(X => console.log(X));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   error => reject(error)
    // );

    // Same as above but simplified
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

const auth = '148373027319996109767x19451';

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      console.log(lat, lng);
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${auth}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      const country = data.country.toLowerCase();
      console.log(country);
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err =>
      renderError(`Something went wrong!:\n${err.message}. \nTry again!`)
    )
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);
