import * as core from "@actions/core";
import { readFileSync } from "fs";
import { findTurboSummaryFile } from "./findFile";
import "cross-fetch/polyfill";

async function run(): Promise<void> {
  try {
    core.debug("Starting Turbocache Action");

    const token = process.env.TURBO_TOKEN;
    const team = process.env.TURBO_TEAM;
    if (!token) {
      core.error("TURBO_TOKEN is not set.");
      core.warning("Skipping Turbocache Action.");
      return;
    }
    if (!team) {
      core.error("TURBO_TEAM is not set.");
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

    const file = findTurboSummaryFile();
    if (!file) {
      core.error("No Turbo summary file found.");
      core.warning("Skipping Turbocache Action.");
      return;
    }

    core.info(`Found Turbo summary file: ${file}`);

    const uploadUrl = `https://cache.turbocache.build/api/v1/runs?teamId=${team}`;
    core.debug(`Uploading to ${uploadUrl}`);

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
  } catch (error) {
    if (error instanceof Error) {
      core.error("Error uploading to Turbocache");
      core.error(error.message);
    }
  }
}

run();
