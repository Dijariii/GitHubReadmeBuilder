[18:09:42.401] Cloning github.com/Dijariii/GitHubReadmeBuilder (Branch: main, Commit: 2d3a1f1)
[18:09:42.408] Skipping build cache, deployment was triggered without cache.
[18:09:42.657] Cloning completed: 256.000ms
[18:09:42.857] Running build in Washington, D.C., USA (East) – iad1
[18:09:43.062] Running "vercel build"
[18:09:43.525] Vercel CLI 41.4.1
[18:09:44.261] Installing dependencies...
[18:09:49.832] npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is
[18:09:49.852] npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is
[18:09:54.790] 
[18:09:54.791] added 561 packages in 10s
[18:09:54.792] 
[18:09:54.792] 126 packages are looking for funding
[18:09:54.792]   run `npm fund` for details
[18:09:56.365] 
[18:09:56.365] node:internal/modules/run_main:122
[18:09:56.366]     triggerUncaughtException(
[18:09:56.366]     ^
[18:09:56.366] Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/vercel/path0/vercel-build.ts' imported from /vercel/path0/
[18:09:56.366]     at finalizeResolution (node:internal/modules/esm/resolve:275:11)
[18:09:56.366]     at moduleResolve (node:internal/modules/esm/resolve:860:10)
[18:09:56.366]     at defaultResolve (node:internal/modules/esm/resolve:984:11)
[18:09:56.366]     at nextResolve (node:internal/modules/esm/hooks:748:28)
[18:09:56.366]     at resolveBase (file:///vercel/path0/node_modules/tsx/dist/esm/index.mjs?1743782996238:2:3212)
[18:09:56.367]     at resolveDirectory (file:///vercel/path0/node_modules/tsx/dist/esm/index.mjs?1743782996238:2:3584)
[18:09:56.367]     at resolveTsPaths (file:///vercel/path0/node_modules/tsx/dist/esm/index.mjs?1743782996238:2:4073)
[18:09:56.367]     at resolve (file:///vercel/path0/node_modules/tsx/dist/esm/index.mjs?1743782996238:2:4447)
[18:09:56.367]     at nextResolve (node:internal/modules/esm/hooks:748:28)
[18:09:56.367]     at Hooks.resolve (node:internal/modules/esm/hooks:240:30) {
[18:09:56.367]   code: 'ERR_MODULE_NOT_FOUND',
[18:09:56.367]   url: 'file:///vercel/path0/vercel-build.ts'
[18:09:56.367] }
[18:09:56.367] 
[18:09:56.367] Node.js v22.14.0
[18:09:56.391] Error: Command "npx tsx vercel-build.ts" exited with 1
[18:09:56.852] 