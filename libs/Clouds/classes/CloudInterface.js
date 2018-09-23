
class CouldInterface {
	constructor () {
		this._isConnected = false;
	}

	/**
	 *
	 * @param data
	 * @return {Promise<void>}
	 */
	async folderCreate (data) {}

	/**
	 *
	 * @param data
	 * @return {Promise<void>}
	 */
	async deleteById (data) {}

	/**
	 *
	 * @param data
	 *
	 * @return {Promise<void>}
	 */
	async findByQuery (data) {}

	/**
	 *
	 * @param data
	 * @return {Promise<void>}
	 */
	async findByName (data) {}

	/**
	 *
	 * @param data
	 * @return {Promise<void>}
	 */
	async updateById (data) {}

	/**
	 *
	 * @param data
	 * @return {Promise<void>}
	 */
	async copyFromCloudByFileId (data) {}

	/**
	 *
	 * @param data
	 * @return {Promise<void>}
	 */
	async copyToCloud (data) {}

	get isConnected () {
		return this._isConnected;
	}

	set params (data) {}
}
module.exports = CouldInterface;

