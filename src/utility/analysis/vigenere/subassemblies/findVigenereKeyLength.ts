import { minBy, times, values } from "lodash";

import { sortedEnglishLetterFrequency } from "../../../../constants/sortedEnglishLetterFrequency";
import { assertNotEmptyString } from "../../../../safety/assertions/string/assertNotEmptyString";
import { calculateAverage } from "../../../math/basic/calculateAverage";
import { calculateL2Difference } from "../../../math/norm/difference/calculateL2Difference";
import { sortDecreasingOrder } from "../../../math/sorting/sortDecreasingOrder";
import { calculateLetterFrequency } from "../../../string/frequency/calculateLetterFrequency";

/**
 * We find the length of the key associated with the Vigenere cipher, based on
 * finding the self-shift whereby the underlying frequency table matches closest
 * to the English letter frequency.
 *
 * There are various ways to do this, but we're going to go with a frequency
 * analysis method whereby we calculate the sorted frequency per N-group, for
 * all reasonable values of N.
 *
 * @param ciphertext Ciphertext to find key length of.
 */
export function findVigenereKeyLength(ciphertext: string) {
  assertNotEmptyString(ciphertext);

  const cipher = ciphertext.split("");

  const scoresForEachKeyLength = times(cipher.length, (k) => {
    const _k = k + 1;

    /** For each possible key length K, there are N groups such that each
     * letter in the group is encrypted with the same cipher key. (N = K) */

    /** We iterate through each of these groups and find the frequency table
     * for each encrypted letter. */

    const groupsToCheck = Math.floor(cipher.length / _k);

    const scoresForThisKeyLength = times(groupsToCheck, (n) => {
      const group: string[] = [];

      for (let i = n; i < cipher.length; i += _k) {
        group.push(cipher[i]);
      }

      const frequency = calculateLetterFrequency(group.join(""));

      /** To get around the fact that we don't know the letter mapping from
       * cipher text frequency to English frequency, we compute the likelihood
       * score by sorting each and taking the L2 metric. */

      /** For cases where there's not enough samples, we ignore the more later
       * elements (i.e. the more rare letters in English) */
      const sortedFrequencyValues = sortDecreasingOrder(values(frequency));

      return calculateL2Difference(
        sortedEnglishLetterFrequency,
        sortedFrequencyValues
      );
    });

    return calculateAverage(scoresForThisKeyLength);
  }).map((x, i) => ({ x, i }));

  const bestCase = minBy(scoresForEachKeyLength, (x) => x.x)!;

  return bestCase.i + 1;
}
