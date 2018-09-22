const fs = require('fs-extra');
const {promisify} = require('util');
/**
 *
 * @type {{
		constants : object,
        Stats : Promise<*>,
        F_OK : number,
        R_OK : number,
        W_OK : number,
        X_OK : number,
        access : Promise<*>,
        exists : Promise<*>,
        readFile : Promise<*>,
        close : Promise<*>,
        open : Promise<*>,
        read : Promise<*>,
        write : Promise<*>,
        rename : Promise<*>,
        truncate : Promise<*>,
        ftruncate : Promise<*>,
        rmdir : Promise<*>,
        fdatasync : Promise<*>,
        fsync : Promise<*>,
        mkdir : Promise<*>,
        readdir : Promise<*>,
        fstat : Promise<*>,
        lstat : Promise<*>,
        stat : Promise<*>,
        readlink : Promise<*>,
        symlink : Promise<*>,
        link : Promise<*>,
        unlink : Promise<*>,
        fchmod : Promise<*>,
        chmod : Promise<*>,
        fchown : Promise<*>,
        chown : Promise<*>,
        _toUnixTimestamp : Promise<*>,
        utimes : Promise<*>,
        futimes : Promise<*>,
        writeFile : Promise<*>,
        appendFile : Promise<*>,
        watch : Promise<*>,
        watchFile : Promise<*>,
        unwatchFile : Promise<*>,
        realpath : Promise<*>,
        mkdtemp : Promise<*>,
        copyFile : Promise<*>,
        lutimes : Promise<*>,
        lchown : Promise<*>,
        lchmod : Promise<*>,
        gracefulify : Promise<*>,
        copy : Promise<*>,
        emptyDir : Promise<*>,
        emptydir : Promise<*>,
        createFile : Promise<*>,
        ensureFile : Promise<*>,
        createLink : Promise<*>,
        ensureLink : Promise<*>,
        createSymlink : Promise<*>,
        ensureSymlink : Promise<*>,
        readJson : Promise<*>,
        writeJson : Promise<*>,
        outputJson : Promise<*>,
        outputJSON : Promise<*>,
        writeJSON : Promise<*>,
        readJSON : Promise<*>,
        mkdirs : Promise<*>,
        mkdirp : Promise<*>,
        ensureDir : Promise<*>,
        move : Promise<*>,
        outputFile : Promise<*>,
        pathExists : Promise<*>,
        remove : Promise<*> }}
 */
const fileSystemPromises = {};

for (let prop of Object.keys(fs)) {

	if (prop.includes('Sync') || prop.includes('Stream')) {
		fileSystemPromises[prop] = fs[prop];
		continue;
	}

	fileSystemPromises[prop] = typeof fs[prop] === 'function' ? promisify(fs[prop]) : fs[prop];
}

module.exports = fileSystemPromises;
