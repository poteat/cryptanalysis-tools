import { isSafeInteger } from "lodash";

export function assertPositiveIntegerNumber(n: number) {
  if (!(isSafeInteger(n) && n >= 1)) {
    throw new Error("Only positive integers are supported, e.g. 1, 2, 3 etc.");
  }
}
