import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import { Label } from '../ui/label'

function Menu() {
  //!IMPLEMENTAR NAV BAR
  const navigate = useNavigate()
  const a = 0
  return (
    <div className="flex flex-row justify-around m-2">
      <Label className="w-[90%] text-center text-red-400 font-bold text-lg">LA JUANITA</Label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full bg-slate-600 w-10 h-10" size="icon">
            <MenuIcon strokeWidth={2} size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-[170px] bg-slate-600">
          <DropdownMenuLabel className="text-[16px] font-bold">MENU</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigate('/')
            }}
            className="ml-2 text-[16px] font-semibold"
          >
            Procesar Compras
          </DropdownMenuItem>
          <DropdownMenuItem
            className="ml-2 text-[16px] font-semibold"
            onClick={() => {
              navigate('/stock')
            }}
          >
            Administrar Stock
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate('/sale-inspector')
            }}
            className="ml-2 text-[16px] font-semibold"
          >
            Historial de ventas
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate('/categories')
            }}
            className="ml-2 text-[16px] font-semibold"
          >
            Administrar Categorias
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate('/developer')
            }}
            className="ml-2 text-[16px] font-semibold"
          >
            Developer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Menu
