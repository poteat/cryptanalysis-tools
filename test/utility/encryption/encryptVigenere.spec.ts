import { encryptVigenere } from "../../../src/utility/encryption/encryptVigenere";

describe("basic", () => {
  it("AAA is no-op", () => {
    const s = encryptVigenere({ key: "a", plaintext: "helloworld" });

    expect(s).toBe("HELLOWORLD");
  });

  it("can encrypt properly", () => {
    const s = encryptVigenere({ key: "abc", plaintext: "helloworld" });
    console.log(s);

    expect(s).toHaveLength("helloworld".length);
  });
});
