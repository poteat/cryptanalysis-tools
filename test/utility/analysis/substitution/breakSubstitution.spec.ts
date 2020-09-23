import { getExampleSubstitutionKey } from "../../../_const/getExampleSubstitutionKey";
import { getExamplePlaintext } from "../../../_const/utility/files/getExamplePlaintext";
import { breakSubstitution } from "../../../../src/utility/analysis/substitution/breakSubstitution";
import { encryptSubstitution } from "../../../../src/utility/encryption/substitution/encryptSubstitution";

describe("basic", () => {
  it("can break cipher", async () => {
    const plaintext = await getExamplePlaintext();
    const key = getExampleSubstitutionKey();

    const ciphertext = encryptSubstitution({ plaintext, key });

    const recoveredKey = breakSubstitution(ciphertext);

    expect(recoveredKey).toBe(key);
  });
});
