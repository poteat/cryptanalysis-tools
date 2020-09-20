import { assertNaturalNumber } from "../../safety/assertions/number/assertNaturalNumber";
import { StrictCopyToLengthType } from "./types/StrictCopyToLengthType";

/**
 * Copies elements of V in round-robin order until the resultant array is of the
 * given length n.
 *
 * If V is a string, does the same operation, returning a string. Short inputs
 * are equivalent to a slice.
 *
 * @param v Vector or string to be expanded.
 * @param n New length
 */
export const copyToLength = (<T>(v: T[] | string, n: number) => {
  assertNaturalNumber(n);
  let _v = typeof v === "string" ? v.split("") : [...v];

  if (n < _v.length) {
    _v = _v.slice(0, n);
  } else {
    let i = 0;
    const l = _v.length;

    while (_v.length < n) {
      _v.push(_v[i] as any);
      i++;
      i %= l;
    }
  }

  return typeof v === "string" ? _v.join("") : _v;
}) as StrictCopyToLengthType;
