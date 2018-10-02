const FileDialog = require('./FileDialog');
const {
	FILTERS_DEFAULT,
	TITLE_DEFAULT
} = require('./constants');

/**
 * @type {FileDialog |null}
 */
let dialog = null;

const checkInit = () => {
	if (!dialog) throw new Error('No init dialog');
};

class Dialog {
	static init({window}) {
		dialog  = new FileDialog({window});

		return this;
	}

	static open({
		            openFile = true,
		            openDirectory = false,
		            multiSelections = false,
		            showHiddenFiles = false,
		            title = TITLE_DEFAULT,
		            filters = FILTERS_DEFAULT,
		            defaultPath,
		            properties = []
	            }) {
		checkInit();

		return dialog.pathSelectOpen({openFile, openDirectory, multiSelections, showHiddenFiles, title, filters, defaultPath, properties});
	}

	static save ({
		             title = TITLE_DEFAULT,
		             filters = FILTERS_DEFAULT,
		             defaultPath,
		             message,
		             nameFieldLabel,
		             showsTagField,
		             securityScopedBookmarks
	             }) {
		checkInit();

		return dialog.pathSelectSave({title, filters, defaultPath, message, nameFieldLabel, showsTagField,securityScopedBookmarks});

	}
}

module.exports = Dialog;

