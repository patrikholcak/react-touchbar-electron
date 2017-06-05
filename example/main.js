/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const devToolsInstaller = require('electron-devtools-installer');
const touchBarWrapper = require('../src/wrapper');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, '/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  devToolsInstaller.default([
    devToolsInstaller.REACT_DEVELOPER_TOOLS,
    devToolsInstaller.REDUX_DEVTOOLS
  ]);

  // mainWindow.webContents.openDevTools();
  mainWindow.setVibrancy('appearance-based');

  touchBarWrapper(mainWindow);
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/* eslint-enable flowtype/require-parameter-type, flowtype/require-return-type */
