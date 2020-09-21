import { keys } from "lodash";

import { calculateL2Norm } from "../math/norm/calculateL2Norm";

export function calculateMatchedFrequencyDifference(
  truth: Record<string, number>,
  b: Record<string, number>
) {
  const alphabet = keys(truth);

  return calculateL2Norm(alphabet.map((x) => truth[x] - (b[x] ?? 0)));
}
