import { guessCircleParams } from "@/types/guessCircleParams";

export default function GuessCircle(params: guessCircleParams) {
  return (
    <circle cx={params.x} cy={params.y} r={params.radius}
      stroke="black" fill={params.fill || "white"}
      onClick={params.clickHandler} />
  )
}