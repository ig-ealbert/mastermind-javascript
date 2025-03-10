export function isGameOver(black: number, remaining: number, answer: string[]) {
  const guessWord = remaining === 1 ? "guess" : "guesses";
  if (black === 4) {
    return {
      message: `You won with ${remaining} ${guessWord} left!`,
      end: true,
    }
  }
  if (remaining === 0) {
    return {
      message: `You lose!  The answer was ${answer}.`,
      end: true,
    }
  }
  return {
    message: `You have ${remaining} ${guessWord} left.`,
    end: false,
  }
}