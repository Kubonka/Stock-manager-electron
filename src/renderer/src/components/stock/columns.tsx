import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical, ArrowUpDown, BadgeAlert, BadgeX } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Item } from '../../../../../types'
import { parseDateToDashed } from '../../lib/utils'

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'ean',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full text-center text-[12px] font-bold"
        >
          CODIGO
          <ArrowUpDown className="ml-[2px] h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => (
      <p className="w-full text-center text-[12px]">{row.original.ean.toString()}</p>
    )
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full text-center text-[12px] font-bold"
        >
          DESCRIPCION
          <ArrowUpDown className="ml-[2px] h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <p className="w-full text-center text-[12px]">{row.original.description}</p>
    // sortingFn: (rowA: any, rowB: any, columnId: string): number => {
    // 	let a = rowA.getValue(columnId).split("/");
    // 	let b = rowB.getValue(columnId).split("/");
    // 	//20/12/2023
    // 	a = [parseInt(a[0]), parseInt(a[1]), parseInt(a[2])];
    // 	b = [parseInt(b[0]), parseInt(b[1]), parseInt(b[2])];
    // 	const c = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    // 	if (c[2] < 0) {
    // 		return -1;
    // 	} else if (c[2] > 0) {
    // 		return 1;
    // 	} else if (c[1] < 0) {
    // 		return -1;
    // 	} else if (c[1] > 0) {
    // 		return 1;
    // 	} else if (c[0] < 0) {
    // 		return -1;
    // 	} else return 1;
    // },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full text-center text-[12px] font-bold"
        >
          CATEGORIA
          <ArrowUpDown className="ml-[2px] h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row, table }) => (
      <p className="w-full text-center text-[12px]">
        {table.options.meta?.categories.find((c) => c.id === row.original.categoryId)?.name}
      </p>
    ),
    enableColumnFilter: true,
    filterFn: (row, _, filterValue) => {
      if (filterValue !== null) {
        const categoryId = row.original.categoryId
        return categoryId === parseInt(filterValue, 10)
      }
      return true
    }
  },
  {
    accessorKey: 'buyPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full text-center text-[12px] font-bold"
        >
          COSTO
          <ArrowUpDown className="ml-[2px] h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <p className="w-full text-center text-[12px]">{row.original.buyPrice}</p>
  },
  {
    accessorKey: 'sellPrice',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full text-center text-[12px] font-bold"
        >
          VENTA
          <ArrowUpDown className="ml-[2px] h-4 w-4" />
        </Button>
      )
    },

    cell: ({ row }) => <p className="w-full text-center text-[12px]">{row.original.sellPrice}</p>
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full text-center text-[12px] font-bold"
        >
          CANTIDAD
          <ArrowUpDown className="ml-[2px] h-4 w-4" />
        </Button>
      )
    },
    enableColumnFilter: true,

    filterFn: (row, columnId, filterValue) => {
      const stockValue = row.getValue<number>(columnId)
      const delta = stockValue - row.original.lowStock
      let result = 0
      if (stockValue <= 0) result = 3
      else {
        if (delta > 0) {
          //normal = 1
          result = 1
        } else if (delta <= 0) {
          //bajo = 2
          result = 2
        }
      }
      if (filterValue !== 0) return filterValue === result
      return true
    },
    cell: ({ row }) => <p className="w-full text-center text-[12px]">{row.original.stock}</p>
  },
  {
    accessorKey: 'expirationDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full text-center text-[12px] font-bold"
        >
          VENCIMIENTO
          <ArrowUpDown className="ml-[2px] h-4 w-4" />
        </Button>
      )
    },
    enableColumnFilter: true,

    filterFn: (row, columnId, filterValue) => {
      if (columnId) {
      }
      const expirationDate = row.original.expirationDate
      const expirationAlert = row.original.expirationAlert
      switch (filterValue) {
        case 1:
          return expirationAlert !== -1 && resolveExpiration(expirationAlert, expirationDate) === 1
        case 2:
          return expirationAlert !== -1 && resolveExpiration(expirationAlert, expirationDate) === 2
        default:
          return true
      }
    },
    sortingFn: (rowA, rowB) => {
      const expAlertA = rowA.original.expirationAlert
      const expAlertB = rowB.original.expirationAlert
      const dateA = new Date(rowA.original.expirationDate).getTime()
      const dateB = new Date(rowB.original.expirationDate).getTime()
      if (expAlertA === -1 || expAlertB === -1) return 0

      return dateA - dateB
    },
    cell: ({ row }) => (
      <div className="flex flex-row justify-center items-center relative ">
        {setExpirationIcon(
          resolveExpiration(row.original.expirationAlert, row.original.expirationDate)
        )}
        <p className=" text-center text-[12px] ">
          {row.original.expirationAlert === -1
            ? '-'
            : parseDateToDashed(row.original.expirationDate)}
        </p>
      </div>
    )
  },
  {
    id: 'actions',
    header: () => {
      return <div className="w-full"></div>
    },
    cell: ({ row, table }) => {
      const r = row.original
      return (
        <div className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-primary bg-slate-900">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => table.options.meta?.openEditDialog(r.id)}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => table.options.meta?.openDeleteDialog(r.id)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  },
  {
    id: 'accepted',
    accessorKey: 'accepted',
    enableHiding: true
  }
]

function resolveExpiration(expirationAlert: number, expirationDate: Date): number {
  const now = new Date()
  const diff = now.getTime() - 3 * 60 * 60 * 1000 - expirationDate.getTime()
  const adjustedDate = new Date(expirationDate)
  adjustedDate.setDate(adjustedDate.getDate() - expirationAlert)
  const diff2 = now.getTime() - 3 * 60 * 60 * 1000 - adjustedDate.getTime()
  if (expirationAlert !== -1) {
    if (diff > 0) {
      return 2
    } else if (diff2 > 0) {
      return 1
    }
  }
  return 0
}
function setExpirationIcon(resolveValue: number) {
  if (resolveValue === 2) return <BadgeX className="absolute left-12 text-red-400" />
  if (resolveValue === 1) return <BadgeAlert className="absolute left-12 text-yellow-200" />
  else return null
}
