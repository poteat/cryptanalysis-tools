import { times } from "lodash";

import { assertPositiveIntegerNumber } from "../../../safety/assertions/number/assertPositiveIntegerNumber";

/** For a given string e.g. ABCDEFGHI, and n = 3, give ADG, BEH, etc.*/
export function constructGroupSets(x: string, n: number) {
  assertPositiveIntegerNumber(n);

  return times(n, (g) => {
    const group: string[] = [];
    for (let i = g; i < x.length; i += n) {
      group.push(x[i]);
    }
    return group.join("");
  });
}
