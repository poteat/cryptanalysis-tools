import { isSafeInteger } from "lodash";

export function assertNaturalNumber(n: number) {
  if (!(isSafeInteger(n) && n >= 0)) {
    throw new Error("Only natural numbers are supported, e.g. 0, 1, 2, etc.");
  }
}
