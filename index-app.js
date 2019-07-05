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
		let mainWindow = new BrowserWindow({});
		await Server.run(mainWindow);
		
		mainWindow.maximize();
		mainWindow.loadURL(`file://${__dirname}/html/index.html`);
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
