import { readFile } from "fs";
import { promisify } from "util";

import { sanitizePlaintext } from "../../../../src/utility/string/sanitize/sanitizePlaintext";
import { examplePlaintextPath } from "./paths/examplePlaintextPath";

let __examplePlaintext: string | undefined;

export async function getExamplePlaintext() {
  return (
    __examplePlaintext ??
    (__examplePlaintext = sanitizePlaintext(
      await promisify(readFile)(examplePlaintextPath, "utf8")
    ))
  );
}
