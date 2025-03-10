'use client'

import { useEffect, useState } from "react";
import ActiveGuess from "./components/activeGuess";
import GuessHistory from "./components/guessHistory";
import { NUMBER_OF_GUESSES } from "@/constants";
import { createAnswer } from "@/lib/answer";
import { updateFeedback } from "@/lib/feedback";
import { calculateBlackPegs, calculateRemainingColors, calculateWhitePegs } from "@/lib/scoring";
import { isGameOver } from "@/lib/endgame";
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
    const answerData = createAnswer();
    setAnswer(answerData.answer);
    setAnswerColors(answerData.answerColors);
    setCurrentGuess([]);
    setRemainingGuesses(NUMBER_OF_GUESSES);
    setHistory([]);
    setMessage("");
    setGameOver(false);
  }
  useEffect(() => initializeGame(), []);

  function scoreGuess(remaining: number) {
    const blackPegs = calculateBlackPegs(currentGuess, answer);
    const remainingColors = calculateRemainingColors(answerColors, currentGuess, answer);
    const whitePegs = calculateWhitePegs(remainingColors, currentGuess, answer);
    setFeedbackHistory(updateFeedback(blackPegs, whitePegs, feedbackHistory));
    const endGame = isGameOver(blackPegs, remaining, answer);
    setMessage(endGame.message);
    setGameOver(endGame.end);
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
