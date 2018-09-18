const STORE_LABEL = 'store';
const store = localStorage;

class LocalStore {
	constructor (name) {
		this.name = name;
	}

	get itemName () {
		return `${STORE_LABEL}_${this.name}`;
	}

	/**
	 *
	 * @param {array} data
	 */
	save(data) {

		if (!Array.isArray(data)) throw new Error('Api save not array');

		store.setItem(this.itemName, JSON.stringify(data));
	}

	/**
	 *
	 * @return {Promise<Array>}
	 */
	async getAll() {
		try {
			const data = store.getItem(this.itemName);

			return data ? JSON.parse(data) : [];

		} catch (e) {
			throw e;
		}
	}

	/**
	 *
	 * @param {object} data
	 * @return {Promise<object>}
	 */
	async add(data) {
		try {
			data = { id: Date.now(), ...data};
			let store = await this.getAll();
			store.push(data);

			this.save(store);

			return data;

		} catch (e) {
			throw e;
		}
	}

	async update(data) {
		const store = await this.getAll();
		this.save(store.map(run => data.id === run.id ? data : run));
	}

	async deleteById(id) {
		const store = await this.getAll();

		this.save(store.filter(run => run.id !== id));

		return true;
	}

}

export default LocalStore;
