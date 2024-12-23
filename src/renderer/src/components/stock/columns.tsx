'use client'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical, ArrowUpDown } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

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
    filterFn: (row, columnId, filterValue) => {
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
      if (filterValue !== null) {
        const stockValue = row.getValue<number>(columnId)
        const res = stockValue > row.original.lowStock
        return res === filterValue
      }
      return true
    },
    cell: ({ row }) => <p className="w-full text-center text-[12px]">{row.original.stock}</p>
  },
  {
    id: 'actions',
    header: ({ column }) => {
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
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => table.options.meta?.openEditDialog(r.id)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.options.meta?.openDeleteDialog(r.id)}>
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
