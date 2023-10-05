'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnNo = document.querySelector('.no');
const btnYes = document.querySelector('.yes');

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const sortDivider = document.querySelector('.sort__devider');
const sortBtn = document.querySelector('.show__sort__btns');
const sortContainer = document.querySelector('.sort__buttons__container');

///////////////////////////////////////
// Modal window

///////////////////////////////////////////////////////////////////
// Workouts architecture
class Workout {
  date = new Date();
  static nextId = 1;
  clicks = 0;
  marker;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min

    this.id = Workout.nextId++; // Assing an unique id and increment the counter
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
  deleteBtn;
  showSort = false;

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local Storage
    this._getLocalStorage();

    // Event handlers
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    containerWorkouts.addEventListener('click', this._createDelBtn.bind(this));
    btnCloseModal.addEventListener('click', this._closeModal.bind(this));
    overlay.addEventListener('click', this._closeModal.bind(this));
    btnNo.addEventListener('click', this._closeModal.bind(this));
    btnYes.addEventListener('click', this._deleteWorkout.bind(this));
    sortBtn.addEventListener('click', this._sortBtn.bind(this));
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
    console.log(latitude, longitude);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 14); // The second attr is the zoom lvl

    this.#map.locate({ setView: true, maxZoom: 16 }); // Zooming on current location

    // this.#map = L.map('map').locate({ setView: true, maxZoom: 16 });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      //   this._renderWorkout(work);
      this._renderWorkoutMarker(work);
    });

    this.#map.on('locationfound', this._onLocationFound.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _onLocationFound(mapE) {
    this.#mapEvent = mapE;

    console.log(mapE);
    const radius = Math.floor(mapE.accuracy);

    L.marker(mapE.latlng)
      .addTo(this.#map)
      .bindPopup('You are within ' + radius + ' meters from this point')
      .openPopup();

    L.circle(mapE.latlng, radius).addTo(this.#map);
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

    // Initializing html variable to show error
    let html;

    // Check if data is valid
    if (!Number.isFinite(distance) || !Number.isFinite(duration)) {
      html = `       
      <div class="validation__msg">
        The distance and duration inputs<span class="positive__numbers">
        MUST be numbers!</span>
      </div>`;
    }
    if (distance <= 0) {
      html = `
      <div class="validation__msg">
      Please input a <span class="positive__numbers">
      positive distance</span>
    </div>`;
    } else if (Number(duration) <= 0) {
      html = `
      <div class="validation__msg">
      Please enter a <span class="positive__numbers">
      positive duration</span>
    </div>`;
    } else if (type === 'running') {
      if (!Number.isFinite(cadence)) {
        html = `
        <div class="validation__msg">
        Cadence MUST be a number that represents<span class="positive__numbers">
         the step per minute count!</span>
      </div>`;
      } else if (Number(cadence) <= 0) {
        html = `
        <div class="validation__msg">
        Please enter a <span class="positive__numbers">
        positive cadence</span>
      </div>`;
      } else {
        // Create running object
        workout = new Running([lat, lng], distance, duration, cadence);
        // console.log(workout);
        this.#workouts.push(workout);
      }
    } else if (type === 'cycling') {
      if (!Number.isFinite(elevation)) {
        html = `
        <div class="validation__msg">
        Elevation MUST be a number that represents <span class="positive__numbers">
        the meters of elevation!</span>
      </div>`;
      } else {
        // Create cycling object
        workout = new Cycling([lat, lng], distance, duration, elevation);
        // console.log(workout);
        this.#workouts.push(workout);
      }
    }

    if (html) {
      const form = document.querySelector('.form');
      form.insertAdjacentHTML('afterend', html);
      const validationMsg = document.querySelector('.validation__msg');
      validationMsg.classList.add('msg__show');
      setTimeout(() => {
        validationMsg.classList.remove('msg__show');
      }, 1000);
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
    const myIcon = L.icon({
      iconUrl: 'icon.png',
      iconSize: [40, 40],
      iconAnchor: [22, 40],
      popupAnchor: [-2, -35],
    });

    // Display a marker
    workout.marker = L.marker(workout.coords, { icon: myIcon })
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
    <button type="button" class="workout--delete">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      fill="currentColor"
      class="bi bi-trash"
      viewBox="0 0 16 16"
    >
      <path
        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
      ></path>
      <path
        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
      ></path>
    </svg>
  </button>
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
    // form.insertAdjacentHTML('afterend', html);
    sortDivider.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const id = Number(workoutEl.dataset.id);
    const workout = this.#workouts.find(work => work.id === id);
    // console.log(workout);

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
    const workoutData = this.#workouts.map(workout => ({
      // Create a copy of workout data without circular references
      id: workout.id,
      coords: workout.coords,
      distance: workout.distance,
      duration: workout.duration,
      type: workout.type,
      cadence: workout.cadence,
      elevation: workout.elevation,
    }));

    localStorage.setItem('workouts', JSON.stringify(workoutData));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data.map(workoutData => {
      // Create workout objects from stored data
      if (workoutData.type === 'running') {
        return new Running(
          workoutData.coords,
          workoutData.distance,
          workoutData.duration,
          workoutData.cadence
        );
      } else if (workoutData.type === 'cycling') {
        return new Cycling(
          workoutData.coords,
          workoutData.distance,
          workoutData.duration,
          workoutData.elevation
        );
      }
    });

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  _createDelBtn(e) {
    this.deleteBtn = null;
    // console.log(e.target.classList);
    if (
      e.target.classList.contains('workout--delete') ||
      e.target.classList.contains('bi-trash')
    ) {
      console.log(e.target);
      this.deleteBtn = e.target.closest('.workout--delete');
      console.log(this.deleteBtn);
    }

    if (!this.deleteBtn) return;

    this._openModal(e);
    this.deleteBtn.addEventListener('click', this._openModal.bind(this));
  }

  _openModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }

  _closeModal(e) {
    e.preventDefault();
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  _deleteWorkout(e) {
    e.preventDefault();
    const workoutEl = this.deleteBtn.parentNode;
    const id = Number(workoutEl.dataset.id);
    const workout = this.#workouts.find(work => work.id === id);

    if (!workout) return; // Return early if workout not found

    // Access the marker reference from the workout object and remove it from the map
    if (workout.marker) {
      this.#map.removeLayer(workout.marker);
    }

    const index = this.#workouts.indexOf(workout);

    // Remove the workout from the workouts array
    if (index !== -1) {
      this.#workouts.splice(index, 1);
    }

    this._closeModal(e);

    workoutEl.remove();
    this._setLocalStorage();
  }

  _sortBtn() {
    if (this.showSort === false || this.showSort === undefined) {
      sortContainer.classList.remove('zero__height');
      this.showSort = true;
    } else if (this.showSort === true) {
      sortContainer.classList.add('zero__height');
      this.showSort = false;
    }
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
// console.log(app.workouts);

// console.dir(App);
