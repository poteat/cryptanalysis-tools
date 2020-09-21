import { BasicEncryptionInput } from "../../../types/encryption/BasicEncryptionInput";
import { copyToLength } from "../../array/copyToLength";
import { letterToCipherOffset } from "../../string/offsets/letterToCipherOffset";
import { shiftLetter } from "../../string/shifting/shiftLetter";

export function encryptVigenere({ key, plaintext }: BasicEncryptionInput) {
  return copyToLength(key, plaintext.length)
    .split("")
    .map((k, i) => shiftLetter(plaintext[i], letterToCipherOffset(k)))
    .join("");
}
