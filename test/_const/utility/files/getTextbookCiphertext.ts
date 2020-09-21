import { readFile } from "fs";
import { promisify } from "util";

import { sanitizePlaintext } from "../../../../src/utility/string/sanitize/sanitizePlaintext";
import { textbookCiphertextPath } from "./paths/textbookCiphertextPath";

let __textbookCiphertext: string | undefined;

export async function getTextbookCiphertext() {
  return (
    __textbookCiphertext ??
    (__textbookCiphertext = sanitizePlaintext(
      await promisify(readFile)(textbookCiphertextPath, "utf8")
    ))
  );
}
