import pc from "picocolors";
import type { GitFileInfo } from "./git.js";

const formatMonths = ({ months }: { readonly months: number }): string => {
	if (months === 1) return "1 month";
	return `${months} months`;
};

const displayZombieFiles = ({
	zombieFiles,
}: {
	readonly zombieFiles: readonly GitFileInfo[];
}): void => {
	if (zombieFiles.length === 0) {
		console.log(
			pc.green("\n  No zombie files found. Your repo is well-maintained!\n"),
		);
		return;
	}

	console.log(pc.white("\n  🧟 Zombie Files\n"));

	for (const zombie of zombieFiles) {
		const months = formatMonths({ months: zombie.monthsUntouched });
		console.log(
			`  ${pc.white(zombie.filePath)} ${pc.gray("—")} ${pc.dim(`untouched for ${months}`)}`,
		);
	}

	console.log(
		pc.gray(
			`\n  Found ${zombieFiles.length} zombie file${zombieFiles.length === 1 ? "" : "s"}.\n`,
		),
	);
};

export { displayZombieFiles, formatMonths };
