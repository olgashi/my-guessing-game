/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

class Game {
  constructor(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  
  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission(num) {
    if (num > 100 || num < 1 || isNaN(num)){
      throw 'That is an invalid guess.';
    }
    this.playersGuess = num;
    
    return this.checkGuess();
    
  }

  checkGuess() {

    let resultString = '';
  
    if (this.playersGuess === this.winningNumber) {
        resultString = 'You Win!';

      } else if (this.pastGuesses.includes(this.playersGuess)) {
        resultString = 'You have already guessed that number.';
      }
    else { 
      this.pastGuesses.push(this.playersGuess);    
      
      if (this.playersGuessSubmission.length === 5) {
        resultString = 'You Lose';
        } else {
        let numDifference = this.difference();
    
        if (numDifference < 10 ) resultString = 'You\'re burning up!';
        else if (numDifference < 25 ) resultString = 'You\'re lukewarm.';
        else if (numDifference < 50 ) resultString = 'You\'re a bit chilly.';
        else resultString = 'You\'re ice cold!';
      }
    }

    document.querySelector('#guess-feedback > h4').innerHTML = resultString;
document.querySelector(`#previous-guesses li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;

  return resultString;
  }

  provideHint() {
    const hintArray = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(hintArray);
  }
}

function generateWinningNumber (){
  return Math.ceil(Math.random() * 100);
}

function shuffle (myArray){
  let arraySize = myArray.length;
  let t = undefined;
  let i = undefined;
  while (arraySize) {  
    i = Math.floor(Math.random() * arraySize--);

    t = myArray[arraySize];
    myArray[arraySize] = myArray[i];
    myArray[i] = t;
  }

  return myArray;
}

function newGame(){
  return new Game();
}

// function addGuess(guess, id) {
//   let newGuess = document.getElementById(`${id}`);
//   newGuess.innerHTML = guess;
// }

function playGame(){
  const game = newGame();

   // We are grabbing the button from our html
   const button = document.getElementById('submit');

   // We are listening for when the use clicks on our button.
   // When they click, we will check in the input field to see if they have guessed a number. Then we will run the function `checkGuess`, and give it the player's guess, the winning number, and the empty array of guesses!
   button.addEventListener('click', function() {
     const playersGuess = document.getElementById('input-guess').value;
     document.querySelector('#input-guess').value = '';
 
     game.playersGuessSubmission(playersGuess);
   });
 }

playGame();