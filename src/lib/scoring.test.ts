import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { calculateBlackPegs, calculateRemainingColors, calculateWhitePegs } from "./scoring";

describe("Scoring helper functions", () => {
  it("Calculates black pegs", () => {
    const guess = ["white", "black", "green", "blue"];
    const answer = ["white", "blue", "red", "blue"];
    const blackPegs = calculateBlackPegs(guess, answer);
    assert.deepStrictEqual(blackPegs, 2);
  });

  it("Calculates remaining colors", () => {
    const guess = ["white", "black", "green", "blue"];
    const answer = ["white", "blue", "red", "blue"];
    const remaining = [1, 0, 2, 0, 1, 0];
    const newRemaining = calculateRemainingColors(remaining, guess, answer);
    assert.deepStrictEqual(newRemaining, [0, 0, 1, 0, 1, 0]);
  });

  it("Calculates white pegs", () => {
    const guess = ["white", "red", "green", "blue"];
    const answer = ["white", "blue", "red", "blue"];
    const remaining = [0, 0, 1, 0, 1, 0];
    const whitePegs = calculateWhitePegs(remaining, guess, answer);
    assert.deepStrictEqual(whitePegs, 1);
  });

  it("Calculates white pegs none", () => {
    const guess = ["white", "black", "green", "blue"];
    const answer = ["white", "blue", "red", "blue"];
    const remaining = [0, 0, 1, 0, 1, 0];
    const whitePegs = calculateWhitePegs([], guess, answer);
    assert.deepStrictEqual(whitePegs, 0);
  });
});
