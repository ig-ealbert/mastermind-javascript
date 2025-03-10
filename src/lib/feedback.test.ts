import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { updateFeedback } from "./feedback";

describe("Feedback helper functions", () => {
  it("Adds feedback with some black pegs", () => {
    const black = 2;
    const white = 0;
    const history: string[][] = []
    const expected = [["black", "black", undefined, undefined]];
    const newHistory = updateFeedback(black, white, history);
    assert.deepStrictEqual(newHistory, expected);
  });

  it("Adds feedback with some white pegs", () => {
    const black = 0;
    const white = 2;
    const history: string[][] = []
    const expected = [["white", "white", undefined, undefined]];
    const newHistory = updateFeedback(black, white, history);
    assert.deepStrictEqual(newHistory, expected);
  });

  it("Adds feedback with mixed pegs", () => {
    const black = 2;
    const white = 2;
    const history: string[][] = []
    const expected = [["black", "black", "white", "white"]];
    const newHistory = updateFeedback(black, white, history);
    assert.deepStrictEqual(newHistory, expected);
  });
});
