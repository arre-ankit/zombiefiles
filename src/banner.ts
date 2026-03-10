import pc from "picocolors";

const BANNER_LARGE = `
███████╗ ██████╗ ███╗   ███╗██████╗ ██╗███████╗
╚══███╔╝██╔═══██╗████╗ ████║██╔══██╗██║██╔════╝
  ███╔╝ ██║   ██║██╔████╔██║██████╔╝██║█████╗  
 ███╔╝  ██║   ██║██║╚██╔╝██║██╔══██╗██║██╔══╝  
███████╗╚██████╔╝██║ ╚═╝ ██║██████╔╝██║███████╗
╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚═╝╚══════╝
`;

const BANNER_SMALL = `
╔═╗╔═╗╔╦╗╔╗ ╦╔═╗
╔═╝║ ║║║║╠╩╗║║╣ 
╚═╝╚═╝╩ ╩╚═╝╩╚═╝
`;

const printBanner = (): void => {
	const columns = process.stdout.columns ?? 80;
	const banner = columns >= 55 ? BANNER_LARGE : BANNER_SMALL;
	console.log(pc.white(banner));
	console.log(pc.gray("  Find zombie files nobody touched for months.\n"));
};

export { printBanner };
