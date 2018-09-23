
class TdoGClass {
	static get types () {
		return {
			node    : 'node',
			unknown : 'unknown'
		}
	}

	constructor({name, version, type, fileId, desc}) {
		if (!Object.values(TdoGClass.inludes(type))) type = TdoGClass.types.unknown;

		this._name    = name;
		this._version = version || '0.0.1';
		this._fileId  = fileId || null;
		this._type    = type;
		this._desc    = desc || '';
	}

	get dataCreate () {
		return {
			name    : this._name,
			version : this._version,
			type    : this._type,
			desc    : this._desc
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
