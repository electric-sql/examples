const { watch } = require("chokidar");
const { build } = require("esbuild");
const fs = require("fs-extra");
const inlineImage = require("esbuild-plugin-inline-image");

const isDev = process.env.NODE_ENV !== "production";

/**
 * ESBuild Params
 * @link https://esbuild.github.io/api/#build-api
 */
const buildParams = {
  color: true,
  entryPoints: ["src/index.tsx", "src/worker.js"],
  loader: { ".ts": "tsx" },
  outdir: "dist",
  minify: !isDev,
  format: "cjs",
  bundle: true,
  sourcemap: true,
  logLevel: "error",
  incremental: true,
  external: ["fs", "path"],
  plugins: [inlineImage()],
};
(async () => {
  fs.removeSync("dist");
  fs.copySync("public", "dist");

  await build(buildParams);

  process.exit(0);
})();
