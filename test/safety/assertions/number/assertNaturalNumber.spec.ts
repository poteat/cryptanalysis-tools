import { assertNaturalNumber } from "../../../../src/safety/assertions/number/assertNaturalNumber";

describe("basic", () => {
  it("positive", () => {
    expect(assertNaturalNumber(5)).toBeUndefined();
  });

  it("negative integers disallowed", () => {
    expect(() => assertNaturalNumber(-10)).toThrow();
  });

  it("negative", () => {
    expect(() => assertNaturalNumber(5.3)).toThrow();
  });
});
