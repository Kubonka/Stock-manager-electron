import prisma from '../db/db'
import ItemRepo from './repo/ItemRepo'
import CategoryRepo from './repo/CategoryRepo'
import { CartItem, Category, Item } from '../../../types'

export default class DummyDB {
  categories: Category[] = []
  items: Item[] = []
  constructor() {
    this.initDb()
  }
  private async initDb() {
    this.categories = categories
    this.items = items
    await this.createCategories()
    await this.createItems()
    await this.createSales()
  } //
  private async createCategories() {
    const categoriesPromises = categories.map((category) =>
      CategoryRepo.getInstance().create(category)
    )
    await Promise.all(categoriesPromises)
  }
  private async createItems() {
    const itemsPromises = items.map((item) => ItemRepo.getInstance().create(item))
    await Promise.all(itemsPromises)
  }
  private async createSales() {
    //let baseDate = new Date('Mon Oct 01 2024 00:00:01 GMT-0300 (Argentina Standard Time)')
    const startOfMonth = new Date('2024-10-01T00:00:01Z') // Start of the month
    //! 5 compras por hora -> desde las 6 a las 24 (18) -> todos los dias (365)
    for (let day = 0; day < 150; day++) {
      const currentDay = new Date(startOfMonth)
      currentDay.setDate(startOfMonth.getDate() + day) // Ensure proper day calculation
      console.log('day :', day, 'currentDay :', currentDay)

      for (let hour = 0; hour < 23; hour++) {
        for (let saleByHour = 0; saleByHour < 3; saleByHour++) {
          const saleDate = new Date(currentDay) // Reset to the specific day
          saleDate.setHours(hour, 0, 0, 0) // Set hour specifically
          await this.createDummySale(saleDate)
        }
      }
    }
    // for (let day = 1; day <= 30; day++) {
    //   console.log('day :', day)
    //   for (let hour = 0; hour < 23; hour++) {
    //     for (let saleByHour = 0; saleByHour < 3; saleByHour++) {
    //       await this.createDummySale(new Date(baseDate))
    //     }
    //     baseDate = new Date(baseDate.getTime() + 3600000)
    //   }
    //   baseDate.setDate(baseDate.getDate() + 1)
    // }

    //!
    // for (let day = 0; day < 10; day++) {
    //   //const items = await this.generateCartItems(Math.floor(Math.random() * 45 + 2))
    //   //console.log('items', items)
    //   for (let i = 0; i < 45; i++) {
    //     await this.createDummySale(baseDate)
    //   }

    //   baseDate.setDate(baseDate.getDate() + 1)
    // }
  }
  private async createDummySale(baseDate: Date) {
    try {
      const cartItems = await this.generateCartItems(Math.floor(Math.random() * 15 + 2))
      const saleItemsData = cartItems.map((item) => ({
        subTotal: item.subTotal,
        count: item.count,
        listId: item.listId,
        item: { connect: { id: item.id } } // connecting the item via itemId
      }))

      // Calculate total price
      const totalPrice = cartItems.reduce((prev, curr) => prev + curr.count * curr.subTotal, 0)

      // Create sale with associated items
      await prisma.sale.create({
        data: {
          active: true,
          date: baseDate,
          totalPrice: totalPrice,
          saleItems: {
            create: saleItemsData // This creates multiple Sale_Item entries in the intermediate table
          }
        }
      })
      //!
      // for (let i = 0; i < salesToAdd.length; i++) {
      //   const saleToAdd = salesToAdd[i]

      //   const saleItems = saleToAdd.items.map((item) => ({
      //     subTotal: item.subTotal,
      //     count: item.count,
      //     listId: item.listId,
      //     item: { connect: { id: item.id } }
      //   }))
      //   console.log('saleItems[0].count', saleItems[0].count)
      //   await prisma.sale.create({
      //     data: {
      //       active: true,
      //       date: saleToAdd.date,
      //       totalPrice: saleToAdd.totalPrice,
      //       saleItems: {
      //         create: saleItems
      //       }
      //     }
      //   })
      // }
    } catch (error) {
      console.error(error)
    }
  }
  private async generateCartItems(itemsToAdd: number): Promise<CartItem[]> {
    const allItems = await prisma.item.findMany({ where: { active: true } })
    const result: CartItem[] = []
    for (let i = 0; i < itemsToAdd; i++) {
      const rndPos = Math.floor(Math.random() * 19 + 1)
      const rndItem: Item = allItems.find((i) => i.id === rndPos) as Item

      const count = Math.floor(Math.random() * 3 + 1)
      const newCartItem: CartItem = {
        ...rndItem,
        count: count,
        listId: itemsToAdd + 1,
        subTotal: count * rndItem.sellPrice
      }
      result.push(newCartItem)
    }
    return result
  }
}

// const salesEsqueleton: Sale[] = [
//   {
//     active: true,
//     id: 1,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 2,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 3,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 4,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 5,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 6,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 7,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 8,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 9,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 10,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 11,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 12,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 13,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 14,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 15,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 16,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 17,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 18,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 19,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   },
//   {
//     active: true,
//     id: 20,
//     totalPrice: 2000,
//     date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
//     items: []
//   }
// ]

const categories: Category[] = [
  {
    id: 0,
    active: true,
    name: 'category 1'
  },
  {
    id: 0,
    active: true,
    name: 'category 2'
  },
  {
    id: 0,
    active: true,
    name: 'category 3'
  },
  {
    id: 0,
    active: true,
    name: 'category 4'
  },
  {
    id: 0,
    active: true,
    name: 'category 5'
  }
]
const items: Item[] = [
  {
    id: 0,
    active: true,
    description: 'item-1',
    ean: '7790895000991',
    sellPrice: 10,
    buyPrice: 0,
    stock: 2,
    lowStock: 1,
    categoryId: 1
  },
  {
    id: 0,
    active: true,
    description: 'item-2',
    ean: '7790895000992',
    sellPrice: 20,
    buyPrice: 0,
    stock: 3,
    lowStock: 1,
    categoryId: 2
  },
  {
    id: 0,
    active: true,
    description: 'item-3',
    ean: '7790895000993',
    sellPrice: 30,
    buyPrice: 0,
    stock: 4,
    lowStock: 5,
    categoryId: 3
  },
  {
    id: 0,
    active: true,
    description: 'item-4',
    ean: '7790895000994',
    sellPrice: 40,
    buyPrice: 0,
    stock: 5,
    lowStock: 5,
    categoryId: 4
  },
  {
    id: 0,
    active: true,
    description: 'item-5',
    ean: '7790895000995',
    sellPrice: 50,
    buyPrice: 0,
    stock: 6,
    lowStock: 5,
    categoryId: 5
  },
  {
    id: 0,
    active: true,
    description: 'item-6',
    ean: '7790895000996',
    sellPrice: 60,
    buyPrice: 0,
    stock: 7,
    lowStock: 1,
    categoryId: 1
  },
  {
    id: 0,
    active: true,
    description: 'item-7',
    ean: '7790895000997',
    sellPrice: 70,
    buyPrice: 0,
    stock: 8,
    lowStock: 5,
    categoryId: 2
  },
  {
    id: 0,
    active: true,
    description: 'item-8',
    ean: '7790895000998',
    sellPrice: 80,
    buyPrice: 0,
    stock: 9,
    lowStock: 10,
    categoryId: 3
  },
  {
    id: 0,
    active: true,
    description: 'item-9',
    ean: '7790895000998',
    sellPrice: 90,
    buyPrice: 0,
    stock: 10,
    lowStock: 1,
    categoryId: 4
  },
  {
    id: 0,
    active: true,
    description: 'item-10',
    ean: '7790895001000',
    sellPrice: 100,
    buyPrice: 10,
    stock: 11,
    lowStock: 1,
    categoryId: 5
  },
  {
    id: 0,
    active: true,
    description: 'item-11',
    ean: '7790895001001',
    sellPrice: 110,
    buyPrice: 10,
    stock: 12,
    lowStock: 1,
    categoryId: 1
  },
  {
    id: 0,
    active: true,
    description: 'item-12',
    ean: '7790895001002',
    sellPrice: 120,
    buyPrice: 20,
    stock: 13,
    lowStock: 1,
    categoryId: 2
  },
  {
    id: 0,
    active: true,
    description: 'item-13',
    ean: '7790895001003',
    sellPrice: 130,
    buyPrice: 30,
    stock: 14,
    lowStock: 1,
    categoryId: 3
  },
  {
    id: 0,
    active: true,
    description: 'item-14',
    ean: '7790895001004',
    sellPrice: 140,
    buyPrice: 40,
    stock: 15,
    lowStock: 1,
    categoryId: 4
  },
  {
    id: 0,
    active: true,
    description: 'item-15',
    ean: '7790895001005',
    sellPrice: 150,
    buyPrice: 50,
    stock: 16,
    lowStock: 1,
    categoryId: 5
  },
  {
    id: 0,
    active: true,
    description: 'item-16',
    ean: '7790895001006',
    sellPrice: 160,
    buyPrice: 60,
    stock: 17,
    lowStock: 1,
    categoryId: 1
  },
  {
    id: 0,
    active: true,
    description: 'item-17',
    ean: '7790895001007',
    sellPrice: 170,
    buyPrice: 70,
    stock: 18,
    lowStock: 1,
    categoryId: 2
  },
  {
    id: 0,
    active: true,
    description: 'item-18',
    ean: '779089501008',
    sellPrice: 180,
    buyPrice: 80,
    stock: 19,
    lowStock: 1,
    categoryId: 3
  },
  {
    id: 0,
    active: true,
    description: 'item-19',
    ean: '7790895001009',
    sellPrice: 190,
    buyPrice: 90,
    stock: 20,
    lowStock: 1,
    categoryId: 4
  },
  {
    id: 0,
    active: true,
    description: 'item-20',
    ean: '7790895001010',
    sellPrice: 200,
    buyPrice: 10,
    stock: 21,
    lowStock: 1,
    categoryId: 5
  }
]
