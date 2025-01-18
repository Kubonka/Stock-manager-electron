import { useEffect, useState } from 'react'
import { getAllItems } from '../serverActions/stockActions'
import DataTable from '../components/stock/DataTable'
import { columns } from '../components/stock/columns'
import { Item } from '../../../../types'

function Stock() {
  const [itemsTableData, setItemsTableData] = useState<Item[]>([] as Item[])
  async function loadItems() {
    const res: Item[] | null = await getAllItems()
    if (res) setItemsTableData(res)
    else setItemsTableData([])
  }
  useEffect(() => {
    loadItems()
  }, [])
  //note  MARKUP
  return <DataTable columns={columns} data={itemsTableData} refresh={() => loadItems()} />
}

export default Stock
