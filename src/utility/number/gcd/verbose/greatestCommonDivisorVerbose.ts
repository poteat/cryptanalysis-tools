import { _log } from "../../../debug/_log";
import { renderGreatestCommonDivisorSummary } from "./render/renderGreatestCommonDivisorSummary";
import { GreatestCommonDivisorHistoryElement } from "./types/GreatestCommonDivisorHistoryElement";

export function greatestCommonDivisorVerbose(
  x: number,
  y: number,
  quiet = false,
  i = 0,
  _history: GreatestCommonDivisorHistoryElement[] = []
): { gcd: number; history: typeof _history } {
  const max = Math.max(x, y);
  const min = Math.min(x, y);

  if (!quiet) {
    console.log(
      `${++i}. To calculate the GCD between ${x} and ${y}, we first determine that the larger number between the two is ${max}, while the smaller number is ${min}.`
    );
  }

  const remainder = max % min;

  const history = [..._history, { max, min, remainder }];

  if (!quiet) {
    console.log(`${++i}. We then find (${max} mod ${min}) to be ${remainder}.`);
  }

  if (remainder === 0) {
    if (!quiet) {
      console.log(
        `${++i}. Since ${min} divides perfectly into ${max}, the GCD of ${x} and ${y} is trivially ${y}.`
      );
    }

    return { gcd: y, history };
  } else {
    if (!quiet) {
      console.log(
        `${++i}. Since the remainder is non-zero, we return the greatest common divisor between ${min} and ${remainder}.`
      );
    }

    return greatestCommonDivisorVerbose(min, remainder, quiet, i, history);
  }
}

if (module.parent === null) {
  const result = greatestCommonDivisorVerbose(4883, 4369, false);

  renderGreatestCommonDivisorSummary(result.history);
}
