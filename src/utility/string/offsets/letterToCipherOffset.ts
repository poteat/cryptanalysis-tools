import toUpper from "lodash/toUpper";

import { assertIsALetter } from "../../../safety/assertions/string/assertIsALetter";
import { lastValidCipherOffset } from "./constants/lastValidCipherOffset";
import { asciiOffsetFromCharacter } from "./utility/asciiOffsetFromCharacter";

/**
 * For letters A-Z or a-z, converts the letter into a number between zero and 25
 * inclusive, corresponding to 'A' and 'Z' respectively.
 *
 * Does not support non-alphabetical characters.
 *
 * @param letter Letter to convert to a number.
 */
export function letterToCipherOffset(letter: string) {
  assertIsALetter(letter);

  const baseNumber = asciiOffsetFromCharacter("A");
  const asciiCode = asciiOffsetFromCharacter(toUpper(letter));

  const offset = asciiCode - baseNumber;

  if (offset > lastValidCipherOffset || offset < 0) {
    throw new Error(`Non A-Z letters are not supported: "${letter}"`);
  }

  return offset;
}
