
const CLOUD_DEFAULT_ROOT_FOLDER_NAME = 'ClassStore';
const CLOUD_FILE_NAME_CONFIG      = 'config.json';
const CLOUD_FILE_NAME_CLASS_STORE = 'Classes';

const PATH_ROOT = __dirname;
const PATH_RUNTIME = `${PATH_ROOT}/runtime`;
const PATH_CONFIGS = `${PATH_RUNTIME}/configs`;

const PATHS = {
	PATH_ROOT,
	PATH_RUNTIME,
	PATH_CONFIGS
};

const QUERY_PATHS = {
	cloudDownload  : '/cloud-download',
	cloudUpload    : '/cloud-upload',
	packageDeploy  : '/package-deploy',
	packageSave    : '/package-save',
	packageMove    : '/package-move',
	connected      : '/cloud-connected',
	appInit        : '/init',
	pathOpen       : '/path-open',
	pathSave       : '/path-save',
	accessFileSave : '/access-file-save',
};

module.exports = {
	CLOUD_DEFAULT_ROOT_FOLDER_NAME,
	CLOUD_FILE_NAME_CONFIG,
	CLOUD_FILE_NAME_CLASS_STORE,
	QUERY_PATHS,
	PATHS
};

