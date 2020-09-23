import { getExampleSubstitutionKey } from "../../../_const/getExampleSubstitutionKey";
import { decryptSubstitution } from "../../../../src/utility/decryption/substitution/decryptSubstitution";

describe("basic", () => {
  it("can decrypt", () => {
    const key = getExampleSubstitutionKey();
    const cipher = "SURRZFJGNRUFXTKJNSUV";

    expect(decryptSubstitution({ key, ciphertext: cipher })).toBe(
      "HELLOSIMPLESUBCIPHER"
    );
  });
});
