import { useEffect, useState } from 'react'
import { toast } from '../hooks/use-toast'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../components/ui/table'
import { Card, CardContent } from '../components/ui/card'
import CategoryDialogCreate from '../components/category/CategoryDialogCreate'
import CategoryDialogDelete from '../components/category/CategoryDialogDelete'

import { capitalize } from '../lib/utils'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory
} from '../serverActions/categoryActions'
import { Category, TStatusMessage } from '../../../../types'
import { Separator } from '../components/ui/separator'

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [_, setSelectedCategory] = useState<Category | null>(null)

  async function loadAllCategories() {
    const res = await getAllCategories()
    setCategories(res)
  }
  useEffect(() => {
    loadAllCategories()
    return () => {
      setSelectedCategory(null)
    }
  }, [])
  async function handleSubmit(categoryData: Category) {
    try {
      let result: TStatusMessage
      if (!categoryData.id) {
        result = await createCategory(categoryData)
        if (result.status && result.status === 'SUCCESS') {
          toast({ description: 'Categoría creada con éxito!', duration: 2000 })
        } else {
          toast({
            variant: 'destructive',
            description: 'Hubo un error al crear la categoria',
            duration: 2000
          })
        }
      } else {
        result = await updateCategory(categoryData)
        if (result.status && result.status === 'SUCCESS') {
          toast({
            description: 'Categoría actualizada con éxito!',
            duration: 2000
          })
        } else {
          toast({
            variant: 'destructive',
            description: 'Hubo un error al actualizar la categoria',
            duration: 2000
          })
        }
      }
      loadAllCategories()
    } catch (error) {
      console.log(error)
    }
  }
  async function handleDelete(category: Category) {
    try {
      const result: TStatusMessage = await deleteCategory(category)
      if (result.status === 'SUCCESS') {
        toast({
          description: 'Categoría eliminada con éxito!',
          duration: 2000
        })
      } else {
        toast({
          variant: 'destructive',
          description: 'Hubo un error al eliminar la categoria',
          duration: 2000
        })
      }
      loadAllCategories()
    } catch (error) {
      console.log(error)
    }
  }
  //reference MARKUP

  return (
    <div className=" w-full h-[1080px]">
      <Card className=" pt-2 h-full overflow-y-auto border-0 overflow-auto">
        <CardContent className="border-2 border-primary rounded-md p-2 h-full">
          <Table className="">
            <TableCaption>Lista de las categorías creadas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">
                  <div className="flex flex-row justify-between">
                    <p className="pt-2 font-bold">CATEGORIA</p>
                    <CategoryDialogCreate
                      create={true}
                      data={{
                        name: '',
                        id: 0,
                        active: true
                      }}
                      onSubmit={handleSubmit}
                    />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell className="flex flex-row items-center justify-between font-medium">
                    <div className="w-full ">{capitalize(category.name)}</div>
                    <div className="flex h-8 w-20 justify-around ">
                      <CategoryDialogCreate
                        create={false}
                        data={{
                          ...category
                        }}
                        onSubmit={handleSubmit}
                      />
                      <CategoryDialogDelete onDelete={handleDelete} category={category} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <Separator className="bg-primary mt-2" />
            <TableFooter></TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
