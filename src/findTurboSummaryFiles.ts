import { readdirSync } from "fs";

const LOCATION = ".turbo/runs";

export function findTurboSummaryFiles(): string[] {
  const files = readdirSync(LOCATION).filter((file) => file.endsWith(".json"));
  return files.map((file) => `${LOCATION}/${file}`);
}
