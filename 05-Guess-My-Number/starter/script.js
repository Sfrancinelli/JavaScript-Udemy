'use strict';

let randomNum = Math.trunc(Math.random() * 20) + 1;

let score = Number(document.querySelector('.score').textContent);
console.log(randomNum);
let cuerpo = document.getElementsByTagName('body')[0];
let gameIsOver = false;

// Another way of setting the style of an element by JS.
// document.querySelector('body').style.backgroundColor = '#60b347';

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

let againFunc = function () {
  document.querySelector('.score').textContent = 20;
  randomNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
  cuerpo.classList.remove('win');
  document.querySelector('.number').style.width = '15rem';
  displayNumber('?');
  gameIsOver = false;
};

let checkFunc = function () {
  let highscore = document.querySelector('.highscore').textContent;
  let input = Number(document.querySelector('.guess').value);
  score = Number(document.querySelector('.score').textContent);
  console.log(randomNum);

  if (input !== randomNum) {
    if (score > 1) {
      if (!input) {
        displayMessage('⛔ No number!');
      } else if (input > randomNum) {
        displayMessage('Too high!');
      } else if (input < randomNum) {
        displayMessage('Too low!');
      }
      score--;
      document.querySelector('.score').textContent = score;
      displayNumber(input);
    } else {
      displayMessage('💥 You lost!');
      document.querySelector('.score').textContent = 0;
      gameIsOver = true;
    }
  } else if (input === randomNum && gameIsOver === false) {
    cuerpo.classList.add('win');
    displayNumber(input);
    document.querySelector('.number').style.width = '30rem';
    displayMessage('🎉 Correct Number!');

    if (Number(highscore) < score) {
      document.querySelector('.highscore').textContent = score;
    }
  }

  return highscore;
};

let checkBtn = document
  .querySelector('.check')
  .addEventListener('click', checkFunc);

let againBtn = document
  .querySelector('.again')
  .addEventListener('click', againFunc);
