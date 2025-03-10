import { COLORS } from "@/constants";
import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { changeColor, convertNumbersToColors } from "./colors";

describe("Colors helper functions", () => {
  it("Converts numbers to colors", () => {
    const nums = [0, 1, 2, 3, 4, 5];
    const expected = COLORS;
    const cols = convertNumbersToColors(nums);
    assert.deepStrictEqual(cols, expected);
  });

  it("Increments color without wraparound", () => {
    const nums = [0, 1, 2, 3];
    const expected = [1, 1, 2, 3];
    const incremented = changeColor(nums, 0);
    assert.deepStrictEqual(incremented, expected);
  });

  it("Increments color with wraparound", () => {
    const nums = [5, 5, 5, 5];
    const expected = [0, 5, 5, 5];
    const incremented = changeColor(nums, 0);
    assert.deepStrictEqual(incremented, expected);
  });
});
