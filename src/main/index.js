'use strict'

import { app, BrowserWindow, Menu } from 'electron'
import { menu } from './menu'
import { autoUpdater, DOWNLOAD_PROGRESS, UPDATE_DOWNLOADED } from 'electron-updater'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')

  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
function sendStatusToWindow (messageBundle) {
  console.log(messageBundle)
  mainWindow.webContents.send('message', messageBundle)
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})

autoUpdater.on('update-available', (info) => {
  sendStatusToWindow({key: 'update-available', value: info})
})

autoUpdater.on(DOWNLOAD_PROGRESS, (progress) => {
  sendStatusToWindow({key: DOWNLOAD_PROGRESS, value: progress})
})

autoUpdater.on(UPDATE_DOWNLOADED, () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') {
    autoUpdater.checkForUpdates()
      .then(a => {
        sendStatusToWindow(a)
      })
  }
})
