import { assertNaturalNumber } from "../../safety/assertions/number/assertNaturalNumber";

/** Copies elements of v in round robin order, until the new vector is of
 * length n. */
export function copyToLength<T>(v: T[], n: number) {
  assertNaturalNumber(n);
  const _v = [...v];

  if (n < _v.length) {
    return _v.slice(0, n);
  } else if (n === _v.length) {
    return _v;
  } else {
    let i = 0;
    const l = _v.length;

    while (_v.length < n) {
      _v.push(_v[i]);
      i++;
      i %= l;
    }

    return _v;
  }
}
