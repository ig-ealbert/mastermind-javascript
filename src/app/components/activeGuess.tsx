import { useEffect, useState } from "react";
import GuessCircle from "./guessCircle";
import { BIG_RADIUS, COLORS } from "@/constants";
import { activeGuessParams } from "@/types/activeGuessParams";
import { changeColor, convertNumbersToColors } from "@/lib/colors";

export default function ActiveGuess(params: activeGuessParams) {
  const Y = 55;

  const [guess, setGuess] = useState<number[]>(new Array(4).fill(0));
  useEffect(() => params.clickHandler(convertNumbersToColors(guess)), [guess]);

  return (
  <div id="activeGuess">
    <svg xmlns="http://www.w3.org/2000/svg" width="550px" id="guessRow">
      <GuessCircle x={55} y={Y} radius={BIG_RADIUS} 
        fill={COLORS[guess[0]]} clickHandler={() => setGuess(changeColor(guess, 0))} />
      <GuessCircle x={165} y={Y} radius={BIG_RADIUS}
        fill={COLORS[guess[1]]} clickHandler={() => setGuess(changeColor(guess, 1))} />
      <GuessCircle x={275} y={Y} radius={BIG_RADIUS}
        fill={COLORS[guess[2]]} clickHandler={() => setGuess(changeColor(guess, 2))} />
      <GuessCircle x={385} y={Y} radius={BIG_RADIUS}
        fill={COLORS[guess[3]]} clickHandler={() => setGuess(changeColor(guess, 3))} />
    </svg>
  </div>
  );
}