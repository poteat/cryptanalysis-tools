export const gcd = (x: number, y: number): number =>
  ((s) => ((r) => (r ? gcd(s, r) : y))(x > y ? x : y % s))(x > y ? y : x);
