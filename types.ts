export type Category = {
  id: number
  name: string
  active: boolean
}

export type Item = {
  id: number
  ean: string
  active: boolean
  description: string
  buyPrice: number
  sellPrice: number
  stock: number
  lowStock: number
  categoryId: number
  expirationDate: Date
  expirationAlert: number
}
export type CartItem = Item & {
  count: number
  subTotal: number
  listId: number
}
export type Sale = {
  id: number
  active: boolean
  date: Date
  items: CartItem[]
  totalPrice: number
}
export type SaleItem = {
  id: number
  count: number
  subTotal: number
  listId: number
  saleId: number
  itemId: number
}
export type Statistics = {
  daily: Stat[]
  monthly: Stat[]
  yearly: Stat[]
}
export type Stat = {
  interval: string
  total: number
}

export type TStatusMessage = { status: 'SUCCESS' | 'ERROR'; message: string }
declare global {
  export interface Window {
    electronAPI: {
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => void
        on: (channel: string, listener: (...args: any[]) => void) => void
        removeListener: (channel: string, listener: (...args: any[]) => void) => void
        invoke: <T = any>(channel: string, ...args: any[]) => Promise<T>
      }
    }
  }
}
