import { decryptVigenere } from "../../../src/utility/decryption/decryptVigenere";

describe("basic", () => {
  it("AAA is no-op", () => {
    const s = decryptVigenere({ key: "a", ciphertext: "helloworld" });

    expect(s).toBe("HELLOWORLD");
  });

  it("can decrypt properly", () => {
    const s = decryptVigenere({ key: "abc", ciphertext: "HFNLPYOSND" });

    expect(s).toBe("HELLOWORLD");
  });
});
