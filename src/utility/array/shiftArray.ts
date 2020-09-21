import { times } from "lodash";

import { assertNaturalNumber } from "../../safety/assertions/number/assertNaturalNumber";

/** Shifts an array right, by adding voids to the beginning. */
export function shiftArray<T>(array: T[], n: number) {
  assertNaturalNumber(n);
  const _a = [...array];

  const voids = times(n, () => {});

  if (n > array.length) {
    throw new Error("Cannot shift an array more than its length");
  } else if (n === array.length) {
    return voids;
  } else if (n === 0) {
    return _a;
  } else {
    return [...voids, ..._a.slice(0, _a.length - n)];
  }
}
