QUnit.test( "Clicking on a white guess space changes it to black", function( assert ) {
  var guessSpace = document.getElementById("guessRow").childNodes[1];
  changeColor(guessSpace);
  assert.equal( guessSpace.style.fill, "black", "The default white space becomes black on click." );
});

QUnit.test( "Clicking on a black guess space changes it to blue", function( assert ) {
  var guessSpace = document.getElementById("guessRow").childNodes[1];
  guessSpace.style.fill = "black";
  changeColor(guessSpace);
  assert.equal( guessSpace.style.fill, "blue", "The black space becomes blue on click." );
});

QUnit.test( "Clicking on a blue guess space changes it to green", function( assert ) {
  var guessSpace = document.getElementById("guessRow").childNodes[1];
  guessSpace.style.fill = "blue";
  changeColor(guessSpace);
  assert.equal( guessSpace.style.fill, "green", "The blue space becomes green on click." );
});

QUnit.test( "Clicking on a green guess space changes it to red", function( assert ) {
  var guessSpace = document.getElementById("guessRow").childNodes[1];
  guessSpace.style.fill = "green";
  changeColor(guessSpace);
  assert.equal( guessSpace.style.fill, "red", "The green space becomes red on click." );
});

QUnit.test( "Clicking on a red guess space changes it to yellow", function( assert ) {
  var guessSpace = document.getElementById("guessRow").childNodes[1];
  guessSpace.style.fill = "red";
  changeColor(guessSpace);
  assert.equal( guessSpace.style.fill, "yellow", "The red space becomes yellow on click." );
});

QUnit.test( "Clicking on a yellow guess space changes it to white", function( assert ) {
  var guessSpace = document.getElementById("guessRow").childNodes[1];
  guessSpace.style.fill = "yellow";
  changeColor(guessSpace);
  assert.equal( guessSpace.style.fill, "white", "The yellow space becomes white on click." );
});

QUnit.test( "You start the game with 10 guesses", function (assert ) {
  initializeGame();
  assert.equal(remainingGuesses, 10, "When the game starts, you have 10 guesses left." );
});

QUnit.test( "A hidden pattern of 4 colors is chosen", function (assert ) {
  initializeGame();
  assert.equal(answer.length, 4, "When the game starts, a hidden pattern is chosen that you must guess." );
});

QUnit.test( "You win the game when you guess the pattern", function (assert ) {
  initializeGame();
  answer = ["red", "green", "blue", "black"];
  currentGuess = ["red", "green", "blue", "black"];
  remainingGuesses = 9;
  scoreGuess();
  assert.equal( message.innerHTML, "You won with 9 guesses left!", "A message is displayed to show that the player won." );
});

QUnit.test( "You lose the game when you have no guesses left", function (assert ) {
  initializeGame();
  answer = ["red", "green", "blue", "black"];
  remainingGuesses = 0;
  scoreGuess();
  assert.equal( message.innerHTML, "You lose!  The answer was red,green,blue,black.", "A message is displayed to show that the player lost." );
});

QUnit.test( "You win the game when you guess right, even if you have no guesses left", function (assert ) {
  initializeGame();
  remainingGuesses = 0;
  answer = ["red", "green", "blue", "black"];
  currentGuess = ["red", "green", "blue", "black"];
  scoreGuess();
  assert.equal( message.innerHTML, "You won with 0 guesses left!", "A message is displayed to show that the player won." );
});

QUnit.test( "A grammatically correct message is displayed if you win with only one guess left", function (assert ) {
  initializeGame();
  remainingGuesses = 1;
  answer = ["red", "green", "blue", "black"];
  currentGuess = ["red", "green", "blue", "black"];
  scoreGuess();
  assert.equal( message.innerHTML, "You won with 1 guess left!", "A message is displayed to show that the player won." );
});

QUnit.test( "The guess button becomes disabled when the game is won", function (assert ) {
  initializeGame();
  answer = ["red", "green", "blue", "black"];
  currentGuess = ["red", "green", "blue", "black"];
  scoreGuess();
  assert.equal( guessButton.disabled, true, "The guess button is disabled because the game is over." );
});

QUnit.test( "The guess button becomes disabled when the game is lost", function (assert ) {
  initializeGame();
  remainingGuesses = 0;
  scoreGuess();
  assert.equal( guessButton.disabled, true, "The guess button is disabled because the game is over." );
});

QUnit.test( "The number of white pegs is correctly calculated when the colors are right, but not the number of them", function (assert ) {
  initializeGame();
  answerColors = [0, 0, 0, 1, 2, 1];
  answer = ["red", "yellow", "red", "green"];
  currentGuess = ["green", "yellow", "red", "yellow"];
  var remainingColors = calculateRemainingColors(currentGuess);
  var black = calculateBlackPegs(currentGuess);
  var white = calculateWhitePegs(currentGuess, remainingColors);
  assert.equal( white, 1, "There is only 1 white peg because there is no second yellow space." );
});

QUnit.test( "The number of white pegs is correctly calculated when there are 3 black pegs", function (assert ) {
  initializeGame();
  answerColors = [0, 1, 0, 1, 2, 0];
  answer = ["red", "black", "green", "red"];
  currentGuess = ["yellow", "black", "green", "red"];
  var remainingColors = calculateRemainingColors(currentGuess);
  var black = calculateBlackPegs(currentGuess);
  var white = calculateWhitePegs(currentGuess, remainingColors);
  assert.equal( white, 0, "There are no yellow spaces and all the other spaces are correct, so no colors are in the wrong place." );
});

QUnit.test( "The number of white pegs is correctly calculated when there are 2 black pegs", function (assert ) {
  initializeGame();
  answerColors = [0, 1, 0, 1, 2, 0];
  answer = ["red", "black", "green", "red"];
  currentGuess = ["green", "black", "yellow", "red"];
  var remainingColors = calculateRemainingColors(currentGuess);
  var black = calculateBlackPegs(currentGuess);
  var white = calculateWhitePegs(currentGuess, remainingColors);
  assert.equal( white, 1, "There are no yellow spaces and the black and red pegs are correctly placed, so only the green space is out of place." );
});

QUnit.test( "Initially the message div should be blank", function (assert ) {
  initializeGame();
  assert.equal( message.innerHTML, "", "No message should be displayed when the game starts." );
});

QUnit.test( "Initially the guess button should be enabled", function (assert ) {
  initializeGame();
  assert.equal( guessButton.disabled, false, "The combo containing letters should be enabled." );
});

QUnit.test( "A random pattern is chosen when the game starts", function (assert ) {
  initializeGame();
  assert.equal( answer.length, 4, "A random pattern is created at the start of the game." );
});

QUnit.test( "After a pattern is guessed, the history is updated with that pattern and feedback", function (assert ) {
  initializeGame();
  var guessSpace;
  for (var i = 1; i <= 7; i=i+2) {
	guessSpace = document.getElementById("guessRow").childNodes[i];
	guessSpace.style.fill = "green";
  }
  guessPatternFromUI();
  var currentRow = document.getElementById("activeGuess");
  var history = document.getElementById("guessHistory");
  var historyRow = currentRow.cloneNode(true);
	for (var i = 1; i <= 7; i=i+2) {
		historyRow.childNodes[1].childNodes[i].removeAttribute("onclick");
	}
  assert.equal(history.innerHTML, "<div>" + historyRow.innerHTML + "</div>", "The current guess should be copied to the history.");
});

QUnit.test( "An entry in the history is read-only", function (assert ) {
  initializeGame();
  var guessSpace;
  for (var i = 1; i <= 7; i=i+2) {
	guessSpace = document.getElementById("guessRow").childNodes[i];
	guessSpace.style.fill = "green";
  }
  guessPatternFromUI();
  var currentRow = document.getElementById("activeGuess");
  var historyRow = currentRow.cloneNode(true);
	for (var i = 1; i <= 7; i=i+2) {
		historyRow.childNodes[1].childNodes[i].removeAttribute("onclick");
	}
  var history = document.getElementById("guessHistory");
  var historySpace = history.childNodes[0].childNodes[1].childNodes[1];
  // Can't simply click on an SVG element
  var event = document.createEvent("SVGEvents");
  event.initEvent("click",true,true);
  historySpace.dispatchEvent(event);
  assert.equal(history.innerHTML, "<div>" + historyRow.innerHTML + "</div>", "The history guess should not change on click.");
});

QUnit.test( "After a pattern is guessed, there is one less remaining guess", function (assert ) {
  initializeGame();
  answerColors = [0, 1, 0, 1, 2, 0];
  answer = ["red", "black", "green", "red"];
  currentGuess = ["black", "black", "black", "black"];
  guessPattern(currentGuess);
  assert.equal( remainingGuesses, 9, "Instead of 10 remaining guesses, now there are 9." );
});

QUnit.test( "After a pattern is guessed, a message displays how many guesses you have left", function (assert ) {
  initializeGame();
  answerColors = [0, 1, 0, 1, 2, 0];
  answer = ["red", "black", "green", "red"];
  currentGuess = ["black", "black", "black", "black"];
  guessPattern(currentGuess);
  assert.equal( message.innerHTML, "You have 9 guesses left.", "Instead of 10 remaining guesses, now there are 9." );
});

QUnit.test( "A grammatically correct message is displayed if you have only one guess left", function (assert ) {
  initializeGame();
  answerColors = [0, 1, 0, 1, 2, 0];
  remainingGuesses = 2;
  answer = ["red", "black", "green", "red"];
  currentGuess = ["black", "black", "black", "black"];
  guessPattern(currentGuess);
  assert.equal( message.innerHTML, "You have 1 guess left.", "You only have 1 guess left." );
});

QUnit.test( "The reset button should be highlighted when the game is won", function (assert ) {
  initializeGame();
  answer = ["red", "green", "blue", "black"];
  currentGuess = ["red", "green", "blue", "black"];
  scoreGuess();
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "The reset button should be highlighted when the game is lost", function (assert ) {
  initializeGame();
  remainingGuesses = 0;
  scoreGuess();
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "The reset button should not be highlighted when the game starts", function (assert ) {
  initializeGame();
  assert.equal( resetButton.classList.contains("greenBorder"), false, "The reset button should not have a green border." );
});