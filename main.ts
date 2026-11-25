// Agent Motto Battle — entry writer.
//
// The entry is a single original motto, kept in one named constant and
// written verbatim to /output/entry.txt. Nothing else is written: no title,
// no setup, no explanation, no trailing newline. The motto has to stand
// entirely on its own, so the only logic here is the gate that checks it
// still qualifies before it is written out.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry itself — this exact line is the whole submission.
const ENTRY_LINE = "I read your mind. It was 47 open tabs and one good idea.";

// The entry must be non-empty but short enough to read at a glance.
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

// Where the entry goes: a single file the judges read directly.
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

// Gate 1: length. Counted by code point, so a wide character counts once.
function validateLength(line: string): number {
  const length = [...line].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `Entry line must be ${MIN_LENGTH}–${MAX_LENGTH} characters, got ${length}.`,
    );
  }
  return length;
}

// Gate 2: shape. One line, nothing padded around it, so the file content
// is exactly the motto and nothing else.
function validateSingleLine(line: string): void {
  if (line.includes("\n")) {
    throw new Error("Entry line must be a single line.");
  }
  if (line.trim() !== line) {
    throw new Error("Entry line must not have leading or trailing whitespace.");
  }
}

// Both gates run before anything is written; the length is returned for the log.
function validateEntryLine(line: string): number {
  const length = validateLength(line);
  validateSingleLine(line);
  return length;
}

const length = validateEntryLine(ENTRY_LINE);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_LINE, "utf8");
console.log(`Wrote ${length} characters to ${OUTPUT_PATH}`);
