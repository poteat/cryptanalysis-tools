import { shiftArray } from "../../../src/utility/array/shiftArray";

describe("basic", () => {
  it("shifting equal length returns all undefined", () => {
    expect(shiftArray([1, 2, 3], 3)).toStrictEqual([
      undefined,
      undefined,
      undefined,
    ]);
  });

  it("shifting 0 is a no-op", () => {
    expect(shiftArray([1, 2, 3], 0)).toStrictEqual([1, 2, 3]);
  });

  it("shifting removes elements from front", () => {
    expect(shiftArray([1, 2, 3, 4, 5], 2)).toStrictEqual([
      undefined,
      undefined,
      1,
      2,
      3,
    ]);
  });
});

describe("error cases", () => {
  it("shifting floats or negatives throws error", () => {
    expect(() => shiftArray([1, 2, 3], -2)).toThrow();
    expect(() => shiftArray([1, 2, 3], -1.5)).toThrow();
  });

  it("shifting too much is an error", () => {
    expect(() => shiftArray([1, 2, 3], 10)).toThrow();
  });
});
