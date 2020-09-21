import { values } from "lodash";

import { sortDecreasingOrder } from "../../math/sorting/sortDecreasingOrder";
import { englishLetterFrequency } from "./englishLetterFrequency";

export const sortedEnglishLetterFrequency = sortDecreasingOrder(
  values(englishLetterFrequency)
);
