# 🧟 zombiefiles

![zombiefiles](https://raw.githubusercontent.com/arre-ankit/zombiefiles/refs/heads/main/.github/cover.svg)

Find zombie files nobody touched for months. Great for cleaning repos.

```
███████╗ ██████╗ ███╗   ███╗██████╗ ██╗███████╗
╚══███╔╝██╔═══██╗████╗ ████║██╔══██╗██║██╔════╝
  ███╔╝ ██║   ██║██╔████╔██║██████╔╝██║█████╗  
 ███╔╝  ██║   ██║██║╚██╔╝██║██╔══██╗██║██╔══╝  
███████╗╚██████╔╝██║ ╚═╝ ██║██████╔╝██║███████╗
╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═════╝ ╚═╝╚══════╝
```

Scans your git repo and finds files that haven't been touched in months — the zombie files lurking in your codebase.

![zombiefiles demo](https://raw.githubusercontent.com/arre-ankit/zombiefiles/refs/heads/main/.github/zombiefiles-demo.gif)

## Usage

```bash
npx zombiefiles
```

## Example Output

```
🧟 Zombie Files

  auth-old.js — untouched for 14 months
  utils/temp.ts — untouched for 10 months
  lib/legacy-helper.js — untouched for 6 months

  Found 3 zombie files.
```

## Options

```bash
npx zombiefiles --months 6        # files untouched for 6+ months (default: 3)
npx zombiefiles --dir ../my-repo  # scan a different repo
npx zombiefiles --help            # show help
npx zombiefiles --version         # show version
```

| Flag | Description | Default |
|------|-------------|---------|
| `-m, --months <number>` | Minimum months untouched | `3` |
| `-d, --dir <path>` | Target directory to scan | `.` |
| `-v, --version` | Show version | |
| `-h, --help` | Show help | |

## Install globally

```bash
npm i -g zombiefiles
zombiefiles
```

## How it works

1. Lists all git-tracked files via `git ls-files`
2. Checks the last commit date for each file via `git log`
3. Filters files untouched longer than the threshold
4. Sorts by staleness — oldest zombies first

## License

MIT
