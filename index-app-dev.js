process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Server        = require('./Server');
const MainMenu      = require('./MainMenu');
const Environment   = require('./libs/Environment');
const fsep          = require('./libs/fsep');

const EnvironmentProps = Environment.getProps();

const includes = async () => {

	try {
		//~ Dev setting
		Environment.setConfigProp(EnvironmentProps.isDev, true);

		await fsep.copyFile(`${__dirname}/constants.js`, `${__dirname}/front/src/const/constants.js`);

		const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

		await installExtension(REACT_DEVELOPER_TOOLS);
		await installExtension(REDUX_DEVTOOLS);

		//~ End dev setting

		let mainWindow = new BrowserWindow({});

		await Server.run(mainWindow);

		//~ Dev setting

		mainWindow.toggleDevTools();

		//~ End dev setting

		mainWindow.maximize();
		mainWindow.loadURL('http://localhost:3000/');

		mainWindow.on('closed', () => {
			mainWindow = null;
			app.quit();
		});

		MainMenu.addTo(app);

	} catch (err) {
		console.log('Error: ', err);
	}
};

app.on('ready', includes);
