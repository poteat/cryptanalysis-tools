import { keys, mapKeys, mapValues } from "lodash";

export function sortKeys(record: Record<string, any>) {
  return mapValues(mapKeys(keys(record).sort()), (x) => record[x]);
}
