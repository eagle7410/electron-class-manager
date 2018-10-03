const fsep = require('./fsep');

const npmFrame = {
	name: "__NAME__",
	version: "1.0.0",
	description: "__DESCRIPTION__",
	scripts: {test: "echo \"Error: no test specified\" && exit 1"},
	repository: {type: "git",url: "git+https://github.com/eagle7410/__REPOSITORY__.git"},
	author: "Igor Stcherbina <verycooleagle@gmail.com> (http://github.com/eagle7410)",
	license: "MIT",
	dependencies: {},
	bugs: {url: "https://github.com/eagle7410/__REPOSITORY__/issues"},
	homepage: "https://github.com/eagle7410/__REPOSITORY__#readme"
};

class NpmMixer {
	constructor () {
		this._npm     = null;
		this._baseDir = null;
	}

	init({npm, baseDir}) {
		this._npm     = npm;
		this._baseDir = baseDir;

		return this;
	}

	async writeMix() {
		const packagePath = `${this._baseDir}/package.json`;
		let report = [];
		let packageContent = Object.assign({}, npmFrame);

		try {
			if (await fsep.pathExists(packagePath)) {
				delete require.cache[packagePath];
				packageContent = require(packagePath);
			}

			if(!packageContent.hasOwnProperty('dependencies')) {
				packageContent.dependencies = Object.assign({}, this._npm);
				report.push("Add all npm dependencies --> Ok");
			} else {
				for (let [name, version] of Object.entries(this._npm)) {

					if (packageContent.dependencies.hasOwnProperty('name')) {
						report.push(`Not add npm ${name}@${version} --> WARN: package has this dependency`);
						continue;
					}

					packageContent.dependencies[name] = version;
					report.push(`Add npm ${name} dependency --> Ok`);
				}
			}

			await fsep.writeFile(packagePath, JSON.stringify(packageContent, null, '  '));
			report.push(`Rewrite package --> Ok`);

		} catch (e) {
			console.error(e);

		}

		return report;
	}
}

module.exports = NpmMixer;
