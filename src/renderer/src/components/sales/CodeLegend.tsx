import { useEffect, useRef, useState } from 'react'
import { Item } from '../../../../../types'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
type Props = {
  show: boolean
  data: Item[]
  onItemClick: (item: Item) => void
}
function CodeLegend({ show, data, onItemClick }: Props) {
  const [input, setInput] = useState('')
  const [filteredData, setFilteredData] = useState<Item[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (data.length)
      setFilteredData(
        data.filter((item) => item.description.toLowerCase().includes(input.toLowerCase()))
      )
  }, [input, data])
  useGSAP(
    () => {
      if (show) gsap.to(containerRef.current, { x: 1168, duration: 0.5 })
      else gsap.to(containerRef.current, { x: 1900, duration: 0.5 })
    },
    { dependencies: [show], revertOnUpdate: false }
  )
  //${show ? '' : 'hidden'}
  return (
    <div ref={containerRef} className={`absolute flex flex-col h-full gap-2 w-[35%]`}>
      <Input
        placeholder="Buscar..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-muted-foreground h-10 bg-slate-900 border-2 pl-4"
      ></Input>
      <ul
        className="h-[636px] overflow-y-auto border-2  border-primary rounded-md gap-2 p-4 pr-2 bg-slate-900"
        style={{ scrollbarGutter: 'stable' }}
      >
        <li className="text-muted-foreground flex flex-row justify-between p-1">
          <Label className="text-[18px]">CODIGO</Label>
          <Label className="text-[18px]">DESCRIPCION</Label>
        </li>
        <Separator className="h-[2px] bg-muted-foreground my-2" />
        {filteredData.map((item, i) => (
          <li
            key={i}
            className="text-muted-foreground flex flex-row justify-between cursor-pointer hover:bg-primary p-1 rounded-md"
            onClick={() => onItemClick(item)}
          >
            <Label className="text-[16px] cursor-pointer">{item.ean}</Label>
            <Label className="text-[16px] cursor-pointer">{item.description}</Label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CodeLegend
