
class TdoGClass {
	static get types () {
		return {
			node    : 'node',
			unknown : 'unknown'
		}
	}

	constructor({name, version, type, fileId, desc, npm, classes, path}) {
		if (!Object.values(TdoGClass.types).includes(type)) type = TdoGClass.types.unknown;

		this._name    = name;
		this._version = version || '0.0.1';
		this._fileId  = fileId || null;
		this._path    = path || null;
		this._type    = type;
		this._npm     = npm || {};
		this._classes = classes || {};
		this._desc    = desc || '';

	}

	get dataCreate () {
		return {
			name    : this._name,
			version : this._version,
			type    : this._type,
			desc    : this._desc,
			npm     : this._npm,
			classes : this._classes,
			fileId  : this._fileId
		};
	}

	get dataForUpload() {

		return {
			pathLocal : this._path,
			fileName : `${this._name}_${this._version}`
		};
	}

	get fileId () {
		return this._fileId;
	}

	set fileId (fileId) {
		this._fileId = fileId;
	}
}

module.exports = TdoGClass;
