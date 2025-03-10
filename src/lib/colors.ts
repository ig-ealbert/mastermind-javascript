import { COLORS } from "@/constants";

export function changeColor(guess: number[], index: number) {
  const newGuess = guess.slice();
  newGuess[index] = (newGuess[index] + 1) % 6;
  return newGuess;
}

export function convertNumbersToColors(guess: number[]) {
  return guess.map((num: number) => COLORS[num]);
}
