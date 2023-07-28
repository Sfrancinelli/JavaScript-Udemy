'use strict';

let randomNum = Math.trunc(Math.random() * 6) + 1;

const resetGame = function () {
  player1.score = 0;
  document.querySelector('#score--0').textContent = player1.score;
  player2.score = 0;
  document.querySelector('#score--1').textContent = player2.score;
  player1.currentScore = 0;
  document.querySelector('#current--0').textContent = player1.currentScore;
  player2.currentScore = 0;
  document.querySelector('#current--1').textContent = player2.currentScore;
  // player1.isActive = true;
  // player2.isActive = false;
  document.querySelector('.dice').style.display = 'none';
};

const rollDice = function () {
  randomNum = Math.trunc(Math.random() * 6) + 1;
  console.log(randomNum);

  switch (randomNum) {
    case 1:
      diceSrc = 'dice-1.png';
      break;
    case 2:
      diceSrc = 'dice-2.png';
      break;
    case 3:
      diceSrc = 'dice-3.png';
      break;
    case 4:
      diceSrc = 'dice-4.png';
      break;
    case 5:
      diceSrc = 'dice-5.png';
      break;
    case 6:
      diceSrc = 'dice-6.png';
      break;
  }

  if (player1.isActive && randomNum !== 1) {
    player1.currentScore += randomNum;
    document.querySelector('#current--0').textContent = player1.currentScore;
  } else if (player2.isActive && randomNum !== 1) {
    player2.currentScore += randomNum;
    document.querySelector('#current--1').textContent = player2.currentScore;
  } else if (player1.isActive && randomNum === 1) {
    player1.currentScore = 0;
    document.querySelector('#current--0').textContent = player1.currentScore;
    player1.isActive = false;
    player2.isActive = true;
    // call Hold function
    holdScore();
  } else if (player2.isActive && randomNum === 1) {
    player2.currentScore = 0;
    document.querySelector('#current--1').textContent = player2.currentScore;
    player2.isActive = false;
    player1.isActive = true;
    // call Hold function
    holdScore();
  }

  if (document.querySelector('.dice').style.display === 'none') {
    document.querySelector('.dice').style.display = 'block';
  }

  document.querySelector('.dice').src = diceSrc;
  console.log(document.querySelector('.dice').src);
};

const holdScore = function () {
  if (player1.isActive) {
    player1.score += player1.currentScore;
    document.querySelector('#score--0').textContent = player1.score;
    player1.isActive = false;
    player2.isActive = true;
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
    player1.currentScore = 0;
  } else if (player2.isActive) {
    player2.score += player2.currentScore;
    document.querySelector('#score--1').textContent = player2.score;
    player1.isActive = true;
    player2.isActive = false;
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    player2.currentScore = 0;
  }
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
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);

console.log(document.querySelector('.player--1').classList);
