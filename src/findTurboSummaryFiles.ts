import { readdirSync } from "fs";
import glob from "glob";

export function findTurboSummaryFiles(): string[] {
  const LOCATION = findLocation();
  const files = readdirSync(LOCATION).filter((file) => file.endsWith(".json"));
  return files.map((file) => `${LOCATION}/${file}`);
}

// Find a folder called .turbo/runs
function findLocation(): string {
  const folders = glob.sync(".turbo/runs");
  if (folders.length === 0) {
    throw new Error("No .turbo/runs folder found");
  }
  return folders[0];
}
