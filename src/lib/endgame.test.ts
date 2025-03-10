import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { isGameOver } from "./endgame";

describe("Endgame helper functions", () => {
  it("Detects a win with more than 1 guess left", () => {
    const black = 4;
    const remaining = 5;
    const answer = ["white", "blue", "red", "blue"];
    const win = isGameOver(black, remaining, answer);
    assert.strictEqual(win.message, `You won with ${remaining} guesses left!`);
    assert.strictEqual(win.end, true);
  });

  it("Detects a win with only 1 guess left", () => {
    const black = 4;
    const remaining = 1;
    const answer = ["white", "blue", "red", "blue"];
    const win = isGameOver(black, remaining, answer);
    assert.strictEqual(win.message, `You won with ${remaining} guess left!`);
    assert.strictEqual(win.end, true);
  });

  it("Detects a loss", () => {
    const black = 1;
    const remaining = 0;
    const answer = ["white", "blue", "red", "blue"];
    const loss = isGameOver(black, remaining, answer);
    assert.strictEqual(loss.message, `You lose!  The answer was ${answer}.`);
    assert.strictEqual(loss.end, true);
  });

  it("Continues game with more than 1 guess left", () => {
    const black = 1;
    const remaining = 9;
    const answer = ["white", "blue", "red", "blue"];
    const notOver = isGameOver(black, remaining, answer);
    assert.strictEqual(notOver.message, `You have ${remaining} guesses left.`);
    assert.strictEqual(notOver.end, false);
  });

  it("Continues game with 1 guess left", () => {
    const black = 1;
    const remaining = 1;
    const answer = ["white", "blue", "red", "blue"];
    const notOver = isGameOver(black, remaining, answer);
    assert.strictEqual(notOver.message, `You have ${remaining} guess left.`);
    assert.strictEqual(notOver.end, false);
  });
});
