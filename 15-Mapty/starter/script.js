'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// const form = document.querySelector('.form');
// const containerWorkouts = document.querySelector('.workouts');
// const inputType = document.querySelector('.form__input--type');
// const inputDistance = document.querySelector('.form__input--distance');
// const inputDuration = document.querySelector('.form__input--duration');
// const inputCadence = document.querySelector('.form__input--cadence');
// const inputElevation = document.querySelector('.form__input--elevation');

const form = document.querySelector('.form');
const formBtn = document.querySelector('.form__btn');
const formInput = document.querySelector('.form__input--type');
const distance = document.querySelector('.form__input--distance');
const duration = document.querySelector('.form__input--duration');
const cadence = document.querySelector('.form__input--cadence');
const elevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 16); // The second attr is the zoom lvl

      L.tileLayer('https://tile.openstreetmap.fr/hot//{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapEvent) {
        console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;
        console.log(`${lat}, ${lng}`);

        form.classList.remove('hidden');

        form.addEventListener('click', function (e) {
          e.preventDefault();
          if (formInput.value === 'cycling') {
            cadence.parentNode.classList.add('form__row--hidden');
            elevation.parentNode.classList.remove('form__row--hidden');
          }

          if (formInput.value === 'running') {
            cadence.parentNode.classList.remove('form__row--hidden');
            elevation.parentNode.classList.add('form__row--hidden');
          }
        });
      });

      let className;
      let content;

      form.addEventListener('submit', function (e) {
        console.log(formInput.value);
        console.log(distance.value);
        console.log(duration.value);
        console.log(cadence.value);
        console.log(elevation.value);

        const distance = distance.value;
        const duration = duration.value;
        const cadence = cadence.value;
        const elevation = elevation.value;

        const date = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');

        if (formInput.value === 'cycling') {
          className = 'cycling-popup';
          content = `🚴‍♂️ Cycling on ${mm} ${dd}`;
        }
        if (formInput.value === 'running') {
          className = 'running-popup';
          content = `🏃‍♂️ Running on ${mm} ${dd}`;
        }

        // Setting a marker
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
        console.log(e);
        e.preventDefault();
      });

      // console.log(map);
    },
    function () {
      alert('Could not get your position');
    }
  );
}
