import { asciiOffsetFromCharacter } from "./utility/asciiOffsetFromCharacter";

/**
 * Given an integer representing a cipher offset, convert that offset into the
 * corresponding A-Z letter.
 *
 * @param cipherOffset Integer number representing text.
 */

export function letterFromCipherOffset(cipherOffset: number) {
  const baseNumber = asciiOffsetFromCharacter("A");
  const asciiOffset = cipherOffset + baseNumber;

  return String.fromCharCode(asciiOffset);
}
