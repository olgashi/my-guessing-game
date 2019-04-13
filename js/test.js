function createEventListener(buttonId, elementId, game) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', function() {
    const element = document.getElementById(elementId);
    switch (buttonId) {
      case 'submit':
        getInputAndUpdate(inputElement, game);
        guessesRemaining(game);
        break;
      case 'play-again':
        clearGuesses(game);
        clearOldGame(inputElement, game);
        resetInputBox(inputElement); 
        getInputAndUpdate(inputElement, game);
        break;
      case 'hint':
      hint.innerHTML = game.displayHint();
      break;
    }
  });
}