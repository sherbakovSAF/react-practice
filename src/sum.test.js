import { expect, test } from "vitest";
import { sum } from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 4 + 4 to equal 3", () => {
  expect(sum(4, 4)).toBe(8);
});
