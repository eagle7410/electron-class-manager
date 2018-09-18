
class ioClient {}

const EVENT_WINDOW = 'event_socket';

class SocketConnect {
	constructor () {
		this._url     = null;
		this._path    = '\\';
		this._query   = {};
		this._label   = 'NO NAME';
		this._connect = null;
	}

	connected (data) {
		const self = this;
		const {url, path, query, label} = data || {};

		self._url    = url;
		self._path   = path  ||  '\\';
		self._query  = query || {};
		self._label  = label || 'NO NAME';

		self._connect = ioClient(self._url, {
			path: self._path,
			query :self._query
		});

		self._connect.onAny = (event, data) => self._emitEventToWindow(event, data);

		return new Promise((ok,bad) => {
			try {

				self._connect.on('connect', () => {
					ok(self._connect.id)
				});

				setTimeout(() => {
					if (!self._connect.connected) self._connect.disconnect();
					bad(new Error('Connect time over'))
				}, 2000);

			} catch (e) {
				bad(e);
			}
		});
	}

	/**
	 * Dispatch window custom event.
	 *
	 * @param {string} event
	 * @param {*} data
	 *
	 * @private
	 */
	_emitEventToWindow (event, data) {
		const detail = {event, data, label: this._label};

		window.dispatchEvent(
			new CustomEvent(SocketConnect.customWindowEvent(),
			{detail},
			window
			)
		);
	}

	static customWindowEvent () {
		return EVENT_WINDOW;
	}

	emit (event, data) {
		this._connect.emit(event, data || {});
	}

	async disconnect () {
		if (this._connect) this._connect.disconnect();

		return true;
	}

}

export default SocketConnect;
