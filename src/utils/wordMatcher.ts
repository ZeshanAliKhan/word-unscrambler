import { Filters, WordResult } from "../types";

const LETTER_SCORES: Record<string, number> = {
  a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, s: 1, t: 1, r: 1,
  d: 2, g: 2,
  b: 3, c: 3, m: 3, p: 3,
  f: 4, h: 4, v: 4, w: 4, y: 4,
  k: 5,
  j: 8, x: 8,
  q: 10, z: 10,
};

function calculateScore(word: string): number {
  return word.toLowerCase().split("").reduce((sum, letter) => sum + (LETTER_SCORES[letter] || 0), 0);
}

function getLetterCount(str: string): Record<string, number> {
  const count: Record<string, number> = {};
  for (const char of str.toLowerCase()) {
    if (char >= "a" && char <= "z") {
      count[char] = (count[char] || 0) + 1;
    }
  }
  return count;
}

function canFormWord(word: string, inputLetters: string): boolean {
  const inputLower = inputLetters.toLowerCase();
  const wordLower = word.toLowerCase();
  const availableLetters = getLetterCount(inputLower);
  const wildcards = (inputLower.match(/[?*]/g) || []).length;

  let remainingWildcards = wildcards;
  const usedLetters: Record<string, number> = {};

  for (const letter of wordLower) {
    const used = usedLetters[letter] || 0;
    const available = availableLetters[letter] || 0;

    if (used < available) {
      usedLetters[letter] = used + 1;
    } else if (remainingWildcards > 0) {
      remainingWildcards -= 1;
    } else {
      return false;
    }
  }

  return true;
}

export function unscrambleWords(
  letters: string,
  filters: Filters,
  wordList: readonly string[],
): WordResult[] {
  const cleanLetters = letters.trim();

  if (!cleanLetters) {
    return [];
  }

  let results = wordList.filter((word) => canFormWord(word, cleanLetters));

  if (filters.startsWith) {
    const prefix = filters.startsWith.toLowerCase();
    results = results.filter((word) => word.startsWith(prefix));
  }

  if (filters.endsWith) {
    const suffix = filters.endsWith.toLowerCase();
    results = results.filter((word) => word.endsWith(suffix));
  }

  if (filters.contains) {
    const substring = filters.contains.toLowerCase();
    results = results.filter((word) => word.includes(substring));
  }

  if (filters.wordLength !== "any") {
    const targetLength = Number.parseInt(filters.wordLength, 10);
    if (targetLength === 9) {
      results = results.filter((word) => word.length >= 9);
    } else {
      results = results.filter((word) => word.length === targetLength);
    }
  }

  const uniqueResults = [...new Set(results)];
  const wordResults = uniqueResults.map((word) => ({
    word: word.toUpperCase(),
    length: word.length,
    score: calculateScore(word),
  }));

  switch (filters.sortBy) {
    case "longest":
      wordResults.sort((a, b) => b.length - a.length || a.word.localeCompare(b.word));
      break;
    case "shortest":
      wordResults.sort((a, b) => a.length - b.length || a.word.localeCompare(b.word));
      break;
    case "alpha":
      wordResults.sort((a, b) => a.word.localeCompare(b.word));
      break;
    case "score":
      wordResults.sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));
      break;
    default:
      wordResults.sort((a, b) => b.length - a.length || a.word.localeCompare(b.word));
  }

  return wordResults;
}
