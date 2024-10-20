import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const WorldbuilderModule = {
	treeshake: {
		moduleSideEffects: false,
		propertyReadSideEffects: false
	},
	input: "cgi/worldbuilder/worldbuilder.js",
	external: [
		// "react",
		// "react-dom"
	],
	output: {
		file: "www/dist/worldbuilder.bundle.js",
		format: "es",
		sourcemap: true
	},
	plugins: [
		resolve({
			modulesOnly: false
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		replace({
		  'process.env.NODE_ENV': JSON.stringify( 'production' ),
		  'preventAssignment': true
		})
	]
};

export default WorldbuilderModule;
