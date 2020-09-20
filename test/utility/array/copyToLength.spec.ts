import { copyToLength } from "../../../src/utility/array/copyToLength";

describe("basic", () => {
  it("short inputs is just slicing", () => {
    expect(copyToLength([1, 2, 3], 1)).toStrictEqual([1]);
  });

  it("same length is identity", () => {
    expect(copyToLength("hello world", "hello world".length)).toStrictEqual(
      "hello world"
    );
  });
});
