import { describe, it } from "@jest/globals"
import assert from "node:assert";
import { createAnswer } from "./answer";

describe("Answer helper functions", () => {
  it("Creates an answer", () => {
    const answerData = createAnswer();
    assert.strictEqual(answerData.answer.length, 4);
    assert.strictEqual(answerData.answerColors.length, 6);
  });
});
