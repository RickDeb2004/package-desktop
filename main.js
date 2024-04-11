// const path = require('path');
// const { app, BrowserWindow, Menu, ipcMain } = require('electron');

// const isDev = process.env.NODE_ENV !== 'production';
// const isMac = process.platform === 'darwin';

// let mainWindow;

// // Function to create the main window
// function createMainWindow() {
//   mainWindow = new BrowserWindow({
//     width: isDev ? 1000 : 500,
//     height: 600,
//     icon: `${__dirname}/assets/icons/Icon_256x256.png`,
//     resizable: isDev,
//     webPreferences: {
//       nodeIntegration: false, // Change to false for security
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   });

//   // Load your React application
//   mainWindow.loadFile(path.join(__dirname, 'path_to_your_layout_jsx'));

//   // Show devtools in development mode
//   if (isDev) {
//     mainWindow.webContents.openDevTools();
//   }
// }

// // When the app is ready, create the window
// app.on('ready', () => {
//   createMainWindow();

//   // Create menu
//   const mainMenu = Menu.buildFromTemplate(menu);
//   Menu.setApplicationMenu(mainMenu);

//   // Remove window from memory on close
//   mainWindow.on('closed', () => (mainWindow = null));
// });

// // Menu template
// const menu = [
//   ...(isMac
//     ? [
//         {
//           label: app.name,
//           submenu: [
//             {
//               label: 'About',
//               click: () => {
//                 // Function to open About window
//               },
//             },
//           ],
//         },
//       ]
//     : []),
//   // Other menu items
// ];

// // Handle resize image event from renderer process
// ipcMain.on('image:resize', (e, options) => {
//   // Handle image resize
//   // You can call a function or handle resizing here
// });

// // Handle other IPC events as needed

// // Quit when all windows are closed, except on macOS
// app.on('window-all-closed', () => {
//   if (!isMac) app.quit();
// });

// // Open a window if none are open (macOS)
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createMainWindow();
//   }
// });

// console.log("Hello")

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

  win.loadFile(path.join(__dirname, "src", "app", "page.jsx"));
};

// When the app is ready, create the window
app.on("ready", () => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  // Remove window from memory on close
  win.on("closed", () => (win = null));
});
