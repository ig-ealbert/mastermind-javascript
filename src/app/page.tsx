'use client'

import { useEffect, useState } from "react";
import ActiveGuess from "./components/activeGuess";
import GuessHistory from "./components/guessHistory";
import { COLORS, NUMBER_OF_GUESSES } from "@/constants";
import styles from "./page.module.css";

export default function Home() {
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [history, setHistory] = useState<string[][]>([]);
  const [feedbackHistory, setFeedbackHistory] = useState<string[][]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [answerColors, setAnswerColors] = useState<number[]>([]);
  const [remainingGuesses, setRemainingGuesses] = useState<number>(NUMBER_OF_GUESSES);
  const [message, setMessage] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);

  function makeGuess() {
    const newHistory = history.slice();
    newHistory.push(currentGuess);
    setHistory(newHistory);
    scoreGuess(remainingGuesses - 1);
    setRemainingGuesses(remainingGuesses - 1);
  }

  function initializeGame() {
    createAnswer();
    setCurrentGuess([]);
    setRemainingGuesses(NUMBER_OF_GUESSES);
    setHistory([]);
    setMessage("");
    setGameOver(false);
  }
  useEffect(() => initializeGame(), []);

  function createAnswer() {
    const answer: string[] = [];
    const answerColors = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      const randomColor = Math.floor(Math.random() * 6);
      answer.push(COLORS[randomColor]);
      answerColors[randomColor]++;
    }
    setAnswer(answer);
    setAnswerColors(answerColors);
    return answer;
  }

  function scoreGuess(remaining: number) {
    const blackPegs = calculateBlackPegs();
    const remainingColors = calculateRemainingColors();
    const whitePegs = calculateWhitePegs(remainingColors)
    updateFeedback(blackPegs, whitePegs);
    isGameOver(blackPegs, remaining);
  }

  function calculateBlackPegs() {
    return currentGuess.filter((color: string, index: number) => color === answer[index]).length;
  }

  function calculateRemainingColors() {
    let remainingColors = answerColors.slice();
    for (let i = 0; i < 4; i++) {
      if (currentGuess[i] === answer[i]) {
        remainingColors[COLORS.indexOf(currentGuess[i])]--;
      }
    }
    return remainingColors;
  }

  function calculateWhitePegs(remaining: number[]) {
    let whitePegs = 0;
    for (let i = 0; i < 4; i++) {
      if (answer.indexOf(currentGuess[i]) !== -1 &&
        currentGuess[i] !== answer[i] &&
        remaining[COLORS.indexOf(currentGuess[i])] > 0) {
        whitePegs++;
        remaining[COLORS.indexOf(currentGuess[i])]--;
      }
    }
    return whitePegs;
  }

  function updateFeedback(black: number, white: number) {
    const newFeedback = feedbackHistory.slice();
    let pegs: string[] = new Array(4);
    pegs = pegs.fill("black", 0, black);
    pegs = pegs.fill("white", black, black + white)
    newFeedback.push(pegs);
    setFeedbackHistory(newFeedback);
    return newFeedback;
  }

  function isGameOver(black: number, remaining: number) {
    const guessWord = remaining === 1 ? "guess" : "guesses";
    if (black === 4) {
      setMessage(`You won with ${remaining} ${guessWord} left!`);
      setGameOver(true);
    }
    else if (remaining === 0) {
      setMessage(`You lose!  The answer was ${answer}.`);
      setGameOver(true);
    }
    else {
      setMessage(`You have ${remaining} ${guessWord} left.`);
    }
  }

  return (
    <>
      <ActiveGuess clickHandler={setCurrentGuess} />
	    <div id="buttonsAndMessage">
		    <input id="guessPattern" type="button" className={styles.buttons} 
          value="Guess" disabled={gameOver} onClick={makeGuess} />
		    <input id="restartGame" type="button" className={styles.buttons}
          value="Reset" disabled={!gameOver} onClick={() => location.reload()} />
		    <label id="message">{message}</label>
	    </div>
	    <GuessHistory guesses={history} feedbacks={feedbackHistory} />
    </>
  );
}
