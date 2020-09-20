import { assertIntegerNumber } from "../../../safety/assertions/number/assertIntegerNumber";
import { assertIsALetter } from "../../../safety/assertions/string/assertIsALetter";
import { fullModulo } from "../../math/modulo/fullModulo";
import { lastValidCipherOffset } from "../offsets/constants/lastValidCipherOffset";
import { letterFromCipherOffset } from "../offsets/letterFromCipherOffset";
import { letterToCipherOffset } from "../offsets/letterToCipherOffset";

export function shiftLetter(letter: string, offset: number) {
  assertIsALetter(letter);
  assertIntegerNumber(offset);

  const cipherOffset = letterToCipherOffset(letter);
  const newCipherOffset = fullModulo(
    cipherOffset + offset,
    lastValidCipherOffset
  );

  return letterFromCipherOffset(newCipherOffset);
}
