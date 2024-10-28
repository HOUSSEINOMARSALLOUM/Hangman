function updateHangman() {
  if (wrongGuesses <= bodyParts.length) {
    const hangSVG = document.querySelector(".stand");
    hangSVG.innerHTML += bodyParts[wrongGuesses - 1];
  }
}

function checkWin() {
  if (currentWord.split("").every((letter) => correctGuesses.has(letter))) {
    setTimeout(() => {
      alert("You Won!!Congrats!!!");
      resetGame();
    }, 500);
  }
}

function checkLose() {
  if (wrongGuesses === bodyParts.length) {
    setTimeout(() => {
      alert("You lose :( The word was " + currentWord);
      resetGame();
    }, 500);
  }
}
