import { guessHistoryParams } from "@/types/guessHistoryParams";
import GuessCircle from "./guessCircle";
import { BIG_RADIUS, SMALL_RADIUS } from "@/constants";

export default function GuessHistory(params: guessHistoryParams) {
  const MEDIUM_RADIUS = BIG_RADIUS / 2;
  const TINY_RADIUS = SMALL_RADIUS / 2;

  return (
    <div id="guessHistory">
      {params.guesses.map((guess: string[], index: number) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="550px" height="82px" key={`guess${index}`}>
          <GuessCircle x={55} y={55} radius={MEDIUM_RADIUS} fill={guess[0]} />
          <GuessCircle x={125} y={55} radius={MEDIUM_RADIUS} fill={guess[1]} />
          <GuessCircle x={195} y={55} radius={MEDIUM_RADIUS} fill={guess[2]} />
          <GuessCircle x={265} y={55} radius={MEDIUM_RADIUS} fill={guess[3]} />
          {params.feedbacks[index][0] &&
            <GuessCircle x={315} y={35} radius={TINY_RADIUS} fill={params.feedbacks[index][0]} />}
          {params.feedbacks[index][1] &&
            <GuessCircle x={335} y={35} radius={TINY_RADIUS} fill={params.feedbacks[index][1]} />}
          {params.feedbacks[index][2] &&
            <GuessCircle x={315} y={55} radius={TINY_RADIUS} fill={params.feedbacks[index][2]} />}
          {params.feedbacks[index][3] &&
            <GuessCircle x={335} y={55} radius={TINY_RADIUS} fill={params.feedbacks[index][3]} />}
        </svg>
      ))}
    </div>
  );
}