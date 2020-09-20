import { BasicDecryptionInput } from "../../types/decryption/BasicDecryptionInput";
import { copyToLength } from "../array/copyToLength";
import { letterToCipherOffset } from "../string/offsets/letterToCipherOffset";
import { unshiftLetter } from "../string/shifting/unshiftLetter";

export function decryptVigenere({ key, ciphertext }: BasicDecryptionInput) {
  return copyToLength(key, ciphertext.length)
    .split("")
    .map((k, i) => unshiftLetter(ciphertext[i], letterToCipherOffset(k)))
    .join("");
}
