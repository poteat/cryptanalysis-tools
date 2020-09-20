import { letterFromCipherOffset } from "../../../../src/utility/string/offsets/letterFromCipherOffset";

describe("basic", () => {
  it("can convert offsets to letters", () => {
    const letter = letterFromCipherOffset(0);

    expect(letter).toBe("A");
  });
});
