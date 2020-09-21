import { invert } from "lodash";

import { constructSubstitutionMapFromKey } from "../../../encryption/substitution/utility/constructSubstitutionMapFromKey";

export function constructInverseSubstitutionMapFromKey(key: string) {
  return invert(constructSubstitutionMapFromKey(key));
}
