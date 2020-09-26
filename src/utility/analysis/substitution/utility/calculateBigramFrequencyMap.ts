import chunk from "lodash/chunk";
import countBy from "lodash/countBy";
import mapValues from "lodash/mapValues";

import { sortFrequencyMapInDecreasingFrequency } from "./sortFrequencyMapInDecreasingFrequency";

export function calculateBigramFrequencyMap(text: string) {
  const chunks = chunk(text, 2).map((x) => x.join(""));

  return sortFrequencyMapInDecreasingFrequency(
    mapValues(countBy(chunks), (x) => x / chunks.length)
  );
}
