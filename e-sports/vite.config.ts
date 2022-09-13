import type { UserConfig as VitestUserConfig } from "vitest/config";
import type { UserConfig as ViteUserConfig } from "vite";

import { configDefaults } from "vitest/config";
import { defineConfig } from "vite";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";

const buildOutputDirectory = resolve(__dirname, "./build");

export default defineConfig(({ mode }) => {
	const isDev = mode === "development";
	const isTest = mode === "test";
	const isProd = !isTest && !isDev;

	const config: ViteUserConfig & VitestUserConfig = {
		test: {
			includeSource: ["src/**/*.{js,ts}"],
			environment: "happy-dom",
			dir: "src/__tests__",
			logHeapUsage: true,
			coverage: {
				// reporter: ["html", "text"],
				reporter: ["text"],
				// all: true,
			},
			exclude: [
				...configDefaults.exclude,
				"**/seeLeakedVariables.ts",
				"**/.eslintrc.{js,cjs}",
				"**/styles.ts",
				"**/global.ts",
				"coverage/**",
				"**/*.d.ts",
			],
		},

		define: isTest ? {} : { "import.meta.vitest": "undefined" },
		plugins: [react()],
		envDir: "./",
		base: "./",

		build: {
			chunkSizeWarningLimit: 1_000,
			reportCompressedSize: false,
			outDir: buildOutputDirectory,
			sourcemap: !isProd,
			emptyOutDir: true,
			minify: "esbuild",
			target: "esnext",
			rollupOptions: {
				// The 'debug' pkg is already on nodeJS:
				external: ["debug"],
				output: {
					assetFileNames: "assets/[name].[ext]",
					entryFileNames: "[name].js",
					chunkFileNames: "[name].js",
					minifyInternalExports: true,
					sourcemap: !isProd,
					compact: isProd,
					format: "esm",
				},
			},
		},

		esbuild: {
			sourcemap: !isProd,
			treeShaking: true,
			target: "esnext",
			format: "esm",
		},

		css: { devSourcemap: true },

		resolve: {
			alias: [
				{
					find: "@components",
					replacement: resolve(__dirname, "src/components"),
				},
				{
					find: "@styles",
					replacement: resolve(__dirname, "src/styles"),
				},
				{
					find: "@assets",
					replacement: resolve(__dirname, "src/assets"),
				},
				{
					find: "@utils",
					replacement: resolve(__dirname, "src/utils"),
				},
				{
					find: "@hooks",
					replacement: resolve(__dirname, "src/hooks"),
				},
			],
		},
	};

	// console.dir(
	// 	{ isTest, isDev, config },
	// 	{
	// 		maxStringLength: 1_000,
	// 		maxArrayLength: 40,
	// 		compact: false,
	// 		sorted: false,
	// 		colors: true,
	// 		depth: 10,
	// 	}
	// );

	return config;
});
