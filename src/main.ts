import * as core from "@actions/core";

async function run(): Promise<void> {
  // Validate ENV
  const token = process.env.TURBO_TOKEN;
  if (!token) {
    core.error("TURBO_TOKEN is not set.");
    core.warning("Skipping Turbocache Action.");
    return;
  }

  if (!process.env.TURBO_RUN_SUMMARY) {
    core.error(
      "TURBO_RUN_SUMMARY is not set. Please add 'TURBO_RUN_SUMMARY: true' to your workflow's env section."
    );
    core.warning("Skipping Turbocache Action.");
    return;
  }
}

run();
