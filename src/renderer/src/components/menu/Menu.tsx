import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

function Menu() {
  //!IMPLEMENTAR NAV BAR
  const navigate = useNavigate()
  const [title, setTitle] = useState('LA JUANITA')
  return (
    <div className="flex flex-row justify-around m-2">
      <Label className="w-[90%] text-center text-foreground font-bold text-[26px]">{title}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full bg-primary w-10 h-10" size="icon">
            <MenuIcon strokeWidth={2} size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-[270px] border-2 border-primary mr-10 bg-slate-900 p-4 mt-2">
          <DropdownMenuLabel className="text-[16px] font-bold text-center">MENU</DropdownMenuLabel>
          <Separator className="h-[1px] bg-muted-foreground mb-1" />
          <DropdownMenuItem
            onClick={() => {
              navigate('/')
              setTitle('LA JUANITA')
            }}
            className="text-[16px] font-semibold cursor-pointer"
          >
            Procesar Compras
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[16px] font-semibold cursor-pointer"
            onClick={() => {
              navigate('/stock')
              setTitle('ADMINISTRAR STOCK')
            }}
          >
            Administrar Stock
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate('/sale-inspector')
              setTitle('HISTORIAL DE VENTAS')
            }}
            className="text-[16px] font-semibold cursor-pointer"
          >
            Historial de ventas
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate('/statistics')
              setTitle('ESTADISTICAS')
            }}
            className="text-[16px] font-semibold cursor-pointer"
          >
            Estadisticas
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate('/categories')
              setTitle('ADMINISTRAR CATEGORIAS')
            }}
            className="text-[16px] font-semibold cursor-pointer"
          >
            Administrar Categorias
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => {
              navigate('/developer')
              setTitle('DEV')
            }}
            className="text-[16px] font-semibold cursor-pointer"
          >
            Developer
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Menu
