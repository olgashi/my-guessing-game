class Game {
  constructor(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    this.counter = 0;
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

//Adds ivalid guess to array of guesses. FIX IT
  playersGuessSubmission(num, inputElement) {
    if (num > 100 || num < 1 || isNaN(num)){
      resetInputBox(inputElement);
      return 'That is an invalid guess. Try again.';
    }
    this.playersGuess = num;
    return this.checkGuess();
  }
  updateGuesses(){
    let guess = document.getElementById(`guess${this.pastGuesses.length}`);
    guess.innerHTML = this.playersGuess;
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
       disableGuessInput(true);
        return winMessage(this);

      } else if (this.pastGuesses.includes(this.playersGuess)) {
        return 'You have already guessed that number.';
      } else {
          this.pastGuesses[this.counter] = this.playersGuess;
          this.counter += 1;
          this.updateGuesses(); 
      }
  
    let numDifference = this.difference();
  
      if (numDifference < 10 ) return 'You\'re burning up!';
        else if (numDifference < 25 ) return 'You\'re lukewarm.';
        else if (numDifference < 50 ) return 'You\'re a bit chilly.';
        else return 'You\'re ice cold!';
  }

  provideHint() {
    const hintArray = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(hintArray);
  }

  displayHint() {
    let hintArray = this.provideHint();

    return `Winning number is one of the following: ${hintArray[0]}, ${hintArray[1]}, ${hintArray[2]}`;
  }

}
function disableGuessInput(tF) {
  document.getElementById("input-guess").disabled = tF;
}

function generateWinningNumber (){
  return Math.ceil(Math.random() * 100);
}
//refactor
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

//Function that updates #guess-feedback
function updateGuessfeedback(message, game) {
  let feedback = document.getElementById('feedback');
  if (game.pastGuesses.length === 5) {
    message = "You are out of guesses, click 'PLAY AGAIN' to start a new game."
  }
  feedback.innerHTML = `${message}`;
}

//take input from the user and clear the input box
function getInputAndUpdate(inputElement, game) {
  const text = inputElement.value;
  inputElement.value = '';
  const moveMessage = game.playersGuessSubmission(parseInt(text, 10), inputElement);

  console.log(moveMessage);
  updateGuessfeedback(moveMessage, game);
}

function resetInputBox(inputElement){
  inputElement.value = '';
}

//update list of guesses as guesses being submitted

function clearGuesses(game){
  for (let i = 1; i < game.pastGuesses.length+1; i++){
    let guess = document.getElementById(`guess${i}`);
    guess.innerHTML = '';
  }
}

//update number of guesses remaining

function guessesRemaining(game){
  let message = '';
  // let numberOfMoves = 0;
  
  if (game.checkGuess() === 'You Lost. Restart the game.') {
    message = '';
    disableGuessInput(true);
  }
  
  else if (game.pastGuesses.length === 1) { 
    message = `You have 4 more guesses remaining.`;
  }
  else if (game.pastGuesses.length === 4) { 
    message = `You have 1 more guess remaining.`;
  }
  else if (game.pastGuesses.length > 1 && game.pastGuesses.length < 5) {
    message = `You have ${5 - game.pastGuesses.length} more guesses remaining.`;
  }
//How to make that line not shrink when this condition met?
  else if (game.pastGuesses.length === 5) {
    //alternative
    //message = 'You have 0 guesses remaining';
    message = '';
    disableGuessInput(true);
  }  

  let remaining = document.getElementById('guess-remaining');
  remaining.innerHTML = message;

}

function lostMessage() {
  return "You lost, please click 'PLAY AGAIN' to play a new game";
}
function winMessage(game) {
  return `You Win! The winning number is ${game.winningNumber}.`
}

function clearOldGame(inputElement,game) {
  game.pastGuesses = [];
  game.winningNumber = generateWinningNumber();
  game.counter = 0;
  updateGuessfeedback('Guess a number between 1 and 100', game);
  //refactor put this into function, it is also used earlier
  let remaining = document.getElementById('guess-remaining');
  remaining.innerHTML = 'You have 5 more guesses remaining.';

  let hint = document.getElementById('hint-message');
  hint.innerHTML = "Click 'Hint' if you need help.";
  disableGuessInput(false);
  resetInputBox(inputElement); 
}

//game simulation
function playGame() {
  let game = newGame();
  
  function createEventListener(buttonId, elementId, game) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', function() {
      const element = document.getElementById(elementId);
      switch (buttonId) {
        case 'submit':
          getInputAndUpdate(element, game);
          guessesRemaining(game);
          break;
        case 'play-again':
          clearGuesses(game);
          clearOldGame(element, game);
          resetInputBox(element); 
          getInputAndUpdate(element, game);
          break;
        case 'hint':
          element.innerHTML = game.displayHint();
          break;
      }
    });
  }
  createEventListener('submit', 'input-guess', game);
  createEventListener('play-again', 'input-guess', game);
  createEventListener('hint', 'hint-message', game);
}

  
// //submit button
//   const submitButton = document.getElementById('submit');
//   submitButton.addEventListener('click', function() {
//   const inputElement = document.getElementById('input-guess'); 
    
    
//     getInputAndUpdate(inputElement, game);
//     guessesRemaining(game);
//   });


//   //play again button
//   const playAgainButton = document.getElementById('play-again');
//   playAgainButton.addEventListener('click', function() {
//   const inputElement = document.getElementById('input-guess');
  
//   // let game = newGame();
//     clearGuesses(game);
//     clearOldGame(inputElement, game);
//     resetInputBox(inputElement); 
//     getInputAndUpdate(inputElement, game);
//     // guessesRemaining(game);
// });



// //hint button
// const hintButton = document.getElementById('hint');
// hintButton.addEventListener('click', function () {
// const hint = document.getElementById('hint-message');

// hint.innerHTML = game.displayHint();
// });
// }
playGame();