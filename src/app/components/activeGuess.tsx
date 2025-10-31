import { useEffect, useState } from "react";
import GuessCircle from "./guessCircle";
import { BIG_RADIUS, CIRCLE_INDICES, COLORS, BOTTOM_Y } from "@/constants";
import { activeGuessParams } from "@/types/activeGuessParams";
import { changeColor, convertNumbersToColors } from "@/lib/colors";

export default function ActiveGuess(params: activeGuessParams) {
  const [guess, setGuess] = useState<number[]>(new Array(4).fill(0));
  useEffect(() => params.clickHandler(convertNumbersToColors(guess)), [guess]);

  return (
    <div id="activeGuess">
      <svg xmlns="http://www.w3.org/2000/svg" width="550px" id="guessRow">
        {CIRCLE_INDICES.map((index) => (
          <GuessCircle
            key={`guessCircle${index}`}
            x={55 + 110 * index}
            y={BOTTOM_Y}
            radius={BIG_RADIUS}
            fill={COLORS[guess[index]]}
            clickHandler={() => setGuess(changeColor(guess, index))}
          />
        ))}
      </svg>
    </div>
  );
}
