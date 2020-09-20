import { isSafeInteger } from "lodash";

export function assertIntegerNumber(n: number) {
  if (!isSafeInteger(n)) {
    throw new Error(
      "Only integral numbers are supported, e.g. -1, 0, 1, 2, etc."
    );
  }
}
