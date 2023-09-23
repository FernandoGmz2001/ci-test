import sum from "./functionTest.js";

describe("functionTest.js", () => {
  test("adds to numbers", () => {
    expect(sum(1,3)).toBe(3);
  });
});
