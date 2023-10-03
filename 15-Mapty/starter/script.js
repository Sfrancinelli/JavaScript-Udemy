'use strict';

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
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  //   click() {
  //     this.clicks++;
  //   }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // min/km
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 85, 523);
// console.log(run1, cycling1);

////////////////////////////////////////////////////////////////////
// Application architecture
class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local Storage
    this._getLocalStorage();

    // Event handlers
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    // console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 14); // The second attr is the zoom lvl

    L.tileLayer('https://tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      //   this._renderWorkout(work);
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    // prettier-ignore
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputCadence.parentNode.classList.toggle('form__row--hidden');
    inputElevation.parentNode.classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Getting the current date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');

    const options = { month: 'long' };
    const mm = new Intl.DateTimeFormat('en-US', options).format(today);

    // Getting the coordinates for marker
    const { lat, lng } = this.#mapEvent.latlng;
    // console.log(`${lat}, ${lng}`);

    // Get data form form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const cadence = Number(inputCadence.value);
    const elevation = Number(inputElevation.value);

    // Initializing the workout variable for future workouts
    let workout;

    // Check if data is valid
    if (!Number.isFinite(distance) || !Number.isFinite(duration)) {
      return alert('The distance and duration inputs MUST be numbers!');
    }
    if (distance <= 0) {
      alert('Please input a positive distance');
    } else if (Number(duration) <= 0) {
      alert('Please enter a positive duration');
    } else if (type === 'running') {
      if (!Number.isFinite(cadence)) {
        return alert(
          'Cadence MUST be a number that represents the step per minute count!'
        );
      } else if (Number(cadence) <= 0) {
        alert('Please enter a positive cadence');
      } else {
        // Create running object
        workout = new Running([lat, lng], distance, duration, cadence);
        // console.log(workout);
        this.#workouts.push(workout);
      }
    } else if (type === 'cycling') {
      if (!Number.isFinite(elevation)) {
        return alert(
          'Elevation MUST be a number that represents the meters of elevation!'
        );
      } else {
        // Create cycling object
        workout = new Cycling([lat, lng], distance, duration, elevation);
        // console.log(workout);
        this.#workouts.push(workout);
      }
    }

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Hide form after submit
    this._hideForm();

    // Render workout list
    this._renderWorkout(workout);

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // Display a marker
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    // const date = this.getDate(workout);
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (workout.type === 'running') {
      html += `          
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${workout.cadence}</span>
        <span class="workout__unit">spm</span>
      </div>
    </li>`;
    }

    if (workout.type === 'cycling') {
      html += `          
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__vsalue">${workout.speed.toFixed(1)} </span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevation}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const id = workoutEl.dataset.id;
    const workout = this.#workouts.find(work => work.id === id);
    console.log(workout);

    this.#map.setView(workout.coords, 16, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // workout.click();
  }

  get workouts() {
    return this.#workouts;
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
// console.log(app.workouts);

// console.dir(App);
