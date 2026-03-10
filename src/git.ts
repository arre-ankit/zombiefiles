import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

interface GitFileInfo {
	readonly filePath: string;
	readonly lastTouchedAt: Date;
	readonly monthsUntouched: number;
}

const isGitRepo = async ({
	cwd,
}: { readonly cwd: string }): Promise<boolean> => {
	try {
		await execFileAsync("git", ["rev-parse", "--is-inside-work-tree"], { cwd });
		return true;
	} catch {
		return false;
	}
};

const getTrackedFiles = async ({
	cwd,
}: { readonly cwd: string }): Promise<readonly string[]> => {
	const { stdout } = await execFileAsync("git", ["ls-files"], { cwd });
	return stdout.trim().split("\n").filter(Boolean);
};

const getLastCommitDate = async ({
	cwd,
	filePath,
}: {
	readonly cwd: string;
	readonly filePath: string;
}): Promise<Date | undefined> => {
	try {
		const { stdout } = await execFileAsync(
			"git",
			["log", "-1", "--format=%aI", "--", filePath],
			{ cwd },
		);
		const trimmed = stdout.trim();
		if (!trimmed) return undefined;
		return new Date(trimmed);
	} catch {
		return undefined;
	}
};

const calculateMonthsAgo = ({ date }: { readonly date: Date }): number => {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
};

const findZombieFiles = async ({
	cwd,
	minMonths,
}: {
	readonly cwd: string;
	readonly minMonths: number;
}): Promise<readonly GitFileInfo[]> => {
	const trackedFiles = await getTrackedFiles({ cwd });

	const fileInfoPromises = trackedFiles.map(
		async (filePath): Promise<GitFileInfo | undefined> => {
			const lastTouchedAt = await getLastCommitDate({ cwd, filePath });
			if (!lastTouchedAt) return undefined;

			const monthsUntouched = calculateMonthsAgo({ date: lastTouchedAt });
			if (monthsUntouched < minMonths) return undefined;

			return { filePath, lastTouchedAt, monthsUntouched };
		},
	);

	const fileInfoResults = await Promise.all(fileInfoPromises);
	const zombieFiles = fileInfoResults.filter(
		(info): info is GitFileInfo => info !== undefined,
	);

	return zombieFiles.toSorted((a, b) => b.monthsUntouched - a.monthsUntouched);
};

export {
	findZombieFiles,
	isGitRepo,
	calculateMonthsAgo,
	getTrackedFiles,
	getLastCommitDate,
};
export type { GitFileInfo };
