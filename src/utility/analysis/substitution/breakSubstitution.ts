import {
  chunk,
  countBy,
  every,
  filter,
  first,
  forEach,
  invert,
  isEmpty,
  keys,
  map,
  mapKeys,
  mapValues,
  min,
  omitBy,
  pickBy,
  reverse,
  sortBy,
  sum,
  times,
  toUpper,
  values,
} from "lodash";

import { englishBigramFrequency } from "../../../constants/bigrams/englishBigramFrequency";
import { englishAlphabet } from "../../../constants/englishAlphabet";
import { englishLetterFrequency } from "../../../constants/englishLetterFrequency";
import { getEnglishFullBigrams } from "../../../data/access/getEnglishFullBigrams";
import { assertIsALetter } from "../../../safety/assertions/string/assertIsALetter";
import { sortKeys } from "../../map/sorting/sortKeys";
import { calculateLetterFrequency } from "../../string/frequency/calculateLetterFrequency";
import { letterFromCipherOffset } from "../../string/offsets/letterFromCipherOffset";
import { letterToCipherOffset } from "../../string/offsets/letterToCipherOffset";

export function getEnglishBigramFrequencies() {
  return sortFrequencyMapInDecreasingFrequency(
    mapValues(
      mapKeys(englishBigramFrequency, (_x, k) => toUpper(k)),
      (x) => x / 100
    )
  );
}

export function getCombinedEnglishFrequencyMap() {
  return sortFrequencyMapInDecreasingFrequency({
    ...getEnglishBigramFrequencies(),
    ...englishLetterFrequency,
  });
}

export function sortFrequencyMapInDecreasingFrequency(
  frequencyMap: Record<string, number>
) {
  return mapValues(
    mapKeys(
      reverse(
        sortBy(
          map(frequencyMap, (x, i) => ({ x, i })),
          (x) => x.x
        )
      ),
      (x) => x.i
    ),
    (x) => x.x
  );
}

export function calculateBigramFrequencyMap(text: string) {
  const chunks = chunk(text, 2).map((x) => x.join(""));

  return sortFrequencyMapInDecreasingFrequency(
    mapValues(countBy(chunks), (x) => x / chunks.length)
  );
}

export function inferReplacementMapFromFrequencyMap(
  frequencyMap: Record<string, number>
) {
  const sortedFrequencyMap = sortFrequencyMapInDecreasingFrequency(
    frequencyMap
  );

  const frequencySortedEnglishLetters = keys(
    sortFrequencyMapInDecreasingFrequency(englishLetterFrequency)
  );

  const fullMap = getCombinedEnglishFrequencyMap();

  console.log(fullMap);

  let i = 0;
  return sortKeys(
    invert(
      mapValues(sortedFrequencyMap, () => frequencySortedEnglishLetters[i++])
    )
  );
}

export function constructInitialCipherProbabilityMatrix() {
  const initialProbability = 1 / englishAlphabet.length;
  return times(englishAlphabet.length, () =>
    times(englishAlphabet.length, () => initialProbability)
  );
}

export function padSpacesLeft(s: string, length: number) {
  const neededSpaces = length - s.length;

  if (neededSpaces > 0) {
    const spaces = times(neededSpaces, () => " ").join("");
    return `${spaces}${s}`;
  } else {
    return s;
  }
}

export function renderCipherProbabilityMatrix(matrix: number[][]) {
  let s = "";
  s += `${englishAlphabet.map((x) => `   ${x}`).join("")}`;

  times(englishAlphabet.length, (i) => {
    const currentLetter = englishAlphabet[i];
    s += `\n${currentLetter} ${matrix[i]
      .map((x) => padSpacesLeft((x * 100).toFixed(0), 3))
      .join(" ")}`;
  });

  console.log(s);
}

export function normalizeValues(record: Record<string, number>) {
  const total = sum(values(record));

  return mapValues(record, (x) => x / total);
}

export function constructCorrespondenceProbabilityMap(
  frequencyMap: Record<string, number>,
  letter: string
) {
  assertIsALetter(letter);

  return normalizeValues(
    mapValues(
      englishLetterFrequency,
      (f) => 1 / Math.abs(f - frequencyMap[letter])
    )
  );
}

export function normalizeArray(array: number[]) {
  const total = sum(array);
  return array.map((x) => x / total);
}

export function updateProbabilityMatrixGivenFrequencyMap(
  frequencyMap: Record<string, number>,
  probabilityMatrix: number[][]
) {
  return probabilityMatrix.map((row, i) => {
    const letter = englishAlphabet[i];

    const correspondenceProbability = values(
      constructCorrespondenceProbabilityMap(frequencyMap, letter)
    );

    return normalizeArray(
      row.map((p, i) => {
        return (
          (p +
            correspondenceProbability[i] /
              (englishLetterFrequency as Record<string, number>)[letter]) /
          2
        );
      })
    );
  });
}

export const substitutionBreakProbabilityCullingValue = 0.05;

export function extractCandidatesFromProbabilityMap(
  probabilityMap: number[][],
  fromLetter: string
) {
  assertIsALetter(fromLetter);

  const offset = letterToCipherOffset(fromLetter);
  return filter(
    probabilityMap[offset].map((x, i) => ({ x, i })),
    (x) => x.x >= substitutionBreakProbabilityCullingValue
  ).map((x) => letterFromCipherOffset(x.i));
}

export function constructBigramMatches(
  bigramFrequencyMap: Record<string, number>,
  probabilityMatrix: number[][]
) {
  const englishBigramFrequencies = getEnglishBigramFrequencies();

  const candidatesPerLetter = constructMappingCandidatesBasedOnProbabilityMatrix(
    probabilityMatrix
  );

  console.log(candidatesPerLetter);

  return pickBy(
    mapValues(
      mapValues(
        mapValues(bigramFrequencyMap, (_x, currentBigram) => ({
          prior: _x,
          matches: keys(englishBigramFrequencies).filter((x) =>
            every(x.split(""), (letterInEnglishBigram, i) =>
              candidatesPerLetter[currentBigram.split("")[i]].includes(
                letterInEnglishBigram
              )
            )
          ),
        })),
        (entry) =>
          entry.matches.map((potentialMatch) => ({
            match: potentialMatch,
            score:
              1 /
              Math.abs(entry.prior - englishBigramFrequencies[potentialMatch]),
          }))
      ),
      (entry) => {
        const total = sum(entry.map((x) => x.score));
        return entry.map((x) => ({ ...x, score: x.score / total }));
      }
    ),
    (x) => !isEmpty(x)
  );
}

export function constructMappingCandidatesBasedOnProbabilityMatrix(
  probabilityMatrix: number[][]
) {
  return mapValues(englishLetterFrequency, (_x, k) =>
    extractCandidatesFromProbabilityMap(probabilityMatrix, k)
  ) as Record<string, string[]>;
}

export function performBigramProbabilityMatrixUpdates(
  probabilityMatrix: number[][],
  bigramPotentialMatches: Record<string, { score: number; match: string }[]>,
  bigramFrequencyMap: Record<string, number>
) {
  forEach(bigramPotentialMatches, (matches, bigram) => {
    const bigramBaseProbability = bigramFrequencyMap[bigram];

    matches.forEach((matchEntry) => {
      bigram.split("").forEach((bigramSourceLetter, i) => {
        const sourceOffset = letterToCipherOffset(bigramSourceLetter);
        const resultantLetter = matchEntry.match[i];
        const resultOffset = letterToCipherOffset(resultantLetter);

        const score = matchEntry.score;

        probabilityMatrix[sourceOffset][resultOffset] =
          (probabilityMatrix[sourceOffset][resultOffset] +
            bigramBaseProbability * score) /
          (1 + bigramBaseProbability);
      });
    });
  });
}

export function constructMappedProbabilityMatrix(
  probabilityMatrix: number[][]
) {
  return mapValues(
    mapKeys(probabilityMatrix, (x, i) => englishAlphabet[i]),
    (x) => mapKeys(x, (x, i) => englishAlphabet[i])
  );
}

export type MappedProbabilityMatrix = Record<string, Record<string, number>>;

export function renderMappedProbabilityMatrix(
  mappedProbabilityMatrix: MappedProbabilityMatrix
) {
  const firstRow = first(values(mappedProbabilityMatrix));

  if (!firstRow) {
    throw new Error("Cannot render dims zero matrix.");
  }

  let s = "";
  s += `${keys(firstRow)
    .map((x) => `   ${x}`)
    .join("")}`;

  forEach(mappedProbabilityMatrix, (x, i) => {
    s += `\n${i} ${map(x, (x) => padSpacesLeft((x * 100).toFixed(0), 3)).join(
      " "
    )}`;
  });

  console.log(s);
}

export type CipherConnection = { from: string; to: string };

export function reduceProbabilityMapBasedOnConnections(
  mappedProbabilityMatrix: MappedProbabilityMatrix,
  connections: CipherConnection[]
) {
  return mapValues(
    omitBy(
      mapValues(mappedProbabilityMatrix, (x) =>
        omitBy(x, (_x, i) => connections.find((x) => x.to === i))
      ),
      (_x, i) => connections.find((x) => x.from === i)
    ),
    (x) => normalizeValues(x)
  );
}

export function performProbabilityMapRowDeductions(
  mappedProbabilityMatrix: MappedProbabilityMatrix
) {
  const deducedConnections: { from: string; to: string }[] = [];

  // For each row, identify elements that have one element at above 50% prob.
  forEach(mappedProbabilityMatrix, (row, fromKey) => {
    const largeElements = pickBy(row, (x) => x > 0.5);

    if (keys(largeElements).length === 1) {
      deducedConnections.push({
        from: fromKey,
        to: first(keys(largeElements))!,
      });
    }
  });

  const reducedProbabilityMap = reduceProbabilityMapBasedOnConnections(
    mappedProbabilityMatrix,
    deducedConnections
  );

  return { reducedProbabilityMap, deducedConnections };
}

export function performProbabilityMapColumnarDeductions(
  mappedProbabilityMatrix: MappedProbabilityMatrix
) {
  const deducedConnections: { from: string; to: string }[] = [];

  forEach(keys(first(values(mappedProbabilityMatrix))), (columnCharacter) => {
    const column = mapValues(
      mappedProbabilityMatrix,
      (x) => x[columnCharacter]
    );

    const largeElements = pickBy(column, (x) => x >= 0.1);

    if (keys(largeElements).length === 1) {
      deducedConnections.push({
        from: first(keys(largeElements))!,
        to: columnCharacter,
      });
    }
  });

  const reducedProbabilityMap = reduceProbabilityMapBasedOnConnections(
    mappedProbabilityMatrix,
    deducedConnections
  );

  console.log(deducedConnections);

  return { reducedProbabilityMap, deducedConnections };
}

export function performAllPossibleProbabilityMapDeductions(
  mappedProbabilityMatrix: MappedProbabilityMatrix
) {
  const deductions: CipherConnection[] = [];

  let matrix = mappedProbabilityMatrix;
  let prevLength: number;

  do {
    prevLength = deductions.length;
    const rowResults = performProbabilityMapRowDeductions(matrix);
    matrix = rowResults.reducedProbabilityMap;
    deductions.push(...rowResults.deducedConnections);

    const colResults = performProbabilityMapColumnarDeductions(matrix);
    matrix = colResults.reducedProbabilityMap;
    deductions.push(...colResults.deducedConnections);
  } while (deductions.length > prevLength);

  return { reducedProbabilityMap: matrix, connections: deductions };
}

export function generateCipherKeyFromConnections(
  connections: CipherConnection[]
) {
  return englishAlphabet
    .map((x) => connections.find((y) => y.to === x)?.from ?? "*")
    .join("");
}

/**
 * Given a ciphertext, return the key for the corresponding substitution cipher.
 * We assume an English corpus plaintext in order to perform a frequency
 * analysis attack.
 *
 * Our initial approach is to compute the frequency analysis of the ciphertext,
 * and use that for a first-pass approximation of the key.
 *
 * However, that generally speaking isn't enough. We need to go a step further
 * and construct the _diagram_ frequency.
 *
 * @param ciphertext
 */
export function breakSubstitution(ciphertext: string) {
  const frequencyMap = sortFrequencyMapInDecreasingFrequency(
    calculateLetterFrequency(ciphertext)
  );

  console.log(frequencyMap);

  /** In general, we have a probability matrix corresponding to which ciphertext
   * letters correspond to which plaintext letters.
   */
  let probabilityMatrix = constructInitialCipherProbabilityMatrix();

  /**
   * The initial question is: Given the observed frequency map, and given the
   * frequency for the English language, what's the probability that a given
   * letter corresponds to some other letter?
   */
  probabilityMatrix = updateProbabilityMatrixGivenFrequencyMap(
    frequencyMap,
    probabilityMatrix
  );

  renderCipherProbabilityMatrix(probabilityMatrix);

  const bigramFrequencyMap = calculateBigramFrequencyMap(ciphertext);

  const bigramPotentialMatches = constructBigramMatches(
    bigramFrequencyMap,
    probabilityMatrix
  );

  /** We additionally update the probability matrix according to the bigram
   * observations.
   */
  // performBigramProbabilityMatrixUpdates(
  //   probabilityMatrix,
  //   bigramPotentialMatches,
  //   bigramFrequencyMap
  // );

  console.log(getEnglishBigramFrequencies());

  console.log(bigramFrequencyMap);

  renderCipherProbabilityMatrix(probabilityMatrix);

  // englishAlphabet.forEach((_letter, i) => {
  //   const column = probabilityMatrix.map((x) => x[i]).map((x, i) => ({ x, i }));

  //   const largeElements = column.filter((x) => x.x > 0.1);

  //   if (largeElements.length === 1) {
  //     const element = first(largeElements)!.i;

  //     probabilityMatrix[element][i] = 1;
  //   }
  // });

  const mappedProbabilityMatrix = constructMappedProbabilityMatrix(
    probabilityMatrix
  );

  const {
    reducedProbabilityMap,
    connections,
  } = performAllPossibleProbabilityMapDeductions(mappedProbabilityMatrix);

  renderMappedProbabilityMatrix(reducedProbabilityMap);

  console.log(connections);

  const key = generateCipherKeyFromConnections(connections);

  console.log(key);

  // S => H
  // U => E
  // P => T

  // renderCipherProbabilityMatrix(probabilityMatrix);

  // console.log(frequencyMap);

  // console.log(bigramFrequencyMap);

  // const replacementMap = inferReplacementMapFromFrequencyMap(frequencyMap);

  // return values(replacementMap).join("");
}

export type FrequencyMap = Record<string, number>;

export function getLetterFrequencySetsFromBigram(
  bigram: FrequencyMap,
  letter: string
) {
  // Find all bigrams which end with letter
  const prefixBigrams = mapKeys(
    normalizeValues(pickBy(bigram, (_x, key) => key[1] === letter)),
    (_x, key) => key[0]
  );

  // All bigrams which start with the given letter
  const postfixBigrams = mapKeys(
    normalizeValues(pickBy(bigram, (_x, key) => key[0] === letter)),
    (_x, key) => key[1]
  );

  return { prefixBigrams, postfixBigrams };
}

export function calculateBigramDifferenceScore(
  cipherBigram: FrequencyMap,
  englishBigram: FrequencyMap
) {
  if (values(cipherBigram).length === 0) {
    return Infinity;
  }

  return Math.sqrt(
    sum(
      map(cipherBigram, (x) => {
        const smallestFrequencyDifference = min(
          map(englishBigram, (y) => Math.abs(x - y))
        )!;

        return smallestFrequencyDifference ** 2;
      })
    )
  );
}

export type BigramSet = {
  prefixBigrams: FrequencyMap;
  postfixBigrams: FrequencyMap;
};

export function calculateBigramSetDifferenceScore(
  cipherSet: BigramSet,
  englishSet: BigramSet
) {
  const prefixScore = calculateBigramDifferenceScore(
    cipherSet.prefixBigrams,
    englishSet.prefixBigrams
  );

  const postfixScore = calculateBigramDifferenceScore(
    cipherSet.postfixBigrams,
    englishSet.postfixBigrams
  );

  return (prefixScore + postfixScore) / 2;
}

if (require.main) {
  const cipher =
    // eslint-disable-next-line no-secrets/no-secrets
    "BNWVWBAYBNVBSQWVUOHWDIZWRBBNPBPOOUWRPAWXAWPBWZWMYPOBNPBBNWJPAWWRZSLWZQJBNVIAXAWPBSALIBNXWABPIRYRPOIWRPQOWAIENBVBNPBPUSREBNWVWPAWOIHWOiqWABJPRZBNWFYAVYIBSHNPFFIRWVVBNPBBSVWXYAWBNWVWAIENBVESDWARUWRBVPAWIRVBIBYBWZPUSREUWRZWAIDIREBHWIATYVBFSLWAVHASUBNWXSRVWRBSHBOTESDWARWZBNPBLNWWDWAPRJHSAUSHESDWARUWRBQWXSUWVZWVBAYXBIDWSHBNWVWWRZVIBIVBNVAIENBSHBNWFWSFOWBSPOBWASABSPQSOIVNIBPRZBSIRVBIBYBWRWLESDWARUWRBOPJIREIBVHSYRZPBISRSRVYXNFAIRXIFOOTPRZSAEPRIKIREIBVFSLWAVIRVYXN";

  (async () => {
    const englishBigrams = await getEnglishFullBigrams();
    const result1 = getLetterFrequencySetsFromBigram(englishBigrams, "A");

    const cipherBigrams = await calculateBigramFrequencyMap(cipher);
    const result2 = getLetterFrequencySetsFromBigram(cipherBigrams, "B");

    const diff = calculateBigramSetDifferenceScore(result2, result1);

    console.log(result1);
    console.log(result2);

    console.log(diff);
  })().catch((error) => {
    console.error(error);
  });
}
