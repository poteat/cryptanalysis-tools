import { letterToCipherOffset } from "../../../../src/utility/string/offsets/letterToCipherOffset";

describe("basic", () => {
  it("basic cases work", () => {
    const aCode = letterToCipherOffset("A");
    expect(aCode).toBe(0);
  });

  it("lowercase is same as uppercase", () => {
    const bCode = letterToCipherOffset("b");
    expect(bCode).toBe(1);
  });

  it("Z is supported", () => {
    const zCode = letterToCipherOffset("Z");
    expect(zCode).toBe(25);
  });
});

describe("error cases", () => {
  it("Non A-Z throws", () => {
    expect(() => letterToCipherOffset("-")).toThrow();
  });

  it("expect empty string to throw", () => {
    expect(() => letterToCipherOffset("")).toThrow();
  });

  it("expect long string to throw", () => {
    expect(() => letterToCipherOffset("foobar")).toThrow();
  });
});
