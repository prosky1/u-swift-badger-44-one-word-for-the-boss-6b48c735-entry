// One Word For The Boss — entrypoint (reviser rewrite)
// Writes the single-word entry to /output/entry.txt as UTF-8.
// Uses only async node:fs/promises with top-level await; no sync APIs.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const DEFAULT_OUTPUT_PATH = "/output/entry.txt";
const ENTRY_WORD = "Synergy";
const ENCODING = "utf8" as const;

function resolveOutputPath(): string {
  const override = process.env.OUTPUT_PATH?.trim();
  return override && override.length > 0 ? override : DEFAULT_OUTPUT_PATH;
}

async function emitEntry(targetPath: string, word: string): Promise<void> {
  const parentDir = dirname(targetPath);
  await mkdir(parentDir, { recursive: true });
  await writeFile(targetPath, word, { encoding: ENCODING });
}

const outputPath = resolveOutputPath();
await emitEntry(outputPath, ENTRY_WORD);
