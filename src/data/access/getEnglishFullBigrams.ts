import { readFile } from "fs";
import { promisify } from "util";

let __englishFullBigrams: Record<string, number> | undefined;

export async function getEnglishFullBigrams() {
  if (__englishFullBigrams) {
    return __englishFullBigrams;
  }

  __englishFullBigrams = JSON.parse(
    await promisify(readFile)("./src/data/englishFullBigrams.json", "utf8")
  );

  return __englishFullBigrams!;
}
