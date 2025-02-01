import { join } from 'path'
import { CartItem, Category, Item, Sale, SaleItem } from '../../../types'
import prisma from '../db/db'
import { promises as fs } from 'fs'
import categories from './categories.json'
import sales from './sales.json'
import items from './items.json'
//import { createReadStream } from 'fs'
//import { parser } from 'stream-json'
//import { streamArray } from 'stream-json/streamers/StreamArray'
//!
//expirationDate DateTime @default(now())
//expirationAlert Int
//
export default class DBMigrator {
  constructor() {}
  public async init() {
    //volcar toda la database a un json
    const allCategories: Category[] = await prisma.category.findMany()
    const allItems: Item[] = await prisma.item.findMany()
    const allSaleItems: SaleItem[] = await prisma.sale_Item.findMany()
    const allSales: Omit<Sale, 'items'>[] = await prisma.sale.findMany()
    await this.saveArrayToJsonFile(allCategories, join(__dirname, 'categories.json'))
    await this.saveArrayToJsonFile(allItems, join(__dirname, 'items.json'))
    await this.saveArrayToJsonFile(allSaleItems, join(__dirname, 'saleItems.json'))
    await this.saveArrayToJsonFile(allSales, join(__dirname, 'sales.json'))
  }
  private async saveArrayToJsonFile(data: unknown[], filePath: string): Promise<void> {
    try {
      const jsonString = JSON.stringify(data, null, 2)
      await fs.writeFile(filePath, jsonString, 'utf-8')
      console.log(`File successfully saved to: ${filePath}`)
    } catch (error) {
      console.error('An error occurred while saving the file:', error)
      throw error
    }
  }
  public async writeToDB() {
    for (let i = 0; i < categories.length; i++) {
      const { id, ...rest } = categories[i]
      await prisma.category.create({ data: { ...rest } })
    }
    console.log('DONE1')
    for (let i = 0; i < items.length; i++) {
      const { id, ...rest } = items[i]
      await prisma.item.create({ data: { ...rest } })
    }
    console.log('DONE2')
    await this.createSales()
    //for (let i = 0; i < sales.length; i++) {
    //  const { id, ...rest } = sales[i]
    //  await prisma.sale.create({ data: { ...rest } })
    //}
    console.log('DONE3')
    // const saleItems: SaleItem[] = JSON.parse(
    //   await fs.readFile('src/main/db/saleItems.json', 'utf-8')
    // )
    // for (let i = 0; i < saleItems.length; i++) {
    //   setTimeout(() => {}, 50)
    //   const { id, ...rest } = saleItems[i]
    //   await prisma.sale_Item.create({ data: { ...rest } })
    // }
    //await this.processSaleItemsStream('src/main/db/saleItems.json')
    console.log('DONE4')
  }
  private async generateCartItems(saleId: number): Promise<CartItem[] | void> {
    try {
      const result: CartItem[] = []
      const saleItems: SaleItem[] = JSON.parse(
        await fs.readFile('src/main/db/saleItems.json', 'utf-8')
      )
      const filtered = saleItems.filter((saleItem) => saleItem.saleId === saleId)
      for (let i = 0; i < filtered.length; i++) {
        const saleItem = filtered[i]
        const item = (await prisma.item.findUnique({ where: { id: saleItem.itemId } })) as Item
        const cartItem: CartItem = {
          ...item,
          count: saleItem.count,
          subTotal: saleItem.subTotal,
          listId: saleItem.listId
        }
        result.push(cartItem)
      }
      return result
    } catch (error) {
      return console.log(error)
    }
  }
  public async createSales(): Promise<void> {
    try {
      for (let i = 0; i < sales.length; i++) {
        console.log('i:', i)
        const sale = sales[i]
        const cartItems: CartItem[] = (await this.generateCartItems(sale.id)) as CartItem[]
        const saleItems = cartItems.map((item) => ({
          subTotal: item.subTotal,
          count: item.count,
          listId: item.listId,
          item: { connect: { id: item.id } }
        }))
        await prisma.sale.create({
          data: {
            active: true,
            date: sale.date,
            totalPrice: saleItems.reduce((prev, curr) => {
              return prev + curr.subTotal
            }, 0),
            saleItems: {
              create: saleItems
            }
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  // private async processSaleItemsStream(filePath: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const saleItemStream = createReadStream(filePath).pipe(parser()).pipe(streamArray())

  //     saleItemStream.on('data', async ({ value }) => {
  //       const { id, ...rest } = value as SaleItem
  //       try {
  //         await prisma.sale_Item.create({ data: { ...rest } })
  //         console.log(id)
  //       } catch (error) {
  //         console.error('Error inserting SaleItem:', error)
  //         saleItemStream.destroy(error)
  //       }
  //     })

  //     saleItemStream.on('end', () => {
  //       console.log('Finished processing SaleItems')
  //       resolve()
  //     })

  //     saleItemStream.on('error', (error) => {
  //       console.error('Error while streaming JSON:', error)
  //       reject(error)
  //     })
  //   })
  // }
}
