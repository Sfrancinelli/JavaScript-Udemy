'use strict';

let randomNum = Math.trunc(Math.random() * 20) + 1;

let score = Number(document.querySelector('.score').textContent);
console.log(randomNum);
let cuerpo = document.getElementsByTagName('body')[0];
let gameIsOver = false;

// Another way of setting the style of an element by JS.
// document.querySelector('body').style.backgroundColor = '#60b347';

let againFunc = function () {
  document.querySelector('.score').textContent = 20;
  randomNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  cuerpo.classList.remove('win');
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  gameIsOver = false;
};

let checkFunc = function () {
  let highscore = document.querySelector('.highscore').textContent;
  let input = Number(document.querySelector('.guess').value);
  let number = document.querySelector('.number').textContent;
  score = Number(document.querySelector('.score').textContent);
  console.log(randomNum);

  if (input !== randomNum) {
    if (score > 1) {
      if (!input) {
        document.querySelector('.message').textContent = '⛔ No number!';
      } else if (input > randomNum) {
        document.querySelector('.message').textContent = 'Too high!';
      } else if (input < randomNum) {
        document.querySelector('.message').textContent = 'Too low!';
      }
      number = input;
      score--;
      document.querySelector('.score').textContent = score;
      document.querySelector('.number').textContent = number;
    } else {
      document.querySelector('.message').textContent = '💥 You lost!';
      document.querySelector('.score').textContent = 0;
      gameIsOver = true;
    }
  } else if (input === randomNum && gameIsOver === false) {
    cuerpo.classList.add('win');
    document.querySelector('.number').textContent = input;
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.message').textContent = '🎉 Correct Number!';

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
