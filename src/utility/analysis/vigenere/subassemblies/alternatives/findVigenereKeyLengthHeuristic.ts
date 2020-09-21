import { max, sum, times } from "lodash";

import { assertNotEmptyString } from "../../../../../safety/assertions/string/assertNotEmptyString";
import { shiftArray } from "../../../../array/shiftArray";

/**
 * This heuristic calculates the number of letter coincidences for a given
 * shift. Although it's very fast to do, it doesn't always work in practice.
 *
 * @param ciphertext Ciphertext to find key length of.
 */
export function findVigenereKeyLengthFastHeuristic(ciphertext: string) {
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
