class TdoConnect {
	constructor ({alias, label, isHasConfig, isInit, drive}) {
		this._alias       = alias;
		this._label       = label;
		this._isHasConfig = isHasConfig;
		this._isInit      = isInit;
		this._drive       = drive;
	}

	get drive () {
		return this._drive;
	}

	get config() {
		return {
			alias       : this._alias,
			label       : this._label,
			isHasConfig : this._isHasConfig,
			isInit      : this._isInit,
		};
	}
}

module.exports = TdoConnect;
