import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

import { Category, Item } from '../../../../../types'

type Props = {
  visible: boolean
  formData: Item
  categories: Category[]
  onInputChange: (prop: keyof Item, value: string | number) => void
}

function ManageProduct({ visible, formData, categories, onInputChange }: Props) {
  return (
    <div className={`${visible ? '' : 'hidden'} flex flex-col gap-2`}>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center text-foreground">Codigo </Label>
        <Input value={formData.ean} disabled></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center text-foreground">Categoría </Label>
        <Select
          onValueChange={(value) => {
            const id = categories.find((c) => c.name === value)?.id as number
            onInputChange('categoryId', id)
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar categoría ..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center text-foreground">Descripción </Label>
        <Input
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center text-foreground">Precio de costo</Label>
        <Input
          value={formData.buyPrice}
          onChange={(e) => onInputChange('buyPrice', parseInt(e.target.value, 10) || 0)}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center text-foreground">Precio de venta</Label>
        <Input
          value={formData.sellPrice}
          onChange={(e) => onInputChange('sellPrice', parseInt(e.target.value, 10) || 0)}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center text-foreground">Cantidad</Label>
        <Input
          value={formData.stock}
          onChange={(e) => onInputChange('stock', parseInt(e.target.value, 10) || 0)}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center text-foreground">
          Alerta Stock Bajo
        </Label>
        <Input
          value={formData.lowStock}
          onChange={(e) => onInputChange('lowStock', parseInt(e.target.value, 10) || 0)}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
    </div>
  )
}

export default ManageProduct
