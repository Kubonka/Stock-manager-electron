import { Category } from '../../../../types'

export async function getAllCategories() {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('getAllCategories')

    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
  //return 2
}
export async function createCategory(categoryData: Category) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('createCategory', categoryData)

    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function deleteCategory(category: Category) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('deleteCategory', category)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function updateCategory(categoryData: Category) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('updateCategory', categoryData)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
