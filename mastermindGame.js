var answer = [];
var currentGuess = [];
const colors = ["white", "black", "blue", "green", "red", "yellow"];
var remainingGuesses = 10;
var answerColors = [0, 0, 0, 0, 0, 0]; // Track the colors in the answer for white peg calculation
var guessRow = document.getElementById("guessRow");
var message = document.getElementById("message");
var guessButton = document.getElementById("guessPattern");
var resetButton = document.getElementById("restartGame");
initializeGame();

function changeColor(element) {
	var colorIndex = colors.indexOf(element.style.fill);
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
	for (var i = 0; i < 4; i++) {
		var randomColor = Math.floor(Math.random() * 6);
		answer.push(colors[randomColor]);
		answerColors[randomColor]++;
	}
	return answer;
}

function resetGuesses() {
	remainingGuesses = 10;
	currentGuess = [];
	for (var i = 0; i < 8; i++) {
		var peg = guessRow.childNodes[2 * i + 1];
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
	guessPattern(currentGuess);
}

function guessPattern(currentGuess) {
	remainingGuesses--;
	scoreGuess();
	copyRowToHistory();
}

function scoreGuess() {
	var blackPegs = calculateBlackPegs(currentGuess);
	var remainingColors = calculateRemainingColors(currentGuess);
	var whitePegs = calculateWhitePegs(currentGuess, remainingColors)
	updateFeedback(blackPegs, whitePegs);
	isGameOver(blackPegs);
}

function calculateBlackPegs(currentGuess) {
	var blackPegs = 0;
	for (var i = 0; i < 4; i++) {
		if (currentGuess[i] === answer[i]) {
			blackPegs++;
		}
	}
	return blackPegs;
}

function calculateRemainingColors(currentGuess) {
	var remainingColors = answerColors.slice();
	for (var i = 0; i < 4; i++) {
		if (currentGuess[i] === answer[i]) {
			remainingColors[colors.indexOf(currentGuess[i])]--;
		}
	}
	return remainingColors;
}

function calculateWhitePegs(currentGuess, remainingColors) {
	var whitePegs = 0;
	for (var i = 0; i < 4; i++) {
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
	var guessWord = remainingGuesses === 1 ? "guess" : "guesses";
	if (blackPegs === 4) {
		endGame("You won with " + remainingGuesses + " " + guessWord + " left!");
	}
	else if (remainingGuesses === 0) {
		endGame("You lose!  The answer was " + answer + ".");
	}
	else {
		message.innerHTML = "You have " + remainingGuesses + " " + guessWord + " left.";
	}
}

function turnGuessIntoArray() {
	var submittedGuess = [];
	for (var i = 0; i < 4; i++) {
		var peg = guessRow.childNodes[2 * i + 1];
		submittedGuess.push(peg.style.fill);
	}
	return submittedGuess;
}

function updateFeedback(black, white) {
	resetFeedback();
	for (var i = 4; i < black + 4; i++) {
		var peg = guessRow.childNodes[2 * i + 1];
		peg.style.stroke = "black";
		peg.style.fill = "black";
	}
	for (var i = 4 + black; i < white + black + 4; i++) {
		var peg = guessRow.childNodes[2 * i + 1];
		peg.style.stroke = "black";
		peg.style.fill = "white";
	}
}

function resetFeedback() {
	for (var i = 4; i < 8; i++) {
		var peg = guessRow.childNodes[2 * i + 1];
		peg.style.stroke = "white";
		peg.style.fill = "white";
	}
}

function copyRowToHistory() {
	var currentRow = document.getElementById("activeGuess");
	var history = document.getElementById("guessHistory");
	var historyRow = currentRow.cloneNode(true);
	for (var i = 1; i <= 7; i=i+2) {
		historyRow.childNodes[1].childNodes[i].removeAttribute("onclick"); // Remove click interaction
	}
	history.innerHTML = "<div>" + historyRow.innerHTML + "</div>" + history.innerHTML;	
}

function resetHistory() {
	var history = document.getElementById("guessHistory");
	history.innerHTML = "";
}

function endGame(gameResult) {
	message.innerHTML = gameResult;
	guessButton.disabled = true;
	resetButton.classList.add("greenBorder");
}