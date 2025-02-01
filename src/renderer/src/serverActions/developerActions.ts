export async function createDummyDb() {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('createDummyDb')
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function testIpc() {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('test')

    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function migrateDB() {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('migrateDB')

    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function writeToDB() {
  try {
    await window.electronAPI.ipcRenderer.invoke('writeDB')
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
