let answer = [];
let currentGuess = [];
const colors = ["white", "black", "blue", "green", "red", "yellow"];
let remainingGuesses = 10;
let answerColors = [0, 0, 0, 0, 0, 0]; // Color totals for white peg calculation
const guessRow = document.getElementById("guessRow");
const message = document.getElementById("message");
const guessButton = document.getElementById("guessPattern");
const resetButton = document.getElementById("restartGame");
const history = document.getElementById("guessHistory");
initializeGame();

function changeColor(element) {
  const colorIndex = colors.indexOf(element.style.fill);
  element.style.fill = colors[(colorIndex + 1) % 6];
}

function initializeGame() {
  answer = createAnswer();
  resetGuesses();
  resetHistory();
  message.innerHTML = "";
}

function createAnswer() {
  answer = [];
  answerColors = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    const randomColor = Math.floor(Math.random() * 6);
    answer.push(colors[randomColor]);
    answerColors[randomColor]++;
  }
  return answer;
}

function resetGuesses() {
  remainingGuesses = 10;
  currentGuess = [];
  for (let i = 0; i < 8; i++) {
    const peg = guessRow.childNodes[2 * i + 1];
    peg.style.fill = "white";
    if (i >= 4) {
      peg.style.stroke = "white";
    }
  }
  guessButton.disabled = false;
  resetButton.classList.remove("greenBorder");
}

function guessPatternFromUI() {
  currentGuess = turnGuessIntoArray();
  guessPattern();
}

function guessPattern() {
  remainingGuesses--;
  scoreGuess();
  copyRowToHistory();
}

function scoreGuess() {
  const blackPegs = calculateBlackPegs();
  const remainingColors = calculateRemainingColors();
  const whitePegs = calculateWhitePegs(remainingColors)
  updateFeedback(blackPegs, whitePegs);
  isGameOver(blackPegs);
}

function calculateBlackPegs() {
  let blackPegs = 0;
  for (let i = 0; i < 4; i++) {
    if (currentGuess[i] === answer[i]) {
      blackPegs++;
    }
  }
  return blackPegs;
}

function calculateRemainingColors() {
  let remainingColors = answerColors.slice();
  for (let i = 0; i < 4; i++) {
    if (currentGuess[i] === answer[i]) {
      remainingColors[colors.indexOf(currentGuess[i])]--;
    }
  }
  return remainingColors;
}

function calculateWhitePegs(remainingColors) {
  let whitePegs = 0;
  for (let i = 0; i < 4; i++) {
    if (answer.indexOf(currentGuess[i]) !== -1 &&
      currentGuess[i] !== answer[i] &&
      remainingColors[colors.indexOf(currentGuess[i])] > 0) {
      whitePegs++;
      remainingColors[colors.indexOf(currentGuess[i])]--;
    }
  }
  return whitePegs;
}

function isGameOver(blackPegs) {
  const guessWord = remainingGuesses === 1 ? "guess" : "guesses";
  if (blackPegs === 4) {
    endGame(`You won with ${remainingGuesses} ${guessWord} left!`);
  }
  else if (remainingGuesses === 0) {
    endGame(`You lose!  The answer was ${answer}.`);
  }
  else {
    message.innerHTML = `You have ${remainingGuesses} ${guessWord} left.`;
  }
}

function turnGuessIntoArray() {
  const submittedGuess = [];
  for (let i = 0; i < 4; i++) {
    const peg = guessRow.childNodes[2 * i + 1];
    submittedGuess.push(peg.style.fill);
  }
  return submittedGuess;
}

function updateFeedback(black, white) {
  resetFeedback();
  for (let i = 4; i < black + 4; i++) {
    let peg = guessRow.childNodes[2 * i + 1];
    peg.style.stroke = "black";
    peg.style.fill = "black";
  }
  for (let i = 4 + black; i < white + black + 4; i++) {
    let peg = guessRow.childNodes[2 * i + 1];
    peg.style.stroke = "black";
    peg.style.fill = "white";
  }
}

function resetFeedback() {
  for (let i = 4; i < 8; i++) {
    let peg = guessRow.childNodes[2 * i + 1];
    peg.style.stroke = "white";
    peg.style.fill = "white";
  }
}

function copyRowToHistory() {
  const currentRow = document.getElementById("activeGuess");
  const historyRow = currentRow.cloneNode(true);
  for (let i = 1; i <= 7; i=i+2) {
    historyRow.childNodes[1].childNodes[i].removeAttribute("onclick"); // Remove click interaction
  }
  history.innerHTML = `<div>${historyRow.innerHTML}</div>${history.innerHTML}`;	
}

function resetHistory() {
  history.innerHTML = "";
}

function endGame(gameResult) {
  message.innerHTML = gameResult;
  guessButton.disabled = true;
  resetButton.classList.add("greenBorder");
}