import { asciiOffsetFromCharacter } from "../utility/asciiOffsetFromCharacter";

export const lastValidCipherOffset =
  asciiOffsetFromCharacter("Z") - asciiOffsetFromCharacter("A");
