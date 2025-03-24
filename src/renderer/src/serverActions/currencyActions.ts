export async function getExchangeValue() {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('getExchangeValue')
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function setExchangeValue(value: number) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('setExchangeValue', value)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
