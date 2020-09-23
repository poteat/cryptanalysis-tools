import { getExampleSubstitutionKey } from "../../../_const/getExampleSubstitutionKey";
import { encryptSubstitution } from "../../../../src/utility/encryption/substitution/encryptSubstitution";

describe("basic", () => {
  it("can encrypt", () => {
    const plaintext = "hellosimplesubcipher";
    const key = getExampleSubstitutionKey();

    console.log(key);

    const encrypted = encryptSubstitution({ key, plaintext });

    expect(encrypted).toBe("SURRZFJGNRUFXTKJNSUV");
  });
});
