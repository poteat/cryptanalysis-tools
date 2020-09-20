import { assertNotEmptyString } from "./assertNotEmptyString";

export function assertIsALetter(s: string) {
  assertNotEmptyString(s);

  if (s.length > 1) {
    throw new Error(
      "String is longer than length one, where a letter was expected."
    );
  }
}
