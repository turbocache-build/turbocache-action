import { readdirSync } from "fs";
import { sync } from "glob";

export function findTurboSummaryFiles(): string[] {
  const LOCATION = findLocation();
  const files = readdirSync(LOCATION).filter((file) => file.endsWith(".json"));
  return files.map((file) => `${LOCATION}/${file}`);
}

// Find a folder called .turbo/runs
function findLocation(): string {
  const folders = sync([".turbo/runs", "**/.turbo/runs"], { maxDepth: 3 });
  if (folders.length === 0) {
    throw new Error("No .turbo/runs folder found");
  }
  return folders[0];
}
