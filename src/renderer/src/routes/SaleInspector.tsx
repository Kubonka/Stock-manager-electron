import { deleteSale, getSalesByDay } from '../serverActions/salesActions'
import { toast } from '../hooks/use-toast'
import { Label } from '../components/ui/label'
import CartList from '../components/sales/CartList'
import { parsedDateArgentina } from '../lib/utils'
import { useEffect, useState } from 'react'
import { Separator } from '../components/ui/separator'
import DateSelector from '../components/dateSelector/DateSelector'
import { Sale, TStatusMessage } from '../../../../types'
import { X } from 'lucide-react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../components/ui/dialog'
import { Button } from '../components/ui/button'

function SaleInspector() {
  const [date, setDate] = useState<Date>()
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false)
  const [saleToDelete, setSaleToDelete] = useState<number | null>(null)
  const [sales, setSales] = useState<Sale[]>([])
  const [currentSale, setCurrentSale] = useState<Sale>()
  const [saleSelected, setSaleSelected] = useState<number>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (date) handleSearch()
    else {
      setDate(new Date())
    }
  }, [date])
  async function handleDeleteSale(saleId: number) {
    console.log('delete', saleId)
    setDialogDeleteOpen(true)
    setSaleToDelete(saleId)
  }
  async function handleSearch() {
    try {
      const res: Sale[] = await getSalesByDay(date as Date)
      setSales(res)
      if (res.length) {
        setCurrentSale(res[0])
        setSaleSelected(res[0].id)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-16 px-8 h-full">
      <div className="bg-slate-900 w-full border-2 border-primary rounded-md p-4 flex justify-center gap-4">
        <DateSelector
          date={date}
          setDate={(newDate) => setDate(newDate)}
          onSubmit={() => handleSearch()}
        />
      </div>
      <div className="flex flex-row gap-16 w-full h-[90%] justify-center pb-16 overflow-y-auto">
        <div className="flex flex-col w-[30%] h-full items-end ">
          <div className="flex flex-row gap-16 bg-slate-900 rounded-t-md border-2   border-primary p-8 w-full justify-center h-[710px] overflow-y-auto ">
            <ul className="w-full h-full">
              <li className="flex flex-row justify-between w-full px-2">
                <Label className="text-[20px] text-muted-foreground md:text-[20px]">HORA</Label>
                <Label className="text-[20px] text-muted-foreground md:text-[20px]">MONTO</Label>
              </li>
              <Separator className="h-[2px] bg-muted-foreground mb-1" />
              {sales.map((sale, index) => (
                <li
                  key={sale.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`${saleSelected === sale.id ? ' bg-primary rounded-md' : 'bg-slate-900'} flex flex-row gap-4 h-8 justify-between items-center px-2 cursor-pointer relative`}
                  onClick={() => {
                    setSaleSelected(sale.id)
                    setCurrentSale(sale)
                  }}
                >
                  <Label className="text-[20px] text-muted-foreground cursor-pointer">
                    {parsedDateArgentina(sale.date.toISOString()).slice(12)}
                  </Label>
                  <Label className="text-[20px] text-muted-foreground cursor-pointer">
                    {'$ ' + sale.totalPrice}
                  </Label>
                  <X
                    className={`  absolute text-red-600 cursor-pointer -right-6 transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0 '
                    }`}
                    onClick={() => {
                      handleDeleteSale(sale.id)
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-row gap-2 h-16  px-8 border-b-2 border-x-2  rounded-b-md bg-slate-900 border-primary w-full  items-center justify-between">
            <Label className="text-muted-foreground md:text-[20px]">{`TOTAL`} </Label>
            <Label className="text-muted-foreground md:text-[20px] pr-[24px]">
              {`$ ${sales.reduce((acc, curr) => acc + curr.totalPrice, 0) || 0}`}
            </Label>
          </div>
        </div>

        <div className="flex flex-col w-full h-full items-end ">
          <CartList
            cart={currentSale?.items || []}
            onDeleteItem={null}
            className=" rounded-t-md rounded-bl-md  border-2 border-primary w-full h-[710px] max-h-[710px]  px-8 py-2 bg-slate-900 overflow-y-auto"
          />
          <div className="flex flex-row gap-2 h-16  px-8 border-b-2 border-x-2  rounded-b-md bg-slate-900 border-primary w-[360px]  items-center justify-between">
            <Label className="text-muted-foreground md:text-[30px]">{`TOTAL`} </Label>
            <Label className="text-muted-foreground md:text-[30px]">
              {`$ ${currentSale?.totalPrice || 0}`}
            </Label>
          </div>
        </div>
        {/* //$DIALOG DELETE*/}
        <Dialog open={dialogDeleteOpen} onOpenChange={setDialogDeleteOpen}>
          <DialogContent>
            <DialogHeader className="text-center flex justify-center items-center font-semibold text-lg text-foreground">
              Desea eliminar la venta ?
            </DialogHeader>

            <DialogFooter className="flex flex-row gap-4">
              <Button type="submit" onClick={() => setDialogDeleteOpen(false)} className="w-full">
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={async () => {
                  const result: TStatusMessage = await deleteSale(saleToDelete as number)
                  setDialogDeleteOpen(false)
                  if (result.status === 'SUCCESS') {
                    toast({
                      description: 'Venta eliminada con éxito!',
                      duration: 2000
                    })
                  } else {
                    toast({
                      variant: 'destructive',
                      description: 'Hubo un error al eliminar la Venta',
                      duration: 2000
                    })
                  }
                  handleSearch()
                }}
                className="w-full"
              >
                Aceptar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* <div className="flex flex-row gap-16 bg-slate-900 rounded-md border-2 border-primary p-8 w-[30%]">
          {/* <ul className="flex flex-col ">
            <li className="flex flex-row gap-4">
              <Label>Cant</Label>
              <Label>Descripcion</Label>
              <Label>P.Unitario</Label>
              <Label>Subtotal</Label>
            </li>
            {currentSale?.items.map((item) => (
              <li className="flex flex-row gap-4 justify-between items-center">
                <Label>{item.count}</Label>
                <Label>{item.description}</Label>
                <Label>{item.sellPrice}</Label>
                <Label>{item.subTotal}</Label>
              </li>
            ))}
            <li className="flex flex-row gap-4 justify-end">
              <Label>TOTAL</Label>
              <Label>{currentSale?.totalPrice}</Label>
            </li>
          </ul> 
        </div> */}
      </div>
    </div>
  )
}
export default SaleInspector
