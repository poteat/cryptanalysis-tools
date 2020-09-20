/** Explicitly type copy function to enable overloading type inference */
export type StrictCopyToLengthType = (<T>(v: T[], n: number) => T[]) &
  ((v: string, n: number) => string);
