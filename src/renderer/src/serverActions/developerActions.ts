export async function createDummyDb() {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('createDummyDb')
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
