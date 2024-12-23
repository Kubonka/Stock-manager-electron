import React, { useState } from 'react'
import { Label } from '../ui/label'
import { X } from 'lucide-react'

type Props = {
  cart: CartItem[]
  onDeleteItem: (id: number) => void
}
function CartList({ cart, onDeleteItem }: Props) {
  //todo cambiar el key de LI a un ID correcto
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div>
      ItemList
      <ul>
        <li className="flex flex-row gap-4">
          <Label>{'count'}</Label>
          <Label>{'description'}</Label>
          <Label>{'sellPrice'}</Label>
          <Label>{'subTotal'}</Label>
        </li>
        {cart.map((cartItem, index) => (
          <li
            key={index}
            className="border-2 border-red-200 flex flex-row gap-4"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Label>{cartItem.count}</Label>
            <Label>{cartItem.description}</Label>
            <Label>{cartItem.sellPrice}</Label>
            <Label>{cartItem.subTotal}</Label>
            <X
              className={`transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => onDeleteItem(cartItem.listId)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CartList
