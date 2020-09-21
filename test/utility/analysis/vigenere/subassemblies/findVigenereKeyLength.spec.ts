import { getExamplePlaintext } from "../../../../_const/utility/files/getExamplePlaintext";
import { getTextbookCiphertext } from "../../../../_const/utility/files/getTextbookCiphertext";
import { encryptVigenere } from "../../../../../src";
import { findVigenereKeyLength } from "../../../../../src/utility/analysis/vigenere/subassemblies/findVigenereKeyLength";

describe("basic", () => {
  it("try", async () => {
    const key = "abc";

    const plain = await getExamplePlaintext();
    const cipher = encryptVigenere({ key, plaintext: plain });

    const keyLength = findVigenereKeyLength(cipher);

    console.log(keyLength);
  });

  // it("textbook", async () => {
  //   const cipher = await getTextbookCiphertext();

  //   const keyLength = findVigenereKeyLength(cipher);

  //   console.log(keyLength);
  // });
});
