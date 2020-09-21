import { encryptSubstitution } from "../../../../src/utility/encryption/substitution/encryptSubstitution";

describe("basic", () => {
  it("can encrypt", () => {
    const plaintext = "hellosimplesubcipher";

    // eslint-disable-next-line no-secrets/no-secrets
    const key = "HTKCUOISJYARGMZNBVFPXDLWQE";

    const encrypted = encryptSubstitution({ key, plaintext });

    expect(encrypted).toBe("SURRZFJGNRUFXTKJNSUV");
  });
});
