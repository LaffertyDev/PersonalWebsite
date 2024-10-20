import resolve from "@rollup/plugin-node-resolve";

const TimeDistanceModule = {
	treeshake: {
		moduleSideEffects: false,
		propertyReadSideEffects: false
	},
	input: "cgi/timedistance/timedistance.js",
	external: [
		// "react",
		// "react-dom"
	],
	output: {
		file: "www/dist/timedistance.bundle.js",
		format: "es",
		sourcemap: true
	},
	plugins: [
		resolve({
			modulesOnly: true
		})
	]
};

export default TimeDistanceModule;
