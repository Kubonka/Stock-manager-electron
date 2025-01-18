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
    console.log(res)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
