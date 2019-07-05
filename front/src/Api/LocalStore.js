const store = localStorage;

class LocalStore {
	static setItem (name, value) {
		store.setItem(name, value);
	}
	static getItem (name) {
		return store.getItem(name);
	}
}

export default LocalStore;
