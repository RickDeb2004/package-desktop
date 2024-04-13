const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("https://package-desktop.vercel.app/");
};

app.on("ready", () => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  win.on("closed", () => (win = null));
});
