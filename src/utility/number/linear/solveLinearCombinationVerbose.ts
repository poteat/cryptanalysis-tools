import { repeat } from "lodash";

import { greatestCommonDivisorVerbose } from "../gcd/verbose/greatestCommonDivisorVerbose";
import { renderGreatestCommonDivisorSummary } from "../gcd/verbose/render/renderGreatestCommonDivisorSummary";
import { GreatestCommonDivisorHistoryElement } from "../gcd/verbose/types/GreatestCommonDivisorHistoryElement";

/**
 * Given a history pair from a GCD calculation, return the linear combination
 * such that the two maximal numbers combine to form `n`.
 *
 * Return A, B such that "x1 * A + x2 * B = n"
 *
 * @param historyPair Last two elements of a GCD calculation (ecl. mod zero)
 * @param n Number to combine to.
 */
export function performFirstLinearCombinationPatternVerbose(
  historyPair: GreatestCommonDivisorHistoryElement[],
  n: number
) {
  const x1 = historyPair[1].max;
  const x2 = historyPair[0].max;

  const y1 = historyPair[1].min;
  const y2 = historyPair[0].min;

  const m1 = Math.floor(x1 / y1);
  const m2 = Math.floor(x2 / y2);

  console.log();
  console.log(
    `We perform the following algebra to solve for ${x1}x + ${x2}y = ${n}:`
  );

  const spacesOfN = repeat(" ", `${n}`.length);

  console.log(`${n} = ${x1} + ${y1}(${-m1})`);
  console.log(`${spacesOfN} = ${x1} + [${x2} + ${x1}(${m2})](${-m2})`);
  console.log(`${spacesOfN} = ${x2}(${-m2 + 1}) + ${x1}(${m1 * m2 + 1})`);

  console.log(
    `We have determined that this first solution is x = ${-m2 + 1} and y = ${
      m1 * m2 + 1
    }.`
  );

  return {
    x1,
    x2,
    A: m1 * m2 + 1,
    B: -m2 + 1,
  };
}

/**
 * Find integers a and b, such that a*x + b*y = n.
 *
 * Uses the extended Euclidean algorithm.
 *
 * @param x First multiplicator
 * @param y Second multiplicator
 * @param n Expected resulting number
 */
export function solveLinearCombinationVerbose(x: number, y: number, n: number) {
  console.log(`We first solve for the GCD of ${x} and ${y}.`);

  const gcdResult = greatestCommonDivisorVerbose(x, y, true);

  console.log("The steps can be summarized via the following equations:\n");

  renderGreatestCommonDivisorSummary(gcdResult.history);

  const numberOfGCDSteps = gcdResult.history.length;

  console.log(
    `\nWe start on line ${numberOfGCDSteps - 2} and ${
      numberOfGCDSteps - 1
    }, working our way upwards:`
  );

  let i = numberOfGCDSteps - 3;

  const historyPair = gcdResult.history.slice(i, i + 2);

  let linearCombo = performFirstLinearCombinationPatternVerbose(historyPair, n);

  if (numberOfGCDSteps === 3) {
    console.log("Which suffices.");

    const solution = {
      A: linearCombo.B,
      B: linearCombo.A,
    };

    const validate = x * solution.A + y * solution.B;

    if (validate !== n) {
      throw new Error(
        `Linear combination solution is wrong, got ${validate} expected ${n}.`
      );
    }

    return solution;
  } else {
    i--;

    do {
      console.log(linearCombo);

      const newLine = gcdResult.history[i + 1];
      const mul = Math.floor(newLine.max / newLine.min);

      const newMax = gcdResult.history[i].max;
      const newMul = Math.floor(
        gcdResult.history[i].max / gcdResult.history[i].min
      );

      console.log();
      console.log(
        `Next, we use line ${i + 1} to solve for ${
          newLine.max
        }x + ${newMax}y = ${n}:`
      );

      console.log(
        `${n} = ${linearCombo.x2}(${linearCombo.B}) + ${linearCombo.x1}(${linearCombo.A})`
      );

      console.log(
        `${n} = ${linearCombo.x2}(${linearCombo.B}) + [${newMax} + ${
          newLine.max
        }(${-newMul})](${linearCombo.A})`
      );

      console.log(
        `${n} = ${linearCombo.x2}(${
          linearCombo.B + linearCombo.A * -newMul
        }) + ${newMax}(${linearCombo.A})`
      );

      linearCombo = {
        x1: linearCombo.x2,
        x2: newMax,
        A: linearCombo.B + linearCombo.A * -newMul,
        B: linearCombo.A,
      };

      i--;
    } while (i >= 0);

    const solution = {
      A: linearCombo.B,
      B: linearCombo.A,
    };

    console.log();
    console.log(
      `And thus we have found the solution ${x}(${solution.A}) + ${y}(${solution.B}) = ${n}.`
    );

    const validate = x * solution.A + y * solution.B;

    if (validate !== n) {
      throw new Error(
        `Linear combination solution is wrong, got ${validate} expected ${n}.`
      );
    }

    return solution;
  }
}

if (module.parent === null) {
  solveLinearCombinationVerbose(17, 101, 1);
}
