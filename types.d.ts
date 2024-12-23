declare global {
  type Category = {
    id: number
    name: string
    active: boolean
  }

  type Item = {
    id: number
    ean: string
    active: boolean
    description: string
    buyPrice: number
    sellPrice: number
    stock: number
    lowStock: number
    categoryId: number
  }
  type CartItem = Item & {
    count: number
    subTotal: number
    listId: number
  }
  type Sale = {
    id: number
    active: boolean
    date: Date
    items: CartItem[]
    totalPrice: number
  }
  type TStatusMessage = { status: 'SUCCESS' | 'ERROR'; message: string }
}
declare global {
  interface Window {
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
export {}
