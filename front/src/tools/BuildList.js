
class BuildList {
	constructor() {
		this.init();
	}

	set list (list) {
		let buffer;

		for(let {fileId, npm, name, version, classes, ext} of list ) {
			name    = name.trim();
			version = version.trim();

			this._addFile({fileId, name, version, classes, ext});

			for(let [moduleName, moduleVersion] of Object.entries(npm) ) {
				moduleName    = moduleName.trim();
				moduleVersion = moduleVersion.trim();

				if (!this._npm[moduleName]) {
					this._npm[moduleName] = moduleVersion;
					continue;
				}


				if (
						this._npm[moduleName] === moduleVersion ||
						(
							Array.isArray(this._npm[moduleName]) &&
							this._npm[moduleName].includes(moduleVersion)
						)
					)
					continue;

				buffer = Array.isArray(this._npm[moduleName])
					? this._npm[moduleName]
					: [this._npm[moduleName]];

				this._npm[moduleName] = [...buffer, moduleVersion];
			}
		}
	}

	init () {
		this._npm    = {};
		this._files  = [];
		this._isLoad = false;

		return this;
	}


	removeFileByFileId (fileId) {
		this._files = this._files.filter(file => file.fileId !== fileId);
	}

	_addFile({fileId, name, version, classes, ext}) {
		this._files.push({fileId, name, version, classes, ext});
	}

	stateLoad (isStateLoad) {
		this._isLoad = isStateLoad;

		return this.state;
	}

	get state () {
		return {
			problems : this.problems,
			isHasProblems : this.isHasProblems,
			files : this.files,
			npm : this.npm,
			isLoad : this._isLoad
		}
	}
	get problems () {
		let problems = [],
			buffers = {};

		for(let [moduleName, moduleVersion] of Object.entries(this._npm) )
			if(Array.isArray(moduleVersion))
				problems.push({message : `Npm ${moduleName} package has different version`});

		for(let {name} of this._files )
			buffers[name] = buffers.hasOwnProperty(name) ? buffers[name] + 1 : 0;

		const duplicates = Object.entries(buffers)
			.filter(([name, count]) => count)
			.map(([name]) => name);

		if (duplicates.length)
			problems.push({message : `Classes ${duplicates.map(cl => `"${cl}"`).join(', ')} have different version`});

		if(this.isEmptyFiles)
			problems.push({message : `File list empty`});

		return problems;
	}

	get isEmptyFiles () {
		return !this._files.length;
	}

	get isHasProblems () {
		return this.problems.length;
	}

	get files () {
		return this._files;
	}

	get npm () {
		return this._npm;
	}

	set npm (obj) {
		this._npm = obj;
	}
}

export default BuildList;

