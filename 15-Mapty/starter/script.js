'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 16); // The second attr is the zoom lvl

      L.tileLayer('https://tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Handling clicks on map
      map.on('click', function (mapE) {
        // console.log(mapEvent);
        mapEvent = mapE;

        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
}

// Event listener to check the change of the select input
inputType.addEventListener('change', function () {
  inputCadence.parentNode.classList.toggle('form__row--hidden');
  inputElevation.parentNode.classList.toggle('form__row--hidden');
});

let className;
let content;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  console.log(inputType.value);
  console.log(inputDistance.value);
  console.log(inputDuration.value);
  console.log(inputCadence.value);
  console.log(inputElevation.value);

  // Clearing input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

  // Getting the current date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');

  const options = { month: 'long' };
  const mm = new Intl.DateTimeFormat('en-US', options).format(today);

  // Setting up the options for the marker according to action
  if (inputType.value === 'cycling') {
    className = 'cycling-popup';
    content = `🚴‍♂️ Cycling on ${mm} ${dd}`;
  }
  if (inputType.value === 'running') {
    className = 'running-popup';
    content = `🏃‍♂️ Running on ${mm} ${dd}`;
  }

  // Getting the coordinates for marker
  const { lat, lng } = mapEvent.latlng;
  console.log(`${lat}, ${lng}`);

  // Display a marker
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${className}`,
      })
    )
    .setPopupContent(`${content}`)
    .openPopup();

  form.classList.add('hidden');
});
