import { assertIntegerNumber } from "../../../safety/assertions/number/assertIntegerNumber";
import { assertIsALetter } from "../../../safety/assertions/string/assertIsALetter";
import { lastValidCipherOffset } from "../offsets/constants/lastValidCipherOffset";
import { letterFromCipherOffset } from "../offsets/letterFromCipherOffset";
import { letterToCipherOffset } from "../offsets/letterToCipherOffset";

export function shiftLetter(letter: string, offset: number) {
  assertIsALetter(letter);
  assertIntegerNumber(offset);

  const cipherOffset = letterToCipherOffset(letter);
  const newCipherOffset = (cipherOffset + offset) % lastValidCipherOffset;
  return letterFromCipherOffset(newCipherOffset);
}
