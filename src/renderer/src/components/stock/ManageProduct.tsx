import React, { useEffect, useState } from 'react'
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
import { createItem } from '../../serverActions/stockActions'

type Props = {
  visible: boolean
  formData: Item
  categories: Category[]
  onInputChange: (prop: keyof Item, value: string | number) => void
}

function ManageProduct({ visible, formData, categories, onInputChange }: Props) {
  //! PRIORIDAD
  //todo agregar la categoria preseleccionada -> PODER FILTRAR POR CATEGORIAS LA TABLA
  //todo validar campos

  return (
    <div className={`${visible ? '' : 'hidden'} flex flex-col gap-2`}>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center">Codigo </Label>
        <Input value={formData.ean} disabled></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center">Categoría </Label>
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
        <Label className="w-44 font-semibold content-center">Descripción </Label>
        <Input
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center">Precio de costo</Label>
        <Input
          value={formData.buyPrice}
          onChange={(e) => onInputChange('buyPrice', parseInt(e.target.value, 10))}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center">Precio de venta</Label>
        <Input
          value={formData.sellPrice}
          onChange={(e) => onInputChange('sellPrice', parseInt(e.target.value, 10))}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center">Cantidad</Label>
        <Input
          value={formData.stock}
          onChange={(e) => onInputChange('stock', parseInt(e.target.value, 10))}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
      <div className="flex flex-row gap-1">
        <Label className="w-44 font-semibold content-center">Alerta Stock Bajo</Label>
        <Input
          value={formData.lowStock}
          onChange={(e) => onInputChange('lowStock', parseInt(e.target.value, 10))}
          onFocus={(e) => e.target.select()}
        ></Input>
      </div>
    </div>
  )
}

export default ManageProduct
