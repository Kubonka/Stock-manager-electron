import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  if (typeof str === 'string') return str.charAt(0).toUpperCase() + str.slice(1)
  return ''
}
export function parseDate(isoString: string): string {
  //2023-12-19T02:09:33.687Z
  // const [datePart] = isoString.split("T");
  // const [year, month, day] = datePart
  // 	.split("-")
  // 	.map((part) => part.padStart(2, "0"));
  // return `${day}/${month}/${year}`;
  //1/3/2024, 10:39:54 PM
  console.log(isoString)
  const [datePart] = isoString.split(',')
  const objDate = toStringObjectDate(datePart)
  return `${objDate.day}/${objDate.month}/${objDate.year}`
}
export function getLocalDate() {
  const date = new Date().toLocaleString('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires'
  })
  return parseDate(date)
}
// export function getObjectDate(date: string): TObjectDate {
//   //25/12/2023 <- date
//   const objDate = toStringObjectDate(date)
//   return {
//     year: parseInt(objDate.year),
//     month: parseInt(objDate.month),
//     day: parseInt(objDate.day)
//   }
// }
function toStringObjectDate(date: string) {
  const [day, month, year] = date.split('/').map((part) => part.padStart(2, '0'))
  return { year, month, day }
}

export function getStringMonth(month: number): string {
  switch (month) {
    case 0:
      return 'Enero'
    case 1:
      return 'Febrero'
    case 2:
      return 'Marzo'
    case 3:
      return 'Abril'
    case 4:
      return 'Mayo'
    case 5:
      return 'Junio'
    case 6:
      return 'Julio'
    case 7:
      return 'Agosto'
    case 8:
      return 'Septiembre'
    case 9:
      return 'Octubre'
    case 10:
      return 'Noviembre'
    case 11:
      return 'Diciembre'
    default:
      return ''
  }
}
export function getStringWeekDay(day: number) {
  switch (day) {
    case 1:
      return 'Lunes'
    case 2:
      return 'Martes'
    case 3:
      return 'Miércoles'
    case 4:
      return 'Jueves'
    case 5:
      return 'Viernes'
    case 6:
      return 'Sábado'
    case 7:
      return 'Domingo'
    default:
      return ''
  }
}
export function parsedDateArgentina(dateString: string): string {
  const date = new Date(dateString)

  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const year = date.getUTCFullYear()

  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  const seconds = date.getUTCSeconds().toString().padStart(2, '0')

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
}
