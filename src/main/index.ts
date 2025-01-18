import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import databaseHandlers from './databaseHandlers'
import './db/db' // Ensures the database setup logic is executed
import log from 'electron-log'

// Optional: Initialize for renderer processes
log.initialize()

// Set log level for production
log.transports.file.resolvePathFn = () => join(app.getPath('userData'), 'logs/main.log')
log.transports.file.level = app.isPackaged ? 'info' : 'debug' // 'info' in production, 'debug' in dev
log.transports.console.level = app.isPackaged ? 'info' : 'debug'

// log.transports.file.level = 'info'; // Logs only 'info' and above
// log.transports.console.level = 'info'; // Also enable console logs if needed
// log.transports.file.resolvePathFn = () => join(app.getPath('userData'), 'logs/main.log');

// Catch unhandled errors and promises
log.errorHandler.startCatching()

// Optional: Start logging Electron events (useful for debugging crashes)
log.eventLogger.startLogging()

if (require('electron-squirrel-startup')) app.quit()
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false,
    autoHideMenuBar: true,
    title: 'La Juanita',
    ...(process.platform === 'linux' ? {} : {}),

    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.openDevTools({ mode: 'bottom' })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // !! ------------------------------ START !! -----------------------------------
  //!ARREGLAR EL INPUT DE CREAR PRODUCTO EN RENDERER

  databaseHandlers()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
