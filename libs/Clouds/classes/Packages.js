
class Packages {
	static get fileName () {
		return 'packages.json'
	}

	constructor() {
		this._id       = null;
		this._mimeType = null;
		this._data     = [];
	}

	set info({id, mimeType}) {
		this._id = id || null;
		this._mimeType = mimeType || null;
	}

	get fileId () {
		return this._id;
	}

	get isInit () {
		return this._id !== null;
	}

	save (data) {
		let edit = this._data.find(pack => pack.id === data.id);

		if (edit) {
			for (const [key, val] of Object.entries(data)) {
				edit[key] = val
			}
		} else {
			this._data.push(data);
		}
	}

	remove (id) {
		this._data = this._data.filter(d => d.id !== id);
	}

	update (data) {
		this._data = this._data.map(d => {
			if (d.id === data.id) {
				d = {...data};
			}

			return d;
		})
	}

	get data () {
		return this._data;
	}

	set data (googleContent) {
		this._data = googleContent.packages;
	}

	get body () {
		return JSON.stringify({packages: this._data}, null, '\t');
	}
}

module.exports = Packages;
