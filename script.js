'use strict';
const checkButton = document.querySelector('.check'),
  numberField = document.querySelector('.number-input'),
  guessMessage = document.querySelector('.guess-message'),
  scoreField = document.querySelector('.score'),
  body = document.querySelector('.body'),
  highScore = document.querySelector('.highscore'),
  resetBtn = document.querySelector('.again'),
  test = document.querySelector('.question');

let score = 20;
let bestScore = localStorage.getItem('bestScore')
  ? Number(localStorage.getItem('bestScore'))
  : 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;

const displayGuessMessage = message => {
  guessMessage.textContent = message;
};

highScore.textContent = bestScore;

checkButton.addEventListener('click', () => {
  const guessingNumber = +numberField.value;

  // No input
  if (!guessingNumber) {
    displayGuessMessage('Введіть число від 1 до 20');

    // Player won
  } else if (guessingNumber === secretNumber) {
    displayGuessMessage('Вітаю, Ви вгадали!');
    test.textContent = secretNumber;
    body.style.backgroundColor = 'rgb(9, 250, 21)';
    test.style.width = '50rem';

    if (score > bestScore) {
      bestScore = score;
      highScore.textContent = bestScore;
      localStorage.setItem('bestScore', bestScore);
    }

    // The number is wrong
  } else if (guessingNumber !== secretNumber) {
    if (score > 1) {
      displayGuessMessage(
        guessingNumber > secretNumber
          ? 'Занадто велике число!'
          : 'Занадто маленьке число!'
      );
      score--;
      scoreField.textContent = score;
    } else {
      displayGuessMessage('Game Over!');
      scoreField.textContent = 0;
    }
  }
});

resetBtn.addEventListener('click', () => {
  location.reload();
});
