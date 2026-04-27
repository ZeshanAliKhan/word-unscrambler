import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { unscrambleWords } from "./wordMatcher";

const wordListPath = path.resolve(process.cwd(), "public", "word-list.json");
const generatedWordList = JSON.parse(fs.readFileSync(wordListPath, "utf8")) as string[];

describe("generated word list integration", () => {
  it("contains a usable English dictionary payload", () => {
    expect(generatedWordList.length).toBeGreaterThan(50000);
    expect(generatedWordList).toContain("apple");
    expect(generatedWordList).toContain("zebra");
  });

  it("finds expected matches from the generated dictionary", () => {
    const results = unscrambleWords(
      "react",
      {
        startsWith: "",
        endsWith: "",
        contains: "",
        wordLength: "5",
        sortBy: "alpha",
      },
      generatedWordList,
    );

    const words = results.map((result) => result.word);

    expect(words).toContain("CRATE");
    expect(words).toContain("CATER");
    expect(words).toContain("REACT");
    expect(words).toContain("TRACE");
  });
});
