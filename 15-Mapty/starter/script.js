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

///////////////////////////////////////////////////////////////////
// Workouts architecture
class Workout {
  date = new Date();
  id = Date.now() + ''.slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;

    this.calcSpeed();
  }

  calcSpeed() {
    // min/km
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 27, 85, 523);
console.log(run1, cycling1);

////////////////////////////////////////////////////////////////////
// Application architecture
class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    // Event listener to check the change of the select input
    inputType.addEventListener('change', this._toggleElevationField.bind(this));

    this.className;
    this.content;

    form.addEventListener('submit', this._newWorkout.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 16); // The second attr is the zoom lvl

    L.tileLayer('https://tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputCadence.parentNode.classList.toggle('form__row--hidden');
    inputElevation.parentNode.classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
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
      this.className = 'cycling-popup';
      this.content = `🚴‍♂️ Cycling on ${mm} ${dd}`;
    }
    if (inputType.value === 'running') {
      this.className = 'running-popup';
      this.content = `🏃‍♂️ Running on ${mm} ${dd}`;
    }

    // Getting the coordinates for marker
    const { lat, lng } = this.#mapEvent.latlng;
    console.log(`${lat}, ${lng}`);

    // Display a marker
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${this.className}`,
        })
      )
      .setPopupContent(`${this.content}`)
      .openPopup();

    form.classList.add('hidden');
  }
}

const app = new App();

console.dir(App);
