import { times } from "lodash";

import { calculateL2Norm } from "../calculateL2Norm";

export function calculateL2Difference(a: number[], b: number[]) {
  const minLength = Math.min(a.length, b.length);

  if (minLength === 0) {
    throw new Error("Cannot calculate L2 norm: indeterminate matrix.");
  }

  return calculateL2Norm(times(minLength, (i) => a[i] - b[i]));
}
