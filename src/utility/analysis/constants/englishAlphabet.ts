import { keys } from "lodash";

import { englishLetterFrequency } from "./englishLetterFrequency";

export const englishAlphabet = keys(englishLetterFrequency);
