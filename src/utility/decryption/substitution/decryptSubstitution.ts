import { BasicDecryptionInput } from "../../../types/decryption/BasicDecryptionInput";
import { constructInverseSubstitutionMapFromKey } from "./utility/constructInverseSubstitutionMapFromKey";

export function decryptSubstitution({ key, ciphertext }: BasicDecryptionInput) {
  const invertedReplacementMap = constructInverseSubstitutionMapFromKey(key);

  return ciphertext
    .split("")
    .map((x) => invertedReplacementMap[x])
    .join("");
}
