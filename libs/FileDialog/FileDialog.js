const {dialog} = require('electron');
const {
	FILTERS_DEFAULT,
	TITLE_DEFAULT
} = require('./constants');


class FileDialog {
	constructor ({window}) {
		this._window = window;
		this._dialog = dialog;
	}

	/**
	 *
	 * @param {Boolean} openFile позволяет выбирать файлы.
	 * @param {Boolean} openDirectory позволяет выбирать папки
	 * @param {Boolean} multiSelections позволяет выбрать несколько объектов.
	 * @param {Boolean} showHiddenFiles
	 * @param {String} title
	 * @param {string} defaultPath
	 * @param {[]} properties
	 * @param {[{name: string, extensions : [String]}]} filters
	 *
	 * @returns {Promise<string|null>}
	 */
	pathSelectOpen ({
		openFile = true,
		openDirectory = false,
		multiSelections = false,
		showHiddenFiles = false,
		title = TITLE_DEFAULT,
		filters = FILTERS_DEFAULT,
		defaultPath,
        properties = []
	}) {
		return new Promise(ok=> {
			const paths = this._dialog.showOpenDialog(
				this._window,
				{openFile, openDirectory, multiSelections, showHiddenFiles, title, filters, defaultPath, properties},
			);

			if (!paths || !paths.length) return ok(null);

			ok(paths.shift());
		});
	}

	/**
	 *
	 * @param {String} title
	 * @param {string} defaultPath
	 * @param {[{name: string, extensions : [String]}]} filters
	 * @param {String} message macOS - Message to display above text fields.
	 * @param {String} nameFieldLabel macOS - Custom label for the text displayed in front of the filename text field.
	 * @param {Boolean} showsTagField macOS - Show the tags input box, defaults to true.
	 * @param {Boolean} securityScopedBookmarks masOS mas - Create a security scoped bookmark when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.
	 *
	 * @returns {Promise<string|*>}
	 */
	pathSelectSave ({
			title = TITLE_DEFAULT,
			filters = FILTERS_DEFAULT,
			defaultPath,
			message,
			nameFieldLabel,
			showsTagField,
			securityScopedBookmarks
    }) {
		return new Promise(ok=> {
			ok(this._dialog.showSaveDialog(
				this._window,
				{title, filters, defaultPath, message, nameFieldLabel, showsTagField, securityScopedBookmarks},
			));
		});
	}
}

module.exports = FileDialog;
