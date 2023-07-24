'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const openModal = document.querySelectorAll('.show-modal');
console.log(openModal);

const funcOpenModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const funcCloseModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const overlayClick = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < openModal.length; i++) {
  console.log(openModal[i].textContent);
  openModal[i].addEventListener('click', funcOpenModal);
}

closeModal.addEventListener('click', funcCloseModal);

overlay.addEventListener('click', overlayClick);
