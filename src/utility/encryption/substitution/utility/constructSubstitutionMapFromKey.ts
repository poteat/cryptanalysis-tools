import { mapKeys, mapValues, times } from "lodash";

import { englishAlphabet } from "../../../../constants/englishAlphabet";

export function constructSubstitutionMapFromKey(key: string) {
  return mapValues(
    mapKeys(
      times(englishAlphabet.length, (i) => ({ i, c: englishAlphabet[i] })),
      (x) => x.c
    ),
    (x) => key[x.i]
  );
}
