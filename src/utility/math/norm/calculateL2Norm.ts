import { sum } from "lodash";

export function calculateL2Norm(x: number[]) {
  return Math.sqrt(sum(x.map((x) => x ** 2)));
}
