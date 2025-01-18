export async function getStatistics(date: Date) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('getStatistics', date)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
