import ClockModule from "./src/client/components/clock/rollup.config.js";
import TimeDistanceModule from "./src/client/timedistance/rollup.config.js";
import WorldbuilderModule from "./src/client/worldbuilder/rollup.config.js";

export default [
	WorldbuilderModule,
	TimeDistanceModule,
	ClockModule
];
