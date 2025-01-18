import { useEffect, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { X } from 'lucide-react'
import { Separator } from '../ui/separator'
import { CartItem } from '../../../../../types'

type Props = {
  cart: CartItem[]
  onDeleteItem: ((id: number) => void) | null
  className: string
}
function CartList({ cart, onDeleteItem, className }: Props) {
  //todo cambiar el key de LI a un ID correcto
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const divListRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (divListRef.current) divListRef.current.scrollTop = divListRef.current?.scrollHeight
  }, [cart])

  return (
    <div ref={divListRef} className={className}>
      <ul className="flex flex-col gap-2">
        <li className="flex flex-row gap-4 justify-between">
          <div className="w-full flex  justify-start">
            <Label className="text-muted-foreground md:text-[20px] ">{'CANTIDAD'}</Label>
          </div>
          <div className="w-full flex  justify-center">
            <Label className="text-muted-foreground md:text-[20px] ">{'DESCRIPCION'}</Label>
          </div>
          <div></div>
          <div className="w-full flex  justify-center">
            <Label className="text-muted-foreground md:text-[20px] ">{'P. UNITARIO'}</Label>
          </div>
          <div className="w-full flex  justify-end">
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
            <div className="w-full flex  justify-start">
              <Label className="text-muted-foreground md:text-[20px]">{cartItem.count}</Label>
            </div>
            <div className="w-full flex justify-center ">
              <Label className="text-muted-foreground md:text-[20px]">{cartItem.description}</Label>
            </div>
            <div className="w-full flex justify-center ">
              <Label className="text-muted-foreground md:text-[20px]">{cartItem.sellPrice}</Label>
            </div>
            <div className="w-full flex  justify-end">
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
  )
}

export default CartList
