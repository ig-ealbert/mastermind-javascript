import { guessHistoryParams } from "@/types/guessHistoryParams";
import GuessCircle from "./guessCircle";
import {
  MEDIUM_RADIUS,
  TINY_RADIUS,
  LEFT_X,
  RIGHT_X,
  TOP_Y,
  BOTTOM_Y,
  CIRCLE_INDICES,
} from "@/constants";

export default function GuessHistory(params: guessHistoryParams) {
  return (
    <div id="guessHistory">
      {params.guesses.map((guess: string[], index: number) => (
        <div key={`guess${index}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="550px" height="82px">
            {CIRCLE_INDICES.map((circleIndex) => (
              <GuessCircle
                key={`guess${index}Circle${circleIndex}`}
                x={55 + 70 * circleIndex}
                y={BOTTOM_Y}
                radius={MEDIUM_RADIUS}
                fill={guess[circleIndex]}
              />
            ))}
            {CIRCLE_INDICES.map((circleIndex) => (
              <GuessCircle
                key={`guess${index}Feedback${circleIndex}`}
                x={circleIndex % 2 === 0 ? LEFT_X : RIGHT_X}
                y={circleIndex < 2 ? TOP_Y : BOTTOM_Y}
                radius={TINY_RADIUS}
                fill={params.feedbacks[index][circleIndex] || "lightgray"}
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  );
}
