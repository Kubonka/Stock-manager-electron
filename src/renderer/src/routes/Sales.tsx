import React, { useEffect, useRef, useState } from 'react'
import CodeInput from '../components/sales/CodeInput'
import CartList from '../components/sales/CartList'
import { getAllItems } from '../serverActions/stockActions'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { toast } from '../hooks/use-toast'
import { createSale } from '../serverActions/salesActions'

function Sales() {
  const [cart, setCart] = useState<CartItem[]>([] as CartItem[])
  const [items, setItems] = useState<Item[]>([])
  const [total, setTotal] = useState(0)
  const listId = useRef(0)

  const [clearInputTrigger, setClearInputTrigger] = useState(false)

  async function loadItems() {
    const res = await getAllItems()
    setItems(res)
  }
  useEffect(() => {
    loadItems()
  }, [])
  useEffect(() => {
    //todo sumar todo el cart y updatear el TOTAL
    setTotal(
      cart.reduce((prev, curr) => {
        return prev + curr.count * curr.sellPrice
      }, 0)
    )
  }, [cart])

  // function isAllNumbers(input: string): boolean {
  //   return /^\d+$/.test(input)
  // }
  function getSubtotal(count: number, item: Item) {
    return count * item.sellPrice
  }
  function handleSubmitInput(count: number, code: string) {
    //todo reworkear la logica para aislar el IF
    if (count > 0) {
      const foundItem = items.find((item) => item.ean === code)
      if (foundItem) {
        console.log('GOOD INPUT')
        setCart((p) => [
          ...p,
          { listId: ++listId.current, count, subTotal: getSubtotal(count, foundItem), ...foundItem }
        ])
      } else {
        console.log('BAD INPUT 1')
      }
    } else {
      console.log('BAD INPUT 2')
    }
  }
  function handleDeleteItem(id: number) {
    console.log('id', id)
    setCart((p) => p.filter((cartItem) => cartItem.listId !== id))
  }
  function handleCancelPurchase() {
    setCart([])
  }
  async function handleSubmitPurchase() {
    try {
      let result: TStatusMessage
      if (cart.length) {
        result = await createSale(cart)
        if (result.status && result.status === 'SUCCESS') {
          toast({ description: 'Compra Procesada con éxito!', duration: 3000 })
        } else {
          toast({
            variant: 'destructive',
            description: 'Hubo un error al procesar la compra',
            duration: 3000
          })
        }
      }

      //loadAllCategories()
    } catch (error) {
      console.log(error)
    }
  }
  //note Markup
  return (
    <div className="bg-slate-400 w-full h-full flex flex-col items-center justify-between px-8 overflow-hidden box-border">
      <CodeInput onSubmit={handleSubmitInput} clearInputTrigger={clearInputTrigger} />
      <CartList cart={cart} onDeleteItem={handleDeleteItem} />
      <div className="flex flex-row gap-2">
        <Label>{`TOTAL`} </Label>
        <Label>{`$ ${total}`} </Label>
      </div>
      <div>
        <Button onClick={handleCancelPurchase}>Cancelar</Button>
        <Button onClick={handleSubmitPurchase}>Finalizar</Button>
      </div>
    </div>
  )
}

export default Sales
