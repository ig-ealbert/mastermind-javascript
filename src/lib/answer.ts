import { COLORS } from "@/constants";

export function createAnswer() {
  const answer: string[] = [];
  const answerColors = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 4; i++) {
    const randomColor = Math.floor(Math.random() * 6);
    answer.push(COLORS[randomColor]);
    answerColors[randomColor]++;
  }
  return { 
    answer,
    answerColors
  };
}
