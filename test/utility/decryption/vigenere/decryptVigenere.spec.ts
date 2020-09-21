import toUpper from "lodash/toUpper";

import { encryptVigenere } from "../../../../src";
import { decryptVigenere } from "../../../../src/utility/decryption/vigenere/decryptVigenere";

describe("basic", () => {
  it("AAA is no-op", () => {
    const s = decryptVigenere({ key: "a", ciphertext: "helloworld" });

    expect(s).toBe("HELLOWORLD");
  });

  it("can decrypt properly", () => {
    const s = decryptVigenere({ key: "abc", ciphertext: "HFNLPYOSND" });

    expect(s).toBe("HELLOWORLD");
  });

  it("decryption is inverse of encryption", () => {
    const key = "sdlkjghow";
    const text = "helloworldfoobar";
    const cipher = encryptVigenere({
      key,
      plaintext: text,
    });

    const recoveredPlaintext = decryptVigenere({
      key,
      ciphertext: cipher,
    });

    expect(recoveredPlaintext).toBe(toUpper(text));
  });
});
