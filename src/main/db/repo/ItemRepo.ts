import { Item, TStatusMessage } from '../../../../types'
import prisma from '../db'
import log from 'electron-log'
import { app } from 'electron'
type TItemRepo = {
  create(body: Item): Promise<TStatusMessage>
  update(body: Item): Promise<TStatusMessage>
  delete(id: number): Promise<TStatusMessage>
  getAll(): Promise<Item[]>
}

export default class ItemRepo implements TItemRepo {
  private static instance: ItemRepo | null = null
  public static getInstance(): ItemRepo {
    if (!ItemRepo.instance) {
      ItemRepo.instance = new ItemRepo()
    }
    return ItemRepo.instance
  }
  public async create(body: Item): Promise<TStatusMessage> {
    try {
      const { id, ...rest } = body
      await prisma.item.create({
        data: {
          ...rest
        }
      })
      return { status: 'SUCCESS', message: 'Item created' }
    } catch (error) {
      return { status: 'ERROR', message: 'Item creation failed' }
    }
  }
  public async update(body: Item): Promise<TStatusMessage> {
    try {
      const { id, ...rest } = body

      if (!id) {
        return { status: 'ERROR', message: 'Invalid ID provided' }
      }

      // Check if the item exists
      const existingItem = await prisma.item.findUnique({ where: { id } })
      if (!existingItem) {
        return { status: 'ERROR', message: 'Item not found' }
      }

      // Perform the update
      const updatedItem = await prisma.item.update({
        where: { id },
        data: { ...rest }
      })

      console.log('Updated item:', updatedItem)

      return { status: 'SUCCESS', message: 'Item updated' }
    } catch (error) {
      console.error('Error updating item:', error)
      return { status: 'ERROR', message: 'Error updating Item' }
    }
  }
  // public async update(body: Item): Promise<TStatusMessage> {
  //   try {
  //     console.log("body",body)
  //     const { id, ...rest } = body
  //     console.log()
  //     const itemFound = await prisma.item.update({
  //       where: { id },
  //       data: { ...rest }
  //     })
  //     if (!itemFound) return { status: 'ERROR', message: 'Item not found' }
  //     return { status: 'SUCCESS', message: 'Item updated' }
  //   } catch (error) {
  //     return { status: 'ERROR', message: 'Error updating Item' }
  //   }
  // }

  public async delete(id: number): Promise<TStatusMessage> {
    try {
      const itemFound = await prisma.item.update({
        where: { id },
        data: { active: false }
      })

      if (!itemFound) return { status: 'ERROR', message: 'Item not found' }
      return { status: 'SUCCESS', message: 'Item deleted' }
    } catch (error) {
      return { status: 'SUCCESS', message: 'Item failed to delete' }
    }
  }
  public async getAll(): Promise<Item[]> {
    try {
      log.info(`entra a getAll`)
      log.info(`${app.getPath('userData')}`)
      log.info(`${process.env.DATABSE_URL}`)
      const res = await prisma.item.findMany({
        where: { active: true }
      })

      return res
    } catch (error) {
      log.info(error)
      throw new Error('Failed to get items')
    }
  }
}
