export function assertNotEmptyString(s: string) {
  if (s.length === 0) {
    throw new Error("Passed empty string into function.");
  }
}
