import React, { useState, CSSProperties, useRef, useEffect } from 'react'
import { toast } from '../../hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  useReactTable,
  RowData,
  VisibilityState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { createItem, deleteItem, updateItem } from '../../serverActions/stockActions'
import { getAllCategories } from '../../serverActions/categoryActions'
import ManageProduct from './ManageProduct'
import EANReader from './EANReader'
import { Plus } from 'lucide-react'
import { Category, Item, TStatusMessage } from '../../../../../types'
//todo V
//import { deleteBudget } from "@/actions/budgets";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  refresh: () => void
}

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    categories: Category[]
    getRowStyles: (row: Row<TData>) => CSSProperties
    navigateTo: (id: number) => void
    openEditDialog: (id: number) => void
    openDeleteDialog: (id: number) => void
  }
}
export default function DataTable<TData extends Item, TValue>({
  columns,
  data,
  refresh
}: DataTableProps<TData, TValue>) {
  const [pageSize] = useState(16)
  const [dialogEditOpen, setDialogEditOpen] = useState(false)
  const [manageProductVisible, setManageProductVisible] = useState(false)
  const [eanReaderVisible, setEanReaderVisible] = useState(false)
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false)

  const deleteId = useRef<number>(0)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    accepted: false
  })
  const [currentItem, setCurrentItem] = useState<Item | null>(null)
  const [categories, setCategories] = useState([] as Category[])

  const [formData, setFormData] = useState<Item>({
    id: 0,
    ean: '',
    categoryId: 0,
    description: '',
    sellPrice: 0,
    buyPrice: 0,
    stock: 0,
    lowStock: 0,
    active: true
  })
  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    initialState: {
      pagination: {
        pageSize // Set the initial page size
      }
    },

    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    meta: {
      categories: categories,
      getRowStyles: (row: Row<TData>) => {
        if (row.original.stock === 0) return { backgroundColor: '#550000', fontWeight: '500' }
        return row.original.stock <= row.original.lowStock
          ? { backgroundColor: '#595702', fontWeight: '500' }
          : { backgroundColor: '#0f471d', fontWeight: '500' }
      },
      navigateTo: () => {
        //todo V
        //router.push(`/budget/${id}`);
      },
      openDeleteDialog: (id: number) => {
        deleteId.current = id
        setDialogDeleteOpen(true)
      },
      openEditDialog: (id: number) => {
        setEanReaderVisible(false)
        setManageProductVisible(true)
        setCurrentItem(data.find((item) => item.id === id) as Item)
        setFormData(data.find((item) => item.id === id) as Item)
        setDialogEditOpen(true)
      }
    }
  })
  async function loadCategories() {
    const res: Category[] = await getAllCategories()
    setCategories(res)
  }
  useEffect(() => {
    loadCategories()
  }, [])
  function initFormAndItem() {
    setFormData({
      id: 0,
      ean: '',
      categoryId: 0,
      description: '',
      sellPrice: 0,
      buyPrice: 0,
      stock: 0,
      lowStock: 0,
      active: true
    })
    setCurrentItem({
      id: 0,
      active: true,
      buyPrice: 0,
      categoryId: 0,
      description: '',
      ean: '',
      lowStock: 0,
      sellPrice: 0,
      stock: 0
    })
  }
  function handleEANSubmit(ean: string) {
    const itemFound = data.find((i) => i.ean === ean)
    if (itemFound) {
      setCurrentItem(itemFound)
      setFormData({ ...itemFound })
    } else {
      initFormAndItem()
      setFormData({ ...formData, ean })
    }

    setEanReaderVisible(false)
    setManageProductVisible(true)
  }
  const handleInputChange = (field: keyof Item, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }
  function validateForm() {
    if (formData.buyPrice < 0) return false
    if (formData.categoryId === 0) return false
    if (formData.description === '') return false
    if (formData.lowStock < 0) return false
    if (formData.sellPrice < 0) return false
    if (formData.stock < 0) return false
    return true
  }
  async function handleSubmitForm() {
    setDialogDeleteOpen(false)

    let result: TStatusMessage
    if (formData.id) result = await updateItem(formData)
    else result = await createItem(formData)
    if (result.status === 'SUCCESS') {
      toast({
        description: 'Item modificado con éxito!',
        duration: 2000
      })
    } else {
      toast({
        variant: 'destructive',
        description: 'Hubo un error al modificar el Item',
        duration: 2000
      })
    }
    refresh()
  }
  async function handleDeleteRow() {
    setDialogDeleteOpen(false)
    console.log('deleteId.current', deleteId.current)
    const result: TStatusMessage = await deleteItem(deleteId.current)
    if (result.status === 'SUCCESS') {
      toast({
        description: 'Item eliminado con éxito!',
        duration: 2000
      })
    } else {
      toast({
        variant: 'destructive',
        description: 'Hubo un error al eliminar el Item',
        duration: 2000
      })
    }
    refresh()
  }
  //note  MARKUP
  return (
    <div className="h-full">
      <div className="flex flex-row justify-between m-2 gap-6">
        <div className="flex flex-col gap-2 items-center justify-center w-[85%]">
          <div className=" flex flex-row items-center gap-6  justify-between w-full ">
            <Input
              placeholder="Buscar productos..."
              value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('description')?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
            <Select
              onValueChange={(value) => {
                if (value === '0') table.getColumn('stock')?.setFilterValue(0)
                if (value === '1') table.getColumn('stock')?.setFilterValue(1)
                if (value === '2') table.getColumn('stock')?.setFilterValue(2)
                if (value === '3') table.getColumn('stock')?.setFilterValue(3)
              }}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Alerta Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">TODOS</SelectItem>
                  <SelectItem value="1">STOCK NORMAL</SelectItem>
                  <SelectItem value="2">STOCK BAJO</SelectItem>
                  <SelectItem value="3">SIN STOCK</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => {
                if (value === 'all') table.getColumn('category')?.setFilterValue(null)
                else table.getColumn('category')?.setFilterValue(value)
              }}
            >
              <SelectTrigger className="w-[320px]">
                <SelectValue placeholder="Categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key={0} value="all">
                    TODAS
                  </SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => {
              initFormAndItem()
              setCurrentItem(null)
              setEanReaderVisible(true)
              setManageProductVisible(false)
              setDialogEditOpen(true)
            }}
          >
            <Plus />
            Agregar Producto
          </Button>
        </div>
      </div>

      {/* //note TABLA */}
      <div className="m-2 h-fit rounded-md border-primary border-[1px] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-full">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  style={table.options.meta?.getRowStyles(row)}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className=" font-semibold tracking-wider text-[20px] h-12"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center  ">
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="m-2 flex items-center justify-end space-x-2 py-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border-2 border-primary"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border-2 border-primary"
        >
          Siguiente
        </Button>
      </div>
      {/* //note DIALOGS */}
      {/* //$DIALOG DELETE*/}
      <Dialog open={dialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
        <DialogContent>
          <DialogHeader>Desea eliminar el producto ? </DialogHeader>

          <DialogFooter className="flex flex-row gap-4">
            <Button type="submit" onClick={() => setDialogDeleteOpen(false)} className="w-full">
              Cancelar
            </Button>
            <Button type="submit" onClick={() => handleDeleteRow()} className="w-full">
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* //$DIALOG EDIT*/}
      <Dialog open={dialogEditOpen} onOpenChange={setDialogEditOpen}>
        <DialogContent className=" max-w-fit border-2 border-primary">
          <DialogHeader className="text-center flex justify-center items-center font-semibold text-lg text-foreground">
            {currentItem ? 'MODIFICAR PRODUCTO' : 'AGREGAR PRODUCTO'}
          </DialogHeader>
          <div className="w-[600px]">
            <EANReader visible={eanReaderVisible} items={data} onSubmit={handleEANSubmit} />
            <ManageProduct
              visible={manageProductVisible}
              formData={formData}
              categories={categories}
              onInputChange={handleInputChange}
            />
          </div>
          <DialogFooter className={`flex flex-row gap-4`}>
            <Button type="submit" onClick={() => setDialogEditOpen(false)} className="w-full">
              Cancelar
            </Button>
            <Button
              type="submit"
              onClick={() => {
                if (validateForm()) {
                  handleSubmitForm()
                  setDialogEditOpen(false)
                } else {
                  toast({
                    variant: 'destructive',
                    description: 'Campos incorrectos',
                    duration: 2000
                  })
                }
              }}
              className={`${eanReaderVisible ? 'hidden' : ''} w-full`}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
