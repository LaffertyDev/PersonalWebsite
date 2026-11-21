import * as sass from "sass"

import fs from "fs"
import handlebars from "handlebars"

class BuildSystem {
	BuildCSS() {
		const result = sass.compile("src/client/sass/main.scss");

		fs.mkdirSync("www", { recursive: true });
		fs.writeFileSync("www/bundle.css", result.css);
		console.log("wrote bundle.css to disk");
	}

	// Copies checked-in static assets (icons, manifests, ...) into the output directory.
	// Everything in www/ is generated, so this is the only way non-built files get deployed.
	BuildStatic() {
		fs.cpSync("src/static", "www", { recursive: true });
		console.log("copied src/static to www");
	}

	BuildHTML() {
		const extension = "hbs";
		const outDirectory = "www";
		const viewDir = "src/client/views";
		const views = ["index", "components", "404", "worldbuilder", "medievaldemo", "timedistance","bladesclock"];
		const partials = ["footer", "header"];

		for(const partial of partials) {
			const filepath = `${viewDir}/partials/${partial}.${extension}`;
			const fileData = fs.readFileSync(filepath, "utf8");
			handlebars.registerPartial(partial, fileData);
		}

		const layout = "_layout.hbs";
		const filepath = fs.readFileSync(`${viewDir}/${layout}`, "utf8");
		const layoutTemplate = handlebars.compile(filepath);

		if (!fs.existsSync(outDirectory)) {
			fs.mkdirSync(outDirectory);
			console.log("Created view directory");
		}

		for(const view of views) {
			const filePath = `${viewDir}/${view}.${extension}`;
			const file = fs.readFileSync(filePath, "utf8");
			const template = handlebars.compile(file);
			const generated = template({});
			const withLayout = layoutTemplate({
				body: generated
			});

			const viewFileName = `${view}.html`;
			const writeFilePath = `${outDirectory}/${viewFileName}`;
			
			fs.writeFile(writeFilePath, withLayout, (err) => {
				if (err) {
					throw err;
				}

				console.log(`wrote ${viewFileName} to disk`);
			});
		}
	}
}

const buildSystem = new BuildSystem();

if (process.argv.includes("css")) {
	buildSystem.BuildCSS();
}

if (process.argv.includes("html")) {
	buildSystem.BuildHTML();
}

if (process.argv.includes("static")) {
	buildSystem.BuildStatic();
}
