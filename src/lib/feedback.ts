export function updateFeedback(black: number, white: number, history: string[][]) {
  const newFeedback = history.slice();
  let pegs: string[] = new Array(4).fill(undefined);
  pegs = pegs.fill("black", 0, black);
  pegs = pegs.fill("white", black, black + white)
  newFeedback.push(pegs);
  return newFeedback;
}
