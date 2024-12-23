// export async function getAllCategories() {
//   try {
//     const res = await window.electronAPI.ipcRenderer.invoke('getAllCategories')
//     return res
//   } catch (error) {
//     console.error('Error communicating with main process:', error)
//   }
//   //return 2
// }
export async function createSale(cartItems: CartItem[]) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('createSale', cartItems)

    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
export async function getSalesByDay(day: Date) {
  try {
    const res = await window.electronAPI.ipcRenderer.invoke('getSalesByDay', day)
    return res
  } catch (error) {
    console.error('Error communicating with main process:', error)
  }
}
// export async function getSale(day:Date) {
//   try {
//     const res = await window.electronAPI.ipcRenderer.invoke('getSale',day)
//     return res
//   } catch (error) {
//     console.error('Error communicating with main process:', error)
//   }
// }
