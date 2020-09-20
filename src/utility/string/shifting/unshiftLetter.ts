import { shiftLetter } from "./shiftLetter";

export function unshiftLetter(letter: string, offset: number) {
  return shiftLetter(letter, -offset);
}
