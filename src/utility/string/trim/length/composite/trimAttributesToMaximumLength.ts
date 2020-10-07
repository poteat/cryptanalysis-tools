import mapValues from "lodash/mapValues";

import { getMaximumLengthPerAttribute } from "../../../../map/length/getMaximumLengthPerAttribute";
import { trimToLength } from "../trimToLength";

/**
 * Given an array of homogeneously typed simple objects, convert all attribute
 * values to strings associated with the maximum length between all values
 * associated with that key.
 *
 * Essentially, this function adds spaces such that each attribute has one
 * specific length that is shared amongst all elements.
 *
 * @param elements Elements to normalize the attribute lengths of.
 */

export function trimAttributesToMaximumLength<
  T extends Record<string, string | number | boolean>[]
>(elements: T) {
  const lengths = getMaximumLengthPerAttribute(elements);

  return elements.map((element) =>
    mapValues(element, (x, key) =>
      trimToLength({ x, length: { ...lengths }[key] })
    )
  );
}
