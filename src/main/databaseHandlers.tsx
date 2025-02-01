import { ipcMain } from 'electron'
import CategoryRepo from './db/repo/CategoryRepo'
import ItemRepo from './db/repo/ItemRepo'
import SaleRepo from './db/repo/SaleRepo'
//import DummyDb from './db/DummyDb'
import DBMigrator from './db/DBMigrator'

export default function databaseHandlers(): void {
  //*CATEGORY
  ipcMain.handle('getAllCategories', async (_, __) => {
    return CategoryRepo.getInstance().getAll()
  })
  ipcMain.handle('createCategory', async (_, args) => {
    return CategoryRepo.getInstance().create(args)
  })
  ipcMain.handle('updateCategory', async (_, args) => {
    return CategoryRepo.getInstance().update(args)
  })
  ipcMain.handle('deleteCategory', async (_, args) => {
    return CategoryRepo.getInstance().delete(args)
  })
  //*ITEM
  ipcMain.handle('createItem', async (_, args) => {
    return ItemRepo.getInstance().create(args)
  })
  ipcMain.handle('updateItem', async (_, args) => {
    return ItemRepo.getInstance().update(args)
  })
  ipcMain.handle('deleteItem', async (_, args) => {
    return ItemRepo.getInstance().delete(args)
  })
  ipcMain.handle('getAllItems', async (_, __) => {
    return ItemRepo.getInstance().getAll()
  })
  //*SALE
  ipcMain.handle('createSale', async (_, args) => {
    return SaleRepo.getInstance().create(args)
  })
  ipcMain.handle('deleteSale', async (_, args) => {
    return SaleRepo.getInstance().delete(args)
  })
  ipcMain.handle('getSalesByDay', async (_, args) => {
    return SaleRepo.getInstance().getByDay(args)
  })
  //*STATISTICS
  ipcMain.handle('getStatistics', async (_, args) => {
    return SaleRepo.getInstance().getStatistics(args)
  })
  //*DEVELOPER
  // ipcMain.handle('createDummyDb', async (_, __) => {
  //   return new DummyDb()
  // })
  ipcMain.handle('test', async (_, __) => {
    return '2'
  })
  ipcMain.handle('migrateDB', async (_, __) => {
    const dbMigrator = new DBMigrator()
    await dbMigrator.init()
  })
  ipcMain.handle('writeDB', async (_, __) => {
    const dbMigrator = new DBMigrator()
    await dbMigrator.writeToDB()
  })
}
