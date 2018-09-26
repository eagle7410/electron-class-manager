
const PATH_ROOT = __dirname;
const PATH_RUNTIME = `${PATH_ROOT}/runtime`;
const PATH_CONFIGS = `${PATH_RUNTIME}/configs`;

const PATHS = {
	PATH_ROOT,
	PATH_RUNTIME,
	PATH_CONFIGS
};

const QUERY_PATHS = {
	cloudUpload : '/cloud-upload',
	connected : '/cloud-connected',
	appInit  : '/init',
	pathOpen : '/path-open',
	pathSave : '/path-save',
	accessFileSave : '/access-file-save',
};

module.exports = {
	QUERY_PATHS,
	PATHS
};

