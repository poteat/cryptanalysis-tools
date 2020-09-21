import { rotateMap } from "../../../../src/utility/map/rotation/rotateMap";

describe("basic", () => {
  it("can rotate map", () => {
    expect(rotateMap({ a: 0, b: 1, c: 2 }, 1)).toStrictEqual({
      a: 1,
      b: 2,
      c: 0,
    });
  });

  it("can rotate by a lot", () => {
    expect(rotateMap({ a: 0, b: 1, c: 2 }, 7)).toStrictEqual({
      a: 1,
      b: 2,
      c: 0,
    });
  });

  it("rotate by zero is no-op", () => {
    expect(rotateMap({ a: 0, b: 1, c: 2 }, 0)).toStrictEqual({
      a: 0,
      b: 1,
      c: 2,
    });
  });

  it("rotate empty returns empty", () => {
    expect(rotateMap({}, 5)).toStrictEqual({});
  });
});

describe("error cases", () => {
  it("float values for rotation should throw", () => {
    expect(() => rotateMap({ a: 0, b: 1 }, 1.5)).toThrow();
  });
});
