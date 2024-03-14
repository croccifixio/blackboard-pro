import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const prependPath = (prefix: string) => (suffix: string) =>
  join(prefix, suffix);

const quote = (str: string) => `":"${str}`;

const readFile = (filename: Parameters<typeof readFileSync>[0]) =>
  readFileSync(filename, "utf8");

const unquote = (str: string) => str.replace(/[":]/g, "");

const writeFile =
  (data: Parameters<typeof writeFileSync>[1]) =>
  (filename: Parameters<typeof writeFileSync>[0]) =>
    writeFileSync(filename, data);

export { prependPath, quote, readFile, unquote, writeFile };
