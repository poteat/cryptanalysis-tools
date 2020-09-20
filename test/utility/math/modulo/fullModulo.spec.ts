import { fullModulo } from "../../../../src/utility/math/modulo/fullModulo";

describe("basic", () => {
  test("works for simple positive", () => {
    expect(fullModulo(5, 2)).toBe(1);
  });

  test("works for negatives", () => {
    expect(fullModulo(-5, 2)).toBe(1); // -5 => -3 => -1 => 1
  });
});

describe("error cases", () => {
  test("should error on floats", () => {
    expect(() => fullModulo(4, 1.5)).toThrow();
  });
});
