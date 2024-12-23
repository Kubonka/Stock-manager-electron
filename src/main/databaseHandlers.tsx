import { ipcMain } from 'electron'
import CategoryRepo from './db/repo/CategoryRepo'
import ItemRepo from './db/repo/ItemRepo'
import SaleRepo from './db/repo/SaleRepo'
import DummyDb from './db/DummyDb'

export default function databaseHandlers(): void {
  //*CATEGORY
  ipcMain.handle('getAllCategories', async (event, args) => {
    return CategoryRepo.getInstance().getAll()
  })
  ipcMain.handle('createCategory', async (event, args) => {
    return CategoryRepo.getInstance().create(args)
  })
  ipcMain.handle('updateCategory', async (event, args) => {
    return CategoryRepo.getInstance().update(args)
  })
  ipcMain.handle('deleteCategory', async (event, args) => {
    return CategoryRepo.getInstance().delete(args)
  })
  //*ITEM
  ipcMain.handle('createItem', async (event, args) => {
    console.log('create')
    return ItemRepo.getInstance().create(args)
  })
  ipcMain.handle('updateItem', async (event, args) => {
    return ItemRepo.getInstance().update(args)
  })
  ipcMain.handle('deleteItem', async (event, args) => {
    console.log('args', args)
    return ItemRepo.getInstance().delete(args)
  })
  ipcMain.handle('getAllItems', async (event, args) => {
    return ItemRepo.getInstance().getAll()
  })
  //*SALE
  ipcMain.handle('createSale', async (event, args) => {
    return SaleRepo.getInstance().create(args)
  })
  ipcMain.handle('deleteSale', async (event, args) => {
    return SaleRepo.getInstance().delete(args)
  })
  ipcMain.handle('getSalesByDay', async (event, args) => {
    return SaleRepo.getInstance().getByDay(args)
  })
  //*DEVELOPER
  ipcMain.handle('createDummyDb', async (event, args) => {
    return new DummyDb()
  })
}
