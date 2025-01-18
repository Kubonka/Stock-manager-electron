import { useEffect, useRef, useState } from 'react'
import CodeInput from '../components/sales/CodeInput'
import CartList from '../components/sales/CartList'
import { getAllItems } from '../serverActions/stockActions'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { toast } from '../hooks/use-toast'
import { createSale } from '../serverActions/salesActions'
import { CartItem, Item, TStatusMessage } from '../../../../types'
import CodeLegend from '../components/sales/CodeLegend'
import { ScrollText } from 'lucide-react'

function Sales() {
  const [cart, setCart] = useState<CartItem[]>([] as CartItem[])
  const [items, setItems] = useState<Item[]>([])
  const [total, setTotal] = useState(0)
  const [codeStatus, setCodeStatus] = useState('')
  const [codeLegendShow, setCodeLegendShow] = useState(false)
  const [codeLegendData, setCodeLegendData] = useState<Item[]>([])

  const listId = useRef(0)

  const [clearInputTrigger, setClearInputTrigger] = useState(false)
  const [focusInputTrigger, setFocusInputTrigger] = useState(false)

  async function loadItems() {
    const res: Item[] = await getAllItems()
    setItems(res)
    setCodeLegendData(
      res.filter((item) => {
        const firstChar = parseInt(item.ean[0], 10)
        return Number.isNaN(firstChar)
      })
    )
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
  useEffect(() => {
    setTimeout(() => {
      setCodeStatus('')
    }, 400)
  }, [codeStatus])
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
        setCodeStatus('green')
        setClearInputTrigger((p) => !p)
        setCart((p) => [
          ...p,
          { listId: ++listId.current, count, subTotal: getSubtotal(count, foundItem), ...foundItem }
        ])
      } else {
        setCodeStatus('red')
      }
    } else {
      setCodeStatus('red')
    }
  }
  function handleDeleteItem(id: number) {
    setCart((p) => p.filter((cartItem) => cartItem.listId !== id))
    setFocusInputTrigger((p) => !p)
  }
  function handleCancelPurchase() {
    setCart([])
    setFocusInputTrigger((p) => !p)
  }
  async function handleSubmitPurchase() {
    try {
      let result: TStatusMessage
      if (cart.length) {
        result = await createSale(cart)
        if (result.status && result.status === 'SUCCESS') {
          toast({ description: 'Compra Procesada con éxito!', duration: 2000 })
          setCart([])
        } else {
          toast({
            variant: 'destructive',
            description: 'Hubo un error al procesar la compra',
            duration: 2000
          })
        }
      }
      setFocusInputTrigger((p) => !p)
    } catch (error) {
      console.log(error)
    }
  }
  //note Markup
  return (
    <div className="flex flex-row bg-background w-full h-full">
      <div className="bg-background w-full h-full flex flex-col items-center justify-between px-8 overflow-hidden box-border gap-8 pt-8">
        <div className="flex flex-row w-full items-center">
          <div
            className={`${
              codeStatus === 'red'
                ? 'border-red-500'
                : codeStatus === 'green'
                  ? 'border-green-500'
                  : 'border-background'
            } border-8 w-full box-content rounded-md`}
          >
            <CodeInput
              onSubmit={handleSubmitInput}
              clearInputTrigger={clearInputTrigger}
              focusInputTrigger={focusInputTrigger}
            />
          </div>
          <Button
            onClick={() => setCodeLegendShow((p) => !p)}
            className={`${codeLegendShow ? 'bg-primary hover:bg-primary border-[2px] border-primary' : 'border-[2px] border-primary bg-slate-900 hover:bg-slate-900 '} text-muted-foreground w-48 h-[80px] text-lg`}
          >
            <ScrollText className="w-[48px]" />
            Códigos
          </Button>
        </div>
        <div className="flex flex-row w-full gap-2">
          <div className="flex flex-col w-full h-full items-end ">
            <CartList
              cart={cart}
              onDeleteItem={handleDeleteItem}
              className=" rounded-t-md rounded-bl-md  border-2 border-primary w-full h-[620px] max-h-[620px]  px-8 py-2 bg-slate-900 overflow-y-auto"
            />
            <div className="flex flex-row gap-2 h-16  px-8 border-b-2 border-x-2  rounded-b-md bg-slate-900 border-primary w-[360px]  items-center justify-between">
              <Label className="text-muted-foreground md:text-[20px]">{`TOTAL`} </Label>
              <Label className="text-muted-foreground md:text-[20px]">{`$ ${total}`} </Label>
            </div>
          </div>
          <CodeLegend show={codeLegendShow} data={codeLegendData} onClose={() => {}} />
        </div>
        <div className=" gap-16 flex justify-between w-full ">
          <Button onClick={handleCancelPurchase} className="w-[360px] h-[48px] text-[20px]">
            Cancelar
          </Button>
          <Button onClick={handleSubmitPurchase} className="w-[360px] h-[48px] text-[20px]">
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sales
