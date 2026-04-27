import fs from "node:fs";
import path from "node:path";
import words from "word-list-json";

const filteredWords = [...new Set(
  words
    .map((word) => word.trim().toLowerCase())
    .filter((word) => /^[a-z]+$/.test(word))
    .filter((word) => word.length >= 2 && word.length <= 15)
)].sort((a, b) => a.localeCompare(b));

const jsonOutputPath = path.join(process.cwd(), "public", "word-list.json");

fs.mkdirSync(path.dirname(jsonOutputPath), { recursive: true });
fs.writeFileSync(jsonOutputPath, JSON.stringify(filteredWords), "utf8");

console.log(`Generated JSON export at ${jsonOutputPath}`);
