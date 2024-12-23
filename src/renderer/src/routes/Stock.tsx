import React, { useEffect, useState } from 'react'
import { getAllItems } from '../serverActions/stockActions'
import DataTable from '../components/stock/DataTable'
import { columns } from '../components/stock/columns'

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
  return (
    <div className="h-full w-full">
      <DataTable columns={columns} data={itemsTableData} refresh={() => loadItems()} />
    </div>
  )
}

export default Stock
