import ora from "ora";
import pc from "picocolors";
import { displayZombieFiles } from "../display.js";
import { findZombieFiles, isGitRepo } from "../git.js";

const scan = async ({
	months,
	cwd,
}: { readonly months: number; readonly cwd: string }): Promise<void> => {
	const gitRepo = await isGitRepo({ cwd });
	if (!gitRepo) {
		console.error(
			pc.red("\n  Not a git repository. Run this inside a git repo.\n"),
		);
		process.exit(1);
	}

	const spinner = ora("Scanning for zombie files...").start();

	const zombieFiles = await findZombieFiles({ cwd, minMonths: months });

	spinner.stop();

	displayZombieFiles({ zombieFiles });
};

export { scan };
