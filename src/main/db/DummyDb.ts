import prisma from './db'
import ItemRepo from './repo/ItemRepo'
import CategoryRepo from './repo/CategoryRepo'

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
  }
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
    //todo cantidad de dias 5
    //todo cantidad de sales 20
    const baseDate = new Date('Mon Dec 22 2024 04:44:58 GMT-0300 (Argentina Standard Time)')
    for (let day = 0; day < 5; day++) {
      //todo usando el array de sales crear arrays de sales con items random
      baseDate.setDate(baseDate.getDate() + 1)
    }
  }
}

const sales: Sale[] = [
  {
    active: true,
    id: 1,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 2,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 3,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 4,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 5,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 6,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 7,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 8,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 9,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 10,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 11,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 12,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 13,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 14,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 15,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 16,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 17,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 18,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 19,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  },
  {
    active: true,
    id: 20,
    totalPrice: 2000,
    date: new Date('Mon Dec 23 2024 04:44:58 GMT-0300 (Argentina Standard Time)'),
    items: []
  }
]

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
