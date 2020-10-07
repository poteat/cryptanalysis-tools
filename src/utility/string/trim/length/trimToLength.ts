import isSafeInteger from "lodash/isSafeInteger";
import repeat from "lodash/repeat";

import { TrimToLengthParameters } from "./types/TrimToLengthParameters";

/**
 * Trim string or number to a given length, adding spaces if necessary. If the
 * input is a number, converts it to a string.
 *
 * In the case of requested length zero, returns an empty string.
 */
export function trimToLength({ x, length, filler }: TrimToLengthParameters) {
  if (!isSafeInteger(length)) {
    throw new TypeError("Integer length expected.");
  }

  if (length < 0) {
    throw new TypeError("Integer length cannot be negative.");
  }

  if (filler && filler.length !== 1) {
    throw new TypeError("Filler string must be 1 character long.");
  }

  return length > `${x}`.length
    ? `${x}${repeat(filler ?? " ", length - `${x}`.length)}`
    : `${x}`.slice(0, length);
}
