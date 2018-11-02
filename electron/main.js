const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

/**
 * @name createWindow
 * @return {undefined}
 */
function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 800,
		height: 600
	});

	const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
	const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
	const isDev = isEnvSet ? getFromEnv : !app.isPackaged;
	console.info(`app running in ${isDev ? 'development': 'production'} mode`);

	const startUrl = process.env.ELECTRON_START_URL || url.format({
		pathname: path.join(__dirname, '/../build/index.html'),
		protocol: 'file:',
		slashes: true
	});
	console.info(`startUrl is ${startUrl}`);
	win.loadURL(startUrl);

	// Emitted when the window is closed.
	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (win === null) {
		createWindow();
	}
});
