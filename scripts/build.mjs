import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { extname, join } from "node:path";

const root = new URL("../", import.meta.url);
const output = new URL("../dist/", import.meta.url);
const allowedExtensions = new Set([".html", ".css", ".js", ".svg", ".png"]);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isFile() || !allowedExtensions.has(extname(entry.name))) continue;
  await cp(new URL(`../${entry.name}`, import.meta.url), join(output.pathname, entry.name));
}

console.log("Lunari static site built in dist/");

