// One Word for the Boss — entry program.
// Emits exactly one word describing the boss to /output/entry.txt (UTF-8).
// The word: "Autocorrect" — the boss who "fixes" your good work into
// something worse, just to leave a mark on it.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const BOSS_WORD = "Autocorrect";
const DEFAULT_TARGET = "/output/entry.txt";
const MAX_CHARS = 30;

// Gate mirror: the sealed scorer accepts only UTF-8 text of 1..30
// characters that is not only white space; the brief wants one word,
// so reject any whitespace inside the entry as well.
function assertEntryWord(word: string): void {
  const chars = [...word].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry word must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (/\s/u.test(word)) {
    throw new Error("entry must be a single word with no whitespace");
  }
}

function targetPath(): string {
  const fromEnv = process.env.OUTPUT_PATH;
  return fromEnv && fromEnv.trim().length > 0 ? fromEnv : DEFAULT_TARGET;
}

async function writeEntry(word: string): Promise<void> {
  assertEntryWord(word);
  const target = targetPath();
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, word, "utf8");
}

await writeEntry(BOSS_WORD);
