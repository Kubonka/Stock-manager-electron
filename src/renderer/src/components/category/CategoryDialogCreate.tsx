'use client'
import { useEffect, useState } from 'react'
import { FileEdit } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import FormAlert from '../FormAlert'

//! ########################
type CategoryDialogProps = {
  create: boolean
  data: Category
  onSubmit: (categoryData: Category) => void
}
function CategoryDialogCreate({ create, data, onSubmit }: CategoryDialogProps) {
  const [selecting, setSelecting] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [categoryData, setCategoryData] = useState<Category>({} as Category)
  /*data
			? {
					name: data.name,
					active: true,
					id: data.id,
					unitId: data.unitId,
					userId: data.userId,
			  }
			: { name: "", unitId: 0, id: 0, userId: "", active: true }
      */
  function validateForm() {
    console.log(categoryData)
    if (categoryData.name === '') {
      setError(true)
      return false
    }
    setError(false)
    return true
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setError(false)
        setOpen(open)
      }}
    >
      <DialogTrigger asChild>
        {create ? (
          <Button
            className="h-8 w-[72px]"
            onClick={() => {
              setCategoryData({
                name: '',
                id: 0,
                active: true
              })
              setOpen(true)
            }}
          >
            Crear
          </Button>
        ) : (
          <Button
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary p-1"
            variant={'outline'}
            onClick={() => {
              setCategoryData({
                name: data.name,
                active: true,
                id: data.id
              })
              setOpen(true)
            }}
            asChild
          >
            <FileEdit className="text-white" size={20} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{create ? 'Crear Categoría' : 'Editar Categoría'}</DialogTitle>
          <DialogDescription>
            Realiza cambios en tu categoría aca. Hace click en guardar cambios cuando termines.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Nombre
            </Label>
            <Input
              id="name"
              defaultValue={data.name}
              onChange={(e) => setCategoryData((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
        </div>
        <DialogFooter>
          <FormAlert className={error ? 'mt-2' : 'hidden'} />
          <Button
            type="submit"
            onClick={() => {
              if (validateForm()) {
                onSubmit(categoryData)
                setOpen(false)
              }
            }}
            disabled={selecting}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default CategoryDialogCreate
