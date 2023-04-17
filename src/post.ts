import * as core from "@actions/core";
import { readFileSync } from "fs";
import { findTurboSummaryFiles } from "./findTurboSummaryFiles";
import "cross-fetch/polyfill";

async function run(): Promise<void> {
  try {
    // Validate ENV
    const token = process.env.TURBO_TOKEN;
    const team = process.env.TURBO_TEAM;
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

    // Find files
    const files = findTurboSummaryFiles();
    if (files.length === 0) {
      core.error("No Turbo summary file found.");
      core.warning("Skipping Turbocache Action.");
      return;
    }
    core.info(`Found ${files.length} summary file(s)`);

    const uploadUrl = `https://cache.turbocache.build/api/v1/runs?teamId=${team}`;
    core.debug(`Uploading to ${uploadUrl}`);

    // Upload files
    for (const file of files) {
      core.info(`Uploading ${file}`);
      const summary = JSON.parse(readFileSync(file, "utf8"));

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          summary: summary,
          teamId: team,
          repo: process.env.GITHUB_REPOSITORY,
          sha: process.env.GITHUB_SHA,
          branch: process.env.GITHUB_REF,
          workflow: process.env.GITHUB_WORKFLOW,
          runId: process.env.GITHUB_RUN_ID,
        }),
      });
      if (!response.ok) {
        core.error(`Error uploading to Turbocache: ${response.statusText}`);
      } else {
        core.info("Upload complete");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      core.error("Error uploading to Turbocache");
      core.error(error.message);
    }
  }
}

run();
