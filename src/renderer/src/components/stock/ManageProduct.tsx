import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Checkbox } from '../ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'

import { Category, Item } from '../../../../../types'
import { useState, useEffect } from 'react'
import { parseDateToDashed } from '../../lib/utils'

type Props = {
  visible: boolean
  formData: Item
  categories: Category[]
  onInputChange: (prop: keyof Item, value: string | number) => void
}

function ManageProduct({ visible, formData, categories, onInputChange }: Props) {
  const [expiration, setExpiration] = useState(formData.expirationAlert === -1 ? false : true)
  const [expirationDate, setExpirationDate] = useState<string>('')
  useEffect(() => {
    if (!expiration) {
      onInputChange('expirationAlert', -1)
      setExpirationDate('')
    }
  }, [expiration])
  useEffect(() => {
    if (formData.expirationAlert !== -1)
      setExpirationDate(parseDateToDashed(formData.expirationDate))
  }, [formData])

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
          onChange={(e) => {
            if (e.target.value.at(-1) === '.') {
              onInputChange('buyPrice', e.target.value)
            } else if (e.target.value === '' || Number.isNaN(parseFloat(e.target.value))) {
              onInputChange('buyPrice', 0)
            } else {
              onInputChange('buyPrice', parseFloat(e.target.value))
            }
          }}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center text-foreground">Precio de venta</Label>
        <Input
          value={formData.sellPrice}
          onChange={(e) => {
            if (e.target.value.at(-1) === '.') {
              onInputChange('sellPrice', e.target.value)
            } else if (e.target.value === '' || Number.isNaN(parseFloat(e.target.value))) {
              onInputChange('sellPrice', 0)
            } else {
              onInputChange('sellPrice', parseFloat(e.target.value))
            }
          }}
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
      <div className="flex flex-row gap-1">
        <Checkbox
          onClick={() => {
            setExpiration((p) => !p)
          }}
          checked={expiration}
        />
        <div className="grid gap-1.5 leading-none">
          <Label className="w-44 font-semibold content-center text-foreground">Vencimiento</Label>
        </div>
      </div>
      <div className={`flex flex-col ${expiration ? '' : 'hidden'}`}>
        <div className="flex flex-row gap-1">
          <Label className="w-44 font-semibold content-center text-foreground">
            Fecha de vencimiento
          </Label>
          <Input
            placeholder="DD-MM-AAAA"
            value={expirationDate}
            onChange={(e) => {
              setExpirationDate(e.target.value)
              onInputChange('expirationDate', e.target.value)
            }}
            onFocus={(e) => e.target.select()}
          ></Input>
        </div>
        <div className="flex flex-row gap-1">
          <Label className="w-44 font-semibold content-center text-foreground">
            Alerta de Vencimiento
          </Label>
          <Input
            value={formData.expirationAlert === -1 ? 0 : formData.expirationAlert}
            onChange={(e) => onInputChange('expirationAlert', parseInt(e.target.value, 10) || 0)}
            onFocus={(e) => e.target.select()}
          ></Input>
        </div>
      </div>
    </div>
  )
}

export default ManageProduct
