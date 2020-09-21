import { BasicEncryptionInput } from "../../../types/encryption/BasicEncryptionInput";
import { sanitizePlaintext } from "../../string/sanitize/sanitizePlaintext";
import { auditSubstitutionKey } from "./safety/auditSubstitutionKey";
import { constructSubstitutionMapFromKey } from "./utility/constructSubstitutionMapFromKey";

export function encryptSubstitution({ key, plaintext }: BasicEncryptionInput) {
  const _key = sanitizePlaintext(key);

  auditSubstitutionKey(_key);

  const subMap = constructSubstitutionMapFromKey(_key);

  return sanitizePlaintext(plaintext)
    .split("")
    .map((x) => subMap[x])
    .join("");
}
