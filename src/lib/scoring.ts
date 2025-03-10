import { COLORS } from "@/constants";

export function calculateBlackPegs(
  currentGuess: string[],
  answer: string[]) {
  return currentGuess.filter((color: string, index: number) => color === answer[index]).length;
}

export function calculateRemainingColors(
  answerColors: number[],
  currentGuess: string[],
  answer: string[]) {
  let remainingColors = answerColors.slice();
  for (let i = 0; i < 4; i++) {
    if (currentGuess[i] === answer[i]) {
      remainingColors[COLORS.indexOf(currentGuess[i])]--;
    }
  }
  return remainingColors;
}

export function calculateWhitePegs(
  remaining: number[],
  currentGuess: string[],
  answer: string[]) {
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
