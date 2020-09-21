import { sanitizePlaintext } from "../../../../src/utility/string/sanitize/sanitizePlaintext";

describe("basic", () => {
  it("should remove spaces and newlines", () => {
    expect(sanitizePlaintext("hello world\n foobar   ")).toBe(
      "HELLOWORLDFOOBAR"
    );
  });
});
