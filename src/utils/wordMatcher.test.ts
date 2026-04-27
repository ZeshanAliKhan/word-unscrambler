import { describe, expect, it } from "vitest";
import { unscrambleWords } from "./wordMatcher";

const SAMPLE_WORD_LIST = [
  "act",
  "at",
  "cat",
  "date",
  "gate",
  "late",
  "rate",
  "stare",
  "tears",
  "aster",
  "stear",
  "tare",
  "star",
];

describe("unscrambleWords", () => {
  it("returns common matches for a simple letter set", () => {
    const results = unscrambleWords("cat", {
      startsWith: "",
      endsWith: "",
      contains: "",
      wordLength: "any",
      sortBy: "alpha",
    }, SAMPLE_WORD_LIST);

    const words = results.map((result) => result.word);

    expect(words).toContain("ACT");
    expect(words).toContain("CAT");
    expect(words).toContain("AT");
  });

  it("supports wildcards", () => {
    const results = unscrambleWords("?ate", {
      startsWith: "",
      endsWith: "",
      contains: "",
      wordLength: "4",
      sortBy: "alpha",
    }, SAMPLE_WORD_LIST);

    const words = results.map((result) => result.word);

    expect(words).toContain("DATE");
    expect(words).toContain("GATE");
    expect(words).toContain("LATE");
  });

  it("applies filters and score sorting", () => {
    const results = unscrambleWords("stare", {
      startsWith: "S",
      endsWith: "",
      contains: "T",
      wordLength: "5",
      sortBy: "score",
    }, SAMPLE_WORD_LIST);

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.word.startsWith("S"))).toBe(true);
    expect(results.every((result) => result.word.includes("T"))).toBe(true);
    expect(results.every((result) => result.length === 5)).toBe(true);
    expect(results[0].score).toBeGreaterThanOrEqual(results[results.length - 1].score);
  });
});
