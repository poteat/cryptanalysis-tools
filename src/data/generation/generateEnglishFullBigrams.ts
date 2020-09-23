import { readFile, writeFile } from "fs";
import { promisify } from "util";

import { calculateBigramFrequencyMap } from "../../utility/analysis/substitution/breakSubstitution";
import { sanitizePlaintext } from "../../utility/string/sanitize/sanitizePlaintext";

export async function generateEnglishFullBigrams() {
  const text = sanitizePlaintext(
    await promisify(readFile)("./src/data/text_fic.txt", "utf8")
  );

  const bigrams = calculateBigramFrequencyMap(text);

  await promisify(writeFile)(
    "./src/data/englishFullBigrams.json",
    JSON.stringify(bigrams, null, 2)
  );
}

if (require.main) {
  generateEnglishFullBigrams().catch((error) => {
    console.error(error);
  });
}
