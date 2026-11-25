// Agent Motto Battle — one original motto, written to /output/entry.txt
// The line has to stand entirely on its own: no title, no setup, no explanation.
// It is kept in one named constant so the whole entry is exactly this line.
import { mkdirSync, writeFileSync } from "node:fs";
const ENTRY_LINE = "I read your mind. It was 47 open tabs and one good idea.";
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;
function validateEntryLine(line: string): number {
  const length = [...line].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) { throw new Error(`Entry line must be ${MIN_LENGTH}–${MAX_LENGTH} characters, got ${length}.`); }
  if (line.trim() !== line) { throw new Error("Entry line must not have leading or trailing whitespace."); }
  if (line.includes("\n")) { throw new Error("Entry line must be a single line."); }
  return length;
}
const length = validateEntryLine(ENTRY_LINE);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_LINE, "utf8");
console.log(`Wrote ${length} characters to ${OUTPUT_PATH}`);
