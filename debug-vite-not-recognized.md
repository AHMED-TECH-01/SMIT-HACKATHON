# Debug Session: vite-not-recognized
- **Status**: [OPEN]
- **Issue**: Frontend `npm run dev` fails with `'vite' is not recognized as an internal or external command`.
- **Debug Server**: Not started for this shell-level package resolution issue.
- **Log File**: N/A

## Reproduction Steps
1. Open a terminal in `C:\SMIT\hakathon-1\frontend`.
2. Run `npm run dev`.
3. Observe that Windows cannot resolve the `vite` command.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | `vite` is declared but `node_modules/.bin/vite.cmd` is missing | High | Low | Pending |
| B | `node_modules` is partially installed or corrupted | High | Low | Pending |
| C | `package-lock.json` and installed modules are out of sync | Medium | Low | Pending |
| D | The issue is only command invocation, requiring a clean reinstall via `npm.cmd` | Medium | Low | Pending |

## Log Evidence
- Initial evidence: `frontend\\node_modules\\vite\\package.json` exists while `frontend\\node_modules\\.bin\\vite.cmd` is missing.
- Reproduced with `npm.cmd run dev`: npm launches the `dev` script, but Windows reports `'vite' is not recognized as an internal or external command`.
- `npm.cmd ls vite --depth=0` confirms `vite@6.4.3` is installed in the frontend package tree.
- After clean reinstall, `frontend\\node_modules\\.bin\\vite.cmd` is present again.
- New runtime evidence from `npm.cmd run dev`: Vite resolves, but Node throws `ERR_MODULE_NOT_FOUND` for package `esbuild` imported from `vite/dist/node/cli.js`.
- After installing `esbuild`, `npm.cmd run dev` progresses further and now fails because `@rollup/rollup-win32-x64-msvc` is missing.
- Rollup's own error message points to an npm optional dependency install bug on Windows.
- After restoring the Rollup native package, Vite starts and serves `http://localhost:3000/`, but bundling then fails because installed `lucide-react` files are missing under `dist/esm/icons`.
- Spot checks confirm expected icon modules such as `alarm-clock-check.js` and `arrow-down-a-z.js` are absent from the installed `lucide-react` package.
- A later inspection shows `frontend\\node_modules\\lucide-react` is still invalid because its package root is corrupted: `package.json` is missing even though some built files exist.
- `ms` is also absent from `frontend\\node_modules`, causing Babel's `debug` dependency chain to fail during React transform.

## Verification Conclusion
- `npm.cmd run dev` now starts Vite successfully.
- Current healthy endpoint: `http://localhost:3000/`
- Root cause: the frontend dependency tree was partially corrupted on disk, which removed the local Vite shim and several required packages/files (`esbuild`, Rollup Windows native package, `ms`, and a valid `lucide-react` package root).
- Awaiting user verification before closing this session and cleaning up `debug-vite-not-recognized.md`.
