import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '../lib/utils'
import { Button } from '../components/ui/button'
import { Calendar } from '../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { getSalesByDay } from '../serverActions/salesActions'

function SaleInspector() {
  const [date, setDate] = React.useState<Date>()
  const [sale, setSale] = React.useState<Sale>()
  //todo una vez que cambia el date autobuscarlo y mostrar todas las ventas del dia enun container
  //todo cuando selecciona alguna de las ventas se muestran en la columna derecha
  console.log('date', date)
  async function handleSearch() {
    const d = new Date()
    const d1 = d.toISOString()
    console.log('1', d)
    console.log('2', d1)
    console.log('3', date?.getDay())
    try {
      const res = await getSalesByDay(date as Date)
      console.log('res', res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {date ? format(date, 'PPP') : <span>Seleccionar una fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
      <Button onClick={() => handleSearch()}>Buscar</Button>
      <div></div>
    </div>
  )
}
export default SaleInspector
