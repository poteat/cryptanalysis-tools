import map from "lodash/map";
import mapKeys from "lodash/mapKeys";
import mapValues from "lodash/mapValues";
import reverse from "lodash/reverse";
import sortBy from "lodash/sortBy";

export function sortFrequencyMapInDecreasingFrequency(
  frequencyMap: Record<string, number>
) {
  return mapValues(
    mapKeys(
      reverse(
        sortBy(
          map(frequencyMap, (x, i) => ({ x, i })),
          (x) => x.x
        )
      ),
      (x) => x.i
    ),
    (x) => x.x
  );
}
