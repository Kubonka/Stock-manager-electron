import { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Receipt, X } from 'lucide-react'
import { Separator } from '../ui/separator'
import { CartItem } from '../../../../../types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Button } from '../ui/button'
import { getExchangeValue, setExchangeValue } from '../../serverActions/currencyActions'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { Input } from '../ui/input'

type Props = {
  cart: CartItem[]
  onDeleteItem: ((id: number) => void) | null
  className: string
  isLegendOpen: boolean
  total: number
}
function CartList({ cart, onDeleteItem, className, isLegendOpen, total }: Props) {
  const [currency, setCurrency] = useState(true)
  const [currencyDialog, setCurrencyDialog] = useState(false)
  const [exchange, setExchange] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const divListRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (divListRef.current) divListRef.current.scrollTop = divListRef.current?.scrollHeight
  }, [cart])
  useEffect(() => {
    getExchange()
  }, [currencyDialog])

  useGSAP(
    () => {
      if (isLegendOpen) gsap.to(containerRef.current, { width: '63%', duration: 0.5 })
      else gsap.to(containerRef.current, { width: '100%', duration: 0.5 })
    },
    { dependencies: [isLegendOpen], revertOnUpdate: false }
  )
  async function getExchange() {
    const res = await getExchangeValue()
    setExchangeValue(res)
  }

  return (
    <div ref={containerRef} className={`flex flex-col items-end `}>
      <div ref={divListRef} className={className} style={{ scrollbarGutter: 'stable' }}>
        <ul className="flex flex-col gap-2 mt-4  max-h-full h-full">
          <li className="flex flex-row gap-4 justify-between">
            <div className="w-[10%] flex  justify-start">
              <Label className="text-muted-foreground md:text-[20px] ">{'CANTIDAD'}</Label>
            </div>
            <div className="w-full flex  justify-center">
              <Label className="text-muted-foreground md:text-[20px] ">{'DESCRIPCION'}</Label>
            </div>
            <div></div>
            <div className="w-[17%] flex  justify-center">
              <Label className="text-muted-foreground md:text-[20px] ">{'P. UNITARIO'}</Label>
            </div>
            <div className="w-[17%] flex  justify-end">
              <Label className="text-muted-foreground md:text-[20px] ">{'SUBTOTAL'}</Label>
            </div>
          </li>
          <li>
            <Separator className="h-[2px] bg-muted-foreground"></Separator>
          </li>
          {cart.map((cartItem, index) => (
            <li
              key={index}
              className="flex flex-row gap-4 justify-between relative items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className=" flex  justify-start w-[10%]">
                <Label className="text-muted-foreground md:text-[20px]">{cartItem.count}</Label>
              </div>
              <div className=" flex justify-center  w-full">
                <Label className="text-muted-foreground md:text-[20px]">
                  {cartItem.description}
                </Label>
              </div>
              <div className=" flex justify-center  w-[17%]">
                <Label className="text-muted-foreground md:text-[20px]">{cartItem.sellPrice}</Label>
              </div>
              <div className=" flex  justify-end w-[17%]">
                <Label className="text-muted-foreground md:text-[20px]">{cartItem.subTotal}</Label>
              </div>
              <X
                className={` absolute top-[0px] text-red-600 cursor-pointer -right-6 transition-opacity duration-300 ${
                  hoveredIndex === index && onDeleteItem !== null ? 'opacity-100' : 'opacity-0 '
                }`}
                onClick={() => {
                  if (onDeleteItem !== null) {
                    onDeleteItem(cartItem.listId)
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full justify-end flex flex-row">
        <Receipt
          onClick={() => setCurrencyDialog(true)}
          className=" text-primary cursor-pointer  "
        />

        <Button
          className="w-[40px] h-[24px]"
          variant={'outline'}
          onClick={async () => {
            setCurrency((p) => !p)
            setExchangeValue(exchange)
          }}
        >
          {currency ? 'US$' : '$'}
        </Button>
        <div className="relative flex flex-row gap-2 h-16 w-[360px] px-4 pr-12 border-b-2 border-x-2  rounded-b-md bg-slate-900 border-primary   items-center justify-between">
          <Label className="text-muted-foreground md:text-[24px]">{`TOTAL`} </Label>
          <Label className="text-muted-foreground md:text-[24px]">
            {!currency ? `US$ ${(total / exchange).toFixed(2)}` : `$ ${total}`}
          </Label>
        </div>
      </div>
      <Dialog open={currencyDialog} onOpenChange={setCurrencyDialog}>
        <DialogContent className="border-primary">
          <DialogHeader className="flex flex-col gap-2">
            <Label className="text-foreground"> Cotizacion del Dolar</Label>
            <Input value={exchange} onChange={(e) => setExchange(parseInt(e.target.value))} />
          </DialogHeader>
          <DialogFooter className="flex flex-row gap-4">
            <Button type="submit" onClick={() => setCurrencyDialog(false)} className="w-full">
              Cancelar
            </Button>
            <Button
              type="submit"
              onClick={async () => {
                setCurrencyDialog(false)
                setExchangeValue(exchange)
              }}
              className="w-full"
            >
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CartList
