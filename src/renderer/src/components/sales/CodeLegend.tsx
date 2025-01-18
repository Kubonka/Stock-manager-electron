import React, { useEffect, useState } from 'react'
import { Item } from '../../../../../types'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'

type Props = {
  show: boolean
  data: Item[]
  onClose: () => void
}
function CodeLegend({ show, data }: Props) {
  const [input, setInput] = useState('')
  const [filteredData, setFilteredData] = useState<Item[]>([])
  useEffect(() => {
    console.log('input', input)
    if (data.length)
      setFilteredData(
        data.filter((item) => item.description.toLowerCase().includes(input.toLowerCase()))
      )
  }, [input, data])
  console.log('f', filteredData)
  return (
    <div className=" flex flex-col w-[60%] h-full  gap-2">
      <Input
        placeholder="Buscar..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-muted-foreground h-10 bg-slate-900 border-2"
      ></Input>
      <ul className="h-[636px] overflow-y-auto border-2  border-primary rounded-md gap-2 p-2 pr-4 bg-slate-900">
        <li className="text-muted-foreground flex flex-row justify-between">
          <Label className="text-[18px]">CODIGO</Label>
          <Label className="text-[18px]">DESCRIPCION</Label>
        </li>
        <Separator className="h-[2px] bg-muted-foreground my-2" />
        {filteredData.map((item, i) => (
          <li key={i} className="text-muted-foreground flex flex-row justify-between">
            <Label className="text-[16px]">{item.ean}</Label>
            <Label className="text-[16px]">{item.description}</Label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CodeLegend
