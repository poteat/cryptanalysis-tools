import { assertIntegerNumber } from "../../../../src/safety/assertions/number/assertIntegerNumber";

describe("basic", () => {
  it("positive", () => {
    expect(assertIntegerNumber(5)).toBeUndefined();
  });

  it("negative integers allowed", () => {
    expect(assertIntegerNumber(-10)).toBeUndefined();
  });

  it("negative", () => {
    expect(() => assertIntegerNumber(5.3)).toThrow();
  });
});
