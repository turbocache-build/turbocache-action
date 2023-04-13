import { readdirSync } from "fs";

const LOCATION = ".turbo/runs";

export function findTurboSummaryFile(): string | undefined {
  const file = readdirSync(LOCATION).find((file) => file.endsWith(".json"));
  if (!file) {
    return;
  }
  return `${LOCATION}/${file}`;
}
