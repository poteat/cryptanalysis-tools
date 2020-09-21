import { isEqual, keys } from "lodash";

import { sortKeys } from "../../../../../test/utility/map/sorting/sortKeys";
import { englishAlphabet } from "../../../analysis/constants/englishAlphabet";
import { calculateLetterFrequency } from "../../../string/frequency/calculateLetterFrequency";

export function auditSubstitutionKey(key: string) {
  if (key.length !== englishAlphabet.length) {
    throw new Error(
      `Substitution key length must be equal to alphabet length. (i.e. ${englishAlphabet.length})`
    );
  }

  const frequencyCount = sortKeys(calculateLetterFrequency(key));

  if (!isEqual(keys(frequencyCount), englishAlphabet)) {
    throw new Error(
      "Mismatch between substitution key contents and English map."
    );
  }
}
