import { Item } from '../../../../types'

export async function getAllItems() {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('getAllItems')
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function deleteItem(itemId: number) {
  console.log('asd', itemId)
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('deleteItem', itemId)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function updateItem(item: Item) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('updateItem', item)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function createItem(item: Item) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('createItem', item)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
