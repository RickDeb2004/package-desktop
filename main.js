const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      nodeIntegration: false, // Change to false for security
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("https://package-desktop.vercel.app/");
};

// When the app is ready, create the window
app.on("ready", () => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  // Remove window from memory on close
  win.on("closed", () => (win = null));
});
