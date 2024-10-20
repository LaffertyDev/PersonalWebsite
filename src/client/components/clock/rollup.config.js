import resolve from "@rollup/plugin-node-resolve";

const ClockModule = {
	treeshake: {
		moduleSideEffects: true,
		propertyReadSideEffects: false
	},
	input: "cgi/components/clock/module.js",
	output: {
		file: "www/dist/clock.bundle.js",
		format: "es",
		sourcemap: true
	},
	plugins: [
		resolve({
			modulesOnly: true
		})
	]
};

export default ClockModule;
