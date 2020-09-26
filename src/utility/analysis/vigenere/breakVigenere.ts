import { minBy } from "lodash";

import { englishAlphabet } from "../../../constants/englishAlphabet";
import { englishLetterFrequency } from "../../../constants/englishLetterFrequency";
import { decryptVigenere } from "../../decryption/vigenere/decryptVigenere";
import { calculateMatchedFrequencyDifference } from "../../frequency/calculateMatchedFrequencyDifference";
import { constructGroupSets } from "../../map/grouping/constructGroupSets";
import { rotateMap } from "../../map/rotation/rotateMap";
import { sortKeys } from "../../map/sorting/sortKeys";
import { calculateLetterFrequency } from "../../string/frequency/calculateLetterFrequency";
import { letterToCipherOffset } from "../../string/offsets/letterToCipherOffset";
import { findVigenereKeyLength } from "./subassemblies/findVigenereKeyLength";

/**
 * Based on the assumption that the underlying plaintext is English, we perform
 * character frequency analysis to guess the key.
 *
 * Returns the cipher key.
 *
 * @param ciphertext Ciphertext to break.
 */
export function breakVigenere(ciphertext: string) {
  const keyLength = findVigenereKeyLength(ciphertext);

  /** For each group G, for each all members of which are encrypted under the
   * same cipher offset, we loop through to compute the frequency map.
   */

  /** Then, for each group's frequency map, we loop through each possible key
   * and compute the frequency map score based on English letter frequency.
   */

  const groups = constructGroupSets(ciphertext, keyLength);

  const frequencies = groups.map(calculateLetterFrequency);

  const crackedKeyLetter = frequencies.map((frequencyMap) => {
    const letterScores = englishAlphabet.map((c) => {
      const offset = letterToCipherOffset(c);

      const sortedFrequencyMap = sortKeys(frequencyMap);
      const rotatedFrequency = rotateMap(sortedFrequencyMap, offset);

      return {
        x: calculateMatchedFrequencyDifference(
          englishLetterFrequency,
          rotatedFrequency
        ),
        c,
      };
    });

    const bestLetterScore = minBy(letterScores, (x) => x.x)!;

    return bestLetterScore.c;
  });

  return crackedKeyLetter.join("");
}

if (require.main) {
  const ciphertext =
    // eslint-disable-next-line no-secrets/no-secrets
    "XKJUROWMLLPXWZNPIMBVBQJCNOWXPCCHHVVFVSLLFVXHAZITYXOHULXQOJAXELXZXMYJAQFSTSRULHHUCDSKBXKNJQIDALLPQSLLUHIAQFPBPCIDSVCIHWHWEWTHBTXRLJNRSNCIHUVFFUXVOUKJLJSWMAQFVJWJSDYLJOGJXDBOXAJULTUCPZMPLIWMLUBZXVOODYBAFDSKXGQFADSHXNXEHSARUOJAQFPFKNDHSAAFVULLUWTAQFRUPWJRSZXGPFUTJQIYNRXNYNTWMHCUKJFBIRZSMEHHSJSHYONDDZZNTZMPLILRWNMWMLVURYONTHUHABWNVW";

  const key = breakVigenere(ciphertext);

  const plaintext = decryptVigenere({ ciphertext, key });

  console.log(key);
  console.log(plaintext);
}
