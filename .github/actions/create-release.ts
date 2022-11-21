import fs from "fs";
import path from "path";
const { Octokit } = require("@octokit/action");
import * as github from "@actions/github";
const { getChangelogEntry } = require("changesets/action/src/utils");
import type { Package } from "@manypkg/get-packages";

import { name, version } from "../../package.json";

const createRelease = async (
  octokit: ReturnType<typeof github.getOctokit>,
  { pkg, tagName }: { pkg: Package; tagName: string }
) => {
  try {
    let changelogFileName = path.join(pkg.dir, "CHANGELOG.md");

    let changelog = await fs.readFile(changelogFileName, "utf8", () => {
      console.log("Reading changelog");
    });

    if (typeof changelog === "string") {
      let changelogEntry = getChangelogEntry(
        changelog,
        pkg.packageJson.version
      );
      if (!changelogEntry) {
        throw new Error(
          `Could not find changelog entry for ${pkg.packageJson.name}@${pkg.packageJson.version}`
        );
      }

      await octokit.rest.repos.createRelease({
        name: tagName,
        tag_name: tagName,
        body: changelogEntry.content,
        prerelease: pkg.packageJson.version.includes("-"),
        ...github.context.repo,
      });
    }
  } catch (err: any) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
};

const octokit = new Octokit();

const pkg = {
  packageJson: {
    name,
    version,
  },
  dir: path.join(__dirname, "../../"),
};

createRelease(octokit, {
  pkg,
  tagName: `${pkg.packageJson.name}@${pkg.packageJson.version}`,
});
