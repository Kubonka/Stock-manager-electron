import prisma from '../db'

type TCategoryRepo = {
  create(body: Category): Promise<TStatusMessage>
  update(body: Category): Promise<TStatusMessage>
  delete(body: Category): Promise<TStatusMessage>
  getAll(): Promise<Category[]>
}

class CategoryRepo implements TCategoryRepo {
  private static instance: CategoryRepo | null = null
  public static getInstance(): CategoryRepo {
    if (!CategoryRepo.instance) {
      CategoryRepo.instance = new CategoryRepo()
    }
    return CategoryRepo.instance
  }
  public async create(body: Category): Promise<TStatusMessage> {
    try {
      const newCategory = await prisma.category.create({
        data: {
          name: body.name.toLowerCase(),
          active: true
        }
      })
      return { status: 'SUCCESS', message: 'Category created' }
    } catch (error) {
      console.log(error)
      return { status: 'ERROR', message: 'Category creation failed' }
    }
  }
  public async update(body: Category): Promise<TStatusMessage> {
    const categoryFound = await prisma.category.update({
      where: { id: body.id },
      data: { name: body.name }
    })
    if (!categoryFound) return { status: 'ERROR', message: 'Category not found' }
    return { status: 'SUCCESS', message: 'Category updated' }
  }
  public async delete(body: Category): Promise<TStatusMessage> {
    const categoryFound = await prisma.category.update({
      where: { id: body.id },
      data: { active: false }
    })
    if (!categoryFound) return { status: 'ERROR', message: 'Category not found' }
    return { status: 'SUCCESS', message: 'Category deleted' }
  }
  public async getAll(): Promise<Category[]> {
    try {
      return await prisma.category.findMany({
        where: { active: true }
      })
    } catch (error) {
      throw new Error('failed to get categories')
    }
  }
}
export default CategoryRepo
