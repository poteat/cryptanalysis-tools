import { max, sum, times } from "lodash";

import { assertNotEmptyString } from "../../../../safety/assertions/string/assertNotEmptyString";
import { shiftArray } from "../../../array/shiftArray";

/**
 * We find the length of the key associated with the Vigenere cipher, based on
 * finding the self-shift whereby the underlying frequency table matches closest
 * to the English letter frequency.
 *
 * There are various ways to do this, but we're going to take the dead-simple
 * approach: compare the ciphertext to the Nth shifted ciphertext, and pick out
 * how many characters are the same value at the same index. Whatever N this is
 * maximum for is our key length.
 *
 * A benefit of this approach is that it's language-agnostic. If there are
 * multiple modes, we default to the first one. A downside is that it's not
 * very reliable.
 *
 * We somewhat arbitrarily limit the key search size to the log of the input
 * length.
 *
 * @param ciphertext Ciphertext to find key length of.
 */

export function findVigenereKeyLength(ciphertext: string) {
  assertNotEmptyString(ciphertext);

  const cipher = ciphertext.split("");

  const keyLengthLimit = Math.floor(Math.log(ciphertext.length));

  const coincidences = times(keyLengthLimit, (n) => {
    const _n = n + 1;
    const shifted = shiftArray(cipher, _n).map((x) => x ?? " ");
    const croppedCipher = ciphertext.slice(0, shifted.length).split("");

    return sum(shifted.map((x, i) => x === croppedCipher[i]));
  });

  const maximal = max(coincidences);

  return coincidences.findIndex((x) => x === maximal) + 1;
}
