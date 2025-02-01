import { useEffect, useRef, useState } from 'react'
import LineDotChart from '../components/charts/LineDotChart'
import DateSelector from '../components/dateSelector/DateSelector'
import { Button } from '../components/ui/button'

import { getStatistics } from '../serverActions/statisticsActions'
import { Stat } from '../../../../types'

function Statistics() {
  const [date, setDate] = useState<Date>()
  const allData = useRef({ daily: [], monthly: [], yearly: [] })
  const [data, setData] = useState<Stat[]>([])
  const [selection, setSelection] = useState('daily')
  async function handleSearch(date1: Date) {
    allData.current = await getStatistics(date1 as Date)
    handleSelection(selection)
  }
  function handleSelection(option: string) {
    setSelection(option)
    switch (option) {
      case 'daily':
        setData(allData.current.daily)
        break
      case 'monthly':
        setData(allData.current.monthly)
        break

      case 'yearly':
        setData(allData.current.yearly)
        break
      default:
        break
    }
  }

  useEffect(() => {}, [])

  return (
    <div className="bg-slate-900 w-full h-full border-2 border-primary rounded-md p-2 flex flex-col justify-center items-start gap-4">
      <div className="flex justify-center items-center w-full">
        <DateSelector date={date} setDate={(newDate) => setDate(newDate)} onSubmit={handleSearch} />
      </div>
      <div className="flex flex-row gap-4 w-full justify-between ">
        <Button className="w-full" onClick={() => handleSelection('daily')}>
          Diario
        </Button>
        <Button className="w-full" onClick={() => handleSelection('monthly')}>
          Mensual
        </Button>
        <Button className="w-full" onClick={() => handleSelection('yearly')}>
          Anual
        </Button>
      </div>
      <LineDotChart data={data} selection={selection} date={date || null} />
    </div>
  )
}

export default Statistics
