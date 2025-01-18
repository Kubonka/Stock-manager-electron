import { cn } from '../../lib/utils'
import { Button } from '../../components/ui/button'
import { Calendar } from '../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

type Props = {
  date: Date | undefined
  setDate: (date: Date) => void
  onSubmit: (d: Date) => void
}
function DateSelector({ date, setDate, onSubmit }: Props) {
  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              'w-[240px] h-[38px] justify-start text-left font-normal',
              !date && 'text-foreground'
            )}
          >
            <CalendarIcon />
            {date ? format(date, 'PPP') : <span>Seleccionar una fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate)
                onSubmit(selectedDate)
              } // Update the date using setDate
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {/* <Button onClick={() => onSubmit(selectedDate)}>Buscar</Button> */}
    </div>
  )
}

export default DateSelector
