import { toUpper } from "lodash";

import { getExamplePlaintext } from "../../../_const/utility/files/getExamplePlaintext";
import { encryptVigenere } from "../../../../src";
import { breakVigenere } from "../../../../src/utility/analysis/vigenere/breakVigenere";

describe("basic", () => {
  it("can decrypt", async () => {
    const key = "abc";

    const plain = await getExamplePlaintext();
    const cipher = encryptVigenere({ key, plaintext: plain });

    const recoveredPlaintext = breakVigenere(cipher);

    expect(recoveredPlaintext).toBe(toUpper(key));
  });
});
