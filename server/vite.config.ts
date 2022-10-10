import type { UserConfig as VitestUserConfig } from "vitest/config";
import type { UserConfig as ViteUserConfig } from "vite";

import { configDefaults } from "vitest/config";
import { VitePluginNode } from "vite-plugin-node";
import { defineConfig } from "vite";
import { resolve } from "node:path";

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
		server: { port: 3_333 },
		envDir: "./",
		base: "./",

		plugins: [
			...VitePluginNode({
				// Nodejs native Request adapter
				// currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
				// you can also pass a function if you are using other frameworks, see Custom Adapter section
				adapter: "express",

				// tell the plugin where is your project entry
				appPath: "./src/server.ts",

				// the name of named export of you app from the appPath file
				exportName: "app",
			}),
		],

		build: {
			chunkSizeWarningLimit: 1_000,
			reportCompressedSize: false,
			outDir: buildOutputDirectory,
			sourcemap: !isProd,
			emptyOutDir: true,
			minify: "esbuild",
			target: "esnext",
			rollupOptions: {
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
					replacement: resolve(__dirname, "src/renderer/components"),
				},
				{
					find: "@routes",
					replacement: resolve(__dirname, "src/renderer/routes"),
				},
				{
					find: "@utils",
					replacement: resolve(__dirname, "src/renderer/utils"),
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
