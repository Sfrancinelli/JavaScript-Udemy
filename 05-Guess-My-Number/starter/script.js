'use strict';
'use strict';

let randomNum = Math.trunc(Math.random() * 20) + 1;

let highscore = document.querySelector('.highscore').textContent;
let score = Number(document.querySelector('.score').textContent);
console.log(randomNum)

let againFunc = function() {
    highscore = document.querySelector('.highscore').textContent;
    document.querySelector('.score').textContent = 20;
    randomNum = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.guess').value = "";
    document.querySelector('.message').textContent = 'Start guessing...'

}

let checkFunc = function() {

    highscore = document.querySelector('.highscore').textContent;
    let input = Number(document.querySelector('.guess').value);
    let number = document.querySelector('.number').textContent;
    score = Number(document.querySelector('.score').textContent);

    console.log(randomNum)

    if (input !== randomNum) {

        if(input < randomNum) {
            document.querySelector('.message').textContent = 'Too low!'
        } else if(input > randomNum) {
            document.querySelector('.message').textContent = 'Too high!'
        }
        number = input;
        score -= 1;
        document.querySelector('.score').textContent = score;
        document.querySelector('.number').textContent = number;

    } else if (input === randomNum) {

        document.querySelector('.message').textContent = '🎉 Correct Number!'

        if (Number(highscore) < score) {
            document.querySelector('.highscore').textContent = score;
        }
    }

    return highscore;
}

let checkBtn = document.querySelector('.check').addEventListener('click', checkFunc);

let againBtn = document.querySelector('.again').addEventListener('click', 
againFunc);
