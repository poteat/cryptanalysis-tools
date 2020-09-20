import { assertNaturalNumber } from "../../../safety/assertions/number/assertNaturalNumber";

/** Performs modulo operation, guaranteeing result will be a positive number. */
export function fullModulo(operand: number, offset: number) {
  assertNaturalNumber(offset);

  const initial = operand % offset;

  if (initial < 0) {
    const numToMultiply = -Math.floor(initial / offset);
    return initial + numToMultiply * offset;
  } else {
    return initial;
  }
}
