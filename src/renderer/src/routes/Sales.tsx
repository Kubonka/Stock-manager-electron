import { useEffect, useRef, useState } from 'react'
import CodeInput from '../components/sales/CodeInput'
import CartList from '../components/sales/CartList'
import { getAllItems } from '../serverActions/stockActions'
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
  const [overrideInput, setOverrideInput] = useState('')
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
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [])
  function handleGlobalKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      setClearInputTrigger((p) => !p)
    }
  }
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
    console.log(count, code)
    if (count > 0) {
      const foundItem = items.find((item) => item.ean === code)
      if (foundItem) {
        setCodeStatus('green')
        setClearInputTrigger((p) => !p)
        setCart((p) => [
          ...p,
          { listId: ++listId.current, count, subTotal: getSubtotal(count, foundItem), ...foundItem }
        ])
        setOverrideInput('')
        setFocusInputTrigger((p) => !p)
      } else {
        setCodeStatus('red')
        setOverrideInput('')
      }
    } else {
      setCodeStatus('red')
      setOverrideInput('')
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
  function handleLegendItemClick(item: Item) {
    console.log(item)
    setOverrideInput(item.ean)
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      //console.log('ESCAPE')
    } else if (event.key === 'Backspace') {
      //event.preventDefault()
      //console.log('BACK')
    } else if (event.key === 'Escape') {
      //event.preventDefault()
      //console.log('ESCAPE')
    }
  }
  //note Markup
  return (
    <div className="flex flex-row bg-background w-full h-full" onKeyDown={handleKeyDown}>
      <div
        onKeyDown={handleKeyDown}
        className="bg-background w-full h-full flex flex-col items-center justify-between px-8 overflow-hidden box-border gap-8 pt-8"
      >
        <div className="flex flex-row w-full items-center gap-2">
          <div
            className={`${
              codeStatus === 'red'
                ? 'border-red-500'
                : codeStatus === 'green'
                  ? 'border-green-500'
                  : 'border-background'
            } border-8 w-full box-content rounded-md -ml-2`}
          >
            <CodeInput
              onSubmit={handleSubmitInput}
              clearInputTrigger={clearInputTrigger}
              focusInputTrigger={focusInputTrigger}
              overrideInput={overrideInput}
            />
          </div>
          <Button
            onClick={() => setCodeLegendShow((p) => !p)}
            className={`${codeLegendShow ? 'border-[2px] border-primary bg-slate-900 hover:bg-slate-900 ' : 'bg-primary hover:bg-primary border-[2px] border-primary'} text-muted-foreground w-48 h-[80px] text-lg hover:text-secondary-foreground`}
          >
            <ScrollText className="w-[48px]" />
            Códigos
          </Button>
        </div>
        <div className="flex flex-row w-full gap-2">
          <CartList
            cart={cart}
            onDeleteItem={handleDeleteItem}
            className="flex flex-col rounded-t-md rounded-bl-md  border-2 border-primary w-full h-[620px] max-h-[620px]  px-8 py-2 bg-slate-900 overflow-y-auto"
            isLegendOpen={codeLegendShow}
            total={total}
          />
          <CodeLegend
            show={codeLegendShow}
            data={codeLegendData}
            onItemClick={handleLegendItemClick}
          />
        </div>
        <div className=" gap-16 flex justify-between w-full ">
          <Button onClick={handleCancelPurchase} className="z-10 w-[360px] h-[48px] text-[20px]">
            Cancelar
          </Button>
          <Button onClick={handleSubmitPurchase} className="z-10 w-[360px] h-[48px] text-[20px]">
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sales
