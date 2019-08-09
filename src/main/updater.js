import { ipcMain } from 'electron'
import {
  autoUpdater,
  DOWNLOAD_PROGRESS,
  UPDATE_DOWNLOADED,
} from 'electron-updater'
import { sendStatusToWindow } from '../background'

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})

autoUpdater.on('update-available', info => {
  sendStatusToWindow({ key: 'update-available', value: info })
})

autoUpdater.on(DOWNLOAD_PROGRESS, progress => {
  sendStatusToWindow({ key: DOWNLOAD_PROGRESS, value: progress })
})

autoUpdater.on(UPDATE_DOWNLOADED, () => {
  console.log('update downloaded')
  autoUpdater.quitAndInstall()
})

autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow({ key: 'Error in auto-updater.', value: err })
})

ipcMain.on('checkUpdate', (event, arg) => {
  console.log(arg)
  checkUpdate()
})

export function checkUpdate() {
  console.log('start check')
  autoUpdater.checkForUpdates().then(a => {
    sendStatusToWindow(a)
  })
}

export function registerUpdaterTask() {
  checkUpdate()
  setInterval(() => {
    checkUpdate()
  }, 2 * 60 * 60 * 1000)
}
