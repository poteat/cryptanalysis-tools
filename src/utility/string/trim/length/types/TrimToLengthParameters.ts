export type TrimToLengthParameters = {
  /**
   * The type to cast to string, and trim.
   */
  x: string | number | boolean;

  /**
   * The required resultant length of the string. Must be a non-negative
   * integer.
   */
  length: number;

  /**
   * An optional character to fill the remaining space with, if any exists.
   * Defaults to space.
   */
  filler?: string;
};
