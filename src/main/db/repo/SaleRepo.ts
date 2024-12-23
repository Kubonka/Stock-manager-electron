import prisma from '../db'

type TSaleRepo = {
  create(cartItems: CartItem[]): Promise<TStatusMessage>
  delete(body: Sale): Promise<TStatusMessage>
  getByDay(day: Date): Promise<Sale[]>
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
      await prisma.sale.create({
        data: {
          active: true,
          date: new Date(),
          totalPrice: saleItems.reduce((prev, curr) => {
            return prev + curr.count * curr.subTotal
          }, 0),
          saleItems: {
            create: saleItems
          }
        }
      })
      return { status: 'SUCCESS', message: 'Sale created successfully' }
    } catch (error) {
      console.error(error)
      return { status: 'ERROR', message: 'Sale creation failed' }
    }
  }
  public async delete(body: Sale): Promise<TStatusMessage> {
    try {
      const saleFound = await prisma.sale.update({
        where: { id: body.id },
        data: { active: false }
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
}

export default SaleRepo
