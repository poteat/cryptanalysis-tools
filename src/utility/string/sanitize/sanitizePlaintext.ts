import { toUpper } from "lodash";

/**
 * Remove any non A-Z letter, and only accept uppercase
 *
 * @param s Plaintext to sanitize
 */
export function sanitizePlaintext(s: string) {
  return toUpper(s.replace(/[^A-Za-z]/gm, ""));
}
