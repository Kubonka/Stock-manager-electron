import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'
import { getStringMonth, getStringWeekDay } from '../../lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '../../components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '../../components/ui/chart'
import { Label } from '../ui/label'
import { Stat } from '../../../../../types'
// const chartData = [
//   { month: 'January', desktop: 186, mobile: 80 },
//   { month: 'February', desktop: 305, mobile: 200 },
//   { month: 'March', desktop: 237, mobile: 120 },
//   { month: 'April', desktop: 73, mobile: 190 },
//   { month: 'May', desktop: 209, mobile: 130 },
//   { month: 'June', desktop: 214, mobile: 140 }
// ]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig

type Props = {
  data: Stat[]
  selection: string
  date: Date | null
}
function setHeader(selection: string, date: Date | null) {
  if (!date) return ''
  switch (selection) {
    case 'daily':
      return `Ventas del día ${getStringWeekDay(date.getDay())} ${date.getDate()}`
    case 'monthly':
      return `Ventas del mes de ${getStringMonth(date.getMonth())} `
    case 'yearly':
      return `Ventas del año ${date.getFullYear()}`
    default:
      return ''
  }
}
function getAxisLegend(selection: string) {
  switch (selection) {
    case 'daily':
      return `Hora`
    case 'monthly':
      return `Día `
    case 'yearly':
      return `Mes`
    default:
      return ''
  }
}
export default function LineDotChart({ data, selection, date }: Props) {
  return (
    <Card className={`w-full h-full border-0 bg-slate-900 ${date ? 'opacity-100' : 'opacity-0'}`}>
      <CardHeader>
        <CardDescription className="text-muted-foreground text-[20px] font-semibold">
          {setHeader(selection, date)}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="w-full h-[660px]">
          <LineChart accessibilityLayer data={data}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="interval"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="total"
              type="monotone"
              stroke="rgb(64, 128, 255)"
              strokeWidth={2}
              dot={{
                fill: 'rgb(64, 128, 255)'
              }}
              activeDot={{
                r: 7
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <Label className="text-[20px] text-muted-foreground">{getAxisLegend(selection)}</Label>
      </CardFooter>
    </Card>
  )
}
