'use strict';

const resetGame = function () {
  player1.score = 0;
  document.querySelector('#score--0').textContent = player1.score;
  player2.score = 0;
  document.querySelector('#score--1').textContent = player2.score;
  player1.currentScore = 0;
  document.querySelector('#current--0').textContent = player1.currentScore;
  player2.currentScore = 0;
  document.querySelector('#current--1').textContent = player2.currentScore;
  player1.isActive = true;
  player2.isActive = false;
  document.querySelector('.dice').style.display = 'none';
};

const player1 = {
  score: Number(document.querySelector('#score--0').textContent),
  currentScore: Number(document.querySelector('#current--0').textContent),
  isActive: true,
};

const player2 = {
  score: Number(document.querySelector('#score--1').textContent),
  currentScore: Number(document.querySelector('#current--1').textContent),
  isActive: false,
};

const section1 = document.querySelector('.player--0');
const section2 = document.querySelector('.player--1');

let diceSrc = document.querySelector('.dice').src;
console.log(diceSrc);

const resetBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

resetBtn.addEventListener('click', resetGame);
