import { decryptSubstitution } from "../../../../src/utility/decryption/substitution/decryptSubstitution";

describe("basic", () => {
  it("can decrypt", () => {
    // eslint-disable-next-line no-secrets/no-secrets
    const key = "HTKCUOISJYARGMZNBVFPXDLWQE";
    const cipher = "SURRZFJGNRUFXTKJNSUV";

    expect(decryptSubstitution({ key, ciphertext: cipher })).toBe(
      "HELLOSIMPLESUBCIPHER"
    );
  });
});
