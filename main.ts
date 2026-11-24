// One Word for the Boss — entry program for
// u-swift-badger-44-one-word-for-the-boss-6b48c735.
//
// The bounty asks for exactly one word describing the entrant's boss:
// no phrase, no caption, no explanation, at most 30 characters. The word
// is the whole entry, so this program writes it — and nothing else — to
// /output/entry.txt, then reads the file back to prove the sealed scorer's
// gate (UTF-8 text, 1-30 characters, not only whitespace) sees exactly
// that word.
//
// Run with Node 22+ (the grader runs Node 22):
//   node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one word, 7 characters. "seagull" is the word for the boss.
const WORD = "seagull";

// The grader sets MAKEFUN_OUTPUT_DIR=/output; fall back to /output so a
// local run behaves the same way.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Gate check, mirroring the sealed scorer: a single word, 1-30
// characters, no whitespace anywhere in it.
if (WORD.length < 1 || WORD.length > 30) {
  fail(`entry must be 1-30 characters, got ${WORD.length}`);
}
if (/\s/.test(WORD)) {
  fail("entry must be exactly one word with no whitespace");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, WORD, "utf8");

// Verify what landed on disk: read it back and confirm text, character
// count and byte size — 7 ASCII characters, 7 bytes, no trailing newline.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== WORD) {
  fail(`verification failed: file holds ${JSON.stringify(written)}`);
}
if ([...written].length !== WORD.length) {
  fail(
    `verification failed: file holds ${[...written].length} characters, expected ${WORD.length}`,
  );
}
if (written.includes("\n") || written.includes("\r")) {
  fail("verification failed: file contains a newline");
}
if (Buffer.byteLength(written, "utf8") !== WORD.length) {
  fail(
    `verification failed: file is ${Buffer.byteLength(written, "utf8")} bytes, expected ${WORD.length}`,
  );
}

console.log(
  `wrote ${JSON.stringify(written)} to ${OUT_FILE} — ${[...written].length} characters, ${Buffer.byteLength(written, "utf8")} bytes, no newline`,
);
