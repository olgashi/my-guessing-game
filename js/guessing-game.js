function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
  this.counter = 0;  
}
//check if numbers between 1 and 99
function generateWinningNumber (){
  return Math.ceil(Math.random() * 100) - 1;
}

function guessNotValid(num){
  return (num > 99 || num < 1 || (isNaN(num)))
}

function difference(game) {
  return Math.abs(game.playersGuess - game.winningNumber);
}

function playersGuessSubmission(num, inputElement, game) {
  if (guessNotValid(num)) {
    resetInputBox(inputElement);
    return 'That is an invalid guess. Try again.';
  } else {
    game.playersGuess = num;
    return checkGuess(game);
  }
}

function updateGuesses(game){
  let guess = document.getElementById(`guess${game.pastGuesses.length}`);
  guess.innerHTML = game.playersGuess;
  }

function checkGuess(game) {
  if (game.playersGuess === game.winningNumber) {
    disableGuessInput(true);
    return winMessage(game);
  }
  else if (game.pastGuesses.includes(game.playersGuess)) {
    return 'You have already guessed that number.';
  } 
  else if (game.pastGuesses.length === 4) {
    game.pastGuesses[game.counter] = game.playersGuess;
    game.counter += 1;
    updateGuesses(game); 
    return 'You are out of guesses. Please try again.'
  }

  else if (game.playersGuess !== null) {
    game.pastGuesses[game.counter] = game.playersGuess;
    game.counter += 1;
    updateGuesses(game); 
    return differenceMessage(game);
  }
  else {
    updateGuesses(game);
  }
}

function differenceMessage(game){
  let numDifference = difference(game);
  if (numDifference < 10 ) return 'You\'re burning up!';
    else if (numDifference < 25 ) return 'You\'re lukewarm.';
    else if (numDifference < 50 ) return 'You\'re a bit chilly.';
    else return 'You\'re ice cold!';
}

function provideHint(game) {
    return shuffle([game.winningNumber, generateWinningNumber(), generateWinningNumber()]);
}

function displayHint(game) {
  let hintArray = provideHint(game);
  return `Winning number is one of the following: ${hintArray[0]}, ${hintArray[1]}, ${hintArray[2]}`;
}

function disableGuessInput(tF) {
  document.getElementById("input-guess").disabled = tF;
}

function shuffle (myArray){
  let arraySize = myArray.length;
  let t, i = undefined;
  while (arraySize) {
    i = Math.floor(Math.random() * arraySize--);
    t = myArray[arraySize];
    myArray[arraySize] = myArray[i];
    myArray[i] = t;
  }
  return myArray;
}

function updateGuessfeedback(message) {
  let feedback = document.getElementById('feedback');
    feedback.innerHTML = `${message}`;
}

//take input from the user and clear the input box
function getInputAndUpdate(inputElement, game) {
  const text = inputElement.value;
  inputElement.value = '';
  const moveMessage = playersGuessSubmission(parseInt(text, 10), inputElement, game);
  updateGuessfeedback(moveMessage);
}

function resetInputBox(inputElement){
  inputElement.value = '';
}

//update list of guesses as guesses being submitted
function clearGuesses(game){
  for (let i = 1; i < game.pastGuesses.length + 1; i++){
    let guess = document.getElementById(`guess${i}`);
    guess.innerHTML = '';
  }
}

//update number of guesses remaining
function guessesRemaining(game){
  let message = '';
  if (checkGuess(game) === 'You Lost. Restart the game.') {
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
  else if (game.pastGuesses.length === 5) {
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

function clearOldGame(inputElement, game) {
  game.pastGuesses = [];
  game.playersGuess = null;
  game.winningNumber = generateWinningNumber();
  game.counter = 0;
  updateGuessfeedback('Guess a number between 1 and 99');
  //refactor put this into function, it is also used earlier
  let remaining = document.getElementById('guess-remaining');
  remaining.innerHTML = 'You have 5 more guesses remaining.';

  let hint = document.getElementById('hint-message');
  hint.innerHTML = "Click 'Hint' if you need help.";
  disableGuessInput(false);
  resetInputBox(inputElement); 
}

function createEventListener(buttonId, elementId, game) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', function() {
    const element = document.getElementById(elementId);
    if (buttonId === 'submit') {
        getInputAndUpdate(element, game);
        guessesRemaining(game);
    }
    else if (buttonId === 'play-again'){
        clearGuesses(game);
        clearOldGame(element, game);
        resetInputBox(element); 
        getInputAndUpdate(element, game);
    }
    else if (buttonId === 'hint') {
        element.innerHTML = displayHint(game);
    }
    });
}

//game simulation
function playGame() {
  let game = new Game();
  createEventListener('submit', 'input-guess', game);
  createEventListener('play-again', 'input-guess', game);
  createEventListener('hint', 'hint-message', game);
}


playGame();
