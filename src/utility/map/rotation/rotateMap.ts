import { isEmpty, keys, mapValues } from "lodash";

import { assertIntegerNumber } from "../../../safety/assertions/number/assertIntegerNumber";
import { fullModulo } from "../../math/modulo/fullModulo";

/**
 * Rotate the values of the given map by N elements.
 *
 * @param record Map to rotate
 * @param n Number of indices to rotate on.
 */

export function rotateMap<T>(record: Record<string, T>, n: number) {
  assertIntegerNumber(n);

  if (isEmpty(record)) {
    return {};
  }

  if (n === 0) {
    return { ...record };
  }

  const recordKeys = keys(record);
  let i = 0;

  return mapValues(
    record,
    () => record[recordKeys[fullModulo(i++ + n, recordKeys.length)]]
  );
}
