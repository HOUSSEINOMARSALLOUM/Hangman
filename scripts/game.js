const words = [
    "JAVASCRIPT",
    "PYTHON",
    "PROGRAMMING",
    "DEVELOPER",
    "COMPUTER",
  ];
  const bodyParts = [
    '<circle cx="250" cy="125" r="25" stroke="black" stroke-width="3" fill="none" class="head"/>',
    '<line x1="250" y1="150" x2="250" y2="250" stroke="black" stroke-width="3" class="body"/>',
    '<line x1="250" y1="180" x2="200" y2="220" stroke="black" stroke-width="3" class="left-hand"/>',
    '<line x1="250" y1="180" x2="300" y2="220" stroke="black" stroke-width="3" class="right-hand"/>',
    '<line x1="250" y1="250" x2="200" y2="290" stroke="black" stroke-width="3" class="left-leg"/>',
    '<line x1="250" y1="250" x2="300" y2="290" stroke="black" stroke-width="3" class="right-leg"/>',
  ];

  let currentWord = words[Math.floor(Math.random() * words.length)];
  let wrongGuesses = 0;
  let correctGuesses = new Set();

  function initializeGame() {
    const answerSection = document.getElementById("answer-section");
    answerSection.innerHTML = currentWord
      .split("")
      .map(() => "<span>_</span>")
      .join("");

    document.querySelectorAll(".letter").forEach((letter) => {
      letter.addEventListener("click", handleLetterClick);
    });

    document.addEventListener("keydown", handleKeyPress);
  }

  function handleKeyPress(event) {
    const key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
      const letterElement = Array.from(
        document.querySelectorAll(".letter")
      ).find((el) => el.textContent === key);
      if (letterElement && !letterElement.classList.contains("pressed")) {
        checkLetter(key, letterElement);
      }
    }
  }

  function handleLetterClick(event) {
    const letter = event.target;
    if (!letter.classList.contains("pressed")) {
      checkLetter(letter.textContent, letter);
    }
  }

  function checkLetter(letter, element) {
    element.classList.add("pressed");

    if (currentWord.includes(letter)) {
      correctGuesses.add(letter);
      updateWord();
      checkWin();
    } else {
      wrongGuesses++;
      updateHangman();
      checkLose();
    }
  }

  function updateWord() {
    const answerSection = document.getElementById("answer-section");
    answerSection.innerHTML = currentWord
      .split("")
      .map(
        (letter) =>
          `<span>${correctGuesses.has(letter) ? letter : "_"}</span>`
      )
      .join("");
  }
  function resetGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wrongGuesses = 0;
    correctGuesses.clear();
    document.querySelector(".stand").innerHTML = `
            <line x1="50" y1="350" x2="350" y2="350" stroke="black" stroke-width="3"/>
            <line x1="150" y1="350" x2="150" y2="50" stroke="black" stroke-width="3"/>
            <line x1="150" y1="50" x2="250" y2="50" stroke="black" stroke-width="3"/>
            <line x1="250" y1="50" x2="250" y2="100" stroke="black" stroke-width="3"/>
        `;
    document.querySelectorAll(".letter").forEach((letter) => {
      letter.classList.remove("pressed");
    });
    initializeGame();
  }

  initializeGame();