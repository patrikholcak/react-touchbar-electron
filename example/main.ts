import { BrowserWindow, app } from "electron";
import { join } from "path";
import { decorateWindow } from "../src/decorate-window";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  decorateWindow(mainWindow);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.setMenu(null);
  mainWindow.loadURL("http://localhost:1234");
});

app.on("window-all-closed", app.quit);
