// ESLint flat config. Replaces the old tslint.json.
//
// Note on TypeScript versions: the project compiles with TypeScript 7 (the `typescript-7` package),
// but typescript-eslint still needs the TypeScript 6 JavaScript API, which the `typescript` package
// name points at (an alias for the official `@typescript/typescript6` compatibility package).
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
	globalIgnores(["cgi/", "www/", "node_modules/"]),

	{
		files: ["**/*.{js,ts,tsx}"],
		extends: [js.configs.recommended],
		plugins: { "@stylistic": stylistic },
		rules: {
			// Formatting (was: indent, max-line-length, new-parens)
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/max-len": ["error", { code: 160, tabWidth: 1, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
			"@stylistic/new-parens": "error",
			"@stylistic/no-trailing-spaces": "off",

			// Correctness (was: no-arg, no-bitwise, no-conditional-assignment)
			"no-caller": "error",
			"no-bitwise": "error",
			"no-cond-assign": "error",

			// Was: no-console (warn on debug/info/log/time/timeEnd/trace)
			"no-console": ["warn", { allow: ["warn", "error", "assert", "dir", "table", "group", "groupEnd", "count"] }],
		},
	},

	// Node scripts that run at build time
	{
		files: ["build.js", "eslint.config.js", "**/rollup.config.js"],
		languageOptions: { globals: globals.node },
		rules: { "no-console": "off" },
	},
	{
		files: ["jest.config.js"],
		languageOptions: { sourceType: "commonjs", globals: globals.node },
	},

	// Browser TypeScript source
	{
		files: ["src/**/*.{ts,tsx}"],
		extends: [tseslint.configs.recommended],
		languageOptions: { globals: globals.browser },
		rules: {
			// Allow unused parameters that are required by a callback signature when prefixed with _
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

			// Was: class-name
			"@typescript-eslint/naming-convention": ["error", { selector: "typeLike", format: ["PascalCase"] }],

			// Was: member-ordering (with alphabetize)
			"@typescript-eslint/member-ordering": ["error", {
				default: {
					memberTypes: [
						"public-static-field",
						"public-instance-field",
						"private-static-field",
						"private-instance-field",
						"public-constructor",
						"private-constructor",
						"public-instance-method",
						"protected-instance-method",
						"private-instance-method",
					],
					order: "alphabetically-case-insensitive",
				},
			}],
		},
	},
]);
