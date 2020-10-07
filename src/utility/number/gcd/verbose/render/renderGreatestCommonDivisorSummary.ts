import mapValues from "lodash/mapValues";

import { trimAttributesToMaximumLength } from "../../../../string/trim/length/composite/trimAttributesToMaximumLength";
import { GreatestCommonDivisorHistoryElement } from "../types/GreatestCommonDivisorHistoryElement";

export function renderGreatestCommonDivisorSummary(
  history: GreatestCommonDivisorHistoryElement[]
) {
  const terms = trimAttributesToMaximumLength(
    history.map(({ max, min, remainder }, index) =>
      mapValues({
        index: index + 1,
        max,
        mul: `${min}(${Math.floor(max / min)})`,
        remainder,
      })
    )
  );

  terms.map((term) => {
    console.log(`${term.index}. ${term.max} = ${term.mul} + ${term.remainder}`);
  });
}
