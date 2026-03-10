import { createRequire } from "node:module";
import { Command, Option } from "commander";
import { printBanner } from "./banner.js";
import { scan } from "./commands/scan.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json") as { version: string };

const program = new Command();

program
	.name("zombiefile")
	.description("Find zombie files nobody touched for months.")
	.version(pkg.version, "-v, --version")
	.option("-m, --months <number>", "minimum months untouched", "3")
	.option("-d, --dir <path>", "target directory", ".")
	.action(async (options: { months: string; dir: string }) => {
		printBanner();
		const months = Number.parseInt(options.months, 10);
		if (Number.isNaN(months) || months < 1) {
			console.error("  --months must be a positive number.\n");
			process.exit(1);
		}
		await scan({ months, cwd: options.dir });
	});

program.parse();
