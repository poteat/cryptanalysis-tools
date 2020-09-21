import { countBy, mapValues } from "lodash";

export function calculateLetterFrequency(text: string) {
  return mapValues(countBy(text), (x) => x / text.length);
}
