import { getExamplePlaintext } from "../../../../_const/utility/files/getExamplePlaintext";
import { encryptVigenere } from "../../../../../src";
import { findVigenereKeyLength } from "../../../../../src/utility/analysis/vigenere/subassemblies/findVigenereKeyLength";

describe("basic", () => {
  it("try", async () => {
    const key = "helloworldabc";

    const plain = await getExamplePlaintext();
    const cipher = encryptVigenere({ key, plaintext: plain });

    const keyLength = findVigenereKeyLength(cipher);

    expect(keyLength).toBe(key.length);
  });
});
