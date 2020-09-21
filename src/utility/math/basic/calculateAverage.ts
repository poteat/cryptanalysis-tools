import { sum } from "lodash";

export function calculateAverage(x: number[]) {
  return sum(x) / x.length;
}
