import { CartItem, Sale, Stat, Statistics, TStatusMessage } from '../../../../types'
import prisma from '../db'

type TSaleRepo = {
  create(cartItems: CartItem[]): Promise<TStatusMessage>
  delete(saleId: number): Promise<TStatusMessage>
  getByDay(day: Date): Promise<Sale[]>
  getStatistics(date: Date): Promise<Statistics>
}

class SaleRepo implements TSaleRepo {
  private static instance: SaleRepo | null = null

  public static getInstance(): SaleRepo {
    if (!SaleRepo.instance) {
      SaleRepo.instance = new SaleRepo()
    }
    return SaleRepo.instance
  }
  public async create(cartItems: CartItem[]): Promise<TStatusMessage> {
    try {
      if (!cartItems || cartItems.length === 0) {
        return { status: 'ERROR', message: 'No items in the sale' }
      }
      const saleItems = cartItems.map((item) => ({
        subTotal: item.subTotal,
        count: item.count,
        listId: item.listId,
        item: { connect: { id: item.id } }
      }))
      const now = new Date()
      await prisma.sale.create({
        data: {
          active: true,
          date: new Date(now.getTime() - 3 * 60 * 60 * 1000),
          totalPrice: saleItems.reduce((prev, curr) => {
            return prev + curr.subTotal
          }, 0),
          saleItems: {
            create: saleItems
          }
        }
      })

      const group = [] as CartItem[]
      for (let i = 0; i < cartItems.length; i++) {
        const curr = cartItems[i]
        const duplicate = group.find((item) => item.id === curr.id)
        if (!duplicate) {
          for (let j = i + 1; j < cartItems.length; j++) {
            const tar = cartItems[j]
            if (tar.id === curr.id) curr.count += tar.count
          }
          group.push(curr)
        }
      }
      const updateStockPromises = group.map(async (cartItem) => {
        const itemFound = await prisma.item.findUnique({ where: { id: cartItem.id } })
        if (itemFound) {
          await prisma.item.update({
            where: { id: cartItem.id },
            data: { stock: itemFound.stock - cartItem.count }
          })
        }
      })
      await Promise.all(updateStockPromises)
      return { status: 'SUCCESS', message: 'Sale created successfully' }
    } catch (error) {
      console.error(error)
      return { status: 'ERROR', message: 'Sale creation failed' }
    }
  }
  public async delete(saleId: number): Promise<TStatusMessage> {
    try {
      const saleFound = await prisma.sale.delete({
        where: { id: saleId }
      })
      if (!saleFound) return { status: 'ERROR', message: 'Sale not found' }
      return { status: 'SUCCESS', message: 'Sale deleted' }
    } catch (error) {
      return { status: 'ERROR', message: 'Failed to delete sale' }
    }
  }
  public async getByDay(day: Date): Promise<Sale[]> {
    try {
      const startOfDay = new Date(day)
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date(day)
      endOfDay.setHours(23, 59, 59, 999)

      const sales = await prisma.sale.findMany({
        where: {
          AND: [
            {
              date: {
                gte: startOfDay,
                lt: endOfDay
              }
            },
            {
              active: true
            }
          ]
        },
        orderBy: {
          date: 'asc'
        },
        include: {
          saleItems: {
            include: {
              item: true
            }
          }
        }
      })
      const result = sales.map((sale) => ({
        id: sale.id,
        active: sale.active,
        date: sale.date,
        totalPrice: sale.totalPrice,
        items: sale.saleItems.map((sitem, i) => ({
          ...sitem.item,
          count: sale.saleItems[i].count,
          subTotal: sale.saleItems[i].subTotal,
          listId: sale.saleItems[i].listId
        }))
      }))

      return result
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get sales')
    }
  }
  public async getStatistics(date: Date): Promise<Statistics> {
    const year = date.getFullYear()
    const yearlySales = await prisma.sale.findMany({
      where: {
        AND: [
          {
            date: {
              gte: new Date(`${year}-01-01T00:00:00Z`)
            }
          },
          {
            date: {
              lt: new Date(`${year + 1}-01-01T00:00:00Z`)
            }
          }
        ]
      }
    })

    //*setup
    const monthlySales: Omit<Sale, 'items'>[] = yearlySales.filter(
      (sale) => sale.date.getMonth() === date.getMonth()
    )

    const dailySales: Omit<Sale, 'items'>[] = monthlySales.filter(
      (s) => s.date.getDay() === date.getDay()
    )
    //*get
    const byYear = this.getTotalOfYear(yearlySales)
    const byMonth = this.getTotalOfMonth(date, monthlySales)
    const byDay = this.getTotalOfDay(dailySales)

    return { daily: byDay, monthly: byMonth, yearly: byYear } as Statistics
  }
  private getTotalOfDay(sales: Omit<Sale, 'items'>[]) {
    const result: Stat[] = []
    for (let hour = 6; hour <= 23; hour++) {
      const salesByHour = sales
        .filter((sale) => sale.date.getHours() + 3 === hour)
        .reduce((total, curr) => {
          return total + curr.totalPrice
        }, 0)
      result.push({ interval: hour.toString(), total: salesByHour })
    }
    return result
  }
  private getTotalOfMonth(date: Date, sales: Omit<Sale, 'items'>[]) {
    //todo seguir aca
    const year = date.getFullYear()
    const month = date.getMonth()
    const lastDay = new Date(year, month + 1, 0).getDate()
    const result: Stat[] = []

    for (let day = 1; day <= lastDay; day++) {
      const salesByDay = sales
        .filter((sale) => sale.date.getDate() === day)
        .reduce((total, curr) => {
          return total + curr.totalPrice
        }, 0)

      result.push({ interval: day.toString(), total: salesByDay })
    }
    return result
  }
  private getTotalOfYear(sales: Omit<Sale, 'items'>[]) {
    const result: Stat[] = []
    for (let month = 0; month < 12; month++) {
      const salesByMonth = sales
        .filter((sale) => sale.date.getMonth() === month)
        .reduce((total, curr) => {
          return total + curr.totalPrice
        }, 0)
      result.push({ interval: (month + 1).toString(), total: salesByMonth })
    }
    return result
  }
}

export default SaleRepo
