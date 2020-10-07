import head from "lodash/head";
import keys from "lodash/keys";
import mapKeys from "lodash/mapKeys";
import mapValues from "lodash/mapValues";
import max from "lodash/max";

export function getMaximumLengthPerAttribute<
  T extends Record<string, string | number | boolean>[]
>(elements: T) {
  if (elements.length === 0) {
    throw new TypeError("Cannot fold maximum out of zero-length array.");
  }

  return mapValues(
    mapKeys(keys(head(elements))),
    (key) => max(elements.map((x) => `${x[key]}`.length))!
  );
}
